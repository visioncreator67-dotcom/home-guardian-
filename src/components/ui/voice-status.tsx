import React from 'react';

interface VoiceStatusProps {
  isListening: boolean;
}

const VoiceStatus: React.FC<VoiceStatusProps> = ({ isListening }) => {
  return (
    <div className="fixed top-4 right-4 p-2 z-50">
      <svg className={`w-6 h-6 ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </div>
  );
};

export default VoiceStatus;