import { useNavigate } from "react-router-dom";
import { introSteps } from "@/data/introData";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, BookOpen, ChevronLeft, ChevronRight, Copy, Check } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import type { LessonStep } from "@/data/lessonData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AIMenu from "@/components/AIMenu";

const settingTemplate = `# Setting – העדפות משתמש

## טון תקשורת:
[רשמי / ידידותי / מקצועי / יצירתי]

## שפה מועדפת:
[עברית / אנגלית / דו-לשוני]

## אורך תשובות:
[קצר וממוקד / בינוני / מפורט ומעמיק]

## סגנון כתיבה:
[אקדמי / שיחתי / טכני / פואטי]

## תחום מומחיות:
[אדריכלות / עיצוב / אמנות / אחר: ___]

## העדפות נוספות:
[תמיד הצע חלופות / שאל לפני שתמשיך / הוסף דוגמאות ויזואליות]`;

const projectTemplate = `# Project Instructions – הנחיות פרויקט

## שם הפרויקט:
[___]

## מטרת הפרויקט:
[תאר בקצרה את מטרת הפרויקט]

## קהל יעד:
[מי ישתמש/יראה את התוצר?]

## סגנון ויזואלי:
[מינימליסטי / מקסימליסטי / ברוטליסטי / אורגני / אחר: ___]

## מגבלות ואילוצים:
[חומרים / תקציב / זמן / קנה מידה]

## השראות ורפרנסים:
[שמות אדריכלים, פרויקטים, או קישורים]

## פורמט פלט רצוי:
[טקסט / תמונה / דיאגרמה / שילוב]

## הערות מיוחדות:
[___]`;

const chatTemplate = `# Custom Instructions – הנחיות לשיחה

## תפקיד ה-AI:
[אתה מומחה ב___ / אתה שותף יצירתי ב___ / אתה מנחה ל___]

## מבנה התשובה:
[נקודות / פסקאות / טבלה / רשימה ממוספרת]

## רמת יצירתיות:
[שמרני ומבוסס עובדות / מאוזן / יצירתי וחופשי / ניסיוני וקיצוני]

## פורמט ויזואלי:
[יחס 16:9 / 1:1 / 9:16] | [צילומי / אילוסטרציה / קולאז׳]

## סגנון התייחסות:
[כמו ___ (שם אמן/אדריכל)] | [תקופה: ___] | [תנועה: ___]

## מילות מפתח לכיוון:
[זקק / חלץ / שכלל / הפתע / ערער]

## מה לא לעשות:
[אל תפשט יתר על המידה / אל תחזור על עצמך / אל תשתמש בקלישאות]`;

const IntroPage = () => {
  const navigate = useNavigate();

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <header className="border-b bg-primary py-4 px-4">
        <div className="container mx-auto flex items-start justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-2 gap-2 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowRight className="h-4 w-4" />
              חזרה לדשבורד
            </Button>
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary-foreground/80" />
              <h1 className="text-2xl font-bold text-primary-foreground">
                הקדמה לקורס – AI ויצירה
              </h1>
            </div>
          </div>
          <AIMenu />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 bg-muted/20">
        <IntroSlideshow steps={introSteps} />
        <SummarySection />
        <TemplatesSection />
      </main>
    </div>
  );
};

