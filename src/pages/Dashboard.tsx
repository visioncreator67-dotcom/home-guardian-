"use client";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import countryConfig from '../config/countryConfig';
import { Button, Card, Switch } from '../components/ui';
import { useVoice } from '../context/VoiceContext';
import VoiceStatus from '../components/ui/voice-status';
import { VoiceListener } from '../components/ui/voice-listener';
import { supabase } from '../lib/supabase';
import { initOneSignal, sendExternalUserId, requestNotificationPermission } from '../lib/onesignal';

export default function Dashboard() {
  const navigate = useNavigate();
  const [country, setCountry] = useState<string>('ZA');
  const [detectedCountry, setDetectedCountry] = useState<string>('');
  const [isDetecting, setIsDetecting] = useState<boolean>(true);
  const [protectionMode, setProtectionMode] = useState<'armed' | 'disarmed'>('disarmed');
  const [deviceCount, setDeviceCount] = useState(0);
  const { isListening } = useVoice();

  // Country detection effect
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setDetectedCountry(data.country_code);
        setCountry(data.country_code);
      } catch (error) {
        console.error('Error detecting country:', error);
        setDetectedCountry('ZA');
        setCountry('ZA');
      } finally {
        setIsDetecting(false);
      }
    };
    fetchCountry();
  }, []);

  // OneSignal initialization (only after user is logged in)
  useEffect(() => {
    const setupOneSignal = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        initOneSignal();
        sendExternalUserId(user.id);
      }
    };
    setupOneSignal();
  }, []);

  const currentConfig = countryConfig[country] || countryConfig['ZA'];

  const handleSafeModeToggle = () => {
    setProtectionMode(protectionMode === 'armed' ? 'disarmed' : 'armed');
  };

  const handleEmergencyClick = () => {
    navigate('/emergency');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <VoiceListener />
      <VoiceStatus isListening={isListening} />
      <Card className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <Card.Header>
          <div className="text-center">
            <div className="text-6xl mb-4">🇿🇦</div>
            <h1 className="text-3xl font-bold text-gray-800">Home Dashboard</h1>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="text-center mb-6">
            <p className="text-lg text-gray-600">Your IP is from: {detectedCountry}</p>
            {isDetecting && (
              <div className="text-blue-500 text-sm">Detecting your location...</div>
            )}
          </div>

          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold">Protection Status</h2>
              <p className="text-gray-600">Protection Mode:</p>
            </div>
            <Switch checked={protectionMode === 'armed'} onChange={handleSafeModeToggle} />
          </div>

          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold">Device Count</h2>
              <p className="text-gray-600">Connected Devices</p>
            </div>
            <div className="text-xl font-semibold text-red-600">+{deviceCount}</div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Emergency Numbers</h2>
              <p className="text-gray-600">Local Emergency</p>
            </div>
            <div className="text-2xl font-bold text-red-600">{currentConfig?.emergencyNumber || '10111'}</div>
          </div>

          <Button
            variant="solid"
            color="red"
            size="lg"
            onClick={handleEmergencyClick}
            className="w-full py-6 text-xl font-bold mb-4"
          >
            🚨 I FEEL UNSAFE 🚨
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleSafeModeToggle}
            className="w-full mb-6"
          >
            {protectionMode === 'armed' ? '🔒 Disarm System' : '🔓 Arm System'}
          </Button>

          <div className="flex justify-between gap-3">
            <Button variant="outline" size="md" onClick={() => navigate('/devices')} className="flex-1">📱 Devices</Button>
            <Button variant="outline" size="md" onClick={() => navigate('/contacts')} className="flex-1">👥 Contacts</Button>
            <Button variant="outline" size="md" onClick={() => navigate('/link-provider')} className="flex-1">🔗 Provider</Button>
            <Button variant="outline" size="md" onClick={() => navigate('/settings')} className="flex-1">⚙️ Settings</Button>
          </div>

          <div className="flex justify-between gap-3 mt-4">
            <Button
              variant="outline"
              size="md"
              onClick={() => requestNotificationPermission()}
              className="flex-1"
            >
              🔔 Allow Notifications
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
