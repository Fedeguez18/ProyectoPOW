// Usaremos IDs de tipo 'slug' para que funcionen bien en las URLs
export const exhibicionesData = [
  {
    id: 'fosil-t-rex',
    titulo: 'Fósil de Tyrannosaurus Rex',
    descripcionBreve: 'Un esqueleto casi completo de un T-Rex adulto, descubierto en 2013.',
    descripcionCompleta: 'Este espécimen, apodado "Rexy", mide más de 12 metros de largo y se estima que pesaba 8 toneladas. Su descubrimiento ha aportado información clave sobre la biomecánica de estos depredadores.',
  imagen: '/recursos/fosil-t-rex.png' // Ahora apunta a `public/recursos/`
  },
  {
    id: 'meteorito-allende',
    titulo: 'Meteorito Allende',
    descripcionBreve: 'Fragmento del meteorito Allende, la condrita carbonácea más grande encontrada.',
    descripcionCompleta: 'Caído en 1969 en Chihuahua, México, este meteorito es más antiguo que el propio Sistema Solar. Contiene granos presolares y aminoácidos, ofreciendo pistas sobre el origen de la vida.',
  imagen: '/recursos/meteorito.png' // Ahora apunta a `public/recursos/`
  },
  {
    id: 'mariposa-monarca',
    titulo: 'Ciclo de la Mariposa Monarca',
    descripcionBreve: 'Diorama que ilustra la increíble migración y ciclo vital de la mariposa monarca.',
    descripcionCompleta: 'La exhibición detalla las cuatro etapas de su vida (huevo, larva, pupa y adulto) y su asombroso viaje de más de 4,000 km desde Canadá hasta los bosques de México.',
  imagen: '/recursos/mariposa.png' // Ahora apunta a `public/recursos/`
  },
  // ... agrega más objetos aquí
];