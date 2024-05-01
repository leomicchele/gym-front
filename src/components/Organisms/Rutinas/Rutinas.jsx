
import React, { useContext, useEffect, useState } from "react"
import { getSessionStorage } from "../../helpers/storage";
import { LoginContext } from "../../../context/LoginContext";
import "./Alumnos.css"
import { RutinaDias } from "../../Molecules/RutinaDias/RutinaDias";
import { RutinaEjercicios } from "../../Molecules/RutinaEjercicios/RutinaEjercicios";
import { AnimatePresence, motion } from "framer-motion"


export const Rutinas = () => {

    const [pageDia, setPageDia] = useState(0);
    const [diasOEjercicios, setDiasOEjercicios] = useState("dias");

    const {state, dispatch} = useContext(LoginContext)

    const {id, rol, token, rutina, caducacionRutina} = getSessionStorage()

    const handleChangePage = (page) => {

        setPageDia(page)
        setDiasOEjercicios("ejercicios")
    }
    

  return (
    <div className="container container-alumno">
      <AnimatePresence>
      {
        diasOEjercicios === "dias" ?        
          <RutinaDias rutina={rutina} handleChangePage={handleChangePage} caducacionRutina={caducacionRutina || "0"}/>
        :        
          <RutinaEjercicios ejercicios={rutina[pageDia].ejercicios} dia={pageDia+1} />
      }
      </AnimatePresence>
      
    </div>
  );
}