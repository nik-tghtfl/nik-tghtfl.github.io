# Site Comparison Guide: Vercel vs GitHub Pages

## URLs to Compare

1. **Vercel**: `https://v0-quippi-project-setup.vercel.app`
2. **GitHub Pages**: `https://nik-tghtfl.github.io/tghtfl.github.io/`

## Key Differences

### 1. **Deployment Type**

**Vercel:**
- Full Next.js application with server-side rendering
- Dynamic routes work
- API routes work (if any)
- No static export restrictions

**GitHub Pages:**
- Static export (`output: 'export'` in `next.config.mjs`)
- Pre-rendered HTML only
- No server-side features
- No API routes
- No dynamic routes (unless pre-rendered)

### 2. **Base Path Issue**

The GitHub Pages URL shows `/tghtfl.github.io/` subdirectory, which suggests:
- Repository name: `tghtfl.github.io`
- GitHub username: `nik-tghtfl`
- This creates a subdirectory path that breaks absolute links

**Problem**: All links in the code use absolute paths like `/feedback`, but GitHub Pages needs `/tghtfl.github.io/feedback`

### 3. **Configuration Differences**

**Current `next.config.mjs` for GitHub Pages:**
```javascript
{
  output: 'export',        // Static export only
  trailingSlash: true,     // GitHub Pages compatibility
  images: { unoptimized: true }  // Required for static export
}
```

**Vercel** uses default Next.js config (no static export)

## How to Compare the Sites

### Manual Comparison Checklist

1. **Home Page (`/`)**
   - [ ] Does the hero section display correctly?
   - [ ] Are the three feature cards visible?
   - [ ] Does the "Submit Feedback" button work?
   - [ ] Is the styling consistent?

2. **Navigation**
   - [ ] Do all nav links work?
   - [ ] Is the active state highlighting working?
   - [ ] Does clicking "Home" work?

3. **Feedback Page (`/feedback`)**
   - [ ] Does the page load?
   - [ ] Does the "Back to Home" link work?
   - [ ] Is the placeholder card visible?

4. **Dashboard Page (`/dashboard`)**
   - [ ] Does the page load?
   - [ ] Is the admin badge visible?

5. **Styling**
   - [ ] Are fonts loading correctly?
   - [ ] Are colors consistent (indigo primary)?
   - [ ] Is the layout responsive?
   - [ ] Are CSS files loading?

6. **Console Errors**
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for failed requests (404s, etc.)

### Common Issues to Look For

1. **404 Errors for Assets**
   - CSS files not loading
   - Images not loading
   - JavaScript bundles not loading
   - **Cause**: Base path mismatch

2. **Broken Navigation**
   - Links go to wrong URLs
   - **Cause**: Absolute paths vs relative paths

3. **Styling Differences**
   - CSS not applied
   - Layout broken
   - **Cause**: CSS files not loading due to path issues

4. **JavaScript Errors**
   - Client-side navigation not working
   - Interactive features broken
   - **Cause**: JavaScript bundles not loading

## Quick Test Script

Open both URLs side-by-side and check:

```bash
# Test 1: Home page
curl -I https://v0-quippi-project-setup.vercel.app/
curl -I https://nik-tghtfl.github.io/tghtfl.github.io/

# Test 2: Check if CSS loads
# In browser DevTools Network tab, look for:
# - _next/static/css/ files
# - Any 404 errors

# Test 3: Check navigation
# Click each nav link and see if it works on both sites
```

## Likely Root Cause

The GitHub Pages deployment is missing a `basePath` configuration. Since the site is deployed to `/tghtfl.github.io/` subdirectory, all absolute paths break.

**Solution**: Add `basePath: '/tghtfl.github.io'` to `next.config.mjs` for GitHub Pages builds.
