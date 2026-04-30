# AI Agent Instructions for AMT Website

## Build and Run Commands
- Development server: `npm start` (serves on localhost:4200 with hot reload)
- Unit tests: `npm test` (Karma on port 9876)
- Production build: `npm run build` (output to `dist/amt_website/`)
- SSR server: `npm run serve:ssr:amt_website` (Express on port 4000)

## Architecture Overview
- **Framework**: Angular 19.2.0 with standalone components (no NgModules)
- **SSR**: Configured with @angular/ssr but disabled in production build
- **UI**: Bootstrap 5.3.8, Leaflet maps, custom CSS
- **Data**: Google Sheets CSV as headless CMS for calendar and mural content
- **Auth**: Simple password guard for protected routes (/mural, /apostila)
- **Hybrid**: Separate React prototype in `/redesign/` folder (not integrated into main app)

## Key Conventions
- Use `providedIn: 'root'` for singleton services
- Check `isPlatformBrowser(PLATFORM_ID)` before DOM operations for SSR compatibility
- Image URLs: Convert Google Drive links to thumbnail format
- Forms: Reactive with manual error handling
- Selectors: All prefixed with `app-`

## Potential Pitfalls
- Google Sheets API may be unavailable; add error handling
- EmailJS credentials are hardcoded; move to environment variables
- Auth state resets on page reload; consider localStorage
- Leaflet maps load on demand; preload if needed
- SSR setup exists but unused; enable or remove dependencies

## Related Documentation
- [README.md](README.md) - Standard Angular setup and CLI commands
- Key components: [landing-page](src/app/pages/landing-page/), [calendario.service](src/app/services/calendario.service.ts)

## Gemini Integration Notes
Since 'gemini' was specified, note that no AI integration currently exists. If adding Gemini AI features, ensure compatibility with Angular's change detection and avoid direct DOM manipulation in AI-generated content.</content>
<parameter name="filePath">c:\Users\jawst\Desktop\amt_website\AGENTS.md