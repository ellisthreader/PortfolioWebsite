# ellisthreader.com — Full Frontend Redesign Plan

Prepared 22 September 2026. Baseline: `main` @ `dbf1a46`, which is exactly what Railway is serving
(project `loving-recreation`, service `PortfolioWebsite`, deployment of 13 Jul 2026 — verified).

> **Status (22 Sep 2026): implemented on the `redesign` branch, not yet deployed.**
> Built with the recommendations in §10 (light-first, green, no accounts, featured: HKE, Bear Lane,
> Vibyra, AI Voice Assistant). Changes from this plan while building:
> - 4 projects are hidden (`"hidden": true` in `resources/content/projects.json`): Uplifta, AI Resume
>   Builder, Checkmate AI, Drone Scan. No source code was found and their only images were
>   AI-generated mockups with garbled text and invented figures.
> - Projects without a real screen (AI Voice Assistant, Service Priority AI, Property Digital Twin)
>   get a system-diagram cover instead of an image.
> - Property Digital Twin screenshots are held back (`resources/images/work/_held-back/`) because the
>   live demo is branded for Gilbert & Rose.
> - Every fact in the case studies was drafted from the project repos; open questions are listed per
>   project under `toConfirm` in `projects.json` (not shown on the site).
> - Mobile Lighthouse: 94–99 performance, 100 accessibility/best practices/SEO (live site today: 34).
>
> **Update (23 Sep 2026):** 10 projects, 9 featured on home. Added Focus, Phone Preview and the
> Vehicle Service Booking API (a take-home exercise, listed under "Other work", not on home).
> Diagram covers were replaced with real screens: the voice assistant is its actual egui interface
> rendered from `ui.rs` with sample state, Service Priority AI uses the repo's own dashboard
> screenshots, and Property Digital Twin shows the unbranded 3D viewer and studio. The diagrams
> moved into each case study's "How it works" section.
>
> **Update (23 Sep 2026, later):** Focus, Phone Preview, Service Priority AI and Property Digital
> Twin are hidden again (content kept in `projects.json`, images in `_held-back/`). RelayClarity gets
> a full-width spotlight band on the home page that inverts the theme, led by its real Calls console
> (a live AI-handled phone call) captured from the app running locally, plus a four-step call flow.

---

## 1. What's wrong today (audit)

I went through every page of the live site and the code behind it. The problems fall into two groups:
the look, and things that quietly make you look unprofessional regardless of the look.

### 1a. Why it reads as "cartoony"

| Element | Where | Problem |
| --- | --- | --- |
| Purple 3D mannequin at a desk | Hero (`head-tracking-model/*`, `desk-corner-canvas.tsx` — 2,165 lines) | A faceless toy figure is the first thing people see. It says "game", not "engineer". |
| Neon fuchsia everywhere | Name, stats, headings, glows, timeline beam | Glow + magenta gradients are the visual language of gaming/streamer sites. |
| Gradient headings "My Experience / My Projects / My Tech Stack" | Every section, centred | Template-feel; "My ___" headings are filler. |
| 👋 "Hello, I'm" | Hero | Casual/chatty in the one spot that should establish credibility. |
| Count-up stats "10+ Projects / 2+ Years / 5+ Technologies" | Hero | Small numbers presented as achievements undersell you (you list 23 technologies). |
| Glowing timeline beam + orb | Experience | Decorative; the content (2020 Microsoft Office, 2021 Roblox) undermines seniority. |
| Holographic wireframe sphere with logos | Tech stack | Hard to read, gimmicky, hides the information. |
| 7,000px scroll-jacked project carousel | Projects | You have to scroll a long way to see 8 projects; images are baked onto neon backgrounds. |
| Loading screen (min 1.2s) + scroll lock | First visit | Makes you wait before you've seen anything. |
| Inconsistent project imagery | Home + /projects | Neon teddy bears, glowing tills, blurred colour blobs where images failed to load, mixed mockup styles. |

### 1b. Credibility problems (these matter as much as the visuals)

1. **The contact form almost certainly isn't emailing you.** Railway has no `MAIL_MAILER` set, so Laravel
   falls back to the `log` driver — messages get written to a log file, not your inbox.
