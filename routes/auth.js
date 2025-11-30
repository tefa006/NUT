import express from 'express';

export default function authRoutes(shopify, prisma) {
  const router = express.Router();

  // OAuth callback
  router.get('/callback', async (req, res) => {
    try {
      const { shop, code, state, host } = req.query;

      if (!shop || !code) {
        return res.status(400).send('Missing shop or code parameter');
      }

      // Exchange code for access token
      const session = await shopify.auth.callback({
        rawRequest: req,
        rawResponse: res,
      });

      // Store shop data
      await prisma.shop.upsert({
        where: { shopDomain: session.shop },
        update: {
          accessToken: session.accessToken,
          isActive: true,
          updatedAt: new Date(),
        },
        create: {
          shopDomain: session.shop,
          accessToken: session.accessToken,
          isActive: true,
        },
      });

      // Redirect to app
      const redirectUrl = `https://${shop}/admin/apps/${process.env.SHOPIFY_API_KEY}`;
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('Auth callback error:', error);
      res.status(500).send('Authentication failed');
    }
  });

  // Install/Auth start
  router.get('/install', async (req, res) => {
    try {
      const { shop } = req.query;

      if (!shop) {
        return res.status(400).send('Missing shop parameter');
      }

      const authRoute = await shopify.auth.begin({
        shop: shopify.utils.sanitizeShop(shop, true),
        callbackPath: '/auth/callback',
        isOnline: false,
        rawRequest: req,
        rawResponse: res,
      });

      res.redirect(authRoute);
    } catch (error) {
      console.error('Install error:', error);
      res.status(500).send('Installation failed');
    }
  });

  return router;
}
