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

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}

export const RutinaEjercicios = ({ setDiasOEjercicios, ejercicios, dia,diaNombre }) => {

  const [isOpen, setIsOpen] = useState(false)
  const [responseMsg, setResponseMsg] = useState("");
  const [ejerciciosRealizadosCheck, setEjerciciosRealizadosCheck] = useState(0)
  const [ejerciciosRealizados, setEjerciciosRealizados] = useState(getSessionStorageEjerciciosRealizados())
  const navigate = useNavigate()
  const {state, dispatch} = useContext(LoginContext)
  const {id} = getSessionStorage()
  const [observaciones, setObservaciones] = useState("")


  const handleEjercicioRealizado = (e, index, nombre) => {
    if (e.target.classList.contains("form-check-input")) {
      if (e.target.checked) {
        // verificar que no exista el ejercicio en el array
        if (ejerciciosRealizados.find(ejercicio => ejercicio.ejercicio === nombre)) {
          return
        }
        const nuevoEjercicio = {ejercicio: nombre, kilos: ejercicios[index].kilos}
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
    switch (ejerciciosRealizadosCheck) {
      case 0:
        frase = "¿solo eso? 🤔"
        break;    
      case 1:
        frase = "Vamos por más! 💪"
        break;      
      case 2:
        frase = "sigue así! 😉"
        break;  
      default: 
        frase = "Enhorabuena! 🎉"
        break;
    }
    return frase
  }

  const handleOpenModal = () => {
    dispatch({ type: "FORM_NEUTRAL"})
    setIsOpen(!isOpen)
  }
  

  const handleFinalizarEntrenamiento = async () => {

    // console.log(ejerciciosRealizados[dia-1])
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

    if (document.querySelector(".collapse-" + index).classList.contains("show")) {
      document.querySelector(".collapse-" + index).classList.remove("show")
      return      
    }
    document.querySelector(".collapse-" + index).classList.add("show")
  }
  
  useEffect(() => {
    setEjerciciosRealizadosCheck(ejerciciosRealizados[dia-1].length)
    updateSessionStorageEjerciciosRealizados(ejerciciosRealizados)

  }, [ejerciciosRealizados])


  return (
    <motion.div initial={"closed"} animate={"open"} transition={{ duration: 0.5 }} exit={"closed"} variants={variants}>
      <TopBar titulo={`Ejercicios - Día ${dia}`} ruta="/menu/rutina" callback={() => setDiasOEjercicios("dias")} />

      <h5 className="text-start mb-2 text-secondary text-uppercase">Lista de ejercicios: </h5>
      <span className="mb-2 text-start fst-italic d-flex w-100">Asegúrate de completar el día de entrenamiento para que tu entrenador pueda revisar lo que has hecho.</span>

      <div className="accordion" id="accordionPanelsStayOpenExample">
        {ejercicios.map((ejercicio, index) => {
          return (
            <RutinaEjerciciosItems key={index} ejercicio={ejercicio} index={index} handleAbrirCollapse={handleAbrirCollapse} handleEjercicioRealizado={handleEjercicioRealizado} dia={dia}/>
          );
        })}
        
        
      </div>

      <div class="form-floating">
        <textarea class="form-control" value={observaciones} placeholder="Leave a comment here" id="floatingTextarea" onChange={(e) => setObservaciones(e.target.value)}  ></textarea>
        <label for="floatingTextarea">Observaciones</label>
        <span className="mt-2 text-start fst-italic d-flex w-100">Registra todo lo que consideres importante sobre tu día de entrenamiento: lo que no pudiste hacer o cualquier otro detalle relevante.</span>

      </div>

      <button className="btn btn-dark my-4 col-12" onClick={() => handleOpenModal()}>Finalizar Entrenamiento</button>
      {
        isOpen && <Modal tipoModal={"terminar"} handleFunction={handleFinalizarEntrenamiento}  handleIsOpen={setIsOpen} title={`Has realizado ${ejerciciosRealizadosCheck} ejercicio/s, ${handleFrases()}`} msg={responseMsg}/>
      }

    </motion.div>
  );
};
