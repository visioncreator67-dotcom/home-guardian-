"use client";

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import countryConfig from '../config/countryConfig';
import { Button, Card, Select, Popover, Switch } from '../components/ui';
import { translations } from '../translations';

interface CountryOption {
  value: string;
  label: string;
  flag: string;
}

const supportedCountries: CountryOption[] = [
  { value: 'US', label: 'United States', flag: '🇺🇸' },
  { value: 'GB', label: 'United Kingdom', flag: '🇬🇧' },
  { value: 'ZA', label: 'South Africa', flag: '🇿🇦' },
  { value: 'CA', label: 'Canada', flag: '🇨🇦' },
  { value: 'AU', label: 'Australia', flag: '🇦🇺' },
  { value: 'DE', label: 'Germany', flag: '🇩🇪' }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [country, setCountry] = useState<string>('US');
  const [detectedCountry, setDetectedCountry] = useState<string>('');
  const [isDetecting, setIsDetecting] = useState<boolean>(true);
  const [countryOptions] = useState(supportedCountries);
  const [protectionMode, setProtectionMode] = useState<'armed' | 'disarmed'>('disarmed');
  const [deviceCount, setDeviceCount] = useState(0);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setDetectedCountry(data.country_code);
        setCountry(data.country_code);
      } catch (error) {
        console.error('Error detecting country:', error);
        setDetectedCountry('US');
        setCountry('US');
      } finally {
        setIsDetecting(false);
      }
    };
    fetchCountry();
  }, []);

  const currentConfig = countryConfig[country] || countryConfig['US'];

  const handleSafeModeToggle = () => {
    setProtectionMode(protectionMode === 'armed' ? 'disarmed' : 'armed');
  };

  const handleEmergencyClick = () => {
    navigate('/emergency');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <Card.Header>
          <div className="flex items-center justify-center">
            <div className="text-6xl mb-4">{countryOptions.find(o => o.value === country)?.flag}</div>
            <h1 className="text-3xl font-bold text-center text-gray-800">Home Dashboard</h1>
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
              <h2 className="text-2xl font-bold">Protection Status</h2>
              <p className="text-lg text-gray-600">Protection Mode:</p>
            </div>
            <Switch
              checked={protectionMode === 'armed'}
              onChange={handleSafeModeToggle}
              className="h-4 w-10"
            />
          </div>

          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold">Device Count</h2>
              <p className="text-lg text-gray-600">Connected Devices</p>
            </div>
            <div className="text-lg font-semibold text-red-600">+{deviceCount}</div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold">Emergency Numbers</h2>
              <p className="text-lg text-gray-600">Local Emergency</p>
            </div>
            <div className="text-lg font-semibold text-red-600">{currentConfig?.emergencyNumber}</div>
          </div>

          <Button
            variant="solid"
            color="red"
            size="lg"
            onClick={handleEmergencyClick}
            className="w-full py-6 text-xl font-bold mb-4"
          >
            I FEEL UNSAFE
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleSafeModeToggle}
            className="w-full"
          >
            {protectionMode === 'armed' ? 'Disarm' : 'Arm'}
          </Button>

          <div className="flex justify-between gap-4 mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/devices')}
              className="flex-1"
            >
              Devices
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/contacts')}
              className="flex-1"
            >
              Contacts
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/settings')}
              className="flex-1"
            >
              Settings
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}