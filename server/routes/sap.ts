
import express from 'express';
import { sapService } from '../services/SAPIntegration';
import { authenticateToken } from '../utils/auth';

const router = express.Router();

router.get('/sales', authenticateToken, async (req, res) => {
  try {
    const salesData = await sapService.getSalesData();
    res.json(salesData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch SAP sales data' });
  }
});

router.post('/sales-order', authenticateToken, async (req, res) => {
  try {
    const orderData = req.body;
    const result = await sapService.createSalesOrder(orderData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create SAP sales order' });
  }
});

router.get('/inventory', authenticateToken, async (req, res) => {
  try {
    const inventoryData = await sapService.getInventoryData();
    res.json(inventoryData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch SAP inventory data' });
  }
});

router.get('/test-connection', authenticateToken, async (req, res) => {
  try {
    const result = await sapService.testConnection();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to test SAP connection' });
  }
});

export default router;
