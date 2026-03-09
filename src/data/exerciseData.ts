// Lesson 1 (a-1) images
import lesson1Input from "@/assets/lesson/page_3.jpg";
import lesson1Output from "@/assets/lesson/page_6.jpg";
// Lesson 2 (a-2) images
import lesson2Input from "@/assets/lesson2/page_5.jpg";
import lesson2Output from "@/assets/lesson2/page_10.jpg";
// Lesson 3 (a-3) images
import lesson3Input from "@/assets/lesson3/page_3.jpg";
import lesson3Output from "@/assets/lesson3/page_8.jpg";
// Lesson 4 (b-1) images
import lesson4Input from "@/assets/lesson4/page_5.jpg";
import lesson4Output from "@/assets/lesson4/page_10.jpg";
// Lesson 5 (b-2) images
import lesson5Input from "@/assets/lesson5/page_5.jpg";
import lesson5Output from "@/assets/lesson5/page_6.jpg";
// Lesson 6 (b-3) images
import lesson6Input from "@/assets/lesson6/page_5.jpg";
import lesson6Output from "@/assets/lesson6/page_15.jpg";

export interface ExerciseExample {
  inputLabel: string;
  inputDescription: string;
  inputImage?: string;
  outputLabel: string;
  outputDescription: string;
  outputImage?: string;
}

export interface ExerciseInfo {
  number: number;
  name: string;
  steps: string[];
  example: ExerciseExample;
}

