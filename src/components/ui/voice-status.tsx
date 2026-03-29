import React from 'react';
import { useVoice } from '../context/VoiceContext';

interface VoiceStatusProps {}

const VoiceStatus: React.FC<VoiceStatusProps> = () => {
  const { isListening } = useVoice();

  return (
    <div className="fixed top-4 right-4 p-2 z-50">
      <div className="relative">
        <svg className={`w-6 h-6 ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        {isListening && (
          <div className="absolute -top-2 -right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        )}
      </div>
      <div className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs bg-gray-800 text-white rounded">
        {isListening ? 'Listening for voice...' : 'Voice inactive'}
      </div>
    </div>
  );
};

export default VoiceStatus;