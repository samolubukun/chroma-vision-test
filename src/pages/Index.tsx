import { useState } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import TestScreen, { TestResult } from '@/components/TestScreen';
import ResultsScreen from '@/components/ResultsScreen';

type TestState = 'welcome' | 'testing' | 'results';

const Index = () => {
  const [testState, setTestState] = useState<TestState>('welcome');
  const [results, setResults] = useState<TestResult[]>([]);

  const handleStart = () => {
    setTestState('testing');
  };

  const handleComplete = (testResults: TestResult[]) => {
    setResults(testResults);
    setTestState('results');
  };

  const handleRestart = () => {
    setResults([]);
    setTestState('welcome');
  };

  return (
    <>
      {testState === 'welcome' && <WelcomeScreen onStart={handleStart} />}
      {testState === 'testing' && <TestScreen onComplete={handleComplete} />}
      {testState === 'results' && <ResultsScreen results={results} onRestart={handleRestart} />}
    </>
  );
};

export default Index;
