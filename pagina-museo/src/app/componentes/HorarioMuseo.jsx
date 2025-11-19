'use client';
import { useState, useEffect } from 'react';
import styles from '../styles/horarioMuseo.module.css';

export default function HorarioMuseo() {
    // ✅ Inicializar siempre como false para evitar hydration mismatch
    const [minimized, setMinimized] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const [estado, setEstado] = useState({ abierto: false, mensaje: '', proximaApertura: null });
    const [cuentaRegresiva, setCuentaRegresiva] = useState('');

    // ✅ Cargar el estado desde localStorage solo en el cliente
    useEffect(() => {
        setIsClient(true);
        try {
            const saved = localStorage.getItem('horario_minimized');
            if (saved === 'true') {
                setMinimized(true);
            }
        } catch {}
    }, []);

    // toggle minimizar / restaurar (y persistir)
    const handleMinimize = () => setMinimized(true);
    const handleRestore = () => setMinimized(false);

    useEffect(() => {
        if (!isClient) return;
        try { 
            localStorage.setItem('horario_minimized', minimized ? 'true' : 'false'); 
        } catch {}
    }, [minimized, isClient]);

    // calculadora de estado + cuenta regresiva; ejecutada cada 1s
    useEffect(() => {
        function calcularYActualizar() {
            const ahora = new Date();
            const diaSemana = ahora.getDay();
            const horaActual = ahora.getHours();
            const minutoActual = ahora.getMinutes();
            const horaEnMinutos = horaActual * 60 + minutoActual;

            // Domingo (cerrado todo el día)
            if (diaSemana === 0) {
                const proximoLunes = new Date(ahora);
                proximoLunes.setDate(ahora.getDate() + 1);
                proximoLunes.setHours(9, 0, 0, 0);
                setEstado({
                    abierto: false,
                    mensaje: 'Cerrado - Domingos no abrimos',
                    proximaApertura: proximoLunes
                });

                const diff = proximoLunes - ahora;
                setCuentaRegresiva(formatDiff(diff, false));
                return;
            }

            const aperturaManana = 9 * 60;
            const cierreManana = 12 * 60;
            const aperturaTarde = 16 * 60;
            const cierreTarde = 21 * 60;

            const estaAbierto = (horaEnMinutos >= aperturaManana && horaEnMinutos < cierreManana) ||
                (horaEnMinutos >= aperturaTarde && horaEnMinutos < cierreTarde);

            if (estaAbierto) {
                let proximoCierre;
                if (horaEnMinutos < cierreManana) {
                    proximoCierre = new Date(ahora);
                    proximoCierre.setHours(12, 0, 0, 0);
                } else {
                    proximoCierre = new Date(ahora);
                    proximoCierre.setHours(21, 0, 0, 0);
                }

                setEstado({
                    abierto: true,
                    mensaje: '¡Estamos abiertos!',
                    proximaApertura: proximoCierre
                });

                const diff = proximoCierre - ahora;
                setCuentaRegresiva(formatDiff(diff, true));
            } else {
                let proximaApertura = new Date(ahora);

                if (horaEnMinutos < aperturaManana) {
                    proximaApertura.setHours(9, 0, 0, 0);
                } else if (horaEnMinutos >= cierreManana && horaEnMinutos < aperturaTarde) {
                    proximaApertura.setHours(16, 0, 0, 0);
                } else {
                    proximaApertura.setDate(ahora.getDate() + 1);
                    proximaApertura.setHours(9, 0, 0, 0);

                    if (proximaApertura.getDay() === 0) {
                        proximaApertura.setDate(proximaApertura.getDate() + 1);
                    }
                }

                setEstado({
                    abierto: false,
                    mensaje: 'Cerrado',
                    proximaApertura
                });

                const diff = proximaApertura - ahora;
                setCuentaRegresiva(formatDiff(diff, false));
            }
        }

        function formatDiff(diffMs, isClosing) {
            if (diffMs <= 0) return isClosing ? 'Cierra en 0h 0m 0s' : 'Abre en 0h 0m 0s';
            const horas = Math.floor(diffMs / (1000 * 60 * 60));
            const minutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diffMs % (1000 * 60)) / 1000);
            return isClosing ? `Cierra en ${horas}h ${minutos}m ${segundos}s` : `Abre en ${horas}h ${minutos}m ${segundos}s`;
        }

        calcularYActualizar();
        const intervalo = setInterval(calcularYActualizar, 1000);
        return () => clearInterval(intervalo);
    }, []);

    // ✅ No renderizar nada hasta que el cliente esté listo
    if (!isClient) {
        return null;
    }

    return (
        <div className={styles.hmRoot}>
            {minimized ? (
                <div className={`${styles.floating} ${styles.minimized}`}>
                    <button
                        className={styles.tabButton}
                        onClick={handleRestore}
                        title="Abrir Horarios"
                        aria-label="Abrir Horarios"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        <span className={styles.tabText}>Horarios</span>
                    </button>
                </div>
            ) : (
                <div className={`${styles.floating} ${styles.openFloating}`} aria-live="polite">
                    <div className={styles.card}>
                        <div className={`${styles.statusIndicator} ${estado.abierto ? styles.open : styles.closed}`}>
                            <div className={styles.pulse}></div>
                            <div className={styles.dot}></div>
                        </div>

                        <button
                            className={styles.closeButton}
                            onClick={handleMinimize}
                            aria-label="Cerrar tarjeta de horarios"
                            title="Cerrar"
                        >
                            ×
                        </button>

                        <div className={styles.content}>
                            <h3 className={styles.title}>
                                <svg className={styles.icon} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                Horarios del Museo
                            </h3>

                            <div className={`${styles.status} ${estado.abierto ? styles.statusOpen : styles.statusClosed}`}>
                                {estado.mensaje}
                            </div>

                            {cuentaRegresiva && (
                                <div className={styles.countdown}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                                        <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                    {cuentaRegresiva}
                                </div>
                            )}

                            <div className={styles.horarios}>
                                <div className={styles.horarioItem}>
                                    <span className={styles.dia}>Lunes a Sábado</span>
                                    <div className={styles.horas}>
                                        <span>9:00 - 12:00</span>
                                        <span className={styles.separator}>•</span>
                                        <span>16:00 - 21:00</span>
                                    </div>
                                </div>
                                <div className={`${styles.horarioItem} ${styles.cerrado}`}>
                                    <span className={styles.dia}>Domingo</span>
                                    <span className={styles.horas}>Cerrado</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}