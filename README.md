# Sangeet Shraavana — Website

A lightweight static website for Sangeet Shraavana, the classical music and dance program run by Dr. Ishwar Koujalgi Memorial Charitable Trust, Bidar. Built with HTML5, Tailwind CSS (via CDN), and vanilla JavaScript. No build step, no framework, no backend.

## Running locally

Because the JavaScript files are loaded with plain `<script src="...">` tags (not ES modules), you can usually just **double-click `index.html`** to open it directly in a browser.

If your browser blocks local file access for any reason, use VS Code's **Live Server** extension instead:

1. Install the "Live Server" extension in VS Code.
2. Right-click `index.html` in the file explorer.
3. Choose **"Open with Live Server."**

## Editing content

All editable copy — faculty bios, events, gallery captions, testimonials, contact details — lives in one place:

```
js/content.js
```

Edit the `SITE_CONTENT` object there. Every page pulls from this file, so you never need to hunt through HTML to update copy.

## Folder structure

```
sangeet-shraavana/
├── index.html            ← home page
├── about.html             ← about page
├── faculty.html           ← faculty page
├── events.html            ← events page
├── gallery.html           ← gallery page
├── registration.html      ← registration form
├── contact.html           ← contact page
├── css/style.css         ← design tokens, gradients, custom treatments
├── js/
│   ├── content.js        ← all editable site content (single source of truth)
│   ├── layout.js          ← shared header, mobile nav, footer (renders on every page)
│   ├── main.js            ← header scroll, scroll reveal, back-to-top, FAQ
│   ├── slider.js          ← hero slider
│   ├── faculty.js         ← faculty card rendering
│   ├── events.js          ← event card rendering (list, homepage grid, and popup)
│   ├── gallery.js         ← gallery grid + lightbox
│   ├── modal.js           ← shared popup used by events
│   ├── decor.js           ← floating note + corner instrument decoration
│   ├── music.js           ← background flute music + floating play/pause button
│   └── form.js            ← form validation (no backend connected — see TODO in file)
├── assets/audio/krishna-flute.mp3  ← background music (change `SRC` in js/music.js to swap it)
└── assets/images/         ← add your images here, matching the paths in content.js
```

## Adding images

Drop images into the matching subfolder under `assets/images/` (e.g. `assets/images/faculty/faculty-1.jpg`) using the exact filename referenced in `content.js`. Until real images are added, placeholder images render automatically so the layout never breaks.

## Background music

The flute track starts on every page. Browsers don't allow sound to begin without a tap, click or key press, so on most devices it begins at the visitor's first tap/click (scrolling alone doesn't count). The song continues from the same spot when moving between pages, and the round button at the bottom-left pauses it for good until the visitor turns it back on. Volume and fade-in are set at the top of `js/music.js`.

## Notes

- The contact form validates on the frontend only. It currently simulates a submission — see the `TODO` comment in `js/form.js` for where to connect a real backend endpoint.
- Colors, fonts, and the signature gradient are defined as CSS custom properties in `css/style.css` and mirrored into `tailwind.config` inside each page's `<head>`, so they stay in sync.
- Header and footer navigation are rendered once from `js/layout.js` + `SITE_CONTENT.navigation`, so adding/removing a page from the menu only needs editing in one place.
- The primary call-to-action across the site ("Contact Us") links to `contact.html`.
