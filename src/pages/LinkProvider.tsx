import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Provider {
  id: string;
  name: string;
  country: string;
  emergency_phone: string;
}

interface UserProvider {
  id: string;
  provider_id: string;
  account_number: string;
  provider: Provider;
}

export default function LinkProvider() {
  const navigate = useNavigate();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [linkedProviders, setLinkedProviders] = useState<UserProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);

      const { data: providersData, error: providersError } = await supabase
        .from('security_providers')
        .select('id, name, country, emergency_phone')
        .eq('approved', true);

      if (providersError) {
        console.error('Error fetching providers:', providersError);
      } else {
        setProviders(providersData || []);
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userProviders, error: userProvidersError } = await supabase
          .from('user_providers')
          .select('id, provider_id, account_number, provider:security_providers(*)')
          .eq('user_id', user.id);

        if (userProvidersError) {
          console.error('Error fetching user providers:', userProvidersError);
        } else {
          setLinkedProviders(userProviders || []);
        }
      }

      setFetching(false);
    };

    fetchData();
  }, []);

  const handleLink = async () => {
    if (!selectedProvider || !accountNumber) return;
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('You must be logged in to link a provider.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('user_providers').insert({
      user_id: user.id,
      provider_id: selectedProvider,
      account_number: accountNumber,
    });

    if (error) {
      console.error('Error linking provider:', error);
      alert('Failed to link provider. Please try again.');
    } else {
      const { data: updated } = await supabase
        .from('user_providers')
        .select('id, provider_id, account_number, provider:security_providers(*)')
        .eq('user_id', user.id);
      setLinkedProviders(updated || []);
      alert('Provider linked successfully!');
      setAccountNumber('');
      setSelectedProvider('');
    }
    setLoading(false);
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading providers...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Link Your Security Provider</h2>
        <p className="text-gray-600 mb-4">
          If you have a private security company, link them here. When you trigger an emergency, they will be notified.
        </p>

        <label className="block text-sm font-medium mb-1">Select Provider</label>
        <select
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
        >
          <option value="">-- Choose --</option>
          {providers.map(p => (
            <option key={p.id} value={p.id}>{p.name} ({p.country})</option>
          ))}
        </select>

        <label className="block text-sm font-medium mb-1">Your Account Number</label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="e.g., 123456"
          className="w-full border rounded-lg p-2 mb-4"
        />

        <button
          onClick={handleLink}
          disabled={loading || !selectedProvider || !accountNumber}
          className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? 'Linking...' : 'Link Provider'}
        </button>

        {linkedProviders.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Linked Providers:</h3>
            <ul className="space-y-1">
              {linkedProviders.map(lp => (
                <li key={lp.id} className="text-sm">
                  ✓ {lp.provider.name} (Account: {lp.account_number})
                </li>
              ))}
            </ul>
          </div>
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