import { useContext, useState } from "react"
import { Fecha } from "../Fecha/Fecha"
import TopBar from "../TopBar/TopBar"
import { motion } from "framer-motion"
import { ChevronRight } from "../../Atoms/icons/ChevronRight"
import { LoginContext } from "../../../context/LoginContext"
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker"
import { calcularDiasRestantes } from "../../helpers/diasRestantes"
import "./RutinaDias.css"

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}


export const RutinaDias = ({rutina, handleChangePage, caducacionRutina}) => {
  const {state, dispatch} = useContext(LoginContext)
  const diasRestantes = caducacionRutina === "0" ? "0" : calcularDiasRestantes(caducacionRutina)
  return (
    <motion.div initial={"closed"} animate={"open"} exit={"closed"} transition={{ duration: 0.5 }} variants={variants}>
      <TopBar titulo={"Mi Rutina"} />
      {/* <Fecha caducacionRutina={caducacionRutina} /> */}
      <CustomDatePicker />
      <div className={`card-footer mb-3 text-end text-uppercase fw-semibold fst-italic ${parseInt(diasRestantes) < 0 ? 'text-danger' : 'text-primary'}`}>
        {parseInt(diasRestantes) < 0 
          ? `Tu rutina expiró hace ${Math.abs(parseInt(diasRestantes))} día/s` 
          : `Tu rutina expira en ${diasRestantes} día/s`}
      </div>
      {/* <CustomDatePicker selectDate={new Date("2020-04-30")} /> */}
      <h6 className="text-start text-uppercase text-dark fw-semibold mb-3" style={{maxWidth: "800px", margin: "0 auto"}}>Selecciona el día de tu rutina: </h6>
      <ul className="list-group" style={{maxWidth: "800px", margin: "0 auto"}}>
        {
          state.loading ? (
            <>
              <p className="placeholder-glow my-1">
                <span className="placeholder col-12"></span>
              </p>
              <p className="placeholder-glow my-1">
                <span className="placeholder col-12"></span>
              </p>
              <p className="placeholder-glow my-1">
                <span className="placeholder col-12"></span>
              </p>
              <p className="placeholder-glow my-1">
                <span className="placeholder col-12"></span>
              </p>
              <p className="placeholder-glow my-1">
                <span className="placeholder col-12"></span>
              </p>
            </>
          ) : (
            rutina.map((rutina, index) => {
              return (
                <li style={{cursor: "pointer"}} className="list-dias-item list-group-item list-group-item-action list-group-item-success mb-2 py-3 d-flex justify-content-between align-items-center border border-secondary-subtle bg-body-secondary rounded" key={index} onClick={() => handleChangePage(index)}>
                  <h5 className="mb-0 text-start text-secondary fst-italic">{rutina.titulo ? <span className="text-secondary fst-italic">{rutina.titulo}</span> : <span className="text-secondary fst-italic">{`Dia ${index+1}`}</span>}</h5>
                  <div className="d-flex gap-2">
                    <ChevronRight/>
                  </div>
                </li>
              )
            })
          )
        }
      </ul> 
    </motion.div>
  )
}