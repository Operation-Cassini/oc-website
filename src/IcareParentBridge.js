import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { getSaturnTestData } from './graphql/queries';

const BRIDGE_VERSION = 1;

const graphqlClient = generateClient();

const isEmbeddedInIframe = () => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
};

const isTrustedInteractiveCareOrigin = (origin) => {
  try {
    const u = new URL(origin);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') {
      return false;
    }
    const { hostname } = u;
    return (
      hostname === 'interactive-care.com' ||
      hostname.endsWith('.interactive-care.com')
    );
  } catch {
    return false;
  }
};

const getReferrerOrigin = () => {
  try {
    if (document.referrer) {
      return new URL(document.referrer).origin;
    }
  } catch {
    /* ignore */
  }
  return null;
};

const getParentPostTargetOrigin = () => {
  const referrerOrigin = getReferrerOrigin();
  if (referrerOrigin && isTrustedInteractiveCareOrigin(referrerOrigin)) {
    return referrerOrigin;
  }
  return null;
};

const postToParent = (payload) => {
  if (!isEmbeddedInIframe()) {
    return;
  }
  const targetOrigin = getParentPostTargetOrigin();
  if (!targetOrigin) {
    return;
  }
  try {
    window.parent.postMessage(
      { source: 'saturn', v: BRIDGE_VERSION, ...payload },
      targetOrigin
    );
  } catch {
    /* ignore */
  }
};

let messageListenerInstalled = false;

const handleParentMessage = (event) => {
  if (!isEmbeddedInIframe()) {
    return;
  }
  if (event.source !== window.parent) {
    return;
  }
  if (!isTrustedInteractiveCareOrigin(event.origin)) {
    return;
  }

  const data = event.data;
  if (!data || data.source !== 'icare' || data.v !== BRIDGE_VERSION) {
    return;
  }

  if (data.type === 'LOOKUP_CODE') {
    const code = typeof data.code === 'string' ? data.code.trim() : '';
    const requestId = data.requestId;

    const reply = (row, error) => {
      try {
        event.source.postMessage(
          {
            source: 'saturn',
            v: BRIDGE_VERSION,
            type: 'LOOKUP_CODE_RESULT',
            requestId,
            code,
            row: row || null,
            error: error || null,
          },
          event.origin
        );
      } catch {
        /* ignore */
      }
    };

    if (code.length !== 7 || Number.isNaN(Number(code))) {
      reply(null, 'INVALID_CODE');
      return;
    }

    graphqlClient
      .graphql({
        query: getSaturnTestData,
        variables: { id: code },
      })
      .then((response) => {
        const row = response?.data?.getSaturnTestData ?? null;
        if (!row) {
          reply(null, 'NOT_FOUND');
          return;
        }
        reply(row, null);
      })
      .catch(() => {
        reply(null, 'FETCH_FAILED');
      });
    return;
  }

  if (data.type === 'TRIGGER_NEXT') {
    const btn = document.querySelector('.next-button');
    if (btn && typeof btn.click === 'function') {
      btn.click();
    }
  }
};

const ensureParentMessageListener = () => {
  if (messageListenerInstalled || typeof window === 'undefined') {
    return;
  }
  messageListenerInstalled = true;
  window.addEventListener('message', handleParentMessage);
};

/**
 * When Saturn runs inside an iCare iframe, syncs route/session/next hints to the parent
 * and handles LOOKUP_CODE / TRIGGER_NEXT from the parent.
 *
 * Only parents on interactive-care.com (apex, www, or subdomains) are allowed;
 * postMessage target is taken from document.referrer when it matches.
 */
const IcareParentBridge = ({ tabCode }) => {
  const location = useLocation();
  const lastPostedSession = useRef(null);

  useEffect(() => {
    ensureParentMessageListener();
  }, []);

  useEffect(() => {
    if (!isEmbeddedInIframe()) {
      return;
    }

    const pathname = location.pathname;
    const href = window.location.href;

    postToParent({
      type: 'ROUTE',
      href,
      pathname,
      search: location.search,
      hash: location.hash,
    });

    const nextInfo = {
      type: 'NEXT_INFO',
      pathname,
      hasNextControl: false,
      nextHref: null,
    };

    if (pathname === '/Home') {
      nextInfo.hasNextControl = true;
      nextInfo.nextHref = new URL('/page/0', window.location.origin).href;
    } else {
      const pageMatch = /^\/page\/(\d+)$/.exec(pathname);
      if (pageMatch) {
        const n = parseInt(pageMatch[1], 10);
        nextInfo.hasNextControl = true;
        nextInfo.nextHref = new URL(`/page/${n + 1}`, window.location.origin).href;
      }
    }

    postToParent(nextInfo);

    if (pathname === '/page/0' && tabCode != null) {
      const key = String(tabCode);
      if (lastPostedSession.current !== key) {
        lastPostedSession.current = key;
        postToParent({
          type: 'SESSION_CODE',
          code: key,
          href,
        });
      }
    }
  }, [location.pathname, location.search, location.hash, tabCode]);

  return null;
};

export default IcareParentBridge;
