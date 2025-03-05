import { RFC } from 'node-rfc';
import { encrypt, decrypt } from '../utils/encryption';

export class SAPIntegration {
  private client: RFC.Client;

  constructor() {
    this.client = new RFC.Client({
      ashost: process.env.SAP_HOST,
      sysnr: process.env.SAP_SYSTEM_NUMBER,
      client: process.env.SAP_CLIENT,
      user: process.env.SAP_USER,
      passwd: process.env.SAP_PASSWORD
    });
  }

  async connect() {
    try {
      await this.client.connect();
      return true;
    } catch (err) {
      console.error('SAP connection error:', err);
      return false;
    }
  }

  async callFunction(name: string, params: any) {
    try {
      const result = await this.client.call(name, params);
      return result;
    } catch (err) {
      console.error('SAP function call error:', err);
      throw err;
    }
  }

  async getSalesData() {
    return this.callFunction('BAPI_SALESORDER_GETLIST', {
      CUSTOMER_NUMBER: '',
      SALES_ORGANIZATION: '',
      MATERIAL: '',
    });
  }

  async createSalesOrder(orderData: any) {
    return this.callFunction('BAPI_SALESORDER_CREATEFROMDAT2', {
      ORDER_HEADER_IN: {
        DOC_TYPE: 'TA',
        SALES_ORG: orderData.salesOrg,
        DISTR_CHAN: orderData.distributionChannel,
        DIVISION: orderData.division,
        PURCH_NO_C: orderData.purchaseOrderNumber,
      },
      ORDER_ITEMS_IN: orderData.items,
    });
  }

  async getInventoryData() {
    return this.callFunction('BAPI_MATERIAL_STOCK_REQ_LIST', {
      MATERIAL: '',
      PLANT: '',
    });
  }

  async testConnection() {
    return this.callFunction('STFC_CONNECTION', {});
  }

  disconnect() {
    if (this.client) {
      this.client.close();
      console.log('SAP connection closed');
    }
  }
}

export const sapIntegration = new SAPIntegration();