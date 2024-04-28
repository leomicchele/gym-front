import { useEffect, useState } from "react"
import { ModalViewBodyRutinas } from "../ModalViewBodyRutinas/ModalViewBodyRutinas"
import { Button } from "../../Atoms/Button/Button"
import { Add } from "../../Atoms/icons/Add"
import { ModalViewBodyDatosAlumno } from "../ModalViewBodyDatosAlumno/ModalViewBodyDatosAlumno"
import { ModalViewBodyDatosProfesor } from "../ModalViewBodyDatosProfesor/ModalViewBodyDatosProfesor"
import { motion, AnimatePresence } from "framer-motion"
import { Edit } from "../../Atoms/icons/Edit"
import "./ModalViewBody.css"
import { CheckOkEdit } from "../../Atoms/icons/CheckOkEdit"
import { ModalViewBodyDias } from "../ModalViewBodyDias/ModalViewBodyDias"

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}

export const ModalViewBody = ({
  datosUsuario,
  setDatosUsuario,
  datosOrRutinas = "rutinas",
  setDatosOrRutinas,
  // isEdit,
  emptyInput, 
  tipoUsuario}) => {

  const [rutinaState, setRutinaState] = useState([])
  const [isEdit, setIsEdit] = useState(false);


  // datosUsuario.rutina = [
  //   {
  //     ejercicios: [
  //       {
  //         ejercicio: "Press banca",
  //         series: [4, 4, 4, 4, 4],
  //         reps: [12, 10, 8, 6, 4],
  //         descanso: 2,
  //         kilos: [20, 30, 40, 50, 60]
  //       },
  //       {
  //         ejercicio: "Press Inclinado",
  //         series: [4, 4, 4, 4, 4],
  //         reps: [12, 10, 8, 6, 4],
  //         descanso: 2,
  //         kilos: [20, 30, 40, 50, 60]
  //       }, 
  //       {
  //         ejercicio: "Apertura con mancuerna",
  //         series: [4, 4, 4, 4, 4],
  //         reps: [12, 10, 8, 6, 4],
  //         descanso: 2,
  //         kilos: [20, 30, 40, 50, 60]
  //       },
  //       {
  //         ejercicio: "Polea Cruzada",
  //         series: [4, 4, 4, 4, 4],
  //         reps: [12, 10, 8, 6, 4],
  //         descanso: 2,
  //         kilos: [20, 30, 40, 50, 60]
  //       }
  //     ] ,      
  //   },
  //   {
  //     ejercicios: [
  //       {
  //         ejercicio: "Tiron al pecho",
  //         series: [4, 4, 4, 4, 4],
  //         reps: [12, 10, 8, 6, 4],
  //         descanso: 2,
  //         kilos: [20, 30, 40, 50, 60]
  //       },
  //       {
  //         ejercicio: "Remo con barra T",
  //         series: [4, 4, 4, 4, 4],
  //         reps: [12, 10, 8, 6, 4],
  //         descanso: 2,
  //         kilos: [20, 30, 40, 50, 60]
  //       }, 
  //       {
  //         ejercicio: "Polea tras nuca",
  //         series: [4, 4, 4, 4, 4],
  //         reps: [12, 10, 8, 6, 4],
  //         descanso: 2,
  //         kilos: [20, 30, 40, 50, 60]
  //       },
  //       {
  //         ejercicio: "Pull Over",
  //         series: [4, 4, 4, 4, 4],
  //         reps: [12, 10, 8, 6, 4],
  //         descanso: 2,
  //         kilos: [20, 30, 40, 50, 60]
  //       }
  //     ] ,      
  //   },
  //   {
  //     ejercicios: [
  //       {
  //         ejercicio: "Sentadilla",
  //         series: [4, 4, 4, 4, 4],
  //         reps: [12, 10, 8, 6, 4],
  //         descanso: 2,
  //         kilos: [20, 30, 40, 50, 60]
  //       },
  //       {
  //         ejercicio: "Peso Muerto",
  //         series: [4, 4, 4, 4, 4],
  //         reps: [12, 10, 8, 6, 4],
  //         descanso: 2,
  //         kilos: [20, 30, 40, 50, 60]
  //       }, 
  //       {
  //         ejercicio: "Leg Curl",
  //         series: [4, 4, 4, 4, 4],
  //         reps: [12, 10, 8, 6, 4],
  //         descanso: 2,
  //         kilos: [20, 30, 40, 50, 60]
  //       },
  //       {
  //         ejercicio: "Leg Extension",
  //         series: [4, 4, 4, 4, 4],
  //         reps: [12, 10, 8, 6, 4],
  //         descanso: 2,
  //         kilos: [20, 30, 40, 50, 60]
  //       }
  //     ] ,      
  //   },

  // ]

  const handleShowDias = (e) => {
    const divShow = document.querySelector(`#collapse${e.target.id}`)
    divShow.classList.toggle("show")
  }

  const handleAddDay = () => {
    console.log("entra")
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
    if (ejercicioNombre === "series" || ejercicioNombre === "reps" || ejercicioNombre === "kilos") {
      rutinas[dia].ejercicios[ejercicioIndex][ejercicioNombre][campoIndex] = value
      setDatosUsuario({...datosUsuario, rutina: rutinas})
      return
      
    }

    // SI EL NOMBRE DEL EJERCICIO ES EJERCICIO, METODO O OBSERVACIONES
    rutinas[dia].ejercicios[ejercicioIndex][ejercicioNombre] = value
    setDatosUsuario({...datosUsuario, rutina: rutinas})
  }


  const handlePensañasTipoUsuario = () => {
    if (tipoUsuario === "alumno") {
      return (
        <>
          <li li className="nav-item" style={{cursor: "pointer"}} onClick={() => setDatosOrRutinas("datos")}> <span className={`nav-link ${datosOrRutinas === "datos" && "active"} fs-6`}>Datos</span> </li>
          <li className="nav-item" style={{cursor: "pointer"}} onClick={() => setDatosOrRutinas("rutinas")}> <span className={`nav-link ${datosOrRutinas === "rutinas" && "active"} fs-6`}>Rutinas</span> </li>
        </> 
      )
    } else {
      return <li li className="nav-item" style={{cursor: "pointer"}}> <span className={`nav-link ${datosOrRutinas === "datos" && "active"} fs-6`}>Datos</span> </li>
    }
  }

  const handleDatosTipoUsuario = () => {
    if (tipoUsuario === "alumno") {
      return (
        <>
          <ModalViewBodyDatosAlumno datosUsuario={datosUsuario} setDatosUsuario={setDatosUsuario} emptyInput={emptyInput}/>
        </>
      )
    } else {
      return (
        <>
          <ModalViewBodyDatosProfesor datosUsuario={datosUsuario} setDatosUsuario={setDatosUsuario} emptyInput={emptyInput}/>
        </>
      )
    }
  }

  
  return (
    <div className="modal-body">

      
            <ul className="nav nav-tabs mb-2">
              { handlePensañasTipoUsuario() }
            </ul>

            {
              datosOrRutinas === "datos" && handleDatosTipoUsuario()
            }
            {
              datosOrRutinas === "rutinas" ?
              // <AnimatePresence>
              // <>
              // {
              //   datosUsuario.rutina.length > 0 && datosUsuario.rutina.map((rutina, indexDia) => {
              //     return (
                    
              //       <motion.div initial={"closed"} animate={"open"} exit={"closed"} variants={variants}  key={`dia${+indexDia}`} className="accordion mb-2" id={`acordionDia${indexDia}`}>
              //           <div  className="accordion-item">
              //             <h2 className="accordion-header">
              //               <button onClick={(e) => handleShowDias(e)} className=" position-relative accordion-button d-flex justify-content-between gap-3" type="button" data-bs-toggle="collapse" id={`${indexDia+1}`} data-bs-target={`#collapse${indexDia+1}`} aria-expanded="true" aria-controls="collapseOne">
              //                 <div>
              //                   {
              //                     !isEdit ?
              //                     <span>{rutina.titulo ? rutina.titulo : <span className="fst-italic text-secondary">Día Nuevo</span>}</span>   
              //                     :
              //                     <input type="text" className="form-control" placeholder="Nombre del día" value={rutina.titulo} onChange={(e) => handleSetNombreDia(indexDia, e.target.value)}/>                              
              //                   }
              //                 </div>
              //                 <div className="d-flex align-item-center"  onClick={() => setIsEdit(!isEdit)}>
              //                   {
              //                     isEdit ? <CheckOkEdit/> : <Edit/>
              //                   }
              //                 </div>
              //                 {/* <span>Día: {indexDia + 1} {rutina.titulo}</span>    */}
              //               </button>           
              //             </h2>
              //             <motion.div initial={{opacity: 0}} animate={{opacity: 1}}  id={`collapse${indexDia+1}`}  className={`accordion-collapse collapse`} data-bs-parent="#accordionExample">
              //               <div className="accordion-body py-2 px-1">    


              //                 <div className="collapse show" id="collapseExample">
              //                   {
              //                     rutina.ejercicios?.map((ejercicio, index) => {
              //                       return (
              //                           <ModalViewBodyRutinas key={index} datosUsuario={ejercicio} handleSetDatosUsuario={handleSetDatosUsuario} handleRemoveEjercicio={handleRemoveEjercicio} isEdit={isEdit} dia={indexDia} index={index}/>
              //                       )
              //                     })
                                  
              //                   }                
              //                     {/* <ModalViewBodyRutinas datosUsuario={datosUsuario} setDatosUsuario={setDatosUsuario} isEdit={isEdit}/> */}
                                  
              //                     <button className="btn btn-outline-success d-flex align-item p-2 gap-2 w-100" onClick={() => handleAddEjercicio(indexDia)}><Add/> Ejercicio</button>
              //                   {/* <div className="card card-body p-0">
              //                   </div> */}
              //                 </div>  
              //               </div>
              //               <button type="button" className="btn btn-warning mb-2" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleRemoveDia(indexDia)}>Eliminar dia {indexDia + 1 }</button>                   
              //             </motion.div>
              //           </div>
                        
              //       </motion.div>
              //     )                  
              //   })
              // }
              //   <Button msg={"Agregar Día"} functionHandle={handleAddDay}/>
              // </>
              // </AnimatePresence>
              <AnimatePresence>
              <>
                {
                  datosUsuario.rutina.length > 0 && datosUsuario.rutina.map((rutina, indexDia) => {
                    return <ModalViewBodyDias datosUsuario={datosUsuario} setDatosUsuario={setDatosUsuario} rutina={rutina} indexDia={indexDia}/>
                  })
                }
              <Button msg={"Agregar Día"} functionHandle={handleAddDay}/>
            </>
            </AnimatePresence>
              : 

              <></>
            }
          </div>
  )
}