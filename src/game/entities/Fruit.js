import { Entity } from './Entity';

export class Fruit extends Entity {
    constructor(scene, x, y, type) {
        super(scene, x, y, type);
        this.type = type;
        this.points = this.getFruitPoints();

        this.setFruitScale();
        this.body.setSize(this.width, this.height);
    }

    getFruitPoints() {
        switch (this.type) {
            case 'banana':       return 500;
            case 'orange':       return 1000;
            case 'strawberry':   return 2000;
            case 'black_grapes': return 3000;
            default:             return 500;
        }
    }

    setFruitScale() {
        switch (this.type) {
            case 'orange':       this.setScale(0.8); break;
            case 'black_grapes': this.setScale(1.6); break;
            case 'banana':       this.setScale(1.3); break;
            case 'strawberry':   this.setScale(1.3); break;
            default:             this.setScale(1.3); break;
        }
    }

    collect() {
        console.log('FRUTA RECOLECTADA:', this.type, '+', this.points, 'pts');
        
        if (this.scene.gainPoints) {
            this.scene.gainPoints(this.points);
        }

        this.destroy();
    }
}