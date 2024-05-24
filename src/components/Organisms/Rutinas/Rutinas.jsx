
import React, { useContext, useEffect, useState } from "react"
import { getSessionStorage, getSessionStorageEjerciciosRealizados, removeSessionStorageEjerciciosRealizados, setSessionStorage, setSessionStorageEjerciciosRealizados, updateSessionStorage } from "../../helpers/storage";
import { LoginContext } from "../../../context/LoginContext";
import "./Alumnos.css"
import { RutinaDias } from "../../Molecules/RutinaDias/RutinaDias";
import { RutinaEjercicios } from "../../Molecules/RutinaEjercicios/RutinaEjercicios";
import { AnimatePresence, motion } from "framer-motion"
import { RutinaContext } from "../../../context/RutinaContext";
import { getRutina } from "../../helpers/fetch";
import { useLocation, useNavigate } from "react-router-dom";


const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}


export const Rutinas = () => {

    const [pageDia, setPageDia] = useState(0);
    const [diasOEjercicios, setDiasOEjercicios] = useState("dias");

    const {state, dispatch} = useContext(LoginContext)

    const {id, rutinaId, rol, token, rutina, caducacionRutina} = getSessionStorage()
    const [rutinaAlumno, setRutinaAlumno] = useState(rutina);
    const navigate = useNavigate()
    let location = useLocation();

    const handleChangePage = (page) => {

        setPageDia(page)
        setDiasOEjercicios("ejercicios")
        navigate(`/menu/rutina/${page+1}`)
    }

    const handleTraerRutina = async() => {
      dispatch({type: "LOADING"})
      try {
        const response = await getRutina({rutinaId: rutinaId}); 
        setRutinaAlumno(response.rutina)
        updateSessionStorage(response.rutina, "rutina")
        updateSessionStorage(response.caducacionRutina, "caducacionRutina")
        dispatch({type: "SUCCESS"})
        removeSessionStorageEjerciciosRealizados()
        handleSessionEjercicios(response.rutina.length)
      } catch (error) {
        dispatch({type: "ERROR"})
        console.info({error})
      }
    }

    const handleSessionEjercicios = (numeroItems) => {
      const ejerciciosRealizadosSession = getSessionStorageEjerciciosRealizados()
      if (ejerciciosRealizadosSession === null) {
        
        setSessionStorageEjerciciosRealizados(new Array(numeroItems).fill([]))
      }
    }
    
    useEffect( () => {
      if (rutina === undefined || rutina.length === 0) {
        handleTraerRutina()        
      } else {
        handleSessionEjercicios(rutina.length)
      }
    }, [])

    // Setea el estado de diasOEjercicios a "dias" si la ruta es "/menu/rutina"
    useEffect( () => {
      location.pathname === "/menu/Rutina" && setDiasOEjercicios("dias")
    }, [location.pathname])


  return (
    <div className="container">
      <RutinaContext.Provider value={{rutinaAlumno, setRutinaAlumno, pageDia}}>
      <AnimatePresence>
      {
        diasOEjercicios === "dias" ?  
        <>
          <RutinaDias rutina={rutinaAlumno} handleChangePage={handleChangePage} caducacionRutina={caducacionRutina || "0"}/>
          <motion.div initial={"closed"} animate={"open"} exit={"closed"} transition={{ duration: 0.5 }} variants={variants}>
            <span className="text-start fst-italic d-flex w-100">Si tu entrenador te comunicó que modificó tu rutina de ejercicios, puedes actualizarla fácilmente presionando el botón 'Actualizar'"</span>
            <button className="btn btn-dark mb-4 mt-2 col-12" onClick={() => handleTraerRutina()}>Actualizar Entrenamiento</button>
          </motion.div>
        </>      
        :        
          <RutinaEjercicios setDiasOEjercicios={setDiasOEjercicios} ejercicios={rutinaAlumno[pageDia].ejercicios} dia={pageDia+1} diaNombre={rutinaAlumno[pageDia].titulo}/>
      }
      </AnimatePresence>
      </RutinaContext.Provider>
      
    </div>
  );
}