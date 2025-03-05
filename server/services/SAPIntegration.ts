import axios from 'axios';

class SAPIntegration {
  private baseUrl: string;
  private auth: {
    username: string;
    password: string;
  };

  constructor() {
    this.baseUrl = process.env.SAP_API_URL || '';
    this.auth = {
      username: process.env.SAP_USER || '',
      password: process.env.SAP_PASSWORD || ''
    };
  }

  async connect(): Promise<boolean> {
    try {
      await axios.get(`${this.baseUrl}/api/ping`, {
        auth: this.auth
      });
      return true;
    } catch (err) {
      console.error('SAP connection error:', err);
      return false;
    }
  }

  async getSalesData() {
    return axios.get(`${this.baseUrl}/api/sales`, {
      auth: this.auth
    }).then(response => response.data);
  }

  async createSalesOrder(orderData: any) {
    return axios.post(`${this.baseUrl}/api/sales-orders`, orderData, {
      auth: this.auth
    }).then(response => response.data);
  }

  async getInventoryData() {
    return axios.get(`${this.baseUrl}/api/inventory`, {
      auth: this.auth
    }).then(response => response.data);
  }

  async testConnection() {
    return this.connect();
  }
}

export default SAPIntegration;