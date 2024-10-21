import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        start: "START",
        next: "NEXT",
        delete: "DELETE",
        months: [
            "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", 
            "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", 
            "NOVEMBER", "DECEMBER"
        ],
        days: {
            sunday: "SUNDAY",
            monday: "MONDAY",
            tuesday: "TUESDAY",
            wednesday: "WEDNESDAY",
            thursday: "THURSDAY",
            friday: "FRIDAY",
            saturday: "SATURDAY"
        },
        end: {
            done_with_test: "YOU’RE DONE WITH THE TEST!",
            save_number_to_view_results: "SAVE THIS NUMBER TO VIEW YOUR RESULTS",
            view_results_on: "YOU CAN VIEW YOUR RESULTS ON"
        },
        tabcode: {
            save_this_number: "SAVE THIS NUMBER"
        }
      }
    },
    es: {
      translation: {
        start: "COMENZAR",
        next: "SIGA",
        delete: "SUPRIMIR",
        months: [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo",
            "Junio", "Julio", "Agosto", "Septiembre", "Octubre",
            "Noviembre", "Diciembre"
        ],
        days: {
            sunday: "DOMINGO",
            monday: "LUNES",
            tuesday: "MARTES",
            wednesday: "MIÉRCOLES",
            thursday: "JUEVES",
            friday: "VIERNES",
            saturday: "SÁBADO"
        },
        end: {
            done_with_test: "¡HAS TERMINADO EL TEST!",
            save_number_to_view_results: "GUARDA ESTE NÚMERO PARA VER TUS RESULTADOS",
            view_results_on: "PUEDES VER TUS RESULTADOS EN"
        },
        tabcode: {
            save_this_number: "GUARDA ESTE NÚMERO"
        }
      }
    },
    szh: {
      translation: {
        start: "开始",
        next: "下一页",
        delete: "\u00A0\u00A0\u00A0\u00A0删掉\u00A0\u00A0\u00A0\u00A0",
        months: [
            "一月", "二月", "三月", "四月", "五月",
            "六月", "七月", "八月", "九月", "十月",
            "十一月", "十二月"
        ],
        days: {
            sunday: "星期天",
            monday: "星期一",
            tuesday: "星期二",
            wednesday: "星期三",
            thursday: "星期四",
            friday: "星期五",
            saturday: "星期六"
        },
        end: {
            done_with_test: "你已经完成测试！",
            save_number_to_view_results: "保存此号码以查看您的结果",
            view_results_on: "您可以在 saturn-test.com 查看您的结果"
        },
        tabcode: {
            save_this_number: "保存此号码"
        }
      }
    },
    tzh: {
      translation: {
        start: "開始",
        next: "下一页",
        delete: "\u00A0\u00A0\u00A0\u00A0删掉\u00A0\u00A0\u00A0\u00A0",
        months: [
            "一月", "二月", "三月", "四月", "五月",
            "六月", "七月", "八月", "九月", "十月",
            "十一月", "十二月"
        ],
        days: {
            sunday: "星期天",
            monday: "星期一",
            tuesday: "星期二",
            wednesday: "星期三",
            thursday: "星期四",
            friday: "星期五",
            saturday: "星期六"
        },
        end: {
            done_with_test: "你已經完成測驗！",
            save_number_to_view_results: "儲存此號碼以查看您的結果",
            view_results_on: "您可以在 saturn-test.com 上查看您的結果"
        },
        tabcode: {
            save_this_number: "儲存此號碼"
        }
      }
    },
    kor: {
      translation: {
        start: "시작",
        next: "다음",
        delete: "\u00A0\u00A0\u00A0삭제\u00A0\u00A0\u00A0\u00A0",
        months: [
            "1월", "2월", "3월", "4월", "5월",
            "6월", "7월", "8월", "9월", "10월",
            "11월", "12월"
        ],
        days: {
            sunday: "일요일",
            monday: "월요일",
            tuesday: "화요일",
            wednesday: "수요일",
            thursday: "목요일",
            friday: "금요일",
            saturday: "토요일"
        },
        end: {
            done_with_test: "모두 끝났습니다!",
            save_number_to_view_results: "결과를 보려면 이 번호를 저장하세요.",
            view_results_on: "saturn-test.com에서 결과를 볼 수 있습니다."
        },
        tabcode: {
            save_this_number: "이 번호를 저장하세요"
        }
      }
    }
  },
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false // React already handles escaping
  }
});

export default i18n;
