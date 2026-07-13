import Phaser from 'phaser';
import { Entity } from './Entity';
import { EnemyConfig } from '../config/EnemyConfig';

export class Enemy extends Entity {

    constructor(scene, x, y, type = 'rat') {
        const config = EnemyConfig[type];
        super(scene, x, y, config.idle);

        this.type = type;
        this.isFlying = config.isFlying;
        
        this.body.setCollideWorldBounds(true);
        this.baseSpeed = config.speed;
        this.speed = this.baseSpeed;
        
        this.offsetX = Phaser.Math.Between(-40, 40);
        this.offsetY = this.isFlying ? Phaser.Math.Between(-30, 30) : 0;
        
        this.directionX = 1;
        this.directionY = this.isFlying ? (Phaser.Math.Between(0, 1) === 0 ? 1 : -1) : 0;
        
        this.changeDirectionTimer = Phaser.Math.Between(2000, 5000);
        this.jumpTimer = Phaser.Math.Between(1500, 4000); 

        this.state = 'NORMAL';
        this.trappedBubble = null;
        
        this.play(config.idle);
        this.setScale(config.scale);
        this.body.setSize(config.body.width, config.body.height);
        this.body.setOffset(config.body.offsetX, config.body.offsetY);

        if (this.isFlying || this.type === 'ghost') {
            this.body.setAllowGravity(false);
        }
    }

    changeState(newState) {
        this.state = newState;
        const config = EnemyConfig[this.type];

        switch (this.state) {
            case 'NORMAL':
                this.body.setAllowGravity(!this.isFlying && this.type !== 'ghost');
                this.speed = this.baseSpeed;
                this.clearTint();
                this.play(config.idle, true);
                break;

            case 'ANGRY':
                this.speed = this.baseSpeed * 1.6; 
                this.body.setAllowGravity(!this.isFlying && this.type !== 'ghost');
                this.body.enable = true;
                this.setScale(config.scale); 
                this.body.moves = true;
                this.setVelocityY(-150);

                if (this.isFlying) {
                    this.directionY = Phaser.Math.Between(0, 1) === 0 ? 1 : -1;
                }
                
                this.setTint(0xff5555); 
                this.play(config.angry, true);
                break;

            case 'TRAPPED':
                this.body.setAllowGravity(false);
                this.body.moves = false;
                this.setVelocity(0);
                this.setScale(1.2);
                break;

            case 'DEAD':
                this.destroy();
                break;
        }
    }

    update() {
        switch (this.state) {
            case 'NORMAL':
            case 'ANGRY':
                this.handleMovement();
                break;
            case 'TRAPPED':
                this.updateTrapped();
                break;
        }
    }

    handleMovement() {
        const config = EnemyConfig[this.type];
        const delta = this.scene.game.loop.delta;
        
        const player = (this.scene.player && !this.scene.player.isSpawning) ? this.scene.player : null; 

        const limiteIzquierdo = 32;
        const limiteDerecho = this.scene.sys.game.config.width - 32;
        const techoDeVuelo = 150; 
        const pisoDeVuelo = 320;  

        if (this.type === 'ghost') {
            if (this.body.allowGravity) {
                this.body.setAllowGravity(false);
            }
            
           
            if (!player) {
                this.setVelocityX(this.speed * 0.3 * this.directionX);
                this.setVelocityY(this.speed * 0.2 * this.directionY);

                if (this.x <= limiteIzquierdo) this.directionX = 1;
                if (this.x >= limiteDerecho) this.directionX = -1;
                if (this.y <= techoDeVuelo) this.directionY = 1;
                if (this.y >= pisoDeVuelo) this.directionY = -1;

                if (this.body.blocked.left || this.body.blocked.right) this.directionX *= -1;
                if (this.body.blocked.up || this.body.blocked.down) this.directionY *= -1;
                return;
            }

            const angle = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
            this.body.setVelocityX(Math.cos(angle) * this.speed);
            this.body.setVelocityY(Math.sin(angle) * this.speed);
            
            this.directionX = player.x > this.x ? 1 : -1;
            this.flipX = config.invertFlip ? (this.directionX !== -1) : (this.directionX === -1);
            return; 
        } 

        if (player) {
            this.changeDirectionTimer -= delta;
            if (this.changeDirectionTimer <= 0) {
                const targetX = player.x + this.offsetX;
                this.directionX = targetX > this.x ? 1 : -1;
                this.changeDirectionTimer = Phaser.Math.Between(800, 1500); 
            }
        } else {
            this.changeDirectionTimer -= delta;
            if (this.changeDirectionTimer <= 0) {
                this.directionX = Phaser.Math.Between(0, 1) === 0 ? 1 : -1;
                if (this.isFlying) {
                    this.directionY = Phaser.Math.Between(0, 1) === 0 ? 1 : -1;
                }
                this.changeDirectionTimer = Phaser.Math.Between(1000, 3000);
            }

            if (this.x <= limiteIzquierdo) {
                this.directionX = 1;
            } else if (this.x >= limiteDerecho) {
                this.directionX = -1;
            }
        }

        if (this.isFlying) {
            this.setVelocityX(this.speed * this.directionX);
            this.setVelocityY((this.speed * 0.6) * this.directionY); 
            if (player) {
                const targetY = player.y + this.offsetY;
                if (targetY < this.y - 10) {
                    this.directionY = -1;
                } else if (targetY > this.y + 10) {
                    this.directionY = 1;
                }
            } else {
                if (this.y <= techoDeVuelo) {
                    this.directionY = 1; 
                } else if (this.y >= pisoDeVuelo) {
                    this.directionY = -1;
                }
            }

            if (this.body.blocked.up) this.directionY = 1;
            if (this.body.blocked.down) this.directionY = -1;
        } 
        else {
            this.setVelocityX(this.speed * this.directionX);
            
            this.jumpTimer -= delta;
            if (this.jumpTimer <= 0) {
                if (this.body.blocked.down) {
                    if (player && player.y < this.y - 32) {
                        this.setVelocityY(config.jumpForce || -250);
                    } else if (!player && Phaser.Math.Between(0, 3) === 0) {
                        this.setVelocityY(config.jumpForce || -250);
                    }
                }
                this.jumpTimer = Phaser.Math.Between(1000, 2500);
            }
        }

        if (this.body.blocked.left) {
            this.directionX = 1;
        } else if (this.body.blocked.right) {
            this.directionX = -1;
        }

        this.flipX = config.invertFlip ? (this.directionX !== -1) : (this.directionX === -1);
    }

    updateTrapped() {
        if (!this.trappedBubble) return;

        const config = EnemyConfig[this.type];
        const offsetY = config.bubbleOffsetY || 0;

        this.x = this.trappedBubble.x;
        this.y = this.trappedBubble.y + offsetY; 
    }
}