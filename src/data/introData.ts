import type { LessonStep } from "@/data/lessonData";

import page1 from "@/assets/intro/page_1.jpg";
import page2 from "@/assets/intro/page_2.jpg";
import page3 from "@/assets/intro/page_3.jpg";
import page4 from "@/assets/intro/page_4.jpg";
import page5 from "@/assets/intro/page_5.jpg";
import page6 from "@/assets/intro/page_6.jpg";
import page7 from "@/assets/intro/page_7.jpg";
import page8 from "@/assets/intro/page_8.jpg";
import page9 from "@/assets/intro/page_9.jpg";
import page10 from "@/assets/intro/page_10.jpg";
import page11 from "@/assets/intro/page_11.jpg";
import page12 from "@/assets/intro/page_12.jpg";
import page13 from "@/assets/intro/page_13.jpg";
import page14 from "@/assets/intro/page_14.jpg";

export const introSteps: LessonStep[] = [
  {
    id: 1,
    title: "הקדמה",
    content: "ברוכים הבאים לקורס המתקדם – AI ויצירה. קורס זה מציע מסע מעמיק לעולם היצירה בשיתוף בינה מלאכותית, מתוך גישה שמשלבת חשיבה, פרקטיקה ורגישות אנושית.",
    image: page1,
    imageAlt: "שקף הקדמה לקורס",
  },
  {
    id: 2,
    title: "עוגת הידע",
    content: "מודל עוגת הידע – UN5 SI0nS – מציג את שלושת אזורי הידע: מה שאנחנו יודעים (אדום), מה שאנחנו מכירים אבל לא יודעים (כתום), ומה שלא מכירים ולא יודעים (צהוב).",
    image: page14,
    imageAlt: "מודל עוגת הידע",
  },
  {
    id: 3,
    title: "חשיבה מהירה וחשיבה איטית",
    content: "לפי דניאל כהנמן: מערכת 1 היא החשיבה האינטואיטיבית והמהירה, מערכת 2 היא החשיבה המנותחת והאיטית. כשעובדים עם AI, החוזקות והחולשות של שתי המערכות משתלבות – האדם תורם אינטואיציה והקשר, והבינה המלאכותית תורמת עיבוד מידע מהיר וניתוח נתונים. השילוב ביניהן הוא ״חכמה״.",
    image: page2,
    imageAlt: "חשיבה מהירה וחשיבה איטית - כהנמן",
  },
  {
    id: 4,
    title: "החזון: מכלי לשותף",
    content: "החזון של הקורס: למצוא מציאות חדשה מתוך עולם שנעלם. המסע עובר משימוש ב-AI ככלי – דרך בחירת ידע חדש – ועד לגילוי עולמות לא מוכרים.",
    image: page3,
    imageAlt: "מכלי לשותף - החזון",
  },
  {
    id: 5,
    title: "מסע דרך עוגת הידע",
    content: "מכלי לשותף – מסע דרך עוגת הידע: ככלי (אזור אדום) – את יודעת בדיוק מה צריכה, ה-AI מבצע. כמתווך (אזור כתום) – את מכירה משהו חדש דרך ה-AI, ובוחרת מה להפוך לידע שלך. כשותף יוצר (אזור צהוב) – הקסם קורה כאן. ה-AI פותח עולם שנעלם ממך, והלא-נודע הופך למציאות. הפרדוקס: ככל שאת פתוחה יותר ללא-נודע, כך האדום שלך גדל ומתעשר.",
    image: page4,
    imageAlt: "מסע דרך עוגת הידע - מכלי לשותף",
  },
  {
    id: 6,
    title: "משהו מפתיע על הנדסת פרומפטים",
    content: "רוב האנשים רואים ב-AI כלי שצריך להפעיל – טריק טכנולוגי. אני רואה שותף לחשיבה שמרחיב את היכולת שלי לראות זוויות שלא חשבתי עליהן. כשאני מנסחת פרומפט, אני מחדדת לעצמי מה באמת אני מחפשת. ההקשר שאני בונה, האילוצים שאני מגדירה, המילים שאני בוחרת – הכל מחדד את המחשבה שלי, לא רק את התשובה של המכונה. השאלה האמיתית: האם אנחנו משתמשים ב-AI כדי לקבל תשובות מהירות, או כדי לחשוב יותר טוב?",
    image: page5,
    imageAlt: "הנדסת פרומפטים - שותף לחשיבה",
  },
  {
    id: 7,
    title: "ממשק העבודה",
    content: "היכרות עם ממשק ה-AI – נקודת ההתחלה לכל שיחה ויצירה משותפת.",
    image: page6,
    imageAlt: "ממשק העבודה עם AI",
  },
  {
    id: 8,
    title: "מערכות הנחייה",
    content: "השוואה בין מערכות הנחייה שונות: Setting (העדפות משתמש), Project (הנחיות פרויקט), Custom Instructions (הנחיות מותאמות אישית), ושיחה רגילה. כל אחת משפיעה ברמה שונה על ההררכיה של ה-AI.",
    image: page7,
    imageAlt: "מערכות הנחייה - הררכיה",
  },
  {
    id: 9,
    title: "ניסוח הנחיות בדרכים שונות",
    content: "ארבע רמות ניסוח הנחיות: 1. בסיסי ידני – ״אני...״ 2. משודרג על ידי המערכת – ״ליצור הנחיות...״ 3. מובנה עם פרמטרים מקיפים – מבנה, תוכן, סגנון 4. מנוסח ממקסם – שימוש במילים חדות: ״זקק, חלץ...״",
    image: page8,
    imageAlt: "ניסוח הנחיות - ארבע רמות",
  },
  {
    id: 10,
    title: "השוואת מערכות – Setting",
    content: "Setting (העדפות משתמש) – הגדרות בסיסיות שמשפיעות על כל השיחות: טון, אורך תשובות, שפה, סגנון כתיבה, והעדפות אישיות.",
    image: page9,
    imageAlt: "Setting - העדפות משתמש",
  },
  {
    id: 11,
    title: "השוואת מערכות – סקירה כללית",
    content: "סקירה כללית של שלוש רמות ההנחיה: Setting מגדיר את הבסיס, Project מגדיר הקשר ספציפי, ו-Custom Instructions מגדיר התנהגות מותאמת אישית.",
    image: page10,
    imageAlt: "השוואת מערכות הנחייה",
  },
  {
    id: 12,
    title: "השוואת מערכות – Setting מורחב",
    content: "הגדרות Setting מורחבות: כולל העדפות תקשורת, סגנון כתיבה, רמת פירוט, שפה ולוקליזציה, והתאמות אישיות נוספות.",
    image: page11,
    imageAlt: "Setting מורחב",
  },
  {
    id: 13,
    title: "השוואת מערכות – Project Instructions",
    content: "Project Instructions – הנחיות ברמת הפרויקט: מגדירות את ההקשר הספציפי, את סוג המודל (Claude, GPT-4, Gemini), את מטרת הפרויקט ואת הכללים הייחודיים לו.",
    image: page12,
    imageAlt: "Project Instructions",
  },
  {
    id: 14,
    title: "השוואת מערכות – Custom Instructions",
    content: "Custom Instructions – הנחיות מותאמות אישית: כוללות הגדרת פורמט (16:9), סגנון צילום (כמו Ezra Stoller), טון דיבור, ושילוב של תוכן + ויזואל + טקסט.",
    image: page13,
    imageAlt: "Custom Instructions",
  },
];
