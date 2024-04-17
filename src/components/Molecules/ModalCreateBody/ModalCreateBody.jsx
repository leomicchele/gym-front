import { useContext } from "react";
import { LoginContext } from "../../../context/LoginContext";
import { ModalInputAlumno } from "../ModalInputAlumno/ModalInputAlumno";
import { Loader } from "../../Atoms/Loader/Loader";
import { Alert } from "../../Atoms/Alert/Alert";
import "./ModalCreateBody.css"

export const ModalCreateBody = ({datosUsuario, setDatosUsuario}) => {
  // const {state, dispatch} = useContext(LoginContext)

  return (
          <div className="modal-body">
           <ModalInputAlumno datosUsuario={datosUsuario} setDatosUsuario={setDatosUsuario}/>            
          </div>
         
  );
}