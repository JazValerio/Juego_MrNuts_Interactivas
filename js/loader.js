export function loader(scene){

    scene.load.image('background','./img/game-assets/fondo.png');

    scene.load.image('tile','./img/game-assets/platform.png');

    scene.load.spritesheet('MrNuts','./img/game-assets/Caminar-spritepng.png',{frameWidth:120,frameHeight:170});
    scene.load.spritesheet('MrNuts-idle','./img/game-assets/idle-sprite.png',{frameWidth:120,frameHeight:170});
    scene.load.spritesheet('energyBall','./img/game-assets/energball-sprite.png',{frameWidth:45,frameHeight:45});

    
}