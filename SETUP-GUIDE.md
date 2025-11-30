# 📋 Complete Setup Guide

## Prerequisites Checklist

Before you begin, make sure you have:

- [ ] Shopify Partner account ([Sign up here](https://partners.shopify.com/))
- [ ] Shopify development store or live store
- [ ] Railway account ([Sign up here](https://railway.app))
- [ ] GitHub account (for Railway deployment)
- [ ] Basic understanding of Shopify apps

## Part 1: Create Shopify App (15 minutes)

### Step 1: Access Shopify Partners

1. Go to [partners.shopify.com](https://partners.shopify.com/)
2. Log in or create an account
3. Click **Apps** in the left sidebar
4. Click **Create app**

### Step 2: Create App

1. Select **Create app manually**
2. Fill in the form:
   - **App name**: `Create Your Own Kit`
   - **App URL**: `https://temporary.com` (we'll update this later)
   - **Allowed redirection URL(s)**: `https://temporary.com/auth/callback`
3. Click **Create app**

### Step 3: Get API Credentials

1. In your new app, go to **Overview**
2. Find and copy:
   - **API key** (starts with letters/numbers)
   - **API secret key** (click "Show" to reveal)
3. Save these somewhere safe - you'll need them soon!

### Step 4: Configure Scopes

1. Click **Configuration** in the left menu
2. Scroll to **Admin API access scopes**
3. Select these scopes:
   - ✅ `write_products` - Create and update products
   - ✅ `read_products` - Read product data
   - ✅ `write_orders` - Create orders
   - ✅ `read_orders` - Read order data
   - ✅ `write_script_tags` - Add scripts to storefront
   - ✅ `read_script_tags` - Read script tags
4. Click **Save**

## Part 2: Deploy to Railway (20 minutes)

### Step 1: Prepare Your Code

1. **Push to GitHub** (if not already):
   ```bash
   cd "f:\NUT CREATE YOUR OWN KIT\CascadeProjects\windsurf-project"
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

### Step 2: Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Click **Login** → Sign in with GitHub
3. Click **New Project**
4. Select **Deploy from GitHub repo**
5. Authorize Railway to access your GitHub
6. Select your repository
7. Click **Deploy Now**

### Step 3: Add Database

1. In your Railway project, click **New**
2. Select **Database**
3. Choose **Add PostgreSQL**
4. Wait for database to provision (~30 seconds)

### Step 4: Configure Environment Variables

1. Click on your **app service** (not the database)
2. Click **Variables** tab
3. Click **Raw Editor**
4. Paste this (replace with your actual values):

```
SHOPIFY_API_KEY=your_api_key_from_shopify
SHOPIFY_API_SECRET=your_api_secret_from_shopify
SHOPIFY_SCOPES=write_products,read_products,write_orders,read_orders,write_script_tags,read_script_tags
SESSION_SECRET=create_a_random_string_here_min_32_chars
NODE_ENV=production
```

5. Click **Update Variables**

### Step 5: Generate Domain

1. Still in your app service, click **Settings**
2. Scroll to **Domains**
3. Click **Generate Domain**
4. Copy your domain (e.g., `your-app-name.up.railway.app`)

### Step 6: Add App URL Variable

1. Go back to **Variables** tab
2. Click **New Variable**
3. Add:
   - **Variable**: `SHOPIFY_APP_URL`
   - **Value**: `https://your-app-name.up.railway.app` (use your actual domain)
4. Click **Add**

### Step 7: Wait for Deployment

1. Click **Deployments** tab
2. Watch the build logs
3. Wait for "✓ Success" (takes 2-3 minutes)
4. Your app is now live!

## Part 3: Update Shopify App Settings (5 minutes)

### Step 1: Update URLs

1. Go back to [Shopify Partners](https://partners.shopify.com/)
2. Click on your app
3. Click **Configuration**
4. Update these fields:
   - **App URL**: `https://your-app-name.up.railway.app`
   - **Allowed redirection URL(s)**: `https://your-app-name.up.railway.app/auth/callback`
5. Click **Save**

### Step 2: Set Up Distribution (Optional)

1. In **Configuration**, scroll to **Distribution**
2. For testing: Keep as **Development store**
3. For production: Select **Public distribution** and fill requirements

## Part 4: Install App to Store (5 minutes)

### Step 1: Get Installation Link

Create this URL (replace placeholders):
```
https://your-app-name.up.railway.app/auth/install?shop=your-store.myshopify.com
```

Example:
```
https://kit-builder-app.up.railway.app/auth/install?shop=my-test-store.myshopify.com
```

### Step 2: Install

1. Open the installation URL in your browser
2. You'll be redirected to Shopify
3. Review the permissions
4. Click **Install app**
5. You'll be redirected back to your app

### Step 3: Verify Installation

1. Go to your Shopify Admin
2. Click **Apps** in the left sidebar
3. You should see "Create Your Own Kit" listed

## Part 5: Create Your First Kit (10 minutes)

### Step 1: Access Admin Panel

Go to: `https://your-app-name.up.railway.app/admin.html?shop=your-store.myshopify.com`

### Step 2: Create Kit

1. Click **Create New Kit**
2. Fill in the form:

**Basic Info:**
- **Kit Title**: "Build Your Perfect Bundle"
- **Description**: "Choose your favorite products and save!"

**Product Selection:**
- **Min Products**: 4
- **Max Products**: 10 (optional)

**Discount Settings:**
- **Discount Type**: Percentage
- **Discount Value**: 15

**Customization:**
- **Custom Message**: "Choose 4 or more products and save 15%!"
- **Button Text**: "Add Bundle to Cart"
- **Button Color**: #000000 (black)
- **Button Text Color**: #FFFFFF (white)

**Display Options:**
- ✅ Show product images
- ✅ Show product prices
- ✅ Active
- **Layout Style**: Grid

3. Click **Save Kit**
4. **Copy the Kit ID** from the URL or kit card (you'll need this!)

## Part 6: Add to Storefront (15 minutes)

### Method 1: Theme Customizer (Easiest)

1. **Go to Shopify Admin**
   - Click **Online Store** → **Themes**
   - Click **Customize** on your active theme

2. **Add Section**
   - Navigate to the page where you want the kit builder
   - Click **Add section**
   - Choose **Custom Liquid** or **Custom HTML**

3. **Add Code**
   Paste this code (replace `YOUR_KIT_ID` and `your-app-name`):
   ```html
   <div id="kit-builder" data-kit-id="YOUR_KIT_ID"></div>
   <script src="https://your-app-name.up.railway.app/kit-builder.js"></script>
   ```

4. **Save**
   - Click **Save** in the top right
   - Click **Preview** to test

### Method 2: Create Dedicated Page

1. **Create New Page**
   - Go to **Online Store** → **Pages**
   - Click **Add page**
   - Title: "Build Your Kit"

2. **Add HTML**
   - Click **Show HTML** (< > button)
   - Paste:
   ```html
   <div style="max-width: 1200px; margin: 0 auto; padding: 20px;">
     <h1>Create Your Perfect Kit</h1>
     <p>Choose your favorite products and save!</p>
     <div id="kit-builder" data-kit-id="YOUR_KIT_ID"></div>
     <script src="https://your-app-name.up.railway.app/kit-builder.js"></script>
   </div>
   ```

3. **Save and View**
   - Click **Save**
   - Click **View page** to test

### Method 3: Add to Product Page

1. **Edit Theme Code**
   - Go to **Online Store** → **Themes**
   - Click **Actions** → **Edit code**

2. **Find Template**
   - Open `templates/product.liquid` or `sections/product-template.liquid`

3. **Add Code**
   Add before `</div>` at the end:
   ```liquid
   {% if product.handle == 'custom-kit' %}
     <div id="kit-builder" data-kit-id="YOUR_KIT_ID"></div>
     <script src="https://your-app-name.up.railway.app/kit-builder.js"></script>
   {% endif %}
   ```

4. **Save**

## Part 7: Test Everything (10 minutes)

### Test Checklist

1. **Admin Panel**
   - [ ] Can create new kits
   - [ ] Can edit existing kits
   - [ ] Can delete kits
   - [ ] Settings save correctly

2. **Storefront Widget**
   - [ ] Widget loads on page
   - [ ] Products display correctly
   - [ ] Can select products
   - [ ] Progress bar updates
   - [ ] Discount calculates correctly
   - [ ] Add to cart works

3. **Mobile Testing**
   - [ ] Widget responsive on mobile
   - [ ] Easy to select products
   - [ ] Button accessible

## Troubleshooting

### Common Issues

**Issue**: "App won't install"
- ✅ Check API credentials are correct
- ✅ Verify redirect URL matches exactly
- ✅ Ensure scopes are configured

**Issue**: "Widget doesn't show"
- ✅ Check kit ID is correct
- ✅ Verify kit is set to "Active"
- ✅ Check browser console for errors
- ✅ Verify script URL is correct

**Issue**: "Database errors"
- ✅ Check Railway logs
- ✅ Run: `railway run npx prisma migrate deploy`
- ✅ Verify DATABASE_URL is set

**Issue**: "Can't access admin panel"
- ✅ Include `?shop=your-store.myshopify.com` in URL
- ✅ Verify app is installed
- ✅ Check Railway app is running

## Next Steps

Now that your app is set up:

1. **Customize Your Kits**
   - Create multiple kits for different products
   - Test different discount strategies
   - Experiment with layouts and colors

2. **Monitor Performance**
   - Check Railway logs for errors
   - Monitor kit usage in admin panel
   - Track orders in Shopify

3. **Optimize**
   - Add more products to kits
   - Adjust discounts based on performance
   - Customize styling to match your brand

## Getting Help

- **Railway Issues**: [railway.app/help](https://railway.app/help)
- **Shopify Issues**: [shopify.dev/docs](https://shopify.dev/docs)
- **App Documentation**: See README.md

## Success! 🎉

Your "Create Your Own Kit" app is now:
- ✅ Deployed to Railway
- ✅ Installed on Shopify
- ✅ Ready for customers

Start creating amazing product bundles and watch your sales grow!
