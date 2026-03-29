import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppContext'; // Assuming you have a context for app state
import { useToast } from '../utils/toast'; // For showing notifications

interface VoiceCommandProps {
  isVoiceActive: boolean;
  setIsVoiceActive: (value: boolean) => void;
}

const VoiceCommand: React.FC<VoiceCommandProps> = ({ isVoiceActive, setIsVoiceActive }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [listening, setListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');

  useEffect(() => {
    if (!isVoiceActive) return;

    const recognition = new (window as any).SpeechRecognition || new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript.toLowerCase();
      const triggerPhrases = [
        'hey guardian, i need help',
        'hey guardian, emergency',
        'hey guardian, call police',
        'hey guardian, i\'m in danger'
      ];

      if (triggerPhrases.some(phrase => result.includes(phrase))) {
        setRecognizedText(result);
        navigate('/emergency');
        toast.showSuccess('Emergency mode activated via voice command');
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event);
      toast.showError('Voice command failed');
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
    setListening(true);
  }, [isVoiceActive]);

  return (
    <div className="fixed top-0 right-0 p-4 z-50">
      {isVoiceActive && (
        <div className="relative">
          <svg className="w-8 h-8 text-gray-400 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {listening && (
            <svg className="absolute top-2 right-2 w-4 h-4 animate-pulse text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceCommand;