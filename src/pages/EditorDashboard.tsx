import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, ArrowRight, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { sessions } from "@/data/courseData";

interface Submission {
  id: string;
  user_id: string;
  session_id: string;
  topic_id: string;
  description: string;
  image_url: string;
  created_at: string;
  display_name?: string;
}

const EditorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const { data, error } = await supabase
      .from("student_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "שגיאה בטעינה", variant: "destructive" });
      setLoading(false);
      return;
    }

    const userIds = [...new Set(data.map((d) => d.user_id))];
    const { data: profiles } = userIds.length
      ? await supabase.from("profiles").select("user_id, display_name").in("user_id", userIds)
      : { data: [] };

    const profileMap = new Map<string, string>(
      (profiles ?? []).map((p: { user_id: string; display_name: string }) => [p.user_id, p.display_name])
    );

    setSubmissions(
      data.map((d) => ({ ...d, display_name: profileMap.get(d.user_id) ?? "סטודנט" } as Submission))
    );
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("student_submissions").delete().eq("id", id);
    if (!error) {
      setSubmissions((s) => s.filter((sub) => sub.id !== id));
      toast({ title: "נמחק בהצלחה" });
    }
  };

  const getTopicLabel = (sessionId: string, topicId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    const topic = session?.topics.find((t) => t.id === Number(topicId));
    return topic ? `${session?.letter} - ${topic.title}` : `${sessionId}/${topicId}`;
  };

  const studentNames = [...new Set(submissions.map((s) => s.display_name ?? "סטודנט"))];
  const filtered = filter === "all" ? submissions : submissions.filter((s) => s.display_name === filter);

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <header className="border-b bg-primary py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-2 gap-2 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowRight className="h-4 w-4" />
              חזרה לדשבורד
            </Button>
            <h1 className="text-2xl font-bold text-primary-foreground flex items-center gap-2">
              <Users className="h-6 w-6" />
              תרגילי סטודנטים - תצוגת עורך
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Filter by student */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            הכל ({submissions.length})
          </Button>
          {studentNames.map((name) => (
            <Button
              key={name}
              variant={filter === name ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(name!)}
            >
              {name} ({submissions.filter((s) => s.display_name === name).length})
            </Button>
          ))}
        </div>

        {loading ? (
          <p className="text-muted-foreground text-center">טוען...</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground text-center">אין תרגילים להצגה</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((sub) => (
              <Card key={sub.id} className="overflow-hidden">
                <img src={sub.image_url} alt={sub.description} className="w-full h-48 object-cover" />
                <CardContent className="p-4 space-y-2">
                  <p className="text-sm text-foreground leading-relaxed">{sub.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-primary">{sub.display_name}</span>
                      <span className="text-xs text-muted-foreground mr-2">
                        · {getTopicLabel(sub.session_id, sub.topic_id)}
                      </span>
                    </div>
                    {user?.id === sub.user_id && (
                      <button onClick={() => handleDelete(sub.id)} className="text-destructive hover:text-destructive/80">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(sub.created_at).toLocaleDateString("he-IL")}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default EditorDashboard;
