import { Enemy } from '../entities/Enemy';

export class EnemyManager {

    static create(scene) {

        this.createEnemies(scene);

        this.createBubbleCollision(scene);

    }

    static createEnemies(scene) {

        const positions = [

            { x: 250, y: 200 },
            { x: 350, y: 200 },
            { x: 450, y: 200 },
            { x: 550, y: 200 },
            { x: 650, y: 200 }

        ];


        positions.forEach(pos => {

            const enemy = new Enemy(
                scene,
                pos.x,
                pos.y,
                'rat'
            );

            scene.enemies.add(enemy);

            scene.physics.add.collider(
                enemy,
                scene.platformLayer
            );

        });

    }

    static createBubbleCollision(scene) {

        scene.physics.add.overlap(

            scene.bubbles,

            scene.enemies,

            (bubble, enemy) => {

                if (bubble.state === 'PROJECTILE' &&
                    enemy.state !== 'TRAPPED' &&
                    bubble.enemyInside === null
                    ) {

                    console.log("ENEMIGO ATRAPADO");

                    enemy.changeState('TRAPPED');

                    enemy.trappedBubble = bubble;

                    bubble.enemyInside = enemy;

                }

            }

        );

    }

}