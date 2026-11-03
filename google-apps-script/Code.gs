/**
 * LeadPilot enquiry receiver.
 * 1) Create a Google Sheet.
 * 2) Extensions > Apps Script.
 * 3) Replace the editor contents with this file and save.
 * 4) Deploy > New deployment > Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 5) Copy the Web app URL into Vercel as VITE_GOOGLE_SCRIPT_URL.
 *
 * The browser uses no-cors for this simple public form endpoint. That means
 * the website cannot verify the Google Sheets write in real time. Test it
 * by submitting a sample enquiry and checking the sheet.
 */

const SHEET_NAME = 'Website Enquiries';

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Submitted At', 'Name', 'Business', 'Phone', 'Email', 'Industry', 'Message', 'Source']);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      new Date(),
      clean_(data.name),
      clean_(data.business),
      clean_(data.phone),
      clean_(data.email),
      clean_(data.industry),
      clean_(data.message),
      clean_(data.source || 'LeadPilot website')
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function clean_(value) {
  return String(value || '').trim().slice(0, 2000);
}

function doGet() {
  return ContentService.createTextOutput('LeadPilot enquiry endpoint is ready.');
}