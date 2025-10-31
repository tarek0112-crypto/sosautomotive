# 🚀 S.O.S Automotive Dashboard - Cloud Deployment Guide

## Overview
This guide will help you deploy your application to the cloud for free.

---

## 📦 Deployment Stack

- **Backend + Database**: Railway (Free tier: $5 credit/month)
- **Frontend**: Netlify or Vercel (Free tier: Unlimited)

---

## Part 1: Deploy Backend to Railway

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"

### Step 2: Deploy PostgreSQL Database
1. Click "+ New" → "Database" → "PostgreSQL"
2. Wait for deployment (1-2 minutes)
3. Click on the database → "Variables" tab
4. Copy the `DATABASE_URL` (you'll need this)

### Step 3: Deploy Backend
1. Click "+ New" → "Empty Service"
2. Click "Settings" → "Source"
3. Connect your GitHub repository OR use "Deploy from local directory"
4. Set Root Directory: `backend`
5. Go to "Variables" tab and add:
   ```
   NODE_ENV=production
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
   JWT_EXPIRES_IN=7d
   BCRYPT_ROUNDS=12
   DATABASE_URL=[paste the DATABASE_URL from step 2]
   FRONTEND_URL=https://your-app.netlify.app
   ```

### Step 4: Configure Build
1. Go to "Settings" → "Build"
2. Build Command: `npm run build`
3. Start Command: `npm start`
4. Install Command: `npm install`

### Step 5: Run Database Migration
1. After deployment, go to your service
2. Click "Settings" → "Deploy"
3. Add a deployment trigger or manually run:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

### Step 6: Get Your Backend URL
1. Go to "Settings" → "Networking"
2. Click "Generate Domain"
3. Copy the URL (e.g., `https://your-backend.up.railway.app`)
4. Save this - you'll need it for the frontend!

---

## Part 2: Deploy Frontend to Netlify

### Step 1: Create Netlify Account
1. Go to https://netlify.com
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"

### Step 2: Connect Repository
1. Choose "Deploy with GitHub" (or upload manually)
2. Select your repository
3. Configure build settings:
   - **Base directory**: (leave empty or root)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### Step 3: Add Environment Variables
1. Go to "Site settings" → "Environment variables"
2. Add:
   ```
   VITE_API_URL=https://your-backend.up.railway.app/api
   ```
   (Use the Railway backend URL from Part 1, Step 6)

### Step 4: Deploy
1. Click "Deploy site"
2. Wait 2-5 minutes for build
3. Your app will be live at `https://random-name.netlify.app`

### Step 5: Custom Domain (Optional)
1. Go to "Domain settings"
2. Click "Add custom domain"
3. Follow instructions to connect your domain

---

## Alternative: Deploy Frontend to Vercel

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New" → "Project"

### Step 2: Import Repository
1. Select your repository
2. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Environment Variables
Add in the "Environment Variables" section:
```
VITE_API_URL=https://your-backend.up.railway.app/api
```

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build completion
3. Your app will be live at `https://your-app.vercel.app`

---

## Part 3: Update Backend CORS

After deploying frontend, update your Railway backend:

1. Go to Railway → Your Backend Service → Variables
2. Update `FRONTEND_URL` to your Netlify/Vercel URL:
   ```
   FRONTEND_URL=https://your-app.netlify.app
   ```
3. Redeploy the backend

---

## 🔐 Default Login Credentials

After deployment, log in with:
- **Email**: `admin@sos.com`
- **Password**: `admin123`

⚠️ **IMPORTANT**: Change these credentials immediately after first login!

---

## 📊 Post-Deployment Checklist

- [ ] Backend is running on Railway
- [ ] Database is connected and seeded
- [ ] Frontend is deployed on Netlify/Vercel
- [ ] Environment variables are set correctly
- [ ] CORS is configured with frontend URL
- [ ] Can log in successfully
- [ ] Changed default admin password
- [ ] Custom domain configured (optional)

---

## 🐛 Troubleshooting

### Backend Issues
- **500 Error**: Check Railway logs for database connection issues
- **CORS Error**: Verify `FRONTEND_URL` matches your Netlify/Vercel URL
- **Database Error**: Ensure `DATABASE_URL` is correct and database is running

### Frontend Issues
- **Build Failed**: Check Netlify/Vercel build logs
- **API Not Working**: Verify `VITE_API_URL` points to Railway backend
- **Login Failed**: Check browser console for CORS errors

### Database Issues
- **Migration Failed**: Run `npx prisma db push` in Railway console
- **No Data**: Run `npm run db:seed` in Railway console

---

## 💰 Cost Estimate

- **Railway**: Free tier ($5 credit/month) - Enough for small projects
- **Netlify/Vercel**: Free tier - Unlimited for personal projects
- **Total**: $0/month for hobby projects

---

## 🔄 Updating Your App

### Backend Updates
1. Push changes to GitHub
2. Railway auto-deploys (if connected to GitHub)
3. Or manually redeploy in Railway dashboard

### Frontend Updates
1. Push changes to GitHub
2. Netlify/Vercel auto-deploys
3. Or trigger manual deploy in dashboard

---

## 📞 Support

If you encounter issues:
1. Check Railway/Netlify/Vercel logs
2. Verify all environment variables
3. Test API endpoints directly
4. Check browser console for errors

---

**Your app is now live and accessible from anywhere! 🎉**
