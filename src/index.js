import QRCodeScanner from './lib.js'
    
const video = document.querySelector('#preview')
const buttonScan = document.querySelector('#button-scan')
const textResult = document.querySelector('#text-result')
const textError = document.querySelector('#text-error')

const onError = e => {
    textError.innerText = JSON.stringify(e, null, 4)
}

const onCapture = data => {
    textResult.innerText = JSON.stringify(data, null, 4)
}

let scanning = false
const scanner = new QRCodeScanner(video, onError, onCapture)

buttonScan.onclick = () => {
    scanning = !scanning
    if (scanning) {
        scanner.start()
        buttonScan.innerText = 'Stop Scanner'
    }
    else {
        scanner.stop()
        buttonScan.innerText = 'Scan QR Code'
    }
}
