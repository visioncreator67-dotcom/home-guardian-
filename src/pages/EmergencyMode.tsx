import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function EmergencyMode() {
  const navigate = useNavigate();
  const [emergencyNumber, setEmergencyNumber] = useState('10111');
  const [countdown, setCountdown] = useState(5);
  const [calling, setCalling] = useState(false);

  useEffect(() => {
    // Get user's country to show correct emergency number
    const fetchCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const country = data.country_code;
        if (country === 'ZA') setEmergencyNumber('10111');
        else if (country === 'US') setEmergencyNumber('911');
        else if (country === 'GB') setEmergencyNumber('999');
        else if (country === 'AU') setEmergencyNumber('000');
        else setEmergencyNumber('112');
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountry();

    // Auto‑call after 5 seconds
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCalling(true);
          // In a real app, you'd trigger the phone call here
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 bg-red-600 bg-opacity-95 flex items-center justify-center z-50">
      <div className="text-center text-white p-6 max-w-md">
        <div className="text-8xl mb-6 animate-pulse">🚨</div>
        <h1 className="text-5xl font-bold mb-4">EMERGENCY</h1>
        <p className="text-2xl mb-2">Calling {emergencyNumber}...</p>
        {!calling && <p className="text-lg mb-6">Automatic call in {countdown} seconds</p>}
        {calling && <p className="text-lg mb-6">Help is on the way. Stay calm.</p>}
        <button
          onClick={handleCancel}
          className="mt-8 bg-white text-red-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition"
        >
          Cancel Emergency
        </button>
      </div>
    </div>
  );
}