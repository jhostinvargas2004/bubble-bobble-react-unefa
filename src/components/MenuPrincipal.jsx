import { useState } from 'react';
import fondoMenu from '../assets/menu-principal-bg.png';
import fondoBurbujas from '../assets/fondo.jpg';
import { useGame } from '../context/GameContext';
import {
  registrarUsuario,
  iniciarNuevoJuego,
  obtenerPartidaGuardada,
} from '../services/api';

export default function MenuPrincipal() {
  const { setAlias, setPartida, setPantalla } = useGame();

  const [vista, setVista] = useState('inicio');
  const [aliasInput, setAliasInput] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  async function manejarNuevoJugador() {
    setError('');
    setCargando(true);
    try {
      await registrarUsuario(aliasInput);
      setAlias(aliasInput);
      setPartida({ level: 1, score: 0, lives: 1 });
      setPantalla('jugando');
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  async function manejarNuevoJuego() {
    setError('');
    setCargando(true);
    try {
      const datos = await iniciarNuevoJuego(aliasInput);
      setAlias(aliasInput);
      setPartida({ level: datos.level, score: datos.score, lives: datos.lives });
      setPantalla('jugando');
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  async function manejarRetomarPartida() {
    setError('');
    setCargando(true);
    try {
      const datos = await obtenerPartidaGuardada(aliasInput);
      setAlias(aliasInput);
      setPartida({ level: datos.level, score: datos.score, lives: datos.lives });
      setPantalla('jugando');
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  const estilos = {
    pantallaFondo: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100%',
      backgroundImage: `url(${fondoBurbujas})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      gap: '24px',
      padding: '20px',
      boxSizing: 'border-box',
    },
    imagenFondo: {
      width: '500px',
      maxWidth: '90vw',
      height: 'auto',
      display: 'block',
      borderRadius: '8px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    },
    filaBotones: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '16px',
    },
    tarjeta: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '18px',
      backgroundColor: '#16213e',
      border: '2px solid #0288d1',
      borderRadius: '16px',
      padding: '40px 50px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
    },
    titulo: {
      fontFamily: "'Saira', sans-serif",
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '1px',
      color: 'white',
      margin: 0,
      textAlign: 'center',
    },
    boton: {
      padding: '14px 32px',
      fontSize: '15px',
      fontFamily: "'Saira', sans-serif",
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      color: 'white',
      textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
      background: 'linear-gradient(180deg, #4fc3f7 0%, #0288d1 60%, #01579b 100%)',
      border: '2px solid #01579b',
      borderRadius: '30px',
      boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.5), 0 3px 6px rgba(0,0,0,0.3)',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
    },
    input: { padding: '8px', fontSize: '16px', borderRadius: '8px', border: 'none' },
    error: { color: '#ff6b6b', fontWeight: 'bold' },
  };

  if (vista === 'inicio') {
    return (
      <div style={estilos.pantallaFondo}>
        <img src={fondoMenu} alt="Bubble Bobble" style={estilos.imagenFondo} />
        <div style={estilos.filaBotones}>
          <button style={estilos.boton} onClick={() => { setVista('nuevo-jugador'); setError(''); }}>
            Nuevo jugador
          </button>
          <button style={estilos.boton} onClick={() => { setVista('nuevo-juego'); setError(''); }}>
            Nuevo juego
          </button>
          <button style={estilos.boton} onClick={() => { setVista('retomar'); setError(''); }}>
            Retomar partida
          </button>
        </div>
      </div>
    );
  }

  const titulos = {
    'nuevo-jugador': 'Registrar nuevo jugador',
    'nuevo-juego': 'Iniciar nuevo juego',
    'retomar': 'Retomar partida',
  };

  const acciones = {
    'nuevo-jugador': manejarNuevoJugador,
    'nuevo-juego': manejarNuevoJuego,
    'retomar': manejarRetomarPartida,
  };

  return (
    <div style={estilos.pantallaFondo}>
      <div style={estilos.tarjeta}>
        <h2 style={estilos.titulo}>{titulos[vista]}</h2>
        <input
          style={estilos.input}
          type="text"
          placeholder="Escribe tu alias"
          value={aliasInput}
          onChange={(e) => setAliasInput(e.target.value)}
        />
        {error && <p style={estilos.error}>{error}</p>}
        <div style={estilos.filaBotones}>
          <button style={estilos.boton} onClick={acciones[vista]} disabled={cargando || !aliasInput.trim()}>
            {cargando ? 'Cargando...' : 'Confirmar'}
          </button>
          <button style={estilos.boton} onClick={() => { setVista('inicio'); setError(''); }}>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}