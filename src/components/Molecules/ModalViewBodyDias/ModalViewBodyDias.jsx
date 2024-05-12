import { useEffect, useState } from "react"
import { ModalViewBodyRutinas } from "../ModalViewBodyRutinas/ModalViewBodyRutinas"
import { Button } from "../../Atoms/Button/Button"
import { Add } from "../../Atoms/icons/Add"
import { motion, AnimatePresence } from "framer-motion"
import { Edit } from "../../Atoms/icons/Edit"
import "./ModalViewBodyDias.css"
import { CheckOkEdit } from "../../Atoms/icons/CheckOkEdit"

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}

export const ModalViewBodyDias = ({datosUsuario,setDatosUsuario, rutina, indexDia}) => {
  const [isEdit, setIsEdit] = useState(false);
  

  const handleShowDias = (e) => {
    const divShow = document.querySelector(`#collapse${e.target.id}`)
    divShow.classList.toggle("show")
  }

  const handleAddDay = () => {
    const newDay = {
      ejercicios: []
    }
    setDatosUsuario({...datosUsuario, rutina: [...datosUsuario.rutina, newDay]})
  }

  const handleAddEjercicio = (dia) => {
    const rutinas = datosUsuario.rutina
    const newEjercicio = {
      ejercicio: "",
      series: [],
      reps: [],
      descanso: 0,
      kilos: [],
      metodo: "",
      observaciones: ""
    }
    if (rutinas[dia].length === 0) {
      rutinas[dia].ejercicios = [newEjercicio]
      setDatosUsuario({...datosUsuario, rutina: rutinas})
      return
    }
    rutinas[dia].ejercicios.push(newEjercicio)
    setDatosUsuario({...datosUsuario, rutina: rutinas})

  }

  const handleRemoveEjercicio = (dia, ejercicio) => {
    const rutinas = datosUsuario.rutina
    rutinas[dia].ejercicios.splice(ejercicio, 1)
    setDatosUsuario({...datosUsuario, rutina: rutinas})
  }
  const handleRemoveDia = (indexDia) => {
    const rutinas = datosUsuario.rutina
    rutinas.splice(indexDia, 1)
    setDatosUsuario({...datosUsuario, rutina: rutinas})    
  }

  const handleSetNombreDia = (indexDia, value) => {
    const rutinas = datosUsuario.rutina
    rutinas[indexDia].titulo = value
    setDatosUsuario({...datosUsuario, rutina: rutinas})
  }

  const handleSetDatosUsuario = (dia, ejercicioIndex, ejercicioNombre, value, campoIndex) => {
    const rutinas = datosUsuario.rutina

    // SI EL NOMBRE DEL EJERCICIO ES SERIES, REPS O KILOS
    if (ejercicioNombre === "series" || ejercicioNombre === "reps" || ejercicioNombre === "kilos" || ejercicioNombre === "rir") {
      // si rir no existe: lo creamos
      if (!rutinas[dia].ejercicios[ejercicioIndex].rir) {
        rutinas[dia].ejercicios[ejercicioIndex].rir = []
      }      
      rutinas[dia].ejercicios[ejercicioIndex][ejercicioNombre][campoIndex] = value
      setDatosUsuario({...datosUsuario, rutina: rutinas})
      return
      
    }

    // SI EL NOMBRE DEL EJERCICIO ES EJERCICIO, METODO O OBSERVACIONES
    rutinas[dia].ejercicios[ejercicioIndex][ejercicioNombre] = value
    setDatosUsuario({...datosUsuario, rutina: rutinas})
  }

  
  
  return (
    
    <motion.div initial={"closed"} animate={"open"} exit={{opacity: 0}} variants={variants}  key={`dia${+indexDia}`} className="accordion mb-2" id={`acordionDia${indexDia}`}>
        <div  className="accordion-item">
          <h2 className="accordion-header">
            <button onClick={(e) => handleShowDias(e)} className=" position-relative accordion-button d-flex justify-content-between gap-3" type="button" data-bs-toggle="collapse" id={`${indexDia+1}`} data-bs-target={`#collapse${indexDia+1}`} aria-expanded="true" aria-controls="collapseOne">
              <div className="overflow-x-hidden overflow-y-hidden">
                {
                  !isEdit ?
                  <motion.span  initial={{opacity: 0}} animate={{opacity: 1}}>{rutina.titulo ? rutina.titulo : <span className="fst-italic text-secondary">Día Nuevo</span>}</motion.span>   
                  :
                  <motion.input initial={{opacity: 0}} animate={{opacity: 1}} type="text" className="form-control" placeholder="Nombre del día" value={rutina.titulo} onChange={(e) => handleSetNombreDia(indexDia, e.target.value)}/>                              
                }
              </div>
              <div className="d-flex align-item-center"  onClick={() => setIsEdit(!isEdit)}>
                {
                  isEdit ? <CheckOkEdit/> : <Edit/>
                }
              </div>
              {/* <span>Día: {indexDia + 1} {rutina.titulo}</span>    */}
            </button>           
          </h2>
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}}  id={`collapse${indexDia+1}`}  className={` border border-primary-subtle accordion-collapse collapse`} data-bs-parent="#accordionExample">
            <div className="accordion-body py-2 px-1">    


                <AnimatePresence>
              <div className="collapse show" id="collapseExample">
                {
                  rutina.ejercicios?.map((ejercicio, index) => {
                    return (
                        <ModalViewBodyRutinas key={index} datosUsuario={ejercicio} handleSetDatosUsuario={handleSetDatosUsuario} handleRemoveEjercicio={handleRemoveEjercicio} dia={indexDia} index={index}/>
                    )
                  })
                  
                }     
                  {/* <ModalViewBodyRutinas datosUsuario={datosUsuario} setDatosUsuario={setDatosUsuario} isEdit={isEdit}/> */}
                  
                  <button className="btn btn-outline-success d-flex align-item p-2 gap-2 w-100" onClick={() => handleAddEjercicio(indexDia)}><Add/> Ejercicio</button>
                {/* <div className="card card-body p-0">
                </div> */}
              </div>  
                </AnimatePresence>           
            </div>
            <button type="button" className="btn btn-warning mb-2" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleRemoveDia(indexDia)}>Eliminar dia {indexDia + 1 }</button>                   
          </motion.div>
        </div>
        
    </motion.div>
  )                  

}