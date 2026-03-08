import { useParams, useNavigate } from "react-router-dom";
import { sessions } from "@/data/courseData";
import { lessonSteps } from "@/data/lessonData";
import { lesson2Steps } from "@/data/lesson2Data";
import { lesson3Steps } from "@/data/lesson3Data";
import { lesson4Steps } from "@/data/lesson4Data";
import { lesson5Steps } from "@/data/lesson5Data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Construction, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import type { LessonStep } from "@/data/lessonData";
import { StudentSubmissions } from "@/components/StudentSubmissions";
import { useAuth } from "@/contexts/AuthContext";

const TopicPage = () => {
  const { sessionId, topicId } = useParams();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const session = sessions.find((s) => s.id === sessionId);
  const topic = session?.topics.find((t) => t.id === Number(topicId));

  const getLessonSteps = () => {
    if (sessionId === "a" && topicId === "1") return lessonSteps;
    if (sessionId === "a" && topicId === "2") return lesson2Steps;
    if (sessionId === "a" && topicId === "3") return lesson3Steps;
    if (sessionId === "b" && topicId === "1") return lesson4Steps;
    if (sessionId === "b" && topicId === "2") return lesson5Steps;
    return null;
  };
  const currentLessonSteps = getLessonSteps();

  if (!session || !topic) {
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground text-lg">הנושא לא נמצא</p>
      </div>
    );
  }

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
            <p className="text-primary-foreground/60 text-sm mb-1">
              מפגש {session.letter} – {session.title}
            </p>
            <h1 className="text-2xl font-bold text-primary-foreground">
              {topic.id}. {topic.title} – {topic.subtitle}
            </h1>
          </div>
          <div className="pt-1">
            {user ? (
              <Button variant="ghost" onClick={signOut} className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 text-sm">
                התנתק
              </Button>
            ) : (
              <Button variant="ghost" onClick={() => navigate("/auth")} className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 text-sm">
                התחברות
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {currentLessonSteps ? (
          <LessonSlideshow steps={currentLessonSteps} />
        ) : (
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="py-12 space-y-4">
              <Construction className="h-16 w-16 text-muted-foreground mx-auto" />
              <h2 className="text-2xl font-semibold text-foreground">בקרוב...</h2>
              <p className="text-muted-foreground">
                התוכן של נושא זה יהיה זמין בקרוב. הישארו מעודכנים!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Student submissions section */}
        {sessionId && topicId && (
          <div className="max-w-5xl mx-auto">
            <StudentSubmissions sessionId={sessionId} topicId={topicId} />
          </div>
        )}
      </main>
    </div>
  );
};

function LessonSlideshow({ steps }: { steps: LessonStep[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const step = steps[currentIndex];
  const total = steps.length;

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, total - 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goNext(); // RTL: left = forward
      if (e.key === "ArrowRight") goPrev(); // RTL: right = backward
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  // Click on image sides for navigation
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const halfWidth = rect.width / 2;
    // RTL: right side = previous, left side = next
    if (clickX < halfWidth) {
      goNext();
    } else {
      goPrev();
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm font-medium text-muted-foreground">
          {currentIndex + 1} / {total}
        </span>
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Title bar */}
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold bg-primary text-primary-foreground shrink-0">
          {step.id}
        </span>
        <h3 className="font-bold text-foreground text-xl flex-1">
          {step.title}
        </h3>
      </div>

      {/* Slide area */}
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

      {/* Navigation arrows outside the card */}
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

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed mt-4 text-base">
        {step.content}
      </p>

      {/* Bottom navigation buttons */}
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

export default TopicPage;
