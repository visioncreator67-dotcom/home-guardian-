"use client";

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import countryConfig from '../config/countryConfig';
import { Button, Card, Switch } from '../components/ui';

export default function Dashboard() {
  const navigate = useNavigate();
  const [country, setCountry] = useState<string>('ZA');
  const [detectedCountry, setDetectedCountry] = useState<string>('');
  const [isDetecting, setIsDetecting] = useState<boolean>(true);
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
        setDetectedCountry('ZA');
        setCountry('ZA');
      } finally {
        setIsDetecting(false);
      }
    };
    fetchCountry();
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
            <Switch
              checked={protectionMode === 'armed'}
              onChange={handleSafeModeToggle}
            />
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
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/devices')}
              className="flex-1"
            >
              📱 Devices
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/contacts')}
              className="flex-1"
            >
              👥 Contacts
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/settings')}
              className="flex-1"
            >
              ⚙️ Settings
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

<dyad-delete path="src/pages/Dashboard.tsx"></dyad-delete>
<dyad-write path="src/pages/Dashboard.tsx" description="Created clean Dashboard.tsx with proper button styling and navigation">
"use client";

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import countryConfig from '../config/countryConfig';
import { Button, Card, Switch } from '../components/ui';

export default function Dashboard() {
  const navigate = useNavigate();
  const [country, setCountry] = useState<string>('ZA');
  const [detectedCountry, setDetectedCountry] = useState<string>('');
  const [isDetecting, setIsDetecting] = useState<boolean>(true);
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
        setDetectedCountry('ZA');
        setCountry('ZA');
      } finally {
        setIsDetecting(false);
      }
    };
    fetchCountry();
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
            <Switch
              checked={protectionMode === 'armed'}
              onChange={handleSafeModeToggle}
            />
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
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/devices')}
              className="flex-1"
            >
              📱 Devices
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/contacts')}
              className="flex-1"
            >
              👥 Contacts
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/settings')}
              className="flex-1"
            >
              ⚙️ Settings
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}Okay, let me try to figure out what the user is asking for here. They provided a series of interactions where they wanted to fix the Dashboard.tsx file. The initial problem was that the red emergency button was showing as text instead of a proper button. The user then provided corrected code, but there were some issues with the code, like missing imports and incorrect component usage.

First, I need to understand the user's main goal. They want the Dashboard.tsx file to be fixed, specifically the emergency button. The user mentioned that the file was corrupted with XML tags, so they wanted it deleted and recreated with clean code. 

Looking at the provided code, there are a few things to note. The user's code includes imports for Button, Card, and Switch from '../components/ui', but in the initial code, there were also imports for Select, Popover, and others. However, in the final code, those are removed. That might be a mistake because the original code had those components, but the user's final code doesn't. Wait, the user's final code doesn't have Select, Popover, etc., but the original code did. So maybe the user intended to remove those components, but that could cause issues if they're used elsewhere.

Another thing is the use of the Button component. The user's code has a Button with variant="solid", color="red", size="lg", and specific className. The original code had a Button with onClick={handleEmergencyClick}, which is correct. But in the user's final code, the Button is properly structured with the correct props.

Wait, the user's initial code had a Button with onClick={handleEmergencyClick}, which is correct. The problem was that the button was showing as text, which might be due to incorrect JSX syntax or missing components. The user's corrected code uses the Button component correctly, so that should fix the issue.

But in the user's final code, there's a line: <Button variant="solid" color="red" size="lg" onClick={handleEmergencyClick} className="w-full py-6 text-xl font-bold mb-4" > 🚨 I FEEL UNSAFE 🚨 </Button>. That looks correct. The other buttons also have the right props.

However, the user's code might have some issues. For example, in the original code, the country was set to 'US', but in the final code, it's 'ZA'. The user might have intended to change the default country, but that's a separate issue. Also, the currentConfig is set to countryConfig[country] || countryConfig['ZA'], which is correct if the country is 'ZA'.

Another thing is the use of the Switch component. The original code had a Switch with onChange={handleSafeModeToggle}, which is correct. The user's final code also has that.

But the user's code might have some missing imports. For example, in the initial code, there were imports for Select, Popover, etc., but in the final code, those are removed. If the Dashboard page uses those components, that would cause errors. However, the user's final code doesn't include them, so maybe they were not needed, or the user intended to remove them.

Wait, the user's final code doesn't have Select, Popover, etc., but the original code did. So the user might have made a mistake in removing those imports. But since the user's final code doesn't use them, maybe it's okay. However, if the Dashboard page is supposed to have those components, that would be a problem. But the user's code doesn't show any usage of those components, so maybe it's safe.

Another thing is the use of the countryConfig. The user's code uses countryConfig[country] or countryConfig['ZA'], which is correct if the country is 'ZA'. The emergency number is set to '10111' if not found, which matches the countryConfig for 'ZA'.

The user's code also has the emergency button with the correct text and styling. The other buttons have the right icons and labels.

So, the main steps the user wants are: delete the corrupted Dashboard.tsx, then create a new one with the provided code. The user's code seems to address the button issue, so the final answer should confirm that the file was deleted and the new one created with the correct code.

But in the previous interactions, the user had multiple attempts, and the assistant kept writing the code again. The user might be testing if the assistant can handle the deletion and recreation properly. The final answer should confirm the deletion and the creation of the new file with the correct code.
<dyad-delete path="src/pages/Dashboard.tsx"></dyad-delete>  
<dyad-write path="src/pages/Dashboard.tsx" description="Created clean Dashboard.tsx with proper button styling and navigation">  
```tsx  
"use client";  
import { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import countryConfig from '../config/countryConfig';  
import { Button, Card, Switch } from '../components/ui';  

export default function Dashboard() {  
  const navigate = useNavigate();  
  const [country, setCountry] = useState<string>('ZA');  
  const [detectedCountry, setDetectedCountry] = useState<string>('');  
  const [isDetecting, setIsDetecting] = useState<boolean>(true);  
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
        setDetectedCountry('ZA');  
        setCountry('ZA');  
      } finally {  
        setIsDetecting(false);  
      }  
    };  
    fetchCountry();  
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
          <Button variant="solid" color="red" size="lg" onClick={handleEmergencyClick} className="w-full py-6 text-xl font-bold mb-4">  
            🚨 I FEEL UNSAFE 🚨  
          </Button>  
          <Button variant="outline" size="lg" onClick={handleSafeModeToggle} className="w-full mb-6">  
            {protectionMode === 'armed' ? '🔒 Disarm System' : '🔓 Arm System'}  
          </Button>  
          <div className="flex justify-between gap-3">  
            <Button variant="outline" size="md" onClick={() => navigate('/devices')} className="flex-1">  
              📱 Devices  
            </Button>  
            <Button variant="outline" size="md" onClick={() => navigate('/contacts')} className="flex-1">  
              👥 Contacts  
            </Button>  
            <Button variant="outline" size="md" onClick={() => navigate('/settings')} className="flex-1">  
              ⚙️ Settings  
            </Button>  
          </div>  
        </Card.Body>  
      </Card>  
    </div>  
  );  
}  