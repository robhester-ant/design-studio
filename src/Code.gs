/**
 * Design Studio - Google Apps Script Entry Point
 *
 * Serves the Design Studio web application.
 */

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Design Studio')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
