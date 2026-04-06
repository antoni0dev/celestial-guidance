# Design System

All visual tokens are defined in `src/app/globals.css`. Never hardcode hex colors, font families, or animation values. Always use Tailwind classes or CSS custom properties.

## Colors

Use via Tailwind: `bg-celestial-500`, `text-celestial-800`, `border-celestial-500/20`

| Token | Hex | Usage |
|---|---|---|
| celestial-50 | #fdf2f8 | Lightest background |
| celestial-100 | #fce7f3 | Background gradient mid |
| celestial-200 | #fbcfe8 | Light accent |
| celestial-300 | #f9a8d4 | Background gradient end |
| celestial-400 | #f472b6 | Button gradient end, light accent |
| celestial-500 | #ec4899 | Primary - buttons, links, accents |
| celestial-600 | #db2777 | Primary hover, h3 headings |
| celestial-700 | #be185d | Dark accent |
| celestial-800 | #9d174d | h2 headings, badge text |
| celestial-900 | #831843 | h1 headings, darkest accent |
| text-body | #5a4a5a | Body text |
| text-muted | #8a7a8a | Secondary text, descriptions |

## Typography

Set globally - no need to add font classes to individual elements.

- **Headings** (h1-h6): Playfair Display, weight 700 (serif)
- **Body**: Inter (sans-serif)
- h1: text-heading-1 color (#831843)
- h2: text-heading-2 color (#9d174d)
- h3: text-heading-3 color (#db2777)

## Glass Surfaces

The `glass` utility class creates frosted glass cards:

```html
<div class="glass rounded-[20px] p-8">
  Content here
</div>
```

This applies: white 60% opacity background, 20px backdrop blur, 1px pink/20% border. On hover, the border becomes pink/40%.

## Buttons

Primary button (gradient, pill shape):
```html
<button class="bg-gradient-to-r from-celestial-500 to-celestial-400 text-white px-10 py-4 rounded-full font-semibold">
```

Secondary button (glass, outlined):
```html
<button class="glass text-celestial-800 px-10 py-4 rounded-full font-semibold">
```

## Spacing Conventions

- Section wrapper: `py-20 px-6 md:px-12`, inner `max-w-7xl mx-auto`
- Card padding: `p-8` (normal) or `p-10` (featured)
- Card border radius: `rounded-[20px]`
- Button border radius: `rounded-full` (pill)
- Grid gaps: `gap-8` (cards), `gap-6` (smaller items)

## Hover Effects

Cards lift on hover:
```html
<div class="glass rounded-[20px] p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-celestial-500/15">
```

## Available Animations

Use via Tailwind: `animate-twinkle`, `animate-pulse-soft`, etc.

| Animation | Duration | Use for |
|---|---|---|
| twinkle | 3s infinite | Sparkle emoji stars |
| pulse-soft | 2s infinite | CTA buttons, attention elements |
| fade-up | 0.8s forwards | Section entrance on scroll |
| glow | 2s infinite | Glowing borders/shadows |
| text-glow | 2s infinite | Hero heading glow |
| float | 15s infinite | Background orb movement |
| shimmer | 3s infinite | Shimmer gradient effects |
| star-spin | 3s infinite | Rotating star emojis |
| slide-down | 0.6s | Elements sliding in from top |
| modal-in | 0.3s | Modal entrance |
| spin | 1s infinite | Loading spinners |

## Background

Body has a diagonal pink gradient set in globals.css:
```
linear-gradient(135deg, celestial-50 0%, celestial-100 50%, celestial-300 100%)
```

Do NOT override body background. Sections should be transparent or use glass surfaces.
