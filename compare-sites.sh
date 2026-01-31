#!/bin/bash

# Site Comparison Script
# Compares Vercel and GitHub Pages deployments

VERCEL_URL="https://v0-quippi-project-setup.vercel.app"
GITHUB_URL="https://nik-tghtfl.github.io/tghtfl.github.io"

echo "=== Site Comparison: Vercel vs GitHub Pages ==="
echo ""
echo "Vercel URL: $VERCEL_URL"
echo "GitHub Pages URL: $GITHUB_URL"
echo ""

# Test 1: Home page accessibility
echo "1. Testing Home Page (/)"
echo "   Vercel:"
curl -s -o /dev/null -w "   Status: %{http_code}\n" "$VERCEL_URL/"
echo "   GitHub Pages:"
curl -s -o /dev/null -w "   Status: %{http_code}\n" "$GITHUB_URL/"
echo ""

# Test 2: Feedback page
echo "2. Testing Feedback Page (/feedback)"
echo "   Vercel:"
curl -s -o /dev/null -w "   Status: %{http_code}\n" "$VERCEL_URL/feedback"
echo "   GitHub Pages:"
curl -s -o /dev/null -w "   Status: %{http_code}\n" "$GITHUB_URL/feedback"
echo ""

# Test 3: Dashboard page
echo "3. Testing Dashboard Page (/dashboard)"
echo "   Vercel:"
curl -s -o /dev/null -w "   Status: %{http_code}\n" "$VERCEL_URL/dashboard"
echo "   GitHub Pages:"
curl -s -o /dev/null -w "   Status: %{http_code}\n" "$GITHUB_URL/dashboard"
echo ""

echo "=== Manual Checks Needed ==="
echo "1. Open both URLs in browser side-by-side"
echo "2. Check browser DevTools Console for errors"
echo "3. Check Network tab for failed requests (404s)"
echo "4. Compare visual appearance and functionality"
echo ""
echo "Common issues to look for:"
echo "- CSS files returning 404"
echo "- JavaScript bundles not loading"
echo "- Broken navigation links"
echo "- Missing images or assets"
