# Vercel deployment setup

The exported Surface Craft site serves its frontend from `dist/public` and exposes the booking handler at `/api/booking`. The booking handler forwards requests to the Google Apps Script web app.

## Project settings

Use the following Vercel settings:

| Setting | Value |
|---|---|
| Framework preset | Vite or Other |
| Install command | `pnpm install` |
| Build command | `pnpm run build` |
| Output directory | `dist/public` |
| Root directory | The project root containing `package.json` and `vercel.json` |

## Required environment variable

In Vercel, open **Project Settings → Environment Variables** and add:

```text
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Use the `/exec` URL from the deployed Google Apps Script. Add it to **Production**, and add it to **Preview** if you want contact submissions to work on Vercel preview deployments. Redeploy after saving the variable.

The Apps Script deployment must be configured as a web app with **Execute as: Me** and **Who has access: Anyone**. The script should implement `doPost(e)` and send the parsed booking details to `surfacecleanfrisco@gmail.com`.

## Contact flow

The browser posts booking data to `/api/booking`. Vercel validates the fields, forwards the request to `GOOGLE_APPS_SCRIPT_URL`, and returns a success or error response. The form displays the success message only after the API responds successfully. Invalid data, a missing environment variable, or a failed Apps Script request returns an error without showing false success.
