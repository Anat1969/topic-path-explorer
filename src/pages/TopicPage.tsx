import { useParams, useNavigate } from "react-router-dom";
import { sessions } from "@/data/courseData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Construction } from "lucide-react";

const TopicPage = () => {
  const { sessionId, topicId } = useParams();
  const navigate = useNavigate();

  const session = sessions.find((s) => s.id === sessionId);
  const topic = session?.topics.find((t) => t.id === Number(topicId));

  if (!session || !topic) {
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground text-lg">הנושא לא נמצא</p>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <header className="border-b bg-card py-6 px-4">
        <div className="container mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 gap-2"
          >
            <ArrowRight className="h-4 w-4" />
            חזרה לדשבורד
          </Button>
          <p className="text-muted-foreground text-sm mb-1">
            מפגש {session.letter} – {session.title}
          </p>
          <h1 className="text-3xl font-bold text-foreground">
            {topic.id}. {topic.title} – {topic.subtitle}
          </h1>
          <p className="text-muted-foreground mt-2">{topic.description}</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="py-12 space-y-4">
            <Construction className="h-16 w-16 text-muted-foreground mx-auto" />
            <h2 className="text-2xl font-semibold text-foreground">בקרוב...</h2>
            <p className="text-muted-foreground">
              התוכן של נושא זה יהיה זמין בקרוב. הישארו מעודכנים!
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TopicPage;
