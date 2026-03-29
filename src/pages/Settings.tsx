import React, { useState } from 'react';
import { Button, Switch, Input, Select } from '../components/ui';
import { useVoice } from '../context/VoiceContext';

export default function Settings() {
  const { 
    isVoiceActive, 
    setIsVoiceActive,
    codeWord,
    setCodeWord,
    repetitions,
    setRepetitions,
    testVoice
  } = useVoice();
  const [confirmCodeWord, setConfirmCodeWord] = useState('');

  const handleTestVoice = () => {
    if (!codeWord) {
      alert('Please set a code word first');
      return;
    }
    testVoice();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center text-gray-800">Voice Command Settings</h2>
        
        <div className="space-y-6 mt-6">
          <div>
            <Switch
              checked={isVoiceActive}
              onChange={setIsVoiceActive}
              className="w-48 h-16"
            />
            <p className="text-center text-gray-600 mt-2">
              {isVoiceActive ? 'Voice Activation: ON' : 'Voice Activation: OFF'}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secret Code Word
            </label>
            <Input
              placeholder="Enter your secret code word"
              value={codeWord}
              onChange={(e) => setCodeWord(e.target.value)}
              className="mb-2 w-full"
            />
            <Input
              placeholder="Confirm code word"
              value={confirmCodeWord}
              onChange={(e) => setConfirmCodeWord(e.target.value)}
              className="w-full"
            />
            {codeWord && confirmCodeWord && codeWord !== confirmCodeWord && (
              <p className="text-xs text-red-500 mt-1">Code words do not match</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Repetitions
            </label>
            <Select
              value={repetitions}
              onValueChange={(value) => setRepetitions(Number(value))}
              className="w-full"
            >
              {[2, 3].map(value => (
                <option key={value} value={value}>
                  {value} time{value > 1 ? 's' : ''}
                </option>
              ))}
            </Select>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleTestVoice}
            className="w-full mt-4"
          >
            Test Voice Detection          </Button>
          
          {codeWord && (
            <div className="mt-4 p-3 bg-blue-50 rounded">
              <p className="text-sm text-blue-800">
                Current code word: "<strong>{codeWord}</strong>" 
                (say it <strong>{repetitions}</strong> times in a row to activate emergency)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}