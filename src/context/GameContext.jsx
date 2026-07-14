import { createContext, useContext, useState } from 'react';

// Contexto vacío al inicio; se llena con el Provider de abajo
const GameContext = createContext(null);

export function GameProvider({ children }) {
  // Alias del jugador actual (null mientras no ha iniciado sesión/registro)
  const [alias, setAlias] = useState(null);

  // Estado dinámico de la partida: nivel, puntuación y vidas
  const [partida, setPartida] = useState({ level: 1, score: 0, lives: 3 });

  // Controla qué se muestra en pantalla: 'menu' o 'jugando'
  const [pantalla, setPantalla] = useState('menu');

  const value = {
    alias,
    setAlias,
    partida,
    setPartida,
    pantalla,
    setPantalla,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

// Hook para usar el contexto fácilmente desde cualquier componente,
// en vez de tener que importar useContext y GameContext cada vez
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame debe usarse dentro de un GameProvider');
  }
  return context;
}