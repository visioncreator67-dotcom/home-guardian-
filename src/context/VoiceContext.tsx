import React, { createContext, useContext, useState, useEffect } from 'react';

interface VoiceContextType {
  isVoiceActive: boolean;
  setIsVoiceActive: (value: boolean) => void;
  safeWord: string;
  setSafeWord: (value: string) => void;
  safeWordCount: number;
  setSafeWordCount: (value: number) => void;
  isListening: boolean;
  setIsListening: (value: boolean) => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [safeWord, setSafeWord] = useState('');
  const [safeWordCount, setSafeWordCount] = useState(2);
  const [isListening, setIsListening] = useState(false);

  return (
    <VoiceContext.Provider value={{
      isVoiceActive,
      setIsVoiceActive,
      safeWord,
      setSafeWord,
      safeWordCount,
      setSafeWordCount,
      isListening,
      setIsListening
    }}>
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};