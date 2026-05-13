import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    if (!accessToken) {
      setMessage('Invalid or expired reset link. Please request a new one.');
    }
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Password updated successfully! Redirecting to login...');
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
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}