import { Fruit } from '../entities/Fruit';

export class FruitManager {

    static spawn(scene, x, y, comboSize = 1) {
        const fruitType = this.getFruitType(comboSize);

        const fruit = new Fruit(scene, x, y, fruitType);
        scene.fruits.add(fruit);
        
        return fruit;
    }

    static getFruitType(comboSize) {
        if (comboSize <= 1) return 'banana';       // 500 pts
        if (comboSize === 2) return 'orange';       // 1,000 pts
        if (comboSize === 3) return 'strawberry';   // 2,000 pts
        return 'black_grapes';                      // 3,000+ pts (Premium)
    }
}