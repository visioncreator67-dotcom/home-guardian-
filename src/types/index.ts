export interface CountryConfig {
  emergencyNumber: string;
  police?: string;
  ambulance?: string;
  fire?: string;
  currency: string;
  price: number;
  features?: string[];
  nonEmergency?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  priority: number;
}

export interface SecurityDevice {
  id: string;
  name: string;
  location: string;
  paired: boolean;
  status: 'active' | 'inactive' | 'error';
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface AppState {
  country: string;
  emergencyMode: boolean;
  deviceCount: number;
  protectionMode: 'armed' | 'disarmed' | 'away';
  emergencyContacts: EmergencyContact[];
  securityDevices: SecurityDevice[];
  userLocation?: UserLocation;
  audioRecording?: MediaRecorder;
  subscriptionActive: boolean;
  monitoringActive: boolean;
}