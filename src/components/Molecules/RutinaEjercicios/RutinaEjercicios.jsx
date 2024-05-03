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
import { RutinaContext } from "../../../context/rutinaContext";

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
      
    }, 1000);


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
        //     <div key={index} className="accordion-item mb-2 rounded">
              
        //     <h2 className="accordion-header">

        //     <button
        //       className={`accordion-button p-3 rounded fs-5  ${"boton-ejercicio-" + index}`}
        //       type="button"
        //       data-bs-toggle="collapse"
        //       data-bs-target={"#panelsStayOpen-collapseOne" + index}
        //       aria-expanded="false"
        //       aria-controls={"panelsStayOpen-collapseOne" + index}
        //       onClick={(e) => handleAbrirCollapse(e, index)}
        //     >
        //       <div className="form-check">
        //         <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => handleEjercicioRealizado(e)} />
        //       </div>

        //       {ejercicio.ejercicio}
        //     </button>
        //   </h2>
        //   <motion.div
        //     initial="closed"
        //     animate="open"
        //     variants={variants}
        //     id="panelsStayOpen-collapseOne"
        //     className={`accordion-collapse border border-primary-subtle collapse-${index} collapse`}
        //   >

        //     <div className="accordion-body px-2">
        //     <ul className="list-group">
        //       <li className="list-group-item d-flex align-items-center gap-1"><div className="items-ejercicio-small text-start"><span className="fw-semibold text-start">SERIE: </span></div>  <div className="text-start">{ejercicio.series.map((serie, index) => <span className="border border-secondary fw-medium text-info-emphasis px-2 py-1 mx-1">  {serie} </span>)}</div></li>
        //       <li className="list-group-item d-flex align-items-center gap-1"><div className="items-ejercicio-small text-start"><span className="fw-semibold text-start">REPS: </span></div>  <div className="text-start">{ejercicio.reps.map((serie, index) => <span className="border border-secondary fw-medium text-info-emphasis px-2 py-1 mx-1" >  {serie} </span>)}</div></li>
        //       <li className="list-group-item d-flex align-items-center gap-1">
        //         <div className="items-ejercicio-small text-start">
        //           <span className="fw-semibold text-start">KILOS: </span>
        //         </div>  
        //         <input  type="number" value={fecha.split('/')[2]} onChange={(e) => handleInputChange(e, "year")} class="form-control px-2" placeholder="Año" aria-label="Año" aria-describedby="basic-addon1"/>
        //         <div className="text-start d-flex align-items-center">{ejercicio.kilos.map((serie, index) => <span className="border border-secondary fw-medium text-info-emphasis px-2 py-1 mx-1" >  {serie} </span>)}<span><Edit/></span></div>
        //       </li>
        //       <li className="list-group-item d-flex align-items-center gap-2"><div className="items-ejercicio text-start"><span className="fw-semibold text-start">METODO: </span></div>  <div className="text-start"><span className="fw-medium text-info-emphasis">{ejercicio.metodo}</span></div></li>
        //       <li className="list-group-item d-flex align-items-center gap-2"><div className="items-ejercicio text-start"><span className="fw-semibold text-start">OBS: </span></div>  <div className="observaciones-input"><span className="fw-medium text-info-emphasis">{ejercicio.observaciones}</span></div></li>
        //       {/* <li className="list-group-item d-flex align-items-center gap-2"><div className="items-ejercicio text-start"><span className="fw-semibold text-start">DESCANSO: </span></div></li> */}
        //       <li className="list-group-item d-flex align-items-center gap-2"><div className="items-ejercicio text-start"><span className="fw-semibold text-start">DESCANSO: </span></div>  <div className="text-start"><span className="fw-medium text-info-emphasis">{ejercicio.descanso ? ejercicio.descanso : 0} min</span></div></li>
              
        //     {/* <Cronometro key={index} index={index} descanso={ejercicio.descanso}/> */}
             
        //     </ul>
        //     </div>


        //   </motion.div>
        // </div>
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
