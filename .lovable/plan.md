# Mobile Settings Page

## Goal
Recreate the attached dark mobile settings experience with the requested choices only.

## Build
- Replace the blank home page with a compact, mobile-first Settings screen matching the recording's spacing, typography, borders, icons, and bottom action.
- Add drill-in selectors for Currency, Language, Appearance, Region, and Midnight Navigation, each with a back action and selected-state indicator.
- Include only Hindi and English for Language; India and Outside India for Region; Mono, Midnight, and Warm for Appearance; Drift, Limelight, and Floating for Midnight Navigation.
- Add Preference and Sound sections with working on/off switches for every requested option.
- Replace Log out with a working Reset onboarding confirmation action.
- Exclude Network diagnostics and Permissions.

## Technical details
- Keep interactions local to the page; no account or cloud storage is required.
- Use the existing React app, semantic design tokens, reusable controls, and responsive layouts.
- Add page metadata and verify the complete flow at the supplied mobile viewport.