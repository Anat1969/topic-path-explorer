import { useNavigate } from "react-router-dom";
import { sessions } from "@/data/courseData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Sparkles, Cpu, Play } from "lucide-react";

const sessionIcons = [Cpu, Sparkles];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary py-10 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <BookOpen className="h-8 w-8 text-primary-foreground/80" />
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              קורס מתקדם – AI ויצירה
            </h1>
          </div>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            שתי מפגשים, שישה נושאים – מסע מעמיק לעולם היצירה עם בינה מלאכותית
          </p>
        </div>
      </header>

      {/* Sessions Grid */}
      <main className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sessions.map((session, sessionIndex) => {
            const Icon = sessionIcons[sessionIndex];
            const isFirst = sessionIndex === 0;

            return (
              <Card
                key={session.id}
                className="overflow-hidden border shadow-sm"
              >
                {/* Session Header */}
                <CardHeader className="bg-secondary/60 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-foreground">
                        מפגש {session.letter} – {session.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {session.subtitle}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                {/* Explanation */}
                <div className="px-5 pt-4 pb-2">
                  <h3 className="font-bold text-foreground mb-2 text-base border-b-2 border-primary inline-block pb-1">
                    {session.explanationTitle}
                  </h3>
                  <ul className="space-y-1.5 mt-2">
                    {session.explanationPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Topics */}
                <CardContent className="p-4 space-y-3">
                  {session.topics.map((topic) => (
                    <Card
                      key={topic.id}
                      className="group cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/40 border"
                      onClick={() =>
                        navigate(`/session/${session.id}/topic/${topic.id}`)
                      }
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold bg-primary text-primary-foreground">
                                {topic.id}
                              </span>
                              <h3 className="font-semibold text-foreground text-lg">
                                {topic.title}
                              </h3>
                              <span className="text-muted-foreground text-sm">
                                – {topic.subtitle}
                              </span>
                            </div>
                            <p className="text-muted-foreground text-sm mr-9">
                              {topic.description}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 mt-1 group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                          >
                            <ArrowLeft className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Index;
