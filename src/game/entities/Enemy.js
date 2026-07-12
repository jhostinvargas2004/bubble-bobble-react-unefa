import Phaser from 'phaser';
import { Entity } from './Entity';
import { EnemyConfig } from '../config/EnemyConfig';

export class Enemy extends Entity {

    constructor(scene, x, y, type = 'rat') {

    const config = EnemyConfig[type];

    super(
        scene,
        x,
        y,
        config.idle
    );

    this.type = type;

        this.speed = config.speed;
        this.direction = 1;
        this.changeDirectionTimer = Phaser.Math.Between(2000,5000);

        // Estado inicial
        this.state = 'NORMAL';
        this.trappedBubble = null;
        this.play(config.idle);
        this.setScale(config.scale);
        this.body.setSize(config.body.width, config.body.height);
        this.body.setOffset(config.body.offsetX, config.body.offsetY);
    
    }


    changeState(newState) {

        this.state = newState;

        switch (this.state) {

            case 'NORMAL':
                this.body.setAllowGravity(true);

                this.speed = 40;

                this.play(EnemyConfig[this.type].idle, true);

                break;


case 'ANGRY':

    this.speed = 80;


    this.body.setAllowGravity(true);

    this.body.enable = true;


    // volver tamaño normal
    this.setScale(1.2);


    // despertar el cuerpo físico
    this.body.moves = true;


    // impulso para caer
    this.setVelocityY(-150);

    this.play(
    EnemyConfig[this.type].angry,
    true
);


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

                this.updateNormal();

                break;


            case 'ANGRY':

                this.updateAngry();

                break;


            case 'TRAPPED':

                this.updateTrapped();

                break;

        }

    }


    updateNormal() {

        this.setVelocityX(this.speed * this.direction);
            this.changeDirectionTimer -= this.scene.game.loop.delta;


    if(this.changeDirectionTimer <= 0){


        this.direction *= -1;


        this.flipX = this.direction === -1;


        this.changeDirectionTimer =
            Phaser.Math.Between(2000,5000);

    }

        if (this.body.blocked.left) {

            this.direction = 1;
            this.flipX = false;

        }

        if (this.body.blocked.right) {

            this.direction = -1;
            this.flipX = true;

        }

    }


    updateAngry() {
        console.log(
        "RATA",
        this.y,
        this.body.velocity.y,
        this.body.allowGravity
    );


        this.setVelocityX(this.speed * this.direction);

        if (this.body.blocked.left) {

            this.direction = 1;
            this.flipX = false;

        }

        if (this.body.blocked.right) {

            this.direction = -1;
            this.flipX = true;

        }

    }


   updateTrapped() {
    if (!this.trappedBubble) return;

    // Leer dinámicamente la configuración del tipo de enemigo actual
    const config = EnemyConfig[this.type];
    const offsetY = config.bubbleOffsetY || 0; // Si no existe, por defecto es 0

    this.x = this.trappedBubble.x;
    this.y = this.trappedBubble.y + offsetY; 
}
}