2. **"Download CV" downloads `/AIResume.png`** — a screenshot of your AI Resume Builder project, not your CV.
3. **LinkedIn, X and Instagram links go to the generic homepages** (`linkedin.com`, `x.com`, `instagram.com`).
4. **Browser tab says "Home - Laravel"**, and the favicon is the Laravel logo. `APP_NAME` isn't set.
5. **No meta description, no Open Graph tags** — links shared on LinkedIn/Slack/iMessage show a bare URL.
6. **Anyone can create an account** at `/register` (Fortify registration is on, live, returns 200). A
   portfolio doesn't need public sign-up, dashboard or settings pages.
7. **Stale copy**: "Booking summer 2026" (it's late September).
8. **Factual mismatch**: the AI Voice Assistant card says "Python"; the `LLM-Assistant` repo is Rust + Shell.
9. **Weight**: ~546 KB of JS/CSS preloaded on first visit (including chunks for settings/security pages
   the visitor never sees), plus a 1.7 MB 3D model and three.js. `public/` is 119 MB (duplicate PNGs,
   9 unused videos, backup `.glb` files, a file called `ChatGPT Image Apr 18, 2026, 04_40_08 PM.png`).
10. Contact form asks for a "Title" rather than your visitor's name.

---

## 2. Who the site is for, and its one job

- **Audience 1 — hiring managers / recruiters** (UK tech companies). They spend 30–90 seconds. They need:
  who you are, what level you work at, proof you ship real things, and a CV.
- **Audience 2 — small businesses wanting software built** (the HKE and Bear Lane kind of client). They need:
  evidence you've built something like their thing, and that you're easy to contact.
- **The site's one job:** make both audiences think *"this person builds real, production software, end to
  end"* within the first screen, then get them into a case study or into your inbox.

Everything below serves that. The work is the hero; the design gets out of its way.

---

## 3. Design direction: "Shipped"

A calm, precise, light-first site where **your real product screens are the colour** and the interface is
quiet around them, with typography doing the personality work that the 3D model and neon tried to do.
Think of the way Apple, Linear or Stripe present product — generous space, strict alignment, real
screenshots — applied to one engineer's body of work.

### 3a. Colour

Light theme is the default; a fully designed dark theme follows the visitor's system setting.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--porcelain` (page) | `#F4F5F3` | `#121416` | Page background. Cool neutral — deliberately *not* cream. |
| `--paper` (raised) | `#FFFFFF` | `#1A1D20` | Image plates, form fields, header on scroll. |
| `--ink` (text) | `#15171A` | `#ECEDEA` | Headings and body. |
| `--slate` (secondary) | `#5C6168` | `#9BA1A6` | Metadata, captions, supporting text. ≥ 5.5:1 contrast. |
| `--rule` (lines) | `#DFE1DD` | `#2A2E32` | Hairlines between index rows, field borders. |
| `--green` (accent) | `#0E5A45` | `#5BC49E` | Links, focus rings, active nav, the "available" dot. Used sparingly. |

**Why green, not purple:** purple/violet is both the thing everyone remembers from the current site and the
default colour of AI-generated SaaS sites. A deep racing green is calm, confident, rare among developer
portfolios, has a British feel, and naturally doubles as the "available for work" signal. *If you want to
keep purple as your colour, the accent token swaps to `#4B35C4` / `#A99BFF` with no other changes.*

No gradients, no glows, no coloured shadows. Depth comes from the paper/porcelain step and one soft shadow
on image plates only.

### 3b. Typography

**One family: Mona Sans** (GitHub's open-source variable typeface, OFL licence) — self-hosted woff2,
preloaded. It has a *width* axis (75–125) as well as weight, which gives us one family with real range:

| Role | Setting | Size (desktop → mobile) |
| --- | --- | --- |
| Display (your name) | width 125 (expanded), weight 620, tracking −0.035em, line-height 0.92 | `clamp(3.5rem, 10vw, 9rem)` |
| Page title (h1) | width 112, weight 600, tracking −0.025em | `clamp(2.5rem, 5.5vw, 4.25rem)` |
| Section title (h2) | width 100, weight 600, tracking −0.015em | `2rem → 1.625rem` |
| Item title (h3) | width 100, weight 600 | `1.375rem → 1.25rem` |
| Lead | weight 400, line-height 1.45 | `1.3125rem → 1.1875rem` |
| Body | weight 400, line-height 1.6, max 68ch | `1.0625rem` (17px) |
| Meta / captions | weight 450, `--slate`, sentence case, tabular numerals for years | `0.875rem` |

Rules: sentence case everywhere (no tracked-out ALL-CAPS labels), no gradient text, no single-word colour
accents in headings, everything left-aligned (no centred section headings).

### 3c. Layout

- 12-column grid, content max-width 1280px, 24px gutters; 20px side padding on mobile.
- Vertical rhythm: sections separated by 160px desktop / 96px mobile. Spacing scale 4-8-12-16-24-32-48-64-96-160.
- Radius by hierarchy, not one radius on everything: image plates 14px, inputs/buttons 10px, tags 6px.
- Project images always sit in a consistent **plate**: 16:10, `--paper` background, 1px `--rule` border,
  one soft shadow, screen centred with even padding. Same frame for every project = instantly professional.

### 3d. Motion — one moment, then stillness

- **The one orchestrated moment:** on first load your name sets itself — Mona Sans animates from width 75
  to 125 and weight 400 to 620 over ~900ms, like the type is settling into place. Pure CSS
  (`font-variation-settings`), zero JS, no layout shift. That's the memorable thing; nothing else competes.
- Everything else only moves in response to the visitor: work-index hover previews crossfade (180ms),
  nav underline, copy-email confirmation, form states, focus rings.
- No scroll-triggered fade-ups, no loading screen, no count-ups, no parallax, no WebGL.
- `prefers-reduced-motion`: name renders in its final state, crossfades become instant.

### 3e. The one live, authentic detail

A single line under the hero: **"Last pushed to *Vibyra* 3 hours ago"** — pulled from your public GitHub
activity by Laravel, cached for 15 minutes (no API key needed, no rate-limit risk, falls back to nothing if
GitHub is down). It shows you're actively building, and no template has it.

### 3f. What I rejected, and why

| Considered | Rejected because |
| --- | --- |
| Keep 3D, make it "realistic" | Still a gimmick, still 2 MB+, and a realistic avatar of you is uncanny. A real photo does the job better. |
| Dark background + one bright accent | That's what you have now, and it's the most common "developer portfolio" look. |
| Cream background + serif headlines | The current default for AI-generated sites, and it reads "writer", not "engineer". |
| Grid of identical rounded cards | That's the current `/projects` page — it flattens every project to the same weight. |
| Keep purple | See 3a. Offered as a one-token swap if you'd rather. |

---

## 4. Site structure (new)

| URL | Page | Status |
| --- | --- | --- |
| `/` | Home | Rebuilt |
| `/work` | All work (index) | Replaces `/projects` (301 redirect kept) |
| `/work/{slug}` | Case study, one per project | **New** — the biggest credibility upgrade |
| `/about` | About, experience, CV | **New** (currently a home-page section) |
| `/contact` | Contact | Rebuilt |
| 404 / 500 | Error pages | **New** (currently Laravel defaults) |
| `/login`, `/register`, `/dashboard`, `/settings/*` | Starter-kit auth | **Remove** public registration; recommend removing dashboard/settings entirely (decision D7) |

Header on every page: `Ellis Threader` wordmark (left) — `Work` `About` `Contact` (right). Sticky; gains a
`--paper` background + hairline once you scroll. Mobile: same three links inline (no hamburger needed for 3 links).

---

## 5. Page-by-page design

### 5.1 Home `/`

```
┌────────────────────────────────────────────────────────────────────────┐
│ Ellis Threader                                   Work   About   Contact │  sticky header
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  Ellis                                                                 │  display type,
│  Threader                                                              │  width-axis intro
│                                                                        │
│  Software engineer in London. I design and build web platforms,        │  lead, 2 lines
│  AI voice systems and mobile apps, from the database to the interface. │
│                                                                        │
│  [ View work ]  [ Get in touch ]           ● Last pushed to Vibyra 3h ago │
│                                                                        │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │                                                                    │ │  first project plate
│ │                    HKE EPOS — plate (16:10)                        │ │  starts ABOVE the fold
├─┴────────────────────────────────────────────────────────────────────┴─┤  on a 1440×900 screen
│  HKE restaurant system                 Ordering, till, kitchen display │
│  Client project, 2025                  and payments in one system.     │
│                                                                        │
│ ┌───────────────────────────────┐  ┌───────────────────────────────┐   │
│ │      Bear Lane — plate        │  │       Vibyra — plate          │   │  2-up
│ └───────────────────────────────┘  └───────────────────────────────┘   │
│  Bear Lane                           Vibyra                            │
│  Custom-embroidery e-commerce…       Phone-first coding command…       │
│                                                                        │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │                AI Voice Assistant — plate                          │ │  full width
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                     See all 11 projects │
│                                                                        │
│  What I build                                                          │  h2
│  ┌ Web platforms ──────┐ ┌ AI systems ─────────┐ ┌ Mobile & devices ─┐ │  3 columns, text only,
│  │ Customer sites,     │ │ Voice agents, LLM   │ │ React Native apps │ │  hairline top border
│  │ admin back offices, │ │ features in real    │ │ and software on   │ │
│  │ and the APIs behind │ │ products, ML        │ │ real hardware.    │ │
│  │ them.               │ │ pipelines.          │ │                   │ │
│  │ Laravel, React, TS, │ │ Python, Rust, STT/  │ │ React Native,     │ │
│  │ MySQL, PostgreSQL   │ │ TTS, Azure ML…      │ │ Expo, Raspberry Pi│ │
│  └─────────────────────┘ └─────────────────────┘ └───────────────────┘ │
│                                                                        │
│  [photo]   I'm Ellis, a software engineer based in London. I started   │  short about teaser
│            out building games on Roblox… (3–4 lines)   More about me   │  → /about
│                                                                        │
│  Have a project or a role in mind?                                     │  closing CTA, large
│  ellis.threader3001@gmail.com   [Copy]   [Send a message]              │
├────────────────────────────────────────────────────────────────────────┤
│  Ellis Threader, London        GitHub  LinkedIn  CV        © 2026      │  footer, one row
└────────────────────────────────────────────────────────────────────────┘
```

- Featured projects: 4, laid out 1 / 2 / 1. Each plate links to its case study; the title underlines on hover.
  No hover zoom, no card lift.
- "What I build" replaces the holographic sphere: readable, scannable, honest. No logo cloud.
- Removed from home: loading screen, 3D scene, stats, social rail, experience timeline (moves to `/about`).

### 5.2 All work `/work`

```
│  Work                                                                  │
│  Client platforms, AI systems and apps I've designed and built.        │
│  All (11)   Client work (2)   Products (5)   AI systems (4)             │  filter — real buttons,
│ ──────────────────────────────────────────────────────── ┌──────────┐ │  URL-synced (?type=)
│  HKE restaurant system     Restaurant EPOS       2025     │          │ │
│ ──────────────────────────────────────────────────────── │ preview  │ │  sticky preview panel:
│  Bear Lane                 E-commerce            2025     │ (hovered │ │  crossfades to the
│ ──────────────────────────────────────────────────────── │  row)    │ │  hovered/focused row
│  Vibyra                    AI coding tool        2026     └──────────┘ │
│ ──────────────────────────────────────────────────────────────────────  │
```

- Desktop: typographic index rows (title, one-word type, year), hairline between rows; hovering *or keyboard
  focusing* a row shows its plate in a sticky preview panel. This is the one interaction-led flourish.
- Mobile: each row becomes a thumbnail + title + type stack (no hover dependence).
- Every row links to `/work/{slug}`.

### 5.3 Case study `/work/{slug}` (new)

```
│  Back to all work                                                      │
│                                                                        │
│  Bear Lane                                                             │  h1
│  Custom-embroidery e-commerce with a full admin back office.           │  lead
│                                                                        │
│  Role              Client            Year        Stack                 │  4-column facts row
│  Full-stack        Bear Lane         2025        Laravel, React,       │
│  engineer                                        TypeScript, MySQL     │
│  [ Visit site ]  [ View code ]                                         │  only if links exist
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │                        hero plate                                  │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│  The brief            2–3 short paragraphs, 68ch max                   │  2-col: label left
│  What I built         Feature list, each with a small plate            │  (3 cols), body right
│  How it works         Optional architecture diagram (SVG)              │  (8 cols)
│  Outcome              Real numbers only, or omitted                    │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                     │  gallery
│  Next project: Vibyra                                                  │  large link to next
```

- One template for all 11. Sections are optional so thin projects still look complete.
- Each case study gets its own page title, meta description and Open Graph image (server-rendered, see §7.3).
- Content for these needs your input (brief, what you built, outcomes) — I'll draft from the repos
  (Bear-Lane-Project, Vibyra, RelayClarity, LLM-Assistant, Azure-Service-Triage-AI, HKE) and you correct.

### 5.4 About `/about` (new)

```
│  About                                                                 │
│  ┌──────────────┐   I'm Ellis, a software engineer based in London.    │
│  │   portrait   │   (bio, ~150 words, first person, plain)             │
│  │   (4:5)      │                                                      │
│  └──────────────┘   [ Download CV (PDF) ]   GitHub   LinkedIn          │
│                                                                        │
│  Experience                                                            │
│  2025–now    Freelance software engineer      Full-stack builds for    │  a real sequence, so
│              HKE, Bear Lane                   restaurants and retail   │  years are the markers
│  2024        AI engineering                   Chatbots, agents, API…   │
│  2023        Started programming              Python fundamentals…     │
│  2021–2022   Roblox development & design      Lua, freelance visuals   │
│                                                                        │
│  Tools I use   (plain grouped lists: Languages / Frameworks / Infra)   │
│  Education     (if you want it shown — decision D5)                    │
```

- The 2020 "Microsoft Office Skills" entry is removed; Roblox becomes the honest origin story, not a headline.

### 5.5 Contact `/contact`

```
│  Contact                                                               │
│  Tell me what you're building, or about the role.                      │
│  ┌ 5 cols ─────────────────────┐   ┌ 7 cols ─────────────────────────┐ │
│  │ ● Available for new work    │   │ Name              Email         │ │
│  │   from October 2026         │   │ What's it about?                │ │
│  │                             │   │ (Freelance project / Full-time  │ │
│  │ Email                       │   │  role / Something else)         │ │
│  │ ellis.threader3001@…  Copy  │   │ Message                         │ │
│  │                             │   │                                 │ │
│  │ I reply within one working  │   │ Attach files (optional)         │ │
│  │ day. London, UK (GMT/BST).  │   │                   [Send message]│ │
│  │ GitHub   LinkedIn           │   └─────────────────────────────────┘ │
```

- Fields: Name, Email, Topic (select), Message, Attachments (optional; keep existing 5 × 5 MB limits).
- Inline validation messages that say how to fix it ("Enter an email address like name@example.com").
- Success replaces the form with "Message sent. I'll reply to {email} within one working day."
- Backend: `ContactRequest` gets `name` + `topic`; mail template updated; honeypot field + rate limit
  (`throttle:5,1`) to stop spam once real email delivery is on.

### 5.6 Error pages

404 and 500 in the same system: big type ("This page doesn't exist"), one line of help, links to Work and
Home. Wired through Inertia's exception handler so they share the header/footer.

---

## 6. Content rewrite

All copy gets rewritten in plain, specific, first-person language. Rules: say what it is and what it does;
no "elegant", "polished", "premium", "refined", "seamless"; one-sentence summaries ≤ 140 characters; real
numbers or none.

| Item | Now | Proposed (draft — you confirm facts) |
| --- | --- | --- |
| Hero | "👋 Hello, I'm / Ellis Threader / FULL STACK DEVELOPER / I build modern, responsive and high-performance web applications with clean code and great UX." | "Ellis Threader" / "Software engineer in London. I design and build web platforms, AI voice systems and mobile apps, from the database to the interface." |
| EPOS | "A fully integrated EPOS platform combining…" (46 words) | "Ordering, till, kitchen display and payments for a restaurant, in one Laravel and React system." |
| AI Voice Assistant | "An elegant voice assistant platform…" | "A Raspberry Pi voice assistant: wake word, speech-to-text, an LLM and streaming speech back, in about three seconds." (Rust, not Python) |
| Section headings | "My Experience", "My Projects", "My Tech Stack" | "Selected work", "What I build", "Experience" |
| Contact CTA | "Let's Build Something Thoughtful" | "Have a project or a role in mind?" |

Project categories for filtering (proposal — decision D6): **Client work**: HKE EPOS, Bear Lane. **Products**:
Vibyra, RelayClarity, Uplifta, AI Resume Builder, Checkmate AI. **AI systems**: AI Voice Assistant, Property
Digital Twin, Service Priority AI. **Drone Scan Company**: need to know if it's built or a concept.

Featured on home (proposal): HKE EPOS, Bear Lane, Vibyra, AI Voice Assistant — two real clients plus two
technically distinctive builds.

---

## 7. Technical architecture

### 7.1 Content model — one source of truth

`resources/content/projects.json`, read by Laravel (`App\Support\Portfolio\ProjectRepository`) and passed to
pages as Inertia props. Keeping it server-side means PHP can render per-page meta tags (§7.3).

```ts
type Project = {
    slug: string;                  // 'bear-lane'
    title: string;
    summary: string;               // ≤ 140 chars
    type: 'client' | 'product' | 'ai-system';
    year: string;                  // '2025' | '2024–2025'
    role: string;                  // 'Full-stack engineer'
    client?: string;
    stack: string[];
    links?: { live?: string; repo?: string };
    featured?: number;             // order on home; omit = not featured
    cover: string;                 // image key → responsive set
    gallery?: { image: string; caption: string }[];
    caseStudy?: {
        brief?: string[];
        built?: { title: string; body: string; image?: string }[];
        architecture?: string;     // optional SVG key
        outcome?: string[];
    };
};
```

### 7.2 Frontend structure

```
resources/js/
  pages/                home.tsx, work/index.tsx, work/show.tsx, about.tsx, contact.tsx, error.tsx
  layouts/site-layout.tsx          header + <main> + footer, skip link
  components/site/                 site-header, site-footer, container, section, plate,
                                   picture (srcset), work-index, work-filter, project-facts,
                                   github-activity, copy-email, contact-form, button, field
resources/css/
  app.css                          tokens, @font-face, base, prose
```

- Delete `resources/js/features/welcome/**` (≈9,000 lines incl. the 2,165-line desk scene) and the four
  glow/animation CSS partials.
- Remove dependencies: `three`, `@react-three/fiber`, `@react-three/drei`, `@google/model-viewer`,
  `framer-motion` (CSS handles the little motion that's left), plus unused Radix pieces if dashboard goes.
- Remove the `/home-model` route and `storage/assets/*.glb`.
- Keep: Laravel 13, Inertia 3, React 19, TypeScript, Tailwind 4, Vite 8, existing lint/format tooling.

### 7.3 SEO and sharing

- Title template hard-coded: `"{Page} — Ellis Threader"`; home is `"Ellis Threader — Software engineer, London"`.
- `app.blade.php` renders `<meta name="description">`, canonical, Open Graph and Twitter tags from view
  data set per route — server-rendered, because LinkedIn/X/Slack scrapers don't run JavaScript.
- Per-project OG images (1200×630) generated at build time by a script (sharp + an SVG template: title,
  summary, cover). Designed site-wide OG card for other pages.
- JSON-LD `Person` on home, `CreativeWork` on case studies. `sitemap.xml` route. New favicon: an "ET"
  monogram in Mona Sans on green, SVG + PNG + apple-touch.

### 7.4 Images

- Recapture project screens cleanly at 2880px wide: I can screenshot the live Railway deployments (HKE,
  Bear Lane, RelayClarity, Vibyra, Service Priority AI) with the browser. Others need source files from you
  or re-composition of existing images onto neutral backgrounds (no neon).
- Extend `scripts/optimize-project-images.mjs`: `resources/images/work/<slug>/*.png` →
  `public/images/work/<slug>/<name>-{640,1280,1920}.{avif,webp}`.
- `<Picture>` component: `srcset`/`sizes`, explicit width/height (no layout shift), `fetchpriority="high"`
  on the first plate, lazy everywhere else.
- Delete unused `public/` files (videos, `.glb`, PNG originals, `generated/`) → target `public/` < 15 MB.

### 7.5 Budgets (checked before launch)

| Metric | Target |
| --- | --- |
| Lighthouse mobile — Performance / Accessibility / Best Practices / SEO | ≥ 95 / 100 / 100 / 100 |
| Largest Contentful Paint (mobile, 4G) | < 1.8s |
| Home JS (gzip) | < 90 KB (from ~546 KB preloaded + lazy three.js) |
| Cumulative Layout Shift | < 0.02 |
| Total home page weight | < 700 KB |

### 7.6 Accessibility (quality floor)

WCAG 2.2 AA: contrast verified on both themes, visible green focus ring on every interactive element, skip
link, one `h1` per page with ordered headings, filter and index usable by keyboard, hover preview also on
focus, form errors linked with `aria-describedby`, reduced-motion respected, zero axe violations.

---

## 8. Non-visual fixes bundled into the redesign

| # | Fix | Needs you? |
| --- | --- | --- |
| F1 | Real email delivery for the contact form — Resend (free tier, first-party Laravel driver) or Gmail SMTP app password; set `MAIL_MAILER`, `MAIL_FROM_ADDRESS`, key on Railway; add a feature test with `Mail::fake()` | Yes — create the Resend account/key or app password |
| F2 | Set `APP_NAME="Ellis Threader"` on Railway + hard-code title template | Approval to change Railway vars |
| F3 | Real CV as PDF at `/Ellis-Threader-CV.pdf` | Yes — send me the CV |
| F4 | Real LinkedIn URL; remove X/Instagram unless you want them (and send URLs) | Yes — URLs |
| F5 | Disable public registration (`Features::registration()` off); update/remove the auth tests accordingly | Decision D7 |
| F6 | Remove "Booking summer 2026"; availability text driven by one config value | Your availability date |
| F7 | Correct AI Voice Assistant stack (Rust) and audit every project's stack against its repo | I'll do it; you confirm |
| F8 | `/projects` → `/work` 301 redirect so existing links keep working | No |

---

## 9. Delivery phases

All work happens on a `redesign` branch. Nothing is pushed, merged or deployed without your go-ahead.

**Phase 0 — Decisions and content (you + me, short)**
Answer D1–D8 below; send CV, LinkedIn URL, optional photo, and any facts/numbers for the featured projects.

**Phase 1 — Direction proof (gate)**
Build the new home hero + first two project plates + header/footer for real in the app, with both themes.
I screenshot it at 1440, 1024, 768 and 390 widths. You approve or redirect **before** I rebuild everything.

**Phase 2 — Foundation**
Tokens, Mona Sans self-hosted, site layout, base components (button, field, plate, picture, section),
content model + `ProjectRepository`, routes (`/work`, `/work/{slug}`, `/about`, redirects), server-rendered
meta, remove 3D/loader/glow code and dependencies, disable registration.

**Phase 3 — Pages**
Home → Work index (filter + hover/focus preview) → Case study template → About → Contact (form + backend
changes) → 404/500. Each page screenshotted at 4 widths × 2 themes and self-reviewed against this plan.

**Phase 4 — Content and imagery**
Recapture screenshots, run the image pipeline, write all 11 case studies (drafted from repos, corrected
by you), OG images, favicon set.

**Phase 5 — Quality pass**
`npm run types:check`, `lint:check`, `format:check`, `php artisan test` (new tests for `/work`,
`/work/{slug}`, unknown slug → 404, `/projects` redirect, contact mail sent, honeypot/rate limit).
Lighthouse + axe on every page, keyboard walk-through, reduced-motion check, Safari/Chrome/Firefox,
real iPhone check. Fix until budgets in §7.5 are met.

**Phase 6 — Launch**
Deploy the branch to a Railway preview environment for you to click through on your phone and laptop.
On your approval: set mail/app-name vars, merge to `main` (Railway auto-deploys), verify live, send a
test contact message, update README screenshots.

---

## 10. Decisions I need from you

| # | Decision | My recommendation |
| --- | --- | --- |
| D1 | Light-first (with dark following system) or dark-first? | Light-first — cleaner and more "business" for recruiters and clients |
| D2 | Accent: racing green or keep a (grown-up) purple? | Green |
| D3 | Use a real photo of you on About (and small on home)? | Yes — a well-lit, plain-background portrait builds trust; the site works without one |
| D4 | Which 4 projects are featured on home? | HKE EPOS, Bear Lane, Vibyra, AI Voice Assistant |
| D5 | Show education on About? | Your call — send details if yes |
| D6 | Is "Drone Scan Company" built or a concept? Keep AI Resume Builder / Checkmate AI? | Only list things you can show working |
| D7 | Remove login/register/dashboard/settings entirely? | Yes — the site has no use for accounts |
| D8 | Case studies for all 11, or only the strongest 6 and a simple entry for the rest? | Strongest 6 in full; the rest get a short page |
