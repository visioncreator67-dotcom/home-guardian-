import { useEffect, useState } from 'react';
import { useRouter } from 'react-router-dom';
import countryConfig from '../config/countryConfig';
import { Button, Card, Select, Popover } from '@/components/ui';
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

export default function CountryDetectionScreen() {
  const router = useRouter();
  const [country, setCountry] = useState<string>('');
  const [detectedCountry, setDetectedCountry] = useState<string>('');
  const [isDetecting, setIsDetecting] = useState<boolean>(true);
  const [manualSelectionOpen, setManualSelectionOpen] = useState<boolean>(false);
  const [countryOptions] = useState(supportedCountries);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setDetectedCountry(data.country_code);
        setCountry(data.country_code);
      } catch (error) {
        console.error('Error detecting country:', error);
        setDetectedCountry('US'); // fallback
        setCountry('US');
      } finally {
        setIsDetecting(false);
      }
    };
    fetchCountry();
  }, []);

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

  const currentConfig = countryConfig[country] || countryConfig['US'];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <Card.Header>
          <div className="flex items-center justify-center">
            <div className="text-6xl mb-4">{countryOptions.find(o => o.value === country)?.flag}</div>
            <h1 className="text-3xl font-bold text-center text-gray-800">{t('welcome_back')}</h1>
          </div>
        </Card.Header>

        <Card.Body>
          <div className="text-center mb-6">
            <p className="text-lg text-gray-600">{t('your_ip_is')} {detectedCountry}</p>
            {isDetecting && (
              <div className="text-blue-500 text-sm">
                {t('detecting_location')}...
              </div>
            )}
          </div>

          <Select
            placeholder={t('select_country')}
            onChange={handleCountryChange}
            options={countryOptions}
            value={country}
            className="w-full mb-4"
          />

          <Button
            variant="solid"
            color="red"
            size="lg"
            onClick={() => router.push('/dashboard')}
            className="w-full"
          >
            {t('continue')}
          </Button>

          <Popover contentClass="bg-gray-100" placement="bottom" trigger={
            <Button variant="outline" size="sm" className="w-full mt-4 text-left">
              {t('emergency_numbers')}
            </Button>
          }>
            <Popover.Panel>
              <ul className="space-y-1">
                {countryOptions.map(option => {
                  const cfg = countryConfig[option.value as keyof typeof countryConfig];
                  const emergencyNum = cfg?.emergencyNumber || '911';
                  return (
                    <li key={option.value}>
                      <p className="font-medium">{option.label}:</p>
                      <p className="text-lg font-semibold text-red-600">{emergencyNum}</p>
                    </li>
                  );
                })}
              </ul>
            </Popover.Panel>
          </Popover>
        </Card.Body>
      </Card>
    </div>
  );
}