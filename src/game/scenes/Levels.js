import { GameScene } from './GameScene';

export class Level1 extends GameScene {
    constructor() { super('Level1', 'mapa', ['bee', 'dragonfly', 'fly', 'rat', 'rat'],100000); }
    nextLevel() { this.scene.start('Level2', { score: this.score }); }
}

export class Level2 extends GameScene {
    constructor() { super('Level2', 'mapa1', ['rat', 'fly', 'rat', 'fly', 'rat'],10000000); }
    nextLevel() { this.scene.start('Level3', { score: this.score }); }
}

export class Level3 extends GameScene {
    constructor() { super('Level3', 'mapa2', ['bee', 'rat', 'fly'],100000000); }
    nextLevel() { this.scene.start('Level4', { score: this.score }); }
}

export class Level4 extends GameScene {
    constructor() { super('Level4', 'mapa3', ['dragonfly', 'rat', 'rat'],10000000); }
    nextLevel() { this.scene.start('Level5', { score: this.score }); }
}

export class Level5 extends GameScene {
    constructor() { super('Level5', 'mapa4', ['fly', 'fly', 'bee'],10000000); }
    nextLevel() { this.scene.start('Level6', { score: this.score }); }
}

export class Level6 extends GameScene {
    constructor() { super('Level6', 'mapa5', ['rat', 'rat', 'dragonfly'],10000000); }
    nextLevel() { this.scene.start('Level7', { score: this.score }); }
}

export class Level7 extends GameScene {
    constructor() { super('Level7', 'mapa6', ['bee', 'bee', 'fly'],10000000); }
    nextLevel() { this.scene.start('Level8', { score: this.score }); }
}

export class Level8 extends GameScene {
    constructor() { super('Level8', 'mapa7', ['dragonfly', 'fly', 'rat'],10000000); }
    nextLevel() { this.scene.start('Level9', { score: this.score }); }
}

export class Level9 extends GameScene {
    constructor() { super('Level9', 'mapa8', ['bee', 'rat', 'dragonfly', 'fly'],10000000); }
    nextLevel() { this.scene.start('Level10', { score: this.score }); }
}

export class Level10 extends GameScene {
    constructor() { super('Level10', 'mapa9', ['rat', 'rat', 'bee', 'bee', 'dragonfly'],10000000); }
    nextLevel() {
        console.log("¡FELICIDADES! COMPLETASTE LOS 10 NIVELES DE BUBBLE BOBBLE");
    }
}