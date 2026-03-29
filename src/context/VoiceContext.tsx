import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface VoiceContextType {
  isListening: boolean;
  isVoiceActive: boolean;
  codeWord: string;
  repetitions: number;
  toggleVoice: () => void;
  setCodeWord: (word: string) => void;
  setRepetitions: (num: number) => void;
  testVoice: () => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within VoiceProvider');
  }
  return context;
};

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [codeWord, setCodeWord] = useState('');
  const [repetitions, setRepetitions] = useState(3);
  const [recentPhrases, setRecentPhrases] = useState<string[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      setRecentPhrases(prev => [...prev.slice(-repetitions), transcript]);
      
      // Check for consecutive code word repetitions
      if (codeWord && recentPhrases.length >= repetitions) {
        const lastN = recentPhrases.slice(-repetitions);
        if (lastN.every(phrase => phrase === codeWord)) {
          window.dispatchEvent(new CustomEvent('voice-emergency-triggered'));
        }
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const testVoice = () => {
    alert(`Voice detection test. Say your code word "${codeWord}" ${repetitions} times in a row.`);
  };

  useEffect(() => {
    if (!isVoiceActive && recognitionRef.current) {
      stopListening();
    }
  }, [isVoiceActive]);

  return (
    <VoiceContext.Provider value={{
      isListening,
      isVoiceActive,
      codeWord,
      repetitions,
      toggleVoice,
      setCodeWord,
      setRepetitions,
      testVoice
    }}>
      {children}
    </VoiceContext.Provider>
  );
};