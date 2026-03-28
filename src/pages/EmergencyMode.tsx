"use client";

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import countryConfig from '../config/countryConfig';
import { Button, Card, Input, Popover, Switch } from '../components/ui';
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

export default function EmergencyMode() {
  const navigate = useNavigate();
  const [country, setCountry] = useState<string>('US');
  const [detectedCountry, setDetectedCountry] = useState<string>('');
  const [isDetecting, setIsDetecting] = useState<boolean>(true);
  const [manualSelectionOpen, setManualSelectionOpen] = useState<boolean>(false);
  const [countryOptions] = useState(supportedCountries);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [securityDevices, setSecurityDevices] = useState([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [audioRecording, setAudioRecording] = useState<MediaRecorder | null>(null);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [monitoringActive, setMonitoringActive] = useState(false);
  const [emergencyInProgress, setEmergencyInProgress] = useState(false);
  const [emergencyNumber, setEmergencyNumber] = useState('');

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

  useEffect(() => {
    setEmergencyNumber(currentConfig?.emergencyNumber || '911');
  }, [currentConfig]);

  const handleCountryChange = (value: string) => {
    setCountry(value);
  };

  const handleManualSelect = () => {
    setManualSelectionOpen(true);
  };

  const handleSelect = (value: string) => {
    setCountry(value);
    setManualSelectionOpen(false);
  };

  const t = (key: string) => {
    return translations.en[key] || key;
  };

  const handleEmergencyClick = () => {
    setEmergencyInProgress(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <Card.Header>
          <div className="flex items-center justify-center">
            <div className="text-6xl mb-4">{countryOptions.find(o => o.value === country)?.flag}</div>
            <h1 className="text-3xl font-bold text-center text-gray-800">{t('emergency_mode')}</h1>
          </div>
        </Card.Header>

        <Card.Body>
          {emergencyInProgress ? (
            <>
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-red-600 mb-4">🚨</div>
                <h2 className="text-2xl font-bold text-red-600">{t('emergency_activated')}</h2>
                <p className="text-lg text-gray-600">{t('police_called_stay_calm')}</p>
                <p className="text-sm text-gray-500 mt-2">{t('emergency_number_dialed')} {emergencyNumber}</p>
              </div>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="w-full"
              >
                {t('return_to_dashboard')}
              </Button>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-red-600 mb-4">🚨</div>
                <h2 className="text-2xl font-bold text-red-600">{t('are_you_sure')}</h2>
                <p className="text-lg text-gray-600">{t('emergency_confirmation')}</p>
              </div>
              <Button
                variant="solid"
                color="red"
                size="lg"
                onClick={handleEmergencyClick}
                className="w-full mb-4"
              >
                {t('call_emergency_services')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="w-full"
              >
                {t('cancel')}
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}