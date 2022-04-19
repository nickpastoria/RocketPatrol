class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('net', './assets/Net.png');
        this.load.image('cop', './assets/Cop.png');
        this.load.image('Cloud1', 'Asset 5.png');
        this.load.image('Cloud2', 'Asset 6.png');
        this.load.image('scoreboard', './assets/gameBG/Scoreboard.png');
        this.load.image('clock', './assets/gameBG/Timer.png');
        this.load.image('bg_buildings_image', './assets/gameBG/Foreground.png');
        this.load.image('bg_ground_image', './assets/gameBG/Background.png');
        this.load.image('gameOverScreen', './assets/gameOverScreen.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/DroneExplode.png', {frameWidth: 93, frameHeight: 38, startFrame: 0, endFrame: 9});
        this.load.spritesheet('puff', './assets/puff_95x68.png', {frameWidth: 95, frameHeight: 68, startFrame: 0, endFrame: 72});
        this.load.spritesheet('friendlyDrone', './assets/friendlyDrone.png', {frameWidth: 13, frameHeight: 31, startframe: 0, endFrame: 2});
    }

    create() {
        music = this.sound.add('song');
        //frame counter
        this.i = 0;
        sinFactor = Math.sin(this.i);
        cosFactor = Math.cos(this.i);
        this.initialGameTime = game.settings.gameTimer / 1000;
        
        // place tile sprite
        //this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.buildingBaseX = -30;
        this.bgFloor = this.add.image(-100,0,'bg_ground_image').setOrigin(0,0);
        this.Cloud1 = this.add.image(0,0,'Cloud1').setOrigin(0,0);
        this.Cloud2 = this.add.image(300,150,'Cloud2').setOrigin(0,0);
        this.clockFace = this.add.image(300,33,'clock').setOrigin(0,0);
        this.bgBuildings = this.add.image(this.buildingBaseX,50,'bg_buildings_image').setOrigin(0,0);
        this.gameOverScreen = this.add.image(game.config.width / 2, game.config.height / 2, 'gameOverScreen').setOrigin(0.5,0.5);
        this.gameOverScreen.visible = false;

        // green UI background
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        //this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        //this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        //this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        //this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        // add Rocket (p1)
        this.p1Cop = new Cop(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'cop').setOrigin(0.5, 1);
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, this.p1Cop, 'net').setOrigin(0.5, 1);

        // add Spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'friendlyDrone', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'friendlyDrone', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'friendlyDrone', 0, 10).setOrigin(0,0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // puff animation
        this.anims.create({
            key: 'puff',
            frames: this.anims.generateFrameNumbers('puff', { start: 0, end: 72, first: 0}),
            frameRate: 60
        });
        this.boom = this.add.sprite(this.p1Cop.x, this.p1Cop.y - this.p1Cop.height + 10, 'puff').setOrigin(0.5, 1);
        this.boom.visible = false;

        // initialize score
        this.p1Score = 0;

        // display score
        this.scoreboard = this.add.sprite(borderUISize + borderPadding, borderUISize + borderPadding*2, 'scoreboard').setOrigin(0,0);
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#fffff',
            align: 'middle',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(this.scoreboard.x + this.scoreboard.width - 110, this.scoreboard.y + this.scoreboard.height/2, this.p1Score, scoreConfig).setOrigin(0,0.5);
        
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.gameOverScreen.visible = true;
            this.gameOver = true;
        }, null, this);
        this.timeLeft = this.add.text(this.clockFace.x + this.clockFace.width/2, this.clockFace.y + this.clockFace.height/2, this.clock.elapsed, scoreConfig).setOrigin(0.5,0.5);
    }

    update() {

        this.timeLeft.text = this.initialGameTime - Math.floor(this.clock.elapsed/1000);

        // Sin Prep Logic
        this.i += Math.PI/(60/8);
        sinFactor = Math.sin(this.i);
        cosFactor = Math.cos(this.i);
        
        if(keyF.isDown && !this.p1Rocket.isFiring) { 
            this.boom.anims.play('puff');
            this.boom.visible = true;
            this.boom.on('animationcomplete', () => {    // callback after anim completes
                this.boom.visible = false;                       // remove explosion sprite
            });
        }
        this.boom.x = this.p1Cop.x;
        //bg moving logic
        this.bgBuildings.x = this.buildingBaseX - (this.p1Cop.x - (640/2))/20;

        // Cloud Logic
        if(this.Cloud1.x < -this.Cloud1.width) this.Cloud1.x = this.sys.game.canvas.width;
        this.Cloud1.x -= 0.5;

        if(this.Cloud2.x < -this.Cloud2.width) this.Cloud2.x = this.sys.game.canvas.width;
        this.Cloud2.x -= 0.2;

        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            music.stop();
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            music.stop();
            this.scene.start("menuScene");
        }

        if(!this.gameOver) {
            this.p1Rocket.update();             // update p1
            this.p1Cop.update();
            this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.ship03.isCaught();
            //this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.ship02.isCaught();
            //this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.ship01.isCaught();
            //this.shipExplode(this.ship01);
        }

        //check to see if ship lands
        this.shipHitGround(this.ship01, this.p1Cop.y);
        this.shipHitGround(this.ship02, this.p1Cop.y);
        this.shipHitGround(this.ship03, this.p1Cop.y);

    }

    shipHitGround(ship, y) {
        if(ship.y > y) {
            this.shipExplode(ship);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.y > ship.y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship                      
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0.5, 1);
        boom.anims.play('explode');             // play explode animation
        ship.reset(); 
        boom.on('animationcomplete', () => {    // callback after anim completes                        // reset ship position                    // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        
        this.sound.play('sfx_explosion');
      }
}