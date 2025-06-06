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
import { ModalViewBodyPagos } from "../ModalViewBodyPagos/ModalViewBodyPagos"
import ProgressChart from "../ProgressChart/ProgressChart"

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
    if (tipoUsuario === "alumno") { // Si es alumno, se muestran los datos, rutinas, historial y pagos
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
            onClick={() => !state.loading && setDatosOrRutinas("pagos")}
          > 
            <span className={`nav-link ${datosOrRutinas === "pagos" && "active"} fs-6`}>{state.loading ? <Loader/> :  "Pagos"  }</span> 
          </li>
        </> 
      )
    } else { // Si es profesor, se muestran los datos y las rutinas
      return (
        <>
          <li className="nav-item" style={{cursor: "pointer"}} onClick={() => setDatosOrRutinas("datos")}> 
            <span className={`nav-link ${datosOrRutinas === "datos" && "active"} fs-6`}>Datos</span> 
          </li>
          <li className="nav-item" style={{cursor: "pointer"}} onClick={() => !state.loading && setDatosOrRutinas("alumnos")}> 
            <span className={`nav-link ${datosOrRutinas === "alumnos" && "active"} fs-6`}>{state.loading ? <Loader/> : "Alumnos"}</span> 
          </li>
        </>
      )
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
          {/* Componente de gráfico estadístico */}
          {datosUsuario.historial.length > 0 && !state.loading && (
            <ProgressChart historial={datosUsuario.historial} />
          )}
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
      {datosOrRutinas === "pagos" ? (
        <AnimatePresence>
          <ModalViewBodyPagos datosUsuario={datosUsuario} setDatosUsuario={setDatosUsuario} />
        </AnimatePresence>
      ) : (
        <></>
      )}
      {datosOrRutinas === "alumnos" ? (
        <AnimatePresence>
          <div className="container">
            <span className="custom-label mt-3">
              Lista de Alumnos
            </span>
            <div className="alumnos-container mt-3">
              {/* Aquí se mostrarán los alumnos del profesor */}
              {datosUsuario.alumnos && datosUsuario.alumnos.length > 0 ? (
                datosUsuario.alumnos.map((alumno, index) => (
                  <div key={index} className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">{alumno.nombre} {alumno.apellido}</h5>
                      <p className="card-text">Email: {alumno.email}</p>
                      <Button msg={"Ver detalles"} functionHandle={() => {/* Función para ver detalles */}} />
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay alumnos asignados actualmente.</p>
              )}
            </div>
          </div>
        </AnimatePresence>
      ) : (
        <></>
      )}
    </div>
  );
}