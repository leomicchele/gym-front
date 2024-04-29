import { useState } from "react"
import { Fecha } from "../Fecha/Fecha"
import TopBar from "../TopBar/TopBar"
import { motion } from "framer-motion"
import { ChevronRight } from "../../Atoms/icons/ChevronRight"

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}

export const RutinaDias = ({rutina, handleChangePage}) => {

  return (
    <motion.div initial={"closed"} animate={"open"} exit={"closed"} variants={variants}>
      <TopBar titulo={"Mi Rutina"} />
      <Fecha/>
      <h5 className="text-start text-uppercase text-dark fw-semibold mb-3">Selecciona el día de tu rutina: </h5>
      <ul  className="list-group">
          {
            rutina.map((rutina, index) => {
              return (
                <li style={{cursor: "pointer"}} className="list-group-item list-group-item-action list-group-item-success mb-2 py-3 d-flex justify-content-between align-items-center border border-success-subtle rounded" key={index} onClick={() => handleChangePage(index)}>
                  <h5 className="mb-0 text-start text-secondary fst-italic">{rutina.titulo ? <span className="text-secondary fst-italic">{rutina.titulo}</span> : `Dia ${index+1}`}</h5>
                  {/* <h5 className="mb-0 text-start">Dia {index+1} - <span className="text-secondary fst-italic">{rutina.titulo}</span></h5> */}
                  <div className="d-flex gap-2">
                    {/* <span class="badge text-bg-primary rounded-pill">{rutina.ejercicios.length}</span> */}
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