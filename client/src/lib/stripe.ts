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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.details || 'Failed to create checkout session');
    }

    const session = await response.json();

    if (!session.url) {
      throw new Error('Invalid session response from server');
    }

    console.log('Redirecting to Stripe checkout:', session.url);
    window.location.href = session.url;
  } catch (error) {
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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.details || 'Failed to create portal session');
    }

    const session = await response.json();

    if (!session.url) {
      throw new Error('Invalid portal session response from server');
    }

    window.location.href = session.url;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
};

export { createCheckoutSession, createCustomerPortalSession };