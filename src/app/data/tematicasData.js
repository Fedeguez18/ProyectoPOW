// Usar rutas públicas (archivos en /public/recursos)
export const tematicasData = [
  {
    id: 'plantas',
    titulo: 'Plantas',
    descripcion: 'Explora la rica diversidad del reino vegetal, desde fósiles antiguos hasta especies actuales.',
  color: '#a7f3d0ab', // Verde suave
    images: ['/recursos/plantas-img1.jpg', '/recursos/plantas-img2.png'],
    link: '/tematicas/plantas',
  },
  {
    id: 'fosiles-terrestres',
    titulo: 'Fósiles terrestres',
    descripcion: 'Viaja al pasado y descubre los gigantes que alguna vez caminaron sobre la tierra.',
  color: '#fca5a59f', // Rojo suave
    images: ['/recursos/fosilesT-img1.jpg', '/recursos/fosilesT-img2.jpg'],
    link: '/tematicas/fosiles-terrestres',
  },
  {
    id: 'animales-embalsamados',
    titulo: 'Animales autoctonos',
    descripcion: 'Sumérgete en la historia de la vida silvestre a través de sus fascinantes animales.',
  color: '#bfdbfe9d', // Azul suave
    images: ['/recursos/animales-img1.jpg', '/recursos/animales-img2.jpg'],
    link: '/tematicas/animales-embalsamados',
  },
  {
    id: 'rocas-minerales',
    titulo: 'Rocas y minerales',
    descripcion: 'Descubre los cimientos de nuestro planeta, desde cristales brillantes hasta formaciones rocosas milenarias.',
  color: '#fde68aa8', // Amarillo suave
    images: ['/recursos/rocas-img1.jpg', '/recursos/rocas-img2.jpg'],
    link: '/tematicas/rocas-minerales',
  },
];