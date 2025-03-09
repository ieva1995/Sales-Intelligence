// This file contains the API functions to interact with Shopify
// We'll use fetch API for browser requests instead of the Node-specific adapter

// Helper functions for Shopify API calls
export async function getShopifyProducts() {
  try {
    console.log("Fetching Shopify products from backend");
    const response = await fetch('/api/shopify/products');

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data.products || [];
  } catch (error: any) {
    console.error('Error fetching Shopify products:', error);
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}

export async function getShopifyOrders() {
  try {
    console.log("Fetching Shopify orders from backend");
    const response = await fetch('/api/shopify/orders');

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data.orders || [];
  } catch (error: any) {
    console.error('Error fetching Shopify orders:', error);
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
}

export async function getShopifyCustomers() {
  try {
    console.log("Fetching Shopify customers from backend");
    const response = await fetch('/api/shopify/customers');

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data.customers || [];
  } catch (error: any) {
    console.error('Error fetching Shopify customers:', error);
    throw new Error(`Failed to fetch customers: ${error.message}`);
  }
}

export async function getShopifyPerformance() {
  try {
    console.log("Fetching Shopify performance data");
    const response = await fetch('/api/shopify/performance');

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching Shopify performance data:', error);
    throw new Error(`Failed to fetch performance data: ${error.message}`);
  }
}

// Function to authenticate with Shopify
export function authenticateWithShopify() {
  console.log("Redirecting to Shopify authentication");
  window.location.href = '/api/shopify/auth';
}