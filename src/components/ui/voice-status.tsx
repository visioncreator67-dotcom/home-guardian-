import React from 'react';
import { useVoice } from '../context/VoiceContext';

export const VoiceStatus: React.FC = () => {
  const { isListening, isVoiceActive, codeWord, repetitions } = useVoice();

  if (!isVoiceActive) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`flex items-center gap-2 rounded-full px-3 py-2 shadow-lg ${
        isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-500'
      }`}>
        <div className="w-3 h-3 rounded-full bg-white" />
        <span className="text-white text-sm font-medium">
          {isListening ? '🎤 Listening for: ' + codeWord : 'Voice: Standby'}
        </span>
      </div>
    </div>
  );
};