import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoice } from '../context/VoiceContext';

const VoiceListener: React.FC = () => {
  const navigate = useNavigate();
  const { 
    isVoiceActive, 
    codeWord, 
    repetitions,
    isListening
  } = useVoice();

  useEffect(() => {
    if (!isVoiceActive) return;

    const handleEmergency = () => {
      // Implement emergency activation logic here
      navigate('/emergency');
      // Add your emergency actions (call services, send location, etc.)
    };

    // This would be connected to the custom event in VoiceProvider
    window.addEventListener('voice-emergency-triggered', handleEmergency);
    return () => {
      window.removeEventListener('voice-emergency-triggered', handleEmergency);
    };
  }, [isVoiceActive, navigate]);

  return null;
};

export default VoiceListener;