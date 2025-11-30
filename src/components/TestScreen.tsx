import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { plates, getInstructions } from '@/data/plates';
import { useToast } from '@/hooks/use-toast';

interface TestScreenProps {
  onComplete: (results: TestResult[]) => void;
}

export interface TestResult {
  plateId: number;
  userAnswer: string;
  isCorrect: boolean;
  timeRemaining: number;
}

const TestScreen = ({ onComplete }: TestScreenProps) => {
  const [currentPlateIndex, setCurrentPlateIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(20);
  const [results, setResults] = useState<TestResult[]>([]);
  const { toast } = useToast();
  const { speak, isSpeaking } = useTextToSpeech();

  const currentPlate = plates[currentPlateIndex];
  const progress = ((currentPlateIndex) / plates.length) * 100;

  // Speak instructions when plate changes
  useEffect(() => {
    if (currentPlate) {
      const instruction = getInstructions(currentPlate);
      speak(instruction);
    }
  }, [currentPlateIndex]);

  // Timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleSubmit();
    }
  }, [timeLeft]);

  const convertWordsToDigits = (text: string): string => {
    const numberWords: { [key: string]: string } = {
      'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
      'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
      'ten': '10', 'eleven': '11', 'twelve': '12', 'thirteen': '13',
      'fourteen': '14', 'fifteen': '15', 'sixteen': '16', 'seventeen': '17',
      'eighteen': '18', 'nineteen': '19', 'twenty': '20', 'thirty': '30',
      'forty': '40', 'fifty': '50', 'sixty': '60', 'seventy': '70',
      'eighty': '80', 'ninety': '90'
    };

    let result = text.toLowerCase().trim();
    
    // Handle compound numbers like "twenty nine" or "seventy four"
    const compoundPattern = /(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)[\s-]?(one|two|three|four|five|six|seven|eight|nine)/g;
    result = result.replace(compoundPattern, (match, tens, ones) => {
      return String(parseInt(numberWords[tens]) + parseInt(numberWords[ones]));
    });
    
    // Replace individual number words
    Object.keys(numberWords).forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'g');
      result = result.replace(regex, numberWords[word]);
    });
    
    return result;
  };

  const checkAnswer = (answer: string): boolean => {
    // 💡 MODIFICATION START: Make 54.jpg always correct
    if (currentPlate.file === '54.jpg') {
      return true; 
    }
    // 💡 MODIFICATION END

    // Convert words to digits and normalize
    const convertedAnswer = convertWordsToDigits(answer);
    const normalizedAnswer = convertedAnswer.toLowerCase().trim().replace(/\s+/g, '');
    
    // Check against all possible correct answers
    const allCorrectAnswers = [
      ...currentPlate.correct_normal,
      ...(currentPlate.correct_red_green || []),
      ...(currentPlate.correct_protan || []),
      ...(currentPlate.correct_deuteran || [])
    ];

    return allCorrectAnswers.some(correct => 
      normalizedAnswer === correct.toLowerCase().replace(/\s+/g, '')
    );
  };

  const handleSubmit = () => {
    const isCorrect = checkAnswer(userInput);
    
    const result: TestResult = {
      plateId: currentPlate.id,
      userAnswer: userInput || 'No answer',
      isCorrect,
      timeRemaining: timeLeft,
    };

    setResults([...results, result]);

    if (currentPlateIndex < plates.length - 1) {
      setCurrentPlateIndex(currentPlateIndex + 1);
      setUserInput('');
      setTimeLeft(20);
    } else {
      onComplete([...results, result]);
    }
  };

  const handleSpeechResult = (transcript: string) => {
    setUserInput(transcript);
    toast({
      title: 'Voice recognized',
      description: `You said: "${transcript}"`,
    });
  };

  const { isListening, startListening, isSupported: micSupported } = useSpeechRecognition({
    onResult: handleSpeechResult,
    onError: (error) => {
      toast({
        title: 'Voice input error',
        description: error,
        variant: 'destructive',
      });
    },
  });

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Plate {currentPlateIndex + 1} of {plates.length}</span>
            <span className="font-semibold text-timer-bg">{timeLeft}s</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Plate Display */}
        <Card className="p-8 md:p-12">
          <div className="aspect-square max-w-md mx-auto bg-muted rounded-lg overflow-hidden shadow-inner">
            <img
              src={`/plates/${currentPlate.file}`}
              alt={`Ishihara Plate ${currentPlate.id}`}
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="%23e5e7eb"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="%236b7280" text-anchor="middle" dy=".3em">Plate ' + currentPlate.id + '</text></svg>';
              }}
            />
          </div>
        </Card>

        {/* Input Section */}
        <Card className="p-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-foreground">
              Your Answer:
            </label>
            
            <div className="flex gap-2">
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Type your answer or use voice..."
                className="flex-1 text-lg"
                autoFocus
              />
              
              {micSupported && (
                <Button
                  variant={isListening ? 'default' : 'outline'}
                  size="icon"
                  onClick={isListening ? undefined : startListening}
                  disabled={isListening || isSpeaking}
                  className={isListening ? 'bg-error' : ''}
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </Button>
              )}
            </div>

            <Button 
              onClick={handleSubmit}
              className="w-full"
              size="lg"
              disabled={!userInput.trim() && timeLeft > 0}
            >
              {timeLeft === 0 ? 'Time Up - Next Plate' : 'Submit Answer'}
            </Button>
          </div>
        </Card>

        {/* Instructions reminder */}
        <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
          <Volume2 className="w-4 h-4" />
          <span>Listen to the voice instructions or read the prompt</span>
        </div>
      </div>
    </div>
  );
};

export default TestScreen;
