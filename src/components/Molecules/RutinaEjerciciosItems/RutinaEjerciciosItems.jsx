import { motion } from "framer-motion"
import { Edit } from "../../Atoms/icons/Edit"
import { useContext, useEffect, useState } from "react";
import { getSessionStorage, updateSessionStorage } from "../../helpers/storage";
import { RutinaContext } from "../../../context/RutinaContext";
import { CheckOk } from "../../Atoms/icons/CheckOk";
import { CheckOkEdit } from "../../Atoms/icons/CheckOkEdit";
import { alumnoUpdateFetch } from "../../helpers/fetch";
import { LoginContext } from "../../../context/LoginContext";
import { Loader } from "../../Atoms/Loader/Loader";
import { Alert } from "../../Atoms/Alert/Alert";
import { XCircle } from "../../Atoms/icons/XCircle";


const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  }

export const RutinaEjerciciosItems = ({
    ejercicio, 
    index, 
    handleAbrirCollapse, 
    handleEjercicioRealizado,
    dia
  }) => {

  const {id, rol, token, rutina, caducacionRutina, rutinaId} = getSessionStorage()
  const {rutinaAlumno, setRutinaAlumno, pageDia} = useContext(RutinaContext)
  const {state, dispatch} = useContext(LoginContext)
  const initialKilos = ejercicio.kilos && ejercicio.kilos.length > 0 ? ejercicio.kilos : ["0", "0", "0", "0", "0"];
  const [kilosState, setKilosState] = useState(initialKilos)
  const [errorFetch, setErrorFetch] = useState(false)
  // console.log(kilosState)

  const [isEdit, setIsEdit] = useState(false);

  const handleOnChangeKilos = (e, index) => {
    setKilosState(kilosState.map((kilo, i) => {
      if (i === index) {
        return e.target.value
      }
      return kilo
    }))
  }
  

  const handleEditarkilos = async () => {

    setRutinaAlumno(rutinaAlumno.map((dia, i) => {
      if (i === pageDia) {
        return {
          ...dia,
          ejercicios: dia.ejercicios.map((ejercicio, j) => {
            if (j === index) {
              return {
                ...ejercicio,
                kilos: kilosState
              }
            }
            return ejercicio
          })
        }
      }
      return dia
    }))

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
          setErrorFetch(true)

          // setResponseMsg(response.message)
        } else {         
          // setResponseMsg(response.message)
          updateSessionStorage(rutinaAlumno, "rutina")
          dispatch({type: "FORM_SUCCESS"})
          setIsEdit(!isEdit)
          setErrorFetch(false)


        }
      } catch (error) {
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


  useEffect(() => {
    if(isEdit) {
      handleUpdateRutina()
    }
  }, [rutinaAlumno])
  


  return (
    <div key={index} className="accordion-item mb-2 rounded">
              
            <h2 className="accordion-header">

            <button
              className={`accordion-button p-3 rounded fs-5  ${"boton-ejercicio-" + index}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#panelsStayOpen-collapseOne" + index}
              aria-expanded="false"
              aria-controls={"panelsStayOpen-collapseOne" + index}
              onClick={(e) => handleAbrirCollapse(e, index)}
            >
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => handleEjercicioRealizado(e)} />
              </div>

                {/* Nombre del ejercicio */}
              {ejercicio.ejercicio}
            </button>
          </h2>
          <motion.div
            initial="closed"
            animate="open"
            transition={{ duration: 0.6 }}
            variants={variants}
            id="panelsStayOpen-collapseOne"
            className={`accordion-collapse border border-primary-subtle collapse-${index} collapse`}
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
                                <input  type="number" onChange={ (e) => handleOnChangeKilos(e, 0) } value={kilosState[0]} class="form-control px-2" aria-describedby="basic-addon1"/> 
                                <input  type="number" onChange={ (e) => handleOnChangeKilos(e, 1) } value={kilosState[1]} class="form-control px-2" aria-describedby="basic-addon1"/> 
                                <input  type="number" onChange={ (e) => handleOnChangeKilos(e, 2) } value={kilosState[2]} class="form-control px-2" aria-describedby="basic-addon1"/> 
                                <input  type="number" onChange={ (e) => handleOnChangeKilos(e, 3) } value={kilosState[3]} class="form-control px-2" aria-describedby="basic-addon1"/> 
                                <input  type="number" onChange={ (e) => handleOnChangeKilos(e, 4) } value={kilosState[4]} class="form-control px-2" aria-describedby="basic-addon1"/> 
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
                          !isEdit ? 
                                <span  onClick={() => setIsEdit(!isEdit)} className="text-primary d-flex align-items-center">
                                  <Edit/>
                                </span> 
                            : 
                                <>
                                  {
                                  errorFetch ? 
                                    <span onClick={() => handleCleanError()} className="text-danger d-flex align-items-center">
                                      <XCircle/>
                                    </span> 
                                  : 
                                  <span onClick={() => handleEditarkilos()} className="text-success d-flex align-items-center">
                                    <CheckOkEdit/>
                                  </span>
                                } 
                                </>
                        }
                        </>
                      }
                    </>
                </div>
                
                
              </li>
              <li className="list-group-item d-flex align-items-center gap-1"><div className="items-ejercicio-small text-start"><span className="fw-semibold text-start">R.I.R: </span></div>  <div className="text-start d-flex justify-content-between w-100 gap-1">{ejercicio.rir?.map((serie, index) => <span className="border border-secondary fw-medium text-info-emphasis px-2 py-1 mx-1" >  {serie} </span>)}</div></li>

              <li className="list-group-item d-flex align-items-center gap-2"><div className="items-ejercicio text-start"><span className="fw-semibold text-start">METODO: </span></div>  <div className="text-start"><span className="fw-medium text-info-emphasis">{ejercicio.metodo}</span></div></li>
              <li className="list-group-item d-flex align-items-center gap-2"><div className="items-ejercicio text-start"><span className="fw-semibold text-start">OBS: </span></div>  <div className="observaciones-input"><span className="fw-medium text-info-emphasis">{ejercicio.observaciones}</span></div></li>
              {/* <li className="list-group-item d-flex align-items-center gap-2"><div className="items-ejercicio text-start"><span className="fw-semibold text-start">DESCANSO: </span></div></li> */}
              <li className="list-group-item d-flex align-items-center gap-2"><div className="items-ejercicio text-start"><span className="fw-semibold text-start">DESCANSO: </span></div>  <div className="text-start"><span className="fw-medium text-info-emphasis">{ejercicio.descanso ? ejercicio.descanso : 0} min</span></div></li>
              
            {/* <Cronometro key={index} index={index} descanso={ejercicio.descanso}/> */}
             
            </ul>
            </div>
            {
              errorFetch ? <Alert type="danger" msg="Error, Intente de nuevo"/> : <></>
            }


          </motion.div>
        </div>
  )
}