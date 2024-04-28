import { useState } from "react";
import { Cronometro } from "../Cronometro/Cronometro";
import TopBar from "../TopBar/TopBar";
import "./RutinaEjercicios.css"
import { motion } from "framer-motion"

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}

export const RutinaEjercicios = ({ ejercicios, dia }) => {

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

      <div class="accordion" id="accordionPanelsStayOpenExample">
        {ejercicios.map((ejercicio, index) => {
          return (
            <div key={index} class="accordion-item mb-2 rounded">
              
            <h2 class="accordion-header">

            <button
              className={`accordion-button p-3 rounded fs-5  ${"boton-ejercicio-" + index}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#panelsStayOpen-collapseOne" + index}
              aria-expanded="true"
              aria-controls={"panelsStayOpen-collapseOne" + index}
              onClick={(e) => handleAbrirCollapse(e, index)}
            >
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
              </div>

              {ejercicio.ejercicio}
            </button>
          </h2>
          <motion.div
            initial="closed"
            animate="open"
            variants={variants}
            id="panelsStayOpen-collapseOne"
            class={`accordion-collapse border border-primary-subtle collapse-${index} collapse`}
          >

            <div class="accordion-body px-2">
            <ul class="list-group">
              <li class="list-group-item d-flex align-items-center gap-1"><div className="items-ejercicio-small text-start"><span className="fw-semibold text-start">SERIE: </span></div>  <div className="text-start">{ejercicio.series.map((serie, index) => <span className="border border-secondary fw-medium text-info-emphasis px-2 py-1 mx-1">  {serie} </span>)}</div></li>
              <li class="list-group-item d-flex align-items-center gap-1"><div className="items-ejercicio-small text-start"><span className="fw-semibold text-start">REPS: </span></div>  <div className="text-start">{ejercicio.reps.map((serie, index) => <span className="border border-secondary fw-medium text-info-emphasis px-2 py-1 mx-1" >  {serie} </span>)}</div></li>
              <li class="list-group-item d-flex align-items-center gap-1"><div className="items-ejercicio-small text-start"><span className="fw-semibold text-start">KILOS: </span></div>  <div className="text-start">{ejercicio.kilos.map((serie, index) => <span className="border border-secondary fw-medium text-info-emphasis px-2 py-1 mx-1" >  {serie} </span>)}</div></li>
              <li class="list-group-item d-flex align-items-center gap-2"><div className="items-ejercicio text-start"><span className="fw-semibold text-start">METODO: </span></div>  <div className="text-start"><span className="fw-medium text-info-emphasis">{ejercicio.metodo}</span></div></li>
              <li class="list-group-item d-flex align-items-center gap-2"><div className="items-ejercicio text-start"><span className="fw-semibold text-start">OBS: </span></div>  <div className="observaciones-input"><span className="fw-medium text-info-emphasis">{ejercicio.observaciones}</span></div></li>
              <li class="list-group-item d-flex align-items-center gap-2"><div className="items-ejercicio text-start"><span className="fw-semibold text-start">DESCANSO: </span></div></li>
              {/* <li class="list-group-item d-flex align-items-center gap-2"><div className="items-ejercicio text-start"><span className="fw-semibold text-start">DESCANSO: </span></div>  <div className="text-start"><span className="fw-medium text-info-emphasis">{ejercicio.descanso} min</span></div></li> */}
              
            <Cronometro key={index} index={index} descanso={ejercicio.descanso}/>
             
            </ul>
            </div>


          </motion.div>
        </div>
          );
        })}
        
        
      </div>
    </motion.div>
  );
};
