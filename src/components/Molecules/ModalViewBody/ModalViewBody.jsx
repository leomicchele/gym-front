import { useEffect, useState } from "react"
import { ModalViewBodyRutinas } from "../ModalViewBodyRutinas/ModalViewBodyRutinas"
import { Button } from "../../Atoms/Button/Button"
import { Add } from "../../Atoms/icons/Add"
import { ModalViewBodyDatosAlumno } from "../ModalViewBodyDatosAlumno/ModalViewBodyDatosAlumno"
import { ModalViewBodyDatosProfesor } from "../ModalViewBodyDatosProfesor/ModalViewBodyDatosProfesor"
import { motion, AnimatePresence } from "framer-motion"
import { Edit } from "../../Atoms/icons/Edit"
import "./ModalViewBody.css"
import { CheckOkEdit } from "../../Atoms/icons/CheckOkEdit"
import { ModalViewBodyDias } from "../ModalViewBodyDias/ModalViewBodyDias"
import { FechaCaducacion } from "../../Atoms/FechaCaducacion/FechaCaducacion"

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}

export const ModalViewBody = ({
  datosUsuario,
  setDatosUsuario,
  datosOrRutinas = "rutinas",
  setDatosOrRutinas,
  // isEdit,
  emptyInput, 
  tipoUsuario}) => {

  const [rutinaState, setRutinaState] = useState([])
  const [isEdit, setIsEdit] = useState(false);


  const handleShowDias = (e) => {
    const divShow = document.querySelector(`#collapse${e.target.id}`)
    divShow.classList.toggle("show")
  }

  const handleAddDay = () => {
    const newDay = {
      ejercicios: []
    }
    setDatosUsuario({...datosUsuario, rutina: [...datosUsuario.rutina, newDay]})
  }

  const handleAddEjercicio = (dia) => {
    const rutinas = datosUsuario.rutina
    const newEjercicio = {
      ejercicio: "",
      series: [],
      reps: [],
      descanso: 0,
      kilos: [],
      metodo: "",
      observaciones: ""
    }
    if (rutinas[dia].length === 0) {
      rutinas[dia].ejercicios = [newEjercicio]
      setDatosUsuario({...datosUsuario, rutina: rutinas})
      return
    }
    rutinas[dia].ejercicios.push(newEjercicio)
    setDatosUsuario({...datosUsuario, rutina: rutinas})

  }

  const handleRemoveEjercicio = (dia, ejercicio) => {
    const rutinas = datosUsuario.rutina
    rutinas[dia].ejercicios.splice(ejercicio, 1)
    setDatosUsuario({...datosUsuario, rutina: rutinas})
  }
  const handleRemoveDia = (indexDia) => {
    const rutinas = datosUsuario.rutina
    rutinas.splice(indexDia, 1)
    setDatosUsuario({...datosUsuario, rutina: rutinas})    
  }

  const handleSetNombreDia = (indexDia, value) => {
    const rutinas = datosUsuario.rutina
    rutinas[indexDia].titulo = value
    setDatosUsuario({...datosUsuario, rutina: rutinas})
  }

  const handleSetDatosUsuario = (dia, ejercicioIndex, ejercicioNombre, value, campoIndex) => {
    const rutinas = datosUsuario.rutina

    // SI EL NOMBRE DEL EJERCICIO ES SERIES, REPS O KILOS
    if (ejercicioNombre === "series" || ejercicioNombre === "reps" || ejercicioNombre === "kilos") {
      rutinas[dia].ejercicios[ejercicioIndex][ejercicioNombre][campoIndex] = value
      setDatosUsuario({...datosUsuario, rutina: rutinas})
      return
      
    }

    // SI EL NOMBRE DEL EJERCICIO ES EJERCICIO, METODO O OBSERVACIONES
    rutinas[dia].ejercicios[ejercicioIndex][ejercicioNombre] = value
    setDatosUsuario({...datosUsuario, rutina: rutinas})
  }


  const handlePensañasTipoUsuario = () => {
    if (tipoUsuario === "alumno") {
      return (
        <>
          <li li className="nav-item" style={{cursor: "pointer"}} onClick={() => setDatosOrRutinas("datos")}> <span className={`nav-link ${datosOrRutinas === "datos" && "active"} fs-6`}>Datos</span> </li>
          <li className="nav-item" style={{cursor: "pointer"}} onClick={() => setDatosOrRutinas("rutinas")}> <span className={`nav-link ${datosOrRutinas === "rutinas" && "active"} fs-6`}>Rutinas</span> </li>
        </> 
      )
    } else {
      return <li li className="nav-item" style={{cursor: "pointer"}}> <span className={`nav-link ${datosOrRutinas === "datos" && "active"} fs-6`}>Datos</span> </li>
    }
  }

  const handleDatosTipoUsuario = () => {
    if (tipoUsuario === "alumno") {
      return (
        <>
          <ModalViewBodyDatosAlumno datosUsuario={datosUsuario} setDatosUsuario={setDatosUsuario} emptyInput={emptyInput}/>
        </>
      )
    } else {
      return (
        <>
          <ModalViewBodyDatosProfesor datosUsuario={datosUsuario} setDatosUsuario={setDatosUsuario} emptyInput={emptyInput}/>
        </>
      )
    }
  }

  
  return (
    <div className="modal-body">
      <ul className="nav nav-tabs mb-2">{handlePensañasTipoUsuario()}</ul>

      {datosOrRutinas === "datos" && handleDatosTipoUsuario()}
      {datosOrRutinas === "rutinas" ? (
        <AnimatePresence>
          <>
            <FechaCaducacion datosUsuario={datosUsuario} setDatosUsuario={setDatosUsuario}/>
            <p className="fs-6 text-warning-emphasis text-uppercase text-decoration-underline mt-3 mb-2 text-start">Días: </p>
            {datosUsuario.rutina.length > 0 &&
              datosUsuario.rutina.map((rutina, indexDia) => {
                return (
                  <ModalViewBodyDias datosUsuario={datosUsuario} setDatosUsuario={setDatosUsuario} rutina={rutina} indexDia={indexDia}/>
                );
              })}
            <Button msg={"Agregar Día"} functionHandle={handleAddDay} />
          </>
        </AnimatePresence>
      ) : (
        <></>
      )}
    </div>
  );
}