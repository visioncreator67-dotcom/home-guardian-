import { useState } from 'react';
import { VoiceStatus } from './components/ui';

export default function App() {
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);

  return (
    <VoiceStatus isListening={isVoiceActive} />
    {/* Existing App content */}
  );
}