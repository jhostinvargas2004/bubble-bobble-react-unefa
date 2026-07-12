export class MapManager {

    static create(scene) {

        scene.map = scene.make.tilemap({
            key: 'mapa'
        });

        const tileset = scene.map.addTilesetImage(
            'bloques_retro',
            'tiles'
        );

        scene.platformLayer = scene.map.createLayer(
            'plataformas',
            tileset,
            0,
            0
        );

        scene.platformLayer.setCollisionByExclusion([-1]);

    }

}