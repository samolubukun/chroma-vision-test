import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, Eye, RotateCcw, Share2, Award } from 'lucide-react';
import { TestResult } from './TestScreen';
import { plates } from '@/data/plates';

interface ResultsScreenProps {
  results: TestResult[];
  onRestart: () => void;
}

const ResultsScreen = ({ results, onRestart }: ResultsScreenProps) => {
  const correctCount = results.filter((r) => r.isCorrect).length;
  const totalCount = results.length;
  const percentage = Math.round((correctCount / totalCount) * 100);

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
              Assessment Complete
            </h1>
            <div className="space-y-1">
              <p className="text-xl md:text-2xl font-bold text-muted-foreground leading-relaxed">
                Your overall score is <span className="text-primary">{percentage}%</span>
              </p>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-foreground/40">
                {correctCount} of {totalCount} plates identified
              </p>
            </div>
          </div>

          <div className="pt-4 md:pt-8 space-y-4">
            <Button
              onClick={onRestart}
              size="lg"
              className="w-full h-12 md:h-14 rounded-xl md:rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base md:text-lg shadow-lg hover:scale-[1.02] transition-transform"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Restart Assessment
            </Button>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default ResultsScreen;
