# 🔧 Render Deployment Troubleshooting Guide

## Common Issues and Solutions

---

## 🚨 Backend Deployment Issues

### Issue: Build Failed

**Symptoms:**
- Red "Build failed" status
- Error in logs: `npm install failed`

**Solutions:**
1. Check `package.json` exists in `backend` folder
2. Verify Root Directory is set to `backend`
3. Check build command:
   ```bash
   npm install && npx prisma generate && npm run build
   ```
4. Look for missing dependencies in logs

**Fix:**
- Go to Settings → Build Command
- Update and save
- Click "Manual Deploy" → "Clear build cache & deploy"

---

### Issue: Database Connection Failed

**Symptoms:**
- Backend starts but crashes immediately
- Error: `Can't reach database server`
- Error: `P1001: Can't reach database`

**Solutions:**
1. **Check DATABASE_URL:**
   - Go to Backend → Environment
   - Verify `DATABASE_URL` is set
   - Use "Internal Database URL" from PostgreSQL service
   - Format: `postgresql://user:password@host/database`

2. **Verify Database is Running:**
   - Go to PostgreSQL service
   - Status should be green "Available"
   - If not, wait or restart database

3. **Check Network:**
   - Backend and Database must be in same region
   - Use Internal URL, not External

**Fix:**
```bash
# In backend shell, test connection:
npx prisma db push
```

---

### Issue: Port Binding Error

**Symptoms:**
- Error: `EADDRINUSE: address already in use`
- Error: `Port 5000 is already in use`

**Solution:**
- Render uses `PORT=10000` by default
- Verify environment variable: `PORT=10000`
- Check your code uses `process.env.PORT`:
  ```javascript
  const PORT = process.env.PORT || 5000;
  ```

---

### Issue: Prisma Client Not Generated

**Symptoms:**
- Error: `@prisma/client did not initialize yet`
- Error: `Cannot find module '@prisma/client'`

**Solution:**
1. Update build command to include:
   ```bash
   npm install && npx prisma generate && npm run build
   ```
2. Redeploy with clear cache

---

## 🌐 Frontend Deployment Issues

### Issue: Build Failed

**Symptoms:**
- Red "Build failed" status
- Error: `vite: command not found`

**Solutions:**
1. **Check Build Command:**
   ```bash
   npm install && npm run build
   ```

2. **Verify package.json:**
   - Must be in root directory
   - Must have `"build": "vite build"` script

3. **Check Publish Directory:**
   - Should be `dist` (not `build` or `public`)

**Fix:**
- Settings → Build & Deploy
- Update commands
- Trigger redeploy

---

### Issue: Blank Page After Deploy

**Symptoms:**
- Frontend loads but shows blank page
- No errors in browser console

**Solutions:**
1. **Check Publish Directory:**
   - Should be `dist`
   - Not `dist/` or `/dist`

2. **Verify Build Output:**
   - Check build logs
   - Should see: `✓ built in XXXms`
   - Should create `dist` folder

3. **Check index.html:**
   - Must be in root of `dist` folder

---

### Issue: API Calls Failing

**Symptoms:**
- Frontend loads but can't fetch data
- Error: `Failed to fetch`
- Error: `Network request failed`

**Solutions:**
1. **Check VITE_API_URL:**
   - Go to Static Site → Environment
   - Must include `/api` at the end
   - Example: `https://backend.onrender.com/api`
   - No trailing slash after `/api`

2. **Verify Backend is Running:**
   - Open backend URL in browser
   - Should see response (not error page)

3. **Check CORS:**
   - Backend `FRONTEND_URL` must match frontend URL exactly
   - No trailing slash
   - Include `https://`

**Fix:**
```bash
# Test API directly:
https://your-backend.onrender.com/health
# Should return: {"status":"ok"}
```

---

## 🗄️ Database Issues

### Issue: Database Not Seeding

**Symptoms:**
- `npm run db:seed` fails
- Error: `Table 'users' doesn't exist`

**Solutions:**
1. **Run migrations first:**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

2. **Check DATABASE_URL:**
   - Must be set correctly
   - Use Internal URL from Render

3. **Verify schema.prisma:**
   - Check for syntax errors
   - Ensure all models are defined

---

### Issue: Database Connection Timeout

**Symptoms:**
- Error: `Connection timeout`
- Slow database responses

**Solutions:**
1. **Check database status:**
   - Should be green "Available"
   - Not yellow "Suspended"

2. **Free tier limitations:**
   - Database may suspend after inactivity
   - First query wakes it up (30-60 sec)

3. **Increase timeout:**
   - Add to DATABASE_URL:
   ```
   ?connect_timeout=30
   ```

---

## 🔒 CORS Issues

### Issue: CORS Policy Error

**Symptoms:**
- Error: `blocked by CORS policy`
- Login fails with network error
- API calls return 403

