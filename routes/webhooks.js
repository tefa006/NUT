import express from 'express';

export default function webhookRoutes(shopify, prisma) {
  const router = express.Router();

  // App uninstalled webhook
  router.post('/app/uninstalled', async (req, res) => {
    try {
      const shop = req.headers['x-shopify-shop-domain'];
      
      if (shop) {
        await prisma.shop.update({
          where: { shopDomain: shop },
          data: { isActive: false },
        });
        console.log(`App uninstalled from ${shop}`);
      }

      res.status(200).send('OK');
    } catch (error) {
      console.error('Uninstall webhook error:', error);
      res.status(500).send('Error');
    }
  });

  // Order created webhook (for tracking kit orders)
  router.post('/orders/create', async (req, res) => {
    try {
      const shop = req.headers['x-shopify-shop-domain'];
      const order = req.body;

      // Check if order contains kit products
      // You can add custom logic here to track kit orders

      res.status(200).send('OK');
    } catch (error) {
      console.error('Order webhook error:', error);
      res.status(500).send('Error');
    }
  });

  return router;
}
