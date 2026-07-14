import { Bubble } from './Bubble';

export class SpecialBubble extends Bubble {
  constructor(scene, x, y, comodinType) {
    super(scene, x, y, 1);

    this.comodinType = comodinType;

    let iconFrame = 18;
    if (this.comodinType === 'water') {
        iconFrame = 19;
    } else if (this.comodinType === 'fire') {
        iconFrame = 21;
    }

    this.iconSprite = this.scene.add.sprite(this.x, this.y, 'special_bubbles', iconFrame);
    this.iconSprite.setScale(2);
    this.iconSprite.setDepth(this.depth + 1);

    this.speed = 0;
    this.floatSpeed = 50;
    this.changeState('FLOATING');

    this.scene.events.on('update', this.updateIconPosition, this);
  }

  updateIconPosition() {
    if (!this.active || !this.iconSprite || !this.iconSprite.active) {
        return;
    }
    this.iconSprite.x = this.x;
    this.iconSprite.y = this.y;
    this.iconSprite.alpha = this.alpha;
  }

  triggerComodinEffect() {
    console.log(`¡POO EN ACCIÓN! Elemento desatado: ${this.comodinType}`);
    
    if (this.comodinType === 'water') {
        this.scene.physics.config = this.scene.physics.config || {};
    } else if (this.comodinType === 'fire') {
        this.scene.physics.config = this.scene.physics.config || {};
    } else if (this.comodinType === 'thunder') {
        this.scene.physics.config = this.scene.physics.config || {};
    }
  }

  pop(comboSize = 1) {
    if (!this.scene || !this.active) return;

    this.scene.events.off('update', this.updateIconPosition, this);
    
    if (this.iconSprite) {
        this.iconSprite.destroy();
    }

    if (this.explodedByPlayer) {
        this.triggerComodinEffect();
    }

    super.pop(comboSize);
  }
}