import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Timer } from 'lucide-react';
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

  const currentPlate = plates[currentPlateIndex];
  const progress = ((currentPlateIndex) / plates.length) * 100;

  // Shuffle options for the current plate
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    if (currentPlate) {
      const shuffled = [...currentPlate.options].sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffled);
    }
  }, [currentPlateIndex, currentPlate]);

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

    const compoundPattern = /(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)[\s-]?(one|two|three|four|five|six|seven|eight|nine)/g;
    result = result.replace(compoundPattern, (match, tens, ones) => {
      return String(parseInt(numberWords[tens]) + parseInt(numberWords[ones]));
    });

    Object.keys(numberWords).forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'g');
      result = result.replace(regex, numberWords[word]);
    });

    return result;
  };

  const checkAnswer = (answer: string): boolean => {
    if (currentPlate.file === '54.jpg') return true;

    const convertedAnswer = convertWordsToDigits(answer);
    const normalizedAnswer = convertedAnswer.toLowerCase().trim().replace(/\s+/g, '');

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

    const newResults = [...results, result];
    setResults(newResults);

    if (currentPlateIndex < plates.length - 1) {
      setCurrentPlateIndex(currentPlateIndex + 1);
      setUserInput('');
      setTimeLeft(20);
    } else {
      onComplete(newResults);
    }
  };

  const handleOptionClick = (option: string) => {
    setUserInput(option);
    const isCorrect = checkAnswer(option);
    const result: TestResult = {
      plateId: currentPlate.id,
      userAnswer: option,
      isCorrect,
      timeRemaining: timeLeft,
    };

    const newResults = [...results, result];
    setResults(newResults);

    if (currentPlateIndex < plates.length - 1) {
      setCurrentPlateIndex(currentPlateIndex + 1);
      setUserInput('');
      setTimeLeft(20);
    } else {
      onComplete(newResults);
    }
  };


  // Timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleSubmit();
    }
  }, [timeLeft]);


  return (
    <div className="h-[100dvh] w-full flex flex-col bg-background overflow-hidden p-3 md:p-8">
      <div className="max-w-6xl w-full mx-auto flex flex-col h-full space-y-4 md:space-y-6 fade-in">

        {/* Header / Progress - Desktop Only */}
        <div className="hidden md:flex items-center justify-between gap-3 md:gap-6 bg-white border border-slate-200 px-3 py-2 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-sm flex-shrink-0">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="w-7 h-7 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="font-bold text-primary text-xs md:text-base">{currentPlateIndex + 1}</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground hidden sm:block">Progress</p>
              <div className="flex items-center gap-2">
                <Progress value={progress} className="h-1 w-16 sm:w-32 md:w-48" />
                <span className="text-[10px] md:text-xs font-medium text-muted-foreground">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 md:gap-3 px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl bg-primary/5 text-primary transition-colors">
            <Timer className="w-3 h-3 md:w-4 md:h-4" />
            <span className="font-mono font-bold text-[10px] md:text-sm tracking-tighter">{timeLeft}s</span>
          </div>
        </div>

        {/* Main Interface: Grid layout for desktop fit */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-6 min-h-0 overflow-hidden">

          {/* Plate Area */}
          <div className="md:col-span-3 flex flex-col items-center justify-center relative p-3 md:p-6 min-h-0 flex-shrink-0 md:bg-white md:border md:border-slate-200 md:shadow-xl md:rounded-3xl md:overflow-hidden">
            {/* Absolute Overlays for Mobile Only */}
            <div className="absolute top-0 left-0 md:top-3 md:left-3 inline-flex items-center gap-2 px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-white/90 md:bg-slate-50 text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground border border-slate-100 italic z-30 shadow-sm">
              Plate {currentPlate.id}
            </div>

            {/* Floating Timer on Mobile */}
            <div className={`md:hidden absolute top-0 right-0 flex items-center gap-1 px-2 py-1 rounded-lg border z-30 transition-colors ${timeLeft <= 5 ? 'bg-error text-white border-error shadow-lg' : 'bg-white/90 text-slate-500 border-slate-100 shadow-sm'
              }`}>
              <Timer className={`w-2.5 h-2.5 ${timeLeft <= 5 ? 'animate-pulse' : ''}`} />
              <span className="font-mono font-black text-[10px]">{timeLeft}s</span>
            </div>

            <div className="relative aspect-square w-full max-h-[60vh] md:max-h-full h-full flex items-center justify-center p-2">
              {/* Full Square Image for Mobile focus */}
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white/50 rounded-xl md:rounded-none">
                <img
                  src={`/plates/${currentPlate.file}`}
                  alt={`Ishihara Plate ${currentPlate.id}`}
                  className="w-full h-full object-contain filter drop-shadow-sm md:drop-shadow-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="%23e5e7eb"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="%236b7280" text-anchor="middle" dy=".3em">Plate ' + currentPlate.id + '</text></svg>';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Interaction Area */}
          <div className="md:col-span-2 flex flex-col gap-2 md:gap-4 min-h-0 md:flex-grow">
            <Card className="flex-grow bg-white border border-slate-200 shadow-xl p-3 md:p-5 flex flex-col space-y-2 md:space-y-4 min-h-0 overflow-hidden">
              <div className="hidden md:block space-y-0.5 md:space-y-1 flex-shrink-0">
                <h3 className="text-xs md:text-lg font-bold text-foreground">What do you see?</h3>
                <p className="text-[10px] md:text-sm text-muted-foreground leading-tight">{getInstructions(currentPlate)}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 md:gap-3 flex-grow content-start min-h-0 overflow-hidden">
                {shuffledOptions.map((option) => (
                  <Button
                    key={option}
                    variant={userInput === option ? 'default' : 'secondary'}
                    size="sm"
                    className={`h-9 md:h-16 py-1.5 md:py-4 text-base md:text-2xl font-bold rounded-lg md:rounded-2xl border transition-all active:scale-95 ${userInput === option ? 'border-primary ring-2 ring-primary/10' : 'border-slate-50'
                      }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>


            </Card>
          </div>
        </div>
      </div>
    </div>

  );
};

export default TestScreen;
