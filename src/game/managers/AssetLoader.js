export class AssetLoader {

    static preload(scene) {

        scene.load.image(
            'tiles',
            'assets/ladrillos.png'
        );

        scene.load.tilemapTiledJSON(
            'mapa',
            'assets/mapa.json'
        );

        // player
        scene.load.spritesheet(
            'player_idle',
            'assets/sprites/player/ToxicFrogBlueBrown_Idle.png',
            {
                frameWidth: 48,
                frameHeight: 48
            }
        );

        scene.load.spritesheet(
            'player_hop',
            'assets/sprites/player/ToxicFrogBlueBrown_Hop.png',
            {
                frameWidth: 48,
                frameHeight: 48
            }
        );

        scene.load.spritesheet(
            'player_attack',
            'assets/sprites/player/ToxicFrogBlueBrown_Attack.png',
            {
                frameWidth: 48,
                frameHeight: 48
            }
        );

        // enemy
        scene.load.spritesheet(
            'rat_idle',
            'assets/sprites/enemy/Rat_Idle.png',
            {
                frameWidth:64,
                frameHeight:64
            }
        );

        scene.load.spritesheet(
            'rat_attack',
            'assets/sprites/enemy/Rat_Attack.png',
            {
                frameWidth:64,
                frameHeight:64
            }
        );

        // bubble
        scene.load.spritesheet(
            'bubble',
            'assets/sprites/bubble/bubble_sheet.png',
            {
                frameWidth:24,
                frameHeight:24
            }
        );

        // Fruits
        scene.load.image(
            'black_grapes',
            'assets/sprites/fruits/black grapes.png'
        );


        scene.load.image(
            'orange',
            'assets/sprites/fruits/Orange.png'
        );


        scene.load.image(
            'banana',
            'assets/sprites/fruits/yellow bananas.png'
        );


        scene.load.image(
            'cherry',
            'assets/sprites/fruits/red cherry.png'
        );


        scene.load.image(
            'apple',
            'assets/sprites/fruits/red apple.png'
        );


        scene.load.image(
            'strawberry',
            'assets/sprites/fruits/red strawberry.png'
        );
    }

}