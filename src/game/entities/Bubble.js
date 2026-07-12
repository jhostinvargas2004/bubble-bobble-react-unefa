import Phaser from 'phaser';
import { FruitManager } from '../managers/FruitManager';

export class Bubble extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, direction) {

    super(scene, x, y, 'bubble');

    scene.add.existing(this);
    scene.physics.add.existing(this);


    this.body.allowGravity = false;


    this.play('bubble_float');


    this.state = 'PROJECTILE';
    this.enemyInside = null;


    this.speed = 240;
    this.floatSpeed = 40;


    this.horizontalMovement = 0;
    this.targetMovement = 0;

    this.body.setVelocityX(direction * this.speed);

    this.scene.time.delayedCall(300, () => {

        if (!this.active) return;

        this.changeState('FLOATING');

    });

  }



  changeState(newState) {

    this.state = newState;



    switch(this.state) {

      case 'PROJECTILE':

        break;


      case 'FLOATING':

        this.body.setVelocityX(0);

        this.body.setVelocityY(
            -this.floatSpeed
        );

        break;


      case 'PLATFORM_BOUNCE':


        this.targetMovement =
            Phaser.Math.FloatBetween(-60,60);


        this.body.setVelocityY(-80);



        this.body.setVelocityX(
            this.targetMovement
        );


        this.scene.time.delayedCall(500, () => {

            if (!this.active) return;

            this.changeState('FLOATING');

        });


        break;

    }

  }



  hitPlatform() {

    if(this.state !== 'FLOATING') return;



    this.changeState(
        'PLATFORM_BOUNCE'
    );


  }



  preUpdate(time, delta) {

    super.preUpdate(time, delta);



    if(!this.active) return;

    if(this.state === 'PLATFORM_BOUNCE') {


        this.horizontalMovement =
            Phaser.Math.Linear(
                this.horizontalMovement,
                this.targetMovement,
                0.03
            );



        this.body.setVelocityX(
            this.horizontalMovement
        );

    }


}

pop(){

    console.log("BURBUJA EXPLOTÓ");


    if(this.enemyInside){

        console.log("HAY ENEMIGO EN LA BURBUJA");


        const enemyX = this.enemyInside.x;
        const enemyY = this.enemyInside.y;


        console.log(
            "POSICION FRUTA:",
            enemyX,
            enemyY
        );


        this.enemyInside.trappedBubble = null;


        this.enemyInside.changeState('DEAD');


        this.enemyInside = null;


        FruitManager.spawn(
            this.scene,
            enemyX,
            enemyY - 40
        );

    } else {

        console.log("BURBUJA SIN ENEMIGO");

    }

    this.body.setVelocity(0,0);


    this.play('bubble_pop');


    this.once('animationcomplete', () => {

        this.destroy();

    });

}
}
