import { useContext, useState } from "react";
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

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}

export const RutinaEjercicios = ({ ejercicios, dia }) => {

  const [isOpen, setIsOpen] = useState(false)
  const [ejerciciosRealizados, setEjerciciosRealizados] = useState(0)
  const navigate = useNavigate()
  const {state, dispatch} = useContext(LoginContext)


  const handleEjercicioRealizado = (e, index) => {
    if (e.target.classList.contains("form-check-input")) {
      if (e.target.checked) {
        setEjerciciosRealizados(ejerciciosRealizados + 1)
      } else {
        setEjerciciosRealizados(ejerciciosRealizados - 1)
      }
      console.log(ejerciciosRealizados)
    }
  }

  const handleFrases = () => {
    let frase = ""
    switch (ejerciciosRealizados) {
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

  const handleFinalizarEntrenamiento = () => {
    dispatch({type: "LOADING"})

    setTimeout(() => {
      dispatch({type: "SUCCESS"})
      setIsOpen(!isOpen)
      navigate("/menu")
      
    }, 3000);


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


  return (
    <motion.div initial={"closed"} animate={"open"} exit={"closed"} variants={variants}>
      <TopBar titulo={`Ejercicios - Día ${dia}`} />

      <h5 className="text-start mb-2 text-secondary text-uppercase">Lista de ejercicios: </h5>

      <div className="accordion" id="accordionPanelsStayOpenExample">
        {ejercicios.map((ejercicio, index) => {
          return (
            <RutinaEjerciciosItems key={index} ejercicio={ejercicio} index={index} handleAbrirCollapse={handleAbrirCollapse} handleEjercicioRealizado={handleEjercicioRealizado} dia={dia}/>
          );
        })}
        
        
      </div>
      <button className="btn btn-dark my-4 col-12" onClick={() => setIsOpen(!isOpen)}>Finalizar Entrenamiento</button>
      {
        isOpen && <Modal tipoModal={"terminar"} handleFunction={handleFinalizarEntrenamiento}  handleIsOpen={setIsOpen} title={`Has realizado ${ejerciciosRealizados} ejercicio/s, ${handleFrases()}`} msg={"¿Deseas finalizar tu entrenamiento?"}/>
      }

    </motion.div>
  );
};
