import { useEffect, useRef, useState } from "react";
import { parseTiempo } from "../../../utils/parsear-descanso"
import { Pause } from "../../Atoms/icons/Pause";
import { Play } from "../../Atoms/icons/Play"
import { ArrowCounterClockWise } from "../../Atoms/icons/ArrowCounterClockWise"
import "./Cronometro.css"
import { Stop } from "../../Atoms/icons/Stop";

const isWakeLockSupported = 'wakeLock' in navigator;

export function Cronometro({ index, descanso }) {
	let parsedTime = parseTiempo(descanso)
	if (parsedTime === null) parsedTime = { minutos: 0, segundos: 10 }
	const [duracionTotalMs, setDuracionTotalMs] = useState(((parsedTime.minutos > 10 ? 9 : parsedTime.minutos) * 60 + (parsedTime.segundos > 59 ? 59 : parsedTime.segundos)) * 1000)

	const [reproduciendo, setReproduciendo] = useState(false)
	const [modoSticky, setModoSticky] = useState(false)
	const [tiempoRestante, setTiempoRestante] = useState(duracionTotalMs)
	const [timestampInicio, setTimestampInicio] = useState(null)
	const [acumulado, setAcumulado] = useState(0)
	const intervalID = useRef(null)
	const wakeLock = useRef(null)

	// Escuchar evento personalizado para configurar el tiempo del cronómetro
	useEffect(() => {
		// Función para manejar el evento personalizado
		const handleSetTiempo = (event) => {
			const nuevoTiempo = event.detail;
			if (nuevoTiempo) {
				// Parsear el tiempo del ejercicio
				const parsedNuevoTiempo = parseTiempo(nuevoTiempo);
				if (parsedNuevoTiempo) {
					// Configurar el nuevo tiempo
					const nuevoTiempoMs = ((parsedNuevoTiempo.minutos > 10 ? 9 : parsedNuevoTiempo.minutos) * 60 + 
						(parsedNuevoTiempo.segundos > 59 ? 59 : parsedNuevoTiempo.segundos)) * 1000;
					
					// Reiniciar el cronómetro
					setReproduciendo(false);
					if (wakeLock.current !== null) {
						wakeLock.current.release().catch((err) => console.error(err));
					}
					setTiempoRestante(nuevoTiempoMs);
					setDuracionTotalMs(nuevoTiempoMs);
					setAcumulado(0);
					setTimestampInicio(null);
					setModoSticky(false);
					
					// Iniciar el cronómetro automáticamente después de un pequeño retraso
					setTimeout(() => {
						inicioCronometro();
					}, 100);
				}
			}
		};

		// Agregar el event listener
		window.addEventListener('set-cronometro-tiempo', handleSetTiempo);

		// Eliminar el event listener cuando se desmonte el componente
		return () => {
			window.removeEventListener('set-cronometro-tiempo', handleSetTiempo);
		};
	}, []);

	// Refresca la UI cada 50ms, pero el cálculo es por timestamps
	useEffect(() => {
		if (reproduciendo) {
			intervalID.current = setInterval(() => {
				const ahora = Date.now()
				const transcurrido = ahora - timestampInicio + acumulado
				const restante = Math.max(duracionTotalMs - transcurrido, 0)
				setTiempoRestante(restante)
				if (restante <= 0) {
					setReproduciendo(false)
					if (wakeLock.current !== null) wakeLock.current.release().catch((err) => console.error(err))
				}
			}, 50)
		} else {
			clearInterval(intervalID.current)
		}
		return () => {
			clearInterval(intervalID.current)
			if (wakeLock.current !== null) wakeLock.current.release()
		}
	}, [reproduciendo, timestampInicio, acumulado, duracionTotalMs])

	async function inicioCronometro() {
		if (isWakeLockSupported) {
			try {
				wakeLock.current = await navigator.wakeLock.request('screen')
			} catch (err) {
				console.error(`${err.name}, ${err.message}`)
			}
		}
		// Si está en cero, reinicia
		if (tiempoRestante <= 0) {
			setAcumulado(0)
			setTiempoRestante(duracionTotalMs)
			setTimestampInicio(Date.now())
			setReproduciendo(true)
			setModoSticky(true)
			return
		}
		setTimestampInicio(Date.now())
		setReproduciendo(true)
		setModoSticky(true)
	}

	function pararCronometro() {
		setReproduciendo(false)
		// No cambiamos el modo sticky aquí, solo cuando se detiene completamente
		if (timestampInicio) {
			const ahora = Date.now()
			setAcumulado(acumulado + (ahora - timestampInicio))
		}
		if (wakeLock.current !== null) {
			wakeLock.current.release().catch((err) => console.error(err))
		}
	}

	function reinicioCronometro() {
		setTiempoRestante(duracionTotalMs)
		setAcumulado(0)
		setTimestampInicio(null)
		setReproduciendo(false)
		setModoSticky(false)
		if (wakeLock.current !== null) {
			wakeLock.current.release().catch((err) => console.error(err))
		}
	}

	// Cálculo para mostrar minutos, segundos y centésimas
	const minutos = Math.floor(tiempoRestante / 60000)
	const segundos = Math.floor((tiempoRestante % 60000) / 1000)
	const centesimas = Math.floor((tiempoRestante % 1000) / 10)
	
	// Variable para determinar si el cronómetro ha llegado a cero
	const estaEnCero = tiempoRestante <= 0

	return (
		<div className={`border rounded bg-body-tertiary d-flex wrapper-cronometro ${modoSticky ? 'cronometro-activo' : ''}`}>
			<div id="contenedor" className="d-flex gap-2 align-items-center">
				<div>
					<div id={`Minutos-${index}`} className="reloj">{`${minutos.toString().padStart(2, "0")}:`}</div>
					<div id={`Segundos-${index}`} className="reloj">{`${segundos.toString().padStart(2, "0")}:`}</div>
					<div id={`Centesimas-${index}`} className="reloj">{`${centesimas.toString().padStart(2, "0")}`}</div>
				</div>
				{
					reproduciendo ?
						<button id={`parar-${index}`} type="button" className="btn btn-warning boton-cronometro" style={{ width: "70px" }} onClick={pararCronometro}><Pause /></button>
						:
						<button id={`inicio-${index}`} type="button" className="btn btn-warning boton-cronometro" style={{ width: "70px" }} onClick={inicioCronometro}>
							{estaEnCero ? <ArrowCounterClockWise /> : <Play />}
						</button>
				}
				<button id={`reinicio-${index}`} type="button" className="btn btn-dark boton-cronometro" style={{ width: "70px" }} onClick={reinicioCronometro}><Stop /></button>
			</div>
		</div>
	)
}