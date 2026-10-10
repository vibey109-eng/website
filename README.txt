月星談 (Lithos) — Page overview
================================

index.html    — Main hero (untouched — visuals/copy/images kept exactly as is)
stars.html    — Twelve Stars collection (centered intro + 3x4 hover/scroll grid)
course.html   — Curriculum (centered intro + 3 chapter cards)
company.html  — About (centered intro + 3 feature cards + brand story)
notice.html   — Notice board (centered intro + hover-slide announcement list)
brand.html    — Brand story (centered intro + 3 alternating image/text blocks)
signup.html   — Sign up form (centered, glass-card form)
start.html    — Star finder (centered, glass-card form)

style.css     — Shared fonts, keyframes, and the "Stars-page" visual language:
                .hero-fade-in (load-in text), .reveal (scroll-in reveal),
                .tile-card (image hover-zoom + glow), .glass-card (hover-lift
                panel), .notice-row (hover slide-in bar), .glow-input (focus glow)
common.js     — Shared scroll-reveal script (IntersectionObserver), used by
                every page except index.html and stars.html (which has its
                own inline version)
images/       — logo.png, bg1.jpg, bg2.jpg

What changed in this pass
--------------------------
- Every page other than index.html now shares the Stars page's look and
  feel: a centered fade-in intro (eyebrow + big title + subtitle), dark
  background, clean sans-serif (Inter) type, and scroll-triggered reveal
  animations with staggered delays.
- Hover interactions were added throughout: image zoom + glow on tile
  cards, lift + glow on glass cards, a sliding accent bar on notice rows,
  and a focus glow on form inputs — echoing the motion feel of the main
  hero without touching the hero itself.
- All still-placeholder content (chapters, feature stats, notices, brand
  blocks, forms) uses temporary text/images you can swap out later.
- index.html and stars.html were left exactly as they were.

Run it: open index.html directly in a browser (double-click). No build
step or local server needed — just an internet connection for the CDN
scripts, fonts, and placeholder images.
