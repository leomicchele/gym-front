import { useState } from "react";
import { CheckOkEdit } from "../../Atoms/icons/CheckOkEdit"
import { Edit } from "../../Atoms/icons/Edit"

export const ModalViewBodyDatosProfesor = ({
  datosUsuario,
   setDatosUsuario,
  //  isEdit,
   emptyInput}) => {

    const [isEdit, setIsEdit] = useState(false);
  
  return (    
                <ul className="list-group fs-6 text-start">
                  <li className="list-group-item d-flex align-items-center gap-2 justify-content-between">
                    <div className="d-flex align-items-center gap-2 ">
                      <span className="fw-semibold">ESTADO: </span> 
                      { 
                        !isEdit ? <span className={datosUsuario.estado ? "text-success" : "text-warning-emphasis"}>{datosUsuario.estado ? "Activo" : "Inactivo"}</span> : <div className="form-check form-switch"><input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"  checked={datosUsuario.estado} onClick={() => setDatosUsuario({...datosUsuario, estado: !datosUsuario.estado})}/></div>
                      }     
                    </div>
                    <button type="button" className="btn btn-link px-1 d-flex aling-item-center"  onClick={() => setIsEdit(!isEdit)}>
                    {
                      isEdit ? <CheckOkEdit /> : <Edit />
                    }                      
                  </button>  
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">NOMBRE: </span> 
                    { 
                      !isEdit ? <span>{datosUsuario.nombre}</span> : <input type="text" className={emptyInput(datosUsuario.nombre)} value={datosUsuario.nombre} onChange={(e) => setDatosUsuario({...datosUsuario, nombre: e.target.value})}/>
                    }                    
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">APELLIDO: </span> 
                    { 
                      !isEdit ? <span>{datosUsuario.apellido}</span> : <input type="text" className={emptyInput(datosUsuario.apellido)} value={datosUsuario.apellido} onChange={(e) => setDatosUsuario({...datosUsuario, apellido: e.target.value})}/>
                    }                    
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">DNI: </span> 
                    { 
                      !isEdit ? <span>{datosUsuario.dni}</span> : <input type="number" className={emptyInput(datosUsuario.dni)} value={datosUsuario.dni} onChange={(e) => setDatosUsuario({...datosUsuario, dni: e.target.value})}/>
                    }                    
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">EMAIL: </span> 
                    { 
                      !isEdit ? <span>{datosUsuario.email}</span> : <input type="email" className="form-control py-1 py-md-2" value={datosUsuario.email} onChange={(e) => setDatosUsuario({...datosUsuario, email: e.target.value})}/>
                    }                    
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">PASSWORD: </span> 
                    <span>{"******"}</span>
                                        
                  </li>
                </ul>
           
  )
}