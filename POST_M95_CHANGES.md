## Post-commit-95 change log

This document summarizes the work that was done **after** commit `4090c7e`:

> Fix quip creation webhook: Add production fallback and better error handling

The goal is to make it easy to selectively **rebuild** these improvements on top of
the stable state at `4090c7e` if/when you want them back.

---

### 1. Commit range and key commits

- **Commit range**: `4090c7e..HEAD`
- **Notable commits in this range:**
  - `896988a` – Add detailed logging and error handling for quip creation webhook
  - `c4a329e` – Add interactive 3D hover effects to cards
  - `d254a7b` – Fix missing closing parenthesis in feedback-list map function
  - `219ef66` – Add interactive cursor trail effect to home page
  - `7a6faa7` / `f4b7a25` / `3c0794d` – Cursor trail positioning & behavior refinements
  - `95b8c6d` – Fix user_id format in quip responses: Use numeric IDs instead of 'user-1'
  - `104e6bc` – Add userId prop to `RespondModal` in quips page
  - `50ee50f` – Optimize mobile: burger menu & fix horizontal scrolling
  - `2788264` and `9b3ac3a` – Improve quip responses fetching: debugging, filtering, sorting
  - `b506be1`, `91d759e`, `c4501da`, `1b8f530`, `b3d945a` – Quip responses sheet name discovery / fallbacks
  - `7a22d30` – Add detailed row-level debugging for quip responses
  - `ece9a98` / `321347a` – Display `quip_response_user_name` instead of boolean and fix name badge

To inspect full details later you can rerun:

- `git log --oneline 4090c7e..HEAD`
- `git diff 4090c7e..HEAD`

---

### 2. Google Sheets integration

**Files involved**

- `lib/api.ts`
- `types/index.ts`
- `app/dashboard/page.tsx`
- `app/page.tsx`
- `app/quips/page.tsx`

**What was added**

- Added Google Sheets–backed fetching for **quips** and **quip responses**:
  - `getQuipsFromSheet()` to read from the `"Quips"` tab (A–G, including optional status).
  - `getQuipResponsesFromSheet()` to read from `"Quips Responses"` (A–I, including `quip_response_user_name`).
- Implemented **sheet name fallbacks** and discovery:
  - Tried multiple name variants for the responses sheet.
  - Fallback to listing available sheets and choosing likely candidates (`"Quips"`, `"Quips Responses"`).
- Normalized and parsed response data:
  - Safe date parsing, sentiment normalization, boolean parsing for `is_anonymous`.
  - Added `user_name?: string` to the `QuipResponse` type and wired it from column I.

**How to rebuild later**

1. Reintroduce `getQuipsFromSheet` and `getQuipResponsesFromSheet` in `lib/api.ts` using Google Sheets REST API.
2. Ensure `NEXT_PUBLIC_GOOGLE_SHEET_ID` and `NEXT_PUBLIC_GOOGLE_API_KEY` are present.
3. Update pages (`app/page.tsx`, `app/quips/page.tsx`, `app/dashboard/page.tsx`) to call these instead of mock data helpers.

---

### 3. n8n webhook integrations

**Files involved**

- `lib/api.ts`
- `.github/workflows/deploy.yml` (env vars only – not shown in diff here but previously configured)

**What was added**

- Strengthened **quip creation** and **quip response** webhook calls:
  - Added production fallback URLs when environment variables are missing.
  - Added better error logging and thrown errors for failed submissions.
- Introduced additional logging around request payloads and responses to debug 4xx/5xx from n8n.

**How to rebuild later**

1. Re-add robust webhook functions in `lib/api.ts` for:
   - Creating quips.
   - Submitting quip responses (including `is_anonymous`).
2. Ensure GitHub Actions and local `.env` expose the correct `NEXT_PUBLIC_N8N_*_WEBHOOK_URL` values.

---

### 4. UI / UX improvements

#### 4.1 Card hover effect

- **Files**:
  - `lib/hooks/useCardHover.ts`
  - `components/dashboard/*`
  - `components/quips/ResponseCard.tsx`

- **Summary**:
  - `useCardHover` hook adds a subtle 3D tilt + scale based on cursor position.
  - Applied to dashboard cards and quip response cards.

#### 4.2 Cursor trail on home page

- **Files**:
  - `lib/hooks/useCursorTrail.ts`
  - `app/page.tsx`

- **Summary**:
  - Created `useCursorTrail` to render small blue slivers following the cursor.
  - Used fixed viewport coordinates and fading opacity over ~2 seconds.

#### 4.3 Navbar & mobile tweaks

- **Files**:
  - `components/layout/Navbar.tsx`
  - `app/layout.tsx`

- **Summary**:
  - Added a mobile **burger menu** using `DropdownMenu` components.
  - Fixed horizontal scrolling on mobile by tightening layout and using `overflow-x-hidden`.
  - Swapped the plain “Q” logo for an image-based logo (with asset prefix-aware paths).

#### 4.4 Quip responses UI

- **Files**:
  - `components/quips/ResponseCard.tsx`
  - `components/dashboard/feedback-list.tsx`

- **Summary**:
  - Response cards now show:
    - Department badge with color coding.
    - A user name badge derived from `quip_response_user_name` (or fallbacks like “Anonymous”).
    - Sentiment emoji and relative time (“0m ago”, “2h ago”, etc.).
  - Fixed bugs where `true` / `false` was displayed instead of the user name.

---

### 5. Data fixes and normalizations

- **Files**:
  - `lib/api.ts`
  - `components/quips/RespondModal.tsx`
  - `types/index.ts`

- **Summary**:
  - Ensured `user_id` in quip responses is numeric (e.g. `1`, `2`) instead of `"user-1"`.
  - Added `is_anonymous?: boolean` and `user_name?: string` to `QuipResponse`.
  - `RespondModal` sends `is_anonymous` and passes through the real `user_id`.

---

### 6. Known issues / open questions

- Intermittent React hydration warning **#418** (“HTML” mismatch) observed around response rendering.
  - Likely related to server/client differences when data from Sheets is missing or shaped differently.
  - When rebuilding, pay attention to:
    - Deterministic rendering between server and client.
    - Defensive handling of undefined dates / names / sentiments.

---

### 7. How to reapply pieces later

When you are ready to reintroduce some of this work on top of commit `4090c7e`:

1. Start from the sections above that you care about (e.g. Google Sheets integration, cursor trail, mobile nav).
2. Use this doc plus the git range commands (`git log` / `git diff`) to see exact code that was previously used.
3. Reimplement the pieces incrementally, testing each one before moving on.

