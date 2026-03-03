# LeagueMatch Modernization

## Completed
- [x] Phase 0: Vite + React 19 + TS 5.7 scaffolding
- [x] Phase 1: DDragon dynamic version + data hooks (staleTime: Infinity)
- [x] Phase 2: Summoner search, ranked, mastery (parallel queries)
- [x] Phase 3: Match history with parallel match detail fetching (useQueries)
- [x] Phase 4: Champion browser + detail pages with stat bars
- [x] Phase 5: Supabase auth (email + Google OAuth), favorites, search history
- [x] Phase 6: Navbar, CSS Modules, responsive, tooltips, code-split pages

## Verification needed
- [ ] Supabase project setup (tables: profiles, favorite_champions, search_history)
- [ ] Update .env with real Supabase URL + anon key
- [ ] Test summoner search with known accounts
- [ ] Test champion browser filtering
- [ ] Test auth flow (signup, login, Google)
- [ ] Test favorites add/remove
- [ ] Responsive check at 320px, 768px, 1024px, 1440px
- [ ] Deploy to hosting (Netlify/Vercel)

## Build stats
- TypeScript: 0 errors
- Vite build: 4.97s
- 126 npm packages (down from ~50+ old deps)
- Bundle: ~135KB gzipped (main chunk)
