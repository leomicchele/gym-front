import { useContext, useState } from "react"
import { Fecha } from "../Fecha/Fecha"
import TopBar from "../TopBar/TopBar"
import { motion } from "framer-motion"
import { ChevronRight } from "../../Atoms/icons/ChevronRight"
import { LoginContext } from "../../../context/LoginContext"
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker"

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}


export const RutinaDias = ({rutina, handleChangePage, caducacionRutina}) => {
  const {state, dispatch} = useContext(LoginContext)
  return (
    <motion.div initial={"closed"} animate={"open"} exit={"closed"} transition={{ duration: 0.5 }} variants={variants}>
      <TopBar titulo={"Mi Rutina"} />
      <Fecha caducacionRutina={caducacionRutina} />
      {/* <CustomDatePicker selectDate={new Date("2020-04-30")} /> */}
      <h5 className="text-start text-uppercase text-dark fw-semibold mb-3">Selecciona el día de tu rutina: </h5>
      <ul  className="list-group">
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
          {
            rutina.map((rutina, index) => {
              return (
                <li style={{cursor: "pointer"}} className="list-group-item list-group-item-action list-group-item-success mb-2 py-3 d-flex justify-content-between align-items-center border border-success-subtle rounded" key={index} onClick={() => handleChangePage(index)}>
                  <h5 className="mb-0 text-start text-secondary fst-italic">{rutina.titulo ? <span className="text-secondary fst-italic">{rutina.titulo}</span> : <span className="text-secondary fst-italic">{`Dia ${index+1}`}</span>}</h5>
                  {/* <h5 className="mb-0 text-start">Dia {index+1} - <span className="text-secondary fst-italic">{rutina.titulo}</span></h5> */}
                  <div className="d-flex gap-2">
                    {/* <span className="badge text-bg-primary rounded-pill">{rutina.ejercicios.length}</span> */}
                    <ChevronRight/>
                  </div>
                </li>
              )
            })
          }
        </ul>
    </motion.div>
  )
}