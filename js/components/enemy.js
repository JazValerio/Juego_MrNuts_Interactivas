export class Enemy {
  constructor(scene, levelData, player) {
    this.scene = scene;
    this.levelData = levelData;
    this.player = player;
  }

  create() {

    this.scene.anims.create({
      key: 'enemy',
      frames: this.scene.anims.generateFrameNumbers('enemy', { start: 0, end: 75 }),
      frameRate: 30,
      repeat: -1
    });

    this.enemies = this.scene.physics.add.group({
      allowGravity: false,
      immovable: true
    });

    this.levelData.enemies.forEach((item) => {
      let enemy = this.scene.physics.add.sprite(item.x, item.y, 'enemy').setOrigin(0, 0);
      enemy.setSize(90, 70);
      enemy.setScale(0.7);

      //enable physics
      this.scene.add.existing(enemy, true);

      //play burning animation
      enemy.anims.play('enemy');

      //add sprite to group
      this.enemies.add(enemy);

      enemy.speed = 100;

    });

  }

  update() {
    //chatgpt: Ayudame a controlar que el enemigo se mueva a la vez que el player, cuando este se acerca a un rango específico este lo siga, toma en base este codigo (base del método pegado a chat)
    this.enemies.getChildren().forEach((enemy) => {
      let distance = Phaser.Math.Distance.Between(
        this.player.get().x, this.player.get().y,
        enemy.x, enemy.y
      );

      if (distance < 120) { 
        enemy.setVelocity(100);
        this.scene.physics.moveToObject(enemy, this.player.get(), enemy.speed);
      } else {
        enemy.setVelocity(0);
      }
    });
  }

  get() {
    return this.enemy;
  }
}