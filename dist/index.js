import QRCodeScanner from './lib.js';
var video = document.querySelector('#preview');
var buttonScan = document.querySelector('#button-scan');
var textResult = document.querySelector('#text-result');
var textError = document.querySelector('#text-error');

var onError = function onError(e) {
  textError.innerText = JSON.stringify(e, null, 4);
};

var onCapture = function onCapture(data) {
  textResult.innerText = JSON.stringify(data, null, 4);
};

var scanning = false;
var scanner = new QRCodeScanner(video, onError, onCapture);

buttonScan.onclick = function () {
  scanning = !scanning;

  if (scanning) {
    scanner.start();
    buttonScan.innerText = 'Stop Scanner';
  } else {
    scanner.stop();
    buttonScan.innerText = 'Scan QR Code';
  }
};