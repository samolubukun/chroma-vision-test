import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, Eye, RotateCcw, Share2, Award } from 'lucide-react';
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
  const correctCount = results.filter((r) => r.isCorrect).length;
  const totalCount = results.length;
  const percentage = Math.round((correctCount / totalCount) * 100);

  const otherCorrectCount = otherEyeResults?.filter((r) => r.isCorrect).length;
  const otherPercentage = otherEyeResults ? Math.round((otherCorrectCount! / otherEyeResults.length) * 100) : null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 bg-background relative">
      <div className="max-w-2xl w-full relative z-10 py-8 md:py-0 fade-in">

        {/* Simplified Score Card */}
        <Card className="bg-white border border-slate-200 shadow-2xl overflow-hidden p-6 md:p-12 text-center space-y-6 md:space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 text-primary shadow-xl">
            <Award className="w-10 h-10 md:w-12 md:h-12" />
          </div>

          <div className="space-y-3 md:space-y-4">
            <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter">
              {eye === 'left' ? 'Left Eye' : 'Right Eye'} Complete
            </h1>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-foreground/40">
                  {eye === 'left' ? 'Current Score' : 'Right Eye Score'}
                </p>
                <p className="text-2xl md:text-4xl font-bold text-primary">
                  {percentage}% <span className="text-sm text-muted-foreground font-medium">({correctCount}/{totalCount})</span>
                </p>
              </div>

              {otherPercentage !== null && (
                <div className="space-y-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-foreground/40">
                    Left Eye Score
                  </p>
                  <p className="text-2xl md:text-4xl font-bold text-slate-400">
                    {otherPercentage}% <span className="text-sm text-muted-foreground font-medium">({otherCorrectCount}/{otherEyeResults!.length})</span>
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
