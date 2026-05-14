import { loadStripe } from '@stripe/stripe-js';
import { StripeProvider } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Stripe configuration
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY || '');

interface StripeProviderWrapperProps {
  children: React.ReactNode;
}

export default function StripeProviderWrapper({ children }: StripeProviderWrapperProps) {
  return (
    <StripeProvider stripe={stripePromise}>
      <Elements>
        {children}
      </Elements>
    </StripeProvider>
  );
}