import Phaser from 'phaser';
import { GameScene } from './scenes/GameScene';

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
  scene: [GameScene] 
};