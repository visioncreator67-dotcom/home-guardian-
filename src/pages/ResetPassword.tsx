import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    if (!params.get('access_token')) {
      setMessage('Invalid or expired reset link. Please request a new one.');
    }
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage('Passwords do not match');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Password updated! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Set New Password</h2>
        {message && <div className="bg-blue-100 text-blue-800 p-3 rounded mb-4">{message}</div>}
        <form onSubmit={handleReset}>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" className="w-full border rounded-lg p-2 mb-4" required />
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm Password" className="w-full border rounded-lg p-2 mb-4" required />
          <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-2 rounded-lg">{loading ? 'Updating...' : 'Update Password'}</button>
        </form>
      </div>
    </div>
  );
}