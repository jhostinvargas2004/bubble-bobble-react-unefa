export class MapManager {
    static create(scene, mapKey) {
        scene.map = scene.make.tilemap({ key: mapKey });

        const tileset = scene.map.addTilesetImage('bloques_retro', 'tiles');

        scene.platformLayer = scene.map.createLayer('plataformas', tileset, 0, 0);

        if (scene.platformLayer) {
            scene.platformLayer.setCollisionByExclusion([-1]);
        } else {
            console.error("❌ No se pudo crear la capa plataformas para:", mapKey);
        }
    }
}