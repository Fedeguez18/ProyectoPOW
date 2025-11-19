import Image from "next/image"; 
import Link from "next/link"; 
import styles from '../styles/museo.module.css';

export default function MuseoHome() {
  return (
    <main>
      
      {/* Sección Principal con la Historia y el Valor Social */}
      <section className={styles.historiaRoot}>
        <div className={styles.container}>
          
          {/* Bloque de Introducción y Estético */}
          <div className={styles.introBlock}>
            <h2 className={styles.mainTitle}>
              Un Viaje a la <span className={styles.highlight}>Historia Natural</span> de La Pampa
            </h2>
            <p className={styles.introText}>
              ¡Bienvenido a la casa de la **Biodiversidad** y la **Historia** de la provincia de La Pampa! El Museo de Ciencias Naturales no es solo un edificio; es un archivo tridimensional vivo que resguarda el **patrimonio natural y antropológico** de nuestra región, invitándote a reflexionar sobre la profunda conexión entre la naturaleza y la cultura que nos define.
            </p>
          </div>

          <hr className={styles.divider}/>

          {/* Bloque 1: Un Legado que Trasciende el Tiempo (Historia) */}
          <div className={styles.contentSection}>
            <div className={styles.imageWrapper}>
              {/* Placeholder: Reemplaza con una imagen histórica del museo o un elemento antiguo */}
              <Image 
                src="/img/museo-edificio-antiguo.jpg" 
                alt="Imagen histórica del Museo de La Pampa"
                layout="responsive"
                width={600}
                height={400}
                className={styles.sectionImage}
              />
              <p className={styles.caption}>Fundado en 1932 como el Museo de la Pampa.</p>
            </div>
            
            <div className={styles.textWrapper}>
              <h3 className={styles.sectionTitle}>Un Legado que Trasciende el Tiempo</h3>
              <p>Nuestra historia se remonta a **1932**, cuando fue creado inicialmente como el **Museo de la Pampa**, para luego ser inaugurado como el **Museo Regional Pampeano**. Desde sus inicios, el museo se ha dedicado a la custodia, curación, estudio y exhibición de colecciones que narran la transformación del paisaje pampeano.</p>
              <p>A pesar de los cambios y la transferencia de algunas secciones (como Arqueología y Etnografía) a otros organismos, nuestro enfoque se ha consolidado en el estudio y difusión de la rica diversidad natural de la provincia, trabajando bajo un nuevo paradigma que busca **relacionar la naturaleza y la cultura**.</p>
            </div>
          </div>
          
          <hr className={styles.divider}/>

          {/* Bloque 2: Las Colecciones que Hablan de Nosotros (Valor Social), con orden invertido para estética */}
          <div className={`${styles.contentSection} ${styles.reversed}`}>
             <div className={styles.textWrapper}>
              <h3 className={styles.sectionTitle}> Nuestras Colecciones: Un Archivo de la Tierra</h3>
              <p>Nuestras salas albergan valiosos acervos culturales, constituyendo un archivo esencial para la investigación y la divulgación científica. Con **más de 17 mil especímenes biológicos** y cientos de piezas antropológicas, el museo es un punto de encuentro con el pasado y el presente de La Pampa.</p>
              
              <ul className={styles.listGrid}>
                <li className={styles.listItem}>
                  <strong className={styles.listTitle}>Flora y Fauna Actual:</strong> Muestras que reflejan la diversidad biológica contemporánea.
                </li>
                <li className={styles.listItem}>
                  <strong className={styles.listTitle}>Paleontología de la Pampa:</strong> Fósiles de **siete períodos distintos**, incluyendo restos de **Dinosaurios Pampeanos** como el *Lapampasaurus*.
                </li>
                <li className={styles.listItem}>
                  <strong className={styles.listTitle}>Recursos Naturales:</strong> Minerales y otros elementos geológicos y naturales.
                </li>
                <li className={styles.listItem}>
                  <strong className={styles.listTitle}>Ciencias Antropológicas:</strong> Piezas históricas como boleadoras y morteros.
                </li>
              </ul>
              {/* Enlace de llamada a la acción para invitar a la lectura */}
              <Link href="/exhibiciones" className={styles.callToActionLink}>
                  Explorar todas las exhibiciones →
              </Link>
            </div>
            
            <div className={styles.imageWrapper}>
              {/* Placeholder: Reemplaza con una imagen de una colección destacada (fósil, animal taxidermizado) */}
              <Image 
                src="/img/museo-coleccion-fosil.jpg" 
                alt="Colección de fósiles del museo"
                layout="responsive"
                width={600}
                height={400}
                className={styles.sectionImage}
              />
              <p className={styles.caption}>Una valiosa colección paleontológica al servicio de la investigación.</p>
            </div>
          </div>
          
          <hr className={styles.divider}/>

          {/* Bloque 3: Compromiso Social y Video */}
          <div className={styles.compromisoBlock}>
            <h3 className={styles.sectionTitle}> Nuestro Compromiso Social y Educativo</h3>
            <p className={styles.compromisoText}>
              Bajo un nuevo paradigma que busca **relacionar la naturaleza y la cultura**, el museo se esfuerza por fomentar el vínculo con la comunidad y estimular el intercambio de conocimientos. Además de las exhibiciones, impulsamos la **Ciencia Ciudadana**, ofrecemos apoyo a otros museos provinciales y organizamos regularmente conferencias y talleres.
            </p>
            <div className={styles.videoWrapper}>
                {/* Video de YouTube con el nuevo enfoque del museo (16:9) */}
                <iframe 
                    className={styles.videoFrame}
                    src="https://www.youtube.com/embed/Sx8NGU9gQZU" 
                    title="YouTube video player - Museo Provincial de Historia Natural" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
                <p className={styles.caption}>Video: Nuevo enfoque del Museo Provincial de Historia Natural - YouTube</p>
            </div>
          </div>

        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Museo de Ciencias Naturales. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}