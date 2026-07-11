import Phaser from 'phaser';
import { Player } from '../entities/Player';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.player = null;
    this.platforms = null;
    this.cursors = null;
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
  const map = this.make.tilemap({ key: 'mapa' });
  const tileset = map.addTilesetImage('bloques_retro', 'tiles');
  const plataformaLayer = map.createLayer('plataformas', tileset, 0, 0);
  plataformaLayer.setCollisionByExclusion([-1]);

  // Animaciones del jugador

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

  this.player = new Player(this, 100, 300);
  this.physics.add.collider(this.player, plataformaLayer);

  // controles
  this.cursors = this.input.keyboard.createCursorKeys();
  this.attackKey = this.input.keyboard.addKey(
  Phaser.Input.Keyboard.KeyCodes.X
);
}

update() {
  this.player.move(this.cursors);

  if (this.input.keyboard.checkDown(this.attackKey, 100)) {
    this.player.attack();
}
}
}