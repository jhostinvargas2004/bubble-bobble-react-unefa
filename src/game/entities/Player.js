import { Entity } from './Entity';
import { Bubble } from './Bubble';

export class Player extends Entity {

  constructor(scene, x, y) {
  super(scene, x, y, 'player_idle');

  this.speed = 160;
  this.jumpForce = -350;
  this.direction = 1;

  this.canAttack = true;
  this.isAttacking = false;

  this.play('idle');

  this.setSize(24, 24);
}


move(cursors) {


  if (cursors.left.isDown) {

    this.flipX = true;
    this.direction = -1;

    this.setVelocityX(-this.speed);

    if (!this.isAttacking) {
        this.play('hop', true);
    }


  } else if (cursors.right.isDown) {

    this.setVelocityX(this.speed);
    if (!this.isAttacking) {
       this.play('hop', true);
    }

    this.flipX = false;
    this.direction = 1;


  } else {

    this.setVelocityX(0);

    if (this.body.blocked.down && !this.isAttacking) {
      this.play('idle', true);
    }

}


  if (cursors.up.isDown && this.body.blocked.down) {

    this.setVelocityY(this.jumpForce);
    if (!this.isAttacking) {
       this.play('hop', true);
    }

  }

}

  attack() {

    if (!this.canAttack) return;

    this.canAttack = false;
    this.isAttacking = true;

    this.play('attack', true);

    this.scene.time.delayedCall(250, () => {

        const bubbleX = this.x + (this.direction * 22);
        const bubbleY = this.y - 8;

        const bubble = new Bubble(
          this.scene,
          bubbleX,
          bubbleY,
          this.direction
        );
        
        console.log("DIRECCION PLAYER:", this.direction);
        
        this.scene.bubbles.add(bubble);

        bubble.body.allowGravity = false;
        bubble.body.setVelocityX(this.direction * bubble.speed);

        console.log("burbuja agregada");

        });

    this.once('animationcomplete-attack', () => {

        this.isAttacking = false;

    });

    this.scene.time.delayedCall(300, () => {

        this.canAttack = true;

    });

}

}