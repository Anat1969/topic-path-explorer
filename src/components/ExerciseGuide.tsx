import { ExerciseInfo } from "@/data/exerciseData";
import { Card, CardContent } from "@/components/ui/card";
import { ListOrdered, ArrowDown, Lightbulb, ExternalLink } from "lucide-react";

interface Props {
  exercise: ExerciseInfo;
  onNavigateToSlide?: (slideIndex: number) => void;
}

export function ExerciseGuide({ exercise, onNavigateToSlide }: Props) {
  const handleImageClick = (slideIndex?: number) => {
    if (slideIndex !== undefined && onNavigateToSlide) {
      onNavigateToSlide(slideIndex);
      // Scroll to top where the slideshow is
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Exercise header */}
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg shrink-0">
          {exercise.number}
        </span>
        <div>
          <h3 className="text-lg font-bold text-foreground">
            תרגיל {exercise.number}: {exercise.name}
          </h3>
          <p className="text-sm text-muted-foreground">בצעו את השלבים הבאים והעלו את התוצאה</p>
        </div>
      </div>

      {/* Steps */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <ListOrdered className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-foreground">שלבי התרגיל</h4>
          </div>
          <ol className="space-y-3 mr-1">
            {exercise.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-foreground leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Example section */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-foreground">דוגמה מהמצגת</h4>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Input */}
            <div className="rounded-lg border border-primary/20 bg-background overflow-hidden">
              {exercise.example.inputImage && (
                <div
                  className={`relative group ${exercise.example.inputSlideIndex !== undefined && onNavigateToSlide ? 'cursor-pointer' : ''}`}
                  onClick={() => handleImageClick(exercise.example.inputSlideIndex)}
                >
                  <img
                    src={exercise.example.inputImage}
                    alt={exercise.example.inputLabel}
                    className="w-full h-40 object-cover transition-opacity group-hover:opacity-80"
                  />
                  {exercise.example.inputSlideIndex !== undefined && onNavigateToSlide && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-primary/20">
                      <span className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full shadow">
                        <ExternalLink className="h-3.5 w-3.5" />
                        צפה במצגת
                      </span>
                    </div>
                  )}
                </div>
              )}
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">קלט</span>
                </div>
                <p className="text-sm font-medium text-foreground">{exercise.example.inputLabel}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {exercise.example.inputDescription}
                </p>
              </div>
            </div>

            {/* Arrow for mobile */}
            <div className="flex justify-center md:hidden">
              <ArrowDown className="h-5 w-5 text-primary" />
            </div>

            {/* Output */}
            <div className="rounded-lg border border-primary/20 bg-background overflow-hidden">
              {exercise.example.outputImage && (
                <div
                  className={`relative group ${exercise.example.outputSlideIndex !== undefined && onNavigateToSlide ? 'cursor-pointer' : ''}`}
                  onClick={() => handleImageClick(exercise.example.outputSlideIndex)}
                >
                  <img
                    src={exercise.example.outputImage}
                    alt={exercise.example.outputLabel}
                    className="w-full h-40 object-cover transition-opacity group-hover:opacity-80"
                  />
                  {exercise.example.outputSlideIndex !== undefined && onNavigateToSlide && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-primary/20">
                      <span className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full shadow">
                        <ExternalLink className="h-3.5 w-3.5" />
                        צפה במצגת
                      </span>
                    </div>
                  )}
                </div>
              )}
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">פלט</span>
                </div>
                <p className="text-sm font-medium text-foreground">{exercise.example.outputLabel}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {exercise.example.outputDescription}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
