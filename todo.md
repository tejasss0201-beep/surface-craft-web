# Booking email notification

- [x] Upgrade the static project to support a secure server-side submission handler.
- [x] Add a public booking-request procedure that validates customer and scope fields.
- [x] Send an owner notification containing the customer’s name, email, phone, preferred date, selected service, estimate, and custom details.
- [x] Connect the checkout form to the server procedure and handle success/failure states.
- [x] Verify the production build and booking UI.
- [x] Save a checkpoint so the updated live version is available.

## Email delivery follow-up

- [x] Replace the project-owner alert with direct email delivery; superseded destination is surfacecleanfrisco@gmail.com.
- [x] Configure the selected delivery endpoint securely via Google Apps Script; no paid email provider credentials required.
- [x] Verify the Google Apps Script configuration with a unit test, production build, and responsive UI check.
- [x] Save a new checkpoint after the direct-email implementation is live.

- [x] Use surfacecleanfrisco@gmail.com as the booking notification recipient.

## Free Google Apps Script delivery

- [x] Add a Google Apps Script `doPost` template that emails requests to surfacecleanfrisco@gmail.com.
- [x] Add a project setting for the deployed Apps Script web-app URL.
- [x] Connect checkout submission to the configured endpoint with success and failure handling.
- [x] Add a unit test for the endpoint configuration and endpoint health check.
- [x] Verify the build and save a checkpoint.

- [x] Configure the provided Google Apps Script `/exec` URL as the booking delivery endpoint.

- [x] Replace the stored Google Apps Script endpoint with the newly provided `/exec` URL.

- [x] Replace the stored booking endpoint with the latest Google Apps Script `/exec` URL provided by the user.

- [x] Update the prior endpoint health test so it no longer expects an obsolete deployment URL.

## Apps Script sender account

- [x] Prepare the script to send from the tejas.ss.0201@gmail.com account to surfacecleanfrisco@gmail.com; replacement script delivered for user deployment.
- [x] Provide deployment steps that preserve the existing website `/exec` URL when the existing deployment is updated.
- [x] Explain the account authorization and verification requirement.

- [x] Verify and configure the newest Google Apps Script `/exec` URL supplied by the user.

- [x] Update the older endpoint test so the full suite validates the currently configured deployment instead of a superseded URL.

## Footer email update

- [x] Replace the footer email text and mailto link with surfacecraftfrisco@gmail.com.
- [x] Verify the footer rendering and production build.
- [x] Save a checkpoint so the updated footer is live.

## Footer verification findings

Desktop and mobile full-page previews both show the updated footer email `surfacecraftfrisco@gmail.com`; the email link and footer layout remain intact. Type-checking and production build pass.

## Social links

- [x] Add Instagram, TikTok, and WhatsApp links to the footer.
- [x] Add Instagram, TikTok, and WhatsApp links to the mobile StaggeredMenu.
- [x] Verify external link targets and responsive rendering.
- [x] Run the production build and save a checkpoint.

## Social link verification findings

Desktop and mobile full-page previews show the Instagram, TikTok, and WhatsApp links in the footer. The mobile StaggeredMenu now includes Instagram, TikTok, WhatsApp 972-880-9311, phone, and the updated email contact. Type-checking and production build pass.

- [x] Verify the mobile StaggeredMenu socialItems wiring and responsive mobile preview; links are supplied directly to the installed menu component.
- [x] Save a new checkpoint after the social-links update so the live version includes the footer and mobile-menu changes.

## Facebook link

- [x] Add the provided Facebook link to the footer.
- [x] Add the provided Facebook link to the mobile StaggeredMenu.
- [x] Verify the updated social links and production build.
- [x] Save a checkpoint with the Facebook update live.

## Facebook verification findings

The updated Facebook link is present in the footer social set on desktop and in the mobile StaggeredMenu socialItems alongside Instagram, TikTok, WhatsApp, phone, and email. The production build and responsive previews pass.

## Icon-only footer socials

- [x] Replace footer social text labels with icon-only accessible links.
- [x] Verify the simplified footer on desktop and mobile.
- [x] Run the production build and save a checkpoint.

## Icon-only footer verification findings

The footer now shows compact icon-only controls for Instagram, TikTok, Facebook, and WhatsApp on both desktop and mobile previews. Each link retains an accessible aria-label and title, and the production build passes.

## Brand social icons

- [x] Replace the generic TikTok and WhatsApp footer icons with recognizable brand-logo marks.
- [x] Preserve accessible labels and existing social destinations.
- [x] Verify the footer on desktop and mobile and save a checkpoint.

## Brand icon verification findings

Desktop and mobile previews show recognizable TikTok and WhatsApp logo marks in the compact footer social row. The links retain their original destinations and accessible aria-labels/titles. Type-checking and production build pass.

## Missing footer brand icons

- [x] Fix TikTok and WhatsApp footer icons so their visible marks render reliably.
- [x] Verify both icons on desktop and mobile.
- [x] Run the production build and save a checkpoint.

## Visible brand-icon verification findings

After adding explicit SVG dimensions and display rules, the TikTok and WhatsApp logo marks are visibly rendered in the footer on both desktop and mobile previews. Type-checking and production build pass.

## Downloadable website archive

- [x] Package the complete project source and configuration into a ZIP archive.
- [x] Exclude dependencies, build output, logs, and environment secrets from the archive.
- [x] Verify the archive contents and deliver the download.

## Mobile menu social icons

- [x] Render Instagram, TikTok, Facebook, and WhatsApp as icons in the mobile menu social area.
- [x] Preserve accessible labels and keep phone/email actions available.
- [x] Verify the mobile menu and production build, then save a checkpoint.

## Mobile menu icon verification findings

The installed StaggeredMenu now renders icon nodes for phone, WhatsApp, Instagram, TikTok, Facebook, and email, with accessible labels and titles. The mobile responsive preview remains intact, and type-checking plus production build pass.

- [x] Verify the mobile menu’s icon-only social renderer directly through the component source because the screenshot tool cannot open the animated menu state.
- [x] Save a new checkpoint after the mobile-menu social icon update.

## Refreshed downloadable archive

- [ ] Package the latest project source with the mobile-menu icon update.
- [ ] Verify archive integrity and deliver the refreshed download.
