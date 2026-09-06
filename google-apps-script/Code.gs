/**
 * Surface Craft booking intake.
 * Deploy this project as a Web app with:
 *   Execute as: Me
 *   Who has access: Anyone
 */
function doPost(e) {
  const data = JSON.parse(e.postData.contents || "{}");
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

  MailApp.sendEmail(recipient, subject, body);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
