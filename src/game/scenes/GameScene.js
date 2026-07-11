import Phaser from 'phaser';
import { Player } from '../entities/Player';

export class GameScene extends Phaser.Scene {
constructor() {
    super({ key: 'GameScene' });

    this.player = null;
    this.platformLayer = null;
    this.cursors = null;
    this.attackKey = null;
    this.bubbles = null;
    this.map = null;
}

preload() {
  this.load.image('tiles', 'assets/ladrillos.png');
  this.load.tilemapTiledJSON('mapa', 'assets/mapa.json');

  this.load.spritesheet(
    'player_idle',
    'assets/sprites/player/ToxicFrogBlueBrown_Idle.png',
    {
      frameWidth: 48,
      frameHeight: 48
    }
  );

  this.load.spritesheet(
    'player_hop',
    'assets/sprites/player/ToxicFrogBlueBrown_Hop.png',
    {
      frameWidth: 48,
      frameHeight: 48
    }
  );

  this.load.spritesheet(
    'player_attack',
    'assets/sprites/player/ToxicFrogBlueBrown_Attack.png',
    {
      frameWidth: 48,
      frameHeight: 48
    }
  );

 this.load.spritesheet(
  'bubble',
  'assets/sprites/bubble/bubble_sheet.png',
  {
    frameWidth: 24,
    frameHeight: 24
  }
);
}

create() {

  console.log("GAME SCENE CREADA");

    this.createMap();

    this.createAnimations();

    this.createGroups();

    this.createPlayer();

    this.createControls();

}

createMap() {

    this.map = this.make.tilemap({ key: 'mapa' });

    const tileset = this.map.addTilesetImage(
        'bloques_retro',
        'tiles'
    );

    this.platformLayer = this.map.createLayer(
        'plataformas',
        tileset,
        0,
        0
    );

    this.platformLayer.setCollisionByExclusion([-1]);

}

createGroups() {

    this.bubbles = this.physics.add.group({

        allowGravity: false,
        immovable: false

    });

}

createPlayer() {

    this.player = new Player(this, 100, 300);

    console.log("JUGADOR CREADO", this.player);

    this.physics.add.collider(
        this.player,
        this.platformLayer
    );

}

createControls() {

    this.cursors = this.input.keyboard.createCursorKeys();

    this.attackKey = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.X
    );

}
  // Animaciones del jugador
createAnimations() {

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('player_idle'),
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'hop',
        frames: this.anims.generateFrameNumbers('player_hop'),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'attack',
        frames: this.anims.generateFrameNumbers('player_attack'),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'bubble_float',
        frames: this.anims.generateFrameNumbers('bubble', {
            start: 0,
            end: 88
        }),
        frameRate: 12,
        repeat: 0
    });

    this.anims.create({
        key: 'bubble_pop',
        frames: this.anims.generateFrameNumbers('bubble', {
            start: 14,
            end: 19
        }),
        frameRate: 12,
        repeat: 0
    });

  }

  update() {

if (!this.player) return;

this.player.move(this.cursors);

if (this.input.keyboard.checkDown(this.attackKey, 100)) {
    this.player.attack();
}

}

}