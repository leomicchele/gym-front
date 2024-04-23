import { useContext, useState } from "react";
import { LoginContext } from "../../../context/LoginContext";
import { Loader } from "../../Atoms/Loader/Loader";
import { Alert } from "../../Atoms/Alert/Alert";
import "./ModalView.css"

export const ModalView = ({datosUsuario, setDatosUsuario, handleModalAlumnoOpen, handleUpdateAlumno}) => {
  const {state, dispatch} = useContext(LoginContext)

  const [datosOrRutinas, setDatosOrRutinas] = useState("datos")
  const [isEdit, setIsEdit] = useState(false)

  const handleIsEdit = () => {
    setIsEdit(!isEdit)
  }

  const emptyInput = (inputValue) => {
    if (inputValue === "" && state.formInputError) {
       return  "form-control py-1 py-md-2 is-invalid"
    } else {
        return "form-control py-1 py-md-2"
    }
}

  return (
    <div className="modal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{datosUsuario.nombre} {datosUsuario.apellido}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleModalAlumnoOpen(false)}></button>
          </div>
          <div className="modal-body">
            <ul className="nav nav-tabs mb-2">
              <li className="nav-item" style={{cursor: "pointer"}}> <span className="nav-link active fs-6">Datos</span> </li>
              <li className="nav-item" style={{cursor: "pointer"}}> <span className="nav-link fs-6">Rutinas</span> </li>
            </ul>

            {
              datosOrRutinas === "datos" && 
                <ul className="list-group fs-6 text-start">
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">ESTADO: </span> 
                    { 
                      !isEdit ? <span>{datosUsuario.estado ? "Activo" : "Inactivo"}</span> : <div className="form-check form-switch"><input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"  checked={datosUsuario.estado} onClick={() => setDatosUsuario({...datosUsuario, estado: !datosUsuario.estado})}/></div>
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
              datosOrRutinas === "rutinas" && 
              <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Accordion Item #1
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                    Accordion Item #2
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Accordion Item #3
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
                </div>
              </div>
            </div>
            }
          </div>
          <div className="modal-footer flex-nowrap">
            {
              state.error &&  <Alert type={"danger"} msg="Error actualizar"/>
            }
            {
              state.formInputSuccess && <Alert type={"success"} msg="Actualizado"/>
            }
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleModalAlumnoOpen(false)}>Close</button>
              {
                !isEdit ?
                <button type="button" disabled={state.loading} className="btn btn-outline-success" onClick={() => handleIsEdit()}>
                  Editar 
                </button>
                :
                <button type="button" disabled={state.loading} className="btn btn-primary" onClick={() => handleUpdateAlumno()}>
                  {state.loading ? <Loader/> : "Actualizar" }  
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}