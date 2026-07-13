export class CollisionManager {

    static create(scene) {
        this.configureOneWayPlatforms(scene);

        this.playerPlatform(scene);
        this.enemyPlatform(scene); 
        this.playerBubble(scene);
        this.playerEnemy(scene);
        this.bubbleEnemy(scene); 
        this.bubblePlatform(scene);
        this.playerFruit(scene);
        this.fruitPlatform(scene);
    }

    static configureOneWayPlatforms(scene) {
        if (!scene.platformLayer) return;

        scene.platformLayer.forEachTile(tile => {
            if (tile.collides) {
                const isBorderWall = tile.x === 0 || tile.x === scene.platformLayer.layer.width - 1;

                if (isBorderWall) {        
                    tile.faceTop = true;
                    tile.faceBottom = true;
                    tile.faceLeft = true;
                    tile.faceRight = true;
                } else {
                    tile.faceTop = true;
                    tile.faceBottom = false;
                    tile.faceLeft = false;
                    tile.faceRight = false;
                }
            }
        });
    }

    static playerPlatform(scene) {
        scene.playerPlatformCollider = scene.physics.add.collider(
            scene.player,
            scene.platformLayer
        );
    }

    static enemyPlatform(scene) {
        // 🛠️ Mantenemos su propiedad pero agregamos el filtro de traspasar plataformas para el ghost
        scene.enemyPlatformCollider = scene.physics.add.collider(
            scene.enemies,
            scene.platformLayer,
            null, // No necesitamos lógica extra al chocar, ya el ghost vuela directo
            (enemy, tile) => {
                if (enemy.type === 'ghost') {
                    return false; // 👻 El suelo y las plataformas no existen para el fantasma
                }
                return true; // Los demás enemigos chocan normal
            }
        );
    }

    static bubbleEnemy(scene) {
        // 🛠️ Mantenemos su propiedad inyectando el escudo anti-burbujas al inicio
        scene.bubbleEnemyCollider = scene.physics.add.overlap(
            scene.bubbles,
            scene.enemies,
            (bubble, enemy) => {
                
                // 🔥 ESCUDO FANTASMA: Si es el ghost, la burbuja estalla y salimos de la función
                if (enemy.type === 'ghost') {
                    bubble.destroy();
                    return;
                }

                if (
                    bubble.state === 'PROJECTILE' &&
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

    static playerBubble(scene) {
        scene.physics.add.overlap(
            scene.player,
            scene.bubbles,
            (player, bubble) => {
                const isHoldingJump = scene.cursors.up.isDown || (player.jumpKey && player.jumpKey.isDown);

                if (player.body.velocity.y > 0 && (bubble.body.touching.up || player.body.blocked.down)) {
                    if (bubble.enemyInside) {
                        bubble.explodeByPlayer();
                    } else {
                        if (isHoldingJump) {
                            player.bounceOnBubble(); 
                        } else {
                            bubble.explodeByPlayer(); 
                        }
                    }
                } else {
                    if (bubble.state === 'PROJECTILE') return;
                    bubble.explodeByPlayer();
                }
            }
        );
    }
    static bubblePlatform(scene) {
        scene.bubblePlatformCollider = scene.physics.add.collider(
            scene.bubbles,
            scene.platformLayer,
            (bubble) => {
                if (bubble.active) {
                    bubble.hitPlatform();
                }
            }
        );
    }

    static playerFruit(scene) {
        scene.physics.add.overlap(
            scene.player,
            scene.fruits,
            (player, fruit) => {
                fruit.collect();
            }
        );
    }

    static fruitPlatform(scene) {
        scene.fruitPlatformCollider = scene.physics.add.collider(
            scene.fruits,
            scene.platformLayer
        );
    }

    static playerEnemy(scene) {
        scene.physics.add.overlap(
            scene.player,
            scene.enemies,
            (player, enemy) => {
                if (enemy.state !== 'TRAPPED' && enemy.state !== 'DEAD') {
                    player.die(); 
                }
            }
        );
    }
}