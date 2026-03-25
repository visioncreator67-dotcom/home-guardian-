import { useState, useEffect } from 'react';
import { useRouter } from 'react-router-dom';
import countryConfig from '../config/countryConfig';
import { Button, Card, Switch, Select, Input, Form, useTranslation } from '@/components/ui';

interface SettingsState {
  monitoringActive: boolean;
  smartHomeIntegrations: string[];
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  subscriptionPlan: 'free' | 'pro' | 'premium';
  paymentMethod: string;
}

const initialState: SettingsState = {
  monitoringActive: false,
  smartHomeIntegrations: [],
  notificationPreferences: {
    email: true,
    sms: true,
    push: true
  },
  subscriptionPlan: 'free',
  paymentMethod: ''
};

export default function Settings() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const [settings, setSettings] = useState<SettingsState>(initialState);
  const [country, setCountry] = useState<string>(i18n.language.split('-')[0]);
  const [currentConfig] = useState(countryConfig[country] || countryConfig['US']);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setCountry(data.country_code);
        setCurrentConfig(countryConfig[data.country_code] || countryConfig['US']);
      } catch (error) {
        console.error('Error detecting country:', error);
        setCountry('US');
        setCurrentConfig(countryConfig['US']);
      }
    };
    fetchCountry();
  }, []);

  const handleMonitoringToggle = () => {
    setSettings(prev => ({ ...prev, monitoringActive: !prev.monitoringActive }));
  };

  const handleSmartHomeAdd = (integration: string) => {
    setSettings(prev => ({ ...prev, smartHomeIntegrations: [...prev.smartHomeIntegrations, integration] }));
  };

  const handleSmartHomeRemove = (integration: string) => {
    setSettings(prev => ({ ...prev, smartHomeIntegrations: prev.smartHomeIntegrations.filter(i => i !== integration) }));
  };

  const handleSubscriptionChange = (plan: 'free' | 'pro' | 'premium') => {
    setSettings(prev => ({ ...prev, subscriptionPlan: plan }));
  };

  const handlePaymentMethodChange = (method: string) => {
    setSettings(prev => ({ ...prev, paymentMethod: method }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <Card.Header>
          <h2 className="text-2xl font-bold text-center text-gray-800">{i18n.t('settings_title')}</h2>
        </Card.Header>

        <Card.Body>
          <Form>
            <div className="mb-4">
              <Switch
                checked={settings.monitoringActive}
                onChange={handleMonitoringToggle}
                className="h-4 w-10"
              />
              <label className="text-sm text-gray-600">{i18n.t('24_7_monitoring')}</label>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">{i18n.t('smart_home_integrations')}</h3>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                {settings.smartHomeIntegrations.map(integration => (
                  <div key={integration} className="bg-white rounded-lg shadow-sm p-2 mb-1 md:mb-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{integration}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSmartHomeRemove(integration)}
                        className="text-sm text-red-500"
                      >
                        {
                          i18n.t('remove_integration')
                        }
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSmartHomeAdd('IFTTT Webhook')}
                className="w-full"
              >
                {i18n.t('add_smart_home')}
              </Button>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">{i18n.t('notification_preferences')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Switch
                    checked={settings.notificationPreferences.email}
                    onChange={() => setSettings(prev => ({ ...prev, 'notificationPreferences.email': !prev.notificationPreferences.email }))}
                    className="h-4 w-10"
                  />
                  <label className="text-sm text-gray-600">{i18n.t('email_notifications')}</label>
                </div>
                <div>
                  <Switch
                    checked={settings.notificationPreferences.sms}
                    onChange={() => setSettings(prev => ({ ...prev, 'notificationPreferences.sms': !prev.notificationPreferences.sms }))}
                    className="h-4 w-10"
                  />
                  <label className="text-sm text-gray-600">{i18n.t('sms_notifications')}</label>
                </div>
                <div>
                  <Switch
                    checked={settings.notificationPreferences.push}
                    onChange={() => setSettings(prev => ({ ...prev, 'notificationPreferences.push': !prev.notificationPreferences.push }))}
                    className="h-4 w-10"
                  />
                  <label className="text-sm text-gray-600">{i18n.t('push_notifications')}</label>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">{i18n.t('subscription_management')}</h3>
              <Select
                placeholder={i18n.t('select_plan')}
                options={[
                  { value: 'free', label: i18n.t('free_plan') },
                  { value: 'pro', label: i18n.t('pro_plan') },
                  { value: 'premium', label: i18n.t('premium_plan') }
                ]}
                value={settings.subscriptionPlan}
                onChange={handleSubscriptionChange}
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">{i18n.t('payment_methods')}</h3>
              <Select
                placeholder={i18n.t('select_payment')}
                options={[
                  { value: 'credit_card', label: i18n.t('credit_card') },
                  { value: 'paypal', label: i18n.t('paypal') },
                  { value: 'bank_transfer', label: i18n.t('bank_transfer') }
                ]}
                value={settings.paymentMethod}
                onChange={handlePaymentMethodChange}
                className="w-full"
              />
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}