import { useState } from "react";
import { CheckOkEdit } from "../../Atoms/icons/CheckOkEdit";
import { Edit } from "../../Atoms/icons/Edit";


export const FichaAlumno = ({
  datosUsuario,
  setDatosUsuario
}) => {

  const [isEdit, setIsEdit] = useState(false);
  
  return (
    <>
    
                <ul className="list-group fs-6 text-start">
                  <li className="list-group-item d-flex align-items-center gap-2 justify-content-between">
                    <div className="d-flex align-items-center gap-2 ">
                      <span className="fw-semibold">ESTADO: </span> 
                          <span className={datosUsuario.estado ? "text-success" : "text-warning-emphasis"}>
                            {datosUsuario.estado ? "Activo" : "Inactivo"}
                          </span> 
                      {/* { 
                        !isEdit ? 
                          <span className={datosUsuario.estado ? "text-success" : "text-warning-emphasis"}>
                            {datosUsuario.estado ? "Activo" : "Inactivo"}
                          </span> 
                        : 
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"  checked={datosUsuario.estado} onClick={() => setDatosUsuario({...datosUsuario, estado: !datosUsuario.estado})}/>
                          </div>
                      } */}
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
                      !isEdit ? <span className=" text-info-emphasis">{datosUsuario.edad}</span> : <input type="number" className="form-control py-1 py-md-2" value={datosUsuario.edad} onChange={(e) => setDatosUsuario({...datosUsuario, edad: e.target.value})}/>
                    }                    
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">PESO: </span> 
                    { 
                      !isEdit ? <span className=" text-info-emphasis">{datosUsuario.peso ? datosUsuario.peso : "0"}</span> : <input type="number" className="form-control py-1 py-md-2" value={datosUsuario.peso} onChange={(e) => setDatosUsuario({...datosUsuario, peso: e.target.value})}/>
                    }          
                    <span className="fw-normal fst-italic"> Kg </span> 

                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">ALTURA: </span> 
                    { 
                      !isEdit ? <span className=" text-info-emphasis">{datosUsuario.altura ? datosUsuario.altura : "0"}</span> : <input type="number" className="form-control py-1 py-md-2" value={datosUsuario.altura} onChange={(e) => setDatosUsuario({...datosUsuario, altura: e.target.value})}/>
                    }     
                    <span className="fw-normal fst-italic">Cm </span> 

                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">Grasa Corp: </span> 
                    { 
                      !isEdit ? <span className=" text-info-emphasis">{datosUsuario.grasaCorporal ? datosUsuario.grasaCorporal : "0"}</span> : <input type="number" className="form-control py-1 py-md-2" value={datosUsuario.grasaCorporal} onChange={(e) => setDatosUsuario({...datosUsuario, grasaCorporal: e.target.value})}/>
                    }       
                    <span className="fw-normal fst-italic"> % </span> 

                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">DNI: </span> 
                    <span className=" text-info-emphasis">{datosUsuario.dni}</span>
                    {/* { 
                      !isEdit ? <span>{datosUsuario.dni}</span> : <input type="number" className={emptyInput(datosUsuario.dni)} value={datosUsuario.dni} onChange={(e) => setDatosUsuario({...datosUsuario, dni: e.target.value})}/>
                    }                     */}
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">EXPERIENCIA: </span> 
                    <span className=" text-info-emphasis">{datosUsuario.experiencia}</span>
                    {/* { 
                      !isEdit ? <span>{datosUsuario.experiencia}</span> : <input type="text" className="form-control py-1 py-md-2" value={datosUsuario.experiencia} onChange={(e) => setDatosUsuario({...datosUsuario, experiencia: e.target.value})}/>
                    }                     */}
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">LESIÓN: </span> 
                    <span className=" text-info-emphasis">{datosUsuario.lesion}</span>
                    {/* { 
                      !isEdit ? <span>{datosUsuario.lesion}</span> : <input type="text" className="form-control py-1 py-md-2" value={datosUsuario.lesion} onChange={(e) => setDatosUsuario({...datosUsuario, lesion: e.target.value})}/>
                    }                     */}
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">PATOLOGÍA: </span> 
                    <span className=" text-info-emphasis">{datosUsuario.patologia}</span>
                    {/* { 
                      !isEdit ? <span>{datosUsuario.patologia}</span> : <input type="text" className="form-control py-1 py-md-2" value={datosUsuario.patologia} onChange={(e) => setDatosUsuario({...datosUsuario, patologia: e.target.value})}/>
                    }                     */}
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">OBJETIVO: </span> 
                    <span className=" text-info-emphasis">{datosUsuario.objetivo}</span>
                    {/* { 
                      !isEdit ? <span>{datosUsuario.objetivo}</span> : <input type="text" className="form-control py-1 py-md-2" value={datosUsuario.objetivo} onChange={(e) => setDatosUsuario({...datosUsuario, objetivo: e.target.value})}/>
                    }                     */}
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">DÍAS SEMANALES: </span> 
                    <span className=" text-info-emphasis">{datosUsuario.diasSemanales}</span>
                    {/* { 
                      !isEdit ? <span>{datosUsuario.diasSemanales}</span> : <input type="text" className="form-control py-1 py-md-2" value={datosUsuario.diasSemanales} onChange={(e) => setDatosUsuario({...datosUsuario, diasSemanales: e.target.value})}/>
                    }                     */}
                  </li>
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">DEPORTE: </span> 
                    <span className="py-md-2  text-info-emphasis">{datosUsuario.deporte}</span>
                    {/* { 
                      !isEdit ? <span className="py-md-2">{datosUsuario.deporte}</span> : <input type="text" className="form-control py-1 py-md-2" value={datosUsuario.deporte} onChange={(e) => setDatosUsuario({...datosUsuario, deporte: e.target.value})}/>
                    }                     */}
                  </li>
                  {/* <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">PASSWORD: </span> 
                    <span>{"******"}</span>
                                        
                  </li> */}
                  <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">PROFESOR: </span> 
                    <span className=" text-info-emphasis">{datosUsuario.nombreProfesor}</span>
                                        
                  </li>
                </ul>
                </>
           
  )
}