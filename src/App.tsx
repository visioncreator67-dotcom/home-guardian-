import { useState } from 'react';
import { VoiceProvider } from './context/VoiceContext';
import VoiceListener from './components/ui/voice-listener';
import VoiceStatus from './components/ui/voice-status';
import { useVoice } from './context/VoiceContext';

export default function App() {
  const { isVoiceActive, isListening } = useVoice();

  return (
    <VoiceProvider>
      <VoiceListener />
      <VoiceStatus isListening={isListening} />
      {/* Existing App content */}
    </VoiceProvider>
  );
}