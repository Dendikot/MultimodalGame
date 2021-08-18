import PhaserController from "./js/PhaserController";
import CameraController from "./js/CameraController";
import PoseNetModule from "./js/PoseNetModule";
import SpeechModule from "./js/SpeechModule";

// This pseudo architecture works the following way
// Controllers provide the main logic
// Modules are connected to this logic and can be freely coupled and decoupled

//Controllers
const cameraController = new CameraController();
const phaserController = new PhaserController();

//Modules
const poseNetModule = new PoseNetModule(cameraController, phaserController);
const speechModule = new SpeechModule(phaserController);
