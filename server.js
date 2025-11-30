import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// Shopify API configuration
const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SHOPIFY_SCOPES?.split(',') || [],
  hostName: process.env.SHOPIFY_APP_URL?.replace(/https?:\/\//, '') || 'localhost',
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: true,
  isCustomStoreApp: false,
});

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

// Routes
import authRoutes from './routes/auth.js';
import kitRoutes from './routes/kits.js';
import webhookRoutes from './routes/webhooks.js';
import storefrontRoutes from './routes/storefront.js';

app.use('/auth', authRoutes(shopify, prisma));
app.use('/api/kits', kitRoutes(shopify, prisma));
app.use('/webhooks', webhookRoutes(shopify, prisma));
app.use('/storefront', storefrontRoutes(prisma));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Create Your Own Kit - Shopify App</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
          h1 { color: #5C6AC4; }
          .info { background: #f4f6f8; padding: 20px; border-radius: 8px; }
        </style>
      </head>
      <body>
        <h1>🎁 Create Your Own Kit - Shopify App</h1>
        <div class="info">
          <h2>Welcome!</h2>
          <p>This app allows your customers to create custom product kits with automatic discounts.</p>
          <h3>Features:</h3>
          <ul>
            <li>Set minimum/maximum products per kit</li>
            <li>Configure percentage or fixed discounts</li>
            <li>Customize buttons, messages, and colors</li>
            <li>Choose from specific collections or products</li>
            <li>Beautiful storefront integration</li>
          </ul>
          <p><strong>Status:</strong> Running ✓</p>
        </div>
      </body>
    </html>
  `);
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Create Your Own Kit app running on port ${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export { shopify, prisma };
