import { useParams, useNavigate } from "react-router-dom";
import { sessions } from "@/data/courseData";
import { lessonSteps } from "@/data/lessonData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Construction, ChevronDown } from "lucide-react";
import { useState } from "react";

const TopicPage = () => {
  const { sessionId, topicId } = useParams();
  const navigate = useNavigate();

  const session = sessions.find((s) => s.id === sessionId);
  const topic = session?.topics.find((t) => t.id === Number(topicId));

  // Only session a, topic 1 has lesson content
  const hasLesson = sessionId === "a" && topicId === "1";

  if (!session || !topic) {
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground text-lg">הנושא לא נמצא</p>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <header className="border-b bg-primary py-6 px-4">
        <div className="container mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 gap-2 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowRight className="h-4 w-4" />
            חזרה לדשבורד
          </Button>
          <p className="text-primary-foreground/60 text-sm mb-1">
            מפגש {session.letter} – {session.title}
          </p>
          <h1 className="text-3xl font-bold text-primary-foreground">
            {topic.id}. {topic.title} – {topic.subtitle}
          </h1>
          <p className="text-primary-foreground/70 mt-2">{topic.description}</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        {hasLesson ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {lessonSteps.map((step) => (
              <LessonStepCard key={step.id} step={step} />
            ))}
          </div>
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
      </main>
    </div>
  );
};

function LessonStepCard({ step }: { step: (typeof lessonSteps)[0] }) {
  const [expanded, setExpanded] = useState(step.id <= 2);

  return (
    <Card className="overflow-hidden border transition-shadow hover:shadow-md">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-right"
      >
        <div className="flex items-center gap-4 p-5 bg-secondary/40">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold bg-primary text-primary-foreground shrink-0">
            {step.id}
          </span>
          <h3 className="font-semibold text-foreground text-lg flex-1">
            {step.title}
          </h3>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {expanded && (
        <CardContent className="p-0">
          <div className="p-5">
            <p className="text-muted-foreground leading-relaxed mb-4">
              {step.content}
            </p>
          </div>
          <div className="border-t bg-muted/30 p-3">
            <img
              src={step.image}
              alt={step.imageAlt}
              className="w-full rounded-lg shadow-sm"
              loading="lazy"
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default TopicPage;
