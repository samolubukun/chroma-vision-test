import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye, RotateCcw, Award } from 'lucide-react';
import { TestResult } from './TestScreen';
import { plates } from '@/data/plates';

interface ResultsScreenProps {
  eye: 'left' | 'right';
  results: TestResult[];
  otherEyeResults?: TestResult[];
  onNextEye: () => void;
  onRestart: () => void;
}

const ResultsScreen = ({ eye, results, otherEyeResults, onNextEye, onRestart }: ResultsScreenProps) => {
  const calculateDiagnosis = (testResults: TestResult[]) => {
    if (testResults.length === 0) return "No data";

    // Plate 1 is demonstration
    const others = testResults.filter(r => r.plateId !== 1);

    // Rule: Total Color Blindness (Fails all except plate 1)
    const allFailed = others.length > 5 && others.every(r => !r.isCorrect);
    if (allFailed) return "Total Color Blindness";

    // Rule: Protan/Deutan (Plates 16 & 17)
    const p16 = testResults.find(r => r.plateId === 16);
    const p17 = testResults.find(r => r.plateId === 17);

    if (p16 && p17) {
      if (p16.userAnswer === '6' && p17.userAnswer === '2') return "Protan Deficiency (Red-Blind)";
      if (p16.userAnswer === '2' && p17.userAnswer === '4') return "Deutan Deficiency (Green-Blind)";
    }

    // Rule: Red-Green Deficiency (Nothing on 9-14)
    const vPlates = testResults.filter(r => r.plateId >= 9 && r.plateId <= 14);
    const seesNothing = vPlates.filter(r => ['nothing', 'blank', '0', 'none'].includes(r.userAnswer.toLowerCase()));
    if (seesNothing.length >= 4) return "Red-Green Deficiency";

    // Rule: Normal (13+ correct)
    const normalCorrect = testResults.filter(r => {
      const plate = plates.find(p => p.id === r.plateId);
      return plate?.correct_normal.includes(r.userAnswer);
    }).length;

    if (normalCorrect >= 13) return "Normal Color Vision";
    if (normalCorrect >= 9) return "Mild Color Vision Deficiency";

    return "Color Vision Deficiency Detected";
  };

  const diagnosis = calculateDiagnosis(results);
  const correctCount = results.filter((r) => r.isCorrect).length;
  const totalCount = results.length;
  const percentage = Math.round((correctCount / totalCount) * 100);

  const otherDiagnosis = otherEyeResults ? calculateDiagnosis(otherEyeResults) : null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 bg-background relative">
      <div className="max-w-2xl w-full relative z-10 py-8 md:py-0 fade-in">

        {/* Diagnostic Score Card */}
        <Card className="bg-white border border-slate-200 shadow-2xl overflow-hidden p-6 md:p-12 text-center space-y-6 md:space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 text-primary shadow-xl">
            <Award className="w-10 h-10 md:w-12 md:h-12" />
          </div>

          <div className="space-y-3 md:space-y-4">
            <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter">
              {eye === 'left' ? 'Left Eye' : 'Right Eye'} Complete
            </h1>

            <div className="grid grid-cols-1 gap-4 text-left">
              <div className="space-y-2 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-foreground/40">
                  {eye === 'left' ? 'Left' : 'Right'} Eye Assessment
                </p>
                <p className="text-xl md:text-2xl font-bold text-primary">
                  {diagnosis}
                </p>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden mt-4">
                  <div 
                    className="h-full bg-primary transition-all duration-1000" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground font-medium mt-1">
                  Score: {percentage}% ({correctCount}/{totalCount} plates matched expected responses)
                </p>
              </div>

              {otherDiagnosis && (
                <div className="space-y-2 p-6 bg-slate-50/50 rounded-2xl border border-slate-100 border-dashed opacity-80">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">
                    Previous Eye Assessment
                  </p>
                  <p className="text-lg md:text-xl font-bold text-slate-500">
                    {otherDiagnosis}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 md:pt-8 space-y-4">
            {eye === 'left' ? (
              <Button
                onClick={onNextEye}
                size="lg"
                className="w-full h-12 md:h-14 rounded-xl md:rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base md:text-lg shadow-lg hover:scale-[1.02] transition-transform"
              >
                Proceed to Right Eye
                <Eye className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={onRestart}
                size="lg"
                className="w-full h-12 md:h-14 rounded-xl md:rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base md:text-lg shadow-lg hover:scale-[1.02] transition-transform"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Finish Assessment
              </Button>
            )}
          </div>
        </Card>

      </div>
    </div>
  );
};

export default ResultsScreen;
