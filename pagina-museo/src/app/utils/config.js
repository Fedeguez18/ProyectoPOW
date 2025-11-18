// Detecta si estamos en producción o desarrollo
const isProd = process.env.NODE_ENV === 'production';

// IMPORTANTE: Ajusta esta URL exactamente a como accedes a tu API desde el navegador.
// Si tu carpeta en Laragon es 'www/API_Proyecto', usa 'http://localhost/API_Proyecto'
// Si tu carpeta es 'www/ProyectoPOW/API_Proyecto', usa 'http://localhost/ProyectoPOW/API_Proyecto'

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost/API_Proyecto';

/**
 * Función auxiliar para generar URLs de imágenes completas
 */
export const getImageUrl = (path) => {
  if (!path) return '/recursos/placeholder.jpg'; // Imagen por defecto si falla
  if (path.startsWith('http')) return path; // Si ya es una URL completa
  
  // Aseguramos que no haya barras duplicadas
  const baseUrl = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${baseUrl}/${cleanPath}`;
};