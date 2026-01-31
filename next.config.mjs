/** @type {import('next').NextConfig} */
// #region agent log
fetch('http://127.0.0.1:7242/ingest/94295a68-58c0-4c7f-a369-b8d6564b2c9c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'next.config.mjs:1',message:'Config file loaded',data:{hasOutputExport:true,hasUnoptimizedImages:true,hasTrailingSlash:true},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix-v2',hypothesisId:'A'})}).catch(()=>{});
// #endregion
const nextConfig = {
  output: 'export', // Required for static site generation (GitHub Pages)
  trailingSlash: true, // Recommended for GitHub Pages
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

// #region agent log
fetch('http://127.0.0.1:7242/ingest/94295a68-58c0-4c7f-a369-b8d6564b2c9c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'next.config.mjs:15',message:'Config exported with output export and trailingSlash',data:{hasOutputExport:true,hasTrailingSlash:true},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix-v2',hypothesisId:'A'})}).catch(()=>{});
// #endregion
export default nextConfig
