import { EnemyManager } from './EnemyManager';

const LEVELS = {
    1: {
        time: 99,
        enemies: [
            'bee',
            'dragonfly',
            'fly',
            'rat',
            'rat'
        ]
    },
    2: {
        time: 99,
        enemies: [
            'rat',
            'fly',
            'rat',
            'fly',
            'rat'
        ]
    },
    3: {
        time: 80, 
        enemies: [
            'bee',
            'fly',
            'bee',
            'fly',
            'rat'
        ]
    }
};

export class LevelManager {

    static load(scene, level) {
        const config = LEVELS[level];

        if (!config) {
            console.log("🏆 ¡Felicidades! Has superado todos los niveles disponibles.");
            return;
        }

        scene.currentLevel = level;
        scene.levelTime = config.time;

        console.log("🎬 --- CARGANDO NIVEL ---");
        console.log("Nivel Actual:", level);
        console.log("Tiempo Límite:", scene.levelTime);

        EnemyManager.create(
            scene,
            config.enemies
        );
    }

    
}