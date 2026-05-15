import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://home-guardian.pages.dev/reset-password',
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for the password reset link.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Reset Password</h2>
        {message && <div className="bg-blue-100 text-blue-800 p-3 rounded mb-4">{message}</div>}
        <form onSubmit={handleReset}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border rounded-lg p-2 mb-4" required />
          <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-2 rounded-lg">
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </form>
        <button onClick={() => navigate('/login')} className="mt-4 w-full text-gray-600 hover:underline text-sm">Back to login</button>
      </div>
    </div>
  );
}