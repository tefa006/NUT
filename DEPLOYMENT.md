# 🚀 Deployment Guide - Railway

This guide will walk you through deploying your "Create Your Own Kit" Shopify app to Railway.

## Step-by-Step Deployment

### 1. Create Shopify App (Do This First!)

1. Go to [Shopify Partners Dashboard](https://partners.shopify.com/)
2. Click **Apps** → **Create App** → **Create app manually**
3. Fill in:
   - **App name**: Create Your Own Kit
   - **App URL**: `https://temporary-url.railway.app` (we'll update this)
   - **Allowed redirection URL(s)**: `https://temporary-url.railway.app/auth/callback`

4. After creation, note down:
   - **API key**
   - **API secret key**

5. Configure API scopes:
   - Go to **Configuration** → **API access scopes**
   - Select these scopes:
     - `write_products`
     - `read_products`
     - `write_orders`
     - `read_orders`
     - `write_script_tags`
     - `read_script_tags`

### 2. Deploy to Railway

#### Option A: Using Railway Dashboard (Recommended)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click **New Project**
   - Select **Deploy from GitHub repo**
   - Connect your GitHub account
   - Select this repository

3. **Add PostgreSQL Database**
   - In your project, click **New**
   - Select **Database** → **Add PostgreSQL**
   - Railway will automatically create a database

4. **Set Environment Variables**
   - Click on your service
   - Go to **Variables** tab
   - Add these variables:

   ```
   SHOPIFY_API_KEY=your_api_key_from_step_1
   SHOPIFY_API_SECRET=your_api_secret_from_step_1
   SHOPIFY_SCOPES=write_products,read_products,write_orders,read_orders,write_script_tags,read_script_tags
   SESSION_SECRET=generate_a_random_string_here
   NODE_ENV=production
   ```

   Note: `DATABASE_URL` is automatically set by Railway when you add PostgreSQL

5. **Deploy**
   - Railway will automatically deploy your app
   - Wait for deployment to complete (2-3 minutes)

6. **Get Your App URL**
   - Click **Settings** → **Domains**
   - Click **Generate Domain**
   - Copy your Railway URL (e.g., `your-app-name.up.railway.app`)

7. **Update Environment Variables**
   - Go back to **Variables**
   - Add: `SHOPIFY_APP_URL=https://your-app-name.up.railway.app`

8. **Update Shopify App Settings**
   - Go back to Shopify Partners Dashboard
   - Update **App URL** to: `https://your-app-name.up.railway.app`
   - Update **Allowed redirection URL(s)** to: `https://your-app-name.up.railway.app/auth/callback`

#### Option B: Using Railway CLI

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   cd "f:\NUT CREATE YOUR OWN KIT\CascadeProjects\windsurf-project"
   railway init
   ```

4. **Add PostgreSQL**
   ```bash
   railway add --database postgresql
   ```

5. **Set Variables**
   ```bash
   railway variables set SHOPIFY_API_KEY=your_key
   railway variables set SHOPIFY_API_SECRET=your_secret
   railway variables set SHOPIFY_SCOPES=write_products,read_products,write_orders,read_orders,write_script_tags,read_script_tags
   railway variables set SESSION_SECRET=your_random_secret
   railway variables set NODE_ENV=production
   ```

6. **Deploy**
   ```bash
   railway up
   ```

7. **Get Domain**
   ```bash
   railway domain
   ```

8. **Set App URL**
   ```bash
   railway variables set SHOPIFY_APP_URL=https://your-domain.railway.app
   ```

### 3. Install App to Your Shopify Store

1. **Get Installation URL**
   - Format: `https://your-app.railway.app/auth/install?shop=your-store.myshopify.com`
   - Replace `your-store` with your actual store name

2. **Install**
   - Visit the installation URL in your browser
   - Click **Install app**
   - Approve the permissions

3. **Access Admin Panel**
   - After installation, go to: `https://your-app.railway.app/admin.html?shop=your-store.myshopify.com`

### 4. Create Your First Kit

1. In the admin panel, click **Create New Kit**
2. Configure:
   - **Title**: "Build Your Perfect Bundle"
   - **Min Products**: 4
   - **Discount Type**: Percentage
   - **Discount Value**: 15
   - **Custom Message**: "Choose 4 or more products and save 15%!"
   - **Button Text**: "Add Bundle to Cart"
3. Click **Save Kit**
4. Copy the Kit ID from the URL or kit card

### 5. Add to Your Storefront

1. **Edit Theme**
   - Go to Shopify Admin → **Online Store** → **Themes**
   - Click **Customize** on your active theme

2. **Add Custom HTML**
   - Add a new section or edit an existing page
   - Add a **Custom HTML** block
   - Paste this code:

   ```html
   <div id="kit-builder" data-kit-id="YOUR_KIT_ID_HERE"></div>
   <script src="https://your-app.railway.app/kit-builder.js"></script>
   ```

3. **Replace Placeholders**
   - Replace `YOUR_KIT_ID_HERE` with your actual kit ID
   - Replace `your-app.railway.app` with your Railway domain

4. **Save and Preview**

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `SHOPIFY_API_KEY` | From Shopify Partners | `abc123def456` |
| `SHOPIFY_API_SECRET` | From Shopify Partners | `shpss_xyz789` |
| `SHOPIFY_SCOPES` | Required permissions | `write_products,read_products,...` |
| `SHOPIFY_APP_URL` | Your Railway URL | `https://your-app.railway.app` |
| `DATABASE_URL` | Auto-set by Railway | `postgresql://...` |
| `SESSION_SECRET` | Random string for sessions | `your-random-secret-123` |
| `NODE_ENV` | Environment | `production` |
| `PORT` | Auto-set by Railway | `3000` |

## Troubleshooting

### App Won't Install

**Problem**: Error when clicking install
**Solution**: 
- Verify Shopify API credentials are correct
- Check that redirect URL matches exactly
- Ensure app is approved in Shopify Partners

### Database Errors

**Problem**: "Cannot connect to database"
**Solution**:
```bash
railway run npx prisma migrate deploy
```

### Widget Not Showing

**Problem**: Kit builder doesn't appear on storefront
**Solution**:
- Check kit ID is correct
- Verify kit is set to "Active"
- Check browser console for errors
- Ensure script URL is correct

### Railway Deployment Failed

**Problem**: Build or deployment errors
**Solution**:
- Check Railway logs: Click on deployment → View logs
- Verify all environment variables are set
- Ensure PostgreSQL database is connected

## Updating Your App

### Push Updates

1. Make changes to your code
2. Commit to GitHub:
   ```bash
   git add .
   git commit -m "Update description"
   git push
   ```
3. Railway will automatically redeploy

### Manual Redeploy

In Railway dashboard:
1. Click on your service
2. Click **Deployments**
3. Click **Deploy** on the latest commit

## Monitoring

### View Logs

**Railway Dashboard**:
- Click on your service
- Click **Deployments**
- Click on active deployment
- View real-time logs

**CLI**:
```bash
railway logs
```

### Database Access

**View data**:
```bash
railway run npx prisma studio
```

**Run migrations**:
```bash
railway run npx prisma migrate deploy
```

## Scaling

Railway automatically scales based on usage. For high traffic:

1. Go to **Settings** → **Resources**
2. Upgrade plan if needed
3. Monitor usage in dashboard

## Security Checklist

- ✅ Never commit `.env` file
- ✅ Use strong `SESSION_SECRET`
- ✅ Keep Shopify API credentials secure
- ✅ Regularly update dependencies
- ✅ Monitor Railway logs for suspicious activity

## Support

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Shopify Docs**: [shopify.dev](https://shopify.dev)
- **App Issues**: Check GitHub issues

## Next Steps

1. ✅ Deploy to Railway
2. ✅ Install to Shopify store
3. ✅ Create your first kit
4. ✅ Add to storefront
5. 🎉 Start selling bundles!

---

**Need Help?** Check the main README.md for API documentation and customization options.
