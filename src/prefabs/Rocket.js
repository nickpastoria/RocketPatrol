// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isFiring = false;      // track rocket's firing status
        this.moveSpeed = 2;         // pixels per frame
        this.sfxRocket = scene.sound.add('sfx_rocket')  // add rocket sfx
        this.velocity = 0;
        this.gravity = 0.2;
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
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
            this.scaleY = -(this.velocity / 7);
            this.scaleX =(1 + (-Math.pow(this.velocity, 2) / 300));
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding || this.y >= 480) {
            this.reset();
        }
    }

    // reset rocket to "ground"
    reset() {
        this.scaleY = 1;
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}
