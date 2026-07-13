export class GroupManager {

    static create(scene){

        this.createBubbleGroup(scene);

        this.createEnemyGroup(scene);

        this.createFruitGroup(scene);

    }

    static createBubbleGroup(scene) {

        scene.bubbles = scene.physics.add.group({

            allowGravity: false,

            immovable: false

        });

    }

    static createEnemyGroup(scene) {

        scene.enemies = scene.physics.add.group();

    }

    static createFruitGroup(scene){

    scene.fruits =
    scene.physics.add.group();

    }
}