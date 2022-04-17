// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, cop, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isFiring = false;      // track rocket's firing status
        this.moveSpeed = 2;         // pixels per frame
        this.sfxRocket = scene.sound.add('sfx_rocket')  // add rocket sfx
        this.velocity = 0;
        this.gravity = 0.2;
        this.cop = cop;
        this.defaultScaling = 0.5;
        this.scaleX = this.defaultScaling;
        this.scaleY = this.defaultScaling;
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
            this.velocity = 10;
        }
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.velocity;
            this.velocity -= this.gravity;
            this.scaleY = -(this.velocity / 15);
            this.scaleX =(0.5 + (-Math.pow(this.velocity, 2) / 300));
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
    }
}
