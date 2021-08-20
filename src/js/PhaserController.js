import "phaser";

// class for phaser Controller
export default class PhaserController {
	constructor() {
	}

	// init logic is separated so it would be possilbe to instantiate game after other modules are ready
	init(width, height){
		var config = {
			type: Phaser.AUTO,
			width: 1280,
			height: 960,
			physics: {
				default: 'matter',
				matter: {
					gravity: {y: 1}
				}
			},
			scene: [
				Menu, Game
			],
			parent: "phaser-element",
			autoCenter: Phaser.Scale.CENTER_BOTH,
			transparent: true
		};
		this.game = new Phaser.Game(config);
		this.game.config.bodyPositions = {"leftHand": {x: 0, y: 0}, "rightHand": {x: 0, y: 0}};
		console.log("Phaser is ready");
	}
}

// Phaser scene classes - main game logic is here
class Menu extends Phaser.Scene {
	constructor() {
		super({key: 'Menu', active: true});
	}

	init() {
		this.center =
			{
				x: this.cameras.main.worldView.x + this.cameras.main.width / 2,
				y: this.cameras.main.worldView.y + this.cameras.main.height / 2,
			}
	}

	preload() {

	}

	create() {
		this.introText = this.add.text(this.center.x, this.center.y, 'Hi');
		this.introText.setInteractive();
		this.introText.on('pointerdown', () => {
			this.scene.start("Game")
		});

	}

	startGame(){
		this.scene.start("Game");
	}

	update(time, delta) {
		super.update(time, delta);
	}
}


class Game extends Phaser.Scene {
	constructor() {
		super({key: 'Game', active: false});
		this.ball = undefined;
	}

	init() {
		this.balls = [];
		this.maximumVelocity = 20;
	}

	preload() {

	}

	create() {
		const borderScale = 35;
		this.gameWidth = this.game.config.width;
		this.gameHeight = this.game.config.height;

		this.matter.world.setBounds(
			borderScale, borderScale,
			this.gameWidth - borderScale * 2,
			this.gameHeight - borderScale * 2, 80,
			true, true, true, true);

		this.createBall();

		this._createHands();

		const gate1 = this.add.rectangle(borderScale, this.gameHeight / 2, 25, 100, 0xFF0000);
		this.matter.add.gameObject(gate1);
		gate1.setStatic(true);
		gate1.body.onCollideCallback = (e) => {
			if (e.bodyA.label === "Circle Body" || e.bodyB.label === "Circle Body" ) {
				this._addGoal("gate1");
			}
		};
		//check distance its better

		const gate2 = this.add.rectangle(this.gameWidth - borderScale, this.gameHeight / 2, 25, 100, 0xFF0000);
		this.matter.add.gameObject(gate2);
		gate2.setStatic(true);
		gate2.body.onCollideCallback = (e) => {
			if (e.bodyA.label === "Circle Body" || e.bodyB.label === "Circle Body" ) {
				this._addGoal("gate2");
			}
		};

		this.scoreText = this.add.text(this.gameWidth / 2, borderScale, '0:0');
		this.scoreText.setFontSize(55);

		this.scoreValue = [0, 0];


		//static immovable gates(sprites) + score + more + less + git // 2 hours
	}

	_addGoal(gate) {
		switch (gate) {
			case "gate1":
				this.scoreValue[0]++;
				break;
			case "gate2":
				this.scoreValue[1]++;
				break;
			default:
				break;
		}
		this.scoreText.setText(this.scoreValue[0] + ':' + this.scoreValue[1]);
	}

	_checkOutOfBounds() {
		for (let i = 0; i < this.balls.length; i++) {
			const ball = this.balls[i];
			if (ball.x < 0 || ball.x > this.gameWidth ||
				ball.y < 0 || ball.y > this.gameHeight) {
				ball.setPosition(this.gameWidth / 2, this.gameHeight / 2);
			}
			if (ball.body.velocityX > this.maximumVelocity) {
				ball.body.setVelocityX(ball.body.velocityX * 0.8);
			}
			if (ball.body.velocityY > this.maximumVelocity) {
				ball.body.setVelocityY(ball.body.velocityY * 0.8);
			}
		}
	}

	//border + size + git

	_createHands() {
		this.leftHand = this.add.rectangle(10, 10, 25, 100, 0xc8a2c8);
		this.matter.add.gameObject(this.leftHand);
		// this.leftHand.body.isStatic = true;
		this.leftHand.setMass(60);
		this.leftHand.setBounce(1);
		this.leftHand.body.id = "leftHand";

		this.rightHand = this.add.rectangle(10, 10, 25, 100, 0x00FF00);
		this.matter.add.gameObject(this.rightHand);
		// this.leftHand.body.isStatic = true;
		this.rightHand.setMass(60);
		this.rightHand.setBounce(1);
		this.rightHand.body.id = "rightHand";
	}

	createBall() {
		const ball = this.add.circle(this.gameWidth/2, this.gameHeight/2, 22, 0x6666ff);
		this.matter.add.gameObject(ball);
		ball.setBody({
			type: 'circle',
			radius: 22
		});
		ball.setFrictionAir(0, 0, 0);
		ball.setFrictionStatic(0, 0, 0);
		ball.setFriction(0, 0, 0);
		ball.setBounce(1);
		ball.setBlendMode('ADD');
		ball.setMass(1);

		this.balls.push(ball);
	}

	startScene(){
		this.scene.start("Game");
	}

	removeBall() {
		if (this.balls.length <= 0) {
			return;
		}
		const ball = this.balls.pop();
		this.matter.world.remove(ball);
		ball.destroy();
	}

	update(time, delta) {
		super.update(time, delta);
		this.rightHand.setAngularVelocity(0);
		this.leftHand.setAngularVelocity(0);

		this._checkOutOfBounds();
		this._setArms(this.game.config.bodyPositions.leftHand, this.game.config.bodyPositions.rightHand);

		/*if (this.ball.x < 0 || this.ball.x > this.game.config.width || this.ball.y < 0 || this.ball.y > this.game.config.height) {
			this.ball.setPosition(this.gameWidth / 2, this.gameHeight / 2);
		}*/
	}

	_setArms(position1, position2) {
		this.leftHand.setPosition(position1.x, position1.y);
		this.rightHand.setPosition(position2.x, position2.y);

		// then pls do the voice controll at least google
		// load + loop + canvas + speech + git(make one working commit that you can load and check) + explanation +
		// upload
	}


}
