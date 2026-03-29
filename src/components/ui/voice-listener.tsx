import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoice } from '../context/VoiceContext';
import { useToast } from '../utils/toast';
import countryConfig from '../config/countryConfig';

const explicitTriggers = [
  'hey guardian, i need help',
  'hey guardian, emergency',
  'hey guardian, call police',
  'hey guardian, i\'m in danger'
];

const VoiceListener: React.FC = () => {
  const { isVoiceActive, safeWord, safeWordCount, setIsListening } = useVoice();
  const navigate = useNavigate();
  const toast = useToast();
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const transcriptRef = useRef<string>('');

  useEffect(() => {
    if (!isVoiceActive) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      setIsListening(false);
      return;
    }

    // Initialize SpeechRecognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.showError('Speech recognition not supported in this browser');
      setIsVoiceActive(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript.toLowerCase().trim();
      transcriptRef.current += ' ' + result;
      
      // Check for explicit triggers
      const explicitTriggerFound = explicitTriggers.some(trigger => 
        result.includes(trigger)
      );
      
      if (explicitTriggerFound) {
        handleEmergencyActivation('Explicit trigger detected');
        return;
      }
      
      // Check for safe word pattern (only if safe word is set)
      if (safeWord && safeWordCount > 0) {
        const words = transcriptRef.current.split(/\s+/);
        let count = 0;
        for (const word of words) {
          if (word === safeWord.toLowerCase()) {
            count++;
            if (count >= safeWordCount) {
              handleEmergencyActivation('Safe word pattern detected');
              return;
            }
          } else {
            count = 0; // Reset streak if word doesn't match
          }
        }
      }
      
      // Keep transcript from growing too large
      if (transcriptRef.current.length > 1000) {
        transcriptRef.current = transcriptRef.current.slice(-500);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event);
      toast.showError('Voice recognition error');
      setIsVoiceActive(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      // Restart if still active
      if (isVoiceActive) {
        recognition.start();
        setIsListening(true);
      }
    };

    recognition.start();
    setIsListening(true);
    
    return () => {
      recognition.stop();
    };
  }, [isVoiceActive, safeWord, safeWordCount, setIsListening, toast]);

  const handleEmergencyActivation = (reason: string) => {
    console.log('Emergency activated:', reason);
    // Navigate to emergency mode    navigate('/emergency');
    // Show subtle toast (optional)
    toast.showSuccess('Emergency activated');
    // Stop listening after activation
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsVoiceActive(false);
    setIsListening(false);
  };

  return null; // This component doesn't render anything
};

export default VoiceListener;