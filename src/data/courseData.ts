export interface Topic {
  id: number;
  title: string;
  subtitle: string;
  description: string;
}

export interface Session {
  id: string;
  letter: string;
  title: string;
  subtitle: string;
  topics: Topic[];
}

export const sessions: Session[] = [
  {
    id: "a",
    letter: "א'",
    title: "AI ככלי (עוזר)",
    subtitle: "שימוש ב-AI ככלי עזר ליצירה ופיתוח",
    topics: [
      {
        id: 1,
        title: "השראה",
        subtitle: "מרעיון לביצוע",
        description: "תהליך יצירתי מרעיון גולמי ועד להגשמה מעשית. איך AI עוזר לנו למצוא השראה ולהפוך אותה למציאות.",
      },
      {
        id: 2,
        title: "פיתוח",
        subtitle: "פירוק והרכבה",
        description: "פירוק בעיות מורכבות לחלקים קטנים והרכבתם מחדש. שיטות עבודה עם AI לפיתוח רעיונות.",
      },
      {
        id: 3,
        title: "ביצוע",
        subtitle: "חומר מקצועי",
        description: "הפקת חומרים מקצועיים באיכות גבוהה בעזרת AI. מהתכנון ועד לתוצר הסופי.",
      },
    ],
  },
  {
    id: "b",
    letter: "ב'",
    title: "AI כמחולל (שותף)",
    subtitle: "שימוש ב-AI כשותף יצירתי ומחולל תוכן",
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
