import express from 'express';
import { shopifyApi, ApiVersion } from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node';

const router = express.Router();

// Initialize Shopify API
const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY || '',
  apiSecretKey: process.env.SHOPIFY_API_SECRET || '',
  scopes: ['read_products', 'read_orders', 'read_customers'],
  hostName: process.env.SHOPIFY_SHOP_DOMAIN || '',
  apiVersion: ApiVersion.October23,
  isEmbeddedApp: false,
});

// Create a properly formatted session object
function createSession(accessToken: string, shop: string): any {
  // This is a workaround for TypeScript type issues
  // In a production environment, you should follow Shopify's session management best practices
  return {
    id: `${shop}_${Date.now()}`,
    shop: shop,
    state: 'active',
    isOnline: false,
    accessToken: accessToken,
    scope: Array.isArray(shopify.config.scopes) ? shopify.config.scopes.join(',') : 'read_products,read_orders,read_customers',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
    onlineAccessInfo: null,
    isActive: () => true,
    toObject: () => ({
      id: `${shop}_${Date.now()}`,
      shop: shop,
      state: 'active',
      isOnline: false,
      accessToken: accessToken,
      scope: Array.isArray(shopify.config.scopes) ? shopify.config.scopes.join(',') : 'read_products,read_orders,read_customers',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    })
  };
}

// Endpoint to initiate Shopify OAuth flow
router.get('/auth', async (req, res) => {
  try {
    // In newer versions of Shopify API, the auth methods have been restructured
    const shop = process.env.SHOPIFY_SHOP_DOMAIN || '';

    // Get the base URL from the request
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.headers.host;
    const baseUrl = `${protocol}://${host}`;
    const redirectUrl = `${baseUrl}/api/shopify/callback`;

    console.log('Initiating Shopify auth with redirect URL:', redirectUrl);

    // Create an auth URL manually since the API has changed
    const authUrl = `https://${shop}/admin/oauth/authorize?` +
      `client_id=${process.env.SHOPIFY_API_KEY}` +
      `&scope=${Array.isArray(shopify.config.scopes) ? shopify.config.scopes.join(',') : 'read_products,read_orders,read_customers'}` +
      `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
      `&state=${Date.now()}`;

    // Redirect to Shopify auth page
    res.redirect(authUrl);
  } catch (error: any) {
    console.error('Error initiating Shopify auth:', error);
    res.status(500).json({ error: 'Failed to initiate Shopify authentication', details: error.message });
  }
});

// Endpoint to handle Shopify OAuth callback
router.get('/callback', async (req, res) => {
  try {
    // Handle the oauth callback differently since the API has changed
    const { code, shop } = req.query;

    if (!code || !shop) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // In a real app, you would exchange the code for an access token
    // using the appropriate Shopify API methods

    // For this example, we'll simply redirect back to the app
    res.redirect('/commerce/shopify');
  } catch (error: any) {
    console.error('Error validating Shopify auth callback:', error);
    res.status(500).json({ error: 'Failed to complete Shopify authentication', details: error.message });
  }
});

// Endpoint to fetch products from Shopify
router.get('/products', async (req, res) => {
  try {
    // In a real app, you would retrieve the session from your database
    const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

    if (!accessToken) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const shop = process.env.SHOPIFY_SHOP_DOMAIN || '';
    const session = createSession(accessToken, shop);

    const client = new shopify.clients.Rest({
      session
    });

    const response = await client.get({
      path: 'products',
    });

    res.json(response.body);
  } catch (error: any) {
    console.error('Error fetching Shopify products:', error);
    res.status(500).json({ error: 'Failed to fetch Shopify products', details: error.message });
  }
});

// Endpoint to fetch orders from Shopify
router.get('/orders', async (req, res) => {
  try {
    // In a real app, you would retrieve the session from your database
    const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

    if (!accessToken) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const shop = process.env.SHOPIFY_SHOP_DOMAIN || '';
    const session = createSession(accessToken, shop);

    const client = new shopify.clients.Rest({
      session
    });

    const response = await client.get({
      path: 'orders',
    });

    res.json(response.body);
  } catch (error: any) {
    console.error('Error fetching Shopify orders:', error);
    res.status(500).json({ error: 'Failed to fetch Shopify orders', details: error.message });
  }
});

// Endpoint to fetch customers from Shopify
router.get('/customers', async (req, res) => {
  try {
    // In a real app, you would retrieve the session from your database
    const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

    if (!accessToken) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const shop = process.env.SHOPIFY_SHOP_DOMAIN || '';
    const session = createSession(accessToken, shop);

    const client = new shopify.clients.Rest({
      session
    });

    const response = await client.get({
      path: 'customers',
    });

    res.json(response.body);
  } catch (error: any) {
    console.error('Error fetching Shopify customers:', error);
    res.status(500).json({ error: 'Failed to fetch Shopify customers', details: error.message });
  }
});

export default router;