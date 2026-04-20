import React from 'react';
import { useVoice } from '../../context/VoiceContext';

const VoiceStatus = () => {
  const { isListening, isVoiceActive } = useVoice();

  // For debugging, always render a visible indicator
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: isListening ? 'red' : 'gray',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
      cursor: 'pointer',
    }}>
      <span style={{ color: 'white', fontSize: '24px' }}>🎤</span>
    </div>
  );
};

export default VoiceStatus;