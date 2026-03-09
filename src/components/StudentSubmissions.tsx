import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Upload, Trash2, ImageIcon, Users, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { exercisesByTopic } from "@/data/exerciseData";
import { ExerciseGuide } from "@/components/ExerciseGuide";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
  const [displayName, setDisplayName] = useState("");
  const [nameLoaded, setNameLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Submission | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("display_name")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.display_name) setDisplayName(data.display_name);
        setNameLoaded(true);
      });
  }, [user]);

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from("student_submissions")
      .select("*")
      .eq("session_id", sessionId)
      .eq("topic_id", topicId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      const userIds = [...new Set(data.map((d) => d.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name")
        .in("user_id", userIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, p.display_name]) ?? []);

      setSubmissions(
        data.map((d) => ({
          ...d,
          profiles: { display_name: profileMap.get(d.user_id) ?? "סטודנט" },
        }))
      );
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
    if (!user || !file || !description.trim() || !displayName.trim()) {
      toast({ title: "יש למלא שם, תיאור ולהעלות תמונה", variant: "destructive" });
      return;
    }

    setUploading(true);

    await supabase
      .from("profiles")
      .update({ display_name: displayName.trim() })
      .eq("user_id", user.id);

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

  const exerciseKey = `${sessionId}-${topicId}`;
  const exercise = exercisesByTopic[exerciseKey];

  return (
    <div className="mt-12 space-y-10">
      {/* Exercise guide & upload section */}
      <div className="border-t pt-8">
        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-primary" />
          תרגילי סטודנטים
        </h2>

        {exercise && (
          <div className="mb-8">
            <ExerciseGuide exercise={exercise} onNavigateToSlide={onNavigateToSlide} />
          </div>
        )}

        {user ? (
          <Card className="mb-4">
            <CardContent className="p-5 space-y-4">
              <p className="font-semibold text-foreground">שתפו את התרגיל שלכם</p>
              <Input
                placeholder="השם שלכם"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                maxLength={50}
              />
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
                <Button onClick={handleSubmit} disabled={uploading || !file || !description.trim() || !displayName.trim()}>
                  {uploading ? "מעלה..." : "שתף"}
                </Button>
              </div>
              {preview && (
                <img src={preview} alt="תצוגה מקדימה" className="max-h-48 rounded-lg border" />
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-4">
            <CardContent className="p-5 text-center space-y-3">
              <p className="text-muted-foreground">התחברו כדי לשתף את התרגיל שלכם</p>
              <Button onClick={() => navigate("/auth")}>התחברות</Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Gallery section - visible to everyone */}
      <div className="border-t pt-8">
        <div className="flex items-center gap-3 mb-6">
          <Users className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-xl font-bold text-foreground">גלריית עבודות הכיתה</h2>
            <p className="text-sm text-muted-foreground">
              {loading ? "טוען..." : `${submissions.length} עבודות הועלו`}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse text-muted-foreground">טוען עבודות...</div>
          </div>
        ) : submissions.length === 0 ? (
          <Card className="bg-muted/30">
            <CardContent className="py-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">עדיין לא הועלו עבודות</p>
              <p className="text-sm text-muted-foreground/70 mt-1">היו הראשונים לשתף את התרגיל שלכם!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {submissions.map((sub) => (
              <Card
                key={sub.id}
                className="overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedImage(sub)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={sub.image_url}
                    alt={sub.description}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4 space-y-2">
                  <p className="text-sm text-foreground leading-relaxed line-clamp-2">{sub.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">
                          {(sub.profiles?.display_name ?? "ס").charAt(0)}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">
                        {sub.profiles?.display_name ?? "סטודנט"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground/60">
                        {new Date(sub.created_at).toLocaleDateString("he-IL")}
                      </span>
                      {user?.id === sub.user_id && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(sub.id);
                          }}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedImage && (
            <div>
              <img
                src={selectedImage.image_url}
                alt={selectedImage.description}
                className="w-full max-h-[70vh] object-contain bg-black/5"
              />
              <div className="p-5 space-y-2">
                <p className="text-foreground leading-relaxed">{selectedImage.description}</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">
                      {(selectedImage.profiles?.display_name ?? "ס").charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">
                    {selectedImage.profiles?.display_name ?? "סטודנט"}
                  </span>
                  <span className="text-xs text-muted-foreground/60 mr-auto">
                    {new Date(selectedImage.created_at).toLocaleDateString("he-IL")}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
