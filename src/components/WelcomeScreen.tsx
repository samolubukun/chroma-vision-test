import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye, Mic, Keyboard } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-2xl w-full p-8 md:p-12 shadow-lg">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <Eye className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Ishihara Color Vision Test
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            This test screens for red-green color vision deficiencies using 21 Ishihara plates.
          </p>

          <div className="bg-secondary/50 rounded-lg p-6 text-left space-y-4 mt-8">
            <h2 className="font-semibold text-lg text-foreground">Test Instructions:</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">1</span>
                <span>You will be shown 21 color plates, each displayed for 20 seconds.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">2</span>
                <span>For each plate, identify what you see: numbers, paths, or colors.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">3</span>
                <span>Respond using your voice <Mic className="inline w-4 h-4" /> or type your answer <Keyboard className="inline w-4 h-4" />.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">4</span>
                <span>Passing requires 17 or more correct answers out of 21.</span>
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <Button 
              size="lg" 
              onClick={onStart}
              className="px-8 py-6 text-lg font-semibold"
            >
              Start Test
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Note: This is a screening tool, not a diagnostic test. Consult an eye care professional for diagnosis.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default WelcomeScreen;
