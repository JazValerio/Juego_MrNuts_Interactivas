export class Enemy {
    constructor(scene,levelData) {
        this.scene = scene;
        this.levelData = levelData;
    }

    create() {

        this.scene.anims.create({
            key: 'enemy',
            frames: this.scene.anims.generateFrameNumbers('enemy', {start: 0, end: 75}),
            frameRate: 30,
            repeat: -1
          });

        this.enemies = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
          });

          this.levelData.enemies.forEach((item)=>{
            let enemy = this.scene.physics.add.sprite(item.x, item.y, 'enemy').setOrigin(0,0);
            enemy.setSize(90,70);
            enemy.setScale(0.7);

            //enable physics
            this.scene.add.existing(enemy, true);
        
            //play burning animation
            enemy.anims.play('enemy');
        
            //add sprite to group
            this.enemies.add(enemy);
        
          });
    }

    get () {
        return this.enemy;
    }
}