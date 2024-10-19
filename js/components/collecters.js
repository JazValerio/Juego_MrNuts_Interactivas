export class Collecters {
  constructor(scene, levelData) {
    this.scene = scene;
    this.levelData = levelData;
  }

  create() {

    this.scene.anims.create({
      key: 'fix-box',
      frames: this.scene.anims.generateFrameNumbers('fix-box', { start: 0, end: 74 }),
      frameRate: 30,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'power',
      frames: this.scene.anims.generateFrameNumbers('power', { start: 0, end: 30 }),
      frameRate: 20,
      repeat: -1
    });

    this.collectors = this.scene.physics.add.group({
      allowGravity: false,
      immovable: true
    });

    this.levelData.collectors.forEach((item) => {
      let collector = this.scene.physics.add.sprite(item.x, item.y, item.key).setOrigin(0, 0);
      if (item.key == 'fix-box') {
        collector.setSize(50, 50);
        collector.setScale(0.7);
        collector.setOffset(25, 50);
      }
      if (item.key == 'power') {
        collector.setSize(35, 35);
        collector.setScale(0.5);
        collector.setOffset(15, 25);
      }

      //enable physics
      this.scene.add.existing(collector, true);

      //play burning animation
      collector.anims.play(item.key);

      //add sprite to group
      this.collectors.add(collector);

    });
  }

  getFixBoxCollectors() {
    let fixBoxCollectors = [];
    this.collectors.children.iterate(function (collector) {
      if (collector.texture.key === 'fix-box') {
        fixBoxCollectors.push(collector);
      }
    });
    return fixBoxCollectors;  
  }

  getPowerCollectors() {
    let powerCollectors = [];
    this.collectors.children.iterate(function (collector) {
      if (collector.texture.key === 'power') {
        powerCollectors.push(collector);
      }
    });
    return powerCollectors;  
  }

  get() {
    return this.collectors;
  }
}