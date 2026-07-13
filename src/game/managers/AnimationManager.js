export class AnimationManager {

    static create(scene) {

        scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('player_idle'),
            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({
            key: 'hop',
            frames: scene.anims.generateFrameNumbers('player_hop'),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'attack',
            frames: scene.anims.generateFrameNumbers('player_attack'),
            frameRate: 10,
            repeat: 0
        });

        scene.anims.create({
            key: 'death',
            frames: scene.anims.generateFrameNumbers('player_death'),
            frameRate: 12,
            repeat: 0
        });

        scene.anims.create({
            key: 'bubble_float',
            frames: scene.anims.generateFrameNumbers('bubble', {
                start: 0,
                end: 88
            }),
            frameRate: 12,
            repeat: 0
        });

        scene.anims.create({
            key: 'bubble_pop',
            frames: scene.anims.generateFrameNumbers('bubble', {
                start: 89,
                end: 92
            }),
            frameRate: 12,
            repeat: 0
        });

        scene.anims.create({
            key: 'rat_idle',
            frames: scene.anims.generateFrameNumbers('rat_idle', {
                start: 0,
                end: 3
            }),
            frameRate: 8,
            repeat: -1
        });

        scene.anims.create({
            key: 'rat_angry',
            frames: scene.anims.generateFrameNumbers('rat_attack', {
                start: 0,
                end: 7
            }),
            frameRate: 10,
            repeat: -1
        });


        scene.anims.create({
            key:'fly_idle',
            frames: scene.anims.generateFrameNumbers(
                'fly_idle',
                {
                    start:0,
                    end:3
                }
            ),
            frameRate:8,
            repeat:-1
        });

            scene.anims.create({
                key: 'bee_idle',
                frames: scene.anims.generateFrameNumbers(
                    'bee_walk',
                    {
                        start: 4, 
                        end: 7
                    }
                ),
                frameRate: 10, 
                repeat: -1
            });

            scene.anims.create({
                key: 'bee_angry',
                frames: scene.anims.generateFrameNumbers(
                    'bee_attack', 
                    {
                        start: 4, 
                        end: 7
                    }
                ),
                frameRate: 14, 
                repeat: -1
            });

            scene.anims.create({
                key: 'dragonfly_idle',
                frames: scene.anims.generateFrameNumbers(
                    'dragonfly',
                    {
                        start: 0, 
                        end: 3
                    }
                ),
                frameRate: 10,
                repeat: -1
            });

            scene.anims.create({
                key: 'dragonfly_angry',
                frames: scene.anims.generateFrameNumbers(
                    'dragonfly',
                    {
                        start: 21, 
                        end: 27
                    }
                ),
                frameRate: 14,
                repeat: -1
            });

            }

        }