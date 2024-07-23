import { useContext, useEffect, useState } from "react"
import { LoginContext } from "../../../context/LoginContext"

export const ModalInputAlumno = ({datosUsuario, setDatosUsuario}) => {

    const {state, dispatch} = useContext(LoginContext)
    const [fechaNacimiento, setFechaNacimiento] = useState({
        dia: "",
        mes: "",
        ano: ""
    })

    const emptyInput = (inputValue) => {
        if (inputValue === "" && state.formInputError) {
           return  "form-control text-primary-emphasis is-invalid"
        } else {
            return "form-control text-primary-emphasis"
        }
    }

    const handleFechaNacimiento = (e) => {
        setFechaNacimiento({...fechaNacimiento, [e.target.name]: e.target.value.toString()})
    }

    useEffect(() => {
        let dia = fechaNacimiento.dia === "" ? "00" : fechaNacimiento.dia 
        let mes = fechaNacimiento.mes === "" ? "00" : fechaNacimiento.mes
        let ano = fechaNacimiento.ano === "" ? "0000" : fechaNacimiento.ano
        if (dia.length === 1) dia = `0${dia}`
        if (mes.length === 1) mes = `0${mes}`

        setDatosUsuario({...datosUsuario, edad: `${dia}/${mes}/${ano}`})
    }, [fechaNacimiento])

  return (
    <>
    <div className="d-flex flex-wrap justify-content-center gap-2 mb-2">
        <div className="form-floating flex-grow-1">
            <input autoComplete="off" type="text" disabled={state.loading} className={emptyInput(datosUsuario.nombre)} placeholder="" value={datosUsuario.nombre} onChange={(e) => setDatosUsuario({...datosUsuario, nombre: e.target.value})} id="nombre" name="nombre"/>
            <label htmlFor="nombre">Nombre</label>
        </div>
        <div className="form-floating flex-grow-1">
            <input autoComplete="off" type="text" disabled={state.loading} className={emptyInput(datosUsuario.apellido)} placeholder="" value={datosUsuario.apellido} onChange={(e) => setDatosUsuario({...datosUsuario, apellido: e.target.value})} id="apellido" name="apellido"/>
            <label htmlFor="apellido">Apellido</label>
        </div>
    </div>
    <div className="d-flex flex-wrap justify-content-center gap-2 mb-2">
        {/* <div className="form-floating flex-grow-1">
            <input autoComplete="off" type="number" disabled={state.loading} className="form-control text-primary-emphasis" placeholder="" value={datosUsuario.edad} onChange={(e) => setDatosUsuario({...datosUsuario, edad: e.target.value})} id="edad" name="edad"/>
            <label htmlFor="edad">Fecha Nac.</label>
        </div>  */}
        <div className="border rounded p-2 gap-1 d-flex flex-column">
        <label htmlFor="edad">Fecha Nac.</label>
            <div className="d-flex gap-1 align-items-center justify-content-between">
                <input  type="number" value={fechaNacimiento.dia} className="form-control px-2" placeholder="Dia" aria-label="Dia" aria-describedby="basic-addon1" name="dia" onChange={(e) => handleFechaNacimiento(e)}/>                
                /
                <input  type="number" value={fechaNacimiento.mes} className="form-control px-2" placeholder="Mes" aria-label="Mes" aria-describedby="basic-addon1" name="mes" onChange={(e) => handleFechaNacimiento(e)}/>
                /
                <input  type="number" value={fechaNacimiento.ano}  className="form-control px-2" placeholder="Año" aria-label="Ano" aria-describedby="basic-addon1" name="ano" onChange={(e) => handleFechaNacimiento(e)}/>
            </div>
                
            </div>
        {/* <div className="form-floating flex-grow-1">
            <input autoComplete="off" type="text" disabled={state.loading} className="form-control text-primary-emphasis" placeholder="" value={datosUsuario.objetivo} onChange={(e) => setDatosUsuario({...datosUsuario, objetivo: e.target.value})} id="objetivo" name="objetivo"/>
            <label htmlFor="objetivo">¿Objetivo?</label>
        </div> */}
    </div>
    {/* <div className="d-flex flex-wrap justify-content-center gap-2 mb-2">
        <div className="form-floating flex-grow-1">
            <input autoComplete="off" type="text" disabled={state.loading} className="form-control text-primary-emphasis" placeholder="" value={datosUsuario.lesion} onChange={(e) => setDatosUsuario({...datosUsuario, lesion: e.target.value})} id="lesion" name="lesion"/>
            <label htmlFor="lesion">¿Alguna lesion?</label>
        </div>
        <div className="form-floating flex-grow-1">
            <input autoComplete="off" type="text" disabled={state.loading} className="form-control text-primary-emphasis" placeholder="" value={datosUsuario.patologia} onChange={(e) => setDatosUsuario({...datosUsuario, patologia: e.target.value})} id="patologia" name="patologia"/>
            <label htmlFor="patologia">¿Alguna Patología?</label>
        </div>
    </div>
    <div className="d-flex flex-wrap justify-content-center gap-2 mb-2">
        <div className="form-floating flex-grow-1">
            <input autoComplete="off" type="text" disabled={state.loading} className="form-control text-primary-emphasis" placeholder="" value={datosUsuario.diasSemanales} onChange={(e) => setDatosUsuario({...datosUsuario, diasSemanales: e.target.value})} id="diasSemanales" name="diasSemanales"/>
            <label htmlFor="diasSemanales">¿Cuantos dias semanales?</label>
        </div>
        <div className="form-floating flex-grow-1">
            <input autoComplete="off" type="text" disabled={state.loading} className="form-control text-primary-emphasis" placeholder="" value={datosUsuario.deporte} onChange={(e) => setDatosUsuario({...datosUsuario, deporte: e.target.value})} id="deporte" name="deporte"/>
            <label htmlFor="deporte">¿Practica algun deporte?</label>
        </div>
    </div> */}
    <div className="d-flex flex-wrap justify-content-center gap-2 mb-2">
        <div className="form-floating flex-grow-1">
            <input autoComplete="off" type="text" disabled={state.loading} className={emptyInput(datosUsuario.dni)} placeholder="" value={datosUsuario.dni} onChange={(e) => setDatosUsuario({...datosUsuario, dni: e.target.value})} id="dni" name="dni"/>
            <label htmlFor="dni">DNI</label>
        </div>
        <div className="form-floating flex-grow-1">
            <input type="password" disabled={state.loading} className={emptyInput(datosUsuario.password)} placeholder="" value={datosUsuario.password} onChange={(e) => setDatosUsuario({...datosUsuario, password: e.target.value})} id="password" name="password"/>
            <label htmlFor="password">Password</label>
        </div>
    </div>
    {/* <div className="form-floating flex-grow-1">
            <input autoComplete="off" type="text" disabled={state.loading} className="form-control text-primary-emphasis" placeholder="" value={datosUsuario.experiencia} onChange={(e) => setDatosUsuario({...datosUsuario, experiencia: e.target.value})} id="experiencia" name="experiencia"/>
            <label htmlFor="experiencia">¿Que experiencia en el gym?</label>
    </div> */}
    </>
  )
}