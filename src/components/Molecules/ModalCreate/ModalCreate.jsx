import { useContext } from "react";
import { LoginContext } from "../../../context/LoginContext";
import { ModalInputAlumno } from "../ModalInputAlumno/ModalInputAlumno";
import { Loader } from "../../Atoms/Loader/Loader";
import { Alert } from "../../Atoms/Alert/Alert";
import "./ModalCreate.css"

export const ModalCreate = ({datosUsuario, setDatosUsuario, handleFetch, handleModalCreateOpen}) => {
  const {state, dispatch} = useContext(LoginContext)

  return (
    <div className="modal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Nuevo Alumno</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleModalCreateOpen(false)}></button>
          </div>
          <div className="modal-body">
           <ModalInputAlumno datosUsuario={datosUsuario} setDatosUsuario={setDatosUsuario}/>            
          </div>
          <div className="modal-footer flex-nowrap">
            {
              state.error &&  <Alert type={"danger"} msg="Error al Guardar"/>
            }
            {
              state.formInputSuccess && <Alert type={"success"} msg="Alumno Creado"/>
            }
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleModalCreateOpen(false)}>Close</button>
              <button type="button" disabled={state.loading} className="btn btn-primary" onClick={handleFetch}>
                {state.loading ? <Loader/> : "Guardar" }  
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}