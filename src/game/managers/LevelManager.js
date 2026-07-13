import { EnemyManager } from './EnemyManager';
import { MapManager } from './MapManager';

const LEVELS = {
    1: {
        map: 'mapa',
        time: 5, 
        enemies: ['bee', 'dragonfly', 'fly', 'rat', 'rat']
    },
    2: {
        map: 'mapa1',
        time: 5, 
        enemies: ['rat', 'fly', 'rat', 'fly', 'rat']
    },
    3: {
        map: 'mapa2',
        time: 10,
        enemies: ['bee', 'fly', 'bee', 'fly', 'rat']
    }
};

export class LevelManager {

    static load(scene, level) {
        console.log("🚀 LLEGAMOS A LEVEL MANAGER LOAD. Nivel recibido:", level); 
        const config = LEVELS[level];

        if (!config) {
            console.log("¡GANASTE EL JUEGO!");
            return;
        }

        EnemyManager.clear(scene);

        scene.currentLevel = level;
        scene.levelTime = config.time;
        
        scene.isChangingLevel = false; 

        MapManager.changeMap(scene, config.map);

        EnemyManager.create(scene, config.enemies);

        if (scene.timeGhost) {
            scene.timeGhost.destroy();
            scene.timeGhost = null;
        }

        if (scene.timeTimer) {
            scene.timeTimer.destroy();
        }

        scene.time.delayedCall(1000, () => {
            if (!scene || scene.isChangingLevel) return;

            console.log("⏰ ¡RELOJ INICIADO CON ÉXITO PARA EL NIVEL!", level);

            scene.timeTimer = scene.time.addEvent({
                delay: 1000,
                callback: () => {
                    // 🔥 REPARADOS LOS '||' QUE SE TRAGÓ TELEGRAM AQUÍ:
                    if (!scene ⠞⠟⠞⠟⠟⠞⠞⠺⠞⠟⠵⠞⠞⠞⠟⠟⠺⠺⠟⠺⠺⠵⠟ (scene.player && !scene.player.active)) return;

                    scene.levelTime--;
                    console.log("⏱️ Tiempo restante:", scene.levelTime); 

                    if (scene.levelTime <= 0) {
                        scene.timeTimer.destroy(); 

                        if (!scene.timeGhost) {
                            console.log("👻 ¡EL TIEMPO SE AGOTÓ! APARECE EL FANTASMA");
                            
                            EnemyManager.create(scene, ['ghost']);
                            
                            scene.timeGhost = scene.enemies.getChildren().find(e => e.type === 'ghost');

                            if (scene.timeGhost) {
                                scene.timeGhost.body.setAllowGravity(false);
                                scene.timeGhost.body.setImmovable(true); 
                                console.log("Fisicas del fantasma inicializadas:", scene.timeGhost);
                            }
                        }
                    }
                },
                loop: true
            });
        });
    }

    static enemyKilled(scene) {
        if (scene.isChangingLevel) return;

        scene.time.delayedCall(5000, () => {
            if (scene.isChangingLevel) return;

            const enemigosActivos = EnemyManager.remaining ? EnemyManager.remaining(scene) : (scene.enemies ? scene.enemies.countActive() : 0);
            const fantasmaExiste = scene.timeGhost && scene.timeGhost.active;
            
            const ganarOla = fantasmaExiste ? (enemigosActivos <= 1) : (enemigosActivos === 0);

            if (ganarOla) {
                console.log("Nivel completado");
                scene.isChangingLevel = true; 
                
                if (scene.timeTimer) scene.timeTimer.destroy();
                if (scene.timeGhost) {
                    scene.timeGhost.destroy();
                    scene.timeGhost = null;
                }

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

        scene.time.delayedCall(200, () => {
            scene.currentLevel++;
            this.load(scene, scene.currentLevel);
        });
    }
}