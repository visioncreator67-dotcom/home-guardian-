import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface SubscriptionFormProps {
  priceId: string;
  label?: string;
  onSuccess?: (subscriptionId: string) => void;
  onError?: (error: any) => void;
}

export default function SubscriptionForm({ priceId, label = "Subscribe", onSuccess, onError }: SubscriptionFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    try {
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId })
      });

      const { clientSecret } = await response.json();

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
    } catch (error) {
      onError?.(error);
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
        disabled={!stripe || !elements}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {label}
      </button>
    </form>
  );
}