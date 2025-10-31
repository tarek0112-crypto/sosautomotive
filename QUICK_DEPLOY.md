# ⚡ Quick Deploy Guide

## 🎯 Deploy in 15 Minutes

### Step 1: Push to GitHub (5 minutes)

```powershell
# Navigate to project
cd C:\projects\sos-automotive

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - S.O.S Automotive Dashboard"

# Create GitHub repository
# Go to https://github.com/new
# Create a new repository named "sos-automotive-dashboard"
# Don't initialize with README

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/sos-automotive-dashboard.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend to Railway (5 minutes)

1. **Go to**: https://railway.app
2. **Sign up** with GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Select** your `sos-automotive-dashboard` repository
5. **Add PostgreSQL**:
   - Click "+ New" → "Database" → "PostgreSQL"
6. **Configure Backend Service**:
   - Root Directory: `backend`
   - Add these environment variables:
     ```
     NODE_ENV=production
     JWT_SECRET=change-this-to-a-random-secret-key-12345
     DATABASE_URL=${{Postgres.DATABASE_URL}}
     FRONTEND_URL=https://your-app.netlify.app
     ```
7. **Deploy** and wait 2-3 minutes
8. **Generate Domain** in Settings → Networking
9. **Copy the URL** (e.g., `https://sos-automotive-production.up.railway.app`)

### Step 3: Run Database Setup

In Railway dashboard:
1. Click on your backend service
2. Go to "Settings" → "Deploy"
3. In the deployment logs, find the terminal
4. Run these commands:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

### Step 4: Deploy Frontend to Netlify (5 minutes)

1. **Go to**: https://netlify.com
2. **Sign up** with GitHub
3. **New site from Git** → **GitHub**
4. **Select** your repository
5. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. **Environment variables**:
   ```
   VITE_API_URL=https://your-railway-backend-url.up.railway.app/api
   ```
   (Use the Railway URL from Step 2)
7. **Deploy site**
8. **Copy your Netlify URL** (e.g., `https://sos-automotive.netlify.app`)

### Step 5: Update Backend CORS

1. Go back to **Railway**
2. Click on your **backend service**
3. Go to **Variables**
4. Update `FRONTEND_URL` to your Netlify URL:
   ```
   FRONTEND_URL=https://sos-automotive.netlify.app
   ```
5. Service will auto-redeploy

---

## ✅ Done!

Your app is now live at:
- **Frontend**: https://your-app.netlify.app
- **Backend**: https://your-backend.up.railway.app

**Login with:**
- Email: `admin@sos.com`
- Password: `admin123`

⚠️ **Change the password immediately after first login!**

---

## 🔄 Future Updates

To update your app:
```powershell
git add .
git commit -m "Your update message"
git push
```

Both Railway and Netlify will auto-deploy your changes!

---

## 💡 Tips

- **Free Tier Limits**: Railway gives $5/month credit (enough for small apps)
- **Custom Domain**: Add your own domain in Netlify settings
- **Monitoring**: Check Railway logs for backend issues
- **Database Backup**: Use Railway's backup feature

---

## 🆘 Need Help?

Check the full `DEPLOYMENT.md` guide for detailed troubleshooting.