function IntroSlideshow({ steps }: { steps: LessonStep[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const step = steps[currentIndex];
  const total = steps.length;

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, total - 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goNext();
      if (e.key === "ArrowRight") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const halfWidth = rect.width / 2;
    if (clickX < halfWidth) {
      goNext();
    } else {
      goPrev();
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-base font-medium text-muted-foreground">
          {currentIndex + 1} / {total}
        </span>
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold bg-primary text-primary-foreground shrink-0">
          {step.id}
        </span>
        <h3 className="font-bold text-foreground text-2xl md:text-3xl flex-1">
          {step.title}
        </h3>
      </div>

      <div
        className="relative rounded-xl overflow-hidden bg-muted/30 border shadow-lg cursor-pointer select-none group"
        onClick={handleImageClick}
      >
        <img
          src={step.image}
          alt={step.imageAlt}
          className="w-full block"
          draggable={false}
        />
      </div>

      <div className="flex justify-between mt-2 px-0">
        {currentIndex < total - 1 ? (
          <button onClick={goNext} className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </button>
        ) : <div />}
        {currentIndex > 0 ? (
          <button onClick={goPrev} className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
            <ChevronRight className="h-6 w-6 text-foreground" />
          </button>
        ) : <div />}
      </div>

      <p className="text-muted-foreground leading-relaxed mt-5 text-lg md:text-xl">
        {step.content}
      </p>

      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="gap-2"
        >
          <ArrowRight className="h-4 w-4" />
          הקודם
        </Button>
        <Button
          onClick={goNext}
          disabled={currentIndex === total - 1}
          className="gap-2"
        >
          הבא
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function SummarySection() {
  return (
    <div className="max-w-5xl mx-auto mt-16 mb-12">
      <div className="border-t pt-10">
        <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground text-xl font-bold">✦</span>
          סיכום ההקדמה
        </h2>
        <Card className="bg-muted/50 border-muted">
          <CardContent className="p-8 space-y-5 text-foreground leading-relaxed text-lg">
            <p>
              <strong>עוגת הידע:</strong> שלושה אזורים – מה שאנחנו יודעים (אדום), מה שאנחנו מכירים אבל לא יודעים (כתום), ומה שלא מכירים ולא יודעים (צהוב). המטרה – להרחיב את הצהוב ולהפוך אותו לאדום.
            </p>
            <p>
              <strong>חשיבה מהירה ואיטית:</strong> מערכת 1 (אינטואיציה) + מערכת 2 (ניתוח) – שילוב עם AI יוצר ״חכמה״ משותפת.
            </p>
            <p>
              <strong>מכלי לשותף:</strong> המסע עובר משימוש ב-AI ככלי → דרך בחירת ידע חדש → ועד לגילוי עולמות לא מוכרים. ככל שאנחנו פתוחים יותר ללא-נודע, כך הידע שלנו מתעשר.
            </p>
            <p>
              <strong>הנדסת פרומפטים:</strong> לא טריק טכני – אלא כלי לחידוד החשיבה. כשמנסחים פרומפט, מחדדים לעצמנו מה באמת מחפשים.
            </p>
            <p>
              <strong>שלוש רמות הנחייה:</strong> Setting (העדפות כלליות) → Project (הקשר פרויקט) → Custom Instructions (הנחיות מותאמות לשיחה). כל רמה משפיעה על איכות התוצר.
            </p>
            <p>
              <strong>ארבע רמות ניסוח:</strong> בסיסי → משודרג → מובנה עם פרמטרים → מנוסח ממקסם (״זקק, חלץ, שכלל״).
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CopyableTemplate({ title, icon, template }: { title: string; icon: string; template: string }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(template);
    setCopied(true);
    toast({ title: "הועתק!", description: `תבנית ${title} הועתקה ללוח` });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-2 hover:border-primary/50 transition-colors bg-muted/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="text-2xl">{icon}</span>
            {title}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="gap-2 shrink-0"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "הועתק!" : "העתק"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <pre
          dir="rtl"
          className="whitespace-pre-wrap text-base leading-relaxed bg-muted/60 rounded-lg p-5 text-foreground font-mono overflow-x-auto"
        >
          {template}
        </pre>
      </CardContent>
    </Card>
  );
}

function TemplatesSection() {
  return (
    <div className="max-w-5xl mx-auto mb-16">
      <h2 className="text-3xl font-bold text-foreground mb-3 flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground text-xl font-bold">📋</span>
        תרגיל הקדמה – בניית הגדרות אישיות
      </h2>
      <p className="text-muted-foreground mb-6 text-lg">
        העתיקו כל תבנית, מלאו את השדות, והדביקו בממשק ה-AI שלכם. זו נקודת ההתחלה לעבודה מקצועית עם בינה מלאכותית.
      </p>
      <div className="space-y-6">
        <CopyableTemplate
          title="Setting – העדפות משתמש"
          icon="⚙️"
          template={settingTemplate}
        />
        <CopyableTemplate
          title="Project – הנחיות פרויקט"
          icon="📐"
          template={projectTemplate}
        />
        <CopyableTemplate
          title="Custom Instructions – הנחיות לשיחה"
          icon="💬"
          template={chatTemplate}
        />
      </div>
    </div>
  );
}

export default IntroPage;
