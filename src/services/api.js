// URL base de tu backend. Si algún día cambia el puerto o el dominio,
// solo se edita aquí y afecta a todas las funciones de este archivo.
const API_BASE_URL = 'http://localhost:4000/api';

// Función auxiliar interna: hace el fetch, valida la respuesta,
// y si el backend devolvió un error (4xx/5xx), lo convierte en un
// throw para que los componentes puedan usar try/catch normalmente.
async function manejarRespuesta(response) {
  const data = await response.json();

  if (!response.ok) {
    // data.error viene del backend, ej: "El alias ya está registrado"
    throw new Error(data.error || 'Ocurrió un error inesperado');
  }

  return data;
}

// 1. Registrar nuevo usuario
// POST /api/usuarios
export async function registrarUsuario(alias) {
  const response = await fetch(`${API_BASE_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_alias: alias }),
  });
  return manejarRespuesta(response);
}

// 2. Verificar si un usuario existe
// GET /api/usuarios/:alias
export async function verificarUsuario(alias) {
  const response = await fetch(`${API_BASE_URL}/usuarios/${alias}`);
  return manejarRespuesta(response);
}

// 3. Iniciar partida nueva (no escribe en la BD, solo valida y devuelve valores iniciales)
// POST /api/partidas/nuevo
export async function iniciarNuevoJuego(alias) {
  const response = await fetch(`${API_BASE_URL}/partidas/nuevo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_alias: alias }),
  });
  return manejarRespuesta(response);
}

// 4. Obtener partida guardada (retomar partida)
// GET /api/partidas/:alias
export async function obtenerPartidaGuardada(alias) {
  const response = await fetch(`${API_BASE_URL}/partidas/${alias}`);
  return manejarRespuesta(response);
}

// 5. Guardar/reemplazar partida
// PUT /api/partidas/guardar
export async function guardarPartida(alias, nivel, puntuacion, vidas) {
  const response = await fetch(`${API_BASE_URL}/partidas/guardar`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_alias: alias,
      level: nivel,
      score: puntuacion,
      lives: vidas,
    }),
  });
  return manejarRespuesta(response);
}