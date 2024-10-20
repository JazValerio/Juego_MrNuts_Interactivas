
//import { loader } from "../loader";

export class Platform {

    /*this.levelData = {
    platforms: [
      { 'x': 470, 'y': 690, 'tiles': 1, 'key': 'tile' },
      { 'x': 600, 'y': 600, 'tiles': 1, 'key': 'tile' },
      { 'x': 133, 'y': 690, 'tiles': 1, 'key': 'tile' },
      { 'x': 800, 'y': 500, 'tiles': 1, 'key': 'tile' },
      { 'x': 880, 'y': 400, 'tiles': 1, 'key': 'tile' }
    ]
  }*/

    constructor(scene,levelData) {
        this.scene = scene;
        this.levelData = levelData;
    }

    create(){

        this.scene.anims.create({
            key: 'energyBall',
            frames: this.scene.anims.generateFrameNumbers('energyBall', {start: 0, end: 59}),
            frameRate: 30,
            repeat: -1
          });
          
          this.createPlatforms();
          this.createEnergyBalls();
          
    }

    createPlatforms(){
        this.platforms = this.scene.physics.add.staticGroup();

        this.levelData.platforms.forEach((item)=>{
            let platform;
            if(item.tiles == 1){
              platform = this.scene.add.sprite(item.x, item.y, item.key).setOrigin(0,0);
            }else{
              let w = this.scene.textures.get(item.key).get(0).width;
              console.log(w);
              let h = this.scene.textures.get(item.key).get(0).height;
              //create tile sprite
              platform = this.scene.add.tileSprite(item.x, item.y, item.tiles*w, h, item.key);
            }
            //enable physics
            this.scene.physics.add.existing(platform, true);
            //add sprite to group
            this.platforms.add(platform);
          });
    }

    createEnergyBalls(){
        //create eneygy group
        this.energyBalls = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
          });
          this.levelData.energyBalls.forEach((item)=>{
            let energyBall = this.scene.add.sprite(item.x, item.y, 'energyBall').setOrigin(0,0);
            energyBall.setScale(0.8);

           
            //enable physics
            this.scene.add.existing(energyBall, true);
        
            //play burning animation
            energyBall.anims.play('energyBall');
        
            //add sprite to group
            this.energyBalls.add(energyBall);
        
          });
    }
    
    get(){
        return this.platforms;
    }

    getEnergyBalls(){
        return this.energyBalls;
    }

}