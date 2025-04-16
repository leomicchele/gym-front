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
  
  // Corregir inicialización de kilosState1 y kilosState2 con padding
  const initialKilos1 = ejercicio.kilos1 && ejercicio.kilos1.length > 0 ? ejercicio.kilos1 : ["0", "0", "0", "0", "0"];
  const filledKilos1 = [...initialKilos1, ...Array(Math.max(0, 5 - initialKilos1.length)).fill("0")]; 
  const [kilosState1, setKilosState1] = useState(filledKilos1);
  
  const initialKilos2 = ejercicio.kilos2 && ejercicio.kilos2.length > 0 ? ejercicio.kilos2 : ["0", "0", "0", "0", "0"];
  const filledKilos2 = [...initialKilos2, ...Array(Math.max(0, 5 - initialKilos2.length)).fill("0")]; 
  const [kilosState2, setKilosState2] = useState(filledKilos2);

  const [errorFetch, setErrorFetch] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  
  
  let ejerciciosRealizadosSession = getSessionStorageEjerciciosRealizados()
  
  // Para ejercicios de biserie, usar el nombre compuesto para buscar en el storage
  let nombreEjercicioBusqueda = ejercicio.biserie 
    ? `${ejercicio.ejercicio1 || ""} + ${ejercicio.ejercicio2 || ""}` 
    : ejercicio.ejercicio;
  
  let ejerciciosCheckeadoSession = ejerciciosRealizadosSession[dia-1].find(
    ejercicioSession => ejercicioSession.ejercicio === nombreEjercicioBusqueda
  )
  
  const [ejerciciosCheckeado, setEjerciciosCheckeado] = useState(!!ejerciciosCheckeadoSession)
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

  const handleOnChangeKilos1 = (e, index) => {
    setKilosState1(kilosState1.map((kilo, i) => {
      if (i === index) {
        return e.target.value
      }
      return kilo
    }))
  }

  const handleOnChangeKilos2 = (e, index) => {
    setKilosState2(kilosState2.map((kilo, i) => {
      if (i === index) {
        return e.target.value
      }
      return kilo
    }))
  }

  const handleEditarkilos = async () => {
    if (ejercicio.biserie) {
      // Manejar ejercicios de biserie
      const updatedKilosState1 = kilosState1.map(kilo => kilo === "" ? "0" : kilo);
      const updatedKilosState2 = kilosState2.map(kilo => kilo === "" ? "0" : kilo);
      
      setKilosState1(updatedKilosState1);
      setKilosState2(updatedKilosState2);
      
      const updatedRutinaAlumno = rutinaAlumno.map((dia, i) => {
        if (i === pageDia) {
          return {
            ...dia,
            ejercicios: dia.ejercicios.map((ejercicio, j) => {
              if (j === index) {
                return {
                  ...ejercicio,
                  kilos1: updatedKilosState1,
                  kilos2: updatedKilosState2
                };
              }
              return ejercicio;
            })
          };
        }
        return dia;
      });
      
      setRutinaAlumno(updatedRutinaAlumno);
    } else {
      // Manejar ejercicios regulares (código existente)
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
                  kilos: updatedKilosState
                };
              }
              return ejercicio;
            })
          };
        }
        return dia;
      }); 
    
      setRutinaAlumno(updatedRutinaAlumno);
    }
  }

  const handleUpdateSotageEjerciciosRealizados = () => {
    if (ejercicio.biserie) {
      const updatedKilosState1 = kilosState1.map(kilo => kilo === "" ? "0" : kilo);
      const updatedKilosState2 = kilosState2.map(kilo => kilo === "" ? "0" : kilo);
      
      // actualiza los ejercicios realizados de localStorage
      const nombreEjercicio = `${ejercicio.ejercicio1 || ""} + ${ejercicio.ejercicio2 || ""}`;
      ejerciciosRealizadosSession[dia-1].map((ejercicioSession, index) => {
        if (ejercicioSession.ejercicio === nombreEjercicio) {
          ejerciciosRealizadosSession[dia-1][index].kilos1 = updatedKilosState1;
          ejerciciosRealizadosSession[dia-1][index].kilos2 = updatedKilosState2;
        }
      });
    } else {
      const updatedKilosState = kilosState.map(kilo => {
        if (kilo === "") {
          return "0";
        }
        return kilo;
      });
      // actualiza los ejercicios realizados de localStorage
      ejerciciosRealizadosSession[dia-1].map((ejercicioSession, index) => {
        if (ejercicioSession.ejercicio === ejercicio.ejercicio) {
          ejerciciosRealizadosSession[dia-1][index].kilos = updatedKilosState;
        }
      });
    }
    updateSessionStorageEjerciciosRealizados(ejerciciosRealizadosSession);
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
  
  // Obtener el nombre del ejercicio para mostrar en el botón
  const getEjercicioName = () => {
    if (ejercicio.biserie) {
      return `${ejercicio.ejercicio1 || ""} + ${ejercicio.ejercicio2 || ""}`
    }
    return ejercicio.ejercicio
  }

  // Determinar la clase de estilo para el botón
  const getButtonStyle = () => {
    if (ejerciciosCheckeado) {
      return 'bg-success-subtle'; // Si está checkeado, siempre verde
    }
    
    if (ejercicio.precalentamiento) {
      return 'bg-warning bg-warning2 fs-6'; // Para precalentamiento
    }
    
    if (ejercicio.biserie) {
      return 'bg-info-subtle'; // Para biserie no checkeado
    }
    
    return isOpen ? '' : 'collapsed bg-primary-subtle'; // Para ejercicios normales
  }

  return (
    <div key={index} className="accordion-item mb-2 rounded">
              
            <h2 className="accordion-header">

            <button
              className={`accordion-button p-3 rounded fs-5 ${'boton-ejercicio-' + index} ${getButtonStyle()}`}
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
                        // Para biseries, usar un nombre compuesto o el nombre del ejercicio directamente
                        const nombreEjercicio = ejercicio.biserie 
                          ? `${ejercicio.ejercicio1 || ""} + ${ejercicio.ejercicio2 || ""}` 
                          : ejercicio.ejercicio;
                        handleEjercicioRealizado(e, index, nombreEjercicio)
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
              {getEjercicioName()}
            </button>
          </h2>
          <motion.div
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={accordionVariants}
            id={"panelsStayOpen-collapseOne" + index}
            className={`accordion-collapse border ${
              ejercicio.precalentamiento 
                ? "border-warning-subtle" 
                : ejercicio.biserie && !ejerciciosCheckeado
                  ? "border-info-subtle" 
                  : "border-primary-subtle"
            }  collapse-${index}`}
          >

            <div className="accordion-body px-2">
            <ul className="list-group">
              {ejercicio.biserie ? (
                <>
                  {/* Ejercicio 1 */}
                  <li className="list-group-item d-flex align-items-center gap-2 fw-bold text-info">EJERCICIO 1: {ejercicio.ejercicio1 || ""}</li>
                  <li className="list-group-item d-flex align-items-center gap-1"><div className="items-ejercicio-small text-start"><span className="fw-semibold text-start">SERIES: </span></div>  <div className="text-start d-flex justify-content-between">{ejercicio.series1?.map((serie, index) => <span className="border border-secondary fw-medium text-info-emphasis px-2 py-1 mx-1">  {serie} </span>)}</div></li>
                  <li className="list-group-item d-flex align-items-center gap-1"><div className="items-ejercicio-small text-start"><span className="fw-semibold text-start">REPS: </span></div>  <div className="text-start d-flex justify-content-between">{ejercicio.reps1?.map((serie, index) => <span className="border border-secondary fw-medium text-info-emphasis px-2 py-1 mx-1" >  {serie} </span>)}</div></li>
                  <li className="list-group-item d-flex align-items-center gap-1">
                    <div className="items-ejercicio-small text-start">
                      <span className="fw-semibold text-start">KILOS: </span>
                    </div>  
                    <div className="text-start d-flex align-items-center justify-content-between">
                      {
                        isEdit ? 
                        <>
                          <span className="d-flex gap-1 mx-1" > 
                            <input type="number" onChange={(e) => handleOnChangeKilos1(e, 0)} value={kilosState1[0]} className="form-control px-2" aria-describedby="basic-addon1"/> 
                            <input type="number" onChange={(e) => handleOnChangeKilos1(e, 1)} value={kilosState1[1]} className="form-control px-2" aria-describedby="basic-addon1"/> 
                            <input type="number" onChange={(e) => handleOnChangeKilos1(e, 2)} value={kilosState1[2]} className="form-control px-2" aria-describedby="basic-addon1"/> 
                            <input type="number" onChange={(e) => handleOnChangeKilos1(e, 3)} value={kilosState1[3]} className="form-control px-2" aria-describedby="basic-addon1"/> 
                            <input type="number" onChange={(e) => handleOnChangeKilos1(e, 4)} value={kilosState1[4]} className="form-control px-2" aria-describedby="basic-addon1"/> 
                          </span> 
                        </>
                        :
                        <>
                          {kilosState1.map((serie, index) => <span key={index} className="border border-secondary fw-medium text-info-emphasis px-2 py-1 mx-1" >  {serie} </span>)}
                        </>
                      }
                      {
                        !ejercicio.precalentamiento && !ejerciciosCheckeado && (
                          <>
                            {
                              state.loading ? <Loader/> 
                              :
                              <>
                                {
                                  isEdit && !errorFetch && 
                                  <span onClick={() => handleEditarkilos()} className="text-success d-flex align-items-center">
                                    <ArrowCloud/>
                                  </span>
                                }
                                {
                                  !isEdit && !errorFetch && 
                                  <span onClick={() => setIsEdit(!isEdit)} className="text-primary d-flex align-items-center">
                                    <Edit/>
                                  </span> 
                                }
                                {
                                  errorFetch && 
                                  <span onClick={() => handleCleanError()} className="text-danger d-flex align-items-center">
                                    <XCircle/>
                                  </span> 
                                }
                              </>
                            }
                          </>
                        )
                      }
                    </div>
                  </li>
                  {!ejercicio.precalentamiento && (
                    <li className="list-group-item d-flex align-items-center gap-1">
                      <div className="items-ejercicio-small text-start">
                        <span className="fw-semibold text-start">{ejercicio?.tipoMedicion || "R.I.R"}: </span>
                      </div>  
                      <div className="text-start d-flex w-100 gap-1">
                        {ejercicio.rir1?.filter(serie => serie !== "").map((serie, index) => (
                          <span className="border border-secondary fw-medium text-info-emphasis px-2 py-1 mx-1" >
                            {ejercicio.tipoMedicion === "1RM" ? "%" : ""}  {serie}
                          </span>
                        ))}
                      </div>
                    </li>
                  )}

                  {/* Ejercicio 2 */}
                  <li className="list-group-item d-flex align-items-center gap-2 fw-bold text-info mt-3">EJERCICIO 2: {ejercicio.ejercicio2 || ""}</li>
                  <li className="list-group-item d-flex align-items-center gap-1"><div className="items-ejercicio-small text-start"><span className="fw-semibold text-start">SERIES: </span></div>  <div className="text-start d-flex justify-content-between">{ejercicio.series2?.map((serie, index) => <span className="border border-secondary fw-medium text-info-emphasis px-2 py-1 mx-1">  {serie} </span>)}</div></li>
                  <li className="list-group-item d-flex align-items-center gap-1"><div className="items-ejercicio-small text-start"><span className="fw-semibold text-start">REPS: </span></div>  <div className="text-start d-flex justify-content-between">{ejercicio.reps2?.map((serie, index) => <span className="border border-secondary fw-medium text-info-emphasis px-2 py-1 mx-1" >  {serie} </span>)}</div></li>
                  <li className="list-group-item d-flex align-items-center gap-1">
                    <div className="items-ejercicio-small text-start">
                      <span className="fw-semibold text-start">KILOS: </span>
                    </div>  
                    <div className="text-start d-flex align-items-center justify-content-between">
                      {
                        isEdit ? 
                        <>
                          <span className="d-flex gap-1 mx-1" > 
                            <input type="number" onChange={(e) => handleOnChangeKilos2(e, 0)} value={kilosState2[0]} className="form-control px-2" aria-describedby="basic-addon1"/> 
                            <input type="number" onChange={(e) => handleOnChangeKilos2(e, 1)} value={kilosState2[1]} className="form-control px-2" aria-describedby="basic-addon1"/> 
                            <input type="number" onChange={(e) => handleOnChangeKilos2(e, 2)} value={kilosState2[2]} className="form-control px-2" aria-describedby="basic-addon1"/> 
                            <input type="number" onChange={(e) => handleOnChangeKilos2(e, 3)} value={kilosState2[3]} className="form-control px-2" aria-describedby="basic-addon1"/> 
                            <input type="number" onChange={(e) => handleOnChangeKilos2(e, 4)} value={kilosState2[4]} className="form-control px-2" aria-describedby="basic-addon1"/> 
                          </span> 
                        </>
                        :
                        <>
                          {kilosState2.map((serie, index) => <span key={index} className="border border-secondary fw-medium text-info-emphasis px-2 py-1 mx-1" >  {serie} </span>)}
                        </>
                      }
                      {
                        !ejercicio.precalentamiento && !ejerciciosCheckeado && (
                          <>
                            {
                              state.loading ? <Loader/> 
                              :
                              <>
                                {
                                  isEdit && !errorFetch && 
                                  <span onClick={() => handleEditarkilos()} className="text-success d-flex align-items-center">
                                    <ArrowCloud/>
                                  </span>
                                }
                                {
                                  !isEdit && !errorFetch && 
                                  <span onClick={() => setIsEdit(!isEdit)} className="text-primary d-flex align-items-center">
                                    <Edit/>
                                  </span> 
                                }
                                {
                                  errorFetch && 
                                  <span onClick={() => handleCleanError()} className="text-danger d-flex align-items-center">
                                    <XCircle/>
                                  </span> 
                                }
                              </>
                            }
                          </>
                        )
                      }
                    </div>
                  </li>
                  {!ejercicio.precalentamiento && (
                    <li className="list-group-item d-flex align-items-center gap-1">
                      <div className="items-ejercicio-small text-start">
                        <span className="fw-semibold text-start">{ejercicio?.tipoMedicion2 || "R.I.R"}: </span>
                      </div>  
                      <div className="text-start d-flex w-100 gap-1">
                        {ejercicio.rir2?.filter(serie => serie !== "").map((serie, index) => (
                          <span className="border border-secondary fw-medium text-info-emphasis px-2 py-1 mx-1" >
                            {ejercicio.tipoMedicion2 === "1RM" ? "%" : ""}  {serie}
                          </span>
                        ))}
                      </div>
                    </li>
                  )}
                </>
              ) : (
                <>
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
                                <span onClick={() => handleCleanError()} className="text-danger d-flex align-items-center">
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
                </>
              )}

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