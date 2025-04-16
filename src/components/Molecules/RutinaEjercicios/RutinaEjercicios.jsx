import { useContext, useEffect, useState } from "react";
import { Cronometro } from "../Cronometro/Cronometro";
import TopBar from "../TopBar/TopBar";
import "./RutinaEjercicios.css"
import { motion } from "framer-motion"
import { Button } from "../../Atoms/Button/Button";
import { Modal } from "../Modal/Modal";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../context/LoginContext";
import { Edit } from "../../Atoms/icons/Edit";
import { RutinaEjerciciosItems } from "../RutinaEjerciciosItems/RutinaEjerciciosItems";
import { RutinaContext } from "../../../context/RutinaContext";
import { getSessionStorage, getSessionStorageEjerciciosRealizados, updateSessionStorageEjerciciosRealizados } from "../../helpers/storage";
import { historialUpdateFetch } from "../../helpers/fetch";
import { getDate } from "../../helpers/getDate";
import { Alert } from "../../Atoms/Alert/Alert";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}

export const RutinaEjercicios = ({ setDiasOEjercicios, ejercicios, dia,diaNombre }) => {

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenVideo, setIsOpenVideo] = useState(false)
  const [linkVideo, setLinkVideo] = useState("")
  const [responseMsg, setResponseMsg] = useState("");
  const [ejerciciosRealizadosCheck, setEjerciciosRealizadosCheck] = useState(0)
  const [ejerciciosRealizados, setEjerciciosRealizados] = useState(getSessionStorageEjerciciosRealizados())
  const navigate = useNavigate()
  const {state, dispatch} = useContext(LoginContext)
  const {id} = getSessionStorage()
  const [observaciones, setObservaciones] = useState("")
  const [msg, setMsg] = useState({
    msg: "Descarga tu rutina nuevamente",
    isError: false 
  })


  const handleEjercicioRealizado = (e, index, nombre) => {
    if (e.target.classList.contains("form-check-input")) {
      if (e.target.checked) {
        // verificar que no exista el ejercicio en el array
        if (ejerciciosRealizados.find(ejercicio => ejercicio.ejercicio === nombre)) {
          return
        }
        
        // Determinar qué kilos usar (para biserie o ejercicio normal)
        const ejercicioActual = ejercicios[index];
        let nuevoEjercicio;
        
        if (ejercicioActual.biserie) {
          // Si es biserie, guardar tanto kilos1 como kilos2
          const kilos1 = ejercicioActual.kilos1 || ["0", "0", "0", "0", "0"];
          const kilos2 = ejercicioActual.kilos2 || ["0", "0", "0", "0", "0"];
          nuevoEjercicio = {
            ejercicio: nombre, 
            kilos1: kilos1,
            kilos2: kilos2,
            esBiserie: true
          }
        } else {
          // Si es ejercicio normal, usar kilos normal
          const kilosEjercicio = ejercicioActual.kilos || ["0", "0", "0", "0", "0"];
          nuevoEjercicio = {ejercicio: nombre, kilos: kilosEjercicio}
        }
        
        const arrayDia = ejerciciosRealizados[dia-1]
        arrayDia.push(nuevoEjercicio)
        setEjerciciosRealizados(ejerciciosRealizados.map((ejercicio, index) => {
          if (index === (dia-1)) {
            return arrayDia
          }
          return ejercicio
        }))


        setEjerciciosRealizadosCheck(ejerciciosRealizadosCheck + 1)
        // updateSessionStorageEjerciciosRealizados(ejerciciosRealizados)
      } else {
        setEjerciciosRealizadosCheck(ejerciciosRealizadosCheck - 1)
        setEjerciciosRealizados(ejerciciosRealizados.map((ejercicio, index) => {
          if (index === (dia-1)) {
            return ejercicio.filter(ejercicio => ejercicio.ejercicio !== nombre)
          }
          return ejercicio
        }))
        // updateSessionStorageEjerciciosRealizados(ejerciciosRealizados)
      }
    }
  }

  const handleFrases = () => {
    let frase = ""
    const totalEjercicios = ejercicios.filter(ejercicio => !ejercicio.precalentamiento).length;
    const porcentajeCompletado = Math.round((ejerciciosRealizadosCheck / totalEjercicios) * 100);
    
    if (porcentajeCompletado === 0) {
      frase = "¡Ánimo, puedes empezar ahora! 🤔"
    } else if (porcentajeCompletado < 30) {
      frase = "¡Buen comienzo! ¡Vamos por más! 💪"
    } else if (porcentajeCompletado < 60) {
      frase = "¡Vas por buen camino! ¡Sigue así! 😉"
    } else if (porcentajeCompletado < 90) {
      frase = "¡Excelente esfuerzo! ¡Casi completas todo! 🔥"
    } else if (porcentajeCompletado < 100) {
      frase = "¡Gran trabajo! ¡Estás a un paso de completar todo! 🌟"
    } else {
      frase = "¡Increíble! ¡Has completado todos los ejercicios! 🎉"
    }
    
    return frase
  }

  // abre o cierra modal de finalizar entrenamiento
  const handleOpenModal = () => {
    dispatch({ type: "FORM_NEUTRAL"})
    setIsOpen(!isOpen)
  }

  // abre o cierra modal del video
  const handleOpenModalVideo = (link) => {
    dispatch({ type: "FORM_NEUTRAL"})
    if(!isOpenVideo) {
      setLinkVideo(link)
      setIsOpenVideo(true)
    } else {
      setIsOpenVideo(false)
    }
  }
  

  const handleFinalizarEntrenamiento = async () => {

    setEjerciciosRealizados(getSessionStorageEjerciciosRealizados())
    const diaNumber = dia - 1


    const fechaActual = getDate()
    
    dispatch({type: "LOADING"})
    let historial = {
      historial: {
        fecha: `${fechaActual.dia}/${fechaActual.mes}/${fechaActual.anio}`,
        nombreDia: diaNombre,
        ejerciciosRealizados: [],
        observaciones: observaciones
      }
    }

    historial.historial.ejerciciosRealizados = ejerciciosRealizados[diaNumber].map(ejercicio => {
        if (ejercicio.esBiserie) {
          return {
            ejercicio: ejercicio.ejercicio,
            kilos1: ejercicio.kilos1,
            kilos2: ejercicio.kilos2,
            esBiserie: true
          }
        }
        return {
          ejercicio: ejercicio.ejercicio,
          kilos: ejercicio.kilos
        }
      }
    )
    try {
      const response = await historialUpdateFetch(id, historial)
      dispatch({type: "FORM_SUCCESS"})
      setResponseMsg(response.message)

      // vaciar el array de ejercicios realizados
      setEjerciciosRealizados(ejerciciosRealizados.map((ejercicio, index) => {
        if (index === diaNumber) {
          return []
        }
        return ejercicio
      }))

      setTimeout(() => {
        dispatch({ type: "FORM_NEUTRAL"})
        setIsOpen(!isOpen)
        navigate("/menu")
      }, 2000)

      
    } catch (error) {
      dispatch({type: "ERROR"})
      setResponseMsg(response.message)
      console.info({error})      
      
    }


  }

  const handleAbrirCollapse = (e, index) => {
    if (e.target.classList.contains("form-check-input")) {
      if (e.target.checked) {
        document.querySelector(".boton-ejercicio-" + index).classList.add("bg-success-subtle")        
      } else {
        const boton = document.querySelector(".boton-ejercicio-" + index)
        boton.classList.remove("bg-success-subtle")        
        boton.classList.add("bg-primary-subtle")        
      }
      return
    }
    
    // The actual toggling of the accordion is now handled by the isOpen state in RutinaEjerciciosItems
  }
  
  useEffect(() => { // Actualizar el estado de ejerciciosRealizadosCheck
    setEjerciciosRealizadosCheck(ejerciciosRealizados[dia-1].length)
    updateSessionStorageEjerciciosRealizados(ejerciciosRealizados)

  }, [ejerciciosRealizados])

  useEffect(() => { // Verficar si se ha descargado la rutina
    const verificaDescagarRutina = getSessionStorage();
    if (verificaDescagarRutina.fechaDescargaRutina === undefined) {
      setMsg({...msg, isError: true})
    } else {
      setMsg({...msg, isError: false})
    }
  }, []);


  return (
    <motion.div initial={"closed"} animate={"open"} transition={{ duration: 0.5 }} exit={"closed"} variants={variants}>
      <TopBar titulo={`Ejercicios - Día ${dia}`} ruta="/menu/rutina" callback={() => setDiasOEjercicios("dias")} />

      <h5 className="text-start mb-2 text-secondary text-uppercase" style={{maxWidth: "800px", margin: "0 auto"}}>Lista de ejercicios: </h5>
      <span className="mb-2 text-start fst-italic d-flex w-100" style={{maxWidth: "800px", margin: "0 auto"}}>Asegúrate de completar el día de entrenamiento para que tu entrenador pueda revisar lo que has hecho.</span>

      {
        msg.isError && <Alert type="danger" msg={msg.msg}/> 
      }
      <div className="accordion" id="accordionPanelsStayOpenExample" style={{maxWidth: "800px", margin: "0 auto"}}>
        {ejercicios.map((ejercicio, index) => {
          return (
            <RutinaEjerciciosItems key={index} ejercicio={ejercicio} index={index} handleAbrirCollapse={handleAbrirCollapse} handleEjercicioRealizado={handleEjercicioRealizado} dia={dia} handleModalVideo={handleOpenModalVideo}/>
          );
        })}
        
        
      </div>

      <div className="form-floating" style={{maxWidth: "800px", margin: "0 auto"}}>
        <textarea className="form-control" value={observaciones} placeholder="Leave a comment here" id="floatingTextarea" onChange={(e) => setObservaciones(e.target.value)}  ></textarea>
        <label htmlFor="floatingTextarea">Observaciones</label>
        <span className="mt-2 text-start fst-italic d-flex w-100">Registra todo lo que consideres importante sobre tu día de entrenamiento: lo que no pudiste hacer o cualquier otro detalle relevante.</span>

      </div>

      <button className="btn btn-dark my-4 col-12" style={{maxWidth: "800px", margin: "0 auto"}} onClick={() => handleOpenModal()}>FINALIZAR ENTRENAMIENTO</button>
      {
        isOpen && <Modal 
          tipoModal={"terminar"} 
          handleFunction={handleFinalizarEntrenamiento}  
          handleIsOpen={setIsOpen} 
          title={`¡Entrenamiento Día ${dia}!`} 
          msg={`Has completado ${ejerciciosRealizadosCheck} de ${ejercicios.filter(ejercicio => !ejercicio.precalentamiento).length} ejercicios. ${handleFrases()} ${responseMsg ? ` ${responseMsg}` : ''}`}
        />
      }
      {
        isOpenVideo && <Modal tipoModal={"video"} handleFunction={handleFinalizarEntrenamiento}  handleIsOpen={setIsOpenVideo} title={`Video`} msg={linkVideo}/>
      }

    </motion.div>
  );
};
