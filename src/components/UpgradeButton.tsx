import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface UpgradeButtonProps {
  priceId: string;        // Stripe Price ID for the plan (monthly/yearly)
  buttonText?: string;
  variant?: 'solid' | 'outline';
}

export const UpgradeButton: React.FC<UpgradeButtonProps> = ({
  priceId,
  buttonText = 'Upgrade to Pro',
  variant = 'solid',
}) => {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);

    // 1. Get current user session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      alert('Please log in to upgrade.');
      setLoading(false);
      return;
    }

    // 2. Call your Edge Function to create Stripe Checkout session
    const response = await fetch(
      'https://kqybfmeytfkxtgdbxlnc.functions.supabase.co/create-checkout-session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          priceId,
          userId: session.user.id,
          userEmail: session.user.email,
          successUrl: `${window.location.origin}/settings?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/settings`,
        }),
      }
    );

    const data = await response.json();
    if (data.url) {
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } else {
      alert('Something went wrong. Please try again.');
      console.error(data);
    }
    setLoading(false);
  };

  const baseClasses =
    variant === 'solid'
      ? 'bg-red-600 text-white hover:bg-red-700'
      : 'border border-red-600 text-red-600 hover:bg-red-50';
  const disabledClasses = 'opacity-50 cursor-not-allowed';

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className={`px-6 py-2 rounded-lg font-medium transition ${baseClasses} ${
        loading ? disabledClasses : ''
      }`}
    >
      {loading ? 'Processing...' : buttonText}
    </button>
  );
};