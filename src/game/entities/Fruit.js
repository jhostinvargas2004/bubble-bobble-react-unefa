import { Entity } from './Entity';

export class Fruit extends Entity {

constructor(scene,x,y,type){

    super(scene,x,y,type);

    this.type = type;

    this.setFruitScale();

    this.body.setSize(
        this.width,
        this.height
    );

}

setFruitScale(){

    switch(this.type){

        case 'orange':

            this.setScale(0.8);
            break;

        case 'black_grapes':

            this.setScale(1.6);
            break;

        case 'banana':
            this.setScale(1.3);
            break;

        case 'cherry':
            this.setScale(1.3);
            break;

        case 'apple':
            this.setScale(1.3);
            break;

        case 'strawberry':

            this.setScale(1.3);
            break;

    }

}

collect(){

    console.log(
        "FRUTA:",
        this.type
    );

    this.destroy();

}

}