import express from 'express';
import { shopifyApi } from '@shopify/shopify-api';

const router = express.Router();

// Create shopify API client once
const shopifyConfig = {
  // Config will be loaded from env vars
  scopes: ['read_products', 'read_orders', 'read_customers']
};

const shopifyClient = shopifyApi(shopifyConfig);

function createSession(accessToken: string, shop: string): any {
  return {
    id: `${shop}_${Date.now()}`,
    shop: shop,
    state: 'active',
    isOnline: false,
    accessToken: accessToken,
    scope: Array.isArray(shopifyConfig.scopes) ? shopifyConfig.scopes.join(',') : 'read_products,read_orders,read_customers',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    onlineAccessInfo: null,
    isActive: () => true,
    toObject: () => ({
      id: `${shop}_${Date.now()}`,
      shop: shop,
      state: 'active',
      isOnline: false,
      accessToken: accessToken,
      scope: Array.isArray(shopifyConfig.scopes) ? shopifyConfig.scopes.join(',') : 'read_products,read_orders,read_customers',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    })
  };
}

// Route handlers
router.get('/auth', async (req, res) => {
  try {
    const shop = process.env.SHOPIFY_SHOP_DOMAIN || '';
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.headers.host;
    const baseUrl = `${protocol}://${host}`;
    const redirectUrl = `${baseUrl}/api/shopify/callback`;

    const authUrl = `https://${shop}/admin/oauth/authorize?` +
      `client_id=${process.env.SHOPIFY_API_KEY}` +
      `&scope=${Array.isArray(shopifyConfig.scopes) ? shopifyConfig.scopes.join(',') : 'read_products,read_orders,read_customers'}` +
      `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
      `&state=${Date.now()}`;

    res.redirect(authUrl);
  } catch (error: any) {
    console.error('Error initiating Shopify auth:', error);
    res.status(500).json({ error: 'Failed to initiate Shopify authentication', details: error.message });
  }
});

router.get('/products', async (req, res) => {
  try {
    const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;
    if (!accessToken) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const shop = process.env.SHOPIFY_SHOP_DOMAIN || '';
    const session = createSession(accessToken, shop);
    const client = new shopifyClient.clients.Rest({ session });
    const response = await client.get({ path: 'products' });
    res.json(response.body);
  } catch (error: any) {
    console.error('Error fetching Shopify products:', error);
    res.status(500).json({ error: 'Failed to fetch Shopify products', details: error.message });
  }
});

router.get('/orders', async (req, res) => {
  try {
    const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;
    if (!accessToken) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const shop = process.env.SHOPIFY_SHOP_DOMAIN || '';
    const session = createSession(accessToken, shop);
    const client = new shopifyClient.clients.Rest({ session });
    const response = await client.get({ path: 'orders' });
    res.json(response.body);
  } catch (error: any) {
    console.error('Error fetching Shopify orders:', error);
    res.status(500).json({ error: 'Failed to fetch Shopify orders', details: error.message });
  }
});

router.get('/customers', async (req, res) => {
  try {
    const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;
    if (!accessToken) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const shop = process.env.SHOPIFY_SHOP_DOMAIN || '';
    const session = createSession(accessToken, shop);
    const client = new shopifyClient.clients.Rest({ session });
    const response = await client.get({ path: 'customers' });
    res.json(response.body);
  } catch (error: any) {
    console.error('Error fetching Shopify customers:', error);
    res.status(500).json({ error: 'Failed to fetch Shopify customers', details: error.message });
  }
});

router.get('/performance', async (req, res) => {
  try {
    const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;
    if (!accessToken) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Mock performance data for now
    res.json({
      revenue: { total: "0.00", weekly: "0.00", monthly: "0.00" },
      orders: { count: 0, averageValue: "0.00" }
    });
  } catch (error: any) {
    console.error('Error fetching Shopify performance:', error);
    res.status(500).json({ error: 'Failed to fetch performance data', details: error.message });
  }
});

export { router as shopify };