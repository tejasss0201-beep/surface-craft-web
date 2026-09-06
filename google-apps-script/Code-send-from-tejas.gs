/**
 * Surface Craft booking intake.
 * IMPORTANT: Create, authorize, and deploy this script while signed in as
 * tejas.ss.0201@gmail.com. MailApp sends from the account that executes the
 * web app, so the sender account cannot be changed by code alone.
 *
 * Deploy as a Web app:
 *   Execute as: Me
 *   Who has access: Anyone
 */
function doPost(e) {
  const data = JSON.parse((e.postData && e.postData.contents) || "{}");
  const recipient = "surfacecleanfrisco@gmail.com";
  const subject = "New Surface Craft booking request from " + (data.name || "a customer");
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
  ].join("\n");

  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    body: body,
    name: "Surface Craft Exterior Care"
  });

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
