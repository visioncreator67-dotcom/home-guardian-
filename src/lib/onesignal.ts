// src/lib/onesignal.ts
declare global {
  interface Window {
    OneSignal: any;
  }
}

export const initOneSignal = () => {
  console.log('initOneSignal called');
  if (typeof window === 'undefined') return;
  if (window.OneSignal && window.OneSignal.initialized) {
    console.log('OneSignal already initialized');
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    console.log('OneSignal script loaded');
    // Add a small delay to ensure service worker registration
    setTimeout(() => {
      window.OneSignal = window.OneSignal || [];
      window.OneSignal.push(() => {
        window.OneSignal.init({
          appId: 'a47ff1de-5335-439b-a105-7608ef26b9b3',
          allowLocalhostAsSecureOrigin: true,
        });
        console.log('OneSignal init called');
      });
    }, 1000);
  };
  script.onerror = (err) => {
    console.error('OneSignal script failed to load', err);
  };
};

export const sendExternalUserId = (userId: string) => {
  if (window.OneSignal && window.OneSignal.initialized) {
    window.OneSignal.push(() => {
      window.OneSignal.sendExternalUserId(userId);
      console.log('External userId sent:', userId);
    });
  } else {
    console.warn('OneSignal not ready to send userId');
  }
};

export const requestNotificationPermission = () => {
  if (window.OneSignal && window.OneSignal.initialized) {
    window.OneSignal.push(() => {
      window.OneSignal.showSlidedownPrompt();
    });
  } else {
    alert('OneSignal is still loading, please wait a moment and try again.');
  }
};