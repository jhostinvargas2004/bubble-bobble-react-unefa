export class SoundManager {

    static play(scene, key) {
        scene.sound.play(key);
    }

    static stop(scene, key) {
        scene.sound.stopByKey(key);
    }

    static startGameMusic(scene) {
        if(scene.game.mainTheme){
            return;
        }
        const start = scene.sound.add("coinStart");


        start.once("complete",()=>{
            scene.game.mainTheme = scene.sound.add(
                "mainTheme",
                {
                    loop:true,
                    volume:0.5
                }
            );
            scene.game.mainTheme.play();
        });
        start.play();
    }

    static gameOver(scene){
        console.log("REPRODUCIENDO GAME OVER");
        if(scene.game.mainTheme){

            scene.game.mainTheme.stop();
            scene.game.mainTheme.destroy();
            scene.game.mainTheme = null;
        }

        scene.game.gameOverMusic = scene.sound.add(
            "gameOverTheme",
            {
                loop:false,
                volume:0.5
            }
        );
        scene.game.gameOverMusic.play();
    }

    static stopGameMusic(scene){
        if(scene.game.mainTheme){
            scene.game.mainTheme.stop();
            scene.game.mainTheme.destroy();
            scene.game.mainTheme = null;

        }
    }
}