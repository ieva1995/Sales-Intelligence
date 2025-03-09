const createCheckoutSession = async (priceId: string) => {
  try {
    console.log('Creating checkout session for:', priceId);

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.details || data.error || 'Failed to create checkout session');
    }

    if (!data.url) {
      throw new Error('Invalid session response from server');
    }

    console.log('Redirecting to Stripe checkout:', data.url);
    window.location.href = data.url;
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

const createCustomerPortalSession = async () => {
  try {
    const response = await fetch('/api/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.details || data.error || 'Failed to create portal session');
    }

    if (!data.url) {
      throw new Error('Invalid portal session response from server');
    }

    window.location.href = data.url;
  } catch (error: any) {
    console.error('Error creating portal session:', error);
    throw error;
  }
};

export { createCheckoutSession, createCustomerPortalSession };