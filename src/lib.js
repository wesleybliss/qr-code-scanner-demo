
// https://github.com/schmich/instascan
class QRCodeScanner {
    
    constructor(videoPreview, onError, onCapture) {
        
        this.videoPreview = videoPreview
        this.onError = onError
        this.onCapture = onCapture
        
        this.scanner = new Instascan.Scanner({
            video: this.videoPreview,
            continuous: true,
            mirror: true
        })
        
        this.scanner.addListener('scan', content => {
            console.info('RESULT', content)
            this.onCapture(content)
        })
        
    }
    
    start() {
        
        console.log('Scanner START', this.scanner)
        
        Instascan.Camera.getCameras()
            .then(cameras => {
                if (cameras.length > 0) {
                    this.scanner.start(cameras[0])
                }
                else {
                    console.error('No cameras found.')
                    this.onError(new Error('No cameras found.'))
                }
            })
            .catch(e => {
                console.error(e)
                this.onError(e)
            })
        
    }
    
    stop() {
        
        console.log('Scanner STOP', this.scanner)
        this.scanner.stop()
        
    }
    
}

export default QRCodeScanner
