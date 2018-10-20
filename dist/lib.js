function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// https://github.com/schmich/instascan
var QRCodeScanner =
/*#__PURE__*/
function () {
  function QRCodeScanner(videoPreview, onError, onCapture) {
    var _this = this;

    _classCallCheck(this, QRCodeScanner);

    this.videoPreview = videoPreview;
    this.onError = onError;
    this.onCapture = onCapture;
    this.scanner = new Instascan.Scanner({
      video: this.videoPreview,
      continuous: true,
      mirror: true
    });
    this.scanner.addListener('scan', function (content) {
      console.info('RESULT', content);

      _this.onCapture(content);
    });
  }

  _createClass(QRCodeScanner, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      console.log('Scanner START', this.scanner);
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          _this2.scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');

          _this2.onError(new Error('No cameras found.'));
        }
      }).catch(function (e) {
        console.error(e);

        _this2.onError(e);
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      console.log('Scanner STOP', this.scanner);
      this.scanner.stop();
    }
  }]);

  return QRCodeScanner;
}();

export default QRCodeScanner;