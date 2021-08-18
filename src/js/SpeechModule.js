// SpeechModule class is responsible for the voice controll instantiation and then processing voice commands

export default class SpeechModule {
	constructor(phaser) {
		this.phaser = phaser;
		this.gameScene = undefined;
		this.menuScene = undefined;
		this.micLoaded = false;

		window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

		const recognition = new SpeechRecognition();
		recognition.interimResults = true;
		recognition.addEventListener('result', (speech) => {

			const text = Array.from(speech.results)
				.map((result) => result[0])
				.map((result) => result.transcript)
				.join('');

			if (speech.results[0].isFinal) {
				if (!this.micLoaded) {
					this.loaded = true;
				}
				console.log("You said:" + text);
				this.checkOutput(text);
			}

		});

		recognition.addEventListener('end', () => {
			recognition.start();
		});

		recognition.start();
	}

	// method that receives text string and activates necessary commands
	checkOutput(text) {
		{
			if (this.gameScene === undefined || this.menuScene === undefined) {
				this.gameScene = this.phaser.game.scene.getScene("Game");
				this.menuScene = this.phaser.game.scene.getScene("Menu");
			}
		}

		switch (text) {
			case 'start':
				this.menuScene.startGame();
				break;
			case 'more':
				if (!this.phaser.game.scene.isActive("Game")) {
					return;
				}
				this.gameScene.createBall();
				break;
			case 'less':
				if (!this.phaser.game.scene.isActive("Game")) {
					return;
				}
				this.gameScene.removeBall();
				break;
			case 'restart':
				this.menuScene.startGame();
				break;
		}
	}
}
