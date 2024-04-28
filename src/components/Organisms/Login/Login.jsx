import { useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import "./Login.css"
import { LoginContext } from "../../../context/LoginContext";
import postFetchLogin from "../../helpers/fetch";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { getSessionStorage, setSessionStorage } from "../../helpers/storage";
import { ModalError } from "../../Molecules/ModalError/ModalError";
import { config } from "../../helpers/config.js";
import { Loader } from "../../Atoms/Loader/Loader.tsx";
import { motion } from "framer-motion"

export const Login = () => {

  const navigate = useNavigate()

  const {state, dispatch} = useContext(LoginContext)
  const [inputs, setInputs] = useState({
    userName: "",
    password: ""
  })  

  const [errorFetch, setErrorFetch] = useState({
    errorCredential: false,
    errorServer: false,
    errorMsg: ""
  })  

  const handlerSubmit = async(e) => {    
    // e.preventdefault()
    
    //Envia peticion http
    dispatch({type: "LOADING"})
    const data = await postFetchLogin(inputs);  
    if (data.login) {
      // dispatch({type: "LOGIN", payload: {...state, user: data.user}})
      dispatch({type: "LOGIN"})
      setSessionStorage(data.user)
      navigate("/menu")
    } else {
      dispatch({type: "ERROR"})
      if(data.message.includes("Server")) setErrorFetch({...errorFetch, errorServer: true, errorCredential: false});
      if(data.message.includes("NO-Registrado")) setErrorFetch({...errorFetch, errorServer: true, errorCredential: false});
      if(data.message.includes("Usuario")) setErrorFetch({...errorFetch, errorCredential: true, errorMsg: data.message});
      console.log(errorFetch)
    }
  }


  return (
    <div className="align">
      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="grid  ">
        <div>
          <img src="/imagenes/gymLogo2.png" alt="" style={{width: "200px"}}/>
        </div>
        <form className="form login">
          <div className="form__field">
            <label htmlFor="login__username">
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
              <span className="hidden">Username</span>
            </label>
            <input
              autoComplete="on"
              id="login__username"
              type="text"
              // name="username"
              className="form__input"
              placeholder="Username"
              value={inputs.userName}
              onChange={(e) =>
                setInputs({ ...inputs, userName: e.target.value })
              }
              required
            />
          </div>

          <div className="form__field">
            <label htmlFor="login__password">
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
              </svg>
              <span className="hidden">Password</span>
            </label>
            <input
              id="login__password"
              type="password"
              name="password"
              className="form__input"
              placeholder="Password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              required
            />
          </div>

          <div className="form__field">
            {/* <input type="submit" value="Sign In"/> */}
            <button
              type="button"
              className="btn btn-success"
              onClick={handlerSubmit}
              disabled={state.loading}
            >
              {state.loading ? <Loader /> : "Ingresar"}
            </button>
          </div>
              {
                (errorFetch.errorServer || errorFetch.errorCredential) &&
                <div className="alert alert-danger" role="alert">
                  { errorFetch.errorCredential && "El usuario o la contraseña son incorrectas!" }
                  { errorFetch.errorServer && "Error al Ingresar" }
                </div>
              }
        </form>
      </motion.div>
    </div>
  );
}