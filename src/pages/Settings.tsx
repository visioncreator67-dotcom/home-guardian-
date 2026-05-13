import React, { useState, useEffect } from 'react';
import { useVoice } from '../context/VoiceContext';
import { UpgradeButton } from '../components/UpgradeButton';

export default function Settings() {
  const { isVoiceActive, toggleVoice, codeWord, setCodeWord, repetitions, setRepetitions, testVoice } = useVoice();
  const [confirmCodeWord, setConfirmCodeWord] = useState('');
  const [localCodeWord, setLocalCodeWord] = useState('');
  const [localRepetitions, setLocalRepetitions] = useState(3);

  useEffect(() => {
    const savedCodeWord = localStorage.getItem('voiceCodeWord');
    const savedRepetitions = localStorage.getItem('voiceRepetitions');
    if (savedCodeWord) setLocalCodeWord(savedCodeWord);
    if (savedRepetitions) setLocalRepetitions(Number(savedRepetitions));
  }, []);

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
    if (isVoiceActive && localCodeWord && localCodeWord === confirmCodeWord) {
      localStorage.setItem('voiceCodeWord', localCodeWord);
      localStorage.setItem('voiceRepetitions', localRepetitions.toString());
      setCodeWord(localCodeWord);
      setRepetitions(localRepetitions);
      alert('Voice settings saved successfully!');
    } else {
      alert('Please activate voice, set a matching code word, and confirm it');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Settings</h2>

        <div className="space-y-4">
          {/* Voice Activation */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Voice Activation</span>
            <button
              onClick={toggleVoice}
              className={`w-12 h-6 rounded-full transition-colors ${isVoiceActive ? 'bg-red-600' : 'bg-gray-300'}`}
            >
              <span className={`block w-5 h-5 bg-white rounded-full transition-transform ${isVoiceActive ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          <p className="text-sm text-gray-500 text-center">
            {isVoiceActive ? 'Voice Activation: ON' : 'Voice Activation: OFF'}
          </p>

          {isVoiceActive && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Secret Code Word</label>
                <input
                  type="text"
                  value={localCodeWord}
                  onChange={(e) => setLocalCodeWord(e.target.value)}
                  placeholder="e.g., pineapple"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2"
                />
                <input
                  type="text"
                  value={confirmCodeWord}
                  onChange={(e) => setConfirmCodeWord(e.target.value)}
                  placeholder="Confirm code word"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {localCodeWord && confirmCodeWord && localCodeWord !== confirmCodeWord && (
                  <p className="text-xs text-red-500 mt-1">Code words do not match</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Repetitions</label>
                <select
                  value={localRepetitions}
                  onChange={(e) => setLocalRepetitions(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value={2}>2 times</option>
                  <option value={3}>3 times</option>
                </select>
              </div>

              <button
                onClick={handleTestVoice}
                disabled={!localCodeWord}
                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg mt-2 disabled:opacity-50"
              >
                Test Voice Detection
              </button>

              <button
                onClick={handleSaveSettings}
                disabled={!localCodeWord || localCodeWord !== confirmCodeWord}
                className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
              >
                Save Settings
              </button>
            </>
          )}

          {localCodeWord && (
            <div className="mt-4 p-3 bg-blue-50 rounded">
              <p className="text-sm text-blue-800">
                Current code word: "<strong>{localCodeWord}</strong>" (say it <strong>{localRepetitions}</strong> times in a row to activate emergency)
              </p>
            </div>
          )}

          {/* UPGRADE SECTION */}
          <div className="mt-6 p-4 border rounded-lg border-red-200 bg-red-50">
            <h3 className="text-lg font-semibold text-red-800">ResQMe Pro</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get unlimited voice SOS, provider linking, and multi‑device security.
            </p>
            <div className="flex gap-3">
              <UpgradeButton priceId="price_1TWe4IE9PorKZfeqk02yhUOn" buttonText="Upgrade Monthly" />
              <UpgradeButton priceId="price_1TWe66E9PorKZfeqoHsbCJ9l" buttonText="Upgrade Yearly" variant="outline" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}