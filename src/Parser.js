import './App.css';


function parseStyledText(text) {
  const styledParts = [];
  const regex = /(_([^_]+)_|\*([^*]+)\*|{([^}]+)}|\+([^+]+)\+|~([^~]+)~|([^_*{}+~;]+))/g;

  // Check if the text contains a semicolon
  if (text.includes(';')) {
    // Split the text by semicolon
    const parts = text.split(';');
    // Parse each part separately
    parts.forEach((part, index) => {
      if (index > 0) {
        // Add a marker for the beginning of the message
        styledParts.push({ boundary: 'start' });
        const parsedParts = parseStyledText(part);
        styledParts.push(...parsedParts); // Concatenate the parsed parts
        styledParts.push({ boundary: 'end' });
      }
      else {
        const parsedParts = parseStyledText(part);
        styledParts.push(...parsedParts); // Concatenate the parsed parts
      }
      // Add a marker for the end of the message
      // styledParts.push({ boundary: 'end' });
    });
  } else {
    // Process the text using the regex pattern
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match[2]) {
        const nestedParts = parseStyledText(match[2]);
        styledParts.push({ style: 'underline', content: nestedParts });
      } else if (match[3]) {
        const nestedParts = parseStyledText(match[3]);
        styledParts.push({ style: 'italic', content: nestedParts });
      } else if (match[4]) {
        const nestedParts = parseStyledText(match[4]);
        styledParts.push({ style: 'red', content: nestedParts });
      } else if (match[5]) {
        const nestedParts = parseStyledText(match[5]);
        styledParts.push({ style: 'green', content: nestedParts });
      } else if (match[6]) {
        const nestedParts = parseStyledText(match[6]);
        styledParts.push({ style: 'blue', content: nestedParts });
      } else if (match[7]) {
        styledParts.push({ style: null, content: match[7] });
      }
    }
  }

  return styledParts;
}

function ParseInputFile(fileContent) {
  const lines = fileContent.split('\n');
  const pages = [];
  let currentPageData = {};

  lines.forEach(line => {
    line = line.trim();
    if (line === "") {
      if (Object.keys(currentPageData).length > 0) {
        pages.push({ ...currentPageData });
        currentPageData = {};
      }
    } else {
      const [key, value] = line.split(": ", 2);
      if (key && value) {
        currentPageData[key] = parseStyledText(value);
      }
    }
  });

  if (Object.keys(currentPageData).length > 0) {
    pages.push({ ...currentPageData });
  }
  console.log("pages is", pages);
  return pages;
}

export default ParseInputFile;

