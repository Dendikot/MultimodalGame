import * as tfjs from '@tensorflow/tfjs';
import * as ps from '@tensorflow-models/posenet';

// PoseNetModule class is responsible for processing data from the camera and providing it to the phaser game
export default class PoseNetModule {
	constructor(cameraController, phaserManager) {
		this.cameraController = cameraController;
		this.phaserManager = phaserManager;

		// Main chained instatiation that allows all needed manager to be loaded in a sequential order and do not
		// start making the calls that can cause exception errors
		this._loadPoseNet().then((e) => {
			this.poseNet = e;
			this.cameraController.init().then(() => {
				//set the game resolution according to the camera resolution
				this.phaserManager.init(
					this.cameraController.webCamElement.videoWidth,
					this.cameraController.webCamElement.videoHeight);
				this._estimatePose();
			});
		});
	}

	// Recursive estimate pose method that processes the data from camera and then converts it to the positions that
	// are send to the phaser game later
	async _estimatePose() {
		if (this.poseNet === undefined || this.poseNet === null) {
			console.error("Pose net is " + this.poseNet);
			return;
		}

		const pose = await this.poseNet.estimateSinglePose(this.cameraController.getScreenshot(), {flipHorizontal: false});
		if (this.phaserManager.game !== null || this.phaserManager.game !== undefined) {
			this.phaserManager.game.config.positionNose = pose.keypoints[0].position;
			const bodyPos = this.phaserManager.game.config.bodyPositions;
			bodyPos.leftHand = pose.keypoints[9].position;
			bodyPos.rightHand = pose.keypoints[10].position;
		}
		return this._estimatePose();
	}

	// poseNet load method
	// uncomment will create a high resolution model but will cause long loading
	async _loadPoseNet() {
		const net = await ps.load({
			/*			architecture: 'ResNet50',
						outputStride: 32,
						inputResolution: { width: 257, height: 200 },
						quantBytes: 2*/
		});
		return net;
	}
}
