import '@shopify/shopify-api/adapters/node';
import { shopifyApi, ApiVersion, Session } from '@shopify/shopify-api';

// Set up Shopify API client
export const shopifyClient = shopifyApi({
  apiKey: import.meta.env.VITE_SHOPIFY_API_KEY || '',
  apiSecretKey: import.meta.env.VITE_SHOPIFY_API_SECRET || '',
  scopes: ['read_products', 'read_orders', 'read_customers'],
  hostName: import.meta.env.VITE_SHOPIFY_SHOP_DOMAIN || '',
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
    scope: Array.isArray(shopifyClient.config.scopes) ? shopifyClient.config.scopes.join(',') : 'read_products,read_orders,read_customers',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
    onlineAccessInfo: null,
    isActive: () => true,
    toObject: () => ({
      id: `${shop}_${Date.now()}`,
      shop: shop,
      state: 'active',
      isOnline: false,
      accessToken: accessToken,
      scope: Array.isArray(shopifyClient.config.scopes) ? shopifyClient.config.scopes.join(',') : 'read_products,read_orders,read_customers',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    })
  };
}

// Helper functions for Shopify API calls
export async function getShopifyProducts(accessToken: string) {
  try {
    const shopDomain = import.meta.env.VITE_SHOPIFY_SHOP_DOMAIN || '';
    const session = createSession(accessToken, shopDomain);

    const client = new shopifyClient.clients.Rest({
      session
    });

    const response = await client.get({
      path: 'products',
    });

    return response.body.products;
  } catch (error: any) {
    console.error('Error fetching Shopify products:', error);
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}

export async function getShopifyOrders(accessToken: string) {
  try {
    const shopDomain = import.meta.env.VITE_SHOPIFY_SHOP_DOMAIN || '';
    const session = createSession(accessToken, shopDomain);

    const client = new shopifyClient.clients.Rest({
      session
    });

    const response = await client.get({
      path: 'orders',
    });

    return response.body.orders;
  } catch (error: any) {
    console.error('Error fetching Shopify orders:', error);
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
}

export async function getShopifyCustomers(accessToken: string) {
  try {
    const shopDomain = import.meta.env.VITE_SHOPIFY_SHOP_DOMAIN || '';
    const session = createSession(accessToken, shopDomain);

    const client = new shopifyClient.clients.Rest({
      session
    });

    const response = await client.get({
      path: 'customers',
    });

    return response.body.customers;
  } catch (error: any) {
    console.error('Error fetching Shopify customers:', error);
    throw new Error(`Failed to fetch customers: ${error.message}`);
  }
}