import Phaser from 'phaser';

export class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene1' });
    this.player = null;
    this.platforms = null;
    this.cursors = null;
  }

  preload() {
    // imágenes 
  }

  create() {
    // 1. Crear las plataformas 
    this.platforms = this.physics.add.staticGroup();
    let floor = this.add.rectangle(400, 580, 800, 40, 0x4caf50);
    this.physics.add.existing(floor, true); 
    this.platforms.add(floor);

    // plataformas flotantes de color azul
    let plat1 = this.add.rectangle(300, 450, 200, 20, 0x2196f3);
    this.physics.add.existing(plat1, true);
    this.platforms.add(plat1);

    let plat2 = this.add.rectangle(600, 320, 200, 20, 0x2196f3);
    this.physics.add.existing(plat2, true);
    this.platforms.add(plat2);


    // 2. Crear al Jugador 
    this.player = this.add.rectangle(100, 450, 32, 32, 0xffeb3b);
    this.physics.add.existing(this.player); // físicas de movimiento
    this.player.body.setCollideWorldBounds(true); 


    // 3. Activar las Colisiones
    this.physics.add.collider(this.player, this.platforms);


    // 4. Configurar los Controles del Teclado
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // 5. Lógica del Movimiento 
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