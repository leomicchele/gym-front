import CustomDatePicker from "../../Molecules/CustomDatePicker/CustomDatePicker"
import TopBar from "../../Molecules/TopBar/TopBar"
import { AnimatePresence, motion } from "framer-motion"
import { getSessionStorage } from "../../helpers/storage"
import { alumnoUpdateFetch, getAlumno, getHistorial } from "../../helpers/fetch"
import { useContext, useEffect, useState } from "react"
import { ModalViewBodyHistorial } from "../../Molecules/ModalViewBodyHistorial/ModalViewBodyHistorial"
import { LoginContext } from "../../../context/LoginContext"
import { ModalViewBodyDatosAlumno } from "../../Molecules/ModalViewBodyDatosAlumno/ModalViewBodyDatosAlumno"
import { FichaAlumno } from "../../Molecules/FichaAlumno/FichaAlumno"
import { Alert } from "../../Atoms/Alert/Alert"
import { FichaAlumnoPlaceHolder } from "../../Molecules/FichaAlumnoPlaceHolder/FichaAlumnoPlaceHolder"

const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  }

export const Ficha = () => {
  const {id} = getSessionStorage()
  const {state, dispatch} = useContext(LoginContext)

  const [datosUsuario, setDatosUsuario] = useState([])
  const [responseMsg, setResponseMsg] = useState("");


  // ACTUALIZA FICHA DE ALUMNO
  const handleUpdateAlumno = async() => {

    dispatch({type: "LOADING"})
    try {
      const response = await alumnoUpdateFetch(datosUsuario); 
      if (response.error) {
        dispatch({type: "ERROR"})
        setResponseMsg(response.message)
      } else {         
        setResponseMsg(response.message)
        dispatch({type: "FORM_SUCCESS"})
      }
    } catch (error) {
      dispatch({type: "ERROR"})
      console.info({error})
    }
  }

  useEffect(() => {
    const handleTraerFicha = async() => {
      dispatch({type: "LOADING"})
      try {
        const response = await getAlumno({_id: id})
        setDatosUsuario(response.Alumno)
        console.log(response.Alumno)
        dispatch({type: "SUCCESS"})
      } catch (error) {
        dispatch({type: "ERROR"})
        console.log({error})
      }
    }
    handleTraerFicha()
  }, [])


  return (
    <motion.div
      initial={"closed"}
      animate={"open"}
      exit={"closed"}
      transition={{ duration: 0.5 }}
      variants={variants}
      className="container"
    >
      <TopBar titulo={"Mi Ficha"} />
      {/* <CustomDatePicker /> */}
      <h6 className="text-uppercase text-dark fw-semibold text-start mb-1">
        Ficha Completa: {" "}
        {
          state.loading && <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>
        }
      </h6>
      <span className="text-start fst-italic d-flex w-100 mb-3">
        En esta sección podrás ver tu ficha y editar algunos datos personales. 
      </span>      
      <div>
        {
          state.error && <Alert type={"danger"}/>
        }
      </div>
      {
        state.loading ? 
       
          <div className="pb-3">
            <FichaAlumnoPlaceHolder/>
          </div>
        :
          <div className="pb-3">
            <FichaAlumno
              datosUsuario={datosUsuario}
              setDatosUsuario={setDatosUsuario}
            />
          </div>

      }
        {
            state.error && <Alert type={"danger"}/>
        }
        {
            state.formInputSuccess && <Alert type={"success"} msg={responseMsg}/>
        }
      <button disabled={state.error} className="btn btn-dark mt-1 mb-2 col-12" onClick={() => handleUpdateAlumno()}>
      {
        state.loading ? 
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Actualizar Ficha"
      }  
      </button>


    </motion.div>
  );
}