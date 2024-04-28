import { useEffect, useRef, useState } from "react";
import { parseTiempo } from "../../../utils/parsear-descanso"
import { Pause } from "../../Atoms/icons/Pause";
import { Play } from "../../Atoms/icons/Play"
import "./Cronometro.css"
import { Stop } from "../../Atoms/icons/Stop";

export const Cronometro = ({index, descanso}) => {

	const [reproduciendo, setReproduciendo] = useState(false)
	const [tiempo, setTiempo] = useState({ minutos: 0, segundos: 0, centesimas: 0 });
	

	// let parsedTime = parseTiempo(descanso);
	// if(parsedTime === null) parsedTime = { minutos: 0, segundos: 0 }
	// const [tiempo, setTiempo] = useState({
	// 	minutos: parsedTime.minutos > 5 ? 5 : parsedTime.minutos, 
	// 	segundos: parsedTime.segundos > 59 ? 59 : parsedTime.segundos,
	// 	centesimas: 0
	// }) || { minutos: 0, segundos: 0, centesimas: 0 };
	
	const worker = useRef(null);

  useEffect(() => {
    worker.current = new Worker(new URL('./worker.js', import.meta.url));
    worker.current.onmessage = handleWorkerMessage;

    return () => {
      worker.current.terminate();
    };
  }, []);

  const handleWorkerMessage = (event) => {
    if (event.data.type === 'update') {
      setTiempo(event.data.tiempo);
    } else if (event.data.type === 'finished') {
      setReproduciendo(false);
    }
  };

  const inicioCronometro = () => {
    worker.current.postMessage('start');
    setReproduciendo(true);
  };

  const pararCronometro = () => {
    worker.current.postMessage('stop');
    setReproduciendo(false);
  };

  const reinicioCronometro = () => {
    worker.current.postMessage('stop');
    setTiempo({ minutos: 0, segundos: 0, centesimas: 0 });
    setReproduciendo(false);
  };
  return (
		<div class="border bg-body-tertiary d-flex">
			<div id="contenedor" className="d-flex gap-2 align-items-center">
				<div>
					{/* <div class="reloj" id="Horas">00</div> */}
					<div id={`Minutos-${index}`} className="reloj">{`${(tiempo.minutos !== undefined ? tiempo.minutos.toString().padStart(2, "0") : "00")}:`}</div>
					<div id={`Segundos-${index}`} className="reloj">{`${(tiempo.segundos !== undefined ? tiempo.segundos.toString().padStart(2, "0") : "00")}:`}</div>
					<div id={`Centesimas-${index}`} className="reloj">{`${(tiempo.centesimas !== undefined ? tiempo.centesimas.toString().padStart(2, "0") : "00")}`}</div>
				</div>
				{
					reproduciendo ?
						<button id={`parar-${index}`} type="button" class="btn btn-warning" onClick={pararCronometro}><Pause/></button>
						:
						<button id={`inicio-${index}`} type="button" class="btn btn-warning" onClick={inicioCronometro}><Play/></button>
				}
				<button id={`reinicio-${index}`} type="button" class="btn btn-warning" onClick={reinicioCronometro}><Stop/></button>
				
			</div>
			</div>
    
  )
}