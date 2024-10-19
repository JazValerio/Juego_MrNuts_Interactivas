export function loader(scene){

    scene.load.image('background','./img/game-assets/fondo.png');

    scene.load.image('tile','./img/game-assets/platform.png');

    scene.load.spritesheet('MrNuts','./img/game-assets/Caminar-spritepng.png',{frameWidth:120,frameHeight:170});
    scene.load.spritesheet('MrNuts-idle','./img/game-assets/idle-sprite.png',{frameWidth:120,frameHeight:170});
    scene.load.spritesheet('MrNuts-interact','./img/game-assets/Interaccion-sprite.png',{frameWidth:120,frameHeight:170});
    scene.load.spritesheet('energyBall','./img/game-assets/energball-sprite.png',{frameWidth:45,frameHeight:45});
    scene.load.spritesheet('enemy','./img/game-assets/enemigo-sprite.png',{frameWidth:130,frameHeight:109});
    scene.load.spritesheet('power','./img/game-assets/energy-spritet.png',{frameWidth:60,frameHeight:69});
    scene.load.spritesheet('fix-box','./img/game-assets/fix-box-sprite.png',{frameWidth:95,frameHeight:113});
}