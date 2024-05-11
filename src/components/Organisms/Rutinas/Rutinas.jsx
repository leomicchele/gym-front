
import React, { useContext, useEffect, useState } from "react"
import { getSessionStorage, setSessionStorage, updateSessionStorage } from "../../helpers/storage";
import { LoginContext } from "../../../context/LoginContext";
import "./Alumnos.css"
import { RutinaDias } from "../../Molecules/RutinaDias/RutinaDias";
import { RutinaEjercicios } from "../../Molecules/RutinaEjercicios/RutinaEjercicios";
import { AnimatePresence, motion } from "framer-motion"
import { RutinaContext } from "../../../context/RutinaContext";
import { getRutina } from "../../helpers/fetch";


export const Rutinas = () => {

    const [pageDia, setPageDia] = useState(0);
    const [diasOEjercicios, setDiasOEjercicios] = useState("dias");

    const {state, dispatch} = useContext(LoginContext)

    const {id, rutinaId, rol, token, rutina, caducacionRutina} = getSessionStorage()
    const [rutinaAlumno, setRutinaAlumno] = useState(rutina);

    const handleChangePage = (page) => {

        setPageDia(page)
        setDiasOEjercicios("ejercicios")
    }

    const handleTraerRutina = async() => {
      dispatch({type: "LOADING"})
      try {
        const response = await getRutina({rutinaId: rutinaId}); 
        setRutinaAlumno(response.rutina)
        updateSessionStorage(response.rutina, "rutina")
        updateSessionStorage(response.caducacionRutina, "caducacionRutina")
        dispatch({type: "SUCCESS"})
      } catch (error) {
        dispatch({type: "ERROR"})
        console.info({error})
      }
    }
    
    useEffect( () => {
      if (rutina === undefined || rutina.length === 0) {
        handleTraerRutina()
      }
    }, [])

  return (
    <div className="container container-alumno">
      <RutinaContext.Provider value={{rutinaAlumno, setRutinaAlumno, pageDia}}>
      <AnimatePresence>
      {
        diasOEjercicios === "dias" ?        
          <RutinaDias rutina={rutinaAlumno} handleChangePage={handleChangePage} caducacionRutina={caducacionRutina || "0"}/>
        :        
          <RutinaEjercicios ejercicios={rutinaAlumno[pageDia].ejercicios} dia={pageDia+1} />
      }
      </AnimatePresence>
      </RutinaContext.Provider>
      
    </div>
  );
}