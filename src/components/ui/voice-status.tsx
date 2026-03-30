import React from 'react';
import { useVoice } from '../context/VoiceContext'; // Corrected path

export const VoiceStatus = ({ isListening }) => {
  const { isVoiceActive } = useVoice();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isVoiceActive ? 'bg-red-500' : 'bg-gray-300'}`}>
        {isVoiceActive && (
          <div className={`w-6 h-6 bg-white rounded-full ${isListening ? 'animate-pulse' : ''}`}></div>
        )}
      </div>
    </div>
  );
};