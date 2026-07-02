# 🚀 Deploy to Vercel - Step by Step

## Prerequisites
✅ Vercel CLI is installed
✅ Production build is complete

## Deployment Steps

### Step 1: Login to Vercel
Open your terminal and run:
```bash
cd "d:\Atharva practice\atharva"
vercel login
```
This will open your browser to authenticate with Vercel.

### Step 2: Deploy
Once logged in, run:
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No (first time) or Yes (if project exists)
- **Project name?** → shinde-shahi-chinese-restro (or your preferred name)
- **Directory?** → Press Enter (current directory)
- **Override settings?** → No

### Step 3: Deploy to Production
After the preview deployment, run:
```bash
vercel --prod
```

This will deploy your website to production!

## 🌐 Your Website Will Be Live At:
- **URL:** https://shinde-shahi-chinese-restro.vercel.app
- Or your custom domain if configured

## ⚡ Quick Commands

```bash
# Deploy preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel list

# View logs
vercel logs
```

## 📝 Notes

- First deployment takes 2-3 minutes
- Subsequent deployments are faster
- Vercel will automatically detect it's a Next.js project
- Your website will have HTTPS enabled automatically
- Global CDN for fast loading worldwide

## 🔧 If You Need to Redeploy

Just run:
```bash
cd "d:\Atharva practice\atharva"
vercel --prod
```

---

**Your restaurant website is ready to go live! 🎉**
