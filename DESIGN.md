---
name: Obsidian Minimalist
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1c1c'
  surface-container: '#1f2020'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e4e2e1'
  on-surface-variant: '#cfc4c5'
  inverse-surface: '#e4e2e1'
  inverse-on-surface: '#303030'
  outline: '#988e90'
  outline-variant: '#4c4546'
  surface-tint: '#c6c6c6'
  primary: '#c6c6c6'
  on-primary: '#303030'
  primary-container: '#000000'
  on-primary-container: '#757575'
  inverse-primary: '#5e5e5e'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#c8c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#000000'
  on-tertiary-container: '#767575'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e4e2e1'
  surface-variant: '#353535'
typography:
  display:
    fontFamily: Inter
    fontSize: 4.5rem
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 3rem
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h2:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  caption:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  button:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.02em
spacing:
  split-left: 70%
  split-right: 30%
  gutter: 2rem
  margin-page: 4rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
  stack-lg: 4rem
---

## Brand & Style

This design system is rooted in extreme **Minimalism**, prioritizing content clarity and structural integrity over decorative flourish. The brand personality is sophisticated, silent, and authoritative, designed to evoke a sense of calm focus and premium quality. It targets an audience that values efficiency and high-end editorial aesthetics. 

The visual language relies on the "void" of a deep black canvas to create an immersive environment where information is elevated by its isolation. Every element must justify its existence; if a component does not serve a functional or navigational purpose, it is omitted.

## Colors

The color palette is strictly monochromatic to maintain high contrast and visual silence. 

- **Primary:** Pure Black (#000000) serves as the universal background color, creating an "infinite" depth.
- **Text:** Pure White (#FFFFFF) is used for primary headings and body copy to ensure maximum legibility.
- **Accents:** Mid-to-dark greys are reserved solely for structural elements like hair-line borders and inactive states. 
- **Interactive:** Subtle shifts in grey tones (from #1A1A1A to #2C2C2C) indicate hover states or container differentiation without breaking the dark aesthetic.

## Typography

The typography utilizes **Inter** for its systematic, utilitarian precision. It functions as the primary visual driver of the design system.

- **Scale:** Aggressive contrast between large display type and functional body text.
- **Hierarchy:** Established through weight and size rather than color. 
- **Whitespace:** Large line heights and generous paragraph spacing are mandatory to prevent visual crowding against the dark background. 
- **Case:** Captions and labels may use all-caps with increased letter spacing for a structured, architectural feel.

## Layout & Spacing

The layout follows a strict **70:30 split architecture**. 

- **Primary Pane (70%):** Located on the left, this area houses the main narrative or functional content.
- **Secondary Pane (30%):** Located on the right, this area is reserved for metadata, secondary navigation, or supplementary information.
- **Grid:** A 10-column grid where 7 columns are allocated to the left and 3 to the right. 
- **Rhythm:** Spacing follows a base-8 scale. Vertical rhythm is generous (stack-lg) to separate distinct content blocks, reinforcing the minimalist ethos.

## Elevation & Depth

This design system avoids shadows entirely. Depth is conveyed through **Low-contrast outlines** and tonal layering.

- **Borders:** Use 1px solid lines in #1A1A1A or #2C2C2C to define areas.
- **Layering:** Elements "lift" by changing background color from #000000 to a slightly lighter #080808.
- **Flatness:** Surfaces are strictly opaque. No blurs or gradients are permitted. The UI should feel like a single, machined piece of dark glass.

## Shapes

The shape language is **Sharp (0)**. 

Every element—including buttons, input fields, and containers—must have 0px corner radii. This creates a rigorous, architectural aesthetic that aligns with the grid-heavy layout. Circular elements are only permitted for specific functional icons (like radio buttons) to ensure they are recognizable as interactive primitives.

## Components

- **Buttons:** Rectangular with 1px white borders for primary actions, or ghost-style (text-only) for secondary actions. Use a solid white fill with black text only for the absolute primary "Call to Action."
- **Inputs:** Simple bottom-border only (#2C2C2C) in a resting state, becoming white on focus. Labels sit above in small-caps.
- **Cards:** No background fill or shadows. Use a 1px #1A1A1A border to define the card boundary. Content within cards should have significant internal padding (min 2rem).
- **Lists:** Separated by 1px horizontal rules spanning the full width of the container. 
- **Navigation:** Vertical orientation is preferred in the 30% pane, using "active" indicators such as a simple 2px horizontal line next to the text.
- **Progress Indicators:** Simple, thin horizontal bars without rounded ends.
