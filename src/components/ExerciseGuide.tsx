import { ExerciseInfo } from "@/data/exerciseData";
import { Card, CardContent } from "@/components/ui/card";
import { ListOrdered, ArrowDown, Lightbulb } from "lucide-react";

interface Props {
  exercise: ExerciseInfo;
}

export function ExerciseGuide({ exercise }: Props) {
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
            <div className="rounded-lg border border-primary/20 bg-background p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">קלט</span>
              </div>
              <p className="text-sm font-medium text-foreground">{exercise.example.inputLabel}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {exercise.example.inputDescription}
              </p>
            </div>

            {/* Arrow for mobile */}
            <div className="flex justify-center md:hidden">
              <ArrowDown className="h-5 w-5 text-primary" />
            </div>

            {/* Output */}
            <div className="rounded-lg border border-primary/20 bg-background p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">פלט</span>
              </div>
              <p className="text-sm font-medium text-foreground">{exercise.example.outputLabel}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {exercise.example.outputDescription}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
