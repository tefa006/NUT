import express from 'express';

export default function kitRoutes(shopify, prisma) {
  const router = express.Router();

  // Middleware to verify shop
  const verifyShop = async (req, res, next) => {
    const shop = req.headers['x-shopify-shop-domain'];
    if (!shop) {
      return res.status(401).json({ error: 'Shop domain required' });
    }
    req.shop = shop;
    next();
  };

  router.use(verifyShop);

  // Get all kits for a shop
  router.get('/', async (req, res) => {
    try {
      const shop = await prisma.shop.findUnique({
        where: { shopDomain: req.shop },
        include: { kits: true },
      });

      if (!shop) {
        return res.status(404).json({ error: 'Shop not found' });
      }

      res.json({ kits: shop.kits });
    } catch (error) {
      console.error('Get kits error:', error);
      res.status(500).json({ error: 'Failed to fetch kits' });
    }
  });

  // Get single kit
  router.get('/:id', async (req, res) => {
    try {
      const kit = await prisma.kit.findFirst({
        where: {
          id: req.params.id,
          shop: { shopDomain: req.shop },
        },
      });

      if (!kit) {
        return res.status(404).json({ error: 'Kit not found' });
      }

      res.json({ kit });
    } catch (error) {
      console.error('Get kit error:', error);
      res.status(500).json({ error: 'Failed to fetch kit' });
    }
  });

  // Create new kit
  router.post('/', async (req, res) => {
    try {
      const shop = await prisma.shop.findUnique({
        where: { shopDomain: req.shop },
      });

      if (!shop) {
        return res.status(404).json({ error: 'Shop not found' });
      }

      const kit = await prisma.kit.create({
        data: {
          shopId: shop.id,
          title: req.body.title || 'Create Your Own Kit',
          description: req.body.description,
          minProducts: req.body.minProducts || 4,
          maxProducts: req.body.maxProducts,
          allowedCollections: req.body.allowedCollections || [],
          allowedProducts: req.body.allowedProducts || [],
          discountType: req.body.discountType || 'percentage',
          discountValue: req.body.discountValue || 0,
          customMessage: req.body.customMessage,
          buttonText: req.body.buttonText || 'Add to Cart',
          buttonColor: req.body.buttonColor || '#000000',
          buttonTextColor: req.body.buttonTextColor || '#FFFFFF',
          showProductImages: req.body.showProductImages !== false,
          showProductPrices: req.body.showProductPrices !== false,
          layoutStyle: req.body.layoutStyle || 'grid',
          isActive: req.body.isActive !== false,
        },
      });

      res.status(201).json({ kit });
    } catch (error) {
      console.error('Create kit error:', error);
      res.status(500).json({ error: 'Failed to create kit' });
    }
  });

  // Update kit
  router.put('/:id', async (req, res) => {
    try {
      const kit = await prisma.kit.findFirst({
        where: {
          id: req.params.id,
          shop: { shopDomain: req.shop },
        },
      });

      if (!kit) {
        return res.status(404).json({ error: 'Kit not found' });
      }

      const updatedKit = await prisma.kit.update({
        where: { id: req.params.id },
        data: {
          title: req.body.title,
          description: req.body.description,
          minProducts: req.body.minProducts,
          maxProducts: req.body.maxProducts,
          allowedCollections: req.body.allowedCollections,
          allowedProducts: req.body.allowedProducts,
          discountType: req.body.discountType,
          discountValue: req.body.discountValue,
          customMessage: req.body.customMessage,
          buttonText: req.body.buttonText,
          buttonColor: req.body.buttonColor,
          buttonTextColor: req.body.buttonTextColor,
          showProductImages: req.body.showProductImages,
          showProductPrices: req.body.showProductPrices,
          layoutStyle: req.body.layoutStyle,
          isActive: req.body.isActive,
        },
      });

      res.json({ kit: updatedKit });
    } catch (error) {
      console.error('Update kit error:', error);
      res.status(500).json({ error: 'Failed to update kit' });
    }
  });

  // Delete kit
  router.delete('/:id', async (req, res) => {
    try {
      const kit = await prisma.kit.findFirst({
        where: {
          id: req.params.id,
          shop: { shopDomain: req.shop },
        },
      });

      if (!kit) {
        return res.status(404).json({ error: 'Kit not found' });
      }

      await prisma.kit.delete({
        where: { id: req.params.id },
      });

      res.json({ success: true });
    } catch (error) {
      console.error('Delete kit error:', error);
      res.status(500).json({ error: 'Failed to delete kit' });
    }
  });

  return router;
}
