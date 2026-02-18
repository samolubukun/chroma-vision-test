import { useState } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import TestScreen, { TestResult } from '@/components/TestScreen';
import ResultsScreen from '@/components/ResultsScreen';

type TestState = 'welcome' | 'testing' | 'results';
type Eye = 'left' | 'right';

const Index = () => {
  const [testState, setTestState] = useState<TestState>('welcome');
  const [currentEye, setCurrentEye] = useState<Eye>('left');
  const [leftResults, setLeftResults] = useState<TestResult[]>([]);
  const [rightResults, setRightResults] = useState<TestResult[]>([]);

  const handleStart = () => {
    setTestState('testing');
    setCurrentEye('left');
    setLeftResults([]);
    setRightResults([]);
  };

  const handleComplete = (testResults: TestResult[]) => {
    if (currentEye === 'left') {
      setLeftResults(testResults);
    } else {
      setRightResults(testResults);
    }
    setTestState('results');
  };

  const handleNextEye = () => {
    setCurrentEye('right');
    setTestState('testing');
  };

  const handleRestart = () => {
    setLeftResults([]);
    setRightResults([]);
    setCurrentEye('left');
    setTestState('welcome');
  };

  return (
    <>
      {testState === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      {testState === 'testing' && (
        <TestScreen
          eye={currentEye}
          onComplete={handleComplete}
        />
      )}
      {testState === 'results' && (
        <ResultsScreen
          eye={currentEye}
          results={currentEye === 'left' ? leftResults : rightResults}
          otherEyeResults={currentEye === 'right' ? leftResults : undefined}
          onNextEye={handleNextEye}
          onRestart={handleRestart}
        />
      )}
    </>
  );
};

export default Index;
