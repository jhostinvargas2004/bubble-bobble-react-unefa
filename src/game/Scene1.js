import Phaser from 'phaser';

export class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene1' });
    this.player = null;
    this.platforms = null;
    this.cursors = null;
  }

  preload() {
     this.load.image('tiles', 'assets/ladrillos.png');
  this.load.tilemapTiledJSON('mapa', 'assets/mapa.json');
  }

  create() {
  const map = this.make.tilemap({ key: 'mapa' });
  const tileset = map.addTilesetImage('bloques_retro', 'tiles');
  const plataformaLayer = map.createLayer('plataformas', tileset, 0, 0);
  plataformaLayer.setCollisionByExclusion([-1]);
  this.player = this.add.rectangle(100, 300, 32, 32, 0xffeb3b);
  this.physics.add.existing(this.player);
  this.player.body.setCollideWorldBounds(true);
  this.physics.add.collider(this.player, plataformaLayer);

  // controles
  this.cursors = this.input.keyboard.createCursorKeys();
}

  update() {
    // Lógica del Movimiento 
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-160); 
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(160);  
    } else {
      this.player.body.setVelocityX(0);    
    }

    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.body.setVelocityY(-350); 
    }
  }
}