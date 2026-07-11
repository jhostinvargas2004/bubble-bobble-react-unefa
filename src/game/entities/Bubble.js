import Phaser from 'phaser';

export class Bubble extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, direction) {

    super(scene, x, y, 'bubble');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setAllowGravity(false);

    this.play('bubble_float');

    this.speed = 80;

    this.body.setVelocityX(direction * this.speed);

    this.scene.time.delayedCall(4000, () => {
    this.destroy();
});

    
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.y -= 1;
  }

}