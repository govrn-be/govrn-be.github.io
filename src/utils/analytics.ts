// Google Analytics 4 and Google Tag Manager IDs
const GA4_ID = 'G-M9XC8LQZF2';
const GTM_ID = 'GTM-ML9SBCS';

// TypeScript declarations for global objects
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * Initialize gtag function and dataLayer
 * Must be called before any consent or tracking operations
 */
export const initializeGtag = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;
  return gtag;
};

/**
 * Set default consent state (Google Consent Mode v2)
 * This should be called as early as possible, before GA4/GTM scripts load
 */
export const setDefaultConsent = () => {
  const gtag = window.gtag || initializeGtag();

  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage': 'granted', // Essential cookies always granted
    'wait_for_update': 500
  });
};

/**
 * Update consent state based on user choice
 */
export const updateConsent = (granted: boolean) => {
  const gtag = window.gtag || initializeGtag();

  gtag('consent', 'update', {
    'ad_storage': granted ? 'granted' : 'denied',
    'ad_user_data': granted ? 'granted' : 'denied',
    'ad_personalization': granted ? 'granted' : 'denied',
    'analytics_storage': granted ? 'granted' : 'denied',
    'functionality_storage': granted ? 'granted' : 'denied',
    'personalization_storage': granted ? 'granted' : 'denied'
  });

  // Fire consent update event
  gtag('event', 'consent_update', {
    'consent_status': granted ? 'granted' : 'denied',
    'timestamp': new Date().toISOString()
  });
};

/**
 * Load Google Analytics 4 script
 */
export const loadGA4 = () => {
  // Prevent loading if already loaded
  if (document.querySelector(`script[src*="${GA4_ID}"]`)) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);

  script.onload = () => {
    const gtag = window.gtag || initializeGtag();
    gtag('js', new Date());
    gtag('config', GA4_ID);
  };
};

/**
 * Load Google Tag Manager script
 */
export const loadGTM = () => {
  // Prevent loading if already loaded
  if (document.querySelector(`script[src*="${GTM_ID}"]`)) {
    return;
  }

  // Load GTM script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);

  // Initialize GTM dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });

  // Add noscript fallback
  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  noscript.appendChild(iframe);
  document.body.insertBefore(noscript, document.body.firstChild);
};

/**
 * Initialize analytics with consent mode
 * This loads the scripts but they will respect the consent settings
 */
export const initializeAnalytics = () => {
  initializeGtag();
  setDefaultConsent();
  loadGA4();
  loadGTM();
};

/**
 * Disable analytics tracking (legacy function, kept for compatibility)
 */
export const disableAnalytics = () => {
  updateConsent(false);
};