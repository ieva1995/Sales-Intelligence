const createCheckoutSession = async (priceId: string) => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
      }),
    });

    const session = await response.json();
    
    // Redirect to Stripe Checkout
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
    });
    
    const session = await response.json();
    window.location.href = session.url;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
};

export { createCheckoutSession, createCustomerPortalSession };
