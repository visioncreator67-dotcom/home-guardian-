import { useNavigate } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';

const PaymentPage = () => {
  const navigate = useNavigate();
  const stripe = useStripe();

  const handleSuccess = (paymentIntentId: string) => {
    console.log('Payment successful!', paymentIntentId);
    navigate('/dashboard');
  };

  const handleError = (error: any) => {
    console.error('Payment failed:', error);
    // Show error message to user
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>
      <PaymentForm
        amount={10}
        label="Complete Payment"
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
};

export default PaymentPage;