import { motion, transform } from "framer-motion"
import { Edit } from "../../Atoms/icons/Edit"
import { useContext, useEffect, useState } from "react";
import { getSessionStorage, getSessionStorageEjerciciosRealizados, updateSessionStorage, updateSessionStorageEjerciciosRealizados } from "../../helpers/storage";
import { RutinaContext } from "../../../context/RutinaContext";
import { ArrowCloud } from "../../Atoms/icons/ArrowCloud";
import { CheckOkEdit } from "../../Atoms/icons/CheckOkEdit";
import { alumnoUpdateFetch } from "../../helpers/fetch";
import { LoginContext } from "../../../context/LoginContext";
import { Loader } from "../../Atoms/Loader/Loader";
import { Alert } from "../../Atoms/Alert/Alert";
import { XCircle } from "../../Atoms/icons/XCircle";
import { Fire } from "../../Atoms/icons/Fire";
import "./RutinaEjerciciosItems.css"


const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  }

const accordionVariants = {
    open: { 
      opacity: 1, 
      height: "auto",
      overflow: "visible",
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    closed: { 
      opacity: 0, 
      height: "0px",
      overflow: "hidden",
      transform: "none",
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  }

export const RutinaEjerciciosItems = ({
    ejercicio, 
    index, 
    handleAbrirCollapse, 
    handleEjercicioRealizado,
    dia,
    handleModalVideo
  }) => {

  const {id, rol, token, rutina, caducacionRutina, rutinaId} = getSessionStorage()
  const {rutinaAlumno, setRutinaAlumno, pageDia} = useContext(RutinaContext)
  const {state, dispatch} = useContext(LoginContext)
  const initialKilos = ejercicio.kilos && ejercicio.kilos.length > 0 ? ejercicio.kilos : ["0", "0", "0", "0", "0"];
  const filledKilos = [...initialKilos, ...Array(5 - initialKilos.length).fill("0")];
  const [kilosState, setKilosState] = useState(filledKilos)
  const [errorFetch, setErrorFetch] = useState(false)
 const [errorMsg, setErrorMsg] = useState("")
  
  
  let ejerciciosRealizadosSession = getSessionStorageEjerciciosRealizados()
  let ejerciciosCheckeadoSession = ejerciciosRealizadosSession[dia-1].find(ejercicioSession => ejercicioSession.ejercicio === ejercicio.ejercicio)
  const [ejerciciosCheckeado, setEjerciciosCheckeado] = useState(ejerciciosCheckeadoSession?.ejercicio === ejercicio.ejercicio ? true : false)
  // console.log(ejerciciosCheckeadoSession?.ejercicio)
  // console.log(ejercicio.ejercicio)



  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOnChangeKilos = (e, index) => {
    setKilosState(kilosState.map((kilo, i) => {
      if (i === index) {
        return e.target.value
      }
      return kilo
    }))
  }  

  const handleEditarkilos = async () => {
    // si algun elemento de kilosState esta vacio, lo rellena con un 0
    const updatedKilosState = kilosState.map(kilo => {
      if (kilo === "") {
        return "0";
      }
      return kilo;
    });

    setKilosState(updatedKilosState);
    const updatedRutinaAlumno = rutinaAlumno.map((dia, i) => {
      if (i === pageDia) {
        return {
          ...dia,
          ejercicios: dia.ejercicios.map((ejercicio, j) => {
            if (j === index) {
              return {
                ...ejercicio,
                kilos: updatedKilosState  // Usar el estado actualizado
              };
            }
            return ejercicio;
          })
        };
      }
      return dia;
    }); 
  
    // Finalmente, actualizar la rutinaAlumno con el estado actualizado
    setRutinaAlumno(updatedRutinaAlumno);

  }

  const handleUpdateSotageEjerciciosRealizados = () => {
    const updatedKilosState = kilosState.map(kilo => {
      if (kilo === "") {
        return "0";
      }
      return kilo;
    });
    // actualiza los ejercicios realizados de localStorage
    ejerciciosRealizadosSession[dia-1].map((ejercicioSession, index) => {
      if (ejercicioSession.ejercicio === ejercicio.ejercicio) {
        ejerciciosRealizadosSession[dia-1][index].kilos = updatedKilosState
      }
    })
    updateSessionStorageEjerciciosRealizados(ejerciciosRealizadosSession)
  }

  const handleUpdateRutina = async () => {
    const datosAlumno = {
      rutina: rutinaAlumno,
      _id: id,
      rutinaId: rutinaId,
    }
    dispatch({type: "LOADING"})
      try {
        const response = await alumnoUpdateFetch(datosAlumno); 

        if (response.error) {
          // dispatch({type: "ERROR"})
          setErrorMsg(response.message)
          setErrorFetch(true)

          // setResponseMsg(response.message)
        } else {         
          // setResponseMsg(response.message)
          updateSessionStorage(rutinaAlumno, "rutina")          
          dispatch({type: "FORM_SUCCESS"})
          setIsEdit(!isEdit)
          setErrorFetch(false)
          handleUpdateSotageEjerciciosRealizados()
        }
      } catch (error) {
        setErrorMsg(response.message)
        dispatch({type: "ERROR"})
        setErrorFetch(true)

        console.info({error})
      }      
  }

  const handleCleanError = () => {
    dispatch({type: "FORM_SUCCESS"})
    setErrorFetch(false)
    setIsEdit(!isEdit)
  }

  const handleLinkObs = (observaciones) => {
    if (observaciones.includes("https://youtu.be")) {
      return <span onClick={() => handleModalVideo(observaciones)} className="text-primary">Mira este video</span>
    } else {
      return <span>{observaciones}</span>
    }    
  }


  useEffect(() => {
    if(isEdit) {
      handleUpdateRutina()
    } 
  }, [rutinaAlumno])
  


  return (
    <div key={index} className="accordion-item mb-2 rounded">
              
            <h2 className="accordion-header">

            <button
              className={`accordion-button p-3 rounded fs-5  ${'boton-ejercicio-' + index} ${ejerciciosCheckeado && 'bg-success-subtle'} ${ejercicio.precalentamiento && 'bg-warning bg-warning2 fs-6'} ${isOpen ? '' : 'collapsed bg-primary-subtle'}`}
              type="button"
              aria-expanded={isOpen ? "true" : "false"}
              aria-controls={"panelsStayOpen-collapseOne" + index}
              onClick={(e) => {
                if (!e.target.classList.contains("form-check-input")) {
                  setIsOpen(!isOpen);
                }
                handleAbrirCollapse(e, index);
              }}
            >
              {
                !ejercicio.precalentamiento ?
                <div className="form-check">
                  <input checked={ejerciciosCheckeado ? true : false} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={(e) => {
                        handleEjercicioRealizado(e, index, ejercicio.ejercicio)
                        setEjerciciosCheckeado(!ejerciciosCheckeado)
                        setIsEdit(false)
                      }
                      } />                      
                </div>
                : 
                <div className="pe-2">
                  <Fire/>
                </div>
              }

                {/* Nombre del ejercicio */}
              {ejercicio.ejercicio}
            </button>
          </h2>
          <motion.div
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={accordionVariants}
            id={"panelsStayOpen-collapseOne" + index}
            className={`accordion-collapse border ${ejercicio.precalentamiento ? "border-warning-subtle" :"border-primary-subtle"}  collapse-${index}`}
          >

            <div className="accordion-body px-2">
            <ul className="list-group">
              <li className="list-group-item d-flex align-items-center gap-1"><div className="items-ejercicio-small text-start"><span className="fw-semibold text-start">SERIE: </span></div>  <div className="text-start d-flex justify-content-between">{ejercicio.series.map((serie, index) => <span className="border border-secondary fw-medium text-info-emphasis px-2 py-1 mx-1">  {serie} </span>)}</div></li>
              <li className="list-group-item d-flex align-items-center gap-1"><div className="items-ejercicio-small text-start"><span className="fw-semibold text-start">REPS: </span></div>  <div className="text-start d-flex justify-content-between">{ejercicio.reps.map((serie, index) => <span className="border border-secondary fw-medium text-info-emphasis px-2 py-1 mx-1" >  {serie} </span>)}</div></li>
              <li className="list-group-item d-flex align-items-center gap-1">
                <div className="items-ejercicio-small text-start">
                  <span className="fw-semibold text-start">KILOS: </span>
                </div>  
                <div className="text-start d-flex align-items-center justify-content-between">
                    {
                        isEdit ? 
                        <>
                            <span className="d-flex gap-1 mx-1" > 
                                <input  type="number" onChange={ (e) => handleOnChangeKilos(e, 0) } value={kilosState[0]} className="form-control px-2" aria-describedby="basic-addon1"/> 
                                <input  type="number" onChange={ (e) => handleOnChangeKilos(e, 1) } value={kilosState[1]} className="form-control px-2" aria-describedby="basic-addon1"/> 
                                <input  type="number" onChange={ (e) => handleOnChangeKilos(e, 2) } value={kilosState[2]} className="form-control px-2" aria-describedby="basic-addon1"/> 
                                <input  type="number" onChange={ (e) => handleOnChangeKilos(e, 3) } value={kilosState[3]} className="form-control px-2" aria-describedby="basic-addon1"/> 
                                <input  type="number" onChange={ (e) => handleOnChangeKilos(e, 4) } value={kilosState[4]} className="form-control px-2" aria-describedby="basic-addon1"/> 
                            </span> 
                        </>
                        :
                        <>
                            {kilosState.map((serie, index) => <span key={index} className="border border-secondary fw-medium text-info-emphasis px-2 py-1 mx-1" >  {serie} </span>)}
                        </>
                    }
                    < >
                      {
                        state.loading ? <Loader/> 
                        :
                        <>
                          {
                            isEdit && !ejerciciosCheckeado && !errorFetch && 
                            <span onClick={() => handleEditarkilos()} className="text-success d-flex align-items-center">
                              <ArrowCloud/>
                            </span>
                          }
                          {
                            !isEdit && !ejerciciosCheckeado && !errorFetch && 
                            <span  onClick={() => setIsEdit(!isEdit)} className="text-primary d-flex align-items-center">
                              <Edit/>
                            </span> 
                          }
                          {
                            errorFetch && 
                            <span onClick={() => handleEditarkilos()} className="text-success d-flex align-items-center">
                              <XCircle/>
                            </span> 
                          }
                        </>
                      }
                    </>
                </div>
                
                
              </li>

              {
                ejercicio.precalentamiento ?
              <li className="list-group-item d-flex align-items-center gap-2"><div className="items-ejercicio text-start"><span className="fw-semibold text-start">TIEMPO: </span></div>  <div className="text-start"><span className="fw-medium text-info-emphasis">{ejercicio.descanso ? ejercicio.descanso : 0} min</span></div></li>
              :
              <li className="list-group-item d-flex align-items-center gap-1"><div className="items-ejercicio-small text-start"><span className="fw-semibold text-start">{ejercicio?.tipoMedicion || "R.I.R"}: </span></div>  <div className="text-start d-flex w-100 gap-1">{ejercicio.rir?.filter(serie => serie !== "").map((serie, index) => <span className="border border-secondary fw-medium text-info-emphasis px-2 py-1 mx-1" >  {ejercicio.tipoMedicion === "1RM" ? "%" : ""}  {serie} </span>)}</div></li>
              }

              <li className="list-group-item d-flex align-items-center gap-2"><div className="items-ejercicio text-start"><span className="fw-semibold text-start">METODO: </span></div>  <div className="text-start"><span className="fw-medium text-info-emphasis">{ejercicio.metodo}</span></div></li>
              <li className="list-group-item d-flex align-items-center gap-2"><div className="items-ejercicio text-start"><span className="fw-semibold text-start">OBS: </span></div>  <div className="observaciones-input"><span className="fw-medium text-info-emphasis">{handleLinkObs(ejercicio.observaciones)}</span></div></li>
              {
                !ejercicio.precalentamiento &&
                <li className="list-group-item d-flex align-items-center gap-2"><div className="items-ejercicio text-start"><span className="fw-semibold text-start">DESCANSO: </span></div>  <div className="text-start"><span className="fw-medium text-info-emphasis">{ejercicio.descanso ? ejercicio.descanso : 0} min</span></div></li>
              }
              
            {/* <Cronometro key={index} index={index} descanso={ejercicio.descanso}/> */}
             
            </ul>
            </div>
            {
              errorFetch ? <Alert type="danger" msg={errorMsg}/> : <></>
            }


          </motion.div>
        </div>
  )
}