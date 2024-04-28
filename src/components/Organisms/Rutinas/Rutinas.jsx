
import React, { useContext, useState } from "react"
import { getSessionStorage } from "../../helpers/storage";
import { LoginContext } from "../../../context/LoginContext";
import TopBar from "../../Molecules/TopBar/TopBar";
import "./Alumnos.css"
import { SearchBar } from "../../Molecules/SearchBar";
import { alumnoCreateFetch, alumnoDeleteFetch, alumnoUpdateFetch, getFetch } from "../../helpers/fetch";
import { TableContainer } from "../../Molecules/TableContainer/TableContainer";
import { Alert } from "../../Atoms/Alert/Alert";
import { Modal } from "../../Molecules/Modal/Modal";
import { Pagination } from "../../Molecules/Pagination/Pagination";
import { RutinaDias } from "../../Molecules/RutinaDias/RutinaDias";
import { RutinaEjercicios } from "../../Molecules/RutinaEjercicios/RutinaEjercicios";
import { AnimatePresence, motion } from "framer-motion"


export const Rutinas = () => {

    const [pageDia, setPageDia] = useState(0);
    const [diasOEjercicios, setDiasOEjercicios] = useState("dias");

    const {state, dispatch} = useContext(LoginContext)

    const {id, rol, token, rutina} = getSessionStorage()

    const handleChangePage = (page) => {

        setPageDia(page)
        setDiasOEjercicios("ejercicios")
    }
    

  return (
    <div className="container container-alumno">
      <AnimatePresence>
      {
        diasOEjercicios === "dias" ?        
          <RutinaDias rutina={rutina} handleChangePage={handleChangePage} />
        :        
          <RutinaEjercicios ejercicios={rutina[pageDia].ejercicios} dia={pageDia+1} />
      }
      </AnimatePresence>
      
    </div>
  );
}