import Phaser from 'phaser';
import { Fruit } from '../entities/Fruit';

export class FruitManager {

    static spawn(scene, x, y, tier = 'ALL') {
        let fruitTypes = [];

        if (tier === 'LOW') {
            fruitTypes = ['cherry', 'banana'];
        } else if (tier === 'MEDIUM') {
            fruitTypes = ['orange', 'apple'];
        } else if (tier === 'HIGH') {
            fruitTypes = ['strawberry', 'black_grapes'];
        } else {
            fruitTypes = ['apple', 'banana', 'cherry', 'orange', 'black_grapes', 'strawberry'];
        }

        const randomFruit = Phaser.Utils.Array.GetRandom(fruitTypes);

        const fruit = new Fruit(scene, x, y, randomFruit);

        scene.fruits.add(fruit);
        return fruit;
    }
}