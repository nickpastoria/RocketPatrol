
//Nicholas Pastoria, Rocket Patrol Mod (Drone Patrol), 4/18/2022, 18 hours
/*Project Points
Full theme redesign: 60 points
New weapon:          20 points
New animated ship:   10 points
Display time:        10 points

extra-
Parallaxing:         10 points
  (this is barely noticeable though)
*/
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    fps: {
        target: 60,
        forceSetTimeOut: true
      },
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT, sinFactor, cosFactor;