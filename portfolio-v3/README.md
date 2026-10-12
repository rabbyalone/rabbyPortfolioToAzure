# Md Rabby Hasan — Portfolio v3

Minimalist architectural portfolio built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**, engineered to replicate the minimalist editorial design system of **[Velora](https://velora-template.framer.website/)**.

---

## 🎨 Design System Implementation (Velora Specifications)

- **Typography Ladder**:
  - `Inter Tight` for headlines and editorial titles with negative tracking (`-0.06em` to `-0.04em`).
  - `Inter` for body copy and navigational elements.
  - `Fragment Mono` for section numbers (`01`, `02`), metadata labels, and chips.
- **Color Tokens**:
  - Warm Sand Accents: `#E3CAA6` (Main 01) & `#9E8867` (Main 02)
  - Page Canvas: `#FAFAFA` (Light) / `#0C0C0D` (Dark)
  - Neutral 00 to Neutral 12 13-step neutral ramp
  - Fill contrast depth (no drop shadows anywhere).
- **Micro-Interactions**:
  - Animated 1px button/link underline that draws in on hover from 0% to 100% width and shifts to warm sand.
  - Custom desktop cursor follower that expands into an interactive ring with label over work cards.
  - In-depth Velora case study modal drawer with project challenge, solution, outcomes, and tech stack.
- **Sections**:
  - **Sticky Navbar**: Brand lockup, availability status badge, nav links, light/dark mode switch, and resume link.
  - **Hero**: Massive display typography, status eyebrow, action CTAs, and 4-metric key impact strip.
  - **01 / Selected Works**: Filterable project cards (Microservices, Enterprise, SaaS, Telemetry) with case study modal view.
  - **02 / Architectural Capabilities**: Numbered `01` to `05` service rows with expandable scope and technology breakdowns.
  - **03 / Career Experience**: Two-column layout with expandable role highlights and tech tags.
  - **04 / About & Philosophy**: Narrative bio, 4 core architectural tenets, and academic degrees.
  - **05 / Testimonials & Reviews**: Grid of client quotes with round initials avatar and Neutral 02 ring.
  - **06 / Engineering Journal**: Direct links to technical articles and live blog at `https://blog.rabbyhasan.com.bd/`.
  - **07 / Stay Connected (Contact)**: Direct 1-click clipboard email copy, direct message form, phone, location, and social links.
  - **Footer**: Brand wordmark, live Dhaka time clock (GMT+6), anchor navigation, and copyright.

---

## 🚀 Getting Started

To run `portfolio-v3` locally:

```bash
cd portfolio-v3
npm install
npm run dev
```

The development server will start at `http://localhost:5174/`.

To create a production build:

```bash
npm run build
```

Production output will be generated in `portfolio-v3/dist/`.
