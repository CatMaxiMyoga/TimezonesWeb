# TimezonesWeb

Mobile-first PWA companion to TimezonesAndroid.

## Development

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Structure

- `src/App.tsx` — application state, navigation, and screen composition
- `src/components/` — person editor, timezone reorder, time comparison, icons
- `src/data/` — IndexedDB schema and data models
- `src/localization/` — English and German strings
- `src/utils/` — timezone, phase, date, and time formatting
- `src/App.css` — original UI styling, unchanged
- `.github/workflows/deploy.yml` — automatic GitHub Pages deployment

## Deploying to GitHub Pages

1. Create a **public** GitHub repository named `TimezonesWeb`.
2. Push this project to its `main` branch.
3. Open **Settings → Pages → Build and deployment**, and select **GitHub Actions** as the source.
4. Wait for the **Deploy TimezonesWeb to GitHub Pages** workflow to complete under Actions.
5. Visit `https://catmaximyoga.github.io/TimezonesWeb/`.

The Vite base URL and PWA manifest assume the repository is named `TimezonesWeb`.
If you rename the repository, update `base`, `start_url`, and `scope` in `vite.config.ts`.

GitHub Pages hosts the static build. People and timezones remain stored locally
in each user's browser using IndexedDB; there is no account or server database.

To publish future changes, push to `main`. GitHub Actions will rebuild the site.
