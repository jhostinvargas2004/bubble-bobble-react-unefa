import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { gameConfig } from './game/GameConfig';
import { useGame } from './context/GameContext';
import MenuPrincipal from './components/MenuPrincipal';
import MenuPausa from './components/MenuPausa';

export default function App() {
  const containerRef = useRef(null);
  const gameRef = useRef(null);
  const { pantalla } = useGame();
  const [pausaVisible, setPausaVisible] = useState(false);

  useEffect(() => {
    if (pantalla !== 'jugando') return;

    const config = {
      ...gameConfig,
      parent: containerRef.current
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
  }, [pantalla]);

  function manejarClicDerecho(e) {
    e.preventDefault();
    setPausaVisible(true);
  }

  if (pantalla === 'menu') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#242424', color: 'white', fontFamily: 'sans-serif' }}>
        <MenuPrincipal />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#242424', color: 'white', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '10px' }}>Bubble Bobble 🦖</h1>
      <p style={{ margin: '0 0 20px 0', color: '#aaa' }}>Usa las flechas del teclado para moverte y saltar</p>
      <div
        ref={containerRef}
        onContextMenu={manejarClicDerecho}
        style={{ border: '4px solid #4caf50', borderRadius: '8px', overflow: 'hidden', boxShadow: '0px 10px 20px rgba(0,0,0,0.5)' }}
      />
      <MenuPausa visible={pausaVisible} onCerrar={() => setPausaVisible(false)} />
    </div>
  );
}