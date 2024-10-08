import { useEffect, useRef, useState } from "react";
import { parseTiempo } from "../../../utils/parsear-descanso"
import { Pause } from "../../Atoms/icons/Pause";
import { Play } from "../../Atoms/icons/Play"
import "./Cronometro.css"
import { Stop } from "../../Atoms/icons/Stop";

const isWakeLockSupported = 'wakeLock' in navigator;

export const Cronometro = ({index, descanso}) => {

	const [reproduciendo, setReproduciendo] = useState(false)

	let parsedTime = parseTiempo(descanso);
	if(parsedTime === null) parsedTime = { minutos: 0, segundos: 0 }
	const [tiempo, setTiempo] = useState({
		minutos: parsedTime.minutos > 5 ? 5 : parsedTime.minutos, 
		segundos: parsedTime.segundos > 59 ? 59 : parsedTime.segundos,
		centesimas: 0
	}) || { minutos: 0, segundos: 0, centesimas: 0 };
	
	const intervalID = useRef(null);
	const wakeLock = useRef(null);

	useEffect(() => {
		if (reproduciendo) {
			intervalID.current = setInterval(cronometroReproducioendo, 10);
		} else {
		  clearInterval(intervalID.current);
		  
		}
		return () => {
			clearInterval(intervalID.current);

			if (wakeLock.current !== null) {
				wakeLock.current.release();
			  }
		}
	  }, [reproduciendo]);

	async function inicioCronometro () {
		if (isWakeLockSupported) {
			try {
			  wakeLock.current = await navigator.wakeLock.request('screen');
			} catch (err) {
			  console.error(`${err.name}, ${err.message}`);
			}
		  }
		if (tiempo.minutos === 0 && tiempo.segundos === 0 && tiempo.centesimas === 0) {
			setTiempo({
				minutos: parsedTime.minutos,
				segundos: parsedTime.segundos,
				centesimas: 0
			}) || { minutos: 0, segundos: 0, centesimas: 0 };
			return
		}
		setReproduciendo(true)
	}

	function pararCronometro () {
		setReproduciendo(false)
		if (wakeLock.current !== null) {
			wakeLock.current.release().catch((err) => console.error(err));
		  }
	}

	function reinicioCronometro () {
		setTiempo({
			minutos: parsedTime.minutos > 5 ? 5 : parsedTime.minutos, 
			segundos: parsedTime.segundos > 59 ? 59 : parsedTime.segundos,
			centesimas: 0
		}) || { minutos: 0, segundos: 0, centesimas: 0 };
		setReproduciendo(false);
		if (wakeLock.current !== null) {
			wakeLock.current.release().catch((err) => console.error(err));
		  }
	}

	const cronometroReproducioendo = () => {
		setTiempo((prevTiempo) => {
		  const nuevoCentesimas = prevTiempo.centesimas - 1;
		  if (nuevoCentesimas < 0) {
			const nuevoSegundos = prevTiempo.segundos - 1;
			if (nuevoSegundos < 0) {
			  const nuevoMinutos = prevTiempo.minutos - 1;
			  if (nuevoMinutos < 0) {
				setReproduciendo(false);
				if (wakeLock.current !== null) {
				  wakeLock.current.release().catch((err) => console.error(err));
				}
				return { minutos: 0, segundos: 0, centesimas: 0 };
			  }
			  return { ...prevTiempo, minutos: nuevoMinutos, segundos: 59, centesimas: 99 };
			}
			return { ...prevTiempo, segundos: nuevoSegundos, centesimas: 99 };
		  }
		  return { ...prevTiempo, centesimas: nuevoCentesimas };
		});
	  };
  return (
		<div className="border bg-body-tertiary d-flex">
			<div id="contenedor" className="d-flex gap-2 align-items-center">
				<div>
					{/* <div className="reloj" id="Horas">00</div> */}
					<div id={`Minutos-${index}`} className="reloj">{`${(tiempo.minutos !== undefined ? tiempo.minutos.toString().padStart(2, "0") : "00")}:`}</div>
					<div id={`Segundos-${index}`} className="reloj">{`${(tiempo.segundos !== undefined ? tiempo.segundos.toString().padStart(2, "0") : "00")}:`}</div>
					<div id={`Centesimas-${index}`} className="reloj">{`${(tiempo.centesimas !== undefined ? tiempo.centesimas.toString().padStart(2, "0") : "00")}`}</div>
				</div>
				{
					reproduciendo ?
						<button id={`parar-${index}`} type="button" className="btn btn-warning" onClick={pararCronometro}><Pause/></button>
						:
						<button id={`inicio-${index}`} type="button" className="btn btn-warning" onClick={inicioCronometro}><Play/></button>
				}
				<button id={`reinicio-${index}`} type="button" className="btn btn-warning" onClick={reinicioCronometro}><Stop/></button>
				
			</div>
			</div>
    
  )
}