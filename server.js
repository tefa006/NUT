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
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .container {
            background: white;
            max-width: 900px;
            width: 100%;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
          }
          .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            font-weight: 700;
          }
          .header p {
            font-size: 1.1em;
            opacity: 0.95;
          }
          .content {
            padding: 40px;
          }
          .status-badge {
            display: inline-flex;
            align-items: center;
            background: #10b981;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 600;
            margin-bottom: 30px;
          }
          .status-badge::before {
            content: '●';
            margin-right: 8px;
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 30px 0;
          }
          .feature-card {
            background: #f8fafc;
            padding: 20px;
            border-radius: 12px;
            border-left: 4px solid #667eea;
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          }
          .feature-card h3 {
            color: #667eea;
            margin-bottom: 10px;
            font-size: 1.1em;
          }
          .feature-card p {
            color: #64748b;
            font-size: 0.95em;
            line-height: 1.6;
          }
          .footer {
            background: #f8fafc;
            padding: 30px 40px;
            border-top: 1px solid #e2e8f0;
          }
          .branding {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
          }
          .branding-info {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }
          .branding-info strong {
            color: #1e293b;
            font-size: 1.1em;
          }
          .branding-info span {
            color: #64748b;
            font-size: 0.9em;
          }
          .contact-info {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
          }
          .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #64748b;
            font-size: 0.9em;
          }
          .contact-item a {
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
          }
          .contact-item a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎁 Create Your Own Kit</h1>
            <p>Premium Bundle Builder for Shopify</p>
          </div>
          
          <div class="content">
            <div class="status-badge">App Running</div>
            
            <h2 style="color: #1e293b; margin-bottom: 20px;">Powerful Features</h2>
            
            <div class="features">
              <div class="feature-card">
                <h3>📦 Flexible Bundles</h3>
                <p>Set minimum/maximum products per kit with smart rules</p>
              </div>
              
              <div class="feature-card">
                <h3>💰 Smart Discounts</h3>
                <p>Percentage, fixed price, or tiered discount strategies</p>
              </div>
              
              <div class="feature-card">
                <h3>🎨 Full Customization</h3>
                <p>Customize colors, messages, buttons, and layouts</p>
              </div>
              
              <div class="feature-card">
                <h3>🎁 Gift Options</h3>
                <p>Add gift boxes, greeting cards, and custom messages</p>
              </div>
              
              <div class="feature-card">
                <h3>📊 Analytics Ready</h3>
                <p>Track kit performance and customer behavior</p>
              </div>
              
              <div class="feature-card">
                <h3>🚀 Lightning Fast</h3>
                <p>Optimized for speed and mobile responsiveness</p>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <div class="branding">
              <div class="branding-info">
                <strong>Developed by Mostafa Magdy</strong>
                <span>ZenithWeave Agency</span>
              </div>
              
              <div class="contact-info">
                <div class="contact-item">
                  📧 <a href="mailto:hi@zenithweave.com">hi@zenithweave.com</a>
                </div>
                <div class="contact-item">
                  📱 <a href="tel:+201011400020">+201011400020</a>
                </div>
              </div>
            </div>
          </div>
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
