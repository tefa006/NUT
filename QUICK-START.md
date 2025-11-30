# ⚡ Quick Start Guide

## Step 1: Upload to GitHub (2 minutes)

### Option A: Using the Script (Easiest)
1. Double-click `upload-to-github.bat`
2. Wait for completion
3. Done! ✅

### Option B: Manual Commands
Open PowerShell in this folder and run:
```powershell
git init
git add .
git commit -m "Initial commit: Create Your Own Kit Shopify App"
git branch -M main
git remote add origin https://github.com/tefa006/NUT.git
git push -u origin main --force
```

**Note**: If you get an error about existing remote, run this first:
```powershell
git remote remove origin
```
Then try again.

---

## Step 2: Create Shopify App (5 minutes)

### What I Need From You:

1. **Go to Shopify Partners**
   - Visit: https://partners.shopify.com/
   - Login or create account

2. **Create New App**
   - Click **Apps** → **Create App** → **Create app manually**
   - App name: `Create Your Own Kit`
   - App URL: `https://temporary.com` (we'll update later)
   - Redirect URL: `https://temporary.com/auth/callback`

3. **Get Your Credentials**
   After creating the app, copy these:
   - ✅ **API Key**: (looks like: abc123def456)
   - ✅ **API Secret**: (click "Show" to reveal)
   
   **SAVE THESE - YOU'LL NEED THEM!**

4. **Set Scopes**
   - Go to **Configuration** → **Admin API access scopes**
   - Check these boxes:
     - ✅ `write_products`
     - ✅ `read_products`
     - ✅ `write_orders`
     - ✅ `read_orders`
     - ✅ `write_script_tags`
     - ✅ `read_script_tags`
   - Click **Save**

---

## Step 3: Deploy to Railway (10 minutes)

### What I Need From You:

1. **Create Railway Account**
   - Go to: https://railway.app
   - Click **Login with GitHub**
   - Authorize Railway

2. **Create New Project**
   - Click **New Project**
   - Select **Deploy from GitHub repo**
   - Choose **tefa006/NUT**
   - Click **Deploy Now**

3. **Add Database**
   - In your project, click **New**
   - Select **Database** → **Add PostgreSQL**
   - Wait 30 seconds for it to provision

4. **Set Environment Variables**
   - Click on your **app service** (not database)
   - Click **Variables** tab
   - Click **+ New Variable** for each:

   ```
   SHOPIFY_API_KEY = [paste your API key from Step 2]
   SHOPIFY_API_SECRET = [paste your API secret from Step 2]
   SHOPIFY_SCOPES = write_products,read_products,write_orders,read_orders,write_script_tags,read_script_tags
   SESSION_SECRET = [type any random string, at least 32 characters]
   NODE_ENV = production
   ```

5. **Generate Domain**
   - Click **Settings** tab
   - Scroll to **Domains**
   - Click **Generate Domain**
   - **COPY YOUR DOMAIN** (e.g., `your-app.up.railway.app`)

6. **Add App URL Variable**
   - Go back to **Variables** tab
   - Add one more variable:
   ```
   SHOPIFY_APP_URL = https://[your-railway-domain].up.railway.app
   ```

7. **Wait for Deployment**
   - Click **Deployments** tab
   - Wait for green checkmark (2-3 minutes)

---

## Step 4: Update Shopify App (2 minutes)

1. **Go back to Shopify Partners**
   - Open your app
   - Click **Configuration**

2. **Update URLs**
   Replace the temporary URLs with your Railway domain:
   - **App URL**: `https://[your-railway-domain].up.railway.app`
   - **Redirect URL**: `https://[your-railway-domain].up.railway.app/auth/callback`
   - Click **Save**

---

## Step 5: Install to Your Store (3 minutes)

1. **Create Installation URL**
   Replace the placeholders:
   ```
   https://[your-railway-domain].up.railway.app/auth/install?shop=[your-store].myshopify.com
   ```
   
   Example:
   ```
   https://kit-app.up.railway.app/auth/install?shop=my-store.myshopify.com
   ```

2. **Install**
   - Open the URL in your browser
   - Click **Install app**
   - Approve permissions

3. **Access Admin Panel**
   ```
   https://[your-railway-domain].up.railway.app/admin.html?shop=[your-store].myshopify.com
   ```

---

## Step 6: Create Your First Kit (5 minutes)

In the admin panel:

1. Click **Create New Kit**
2. Fill in:
   - **Title**: "Build Your Perfect Bundle"
   - **Min Products**: 4
   - **Discount Type**: Percentage
   - **Discount Value**: 15
   - **Custom Message**: "Choose 4 or more products and save 15%!"
3. Click **Save Kit**
4. **Copy the Kit ID** from the card

---

## Step 7: Add to Storefront (5 minutes)

1. **Go to Shopify Admin**
   - **Online Store** → **Themes**
   - Click **Customize**

2. **Add Custom HTML**
   - Add a section or edit a page
   - Add **Custom HTML** block
   - Paste:
   ```html
   <div id="kit-builder" data-kit-id="YOUR_KIT_ID"></div>
   <script src="https://[your-railway-domain].up.railway.app/kit-builder.js"></script>
   ```

3. **Replace Placeholders**
   - `YOUR_KIT_ID` → your actual kit ID
   - `[your-railway-domain]` → your Railway domain

4. **Save and Preview**

---

## ✅ Checklist

- [ ] Uploaded to GitHub
- [ ] Created Shopify app
- [ ] Got API credentials
- [ ] Deployed to Railway
- [ ] Added database
- [ ] Set environment variables
- [ ] Generated Railway domain
- [ ] Updated Shopify URLs
- [ ] Installed app to store
- [ ] Created first kit
- [ ] Added to storefront

---

## 🆘 Need Help?

### Common Issues:

**"Git is not recognized"**
- Install Git: https://git-scm.com/download/win

**"Authentication failed" when pushing to GitHub**
- You may need to use a Personal Access Token
- Go to: GitHub → Settings → Developer settings → Personal access tokens
- Create token with `repo` scope
- Use token as password when prompted

**"Can't install app"**
- Check API credentials are correct
- Verify redirect URL matches exactly
- Make sure Railway app is running

**"Widget doesn't show"**
- Verify kit ID is correct
- Check kit is set to "Active"
- Open browser console (F12) for errors

---

## 📞 Information I Need

To help you further, please provide:

1. **Shopify Store Name**: `____________.myshopify.com`
2. **Railway Domain**: `____________.up.railway.app`
3. **Any errors you encounter**

---

## 🎉 You're All Set!

Once completed, you'll have:
- ✅ App on GitHub
- ✅ App deployed to Railway
- ✅ App installed on Shopify
- ✅ Kit builder on your storefront

Start creating amazing product bundles! 🎁
