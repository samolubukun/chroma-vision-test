import { useState, useEffect, useRef } from 'react';

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const speak = (text: string, onEnd?: () => void) => {
    if (!synthRef.current || !isSupported) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      onEnd?.();
    };
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const cancel = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  return {
    speak,
    cancel,
    isSpeaking,
    isSupported,
  };
};
