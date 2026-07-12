import Phaser from 'phaser';
import { Entity } from './Entity';

export class Enemy extends Entity {

    constructor(scene, x, y) {

        super(scene, x, y, 'rat_idle');

        this.speed = 40;
        this.direction = 1;
        this.changeDirectionTimer = Phaser.Math.Between(2000,5000);

        // Estado inicial
        this.state = 'NORMAL';
        this.trappedBubble = null;
        this.play('rat_idle');
        //this.setOrigin(0.5, 1);
        this.setScale(1.8);
        this.body.setSize(24, 24);
        this.body.setOffset(20, 20);
        

    }


    changeState(newState) {

        this.state = newState;

        switch (this.state) {

            case 'NORMAL':

                this.speed = 40;

                this.play('rat_idle', true);

                break;


            case 'ANGRY':

                this.speed = 80;

                this.play('rat_angry', true);

                break;


            case 'TRAPPED':

            this.body.setAllowGravity(false);

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


    this.x = this.trappedBubble.x;

    this.y = this.trappedBubble.y -11;

}

}