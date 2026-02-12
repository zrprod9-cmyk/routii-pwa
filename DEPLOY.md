# Deploy Routii to Vercel

## Option 1: CLI (fastest)

```bash
cd ~/Projects/routii-pwa
vercel login  # Follow email verification
vercel --prod
```

## Option 2: GitHub Integration (easiest)

1. Go to https://vercel.com
2. Click "Import Project"
3. Select GitHub repo: `zrprod9-cmyk/routii-pwa`
4. Settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Click "Deploy"

Done! URL will be: `routii-pwa.vercel.app` (or custom domain)

## vercel.json (already configured)

Project includes build settings. No additional config needed.

## After Deploy

1. Open URL on iPhone Safari
2. Click Share → Add to Home Screen
3. Test PWA functionality
4. Update MVP Score with deployment results

---

**Current Status:** Ready to deploy. All code pushed to main branch.
