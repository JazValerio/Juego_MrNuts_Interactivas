export class Collecters {
    constructor(scene,levelData) {
        this.scene = scene;
        this.levelData = levelData;
    }

    create() {

        this.scene.anims.create({
            key: 'fix-box',
            frames: this.scene.anims.generateFrameNumbers('fix-box', {start: 0, end: 75}),
            frameRate: 30,
            repeat: -1
          });

        this.fixboxes = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
          });

          this.levelData.fixboxes.forEach((item)=>{
            let fixbox = this.scene.physics.add.sprite(item.x, item.y, 'fix-box').setOrigin(0,0);
            fixbox.setSize(50,50);
            fixbox.setScale(0.7);
            fixbox.setOffset(25, 50);

            //enable physics
            this.scene.add.existing(fixbox, true);
        
            //play burning animation
            fixbox.anims.play('fix-box');
        
            //add sprite to group
            this.fixboxes.add(fixbox);
        
          });
    }

    get () {
        return this.fixboxes;
    }
}