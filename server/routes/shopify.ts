import express from 'express';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2024-01';
import '@shopify/shopify-api/adapters/node';

const router = express.Router();

// Check if required environment variables are available
const hasShopifyCredentials = 
  process.env.SHOPIFY_API_KEY && 
  process.env.SHOPIFY_API_SECRET && 
  process.env.SHOPIFY_SHOP_DOMAIN;

// Console warnings for missing environment variables
if (!process.env.SHOPIFY_API_KEY) {
  console.warn('Warning: SHOPIFY_API_KEY environment variable is not set');
}
if (!process.env.SHOPIFY_API_SECRET) {
  console.warn('Warning: SHOPIFY_API_SECRET environment variable is not set');
}
if (!process.env.SHOPIFY_SHOP_DOMAIN) {
  console.warn('Warning: SHOPIFY_SHOP_DOMAIN environment variable is not set');
}

// Create shopify API client if credentials are available
let shopifyClient;

if (hasShopifyCredentials) {
  try {
    // Real Shopify config with proper environment variables
    const shopifyConfig = {
      apiKey: process.env.SHOPIFY_API_KEY || '',
      apiSecretKey: process.env.SHOPIFY_API_SECRET || '',
      hostName: (process.env.SHOPIFY_SHOP_DOMAIN || '').replace(/^https?:\/\//, ''),
      scopes: ['read_products', 'read_orders', 'read_customers'],
      isEmbeddedApp: false,
      apiVersion: LATEST_API_VERSION,
      hostScheme: 'https',
      isCustomStoreApp: true,
      adminApiAccessToken: process.env.SHOPIFY_ADMIN_API_TOKEN
    };

    shopifyClient = shopifyApi(shopifyConfig);
    console.log('Shopify API client initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Shopify API client:', error);
  }
}

function createSession(accessToken: string, shop: string): any {
  return {
    id: `${shop}_${Date.now()}`,
    shop: shop,
    state: 'active',
    isOnline: false,
    accessToken: accessToken,
    scope: ['read_products', 'read_orders', 'read_customers'].join(','),
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    onlineAccessInfo: null,
    isActive: () => true,
    toObject: () => ({
      id: `${shop}_${Date.now()}`,
      shop: shop,
      state: 'active',
      isOnline: false,
      accessToken: accessToken,
      scope: ['read_products', 'read_orders', 'read_customers'].join(','),
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    })
  };
}

// Route handlers
router.get('/auth', async (req, res) => {
  try {
    if (!hasShopifyCredentials) {
      return res.status(500).json({ 
        error: 'Shopify API credentials are not configured',
        details: 'Please set SHOPIFY_API_KEY, SHOPIFY_API_SECRET, and SHOPIFY_SHOP_DOMAIN environment variables'
      });
    }

    const shop = process.env.SHOPIFY_SHOP_DOMAIN || '';
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.headers.host;
    const baseUrl = `${protocol}://${host}`;
    const redirectUrl = `${baseUrl}/api/shopify/callback`;

    const authUrl = `https://${shop}/admin/oauth/authorize?` +
      `client_id=${process.env.SHOPIFY_API_KEY}` +
      `&scope=${['read_products', 'read_orders', 'read_customers'].join(',')}` +
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
    if (!hasShopifyCredentials) {
      // Return sample data when credentials are not available
      return res.json({
        products: [
          {
            id: "1",
            title: "Enterprise Sales Platform",
            handle: "enterprise-sales-platform",
            product_type: "Software",
            status: "active",
            created_at: "2025-03-01",
            updated_at: "2025-03-04",
            published_at: "2025-03-01",
            vendor: "SalesBoost AI",
            variants: [],
            options: [],
            images: [],
            image: {
              src: "https://via.placeholder.com/150"
            }
          },
          {
            id: "2",
            title: "Sales Intelligence Pro",
            handle: "sales-intelligence-pro",
            product_type: "Service",
            status: "active",
            created_at: "2025-03-01",
            updated_at: "2025-03-04",
            published_at: "2025-03-01",
            vendor: "SalesBoost AI",
            variants: [],
            options: [],
            images: [],
            image: {
              src: "https://via.placeholder.com/150"
            }
          }
        ]
      });
    }

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
    if (!hasShopifyCredentials) {
      // Return sample data when credentials are not available
      return res.json({
        orders: [
          {
            id: "1001",
            name: "#1001",
            customer: {
              first_name: "John",
              last_name: "Smith",
              email: "john@example.com"
            },
            created_at: "2025-03-04",
            financial_status: "paid",
            fulfillment_status: "fulfilled",
            total_price: "999.00",
            line_items: []
          },
          {
            id: "1002",
            name: "#1002",
            customer: {
              first_name: "Sarah",
              last_name: "Johnson",
              email: "sarah@example.com"
            },
            created_at: "2025-03-03",
            financial_status: "paid",
            fulfillment_status: "fulfilled",
            total_price: "499.00",
            line_items: []
          }
        ]
      });
    }

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
    if (!hasShopifyCredentials) {
      // Return sample data when credentials are not available
      return res.json({
        customers: [
          {
            id: "101",
            first_name: "John",
            last_name: "Smith",
            email: "john@example.com",
            orders_count: 5,
            total_spent: "4995.00",
            created_at: "2025-01-15",
            addresses: []
          },
          {
            id: "102",
            first_name: "Sarah",
            last_name: "Johnson",
            email: "sarah@example.com",
            orders_count: 3,
            total_spent: "1497.00",
            created_at: "2025-02-01",
            addresses: []
          }
        ]
      });
    }

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
    // Mock performance data is always returned
    res.json({
      revenue: { total: "5495.00", weekly: "1499.00", monthly: "3996.00" },
      orders: { count: 8, averageValue: "686.88" }
    });
  } catch (error: any) {
    console.error('Error fetching Shopify performance:', error);
    res.status(500).json({ error: 'Failed to fetch performance data', details: error.message });
  }
});

export default router;