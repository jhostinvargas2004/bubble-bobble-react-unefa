import { Entity } from './Entity';
import { Bubble } from './Bubble';
import { SoundManager } from '../managers/SoundManager';

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
    this.isSpawning = false; 
    this.play('idle');
    this.setScale(1.4);
    this.setSize(24, 24);
  }

spawnInBubble() {
    this.isSpawning = true;
    this.isDead = false;
    this.setVisible(true);

    const targetY = this.y; 
    this.setY(40); 

    this.body.checkCollision.none = true; 
    this.body.allowGravity = false; 
    this.setVelocity(0, 0);
    this.play('idle');

    const spawnBubble = this.scene.add.sprite(this.x, this.y, 'player_spawn');
    spawnBubble.setScale(1.8); 
    spawnBubble.setDepth(this.depth + 1);
    
    let reachedDestination = false;

    spawnBubble.play('spawner_bubble_appear');

    spawnBubble.once('animationcomplete-spawner_bubble_appear', () => {
        spawnBubble.play('spawner_bubble_loop');
        this.setVelocityY(100);
    });

    const updateEvent = () => {
        if (!spawnBubble.active) return;

        spawnBubble.x = this.x;
        spawnBubble.y = this.y;

        if (!reachedDestination && this.y >= targetY) {
            reachedDestination = true;
            this.setVelocity(0, 0);
            this.setY(targetY); 

            this.scene.time.delayedCall(1000, () => {
                if (!spawnBubble.active) return;

                const blinkTween = this.scene.tweens.add({
                    targets: spawnBubble,
                    alpha: 0.2,
                    duration: 80,
                    yoyo: true,
                    repeat: 5 
                });

               
                this.scene.time.delayedCall(500, () => {
                    blinkTween.stop();
                    spawnBubble.alpha = 1; 

                    spawnBubble.play('spawner_bubble_burst');
                    
                    spawnBubble.once('animationcomplete-spawner_bubble_burst', () => {
                        spawnBubble.destroy();
                        
                        this.body.checkCollision.none = false;
                        this.body.allowGravity = true;
                        this.isSpawning = false; 

                        this.scene.events.off('update', updateEvent);
                    });
                });
            });
        }
    };

    this.scene.events.on('update', updateEvent);
  }
  move(cursors) {
    if (this.isDead || this.isSpawning) return;

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
      SoundManager.play(this.scene,"jump");
      if (!this.isAttacking) {
         this.play('hop', true);
      }
    }
  }

  bounceOnBubble() {
    if (this.isDead || this.isSpawning) return; 
    this.setVelocityY(-300);
    this.play('hop', true);
  }

  attack() {
    if (this.isDead || !this.canAttack || this.isSpawning) return;

    this.canAttack = false;
    this.isAttacking = true;
    this.play('attack', true);

    this.scene.time.delayedCall(250, () => {
        if (this.isDead || this.isSpawning) return; 

        const bubbleX = this.x + (this.direction * 22);
        const bubbleY = this.y - 8;
        SoundManager.play(this.scene,"bubbleShoot");
        const bubble = new Bubble(this.scene, bubbleX, bubbleY, this.direction);
        this.scene.bubbles.add(bubble);
        bubble.body.allowGravity = false;
        bubble.body.setVelocityX(this.direction * bubble.speed);
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
      if (this.isDead || this.isSpawning) return; 
      this.isDead = true;

      console.log("💥 ¡EL JUGADOR HA MUERTO!");
      SoundManager.play(this.scene,"playerDeath");
      this.body.setVelocity(0, 0);
      this.body.enable = false;
      this.play('death', true);

      this.once('animationcomplete-death', () => {
          this.setVisible(false);
          if (this.scene.handlePlayerDeath) {
            SoundManager.gameOver(this.scene);
            this.scene.handlePlayerDeath();
          }
      });
    }
}