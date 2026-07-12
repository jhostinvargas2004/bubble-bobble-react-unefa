import { Fruit } from '../entities/Fruit';

export class FruitManager {

    static spawn(scene, x, y, comboSize = 1) {
        let fruitType = 'banana'; // Por defecto

        if (comboSize <= 1) {
            fruitType = 'banana';      // 500 pts
        } else if (comboSize === 2) {
            fruitType = 'orange';      // 1,000 pts
        } else if (comboSize === 3) {
            fruitType = 'strawberry';  // 2,000 pts
        } else {
            fruitType = 'black_grapes'; // 3,000+ pts (Premium)
        }

        const fruit = new Fruit(scene, x, y, fruitType);
        scene.fruits.add(fruit);
        
        return fruit;
    }
}