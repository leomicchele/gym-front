import { useContext } from "react";
import { LoginContext } from "../../../context/LoginContext";
import { ModalInputAlumno } from "../ModalInputAlumno/ModalInputAlumno";
import { Loader } from "../../Atoms/Loader/Loader";
import { Alert } from "../../Atoms/Alert/Alert";
import "./ModalCreateBody.css"
import { ModalInputProfesor } from "../ModalInputProfesor/ModalInputProfesor";

export const ModalCreateBody = ({datosUsuario, setDatosUsuario, tipoUsuario}) => {
  // const {state, dispatch} = useContext(LoginContext)

  const handleTipoUsuario = () => {
    if (tipoUsuario === "alumno") {
      return <ModalInputAlumno datosUsuario={datosUsuario} setDatosUsuario={setDatosUsuario}/>
    } else {
      return <ModalInputProfesor datosUsuario={datosUsuario} setDatosUsuario={setDatosUsuario}/>
    }
  }

  return (
          <div className="modal-body">
            {handleTipoUsuario()}          
          </div>
         
  );
}