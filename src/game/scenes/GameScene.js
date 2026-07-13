import Phaser from 'phaser';
import { MapManager } from '../managers/MapManager';
import { AnimationManager } from '../managers/AnimationManager';
import { AssetLoader } from '../managers/AssetLoader';
import { CollisionManager } from '../managers/CollisionManager';
import { GroupManager } from '../managers/GroupManager';
import { EnemyManager } from '../managers/EnemyManager';
import { Player } from '../entities/Player';

export class GameScene extends Phaser.Scene {

    constructor(key = 'GameScene', mapKey = 'mapa', enemyList = []) {
        super({ key: key });

        this.mapKey = mapKey;
        this.enemyList = enemyList;
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
    }

    init(data) {
        this.isChangingLevel = false;
        this.score = data.score || 0;
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
    }

    gainPoints(amount) {
        this.score += amount;
        if (this.scoreText) {
            this.scoreText.setText('SCORE: ' + this.score);
        }
        this.game.events.emit('update-score', this.score);
    }

    createPlayer() {
        this.player = new Player(this, 100, 300);
        console.log("JUGADOR CREADO", this.player);
    }

    createControls() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    }

    enemyKilled() {
        if (this.isChangingLevel) return;

        this.time.delayedCall(5000, () => {
            if (EnemyManager.remaining(this) === 0) {
                this.isChangingLevel = true;
                console.log("¡Nivel completado!");
                
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