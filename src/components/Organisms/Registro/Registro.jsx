import { useContext, useState } from "react";
import "../Login/Login.css"
import { LoginContext } from "../../../context/LoginContext";
import postFetchLogin from "../../helpers/fetch";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../Atoms/Loader/Loader.tsx";
import { motion } from "framer-motion"

export const Registro = () => {

  const navigate = useNavigate()

  const {state, dispatch} = useContext(LoginContext)
  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
    fullName: ""
  })  

  const [errorFetch, setErrorFetch] = useState({
    error: false,
    errorMsg: ""
  })  

  const handlerSubmit = async(e) => {    
    // Validar que las contraseñas coincidan
    if (inputs.password !== inputs.confirmPassword) {
      setErrorFetch({error: true, errorMsg: "Las contraseñas no coinciden"})
      return
    }

    // Validar que todos los campos estén completos
    if (!inputs.userName || !inputs.password || !inputs.email || !inputs.fullName) {
      setErrorFetch({error: true, errorMsg: "Todos los campos son obligatorios"})
      return
    }
    
    // Aquí iría la lógica para registrar al usuario
    dispatch({type: "LOADING"})
    try {
      // Simular una petición de registro (esto debería cambiarse por la petición real)
      // const data = await postFetchRegister(inputs);  
      const data = { success: true }; // Simulación de respuesta exitosa
      
      if (data.success) {
        setErrorFetch({error: false, errorMsg: ""})
        // Redirigir al login después del registro exitoso
        navigate("/login")
      } else {
        dispatch({type: "ERROR"})
        setErrorFetch({error: true, errorMsg: "Error al registrar usuario"})
      }
    } catch (error) {
      dispatch({type: "ERROR"})
      setErrorFetch({error: true, errorMsg: "Error en el servidor"})
    }
  }

  return (
    <div className="align d-flex flex-column">
      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="grid">
        <div>
          <img src="/imagenes/kairossLogo.svg" alt="" style={{width: "250px"}}/>
        </div>
        <form className="form login">
          <div className="form__field">
            <label htmlFor="register_fullname">
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
              <span className="hidden">Nombre Completo</span>
            </label>
            <input
              autoComplete="on"
              id="register_fullname"
              type="text"
              className="form__input"
              placeholder="Nombre Completo"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
              required
            />
          </div>

          <div className="form__field">
            <label htmlFor="register_username">
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
              <span className="hidden">Usuario</span>
            </label>
            <input
              autoComplete="on"
              id="register_username"
              type="text"
              className="form__input"
              placeholder="Usuario"
              value={inputs.userName}
              onChange={(e) =>
                setInputs({ ...inputs, userName: e.target.value })
              }
              required
            />
          </div>

          <div className="form__field">
            <label htmlFor="register_email">
              <svg 
                className="icon"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 512 512"
              >
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
              </svg>
              <span className="hidden">Email</span>
            </label>
            <input
              id="register_email"
              type="email"
              className="form__input"
              placeholder="Email"
              value={inputs.email}
              onChange={(e) =>
                setInputs({ ...inputs, email: e.target.value })
              }
              required
            />
          </div>

          <div className="form__field">
            <label htmlFor="register_password">
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
              </svg>
              <span className="hidden">Contraseña</span>
            </label>
            <input
              id="register_password"
              type="password"
              className="form__input"
              placeholder="Contraseña"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              required
            />
          </div>

          <div className="form__field">
            <label htmlFor="register_confirm_password">
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
              </svg>
              <span className="hidden">Confirmar Contraseña</span>
            </label>
            <input
              id="register_confirm_password"
              type="password"
              className="form__input"
              placeholder="Confirmar Contraseña"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          <div className="form__field">
            <button
              type="button"
              className="btn btn-warning"
              onClick={handlerSubmit}
              disabled={state.loading}
            >
              {state.loading ? <Loader /> : "Registrarse"}
            </button>
          </div>
          {
            (errorFetch.error) &&
            <div className="alert alert-danger" role="alert">                  
              { errorFetch.errorMsg }
            </div>
          }
        </form>
      </motion.div>
      <div className="text-secondary fs-6 mt-3 contacto-text fw-medium text-break text-wrap fst-italic ">
        ¿Ya tienes una cuenta? <a href="/login" className="text-warning">Iniciar sesión</a> | Si eres dueño de un gimnasio o trabajas como entrenador personal, <a href="/formulario" className="text-warning">contáctanos</a>.
      </div>
    </div>
  );
} 