// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        //animations
        this.anims.create({
            key: 'fly',
            frameRate: 15,
            frames: this.anims.generateFrameNumbers(texture, { start: 0, end: 1, first: 0}),
            repeat: -1
        });
        this.anims.create({
            key: 'fall',
            frameRate: 0,
            frames: this.anims.generateFrameNumbers(texture, { start: 2, end: 2, first: 2}),
            repeat: -1
        });
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;         // pixels per frame
        //friendly drone animation
        this.anims.play('fly');

        //physics stuff for after death
        this.velocityX = -this.moveSpeed;
        this.velocityY = 0;
        this.gravity = 0.2;
        this.caught = false;
        this.startingY = this.y;
        this.angularMomentum = 0;

        // Code by SalilPT
        this.setScale(2);
        //
    }

    update() {
        //while active
        if(!this.caught){
            // move spaceship left
            this.x -= this.moveSpeed;
            // wrap around from left edge to right edge
            if(this.x <= 0 - this.width) {
                this.reset();
            }
        } else if(this.y < game.config.height){
            this.x += this.velocityX;
            this.y -= this.velocityY;
            this.velocityY -= this.gravity;
            this.angle += this.angularMomentum;
        }
    }

    isCaught(){
        this.caught = true;
        this.anims.play('fall');
        this.angularMomentum = Math.random() * (1 + 1) - 1;
    }

    // position reset
    reset() {
        this.caught = false;
        this.x = game.config.width;
        this.y = this.startingY;
        this.velocityY = 0;
        this.anims.play('fly');
        this.angle = 0;
    }
}