import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Upload, Trash2, ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Submission {
  id: string;
  user_id: string;
  description: string;
  image_url: string;
  created_at: string;
  profiles?: { display_name: string } | null;
}

interface Props {
  sessionId: string;
  topicId: string;
}

export function StudentSubmissions({ sessionId, topicId }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from("student_submissions")
      .select("*, profiles(display_name)")
      .eq("session_id", sessionId)
      .eq("topic_id", topicId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setSubmissions(data as Submission[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubmissions();
  }, [sessionId, topicId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async () => {
    if (!user || !file || !description.trim()) {
      toast({ title: "יש למלא תיאור ולהעלות תמונה", variant: "destructive" });
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${user.id}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("submissions")
      .upload(path, file);

    if (uploadError) {
      toast({ title: "שגיאה בהעלאת התמונה", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("submissions").getPublicUrl(path);

    const { error: insertError } = await supabase.from("student_submissions").insert({
      user_id: user.id,
      session_id: sessionId,
      topic_id: topicId,
      description: description.trim(),
      image_url: urlData.publicUrl,
    });

    if (insertError) {
      toast({ title: "שגיאה בשמירה", description: insertError.message, variant: "destructive" });
    } else {
      toast({ title: "התרגיל הועלה בהצלחה!" });
      setDescription("");
      setFile(null);
      setPreview(null);
      fetchSubmissions();
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("student_submissions").delete().eq("id", id);
    if (!error) {
      setSubmissions((s) => s.filter((sub) => sub.id !== id));
      toast({ title: "התרגיל נמחק" });
    }
  };

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <ImageIcon className="h-5 w-5 text-primary" />
        תרגילי סטודנטים
      </h2>

      {/* Upload form */}
      {user ? (
        <Card className="mb-8">
          <CardContent className="p-5 space-y-4">
            <p className="font-semibold text-foreground">שתפו את התרגיל שלכם</p>
            <Textarea
              placeholder="תארו את התרגיל שעשיתם..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[80px]"
            />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent cursor-pointer text-sm">
                <Upload className="h-4 w-4" />
                {file ? file.name : "העלו תמונה"}
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <Button onClick={handleSubmit} disabled={uploading || !file || !description.trim()}>
                {uploading ? "מעלה..." : "שתף"}
              </Button>
            </div>
            {preview && (
              <img src={preview} alt="תצוגה מקדימה" className="max-h-48 rounded-lg border" />
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-8">
          <CardContent className="p-5 text-center space-y-3">
            <p className="text-muted-foreground">התחברו כדי לשתף את התרגיל שלכם</p>
            <Button onClick={() => navigate("/auth")}>התחברות</Button>
          </CardContent>
        </Card>
      )}

      {/* Submissions grid */}
      {loading ? (
        <p className="text-muted-foreground text-center">טוען...</p>
      ) : submissions.length === 0 ? (
        <p className="text-muted-foreground text-center">עדיין לא הועלו תרגילים. היו הראשונים!</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {submissions.map((sub) => (
            <Card key={sub.id} className="overflow-hidden">
              <img
                src={sub.image_url}
                alt={sub.description}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4 space-y-2">
                <p className="text-sm text-foreground leading-relaxed">{sub.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {sub.profiles?.display_name ?? "סטודנט"}
                  </span>
                  {user?.id === sub.user_id && (
                    <button
                      onClick={() => handleDelete(sub.id)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
