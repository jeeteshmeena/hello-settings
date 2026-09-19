# Accessible AI Settings

## Goal
Improve the mobile settings experience for keyboard, touch, screen-reader, and low-vision users, then add an in-app AI assistant that converts a natural-language preference into valid settings.

## Build
- Strengthen visible focus rings, contrast, and minimum 44px tap areas across navigation, selectors, switches, search, reset controls, and dialogs.
- Add precise accessible names, selection semantics, status announcements, dialog focus handling, and keyboard support without changing the established visual direction.
- Add an “Set up with AI” entry and a compact inner page where users describe their preferences.
- Send the description securely through Lovable AI, constrain the result to the app’s existing Currency, Language, Appearance, Preference, and Sound choices, preview the recommendations, and apply them only after confirmation.
- Surface loading and exact safe error messages accessibly; preserve the user’s text on failure.

## Technical details
- Use a validated server function and the default `openai/gpt-6-astra` model through the streaming Responses API.
- Keep the AI key and prompt server-side; no setting history or account storage is required.
- Validate model output against strict allowed values before updating local settings.
- Verify the complete flow at the current mobile viewport, including keyboard focus, screen-reader attributes, AI success/error handling, and the existing settings screens.
