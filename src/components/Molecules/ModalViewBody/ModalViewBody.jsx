import { useContext, useEffect, useState } from "react"
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
import { LoginContext } from "../../../context/LoginContext"
import { Loader } from "../../Atoms/Loader/Loader"
import { ModalViewBodyHistorial } from "../ModalViewBodyHistorial/ModalViewBodyHistorial"

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
    

    const {state, dispatch} = useContext(LoginContext)


  const handleAddDay = () => {
    const newDay = {
      ejercicios: []
    }
    setDatosUsuario({...datosUsuario, rutina: [...datosUsuario.rutina, newDay]})
  }

  const handlePensañasTipoUsuario = () => {
    if (tipoUsuario === "alumno") {
      return (
        <>
          <li li className="nav-item" style={{cursor: "pointer"}} onClick={() => setDatosOrRutinas("datos")}> <span className={`nav-link ${datosOrRutinas === "datos" && "active"} fs-6`}>Datos</span> </li>
          <li
            
            className="nav-item" 
            style={{cursor: "pointer"}} 
            onClick={() => !state.loading && setDatosOrRutinas("rutinas")}> 
            <span className={`nav-link ${datosOrRutinas === "rutinas" && "active"} fs-6`}>{state.loading ? <Loader/> :  "Rutinas"  }</span> 
          </li>
          <li            
            className="nav-item" 
            style={{cursor: "pointer"}} 
            onClick={() => !state.loading && setDatosOrRutinas("historial")}
          > 
            <span className={`nav-link ${datosOrRutinas === "historial" && "active"} fs-6`}>{state.loading ? <Loader/> :  "Hist."  }</span> 
          </li>
          <li            
            className="nav-item" 
            style={{cursor: "pointer"}} 
            // onClick={() => !state.loading && setDatosOrRutinas("rutinas")}
          > 
            <span className={`nav-link text-secondary ${datosOrRutinas === "pagos" && "active"} fs-6`}>{state.loading ? <Loader/> :  "Pagos"  }</span> 
          </li>
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
            <FechaCaducacion
              datosUsuario={datosUsuario}
              setDatosUsuario={setDatosUsuario}
            />
            <span className="custom-label mt-3">
              Días
            </span>
            {datosUsuario.rutina.length > 0 &&
              datosUsuario.rutina.map((rutina, indexDia) => {
                return (
                  <ModalViewBodyDias
                    datosUsuario={datosUsuario}
                    setDatosUsuario={setDatosUsuario}
                    rutina={rutina}
                    indexDia={indexDia}
                  />
                );
              })}
            <Button msg={"Agregar Día"} functionHandle={handleAddDay} />
          </>
        </AnimatePresence>
      ) : (
        <></>
      )}
      {datosOrRutinas === "historial" ?
      (
        <>
          <span className="custom-label mt-3">
            Asistencias y ejercicios realizados
          </span>
          {
            datosUsuario.historial.map((historialDia, indexDia) => {
              return (
                <ModalViewBodyHistorial historialDia={historialDia} indexDia={indexDia} />
              );
            })        
          }
        </>
    )

      : <></>
        
      }
    </div>
  );
}