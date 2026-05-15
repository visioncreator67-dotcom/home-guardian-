import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';
import StripePaymentForm from '../components/StripePaymentForm';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const stripe = useStripe();

  const amount = parseFloat(searchParams.get('amount') || '10');
  const plan = searchParams.get('plan') || 'one-time';
  const priceId = searchParams.get('priceId') || '';

  const handleSuccess = (paymentIntentId: string) => {
    console.log('Payment successful!', paymentIntentId);
    navigate('/dashboard');
  };

  const handleError = (error: any) => {
    console.error('Payment failed:', error);
    // You could show a toast or alert here
  };

  // Determine if this is a subscription based on presence of a priceId
  const isSubscription = Boolean(priceId);

  const label = isSubscription
    ? plan.includes('Yearly')
      ? 'Annual Subscription'
      : 'Monthly Subscription'
    : 'Complete Payment';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">{label}</h2>
        <StripePaymentForm
          amount={amount}
          label={label}
          planType={isSubscription ? 'subscription' : 'one-time'}
          priceId={priceId}
          onSuccess={handleSuccess}
          onError={handleError}
        />
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/subscription')}
            className="text-indigo-600 hover:text-indigo-700 text-sm"
          >
            Change plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;