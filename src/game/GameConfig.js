import Phaser from 'phaser';
import { Scene1 } from './Scene1';

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
  scene: [Scene1] 
};