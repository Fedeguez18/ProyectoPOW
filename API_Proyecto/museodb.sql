-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-11-2025 a las 04:12:36
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `museodb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL,
  `nombre_archivo` varchar(255) NOT NULL,
  `ruta` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `autor` varchar(100) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `palabras_clave` varchar(255) DEFAULT NULL,
  `fecha_subida` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id`, `nombre_archivo`, `ruta`, `titulo`, `categoria`, `autor`, `fecha`, `descripcion`, `palabras_clave`, `fecha_subida`) VALUES
(1, 'img1(dino).jpg', 'uploads/img1(dino).jpg', 'Fósil de dinosaurio pampeano', 'Paleontología', 'Equipo de Paleontología – Museo Provincial', '2023-03-15', 'Esqueleto parcial de un dinosaurio herbívoro del Cretácico tardío hallado en la provincia de La Pampa, Argentina.', 'dinosaurio, fósil, cretácico, paleontología', '2025-11-11 15:22:12'),
(2, 'img2(mano).jpg', 'uploads/img2(mano).jpg', 'Fósil de extremidad de mamífero prehistórico', 'Paleontología', 'Laboratorio de Paleontología – UNLPam', '2022-09-21', 'Restos óseos pertenecientes a la extremidad anterior de un mamífero terrestre extinto del Pleistoceno.', 'fósil, hueso, extremidad, paleontología', '2025-11-11 15:22:12'),
(3, 'img3(dino).jpg', 'uploads/img3(dino).jpg', 'Restauración de fósil de dinosaurio', 'Paleontología', 'Taller de Conservación – Museo Provincial', '2023-06-10', 'Proceso de restauración de un ejemplar fósil encontrado en excavaciones recientes en la Patagonia argentina.', 'dinosaurio, restauración, fósil, conservación', '2025-11-11 15:22:12'),
(4, 'img4(piedra).jpg', 'uploads/img4(piedra).jpg', 'Bloque fósil en proceso de extracción', 'Paleontología', 'Equipo de Campo – Museo de La Pampa', '2023-04-25', 'Bloque de sedimentos con fósiles en etapa de preparación para su estudio y conservación.', 'paleontología, fósil, excavación, preparación', '2025-11-11 15:22:12'),
(5, 'img5(tortuga).jpg', 'uploads/img5(tortuga).jpg', 'Caparazón de Glyptodon', 'Paleontología', 'Departamento de Paleontología', '2023-02-18', 'Fósil completo de un Glyptodon, mamífero acorazado del Pleistoceno, hallado en el centro de Argentina.', 'glyptodon, fósil, mamífero, pleistoceno', '2025-11-11 15:22:12'),
(6, 'img6(mushi).jpg', 'uploads/img6(mushi).jpg', 'Montaje de esqueleto de megafauna', 'Paleontología', 'Museo Provincial de Ciencias Naturales', '2023-07-03', 'Exhibición de un esqueleto reconstruido de megaterio y otros mamíferos de gran tamaño del Cuaternario.', 'megaterio, fósil, esqueleto, exposición', '2025-11-11 15:22:12'),
(7, 'img7(puma).jpg', 'uploads/img7(puma).jpg', 'Representación del puma prehistórico “Nawel Mapu”', 'Zoología / Paleontología', 'Área de Zoología', '2022-11-20', 'Reconstrucción artística del puma prehistórico conocido como Nawel Mapu, basada en hallazgos fósiles locales.', 'puma, felino, zoología, reconstrucción, fósil', '2025-11-11 15:22:12'),
(8, 'img7(vasija_rota).jpeg', 'uploads/img7(vasija_rota).jpeg', 'Vasija cerámica precolombina', 'Arqueología', 'Área de Arqueología – Museo Regional', '2021-08-09', 'Fragmentos de una vasija cerámica utilizada por comunidades originarias del centro de Argentina.', 'cerámica, arqueología, cultura originaria, vasija', '2025-11-11 15:22:12'),
(9, 'img8.jpg', 'uploads/img8.jpg', 'Cerámicas ranqueles “Tierra Ranquel”', 'Arqueología / Etnografía', 'Colectivo Tierra Ranquel', '2023-05-28', 'Colección de cerámicas artesanales inspiradas en técnicas tradicionales del pueblo ranquel.', 'ranquel, cerámica, arqueología, artesanía', '2025-11-11 15:22:12'),
(10, 'img9(hoja).jpg', 'uploads/img9(hoja).jpg', 'Exhibición de fósiles y materiales arqueológicos', 'Museografía', 'Museo de Ciencias Naturales de La Pampa', '2023-09-12', 'Vista general de una sala del museo donde se exhiben piezas fósiles y objetos arqueológicos.', 'museo, exhibición, fósiles, arqueología', '2025-11-11 15:22:12'),
(11, 'img9(hoja).jpg', 'uploads/img9(hoja).jpg', 'Fósil de hoja del Mioceno', 'Paleobotánica', 'Área de Paleobotánica – Museo de La Pampa', '2023-01-14', 'Impresión fósil de una hoja perteneciente a una especie arbórea del Mioceno, hallada en depósitos sedimentarios de la región pampeana.', 'fósil, hoja, paleobotánica, mioceno, planta', '2025-11-11 15:22:14'),
(12, 'img10(piramide).jpg', 'uploads/img10(piramide).jpg', 'Monolito grabado de cultura originaria', 'Arqueología', 'Sección de Arqueología – Museo Regional', '2022-10-09', 'Pieza lítica con grabados geométricos perteneciente a una cultura precolombina del centro de Argentina, utilizada con fines rituales o simbólicos.', 'arqueología, monolito, grabado, cultura originaria, piedra', '2025-11-11 15:22:14'),
(13, 'img11(ave).jpg', 'uploads/img11(ave).jpg', 'Ave pampeana taxidermizada', 'Ornitología', 'Equipo de Ornitología – Museo Provincial', '2023-03-22', 'Ejemplar taxidermizado de un ave típica de la región pampeana, exhibido en la colección permanente del museo.', 'ave, ornitología, taxidermia, fauna pampeana, exhibición', '2025-11-11 15:22:14'),
(14, 'femur_glyptodon.jpg', 'uploads/femur_glyptodon.jpg', 'Fémur de Glyptodon', 'Paleontología', 'Equipo de Paleontología – Museo de La Pampa', '2023-03-12', 'Fémur fosilizado perteneciente a un Glyptodon, un mamífero acorazado del Pleistoceno hallado en la región pampeana.', 'fósil, glyptodon, pleistoceno, paleontología', '2025-11-11 15:22:14'),
(15, 'craneo_puma_concolor.png', 'uploads/craneo_puma_concolor.png', 'Cráneo de Puma concolor', 'Zoología', 'Sección Zoología', '2022-11-05', 'Ejemplar de cráneo de Puma concolor (león americano) utilizado para estudios anatómicos comparativos.', 'puma, zoología, mamífero, carnívoro', '2025-11-11 15:22:14'),
(16, 'geoda_ametista.jpeg', 'uploads/geoda_ametista.jpeg', 'Geoda de Amatista', 'Mineralogía', 'Colección Geología', '2021-09-18', 'Geoda de amatista proveniente de las formaciones basálticas de Córdoba, Argentina. Presenta cristales de cuarzo violeta de alta pureza.', 'mineral, amatista, cuarzo, geología', '2025-11-11 15:22:14'),
(17, 'nido_fosilizado.jpg', 'uploads/nido_fosilizado.jpg', 'Nido de dinosaurio fosilizado', 'Paleontología', 'Expedición Patagonia 2020', '2020-12-03', 'Conjunto de huevos fosilizados pertenecientes a un saurópodo, encontrados en sedimentos de la Formación Allen.', 'dinosaurio, fósil, huevo, saurópodo', '2025-11-11 15:22:14'),
(18, 'aves_pampeanas.png', 'uploads/aves_pampeanas.png', 'Colección de aves pampeanas', 'Ornitología', 'Equipo de Ornitología', '2022-08-14', 'Muestras taxidermizadas de especies típicas de la llanura pampeana, entre ellas el tero, calandria y hornero.', 'aves, ornitología, taxidermia, fauna pampeana', '2025-11-11 15:22:14'),
(19, 'cristal_cuarzo_rosa.jpg', 'uploads/cristal_cuarzo_rosa.jpg', 'Cristal de cuarzo rosa', 'Mineralogía', 'Colección Geología', '2021-05-20', 'Ejemplar de cuarzo rosa con estructura hexagonal bien definida, utilizado en exhibiciones sobre minerales semipreciosos.', 'cuarzo, mineral, geología, rosa', '2025-11-11 15:22:14'),
(20, 'huella_fosilizada.jpg', 'uploads/huella_fosilizada.jpg', 'Huella fosilizada de ave gigante', 'Paleontología', 'Equipo de Campo – Museo La Pampa', '2023-02-01', 'Impresión fósil atribuida a un ave corredora prehistórica (Phorusrhacidae), hallada en sedimentos de la Formación Chapadmalal.', 'fósil, huella, ave, paleontología', '2025-11-11 15:22:14'),
(21, 'coleccion_insectos.jpg', 'uploads/coleccion_insectos.jpg', 'Colección de insectos pampeanos', 'Entomología', 'Área Entomología', '2022-10-25', 'Serie de insectos disecados representativos de ecosistemas pampeanos, utilizados con fines educativos y científicos.', 'insectos, entomología, biodiversidad, educación', '2025-11-11 15:22:14'),
(22, 'roca_volcanica.png', 'uploads/roca_volcanica.png', 'Roca volcánica basáltica', 'Geología', 'Sección Geología', '2021-11-11', 'Muestra de basalto con vesículas, utilizada para explicar los procesos de enfriamiento del magma y formación de rocas ígneas.', 'geología, basalto, roca, volcánica', '2025-11-11 15:22:14'),
(23, 'femur_megatherium.jpg', 'uploads/femur_megatherium.jpg', 'Fémur de Megatherium americanum', 'Paleontología', 'Departamento de Paleontología', '2023-04-02', 'Fémur de perezoso gigante encontrado en sedimentos cuaternarios de La Pampa.', 'megatherium, fósil, cuaternario, paleontología', '2025-11-11 15:22:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `premiun` tinyint(1) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `uidd` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `premiun`, `email`, `uidd`) VALUES
(3, 'nicolas', 'morales', 1, 'nicolas@gmail.com', 'MAuglpdMgkc2bwxszq9CIrU6D6I3');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `uidd` (`uidd`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
