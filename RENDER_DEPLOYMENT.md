# 🚀 Deploy S.O.S Automotive Dashboard to Render

## Overview
This guide will help you deploy your application to Render (free tier available).

**What you'll deploy:**
- Backend API (Node.js/Express)
- PostgreSQL Database
- Frontend (Static Site)

**Estimated time:** 20-30 minutes

---

## Prerequisites

- [ ] Render account (sign up at https://render.com)
- [ ] GitHub account (for code hosting)
- [ ] Your project code ready

---

## Step 1: Push Code to GitHub

### Option A: Using GitHub Desktop (Easiest)

1. **Download GitHub Desktop**: https://desktop.github.com
2. **Install and sign in**
3. **Add repository**:
   - File → Add Local Repository
   - Choose: `C:\projects\sos-automotive`
4. **Create repository on GitHub**:
   - Click "Publish repository"
   - Name: `sos-automotive-dashboard`
   - Keep it Public (required for free tier)
   - Click "Publish Repository"

### Option B: Using Git Command Line

```bash
cd C:\projects\sos-automotive

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit for Render deployment"

# Create repo on GitHub (go to https://github.com/new)
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/sos-automotive-dashboard.git
git branch -M main
git push -u origin main
```

### Option C: Manual Upload to GitHub

1. Go to https://github.com/new
2. Create repository: `sos-automotive-dashboard`
3. Click "uploading an existing file"
4. Drag and drop all files from `C:\projects\sos-automotive`
5. Click "Commit changes"

---

## Step 2: Deploy PostgreSQL Database

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +"** → **PostgreSQL**
3. **Configure database**:
   - **Name**: `sos-automotive-db`
   - **Database**: `sos_automotive_db`
   - **User**: `sos_user`
   - **Region**: Choose closest to you
   - **Instance Type**: Free
4. **Click "Create Database"**
5. **Wait 2-3 minutes** for database to be ready
6. **Copy the Internal Database URL** (you'll need this)
   - Go to database → "Info" tab
   - Copy "Internal Database URL"

---

## Step 3: Deploy Backend API

1. **Click "New +"** → **Web Service**
2. **Connect GitHub repository**:
   - Click "Connect account" if first time
   - Select your `sos-automotive-dashboard` repository
3. **Configure service**:
   - **Name**: `sos-automotive-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: 
     ```bash
     npm install && npx prisma generate && npm run build
     ```
   - **Start Command**: 
     ```bash
     npm start
     ```
   - **Instance Type**: Free

4. **Add Environment Variables**:
   Click "Advanced" → "Add Environment Variable":
   
   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=[paste Internal Database URL from Step 2]
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-abc123xyz
   JWT_EXPIRES_IN=7d
   BCRYPT_ROUNDS=12
   FRONTEND_URL=https://your-app.onrender.com
   ```
   
   ⚠️ **Important**: 
   - Replace `DATABASE_URL` with your actual database URL
   - Change `JWT_SECRET` to a random secure string
   - We'll update `FRONTEND_URL` later

5. **Click "Create Web Service"**
6. **Wait 5-10 minutes** for deployment
7. **Check logs** for any errors
8. **Copy your backend URL** (e.g., `https://sos-automotive-backend.onrender.com`)

---

## Step 4: Initialize Database

After backend deployment succeeds:

1. **Go to your backend service** in Render dashboard
2. **Click "Shell"** tab (opens a terminal)
3. **Run these commands one by one**:

   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push database schema
   npx prisma db push
   
   # Seed database with initial data
   npm run db:seed
   ```

4. **Verify** - You should see:
   - ✅ Admin user created
   - ✅ Technician user created
   - ✅ Categories created
   - ✅ Suppliers created
   - ✅ Technicians created
   - ✅ Customers created
   - ✅ Inventory items created

5. **Test API** - Open in browser:
   ```
   https://your-backend-url.onrender.com/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

---

## Step 5: Deploy Frontend

1. **Click "New +"** → **Static Site**
2. **Connect same GitHub repository**
3. **Configure**:
   - **Name**: `sos-automotive-dashboard`
   - **Branch**: `main`
   - **Root Directory**: (leave empty - use root)
   - **Build Command**: 
     ```bash
     npm install && npm run build
     ```
   - **Publish Directory**: `dist`

4. **Add Environment Variable**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
   (Use the backend URL from Step 3)

5. **Click "Create Static Site"**
6. **Wait 5-10 minutes** for build
7. **Copy your frontend URL** (e.g., `https://sos-automotive-dashboard.onrender.com`)

---

## Step 6: Update Backend CORS

1. **Go back to backend service**
2. **Click "Environment"** tab
3. **Edit `FRONTEND_URL`**:
   ```
   FRONTEND_URL=https://sos-automotive-dashboard.onrender.com
   ```
   (Use your actual frontend URL from Step 5)
4. **Save changes** - Backend will auto-redeploy

---

## Step 7: Test Your Application

1. **Open your frontend URL** in browser
2. **Login with default credentials**:
   - Email: `admin@sos.com`
   - Password: `admin123`
3. **Test features**:
   - View dashboard
   - Check customers
   - Create a job
   - View inventory

⚠️ **IMPORTANT**: Change the admin password immediately after first login!

---

## 🎉 Deployment Complete!

Your application is now live:
- **Frontend**: https://your-app.onrender.com
- **Backend**: https://your-backend.onrender.com
- **Database**: Hosted on Render

---

## 📊 Render Free Tier Limits

- **Web Services**: 750 hours/month (enough for 1 service running 24/7)
- **PostgreSQL**: 90 days free, then $7/month
- **Static Sites**: Unlimited
- **Bandwidth**: 100 GB/month

⚠️ **Note**: Free tier services spin down after 15 minutes of inactivity. First request after inactivity may take 30-60 seconds.

---

## 🔄 Updating Your App

### Automatic Deployment (Recommended)

1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
2. Render auto-deploys both frontend and backend

### Manual Deployment

1. Go to Render dashboard
2. Select your service
3. Click "Manual Deploy" → "Deploy latest commit"

---

## 🐛 Troubleshooting

### Backend Won't Start

**Check logs**:
1. Go to backend service → "Logs" tab
2. Look for errors

**Common issues**:
- ❌ Database connection failed → Check `DATABASE_URL`
- ❌ Port error → Ensure `PORT=10000`
- ❌ Build failed → Check build command

**Solution**: Update environment variables and redeploy

### Frontend Build Failed

**Check logs**:
1. Go to static site → "Logs" tab
2. Look for build errors

**Common issues**:
- ❌ `VITE_API_URL` not set → Add environment variable
- ❌ Build command wrong → Should be `npm install && npm run build`
- ❌ Publish directory wrong → Should be `dist`

### Database Connection Issues

**Verify**:
1. Database is running (green status)
2. `DATABASE_URL` is correct (use Internal URL)
3. Backend can reach database

**Test connection**:
```bash
# In backend shell
npx prisma db push
```

### CORS Errors

**Symptoms**: Login fails, API calls blocked

**Solution**:
1. Check `FRONTEND_URL` matches your actual frontend URL
2. No trailing slash in URL
3. Redeploy backend after changing

### App is Slow

**Cause**: Free tier spins down after 15 minutes

**Solutions**:
- Upgrade to paid tier ($7/month for always-on)
- Use a ping service to keep it awake
- Accept the 30-60 second cold start

---

## 💰 Cost Breakdown

### Free Forever
- ✅ Frontend (Static Site)
- ✅ Backend (750 hours/month)

### After 90 Days
- 💵 PostgreSQL: $7/month (required)

### Optional Upgrades
- Backend always-on: +$7/month
- More database storage: +$5-20/month
- Custom domain: Free

**Total**: $0/month for 90 days, then $7/month minimum

---

## 🔒 Security Checklist

After deployment:
- [ ] Changed default admin password
- [ ] Updated `JWT_SECRET` to strong random value
- [ ] Verified CORS settings
- [ ] Enabled HTTPS (automatic on Render)
- [ ] Set up database backups (in database settings)
- [ ] Reviewed environment variables

---

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **Render Community**: https://community.render.com
- **Status Page**: https://status.render.com

---

## 🎯 Next Steps

1. **Custom Domain** (Optional):
   - Go to Static Site → "Settings" → "Custom Domain"
   - Add your domain and follow DNS instructions

2. **Database Backups**:
   - Go to Database → "Backups"
   - Enable automatic backups

3. **Monitoring**:
   - Set up email alerts in service settings
   - Monitor logs regularly

4. **SSL Certificate**:
   - Automatic and free on Render
   - Renews automatically

---

**Your app is now deployed and accessible worldwide! 🌍**
