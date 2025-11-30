import express from 'express';

export default function storefrontRoutes(prisma) {
  const router = express.Router();

  // Get active kits for storefront (public endpoint)
  router.get('/kits', async (req, res) => {
    try {
      const { shop } = req.query;

      if (!shop) {
        return res.status(400).json({ error: 'Shop parameter required' });
      }

      const shopData = await prisma.shop.findUnique({
        where: { shopDomain: shop },
        include: {
          kits: {
            where: { isActive: true },
          },
        },
      });

      if (!shopData) {
        return res.status(404).json({ error: 'Shop not found' });
      }

      res.json({ kits: shopData.kits });
    } catch (error) {
      console.error('Storefront kits error:', error);
      res.status(500).json({ error: 'Failed to fetch kits' });
    }
  });

  // Get specific kit configuration
  router.get('/kits/:id', async (req, res) => {
    try {
      const { shop } = req.query;

      if (!shop) {
        return res.status(400).json({ error: 'Shop parameter required' });
      }

      const kit = await prisma.kit.findFirst({
        where: {
          id: req.params.id,
          isActive: true,
          shop: { shopDomain: shop },
        },
      });

      if (!kit) {
        return res.status(404).json({ error: 'Kit not found' });
      }

      res.json({ kit });
    } catch (error) {
      console.error('Storefront kit error:', error);
      res.status(500).json({ error: 'Failed to fetch kit' });
    }
  });

  // Track kit order
  router.post('/orders', async (req, res) => {
    try {
      const { shopDomain, kitId, orderId, selectedProducts, totalPrice, discountApplied, finalPrice } = req.body;

      const kitOrder = await prisma.kitOrder.create({
        data: {
          shopDomain,
          kitId,
          orderId,
          selectedProducts,
          totalPrice,
          discountApplied,
          finalPrice,
        },
      });

      res.status(201).json({ success: true, order: kitOrder });
    } catch (error) {
      console.error('Track order error:', error);
      res.status(500).json({ error: 'Failed to track order' });
    }
  });

  return router;
}
