
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

/*
    static WIDTH = 1200;
    static HEIGHT = 700;

    static sizePlat = [270, 70];

    static arrayPlataforms = [
        [470, 690, Platform.sizePlat[0], 0, 1],
        [600, 600, Platform.sizePlat[0], 0, 1],
        [133, 690, Platform.sizePlat[0], 0, 1],
        [800, 500, Platform.sizePlat[0], 0, 1]
    ];

    constructor(scene) { // Corrige el error tipográfico en 'constructor'
        this.relatedScene = scene;
    }

    create() {
        this.plataform = [];

        Platform.arrayPlataforms.forEach(esquema => { // Corrige el nombre 'esquema'
            let cord = [];
            let tile = [];

            for (let i = 0; i < esquema.length; i++) {
                if (i < 4) { 
                    cord.push(esquema[i]); 
                }
                if (i >= 4) { 
                    tile.push(esquema[i].toString()); // Corrige el uso de toString()
                }
            }

            this.plataform.push(this.relatedScene.physics.add.group({
                key: 'tile', // Asegúrate de que 'tile' esté precargado en preload()
                quantity: 1,
                setXY: { x: cord[0], y: cord[1], stepX: cord[2], stepY: cord[3] }
            }));
        });

        for (let i = 0; i < this.plataform.length; i++) { // Corrige el bucle for
            this.plataform[i].children.each((tile) => {
                tile.body.setImmovable(true).setAllowGravity(false); // Hace que las plataformas sean fijas
                tile.setData('id', Platform.arrayPlataforms[i][3]);
                tile.setData('index', i);
                tile.setData('last', this.plataform.length - 1);
            });
        }

        console.log(this.plataform);
        console.log(this.plataform[0].getChildren());
    }

    get() {
        return this.plataform;
    }*/
}