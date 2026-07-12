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
}

preload() {

    AssetLoader.preload(this);

}

create() {

  console.log("GAME SCENE CREADA");

    MapManager.create(this);

    AnimationManager.create(this);

    GroupManager.create(this);

    this.createPlayer();

    EnemyManager.create(this);

    CollisionManager.create(this);

    this.createControls();

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

if (this.input.keyboard.checkDown(this.attackKey, 100)) {
    this.player.attack();
}
this.enemies.getChildren().forEach((enemy) => {

    enemy.update();

});
}

}