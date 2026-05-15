import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Card, Select } from '../components/ui';
import { translations } from '../translations';
import { pricingData } from '../config/pricingConfig';

const t = (key: string) => translations.en[key] || key;

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const [country, setCountry] = useState<string>('ZA');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [searchParams] = useSearchParams();

  const currentPricing = pricingData.find(p => p.country === country) || pricingData.find(p => p.country === 'USA');

  const handleCountryChange = (value: string) => {
    setCountry(value);
    setSelectedPlan('');
  };

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  const queryParams = new URLSearchParams(searchParams.toString());

  const handleSubmit = () => {
    if (!selectedPlan) return;

    // Determine amount and priceId based on selected plan
    const planKey = selectedPlan as keyof typeof currentPricing.plans;
    const amountValue = currentPricing.plans[planKey];
    const priceId = currentPricing.stripePriceIds[planKey as keyof typeof currentPricing.stripePriceIds];

    queryParams.set('amount', amountValue.toString());
    if (priceId) queryParams.set('priceId', priceId);
    queryParams.set('plan', selectedPlan); // keep plan name for UI

    navigate(`/payment?${queryParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <Card.Header>
          <h1 className="text-3xl font-bold text-center text-gray-800">{t('select_plan')}</h1>
        </Card.Header>

        <Card.Body>
          <div className="mb-6">
            <p className="text-lg text-gray-600">{t('select_your_country')}</p>
            <Select
              placeholder={t('country')}
              onChange={handleCountryChange}
              options={[
                { value: 'US', label: 'United States' },
                { value: 'GB', label: 'United Kingdom' },
                { value: 'ZA', label: 'South Africa' },
                { value: 'CA', label: 'Canada' },
                { value: 'AU', label: 'Australia' },
                { value: 'DE', label: 'Germany' }
              ]}
              value={country}
              className="w-full mb-4"
            />
          </div>

          <div className="mb-6">
            <p className="text-lg text-gray-600">{t('select_your_plan')}</p>
            <Select
              placeholder={t('plan')}
              onChange={handlePlanSelect}
              options={[
                {
                  value: 'proMonthly',
                  label: `${currentPricing.symbol}${currentPricing.plans.proMonthly.toFixed(2)}/month`
                },
                {
                  value: 'proYearly',
                  label: `${currentPricing.symbol}${currentPricing.plans.proYearly.toFixed(2)}/year`
                },
                {
                  value: 'premierMonthly',
                  label: `${currentPricing.symbol}${currentPricing.plans.premierMonthly.toFixed(2)}/month`
                },
                {
                  value: 'premierYearly',
                  label: `${currentPricing.symbol}${currentPricing.plans.premierYearly.toFixed(2)}/year`
                }
              ]}
              value={selectedPlan}
              className="w-full mb-4"
            />
          </div>

          <Button
            variant="solid"
            color="red"
            size="lg"
            onClick={handleSubmit}
            className="w-full"
          >
            {t('continue')}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}