**Solutions:**
1. **Update Backend FRONTEND_URL:**
   ```
   FRONTEND_URL=https://your-exact-frontend-url.onrender.com
   ```
   - Must match exactly (no trailing slash)
   - Include `https://`

2. **Check Backend CORS Config:**
   - Should allow frontend origin
   - Check `src/simple-server.ts` or `src/index.ts`

3. **Redeploy Backend:**
   - After changing FRONTEND_URL
   - Wait for deployment to complete

**Test:**
```javascript
// In browser console on frontend:
fetch('https://your-backend.onrender.com/health')
  .then(r => r.json())
  .then(console.log)
```

---

## ⚡ Performance Issues

### Issue: Slow First Load (Cold Start)

**Symptoms:**
- First request takes 30-60 seconds
- Subsequent requests are fast

**Cause:**
- Free tier services spin down after 15 minutes of inactivity

**Solutions:**
1. **Accept it** (normal for free tier)

2. **Keep service awake:**
   - Use UptimeRobot: https://uptimerobot.com
   - Ping every 14 minutes
   - Free tier available

3. **Upgrade to paid:**
   - $7/month for always-on
   - No cold starts

---

### Issue: Build Takes Too Long

**Symptoms:**
- Build times over 10 minutes
- Timeout errors

**Solutions:**
1. **Clear build cache:**
   - Manual Deploy → Clear build cache & deploy

2. **Optimize dependencies:**
   - Remove unused packages
   - Use `npm ci` instead of `npm install`

3. **Check build command:**
   - Should be efficient
   - No unnecessary steps

---

## 🔐 Authentication Issues

### Issue: Login Fails

**Symptoms:**
- Correct credentials don't work
- Error: `Invalid credentials`

**Solutions:**
1. **Verify database was seeded:**
   ```bash
   # In backend shell:
   npm run db:seed
   ```

2. **Check default credentials:**
   - Email: `admin@sos.com`
   - Password: `admin123`
   - Case sensitive!

3. **Test API directly:**
   ```bash
   curl -X POST https://your-backend.onrender.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@sos.com","password":"admin123"}'
   ```

---

### Issue: JWT Token Invalid

**Symptoms:**
- Login works but immediately logs out
- Error: `jwt malformed`

**Solutions:**
1. **Check JWT_SECRET:**
   - Must be set in backend environment
   - Should be long and random

2. **Verify JWT_EXPIRES_IN:**
   - Should be `7d` or similar
   - Not empty

3. **Clear browser cache:**
   - Old tokens may be cached

---

## 📊 Monitoring and Logs

### How to Check Logs

**Backend Logs:**
1. Go to backend service
2. Click "Logs" tab
3. Filter by error level
4. Look for stack traces

**Frontend Logs:**
1. Go to static site
2. Click "Logs" tab (build logs only)
3. For runtime errors, check browser console

**Database Logs:**
1. Go to PostgreSQL service
2. Click "Logs" tab
3. Look for connection errors

---

## 🆘 Emergency Fixes

### Complete Reset

If everything is broken:

1. **Delete all services:**
   - Backend
   - Frontend
   - Keep database (has your data!)

2. **Redeploy from scratch:**
   - Follow RENDER_QUICK_START.md
   - Use existing database
   - Don't run `db:seed` again

### Restore Database

If database is corrupted:

1. **Create new database**
2. **Update DATABASE_URL** in backend
3. **Run migrations:**
   ```bash
   npx prisma db push
   npm run db:seed
   ```

---

## 📞 Getting Help

### Render Support
- **Docs**: https://render.com/docs
- **Community**: https://community.render.com
- **Status**: https://status.render.com
- **Support**: support@render.com (paid plans)

### Check These First
1. Service status (green = good)
2. Recent logs (last 100 lines)
3. Environment variables (all set?)
4. Build/deploy history (recent changes?)

### Useful Commands

**Test backend health:**
```bash
curl https://your-backend.onrender.com/health
```

**Test database connection:**
```bash
# In backend shell:
npx prisma db push
```

**View environment variables:**
```bash
# In backend shell:
env | grep -E 'DATABASE_URL|JWT_SECRET|PORT'
```

**Check Prisma client:**
```bash
# In backend shell:
npx prisma generate
```

---

## ✅ Prevention Checklist

Before deploying:
- [ ] All environment variables documented
- [ ] Database URL is Internal (not External)
- [ ] FRONTEND_URL matches exactly
- [ ] Build commands tested locally
- [ ] Dependencies up to date
- [ ] No hardcoded URLs in code

After deploying:
- [ ] Test all major features
- [ ] Check logs for warnings
- [ ] Monitor for 24 hours
- [ ] Set up alerts
- [ ] Document any custom changes

---

**Still stuck? Check the main RENDER_DEPLOYMENT.md guide or ask for help!**
