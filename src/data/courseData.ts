import lesson1Thumb from "@/assets/lesson/page_6.jpg";
import lesson2Thumb from "@/assets/lesson2/page_6.jpg";
import lesson3Thumb from "@/assets/lesson3/page_6.jpg";
import lesson4Thumb from "@/assets/lesson4/page_7.jpg";
import lesson5Thumb from "@/assets/lesson5/page_5.jpg";
import lesson6Thumb from "@/assets/lesson6/page_5.jpg";

export interface Topic {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
}

export interface Session {
  id: string;
  letter: string;
  title: string;
  subtitle: string;
  explanationTitle: string;
  explanationPoints: string[];
  topics: Topic[];
}

export const sessions: Session[] = [
  {
    id: "a",
    letter: "א'",
    title: "AI ככלי (עוזר)",
    subtitle: "שימוש ב-AI ככלי עזר ליצירה ופיתוח",
    explanationTitle: "עבודה עם בוט-כלי:",
    explanationPoints: [
      "אתה נותנת הוראות ברורות ← הוא מבצע בדיוק",
      "מקבלת תוצאות מדויקות ומבוססות נתונים",
      "חוסכת זמן בעבודות שגרה (חישובים, בדיקות)",
      "הבקרה שלך מלאה על התהליך והתוצאה",
    ],
    topics: [
      {
        id: 1,
        title: "השראה",
        subtitle: "מרעיון לביצוע",
        description: "תהליך יצירתי מרעיון גולמי ועד להגשמה מעשית. איך AI עוזר לנו למצוא השראה ולהפוך אותה למציאות.",
        thumbnail: lesson1Thumb,
      },
      {
        id: 2,
        title: "פיתוח",
        subtitle: "פירוק והרכבה",
        description: "פירוק בעיות מורכבות לחלקים קטנים והרכבתם מחדש. שיטות עבודה עם AI לפיתוח רעיונות.",
        thumbnail: lesson2Thumb,
      },
      {
        id: 3,
        title: "ביצוע",
        subtitle: "חומר מקצועי",
        description: "הפקת חומרים מקצועיים באיכות גבוהה בעזרת AI. מהתכנון ועד לתוצר הסופי.",
        thumbnail: lesson3Thumb,
      },
    ],
  },
  {
    id: "b",
    letter: "ב'",
    title: "AI כמחולל (שותף)",
    subtitle: "שימוש ב-AI כשותף יצירתי ומחולל תוכן",
    explanationTitle: "עבודה עם בוט-מחולל:",
    explanationPoints: [
      "אתה מתחילה דיאלוג רעיוני ← הוא מציע כיוונים",
      "מקבלת הפתעות ורעיונות לא צפויים",
      "הוא מזרז את השלב היצירתי (brain storming)",
      "את שומרת שליטה על ההחלטות הסופיות",
    ],
    topics: [
      {
        id: 1,
        title: "טבעי",
        subtitle: "ביומימטיקה",
        description: "למידה מהטבע והשראה ביולוגית. איך AI מאפשר לנו לחקות דפוסים טבעיים ביצירה.",
      },
      {
        id: 2,
        title: "לוגי",
        subtitle: "פונקציונליות",
        description: "חשיבה לוגית ופונקציונלית ביצירה. שימוש ב-AI לבניית מבנים ומערכות יצירתיות.",
      },
      {
        id: 3,
        title: "פואטי",
        subtitle: "תרבות",
        description: "הממד התרבותי והפואטי של היצירה. חיבור בין AI לבין עולמות תרבותיים ואמנותיים.",
      },
    ],
  },
];
