import { useEffect, useState } from "react"
import { ModalViewBodyRutinas } from "../ModalViewBodyRutinas/ModalViewBodyRutinas"
import { Button } from "../../Atoms/Button/Button"
import { Add } from "../../Atoms/icons/Add"

export const ModalViewBody = ({datosUsuario, setDatosUsuario, datosOrRutinas = "rutinas", setDatosOrRutinas, isEdit, emptyInput}) => {

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
    console.log(divShow)
    divShow.classList.toggle("show")
  }

  const handleAddDay = () => {
    const newDay = {
      ejercicios: []
    }
    setDatosUsuario({...datosUsuario, rutina: [...datosUsuario.rutina, newDay]})
    console.log(datosUsuario.rutina)
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


 
  
  return (
    <div className="modal-body">
            <ul className="nav nav-tabs mb-2">
              <li className="nav-item" style={{cursor: "pointer"}} onClick={() => setDatosOrRutinas("datos")}> <span className={`nav-link ${datosOrRutinas === "datos" && "active"} fs-6`}>Datos</span> </li>
              <li className="nav-item" style={{cursor: "pointer"}} onClick={() => setDatosOrRutinas("rutinas")}> <span className={`nav-link ${datosOrRutinas === "rutinas" && "active"} fs-6`}>Rutinas</span> </li>
            </ul>

            {
              datosOrRutinas === "datos" && 
                <ul className="list-group fs-6 text-start">
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">ESTADO: </span> 
                    { 
                      !isEdit ? <span>{datosUsuario.estado ? "Activo" : "Inactivo"}</span> : <div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"  checked={datosUsuario.estado} onClick={() => setDatosUsuario({...datosUsuario, estado: !datosUsuario.estado})}/></div>
                    }                    
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">EDAD: </span> 
                    { 
                      !isEdit ? <span>{datosUsuario.edad}</span> : <input type="number" className="form-control py-1 py-md-2" value={datosUsuario.edad} onChange={(e) => setDatosUsuario({...datosUsuario, edad: e.target.value})}/>
                    }                    
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">DNI: </span> 
                    { 
                      !isEdit ? <span>{datosUsuario.dni}</span> : <input type="number" className={emptyInput(datosUsuario.dni)} value={datosUsuario.dni} onChange={(e) => setDatosUsuario({...datosUsuario, dni: e.target.value})}/>
                    }                    
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">EXPERIENCIA: </span> 
                    { 
                      !isEdit ? <span>{datosUsuario.experiencia}</span> : <input type="text" className="form-control py-1 py-md-2" value={datosUsuario.experiencia} onChange={(e) => setDatosUsuario({...datosUsuario, experiencia: e.target.value})}/>
                    }                    
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">LESION: </span> 
                    { 
                      !isEdit ? <span>{datosUsuario.lesion}</span> : <input type="text" className="form-control py-1 py-md-2" value={datosUsuario.lesion} onChange={(e) => setDatosUsuario({...datosUsuario, lesion: e.target.value})}/>
                    }                    
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">PATOLOGIA: </span> 
                    { 
                      !isEdit ? <span>{datosUsuario.patologia}</span> : <input type="text" className="form-control py-1 py-md-2" value={datosUsuario.patologia} onChange={(e) => setDatosUsuario({...datosUsuario, patologia: e.target.value})}/>
                    }                    
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">OBJETIVO: </span> 
                    { 
                      !isEdit ? <span>{datosUsuario.objetivo}</span> : <input type="text" className="form-control py-1 py-md-2" value={datosUsuario.objetivo} onChange={(e) => setDatosUsuario({...datosUsuario, objetivo: e.target.value})}/>
                    }                    
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">DIAS SEMANALES: </span> 
                    { 
                      !isEdit ? <span>{datosUsuario.diasSemanales}</span> : <input type="text" className="form-control py-1 py-md-2" value={datosUsuario.diasSemanales} onChange={(e) => setDatosUsuario({...datosUsuario, diasSemanales: e.target.value})}/>
                    }                    
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">DEPORTE: </span> 
                    { 
                      !isEdit ? <span className="py-md-2">{datosUsuario.deporte}</span> : <input type="text" className="form-control py-1 py-md-2" value={datosUsuario.deporte} onChange={(e) => setDatosUsuario({...datosUsuario, deporte: e.target.value})}/>
                    }                    
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">PASSWORD: </span> 
                    <span>{"******"}</span>
                                        
                  </li>
                </ul>
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
              </>

              : 

              <></>
            }
            <Button msg={"Agregar Día"} functionHandle={handleAddDay}/>
          </div>
  )
}