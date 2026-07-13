import Phaser from 'phaser';
import { 
  Level1, Level2, Level3, Level4, Level5, 
  Level6, Level7, Level8, Level9, Level10 
} from './scenes/Levels';

export const gameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 }, 
      debug: true        
    }
  },
  scene: [Level1, Level2, Level3, Level4, Level5, Level6, Level7, Level8, Level9, Level10] 
};