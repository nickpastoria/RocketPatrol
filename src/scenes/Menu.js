class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {     
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');


        //load background pieces
        this.load.path = './assets/menuAssets/';
        this.load.image('Logo', 'Logo.png');
        this.load.image('BG', 'Asset 8.png');
        this.load.image('Cloud1', 'Asset 5.png');
        this.load.image('Cloud2', 'Asset 6.png');
        this.load.image('Buildings', 'Asset 4.png');
        this.load.image('Trees', 'Asset 3.png');
        this.load.image('Land', 'Asset 7.png');
        this.load.image('Billboard', 'asset 9.png');

    }

    create() {
        this.i = 0;
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //menu images
        this.add.image(-2,-2,'BG').setOrigin(0,0);
        this.Hill = this.add.image(0,400,'Land').setOrigin(0,0);
        this.Cloud1 = this.add.image(0,0,'Cloud1').setOrigin(0,0);
        this.Cloud2 = this.add.image(300,200,'Cloud2').setOrigin(0,0);
        this.Logo = this.add.image(20,20,'Logo').setOrigin(0,0);
        this.Buildings = this.add.image(-20, 140,'Buildings').setOrigin(0,0);
        this.Trees = this.add.image(200,340,'Trees').setOrigin(0,0);
        this.BillBoard = this.add.image(320, 321,'Billboard');

        
        // show menu text
        //this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        //this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        //menuConfig.backgroundColor = '#00FF00';
        //menuConfig.color = '#000';
        //this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        // Sin Prep Logic
        this.i += Math.PI/144;
        let sinFactor = Math.sin(this.i);
        let cosFactor = Math.cos(this.i);

        // Cloud Logic
        if(this.Cloud1.x < -this.Cloud1.width) this.Cloud1.x = this.sys.game.canvas.width;
        this.Cloud1.x -= 0.5;

        if(this.Cloud2.x < -this.Cloud2.width) this.Cloud2.x = this.sys.game.canvas.width;
        this.Cloud2.x -= 0.2;

        this.Buildings.x += sinFactor / 10;
        this.Hill.x -= sinFactor / 25;
        this.Trees.x += sinFactor / 3;
        this.Logo.x += cosFactor / 10;
        this.Logo.y += sinFactor / 5;

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // Novice mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // Expert mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
    }
}