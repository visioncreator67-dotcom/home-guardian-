import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';

interface StripePaymentFormProps {
  amount: number;
  label?: string;
  planType?: 'one-time' | 'subscription';
  priceId?: string;
  onSuccess?: (paymentIntentId: string) => void;
  onError?: (error: any) => void;
}

export default function StripePaymentForm({ 
  amount, 
  label = "Complete Payment", 
  planType = 'one-time',
  priceId,
  onSuccess, 
  onError 
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      setIsProcessing(false);
      return;
    }

    try {
      let response;
      
      if (planType === 'subscription' && priceId) {
        // Create subscription session
        response = await fetch('/api/create-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ priceId })
        });
      } else {
        // Create payment intent for one-time payment
        response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: amount * 100 }) // Stripe expects cents
        });
      }

      const { clientSecret, sessionId } = await response.json();

      if (sessionId) {
        // Handle subscription checkout session
        const result = await stripe.redirectToCheckout({
          sessionId
        });
        
        if (result.error) {
          onError?.(result.error);
        }
      } else {
        // Handle payment intent
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              email: 'customer@example.com',
              name: 'Customer Name'
            }
          }
        });

        if (result.error) {
          onError?.(result.error);
        } else if (result.paymentIntent) {
          onSuccess?.(result.paymentIntent.id);
        }
      }
    } catch (error) {
      onError?.(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? 'Processing...' : `${label} - ${amount.toFixed(2)}`}
      </button>
    </form>
  );
}