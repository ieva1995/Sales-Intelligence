
import { RFC } from 'node-rfc';
import { encrypt, decrypt } from '../utils/encryption';

export class SAPIntegrationService {
  private client: RFC.Client | null = null;
  private connectionParams: RFC.ConnectionParameters;

  constructor() {
    this.connectionParams = {
      ashost: process.env.SAP_HOST || '',
      sysnr: process.env.SAP_SYSTEM_NUMBER || '00',
      client: process.env.SAP_CLIENT || '100',
      user: process.env.SAP_USER || '',
      passwd: process.env.SAP_PASSWORD || '',
    };
  }

  async connect() {
    try {
      this.client = new RFC.Client(this.connectionParams);
      await this.client.open();
      console.log('SAP connection established');
      return true;
    } catch (error) {
      console.error('SAP connection failed:', error);
      return false;
    }
  }

  async getSalesData() {
    if (!this.client) {
      await this.connect();
    }
    
    try {
      const result = await this.client?.call('BAPI_SALESORDER_GETLIST', {
        CUSTOMER_NUMBER: '',
        SALES_ORGANIZATION: '',
        MATERIAL: '',
      });
      
      return result;
    } catch (error) {
      console.error('Error fetching SAP sales data:', error);
      throw error;
    }
  }

  async createSalesOrder(orderData: any) {
    if (!this.client) {
      await this.connect();
    }

    try {
      const result = await this.client?.call('BAPI_SALESORDER_CREATEFROMDAT2', {
        ORDER_HEADER_IN: {
          DOC_TYPE: 'TA',
          SALES_ORG: orderData.salesOrg,
          DISTR_CHAN: orderData.distributionChannel,
          DIVISION: orderData.division,
          PURCH_NO_C: orderData.purchaseOrderNumber,
        },
        ORDER_ITEMS_IN: orderData.items,
      });

      return result;
    } catch (error) {
      console.error('Error creating SAP sales order:', error);
      throw error;
    }
  }

  async getInventoryData() {
    if (!this.client) {
      await this.connect();
    }

    try {
      const result = await this.client?.call('BAPI_MATERIAL_STOCK_REQ_LIST', {
        MATERIAL: '',
        PLANT: '',
      });

      return result;
    } catch (error) {
      console.error('Error fetching SAP inventory data:', error);
      throw error;
    }
  }

  disconnect() {
    if (this.client) {
      this.client.close();
      console.log('SAP connection closed');
    }
  }
}

export const sapService = new SAPIntegrationService();
