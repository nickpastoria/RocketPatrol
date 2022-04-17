class Cop extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.moveSpeed = 2;         // pixels per frame
        this.velocity = 0;
        this.trueX = x;
        this.trueY = y;
        this.walkRotate = 10;
    }

    update() {
        if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
            this.trueX -= this.moveSpeed;
            this.x = this.trueX;
            this.angle = (cosFactor * this.walkRotate - this.walkRotate);
            this.y = this.trueY + (sinFactor - 1) * 5;
        } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.trueX += this.moveSpeed;
            this.x = this.trueX;
            this.angle = (sinFactor * this.walkRotate + this.walkRotate);
            this.y = this.trueY + (cosFactor - 1) * 5;
        } else if (keyRIGHT.isUp && keyLEFT.isUp) {
            this.angle = 0;
            this. y = this.trueY;
        }
    }
}