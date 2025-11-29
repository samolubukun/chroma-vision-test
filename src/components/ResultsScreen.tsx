import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
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
  const passed = correctCount >= 17;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-8 md:p-12">
          <div className="text-center space-y-6">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${
              passed ? 'bg-success/10' : 'bg-warning/10'
            }`}>
              <Eye className={`w-12 h-12 ${passed ? 'text-success' : 'text-warning'}`} />
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                Test Complete
              </h1>
              <p className="text-xl text-muted-foreground">
                {passed ? 'Normal Color Vision' : 'Possible Color Vision Deficiency'}
              </p>
            </div>

            <div className="inline-flex items-center gap-4 bg-secondary/50 rounded-lg px-8 py-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary">{correctCount}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="text-4xl text-muted-foreground">/</div>
              <div className="text-center">
                <div className="text-5xl font-bold text-foreground">{totalCount}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>

            <div className="text-2xl font-semibold text-foreground">
              {percentage}% Accuracy
            </div>

            <div className={`p-4 rounded-lg ${
              passed ? 'bg-success/10 border border-success/20' : 'bg-warning/10 border border-warning/20'
            }`}>
              <p className={`font-medium ${passed ? 'text-success' : 'text-warning'}`}>
                {passed
                  ? '✓ You passed the test with 17 or more correct answers.'
                  : '⚠ You scored below 17 correct answers. Consider consulting an eye care professional.'}
              </p>
            </div>
          </div>
        </Card>

        {/* Detailed Results */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Detailed Results</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {results.map((result, index) => {
              const plate = plates.find((p) => p.id === result.plateId);
              return (
                <div
                  key={result.plateId}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  {result.isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-error flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        Plate {result.plateId}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {plate?.type}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Your answer: <span className="font-medium">{result.userAnswer}</span>
                      {!result.isCorrect && plate && (
                        <span className="text-error ml-2">
                          (Expected: {plate.correct_normal.join(', ')})
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground flex-shrink-0">
                    {result.timeRemaining}s left
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="flex gap-4 justify-center">
          <Button onClick={onRestart} size="lg" className="px-8">
            Take Test Again
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>This screening test is not a substitute for professional medical diagnosis.</p>
          <p>Consult an optometrist or ophthalmologist for comprehensive color vision assessment.</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
