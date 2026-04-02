```markdown
# Design System Document: Kinetic High-Performance Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Pulse of Performance"**
This design system moves away from the static, boxy layouts of traditional fitness trackers toward a high-octane, editorial experience. It is designed to feel like a premium fitness magazine brought to life—dynamic, high-contrast, and physically immersive. 

We break the "template" look through **Kinetic Asymmetry**. By utilizing overlapping elements, heavy typographic scales, and a "No-Line" philosophy, we create a sense of forward motion. The interface shouldn't just sit there; it should feel like it’s pushing the user toward their next rep.

---

## 2. Colors & Surface Philosophy
The palette is built on a "Deep Space" foundation (`surface: #0e0e0e`) to minimize eye strain in dimly lit gyms, punctuated by high-vis accents that demand action.

### The "No-Line" Rule
**Explicit Instruction:** Prohibit 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts or tonal transitions.
- Use `surface-container-low` for secondary sectioning.
- Use `surface-container-high` to make a component "pop" against the base background.
- Lines create visual clutter; color shifts create "zones."

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
- **Base Layer:** `surface` (#0e0e0e).
- **Secondary Layer:** `surface-container-low` (#131313) for large grouped content.
- **Action Layer:** `surface-container-highest` (#262626) for interactive cards or logging modules.
This nesting creates a "soft" depth that feels sophisticated rather than structural.

### The "Glass & Gradient" Rule
To elevate the "Electric Lime" (`primary`) and "Bright Orange" (`secondary`), use them as light sources.
- **Glassmorphism:** For floating navigation or over-image labels, use `surface-variant` at 60% opacity with a `24px` backdrop blur.
- **Signature Textures:** Apply a subtle linear gradient from `primary` (#f3ffca) to `primary-container` (#cafd00) for "Start Workout" CTAs. This creates a "glow" effect that flat colors cannot replicate.

---

## 3. Typography
The type system relies on the interplay between the geometric strength of **Lexend** and the technical clarity of **Manrope**.

- **Display & Headlines (Lexend):** Used for motivation and progress. Bold weight is mandatory. `display-lg` (3.5rem) should be used for heart rate or heavy lift numbers to ensure readability from 3 feet away.
- **Titles & Body (Manrope):** Chosen for its high legibility during movement. Use `title-lg` for exercise names.
- **Editorial Contrast:** Pair a `display-sm` stat with a `label-sm` unit (e.g., **185** *LBS*) to create a hierarchy that feels intentional and "designed," not just "inputted."

---

## 4. Elevation & Depth
We eschew traditional shadows in favor of **Tonal Layering**.

- **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section to create a recessed look, or a `surface-container-highest` card on the base `surface` for a lifted look.
- **Ambient Glows:** Instead of grey shadows, use a `4-8%` opacity shadow tinted with `primary` (#f3ffca) for active states. This mimics the neon glow of a digital display reflecting on a dark surface.
- **The "Ghost Border":** If accessibility requires a stroke, use `outline-variant` at **15% opacity**. A 100% opaque border is a failure of the system's "fluid" philosophy.

---

## 5. Components

### Buttons
- **Primary (The Power CTA):** Background: `primary_container` (#cafd00); Text: `on_primary_container` (#4a5e00). Roundedness: `full`. No border.
- **Secondary (The Utility CTA):** Background: `secondary_container` (#ab3600); Text: `on_secondary_container` (#fff6f3).
- **Interactive State:** On press, scale the button to 96% to provide tactile feedback without needing complex animations.

### Workout Cards
- **Construction:** Use `surface_container_high` (#201f1f). 
- **Rule:** Forbid divider lines between exercise sets. Use `8px` of vertical space (Spacing Scale `2`) and a `surface_container_highest` background for the "Current Set" to focus the user's eye.
- **Corners:** Use `xl` (3rem) for the outer card and `md` (1.5rem) for nested elements.

### Progress Indicators
- **The "Pulse" Ring:** Use `primary` for the active progress and `outline_variant` at 20% for the track.
- **Motion:** Progress bars should use a non-linear "ease-out" transition to feel more organic and energetic.

### Input Fields (Sets & Reps)
- **Styling:** Large-scale `display-sm` typography within a `surface_container_highest` block. 
- **Active State:** Instead of a border, the background color should shift to `primary` with a 10% opacity overlay, and the label should transition to `primary`.

---

## 6. Do's and Don'ts

### Do:
- **Use "Aggressive" Whitespace:** Use Spacing Scale `12` (3rem) or `16` (4rem) to separate major workout blocks.
- **Asymmetric Layouts:** Offset a "Total Volume" stat to the left while keeping the "Time Elapsed" to the right to break the "grid" feel.
- **Color Coding:** Use `secondary` (#ff7441) exclusively for "High Effort" or "Heavy Set" indicators to create a mental shortcut for the user.

### Don't:
- **No Divider Lines:** Never use a 1px line to separate list items. Use tonal shifts or whitespace.
- **No "Default" Greys:** Every surface should have the slight warmth/coolness of the defined surface tokens.
- **No Small Text:** Avoid `body-sm` for any critical workout data. If they have to squint while bench pressing, the design has failed.
- **No High-Contrast Borders:** Do not use `outline` at 100% opacity. It boxes in the energy; let the colors breathe.```