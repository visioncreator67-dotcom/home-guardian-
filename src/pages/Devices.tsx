import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Device {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
}

const LOCATIONS = ['Front Door', 'Back Door', 'Bedroom', 'Living Room'];

export default function Devices() {
  const navigate = useNavigate();
  const [devices, setDevices] = useState<Device[]>([]);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [newDeviceLocation, setNewDeviceLocation] = useState(LOCATIONS[0]);

  // Load devices from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('securityDevices');
    if (saved) setDevices(JSON.parse(saved));
  }, []);

  // Save devices whenever they change
  useEffect(() => {
    localStorage.setItem('securityDevices', JSON.stringify(devices));
  }, [devices]);

  const addDevice = () => {
    if (!newDeviceName.trim()) return;
    const newDevice: Device = {
      id: Date.now().toString(),
      name: newDeviceName.trim(),
      location: newDeviceLocation,
      status: 'offline',
    };
    setDevices([...devices, newDevice]);
    setNewDeviceName('');
  };

  const toggleDeviceStatus = (id: string) => {
    setDevices(devices.map(dev =>
      dev.id === id ? { ...dev, status: dev.status === 'online' ? 'offline' : 'online' } : dev
    ));
  };

  const deleteDevice = (id: string) => {
    setDevices(devices.filter(dev => dev.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Security Devices</h2>

        {/* Add Device Form */}
        <div className="mb-6 border-b pb-4">
          <h3 className="text-lg font-semibold mb-2">Add New Device</h3>
          <input
            type="text"
            placeholder="Device name (e.g., Kitchen Sensor)"
            value={newDeviceName}
            onChange={(e) => setNewDeviceName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2"
          />
          <select
            value={newDeviceLocation}
            onChange={(e) => setNewDeviceLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2"
          >
            {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          <button
            onClick={addDevice}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            ➕ Add Device
          </button>
        </div>

        {/* Device List */}
        {devices.length === 0 ? (
          <p className="text-gray-500 text-center">No devices yet. Add your first security device above.</p>
        ) : (
          <ul className="space-y-3">
            {devices.map(device => (
              <li key={device.id} className="border rounded-lg p-3 flex justify-between items-center">
                <div>
                  <div className="font-medium">{device.name}</div>
                  <div className="text-sm text-gray-500">{device.location}</div>
                  <div className={`text-xs ${device.status === 'online' ? 'text-green-600' : 'text-red-600'}`}>
                    {device.status === 'online' ? '● Online' : '○ Offline'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleDeviceStatus(device.id)}
                    className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                  >
                    {device.status === 'online' ? 'Disarm' : 'Arm'}
                  </button>
                  <button
                    onClick={() => deleteDevice(device.id)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={() => navigate('/dashboard')}
          className="mt-6 w-full bg-gray-200 text-gray-800 py-2 rounded-lg"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}