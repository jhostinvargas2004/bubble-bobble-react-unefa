import Phaser from 'phaser';
import { MapManager } from '../managers/MapManager';
import { AnimationManager } from '../managers/AnimationManager';
import { AssetLoader } from '../managers/AssetLoader';
import { CollisionManager } from '../managers/CollisionManager';
import { GroupManager } from '../managers/GroupManager';
import { EnemyManager } from '../managers/EnemyManager';
import { Player } from '../entities/Player';

export class GameScene extends Phaser.Scene {

    constructor(key = 'GameScene', mapKey = 'mapa', enemyList = [], levelTime = 30) {
        super({ key: key });

        this.mapKey = mapKey;
        this.enemyList = enemyList;
        this.levelTimeLimit = levelTime; 

        this.isChangingLevel = false;
        this.player = null;
        this.platformLayer = null;
        this.cursors = null;
        this.attackKey = null;
        this.bubbles = null;
        this.enemies = null;
        this.fruits = null;
        this.map = null;
        
        this.score = 0; 
        this.scoreText = null; 
        
        this.levelTime = levelTime;
        this.timeTimer = null;
        this.timeGhost = null;
    }

    init(data) {
        this.isChangingLevel = false;
        this.score = data.score || 0;
        this.levelTime = this.levelTimeLimit; 
        this.timeGhost = null;
    }

    preload() {
        AssetLoader.preload(this);
    }

    create() {
        MapManager.create(this, this.mapKey);
        AnimationManager.create(this);
        GroupManager.create(this);

        this.createPlayer();
        
        EnemyManager.create(this, this.enemyList);
        
        CollisionManager.create(this);
        this.createControls();

        this.scoreText = this.add.text(16, 16, 'SCORE: ' + this.score, { 
            fontSize: '20px', 
            fill: '#ffffff',
            fontFamily: 'monospace'
        });

        this.startLevelTimer();
    }

    startLevelTimer() {
        if (this.timeTimer) this.timeTimer.destroy();

        this.timeTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (this.isChangingLevel || !this.player || this.player.isSpawning || this.player.isDead) return;

                this.levelTime--;
                console.log("⏱️ Remaining Time:", this.levelTime); 

                if (this.levelTime <= 0) {
                    this.spawnGhost();
                }
            },
            loop: true
        });
    }

    spawnGhost() {
        if (this.timeTimer) this.timeTimer.destroy(); 

        if (!this.timeGhost) {
            
            EnemyManager.create(this, ['ghost']);
            
            this.timeGhost = this.enemies.getChildren().find(e => e.type === 'ghost');
        }
    }

    gainPoints(amount) {
        this.score += amount;
        if (this.scoreText) {
            this.scoreText.setText('SCORE: ' + this.score);
        }
        this.game.events.emit('update-score', this.score);
    }

    createPlayer() {
        this.player = new Player(this, 100, 550); 
        console.log("JUGADOR CREADO Y ENTRANDO EN BURBUJA", this.player);

        this.player.spawnInBubble();
    }

    createControls() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    }

    enemyKilled() {
        if (this.isChangingLevel) return;

        this.time.delayedCall(5000, () => {
            if (this.isChangingLevel) return;

            const activeEnemies = EnemyManager.remaining(this);
            const ghostExists = this.timeGhost && this.timeGhost.active;
            
            const isLevelCleared = ghostExists ? (activeEnemies <= 1) : (activeEnemies === 0);

            if (isLevelCleared) {
                this.isChangingLevel = true;
                console.log("🏆 Level Completed!");
                
                if (this.timeTimer) this.timeTimer.destroy();
                if (this.timeGhost) {
                    this.timeGhost.destroy();
                    this.timeGhost = null;
                }
                
                this.nextLevel(); 
            }
        });
    }

    update() {
        if (!this.player) return;

        this.player.move(this.cursors);

        if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
            this.player.attack();
        }

        this.enemies.getChildren().forEach((enemy) => {
            enemy.update();
        });
    }
}