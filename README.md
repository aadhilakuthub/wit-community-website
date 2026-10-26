# WiT Community Website — Demo

A responsive, multi-page React website concept for WiT Community, built around the supplied brand identity PDF.

## Stack
- React + TypeScript
- Vite
- React Router
- Framer Motion
- Lucide React
- Custom CSS design system

## Run locally
1. Install Node.js LTS from https://nodejs.org/
2. Extract this ZIP.
3. Open the extracted `wit-community-website` folder in VS Code.
4. Open Terminal → New Terminal.
5. Run:

   ```bash
   npm install
   npm run dev
   ```

6. Open the local URL printed in the terminal (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## Notes before public launch
- This is a frontend demo. The contact form validates locally and displays demo feedback; it does not send email.
- Team names, individual profiles, testimonials, project records, article content, and event details that were not supplied are intentionally labelled as placeholders or sample content.
- The existing Canva URL could not be retrieved by the browsing environment at build time. The website concept therefore uses the supplied brand guideline PDF and accessible public LinkedIn information as its main source references.
- The brand PDF specifies Whyte Inktrap. That font file was not supplied, so the demo uses Space Grotesk/DM Sans as a temporary web-safe visual approximation. Replace with a properly licensed web font file if the community has one.
- Several visual assets extracted from the brand PDF are included locally. The Unsplash image URLs used in some editorial cards require an internet connection.
- Confirm all copy, contact destinations, photo permissions, testimonials, project descriptions, and brand use with the WiT team before launch.
