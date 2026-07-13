import { Enemy } from '../entities/Enemy';

export class EnemyManager {

    static create(scene, enemyList, customPositions = null) {
       
        const defaultPositions = [
            { x: 250, y: 200 },
            { x: 350, y: 200 },
            { x: 450, y: 200 },
            { x: 550, y: 200 },
            { x: 650, y: 200 }
        ];


        const positions = customPositions || defaultPositions;

        enemyList.forEach((type, index) => {
            const pos = positions[index];

            if (!pos) return;

            const enemy = new Enemy(
                scene,
                pos.x,
                pos.y,
                type
            );
            scene.enemies.add(enemy);
        });
    }

    static remaining(scene) {
        return scene.enemies.countActive(true);
    }
}