# Double D's Burgers

Website for Double D's Burgers food truck. Built with **Vite + React 19 + TypeScript**, plain CSS per component, icons from `lucide-react`.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run lint
```

## Where to edit

| What | File |
|---|---|
| Phone, email, address, Instagram handle, Behold feed ID | `src/siteConfig.ts` |
| Menu items and prices | `src/menu.ts` |
| Colours, fonts, buttons | `src/index.css` |
| Each section | `src/components/*.tsx` + matching `.css` |

### Live Instagram feed

Create a free feed at [behold.so](https://behold.so), connect the Instagram account, and paste the Feed ID into `instagram.beholdFeedId` in `src/siteConfig.ts`. Until then the section shows placeholder tiles linking to the profile.

## Hosting (Netlify)

In Netlify: **Add new site → Import an existing project → GitHub → DoubleDBurgers**. Netlify detects Vite automatically (build command `npm run build`, publish directory `dist`). Every push to `main` redeploys.
