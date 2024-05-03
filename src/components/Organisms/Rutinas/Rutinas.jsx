
import React, { useContext, useEffect, useState } from "react"
import { getSessionStorage } from "../../helpers/storage";
import { LoginContext } from "../../../context/LoginContext";
import "./Alumnos.css"
import { RutinaDias } from "../../Molecules/RutinaDias/RutinaDias";
import { RutinaEjercicios } from "../../Molecules/RutinaEjercicios/RutinaEjercicios";
import { AnimatePresence, motion } from "framer-motion"
import { RutinaContext } from "../../../context/RutinaContext";


export const Rutinas = () => {

    const [pageDia, setPageDia] = useState(0);
    const [diasOEjercicios, setDiasOEjercicios] = useState("dias");

    const {state, dispatch} = useContext(LoginContext)

    const {id, rol, token, rutina, caducacionRutina} = getSessionStorage()
    const [rutinaAlumno, setRutinaAlumno] = useState(rutina);

    const handleChangePage = (page) => {

        setPageDia(page)
        setDiasOEjercicios("ejercicios")
    }

    // ACTUALIZA ALUMNO
    const handleUpdateKilos = async() => {
      const datosAlumno = {
        peso: state.peso,
      }

      dispatch({type: "LOADING"})
      try {
        const response = await alumnoUpdateFetch(datosAlumno, id); 
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