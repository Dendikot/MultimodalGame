# MultimodalGame
University project - multimodal game

Installation:

1 - To be able to edit the project you would require Node.js (https://nodejs.org/en/download/)
This project was built on Node version 14.15.4 so it is better to have the same or version which is not radically different

2 - Once the project is downloaded to be able to use it you will need to run "npm install" in the directory so all dependencies will be installed.

3 - After successful installation, you will be able to run "npm start" which will create a local server page with the game and "npm build" which will create build of the project in the dist folder.

Notes:

1 - After downloading the project all sources will be located in MultimodalGame/src/

2 - Changing them will cause changes to the local server page

3 - To build the project into the final product run "npm build" the result of compilation will be in MultimodalGame/dist which will include compiled HTML and js files.

4 - main Js file is index.js, the main HTML file is template.html based on them webpack builds the final project. 

5 - by default project uses the mobile configuration of pose net it loads fast but is not as precise, if you want to change it you have to uncomment config lines in PoseNetModule.js method _loadPoseNet

Gameplay:

Is a simple game where you have two gates and two blocks that are connected to your hands' movement![image](https://user-images.githubusercontent.com/40671175/130276505-c5973781-a021-4832-ac0b-f443a921c837.png)

You have several voice commands that you can use in the project by simply saying out loud correct words, you can check how they were recognized in the browser console.

Voice commands: 

1 - start - starts the game

2 - more - adds one ball to the game

3 - less - removes one ball from the game

4 - restart - restarts the game

!!! This project uses native voice recognition, seems like it requires some time to be loaded however I was yet able to find a way to track when it was loaded. It can take up to a minute to load and you can check if recognition started if by pronouncing words you receive output in the console.![image](https://user-images.githubusercontent.com/40671175/130277154-1baea5ad-0335-4a5b-bf24-963334dbcf76.png)


