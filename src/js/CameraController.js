// This controller is responsible for the camera instatiation and provides needed data for the poseNet
export default class CameraController {
	// In constructor we seek for the element created in the template.html
	constructor() {
		this.webCamElement = document.getElementById('videoElement');
	}

	// We have main initialization here and not in the class constructor due to the fact that poseNet and camera take
	// time to be instantiated and processed and due to the fact that they are both strongly codependent this is
	// nessesary to call their instantiation in a strict order one after another
	// init returns a promise that allows to start pose instantiation right after camera is ready
	init() {
		return new Promise((resolve, reject) => {
			this.videoRenderCanvas = document.createElement('canvas');
			this.videoRenderCanvasCtx = this.videoRenderCanvas.getContext('2d');

			if (navigator.mediaDevices.getUserMedia) {

				navigator.mediaDevices.getUserMedia({video: true})
					.then(stream => {
						return new Promise(resolve1 => {
							this.webCamElement.onloadedmetadata = resolve1;
							this.webCamElement.srcObject = stream;
						})
					})
					.then(() => {
						resolve();
					})
					.catch((err0r) => {
						console.log("Something went wrong in Camera Controller! Please try reloading");
						reject();
					});
			}
		})

	}

	// Method to retreive the screenshot from camera and later to be processed by poseNet
	getScreenshot() {
		this.videoRenderCanvas.width = this.webCamElement.videoWidth;
		this.videoRenderCanvas.height = this.webCamElement.videoHeight;
		this.videoRenderCanvasCtx.drawImage(this.webCamElement, 0, 0);

		return this.videoRenderCanvas;
	}
}
