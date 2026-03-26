import { useState, useEffect } from 'react';
import { useRouter } from 'react-router-dom';
import countryConfig from '../config/countryConfig';
import { Button, Card, Input, Select, Table } from '@/components/ui';

interface Device {
  id: string;
  name: string;
  location: 'Front Door' | 'Back Door' | 'Bedroom' | 'Living Room';
  status: 'online' | 'offline';
}

const initialDevices: Device[] = [
  { id: '1', name: 'Main Camera', location: 'Front Door', status: 'online' },
  { id: '2', name: 'Door Sensor', location: 'Back Door', status: 'offline' }
];

export default function Devices() {
  const router = useRouter();
  const [devices, setDevices] = useState(initialDevices);

  const handleAddDevice = () => {
    // In real app: generate QR code and handle pairing
    const newDevice: Device = {
      id: Date.now().toString(),
      name: 'New Device',
      location: 'Front Door',
      status: 'online'
    };
    setDevices([...devices, newDevice]);
  };

  const handleAssignLocation = (deviceId: string, location: Device['location']) => {
    setDevices(devices.map(d => d.id === deviceId ? { ...d, location } : d));
  };

  const handleDeleteDevice = (deviceId: string) => {
    setDevices(devices.filter(d => d.id !== deviceId));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Security Devices</h2>
        <div className="mb-6">
          <Button variant="outline" size="lg" onClick={handleAddDevice}>
            Add Device (QR Code)
          </Button>
        </div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Cell>Device</Table.Cell>
              <Table.Cell>Location</Table.Cell>
              <Table.Cell>Status</Table.Cell>
              <Table.Cell>Actions</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {devices.map(device => (
              <Table.Row key={device.id}>
                <Table.Cell>{device.name}</Table.Cell>
                <Table.Cell>{device.location}</Table.Cell>
                <Table.Cell>
                  <span className="text-{device.status === 'online' ? 'green' : 'red'}">{device.status}</span>
                </Table.Cell>
                <Table.Cell>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteDevice(device.id)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
}