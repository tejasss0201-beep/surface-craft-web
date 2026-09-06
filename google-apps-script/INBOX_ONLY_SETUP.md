# Make booking emails appear only in Inbox

This changes only Google Apps Script. The website does not need to change.

## 1. Enable the Gmail Advanced Service

1. Open the Google Apps Script project that owns the booking `/exec` deployment.
2. In the left sidebar, click **Services** (the plus sign).
3. Search for **Gmail API**, select it, and click **Add**.
4. If Google asks you to enable the API in a Google Cloud project, open the provided link and click **Enable** for **Gmail API**. You can also find it under **Project Settings → Google Cloud Project** and then **APIs & Services → Library → Gmail API**.

## 2. Replace the Apps Script code

Open the script editor, delete the existing code, and paste this entire script:

```javascript
/**
 * Surface Craft booking intake.
 * Deploy as a Web app:
 *   Execute as: Me
 *   Who has access: Anyone
 */
function doPost(e) {
  const data = JSON.parse((e.postData && e.postData.contents) || "{}");
  const recipient = "surfacecleanfrisco@gmail.com";
  const token = "SC-" + new Date().getTime();
  const subject = "New Surface Craft booking request " + token;
  const body = [
    "New Surface Craft booking request",
    "",
    "Name: " + (data.name || ""),
    "Email: " + (data.email || ""),
    "Phone: " + (data.phone || ""),
    "Preferred date: " + (data.date || ""),
    "Service: " + (data.service || ""),
    "Estimate: " + (data.estimate || ""),
    "Driveway size: " + (data.drivewayArea ? data.drivewayArea + " sq ft" : "Not provided"),
    "Trash bins: " + (data.binCount || "Not provided"),
    "Additional details: " + (data.otherDetails || "None")
  ].join("\\n");

  MailApp.sendEmail(recipient, subject, body);

  // Give Gmail a moment to index the outgoing message.
  Utilities.sleep(2000);

  const query = "in:sent to:" + recipient + " " + token + " newer_than:10m";
  const result = Gmail.Users.Messages.list("me", {
    q: query,
    maxResults: 10
  });

  const messages = result.messages || [];
  messages.forEach(function(message) {
    Gmail.Users.Messages.modify(
      {
        addLabelIds: ["INBOX"],
        removeLabelIds: ["SENT"]
      },
      "me",
      message.id
    );
  });

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Save and redeploy the existing web app

1. Click **Save** in Apps Script.
2. Open **Deploy → Manage deployments**.
3. Click the pencil/edit icon for the existing web-app deployment.
4. Under **Version**, choose **New version**.
5. Click **Deploy**.
6. Approve the Gmail permissions when Google asks. Use the same account that owns **surfacecleanfrisco@gmail.com**.
7. Keep **Execute as: Me** and **Who has access: Anyone**.

Editing the existing deployment and selecting **New version** keeps the same `/exec` URL, so the website does not need to be updated.

## 4. Test it

Submit one real booking through the website. The message should be added to **Inbox** and should no longer have the **Sent** label. If it still appears in Sent, confirm that the Gmail API service was added and that you deployed a **new version**, not just saved the script.
