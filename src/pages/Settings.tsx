import React, { useState, useEffect } from 'react';
import { Button, Switch, Input, Select } from '../components/ui';
import { useVoice } from '../context/VoiceContext';

export default function Settings() {
  const { isVoiceActive, toggleVoice, codeWord, setCodeWord, repetitions, setRepetitions, testVoice } = useVoice();
  const [confirmCodeWord, setConfirmCodeWord] = useState('');
  const [localCodeWord, setLocalCodeWord] = useState('');
  const [localRepetitions, setLocalRepetitions] = useState(3);

  // Load saved settings from localStorage on mount
  useEffect(() => {
    const savedCodeWord = localStorage.getItem('voiceCodeWord');
    const savedRepetitions = localStorage.getItem('voiceRepetitions');
    if (savedCodeWord) setLocalCodeWord(savedCodeWord);
    if (savedRepetitions) setLocalRepetitions(Number(savedRepetitions));
  }, []);

  // When voice is activated, apply the saved settings to the context
  useEffect(() => {
    if (isVoiceActive && localCodeWord) {
      setCodeWord(localCodeWord);
      setRepetitions(localRepetitions);
    }
  }, [isVoiceActive, localCodeWord, localRepetitions, setCodeWord, setRepetitions]);

  const handleTestVoice = () => {
    if (!localCodeWord) {
      alert('Please set a code word first');
      return;
    }
    testVoice();
  };

  const handleSaveSettings = () => {
    if (isVoiceActive && localCodeWord) {
      localStorage.setItem('voiceCodeWord', localCodeWord);
      localStorage.setItem('voiceRepetitions', localRepetitions.toString());
      setCodeWord(localCodeWord);
      setRepetitions(localRepetitions);
      alert('Voice settings saved successfully!');
    } else {
      alert('Please activate voice and set a code word first');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Voice Command Settings</h2>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Voice Activation</span>
            <Switch checked={isVoiceActive} onChange={toggleVoice} />
          </div>
          <p className="text-sm text-gray-500 text-center">
            {isVoiceActive ? 'Voice Activation: ON' : 'Voice Activation: OFF'}
          </p>

          {isVoiceActive && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secret Code Word</label>
                <Input
                  placeholder="Enter your secret code word"
                  value={localCodeWord}
                  onChange={(e) => setLocalCodeWord(e.target.value)}
                  className="mb-2 w-full"
                />
                <Input
                  placeholder="Confirm code word"
                  value={confirmCodeWord}
                  onChange={(e) => setConfirmCodeWord(e.target.value)}
                  className="w-full"
                />
                {localCodeWord && confirmCodeWord && localCodeWord !== confirmCodeWord && (
                  <p className="text-xs text-red-500 mt-1">Code words do not match</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Repetitions</label>
                <Select
                  value={localRepetitions}
                  onChange={(e) => setLocalRepetitions(Number(e.target.value))}
                  className="w-full"
                >
                  <option value={2}>2 times</option>
                  <option value={3}>3 times</option>
                </Select>
              </div>

              <Button
                variant="outline"
                onClick={handleTestVoice}
                className="w-full mt-2"
                disabled={!localCodeWord}
              >
                Test Voice Detection
              </Button>

              <Button
                variant="solid"
                onClick={handleSaveSettings}
                className="w-full mt-2"
                disabled={!localCodeWord || localCodeWord !== confirmCodeWord}
              >
                Save Settings
              </Button>
            </>
          )}

          {localCodeWord && (
            <div className="mt-4 p-3 bg-blue-50 rounded">
              <p className="text-sm text-blue-800">
                Current code word: "<strong>{localCodeWord}</strong>" (say it <strong>{localRepetitions}</strong> times in a row to activate emergency)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}