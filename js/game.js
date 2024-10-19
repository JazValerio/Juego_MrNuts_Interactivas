import { Platform } from './components/platform.js';
import { Player } from './components/player.js';
import{loader} from './loader.js';
import { Enemy } from './components/enemy.js';
import { Collecters } from './components/collecters.js';
export class Game extends Phaser.Scene{

    constructor(){
        super({key:'game'});
    }

    init(){
       
       this.player= new Player(this);
       
    }

    preload(){
       loader(this); 
       this.load.json('levelData', './data/levelData.json');
    }

    create(){
        const levelData= this.cache.json.get('levelData');
        this.plataform= new Platform(this,levelData); 
        this.enemy= new Enemy(this,levelData);
        this.collecters= new Collecters(this,levelData);
        this.add.image(0,0,'background').setOrigin(0,0).setScale(1);
        this.plataform.create();
        this.player.create();
        this.enemy.create();
        this.collecters.create();
        this.create_colliders();
    }

    update(){
        this.player.update();
        this.input.on('pointerdown', function (pointer) {
            console.log("🦐" + pointer.x, pointer.y);
          });
    }

    create_colliders(){
        this.physics.add.collider(this.player.get(), this.plataform.get(),null,/*evistar la colisión con la cabeza del player*/(player) => {
            if(player.body.velocity.y <0) return false;
            return true;
        });

        this.physics.add.overlap(this.player.get(), this.plataform.getEnergyBalls(),(player, energyBall) => {
            this.player.playerSlowDown();
            energyBall.destroy();
        },null);

        this.physics.add.overlap(this.player.get(), this.collecters.getPowerCollectors(),(player, power) => {
            this.player.playerSpeedBoost();
            power.destroy();
        },null);
    } 

    player_on_platform(playerR, platform){
        //esto queda aquí por si se quiere tener un control sobre las colisiones entre player y plataform
    }
};





/*

//create a scene
let gameScene = new Phaser.Scene('Game');

let animate = true;

let gameW;
let gameH;
//enemy
let enemy;

//load assets
gameScene.preload = function(){
    this.load.image('background', './img/game-assets/fondo.png');

}

gameScene.create = function(){
    this.add.image(0,0,'background').setOrigin(0,0).setScale(1);
    
}

/*function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function animateObject(object, limit, speed){
    
    if(animate){
        speed*=1;
        if(object.y>= limit) animate = false;
    }else{
        speed*=-1;
        if(object.y < 0) animate = true;
    }
    object.y += speed;
    object.rotation += getRandom(-0.1, 0.1);
}

gameScene.update = function(){
    
   
}

//create game and pass config
let game = new Phaser.Game(config);*/