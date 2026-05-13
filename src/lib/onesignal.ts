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
  // If OneSignal is already initialized, show the prompt
  if (window.OneSignal && window.OneSignal.initialized) {
    window.OneSignal.push(() => {
      window.OneSignal.showSlidedownPrompt();
    });
    return;
  }

  // Otherwise, wait for it to become ready
  console.log('Waiting for OneSignal to initialize...');
  const interval = setInterval(() => {
    if (window.OneSignal && window.OneSignal.initialized) {
      clearInterval(interval);
      console.log('OneSignal ready, showing prompt');
      window.OneSignal.push(() => {
        window.OneSignal.showSlidedownPrompt();
      });
    }
  }, 500);

  // Timeout after 10 seconds to avoid infinite waiting
  setTimeout(() => {
    clearInterval(interval);
    alert('OneSignal is taking too long. Please refresh the page and try again.');
  }, 10000);
};