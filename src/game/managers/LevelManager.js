import { EnemyManager } from './EnemyManager';
import { MapManager } from './MapManager';

const LEVELS = {
    1: {
        map: 'mapa',
        time: 99,
        enemies: ['bee', 'dragonfly', 'fly', 'rat', 'rat']
    },
    2: {
        map: 'mapa1',
        time: 99,
        enemies: ['rat', 'fly', 'rat', 'fly', 'rat']
    },
    3: {
        map: 'mapa2',
        time: 80,
        enemies: ['bee', 'fly', 'bee', 'fly', 'rat']
    }
};

export class LevelManager {

    static load(scene, level) {
        const config = LEVELS[level];

        if (!config) {
            console.log("¡GANASTE EL JUEGO!");
            return;
        }

        EnemyManager.clear(scene);

        scene.currentLevel = level;
        scene.levelTime = config.time;
        
        // 1. IMPORTANTE: Apagamos la bandera AQUÍ para permitir futuros cambios de nivel
        scene.isChangingLevel = false; 

        // 2. Cambiar mapa (que ahora destruye el anterior limpiamente)
        MapManager.changeMap(scene, config.map);



        // 4. Crear enemigos del nuevo mapa
        EnemyManager.create(scene, config.enemies);
    }

    static enemyKilled(scene) {
        // Si ya está en proceso de cambiar de nivel, ignoramos llamadas consecutivas
        if (scene.isChangingLevel) return;

        scene.time.delayedCall(5000, () => {
            // Volvemos a validar la bandera dentro del callback por seguridad
            if (scene.isChangingLevel) return;

            if (EnemyManager.remaining(scene) === 0) {
                console.log("Nivel completado");
                scene.isChangingLevel = true; // Bloqueamos nuevas ejecuciones
                this.next(scene);
            }
        });
    }

    static next(scene) {
        EnemyManager.clear(scene);

        if (scene.bubbles) {
            scene.bubbles.clear(true, true);
        }

        if (scene.fruits) {
            scene.fruits.clear(true, true);
        }

        // Devolvemos el delayedCall de mínimo 200ms para darle un frame libre a Phaser 
        // y que limpie los cuerpos físicos del mapa anterior antes de montar el nuevo.
        scene.time.delayedCall(200, () => {
            scene.currentLevel++;
            this.load(scene, scene.currentLevel);
        });
    }
}