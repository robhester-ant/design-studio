/**
 * go/robo-design - Google Apps Script Entry Point
 *
 * Serves the go/robo-design web application.
 */

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('go/robo-design')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
