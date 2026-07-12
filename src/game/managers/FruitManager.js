import Phaser from 'phaser';
import { Fruit } from '../entities/Fruit';

export class FruitManager {

    static spawn(scene, x, y){

        const fruitTypes = [

            'apple',
            'banana',
            'cherry',
            'orange',
            'black_grapes',
            'strawberry'

        ];

        const randomFruit =
            Phaser.Utils.Array.GetRandom(
                fruitTypes
            );

        const fruit = new Fruit(
            scene,
            x,
            y,
            randomFruit
        );

        scene.fruits.add(fruit);
        return fruit;
    }

}