# Expanded booking and story pages

- [ ] Add Both as a selectable booking service.
- [ ] Add Other as a selectable booking service with a required details text box.
- [ ] Preserve Driveway and Trash bins pricing and estimates.
- [ ] Link Surface Stories cards to detail routes.
- [ ] Add an Our Story page with the supplied three-student business story.
- [ ] Add Trash Bins detail page content.
- [ ] Add Concrete Cleaning detail page content.
- [ ] Keep navigation and back-to-home paths available.
- [ ] Verify desktop and mobile routing, booking, and form states.
- [ ] Run type-check and production build.
- [ ] Save and deliver the updated checkpoint.

## Content direction

The new pages should retain the black-and-aqua editorial system, use the existing generated imagery where appropriate, and avoid fabricated reviews or testimonials. The supplied Our Story copy should be preserved faithfully while being formatted into readable sections.

## End

- [ ] Complete.

## Current markup findings

The booking flow currently separates the scope step from the contact-details step and keeps pricing in local state, so Both can combine driveway and bin totals while Other can switch to a custom quote. The Surface Stories gallery is a separate AccordionGallery component and can be converted from clickable buttons into route links without affecting the rest of the page.

## Routing findings

The app currently has a single Home route with a NotFound fallback. AccordionGallery currently uses buttons, so each tile will be converted into an anchor-style route link. New routes will use `/our-story`, `/trash-bins`, and `/concrete-cleaning`, with a shared detail-page layout and back-to-home navigation.

## Verification findings

Desktop and mobile screenshots confirm the Home page remains intact, the Surface Stories tiles route to Our Story, Trash Bins, and Concrete Cleaning, and each detail page has a readable hero, supplied Our Story content, clear pricing, scope notes, and a booking CTA. The expanded quote and booking controls compile with Both and Other states; Other exposes a details textarea and custom quote state.
