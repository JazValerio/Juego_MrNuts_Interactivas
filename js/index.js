import { Game } from './game.js';

let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 700,
    scene: [Game],
    physics:{
        default: 'arcade',
        arcade:{
            gravity:{y: 1500},
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    }
};

let game = new Phaser.Game(config);