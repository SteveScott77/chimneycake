# Chimney Cake Shop

Landing page for the Chimney Cake Shop, implemented in React (Vite) from the
[Figma design](https://www.figma.com/design/VBgvRGcTnsJ9aNrlh2CiJ4/Chimney-cake?node-id=13688-71).

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Structure

- `src/App.jsx` — all page sections (Header, Hero, What is, Meet the Cone,
  Classic experience, Why you can't skip, Locations, Gallery, Reviews, FAQ,
  Footer). Section content lives in data arrays at the top of the file.
- `src/index.css` — design system (CSS variables for the dark palette) and all
  component styles. Responsive down to mobile.
- `public/assets/` — images exported from Figma (logo, banner, product photos,
  location photos, gallery).

## Design tokens

| Token | Value |
| --- | --- |
| Background | `#1f1c1c` |
| Text | `#dacbcb` |
| Accent / muted | `#857979` |
| Card | `#342f2f` |
| Border | `#514a4a` |
| Pistachio green | `#79a756` |
| Font | Rubik |

Interactive bits (cone flavour accordion, location cards, flavour carousel,
FAQ accordion, gallery dots) are wired with local React state.
