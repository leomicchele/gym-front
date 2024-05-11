import { useState } from "react";
import { CheckOkEdit } from "../../Atoms/icons/CheckOkEdit";
import { Edit } from "../../Atoms/icons/Edit";


export const ModalViewBodyDatosAlumno = ({
  datosUsuario,
  setDatosUsuario, 
  // isEdit, 
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
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">Profesor: </span> 
                    <span>{datosUsuario.profesor?.nombre} {datosUsuario.profesor?.apellido}</span>
                                        
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">Fecha de creacion: </span> 
                    {
                      !datosUsuario.fechaCreacion ? <span> </span> : <span>{new Date(datosUsuario?.fechaCreacion).getDate()} / {new Date(datosUsuario?.fechaCreacion).getMonth() + 1} / {new Date(datosUsuario?.fechaCreacion).getFullYear()}</span>
                    }
                    
                                        
                  </li>
                </ul>
           
  )
}