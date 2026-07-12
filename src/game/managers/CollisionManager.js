export class CollisionManager {

    static create(scene) {

        this.playerPlatform(scene);

        this.playerBubble(scene);

        this.bubblePlatform(scene);

        this.playerFruit(scene);

        this.fruitPlatform(scene);

    }

    static playerPlatform(scene) {

        scene.physics.add.collider(

            scene.player,

            scene.platformLayer

        );

    }

    static playerBubble(scene) {

        scene.physics.add.overlap(

            scene.player,

            scene.bubbles,

            (player, bubble) => {

                if (player.body.velocity.y <= 0) return;

                // Burbuja con enemigo

                if (bubble.enemyInside) {

                    console.log("BURBUJA CON ENEMIGO");

                    bubble.pop();

                }

                // Burbuja vacía

                else {

                    player.bounceOnBubble();

                }

            }

        );

    }

    static bubblePlatform(scene) {

        scene.physics.add.collider(

            scene.bubbles,

            scene.platformLayer,

            (bubble) => {

                bubble.hitPlatform();

            }

        );

    }

    static playerFruit(scene){

        scene.physics.add.overlap(

            scene.player,

            scene.fruits,

            (player, fruit)=>{

                fruit.collect();

            }

        );

    }

    static fruitPlatform(scene){

        scene.physics.add.collider(

            scene.fruits,

            scene.platformLayer

        );

    }
}