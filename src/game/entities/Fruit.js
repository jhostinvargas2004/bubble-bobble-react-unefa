import { Entity } from './Entity';

export class Fruit extends Entity {

    constructor(scene, x, y, type) {
        super(scene, x, y, type);
        this.type = type;

        // puntos por categoría/rango de fruta
        this.points = this.getFruitPoints();

        this.setFruitScale();

        // hitbox 
        this.body.setSize(this.width, this.height);
    }

    // Sistema de rangos 
    getFruitPoints() {
        switch (this.type) {
            case 'cherry':       return 500;  // Rango Bajo
            case 'banana':       return 500;
            case 'orange':       return 1000; // Rango Medio
            case 'apple':        return 1000;
            case 'strawberry':   return 2000; // Rango Alto
            case 'black_grapes': return 3000; // Rango Especial
            default:             return 100;
        }
    }

    setFruitScale() {
        switch (this.type) {
            case 'orange':       this.setScale(0.8);   break;
            case 'black_grapes': this.setScale(1.6);   break;
            case 'banana':       this.setScale(1.3);   break;
            case 'cherry':       this.setScale(1.3);   break;
            case 'apple':        this.setScale(1.3);   break;
            case 'strawberry':   this.setScale(1.3);   break;
        }
    }

    collect() {
    console.log("Recolectada:", this.type, "+", this.points, "pts");
    
    if (this.scene.gainPoints) {
        this.scene.gainPoints(this.points);
    }

    this.destroy();
}
}