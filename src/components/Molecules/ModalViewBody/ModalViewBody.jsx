import { useEffect, useState } from "react"
import { ModalViewBodyRutinas } from "../ModalViewBodyRutinas/ModalViewBodyRutinas"
import { Button } from "../../Atoms/Button/Button"
import { Add } from "../../Atoms/icons/Add"
import { ModalViewBodyDatosAlumno } from "../ModalViewBodyDatosAlumno/ModalViewBodyDatosAlumno"
import { ModalViewBodyDatosProfesor } from "../ModalViewBodyDatosProfesor/ModalViewBodyDatosProfesor"

export const ModalViewBody = ({datosUsuario, setDatosUsuario, datosOrRutinas = "rutinas", setDatosOrRutinas, isEdit, emptyInput, tipoUsuario}) => {

  const [rutinaState, setRutinaState] = useState([])

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
          <ModalViewBodyDatosAlumno datosUsuario={datosUsuario} setDatosUsuario={setDatosUsuario} isEdit={isEdit} emptyInput={emptyInput}/>
        </>
      )
    } else {
      return (
        <>
          <ModalViewBodyDatosProfesor datosUsuario={datosUsuario} setDatosUsuario={setDatosUsuario} isEdit={isEdit} emptyInput={emptyInput}/>
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
              <>
              {
                datosUsuario.rutina.length > 0 && datosUsuario.rutina.map((rutina, indexDia) => {
                  return (
                    <div className="accordion mb-2" id="accordionExample">
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button onClick={(e) => handleShowDias(e)} className="accordion-button" type="button" data-bs-toggle="collapse" id={`${indexDia+1}`} data-bs-target={`#collapse${indexDia+1}`} aria-expanded="true" aria-controls="collapseOne">
                              Día {indexDia + 1}
                            </button>
                          </h2>
                          <div id={`collapse${indexDia+1}`}  className={`accordion-collapse collapse`} data-bs-parent="#accordionExample">
                            <div className="accordion-body py-2 px-1">    


                              <div class="collapse show" id="collapseExample">
                                {
                                  rutina.ejercicios?.map((ejercicio, index) => {
                                    return (
                                      <ModalViewBodyRutinas datosUsuario={ejercicio} handleSetDatosUsuario={handleSetDatosUsuario} handleRemoveEjercicio={handleRemoveEjercicio} isEdit={isEdit} dia={indexDia} index={index}/>
                                    )
                                  })
                                      
                                }
                                  {/* <ModalViewBodyRutinas datosUsuario={datosUsuario} setDatosUsuario={setDatosUsuario} isEdit={isEdit}/> */}
                                  
                                  <button className="btn btn-outline-success d-flex align-item p-2 gap-2 w-100" onClick={() => handleAddEjercicio(indexDia)}><Add/> Ejercicio</button>
                                {/* <div class="card card-body p-0">
                                </div> */}
                              </div>  
                            </div>
                          </div>
                        </div>
                        
                    </div>
                  )                  
                })
              }
                <Button msg={"Agregar Día"} functionHandle={handleAddDay}/>
              </>

              : 

              <></>
            }
          </div>
  )
}