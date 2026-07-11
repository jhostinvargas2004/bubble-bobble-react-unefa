import Phaser from 'phaser';

export class Bubble extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, direction) {

    super(scene, x, y, 'bubble');


    scene.add.existing(this);
    scene.physics.add.existing(this);


    this.body.allowGravity = false;


    this.play('bubble_float');


    this.speed = 240;
    this.floatSpeed = 40;


    console.log("DIRECCION BURBUJA:", direction);


    // Sale como proyectil
    this.body.setVelocityX(direction * this.speed);


    console.log("VELOCIDAD:", this.body.velocity);


    this.scene.time.delayedCall(300, () => {

      if (!this.active) return;


      this.body.setVelocityX(0);
      this.body.setVelocityY(-this.floatSpeed);


      console.log("SUBIENDO");

    });

  }

}