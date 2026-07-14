import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { guardarPartida } from '../services/api';

export default function MenuPausa({ visible, onCerrar }) {
  const { alias, partida, setPantalla } = useGame();
  const [mensaje, setMensaje] = useState('');
  const [guardando, setGuardando] = useState(false);

  if (!visible) return null;

  function manejarContinuar() {
    setMensaje('');
    onCerrar();
  }

  async function manejarGuardar() {
    setGuardando(true);
    setMensaje('');
    try {
      await guardarPartida(alias, partida.level, partida.score, partida.lives);
      setMensaje('Partida guardada correctamente');
    } catch (err) {
      setMensaje(err.message);
    } finally {
      setGuardando(false);
    }
  }

  function manejarSalir() {
    setPantalla('menu');
    onCerrar();
  }

  const estilos = {
    overlay: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    caja: {
      backgroundColor: 'hsla(220, 96%, 49%, 0.35)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '2px solid rgba(255, 255, 255, 0.5)',
      borderRadius: '18px',
      padding: '32px 36px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
      minWidth: '300px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
    },
    titulo: {
      fontFamily: "'Saira', sans-serif",
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '1px',
      color: '#f5e6c8',
      textShadow: '2px 2px 0px rgba(0,0,0,0.5)',
      margin: 0,
      textAlign: 'center',
    },
    boton: {
      width: '100%',
      padding: '14px 24px',
      fontSize: '15px',
      fontFamily: "'Saira', sans-serif",
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      color: 'white',
      textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(4px)',
      border: '2px solid rgba(255, 255, 255, 0.5)',
      borderRadius: '30px',
      boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.4), 0 3px 6px rgba(0,0,0,0.3)',
      cursor: 'pointer',
    },
    mensaje: {
      fontFamily: "'Saira', sans-serif",
      color: '#a8e6a1',
      fontWeight: 600,
      textAlign: 'center',
      margin: 0,
    },
  };

  return (
    <div style={estilos.overlay}>
      <div style={estilos.caja}>
        <h2 style={estilos.titulo}>Juego Pausado</h2>
        <button style={estilos.boton} onClick={manejarContinuar}>
          Continuar
        </button>
        <button style={estilos.boton} onClick={manejarGuardar} disabled={guardando}>
          {guardando ? 'Guardando...' : 'Guardar partida'}
        </button>
        {mensaje && <p style={estilos.mensaje}>{mensaje}</p>}
        <button style={estilos.boton} onClick={manejarSalir}>
          Salir al menú principal
        </button>
      </div>
    </div>
  );
}