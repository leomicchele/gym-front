import CustomDatePicker from "../../Molecules/CustomDatePicker/CustomDatePicker"
import TopBar from "../../Molecules/TopBar/TopBar"
import { AnimatePresence, motion } from "framer-motion"
import { getSessionStorage } from "../../helpers/storage"
import { getHistorial } from "../../helpers/fetch"
import { useContext, useEffect, useState } from "react"
import { ModalViewBodyHistorial } from "../../Molecules/ModalViewBodyHistorial/ModalViewBodyHistorial"
import { LoginContext } from "../../../context/LoginContext"

const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  }

export const Historial = () => {
  const {id} = getSessionStorage()
  const {state, dispatch} = useContext(LoginContext)

  const [historial, setHistorial] = useState([])

  useEffect(() => {
    const handleTraerHistorial = async() => {
      dispatch({type: "LOADING"})
      try {
        const response = await getHistorial({_id: id})
        setHistorial(response.historial)
        dispatch({type: "SUCCESS"})
      } catch (error) {
        console.log({error})
      }
    }
    handleTraerHistorial()
  }, [])


  return (
    <motion.div initial={"closed"} animate={"open"} exit={"closed"} transition={{ duration: 0.5 }} variants={variants} className="container">
    <TopBar titulo={"Mi Historial"} />
      <CustomDatePicker />
    <h6 className="text-uppercase text-dark fw-semibold text-start mb-1">Selecciona el día de tu historial: </h6>
    <span className="text-start fst-italic d-flex w-100 mb-3">En esta sección podrás ver tu historial de entrenamientos.</span>
    {
          state.loading && 
          <>
          <p class="placeholder-glow my-1">
            <span class="placeholder col-12"></span>
          </p>
          <p class="placeholder-glow my-1">
            <span class="placeholder col-12"></span>
          </p>
          <p class="placeholder-glow my-1">
            <span class="placeholder col-12"></span>
          </p>
          <p class="placeholder-glow my-1">
            <span class="placeholder col-12"></span>
          </p>
          <p class="placeholder-glow my-1">
            <span class="placeholder col-12"></span>
          </p>
          
          </>
        }
        <div className="pb-3">
          {historial.map((historialDia, indexDia) => {
                    return (
                      <ModalViewBodyHistorial historialDia={historialDia} indexDia={indexDia} />
                    );
                  })}      

        </div>
    
  </motion.div>
  )
}