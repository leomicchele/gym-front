import { useContext } from "react"
import { LoginContext } from "../../../context/LoginContext"

export const ModalInputProfesor = ({datosUsuario, setDatosUsuario}) => {

    const {state, dispatch} = useContext(LoginContext)

    const emptyInput = (inputValue) => {
        if (inputValue === "" && state.formInputError) {
           return  "form-control text-primary-emphasis is-invalid"
        } else {
            return "form-control text-primary-emphasis"
        }
    }

  return (
    <>
    <div className="d-flex flex-wrap justify-content-center gap-2 mb-2">
        <div className="form-floating flex-grow-1">
            <input autocomplete="off" type="text" disabled={state.loading} className={emptyInput(datosUsuario.nombre)} placeholder="" value={datosUsuario.nombre} onChange={(e) => setDatosUsuario({...datosUsuario, nombre: e.target.value})} id="nombre" name="nombre"/>
            <label htmlFor="nombre">Nombre</label>
        </div>
        <div className="form-floating flex-grow-1">
            <input autocomplete="off" type="text" disabled={state.loading} className={emptyInput(datosUsuario.apellido)} placeholder="" value={datosUsuario.apellido} onChange={(e) => setDatosUsuario({...datosUsuario, apellido: e.target.value})} id="apellido" name="apellido"/>
            <label htmlFor="apellido">Apellido</label>
        </div>
    </div>
    <div className="d-flex flex-wrap justify-content-center gap-2 mb-2">
        <div className="form-floating flex-grow-1">
            <input autocomplete="off" type="text" disabled={state.loading} className={emptyInput(datosUsuario.dni)} placeholder="" value={datosUsuario.dni} onChange={(e) => setDatosUsuario({...datosUsuario, dni: e.target.value})} id="dni" name="dni"/>
            <label htmlFor="dni">DNI</label>
        </div>
        <div className="form-floating flex-grow-1">
            <input type="password" disabled={state.loading} className={emptyInput(datosUsuario.password)} placeholder="" value={datosUsuario.password} onChange={(e) => setDatosUsuario({...datosUsuario, password: e.target.value})} id="password" name="password"/>
            <label htmlFor="password">Password</label>
        </div>
    </div>
    <div className="d-flex flex-wrap justify-content-center gap-2 mb-2">
        <div className="form-floating flex-grow-1">
            <input autocomplete="off" type="email" disabled={state.loading} className={emptyInput(datosUsuario.email)} placeholder="" value={datosUsuario.email} onChange={(e) => setDatosUsuario({...datosUsuario, email: e.target.value})} id="email" name="email"/>
            <label htmlFor="password">Email</label>
        </div>
    </div>
    </>
  )
}