export const exercisesByTopic: Record<string, ExerciseInfo> = {
  "a-1": {
    number: 1,
    name: "השראה – מרעיון לביצוע",
    steps: [
      "פתחו פרויקט חדש ב-AI ותנו לו שם",
      "נסחו הנחיות (מי אתה, מי אתם, מה הקלט, מה הפלט)",
      "פתחו שיחה חדשה עם ה-AI",
      "העלו תמונת השראה",
      "פתחו את השיחה וקבלו שפה עיצובית מלאה",
    ],
    example: {
      inputLabel: "קלט – תמונת השראה והנחיות",
      inputDescription:
        'העלאת תמונת נוף הררי עם אגם שקט + הנחיות: "אני מעצב/ת פנים. צור שפה עיצובית בהשראת התמונה – כולל פלטת צבעים, חומרים, ואווירה."',
      inputImage: lesson1Input,
      outputLabel: "פלט – שפה עיצובית מלאה",
      outputDescription:
        'קולקציית "Mirror Lake": פלטת צבעים טבעית (כחול עמוק, אפור סלע, כסף), חומרים (זכוכית טרנסלוסנטית, אבן, עץ), ופריטי עיצוב – נעל, תיק, ז\'קט, גופי תאורה וכלי הגשה.',
      outputImage: lesson1Output,
    },
  },
  "a-2": {
    number: 2,
    name: "פיתוח – פירוק והרכבה",
    steps: [
      "פתחו פרויקט חדש ב-AI ותנו לו שם",
      "נסחו הנחיות מפורטות (מי הוא, מי אתם, מה הקלט, מה הפלט)",
      "פתחו שיחה חדשה עם ה-AI",
      "הורידו תמונת השראה והעלו אותה",
      "פרקו את התמונה ל-3 לוחות: צבעים, חומרים, השראה",
      "הרכיבו שפה עיצובית לחללים שונים (סלון, מטבח, חדר שינה וכו׳)",
    ],
    example: {
      inputLabel: "קלט – תמונת השראה + הנחיות פירוק",
      inputDescription:
        'העלאת תמונת נוף הררי עם סירה באגם + הנחיות: "פרק את התמונה ל-3 לוחות השראה: צבעים, חומרים, ופילוסופיית עיצוב. לאחר מכן הרכב שפה עיצובית ל-5 חללים בבית."',
      inputImage: lesson2Input,
      outputLabel: "פלט – לוחות פירוק + עיצוב חללים",
      outputDescription:
        'לוח צבעים: "הרגש הטבעי" – כחול עמוק, אפור-כחלחל, חום סלע, כסף. לוח חומרים: אבן, עץ אורן, זכוכית, בטון, נחושת. הרכבה ל-5 חללים: סלון, מטבח, חדר שינה, מסדרון ומרפסת.',
      outputImage: lesson2Output,
    },
  },
  "a-3": {
    number: 3,
    name: "ביצוע – חומר מקצועי",
    steps: [
      "פתחו פרויקט חדש ב-AI ותנו לו שם",
      "כתבו הנחיות כוללות (אתה אדריכל, מומחה בתחומך, יש לך צוות יועצים)",
      "כתבו צרו שיחות – ליצירת הנחיות ספציפיות ליועצים (משפטי, פנג שואי, פרוגרמות)",
      "הוסיפו חומר כקבצים או טקסטים (חוקים, תקנים, נתונים)",
      "פתחו שיחה חדשה וצרו ממשקים מקצועיים",
    ],
    example: {
      inputLabel: "קלט – הנחיות ליועץ פרוגרמות",
      inputDescription:
        'הנחיות: "אתה אדריכל, מומחה בתחומך. יש לך צוות יועצים. צור מחשבון חלוקת שטחים לדירה לפי שטח כולל – סלון, מטבח, חדרי שינה, עם אחוזים והסברים."',
      inputImage: lesson3Input,
      outputLabel: "פלט – ממשק מחשבון אינטראקטיבי",
      outputDescription:
        "מחשבון חלוקת שטחים לדירה: המשתמש ממלא שטח דירה (100 מ\"ר), הממשק מציע חלוקה – סלון 25% (25 מ\"ר, 4.2×5.9), מטבח 8% (8 מ\"ר, 3.4×2.4), חדר הורים 15%, חדר שינה 12%.",
      outputImage: lesson3Output,
    },
  },
  "b-1": {
    number: 4,
    name: "טבעי – ביומימטיקה",
    steps: [
      "פתחו פרויקט חדש ב-AI ותנו לו שם",
      "כתבו הנחיות: אתה מומחה, אדריכל, מעצב פנים, גם מומחה לכימיה, ביולוגיה ופיזיקה",
      "הגדירו שה-AI ייצר פרומפטים לתמונות: פרט, סקיצה, תוכנית, חתך, חזית, מודל",
      "פתחו שיחה חדשה והעלו אתגר קיומי (למשל: איי חום עירוניים)",
      "בקשו פתרון ביומימטי מעולמות החי, הצומח והדומם",
      "צרו 6 סוגי אילוסטרציה שונים לפתרון",
    ],
    example: {
      inputLabel: "קלט – אתגר קיומי",
      inputDescription:
        'אתגר: "איי חום עירוניים" (Urban Heat Islands) – חפשו פתרונות ביומימטיים לקירור אזורים עירוניים חמים מתוך פיתוח רעיון מעולמות החי, הצומח והדומם.',
      inputImage: lesson4Input,
      outputLabel: "פלט – פתרון ביומימטי + 6 אילוסטרציות",
      outputDescription:
        'מערכת "TreeCool": השראה ממערת הוויינד (דומם), עץ הבאובב (צומח), והטרמיטים (חי). 6 אילוסטרציות: פרט (National Geographic), סקיצה (Zaha Hadid), תוכנית (Foster+Partners), חתך (Tadao Ando), חזית (BIG), מודל פיזי.',
      outputImage: lesson4Output,
    },
  },
  "b-2": {
    number: 5,
    name: "לוגי – פונקציונליות",
    steps: [
      "פתחו פרויקט חדש ב-AI ותנו לו שם",
      "כתבו הנחיות: אתה מומחה, אדריכל, מעצב פנים – בעל פרשנות לוגית, גם מומחה למתמטיקה, פיזיקה וכימיה",
      "הגדירו שה-AI ימפה מושגים מתמטיים-פיזיקליים לייעודים אדריכליים",
      "פתחו שיחה חדשה והעלו ייעוד אדריכלי (משרד, מוזיאון, בית קפה וכו׳)",
      "בקשו פרשנות מתמטית-פיזיקלית לייעוד",
      "צרו פרומפטים להמחשות ויזואליות בסגנונות אדריכליים שונים",
    ],
    example: {
      inputLabel: "קלט – ייעוד אדריכלי",
      inputDescription:
        'ייעוד: "משרד" – בקשו פרשנות מתמטית-פיזיקלית: איזה מושג מדעי מתאים לתכנון משרד אידיאלי? כיצד הוא מתורגם לעיצוב?',
      inputImage: lesson5Input,
      outputLabel: "פלט – פרשנות לוגית + המחשה",
      outputDescription:
        'משרד = תורת הרשתות (Network Theory): 1. מבנה רשתי אופטימלי – כל עמדת עבודה כצומת, 2. דינמיק זרימה – מסלולי תנועה לפי הידרודינמיקה, 3. אקוסטיקה רשתית – אזורי שקט ותקשורת. המחשה בסגנונות Foster+Partners, Zaha Hadid.',
      outputImage: lesson5Output,
    },
  },
  "b-3": {
    number: 6,
    name: "פואטי – תרבות",
    steps: [
      "פתחו פרויקט חדש ב-AI ותנו לו שם",
      "כתבו הנחיות: אתה מומחה, אדריכל, מעצב פנים – בעל הבנה תרבותית עמוקה של שפות ותרבויות העולם",
      "פתחו שיחה חדשה והכניסו שפה/תרבות (נורבגית, יפנית, ערבית, פינית, סינית וכו׳)",
      "בקשו מפת תודעה קוגניטיבית של השפה – איך השפה מעצבת חשיבה מרחבית",
      "תרגמו את המבנה הקוגניטיבי לייעוד אדריכלי מתאים",
      "צרו פרומפטים להמחשות ויזואליות שמשקפות את התרבות",
    ],
    example: {
      inputLabel: "קלט – שפה/תרבות + ייעוד",
      inputDescription:
        'שפה: נורבגית. בקשו: "צרו מפת תודעה קוגניטיבית של השפה הנורבגית ותרגמו אותה לעיצוב גינה/חצר ים-תיכונית."',
      inputImage: lesson6Input,
      outputLabel: "פלט – קונספט תרבותי + עיצוב",
      outputDescription:
        'מפת תודעה: koselig (חמימות), friluftsliv (חיי אוויר חופשי), dugnad (עבודה קהילתית). תרגום: גינה עם צל טבעי, חומרים מקומיים, מרחבים משותפים, מינימליזם פונקציונלי. המחשות בסגנון Snøhetta ו-Nordic Architecture.',
      outputImage: lesson6Output,
    },
  },
};
