import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './globals.css';
import { VoiceProvider } from './context/VoiceContext';
import { StripeProviderWrapper } from './components/StripeProviderWrapper';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VoiceProvider>
      <StripeProviderWrapper>
        <App />
      </StripeProviderWrapper>
    </VoiceProvider>
  </React.StrictMode>
);