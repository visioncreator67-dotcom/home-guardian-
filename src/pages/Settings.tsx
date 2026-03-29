import React, { useState } from 'react';
import { Button, Switch, Input, Select } from '../components/ui';
import { useVoice } from '../context/VoiceContext';

export default function Settings() {
  const { 
    isVoiceActive, 
    setIsVoiceActive,
    safeWord,
    setSafeWord,
    safeWordCount,
    setSafeWordCount
  } = useVoice();
  const [confirmSafeWord, setConfirmSafeWord] = useState('');

  const handleTestVoice = () => {
    if (!safeWord) {
      alert('Please set a safe word first');
      return;
    }
    alert(`Testing voice detection for: "${safeWord}" repeated ${safeWordCount} times\nSay: ${safeWord.repeat(safeWordCount)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Existing settings content */}
      
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
              value={safeWord}
              onChange={(e) => setSafeWord(e.target.value)}
              className="mb-2 w-full"
            />
            <Input
              placeholder="Confirm code word"
              value={confirmSafeWord}
              onChange={(e) => setConfirmSafeWord(e.target.value)}
              className="w-full"
            />
            {safeWord && confirmSafeWord && safeWord !== confirmSafeWord && (
              <p className="text-xs text-red-500 mt-1">Code words do not match</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Repetitions
            </label>
            <Select
              value={safeWordCount}
              onValueChange={(value) => setSafeWordCount(Number(value))}
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
          
          {safeWord && (
            <div className="mt-4 p-3 bg-blue-50 rounded">
              <p className="text-sm text-blue-800">
                Current code word: "<strong>{safeWord}</strong>" 
                (say it <strong>{safeWordCount}</strong> times in a row to activate emergency)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}