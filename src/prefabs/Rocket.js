// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, cop, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isFiring = false;      // track rocket's firing status
        this.moveSpeed = 2;         // pixels per frame
        this.sfxRocket = scene.sound.add('sfx_rocket')  // add rocket sfx
        this.velocityY = 0;
        this.velocityX = 0;
        this.gravity = 0.2;
        this.cop = cop;
        this.defaultScaling = 0.5;
        this.scaleX = this.defaultScaling;
        this.scaleY = this.defaultScaling;
        this.visible = false;
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            this.x = this.cop.x;
        }
        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
            this.velocityY = 10;
            if(keyLEFT.isDown) this.velocityX = -2;
            else if(keyRIGHT.isDown) this.velocityX = 2
            else this.velocityX = 0;
        }
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.visible = true;
            this.angle = (Math.atan2(this.velocityY, -this.velocityX) * (180/Math.PI)) + 90;
            this.y -= this.velocityY;
            this.velocityY -= this.gravity;
            this.scaleX =(this.defaultScaling + (Math.pow(this.velocityY, 2) / 300));
            this.scaleX =(this.defaultScaling + (-Math.pow(this.velocityY, 2) / 300));
            this.x += this.velocityX;
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding || this.y >= 480) {
            this.reset();
        }
    }

    // reset rocket to "ground"
    reset() {
        this.scaleY = this.defaultScaling;
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
        this.visible = false;
        this.angle = -90;
    }
}
