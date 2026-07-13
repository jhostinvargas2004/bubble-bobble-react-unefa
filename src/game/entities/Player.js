import { Entity } from './Entity';
import { Bubble } from './Bubble';

export class Player extends Entity {

  constructor(scene, x, y) {
    super(scene, x, y, 'player_idle');
    this.body.setCollideWorldBounds(true);

    this.speed = 160;
    this.jumpForce = -350;
    this.direction = 1;

    this.canAttack = true;
    this.isAttacking = false;
    this.isDead = false; 

    this.play('idle');
    this.setScale(1.4);
    this.setSize(24, 24);
  }

  move(cursors) {
    if (this.isDead) return;

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

      if (
          this.body.blocked.down &&
          !this.isAttacking &&
          this.body.velocity.y === 0
      ) {
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

  bounceOnBubble() {
    if (this.isDead) return; 
    this.setVelocityY(-300);
    this.play('hop', true);
  }

  attack() {
    if (this.isDead || !this.canAttack) return;

    this.canAttack = false;
    this.isAttacking = true;

    this.play('attack', true);

    this.scene.time.delayedCall(250, () => {
        if (this.isDead) return; 

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

      if(this.body.blocked.down && !this.isDead){
          this.play('idle', true);
      }
    });

    this.scene.time.delayedCall(300, () => {
        this.canAttack = true;
    });
  }

  die() {
      if (this.isDead) return; 
      this.isDead = true;

      console.log("💥 ¡EL JUGADOR HA MUERTO!");

      this.body.setVelocity(0, 0);
      this.body.enable = false;

      this.play('death', true);

      this.once('animationcomplete-death', () => {
          this.setVisible(false);

          if (this.scene.handlePlayerDeath) {
              this.scene.handlePlayerDeath();
          }
      });
    }
  }