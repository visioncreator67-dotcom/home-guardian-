import type { CountryConfig } from './countryConfig';

interface CountryConfig {
  emergencyNumber: string;
  police?: string;
  ambulance?: string;
  fire?: string;
  currency: string;
  price: number;
  features?: string[];
  nonEmergency?: string;
}

const countryConfig: CountryConfig = {
  'US': {
    emergencyNumber: '911',
    police: '911',
    ambulance: '911',
    fire: '911',
    currency: 'USD',
    price: 9.99,
    features: ['crime_data', 'ring_integration', '911_location']
  },
  'GB': {
    emergencyNumber: '999',
    police: '999',
    ambulance: '999',
    fire: '999',
    nonEmergency: '101',
    currency: 'GBP',
    price: 7.99
  },
  'ZA': {
    emergencyNumber: '10111',
    police: '10111',
    ambulance: '10177',
    fire: '10177',
    currency: 'ZAR',
    price: 99
  },
  'CA': {
    emergencyNumber: '911',
    currency: 'CAD',
    price: 9.99
  },
  'AU': {
    emergencyNumber: '000',
    police: '000',
    ambulance: '000',
    fire: '000',
    currency: 'AUD',
    price: 11.99
  },
  'DE': {
    emergencyNumber: '112',
    police: '110',
    ambulance: '112',
    fire: '112',
    currency: 'EUR',
    price: 7.99
  }
};
export default countryConfig;