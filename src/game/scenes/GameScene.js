import Phaser from 'phaser';
import { AnimationManager } from '../managers/AnimationManager';
import { AssetLoader } from '../managers/AssetLoader';
import { MapManager } from '../managers/MapManager';
import { EnemyManager } from '../managers/EnemyManager';
import { CollisionManager } from '../managers/CollisionManager';
import { GroupManager } from '../managers/GroupManager';
import { Player } from '../entities/Player';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });

        this.player = null;
        this.platformLayer = null;
        this.cursors = null;
        this.attackKey = null;
        this.bubbles = null;
        this.enemies = null;
        this.fruits = null;
        this.map = null;
        
        // Variables globales del score
        this.score = 0;
        this.scoreText = null; 
    }

    preload() {
        AssetLoader.preload(this);
    }

    create() {
        console.log("GAME SCENE CREADA");
        this.score = 0;

        MapManager.create(this);
        AnimationManager.create(this);
        GroupManager.create(this);

        this.createPlayer();
        EnemyManager.create(this);
        CollisionManager.create(this);
        this.createControls();

        // Marcador debug para ver los puntos en Phaser
        this.scoreText = this.add.text(16, 16, 'SCORE: 0', { 
            fontSize: '20px', 
            fill: '#ffffff',
            fontFamily: 'monospace'
        });
    }

    // Método centralizado de puntuación
    gainPoints(amount) {
        this.score += amount;
        
        if (this.scoreText) {
            this.scoreText.setText('SCORE: ' + this.score);
        }

        // Le avisa al frontend de React que hay nuevos puntos
        this.game.events.emit('update-score', this.score);
    }

    createPlayer() {
        this.player = new Player(this, 100, 300);
        console.log("JUGADOR CREADO", this.player);
    }

    createControls() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.attackKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.X
        );
    }

    update() {
        if (!this.player) return;

        this.player.move(this.cursors);

        // 10 pts al percionar para disparar
        if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
    this.player.attack();
    this.gainPoints(10); 
    }

        this.enemies.getChildren().forEach((enemy) => {
            enemy.update();
        });
    }
}