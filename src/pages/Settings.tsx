import React, { useState } from 'react';
import { Button, Switch } from '../components/ui';
import VoiceCommand from '../components/ui/voice-command';

export default function Settings() {
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Existing settings content */}
      
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center text-gray-800">Voice Command Settings</h2>
        <Switch
          checked={isVoiceActive}
          onChange={setIsVoiceActive}
          className="w-48 h-16 mb-4"
        />
        <p className="text-center text-gray-600">
          Enable voice commands to trigger emergency mode with phrases like "Hey Guardian, I need help"
        </p>
        <VoiceCommand 
          isVoiceActive={isVoiceActive} 
          setIsVoiceActive={setIsVoiceActive}
        />
      </div>
    </div>
  );
}