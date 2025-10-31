# ⚡ Render Quick Start - 30 Minutes

## 🎯 Deployment Checklist

### ✅ Before You Start
- [ ] Code in `C:\projects\sos-automotive`
- [ ] Render account: https://render.com
- [ ] GitHub account: https://github.com

---

## 📝 Step-by-Step

### 1️⃣ Push to GitHub (5 min)
- Install GitHub Desktop: https://desktop.github.com
- Add local repository: `C:\projects\sos-automotive`
- Publish to GitHub (keep public)

### 2️⃣ Create Database (3 min)
- Render Dashboard → New + → PostgreSQL
- Name: `sos-automotive-db`
- Free tier → Create
- Copy "Internal Database URL"

### 3️⃣ Deploy Backend (10 min)
- New + → Web Service
- Connect GitHub repo
- Root Directory: `backend`
- Build: `npm install && npx prisma generate && npm run build`
- Start: `npm start`
- Add environment variables:
  ```
  NODE_ENV=production
  PORT=10000
  DATABASE_URL=[paste from step 2]
  JWT_SECRET=change-this-random-secret-key-123
  JWT_EXPIRES_IN=7d
  BCRYPT_ROUNDS=12
  FRONTEND_URL=https://temp.com
  ```
- Create → Wait for deploy
- Copy backend URL

### 4️⃣ Setup Database (5 min)
- Backend service → Shell tab
- Run:
  ```bash
  npx prisma generate
  npx prisma db push
  npm run db:seed
  ```

### 5️⃣ Deploy Frontend (7 min)
- New + → Static Site
- Same GitHub repo
- Root Directory: (empty)
- Build: `npm install && npm run build`
- Publish: `dist`
- Environment variable:
  ```
  VITE_API_URL=https://[your-backend-url].onrender.com/api
  ```
- Create → Wait for build
- Copy frontend URL

### 6️⃣ Update CORS (2 min)
- Backend → Environment
- Update `FRONTEND_URL` to your frontend URL
- Save (auto-redeploys)

---

## 🎉 Done!

**Your app is live!**
- Frontend: https://your-app.onrender.com
- Backend: https://your-backend.onrender.com

**Login:**
- Email: `admin@sos.com`
- Password: `admin123`

⚠️ Change password after first login!

---

## 🆘 Quick Fixes

**Backend won't start?**
→ Check logs, verify DATABASE_URL

**Frontend can't connect?**
→ Check VITE_API_URL, verify backend is running

**CORS error?**
→ Update FRONTEND_URL in backend, redeploy

**Slow first load?**
→ Normal for free tier (30-60 sec cold start)

---

## 💡 Pro Tips

1. **Keep services awake**: Use UptimeRobot to ping every 14 minutes
2. **Monitor logs**: Check regularly for errors
3. **Database backups**: Enable in database settings
4. **Custom domain**: Free on Render
5. **Auto-deploy**: Push to GitHub = auto-deploy

---

## 📊 Costs

- **First 90 days**: FREE
- **After 90 days**: $7/month (database only)
- **Always-on backend**: +$7/month (optional)

---

**Need detailed help? Check `RENDER_DEPLOYMENT.md`**
