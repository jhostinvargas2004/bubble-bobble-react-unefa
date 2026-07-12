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
    this.explodedByPlayer = false;


    this.speed = 240;
    this.floatSpeed = 40;


    this.horizontalMovement = 0;
    this.targetMovement = 0;

    this.body.setVelocityX(direction * this.speed);

    this.scene.time.delayedCall(300, () => {

        if (!this.active) return;

        this.changeState('FLOATING');

    });

    // Alerta a los 4 segundos
this.scene.time.delayedCall(4000, () => {

    if (!this.active) return;

    this.changeState('ALERT');

});


// Explosión automática a los 5 segundos
this.scene.time.delayedCall(5000, () => {

    if (!this.active) return;

    this.pop();

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

        case 'ALERT':

    this.scene.tweens.add({

        targets:this,

        alpha:0.3,

        duration:120,

        yoyo:true,

        repeat:-1

    });

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

    if(
        this.state !== 'FLOATING' &&
        this.state !== 'ALERT'
    ) return;


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

explodeByPlayer() {
    // evitar bucle
    if (this.explodedByPlayer) return;
    this.explodedByPlayer = true;

    let comboBubbles = [this]; // Empezar combo

    // verificacion de burbujas pegadas
    if (this.scene.bubbles) {
        this.scene.bubbles.getChildren().forEach((otherBubble) => {
            if (otherBubble !== this && otherBubble.active && otherBubble.enemyInside && !otherBubble.explodedByPlayer) {
                // distancia entre la burbuja inical del combo y el resto
                const distance = Phaser.Math.Distance.Between(this.x, this.y, otherBubble.x, otherBubble.y);
                
                if (distance < 60) { // Rango cercano
                    otherBubble.explodedByPlayer = true;
                    comboBubbles.push(otherBubble);
                }
            }
        });
    }

    const comboSize = comboBubbles.length;
    console.log(" ¡COMBO DETECTADO! Tamaño:", comboSize);

    // Mandamos a explotar todas las burbujas del combo
    comboBubbles.forEach((b) => {
        b.pop(comboSize);
    });
}
pop(comboSize = 1) {
    console.log("BURBUJA EXPLOTÓ");

    if (this.enemyInside) {
        const enemy = this.enemyInside;
        enemy.trappedBubble = null;
        
        // Sacar la rata un poco de la burbuja
        enemy.body.reset(enemy.x, enemy.y - 20);
        this.enemyInside = null;

        if (this.explodedByPlayer) {
            console.log("ENEMIGO ELIMINADO");
            enemy.changeState('DEAD');

            // enemigo derrotado = 1000pts
            if (this.scene.gainPoints) {
                this.scene.gainPoints(1000);
            }

            // dependiendo del combo la fruta
            FruitManager.spawn(this.scene, enemy.x, enemy.y - 40, comboSize);

        } else {
            console.log("ENEMIGO LIBERADO");
            enemy.changeState('ANGRY');
            enemy.body.setAllowGravity(true);
            enemy.setVelocityY(-150);
        }
    }

    this.body.enable = false;
    this.body.setVelocity(0, 0);
    this.scene.tweens.killTweensOf(this);
    this.alpha = 1;
    this.play('bubble_pop');

    this.once('animationcomplete', () => {
        this.destroy();
    });
}
}
