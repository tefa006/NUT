# 🎁 Create Your Own Kit - Shopify App

A powerful Shopify app that allows customers to create custom product kits with automatic discounts. Perfect for bundle sales, gift sets, and personalized product combinations.

## Features

- ✅ **Flexible Kit Configuration**: Set minimum/maximum products per kit
- 💰 **Automatic Discounts**: Percentage or fixed amount discounts
- 🎨 **Full Customization**: Custom messages, button colors, and layouts
- 📦 **Product Selection**: Choose from specific collections or products
- 📊 **Order Tracking**: Track kit orders and analytics
- 🚀 **Easy Integration**: Simple storefront widget integration
- ☁️ **Railway Ready**: One-click deployment to Railway

## Quick Start

### 1. Prerequisites

- Node.js 18+ installed
- PostgreSQL database (Railway provides this)
- Shopify Partner account
- Railway account

### 2. Create Shopify App

1. Go to [Shopify Partners](https://partners.shopify.com/)
2. Create a new app
3. Note your API Key and API Secret
4. Set App URL to your Railway URL (you'll get this after deployment)
5. Set Redirect URL to: `https://your-railway-url.railway.app/auth/callback`
6. Request these scopes:
   - `write_products`
   - `read_products`
   - `write_orders`
   - `read_orders`
   - `write_script_tags`
   - `read_script_tags`

### 3. Deploy to Railway

#### Option A: Deploy Button (Easiest)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new)

#### Option B: Manual Deployment

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login to Railway:
   ```bash
   railway login
   ```

3. Initialize project:
   ```bash
   railway init
   ```

4. Add PostgreSQL database:
   ```bash
   railway add --database postgresql
   ```

5. Set environment variables:
   ```bash
   railway variables set SHOPIFY_API_KEY=your_api_key
   railway variables set SHOPIFY_API_SECRET=your_api_secret
   railway variables set SHOPIFY_SCOPES=write_products,read_products,write_orders,read_orders,write_script_tags,read_script_tags
   railway variables set SESSION_SECRET=your_random_secret_here
   ```

6. Deploy:
   ```bash
   railway up
   ```

7. Get your Railway URL:
   ```bash
   railway domain
   ```

### 4. Configure Environment Variables

Create a `.env` file (or set in Railway dashboard):

```env
SHOPIFY_API_KEY=your_api_key_here
SHOPIFY_API_SECRET=your_api_secret_here
SHOPIFY_SCOPES=write_products,read_products,write_orders,read_orders,write_script_tags,read_script_tags
SHOPIFY_APP_URL=https://your-app.railway.app
SHOPIFY_HOST=your-shop.myshopify.com
DATABASE_URL=postgresql://user:password@host:port/database
PORT=3000
SESSION_SECRET=your_session_secret_here
```

### 5. Install App to Shopify Store

1. Go to: `https://your-app.railway.app/auth/install?shop=your-store.myshopify.com`
2. Approve the app installation
3. You'll be redirected to the admin panel

## Usage

### Admin Panel

Access the admin panel at: `https://your-app.railway.app/admin.html?shop=your-store.myshopify.com`

**Create a Kit:**
1. Click "Create New Kit"
2. Configure settings:
   - **Title**: Name of your kit
   - **Min/Max Products**: How many products customers must/can select
   - **Discount**: Set percentage or fixed discount
   - **Customization**: Messages, button text, colors
   - **Display**: Layout and visibility options
3. Save the kit

### Storefront Integration

Add the kit builder to any page in your Shopify theme:

```html
<!-- Add this where you want the kit builder to appear -->
<div id="kit-builder" data-kit-id="YOUR_KIT_ID"></div>

<!-- Add this script tag -->
<script src="https://your-app.railway.app/kit-builder.js"></script>
```

**Get Kit ID:**
- Find it in the admin panel after creating a kit
- Or use the API: `GET /api/kits`

## API Reference

### Admin Endpoints

**Get All Kits**
```
GET /api/kits
Headers: X-Shopify-Shop-Domain: your-store.myshopify.com
```

**Create Kit**
```
POST /api/kits
Headers: X-Shopify-Shop-Domain: your-store.myshopify.com
Body: {
  "title": "Build Your Bundle",
  "minProducts": 4,
  "discountType": "percentage",
  "discountValue": 15,
  ...
}
```

**Update Kit**
```
PUT /api/kits/:id
Headers: X-Shopify-Shop-Domain: your-store.myshopify.com
Body: { ... }
```

**Delete Kit**
```
DELETE /api/kits/:id
Headers: X-Shopify-Shop-Domain: your-store.myshopify.com
```

### Storefront Endpoints

**Get Active Kits**
```
GET /storefront/kits?shop=your-store.myshopify.com
```

**Get Kit Configuration**
```
GET /storefront/kits/:id?shop=your-store.myshopify.com
```

## Development

### Local Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up PostgreSQL database

4. Create `.env` file with your credentials

5. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

6. Start development server:
   ```bash
   npm run dev
   ```

### Database Migrations

Create new migration:
```bash
npx prisma migrate dev --name your_migration_name
```

Apply migrations:
```bash
npx prisma migrate deploy
```

## Customization

### Styling

The storefront widget includes inline styles but can be customized:

1. Modify `public/kit-builder.js`
2. Update the `<style>` section in the render method
3. Or add custom CSS in your theme

### Features

Add custom features by:
1. Updating the database schema in `prisma/schema.prisma`
2. Adding routes in `routes/` directory
3. Updating the admin UI in `public/admin.html`

## Troubleshooting

**App won't install:**
- Check your Shopify API credentials
- Verify redirect URL matches exactly
- Ensure Railway app is running

**Database errors:**
- Run migrations: `npx prisma migrate deploy`
- Check DATABASE_URL is correct
- Verify PostgreSQL is running

**Widget not showing:**
- Check kit ID is correct
- Verify kit is set to "Active"
- Check browser console for errors

## Support

For issues or questions:
1. Check the [documentation](https://github.com/your-repo)
2. Open an issue on GitHub
3. Contact support

## License

MIT License - feel free to use and modify for your needs.

## Credits

Built with:
- [Shopify API](https://shopify.dev/api)
- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Railway](https://railway.app/)
- [TailwindCSS](https://tailwindcss.com/)
