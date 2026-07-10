import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

function GameContainer() {
  const containerRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    // Configuración base de Phaser
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: containerRef.current, // Aquí se inyecta en React
      physics: {
        default: 'arcade',
        arcade: { gravity: { y: 300 } }
      },
      scene: {
        preload: function() {},
        create: function() {
          this.add.text(100, 100, '¡Phaser + React Corriendo Limpio!', { 
            fill: '#00ff00', 
            fontSize: '32px' 
          });
        }
      }
    };

    
    if (!gameRef.current) {
      gameRef.current = new Phaser.Game(config);
    }

    
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#242424', color: 'white' }}>
      <h2>Bubble Bobble - UNEFA Edition 🦖</h2>
      <div ref={containerRef} style={{ border: '4px solid #4caf50', borderRadius: '8px', overflow: 'hidden' }} />
    </div>
  );
}

export default function App() {
  return <GameContainer />;
}