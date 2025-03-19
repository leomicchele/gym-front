import { useContext, useState } from "react";
import "../Login/Login.css"
// import "./Formulario.css"
import { LoginContext } from "../../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../Atoms/Loader/Loader.tsx";
import { motion } from "framer-motion"

export const Formulario = () => {
  const navigate = useNavigate()
  const {state, dispatch} = useContext(LoginContext)
  
  const [inputs, setInputs] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipoGimnasio: "",
    mensaje: ""
  })  

  const [errorFetch, setErrorFetch] = useState({
    error: false,
    errorMsg: "",
    success: false
  })  

  const handlerSubmit = async(e) => {    
    // Validar que todos los campos obligatorios estén completos
    if (!inputs.nombre || !inputs.email || !inputs.telefono || !inputs.tipoGimnasio) {
      setErrorFetch({error: true, errorMsg: "Por favor completa todos los campos obligatorios", success: false})
      return
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(inputs.email)) {
      setErrorFetch({error: true, errorMsg: "Por favor ingresa un email válido", success: false})
      return
    }
    
    // Validar formato de teléfono (números y algunos caracteres especiales)
    const telefonoRegex = /^[0-9+\-\s()]{8,15}$/
    if (!telefonoRegex.test(inputs.telefono)) {
      setErrorFetch({error: true, errorMsg: "Por favor ingresa un número de teléfono válido", success: false})
      return
    }
    
    // Aquí iría la lógica para enviar el formulario
    dispatch({type: "LOADING"})
    try {
      // Simular una petición de envío (esto debería cambiarse por la petición real)
      setTimeout(() => {
        dispatch({type: "SUCCESS"})
        setErrorFetch({error: false, errorMsg: "", success: true})
        
        // Resetear el formulario después de 3 segundos
        setTimeout(() => {
          setInputs({
            nombre: "",
            email: "",
            telefono: "",
            tipoGimnasio: "",
            mensaje: ""
          })
          setErrorFetch({error: false, errorMsg: "", success: false})
        }, 3000)
      }, 1500)
    } catch (error) {
      dispatch({type: "ERROR"})
      setErrorFetch({error: true, errorMsg: "Error al enviar el formulario", success: false})
    }
  }

  return (
    <div className="container-formulario align d-flex flex-column">
      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="grid">
        <div>
          <img src="/imagenes/kairossLogo.svg" alt="" style={{width: "250px"}}/>
        </div>
        <form className="form login">
          <h2 className="mb-1 text-center">Formulario de Contratación</h2>
          
          <p className="text-center m-0">Completa el siguiente formulario y analizaremos tu solicitud. Nos contactaremos contigo a la brevedad.</p>
          
          <div className="form__field">
            <label htmlFor="formulario_nombre">
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
              <span className="hidden">Nombre</span>
            </label>
            <input
              autoComplete="on"
              id="formulario_nombre"
              type="text"
              className="form__input"
              placeholder="Nombre completo *"
              value={inputs.nombre}
              onChange={(e) =>
                setInputs({ ...inputs, nombre: e.target.value })
              }
              required
            />
          </div>

          <div className="form__field">
            <label htmlFor="formulario_email">
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
              autoComplete="on"
              id="formulario_email"
              type="email"
              className="form__input"
              placeholder="Email *"
              value={inputs.email}
              onChange={(e) =>
                setInputs({ ...inputs, email: e.target.value })
              }
              required
            />
          </div>

          <div className="form__field">
            <label htmlFor="formulario_telefono">
              <svg 
                className="icon"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 512 512"
              >
                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
              </svg>
              <span className="hidden">Teléfono</span>
            </label>
            <input
              autoComplete="on"
              id="formulario_telefono"
              type="tel"
              className="form__input"
              placeholder="Teléfono *"
              value={inputs.telefono}
              onChange={(e) =>
                setInputs({ ...inputs, telefono: e.target.value })
              }
              required
            />
          </div>

          <div className="form__field">
            <label htmlFor="formulario_tipo">
              <svg 
                className="icon"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 640 512"
              >
                <path d="M336 0c-26.5 0-48 21.5-48 48v92.1l71.4 118.4c2.5-1.6 5.2-3 8-4.1L416 203.8V120c0-13.3 10.7-24 24-24s24 10.7 24 24v83.8l48.6 50.5c10.3 1.2 20.2 5.3 28.8 12.1L637.5 256c14.1 9.4 17.8 28.4 8.4 42.5s-28.4 17.8-42.5 8.4L536 265.8V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V265.8L325.1 214.2c-31.1-7.3-64.1 9.7-74.4 40.1L238.4 288H209.5c-13.7 0-26.7 5.9-35.7 16.2L100.7 386.1c-14.5 16.7-39.8 18.4-56.4 3.9s-18.4-39.8-3.9-56.4l73.1-81.9c17.2-19.3 41.1-30.8 66.8-32.5l49.2-81.4V304c0 22.1 17.9 40 40 40h42.9l11.3-22.5c4.9-9.7 16.6-14.8 27.4-12.1L400 328.8V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V384H320v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V309.7l-21.5 43c-9.5 18.9-28.6 31.3-49.8 31.3H152c-30.9 0-56-25.1-56-56V238.5l2.7-4.5c7.3-12.1 20.5-19.5 34.8-19.5h32c11.5 0 22.3 4.9 29.8 13.5c18.8-6.3 39.6-.4 51.5 15.9c21.8 0 40.8 13.7 48.1 33.3V48c0-26.5-21.5-48-48-48H336zm64 48c0-8.8 7.2-16 16-16s16 7.2 16 16V80c0 8.8-7.2 16-16 16s-16-7.2-16-16V48z"/>
              </svg>
              <span className="hidden">Tipo de Gimnasio</span>
            </label>
            <select
              id="formulario_tipo"
              className="form__input"
              value={inputs.tipoGimnasio}
              onChange={(e) =>
                setInputs({ ...inputs, tipoGimnasio: e.target.value })
              }
              required
            >
              <option value="" disabled>Selecciona un tipo de gimnasio *</option>
              <option value="funcional">Gimnasio Funcional</option>
              <option value="crossfit">CrossFit</option>
              <option value="musculacion">Musculación</option>
              <option value="pilates">Pilates</option>
              <option value="yoga">Yoga</option>
              <option value="personal">Entrenador Personal</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div className="form__field">
            <label htmlFor="formulario_mensaje">
              <svg 
                className="icon"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 512 512"
              >
                <path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z"/>
              </svg>
              <span className="hidden">Mensaje</span>
            </label>
            <textarea
              id="formulario_mensaje"
              className="form__input"
              placeholder="Mensaje o consulta"
              value={inputs.mensaje}
              type="text"
              onChange={(e) =>
                setInputs({ ...inputs, mensaje: e.target.value })
              }
              rows="4"
            ></textarea>
          </div>

          <div className="form__field">
            <button
              type="button"
              className="btn btn-warning"
              onClick={handlerSubmit}
              disabled={state.loading}
            >
              {state.loading ? <Loader /> : "Enviar Solicitud"}
            </button>
          </div>
          
          {errorFetch.error && (
            <div className="alert alert-danger" role="alert">                  
              {errorFetch.errorMsg}
            </div>
          )}
          
          {errorFetch.success && (
            <div className="alert alert-success" role="alert">                  
              ¡Tu solicitud ha sido enviada correctamente! Analizaremos tu petición y nos contactaremos contigo a la brevedad.
            </div>
          )}
          
          <p className="mt-2 text-center small">Los campos marcados con * son obligatorios</p>
        </form>
      </motion.div>
      
      <div className="text-secondary fs-6 mb-3 contacto-text fw-medium text-break text-wrap fst-italic ">
        ¿Ya tienes una cuenta? <a href="/login" className="text-warning">Iniciar sesión</a> | ¿No tienes una cuenta? <a href="/registro" className="text-warning">Regístrate</a>
      </div>
    </div>
  );
} 