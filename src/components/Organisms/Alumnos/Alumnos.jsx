
import React, { useContext, useState } from "react"
import { getSessionStorage } from "../../helpers/storage";
import { LoginContext } from "../../../context/LoginContext";
import TopBar from "../../Molecules/TopBar/TopBar";
import "./Alumnos.css"
import { SearchBar } from "../../Molecules/SearchBar";
import { alumnoCreateFetch, alumnoDeleteFetch, alumnoUpdateFetch, getFetch } from "../../helpers/fetch";
import { TableContainer } from "../../Molecules/TableContainer/TableContainer";
import { Alert } from "../../Atoms/Alert/Alert";
import { Modal } from "../../Molecules/Modal/Modal";
import { Pagination } from "../../Molecules/Pagination/Pagination";

export const Alumnos = () => {

    
    const [responseMsg, setResponseMsg] = useState("");
    const [modalSeguro, setModalSeguro] = useState(false);
    const [modalCrate, setModalCrate] = useState(false);
    const [modalView, setModalView] = useState(false);
    const [inputSearch, setInputSearch] = useState("");
    const [usuariosAll, setUsuariosAll] = useState([]); // Guarda todos los usuarios
    const [usuariosState, setUsuariosState] = useState([]); // Usuarios filtrados por el input
    const [datosAlumno, setDatosAlumno] = useState({
      nombre: "",
      apellido: "",
      edad: "",
      dni: "",
      password: "",
      experiencia: "",
      lesion: "",
      patologia: "",
      objetivo: "",
      diasSemanales: "",
      deporte: "",
      rutina: []
    });
    const [numerPage , setNumerPage ] = useState(1)

    const {state, dispatch} = useContext(LoginContext)

    const {id, rol, token, gimnasio} = getSessionStorage()

    // TRAE TODOS LOS ALUMNOS
    const handlerUpdate = async() => {
      dispatch({type: "LOADING"})
      const idProfesor  = rol === "PROFESOR_ROL" ? id : null
      const idGimnasio  = rol === "GYM_ROL" ? id : null
      try {
        const alumnoResponse = await getFetch(idProfesor, idGimnasio);  
        const usuariosResponse = alumnoResponse.body.Usuarios        
        setUsuariosAll(usuariosResponse)
        setUsuariosState(usuariosResponse)
        dispatch({type: "SUCCESS"})
      } catch (error) {
        dispatch({type: "ERROR"})
        console.info(error)
      }
        
    }

    // FILTRA EN EL BUSCADOR
    const handleInputSearch = (e) => {
      const query = e.target.value
      setInputSearch(query)  
      const usuariosFilter = usuariosAll.filter(usuario => {
        return usuario.apellido.toLowerCase().indexOf(query.toLowerCase()) !== -1     
      });
      setUsuariosState(usuariosFilter)  
    }

    // ABRE MODAL NUEVO ALUMNO
    const handleModalCreateOpen = (isOpen) => {
      // Abre modal
      if (isOpen) {
        setModalCrate(true)
        setDatosAlumno({...datosAlumno, nombre: "", apellido: "", edad: "", dni: "", password: "", experiencia: "", lesion: "", patologia: "", objetivo: "", diasSemanales: "", deporte: ""})
      } 

      // Cierra modal
      if (!isOpen){
        setModalCrate(false)
        dispatch({type: "SUCCESS"})
      } 
    }

    // CREA ALUMNO
    const handleNuevoAlumno = async() => {


      if (datosAlumno.nombre === "" || datosAlumno.apellido === "" || datosAlumno.dni === "" || datosAlumno.password === "") {
        dispatch({type: "FORM_ERROR"})
        return
      }

      const idProfesor  = rol === "PROFESOR_ROL" ? id : null // Si es el profesor quien crea, pasa su id, si crea un gimnasio, pasa null
      const idGimnasio  = rol === "GYM_ROL" ? id : gimnasio // Si es el gimnasio quien crea, pasa su id, si crea un profesor, pasa el id del gimnasio

      dispatch({type: "LOADING"})
      try {
        const response = await alumnoCreateFetch(datosAlumno, idProfesor, idGimnasio); 
        if (response.error) {
          dispatch({type: "ERROR"})
          setResponseMsg(response.message)
        } else {         
          setResponseMsg(response.message)
          dispatch({type: "FORM_SUCCESS"})
          setDatosAlumno({...datosAlumno, nombre: "", apellido: "", edad: "", dni: "", password: "", experiencia: "", lesion: "", patologia: "", objetivo: "", diasSemanales: "", deporte: ""})
        }
        
      } catch (error) {
        dispatch({type: "ERROR"})
        console.info({error})
      }
    }

    // ABRE MODAL ALUMNO
    const handleModalAlumnoOpen = (isOpen, id) => {
      const usuariosFilter = usuariosAll.filter(usuario => {
        return usuario._id === id     
      });
      setDatosAlumno(usuariosFilter[0])

      // Abre modal
      if (isOpen) {
        setModalView(true)       
      } 

      // Cierra modal
      if (!isOpen){
        setModalView(false)
        dispatch({type: "SUCCESS"})
      } 
    }

    // ACTUALIZA ALUMNO
    const handleUpdateAlumno = async() => {

      if (datosAlumno.nombre === "" || datosAlumno.apellido === "" || datosAlumno.dni === "" || datosAlumno.password === "") {
        dispatch({type: "FORM_ERROR"})
        return
      }

      dispatch({type: "LOADING"})
      try {
        const response = await alumnoUpdateFetch(datosAlumno, id); 
        if (response.error) {
          dispatch({type: "ERROR"})
          setResponseMsg(response.message)
        } else {         
          setResponseMsg(response.message)
          dispatch({type: "FORM_SUCCESS"})
        }
      } catch (error) {
        dispatch({type: "ERROR"})
        console.info({error})
      }
    }

    // ABRE MODAL ESTAS SEGURO
    const handleModalSeguroOpen = (isOpen, id) => {
      const usuariosFilter = usuariosAll.filter(usuario => {
        return usuario._id === id     
      });
      setDatosAlumno(usuariosFilter[0])

      // Abre modal
      if (isOpen) {
        setModalSeguro(true)       
      } 

      // Cierra modal
      if (!isOpen){
        setModalSeguro(false)
        dispatch({type: "SUCCESS"})
      } 
    }

    // ELIMINAR ALUMNO
    const handleDeleteAlumno = async() => {
      
      dispatch({type: "LOADING"})
      try {
        const response = await alumnoDeleteFetch(datosAlumno._id); 
        if (response.error) {
          dispatch({type: "ERROR"})
          setResponseMsg(response.message)
        } else {         
          setResponseMsg(response.message)       

          usuariosAll.filter((usuario, index) => {
            if (usuario._id === datosAlumno._id) {
              usuariosAll.splice(index, 1)
            }
          })
          dispatch({type: "FORM_SUCCESS"})
        }
        
      } catch (error) {
        dispatch({type: "ERROR"})
        console.info({error})
      }
    }
    
    

  return (
    <div className="container container-alumno">
      <TopBar titulo={"Alumnos"} />

      <SearchBar
        usuario={"Alumno"}
        stateInput={inputSearch}
        setStateInput={setInputSearch}
        handlerUpdate={handlerUpdate}
        handleInputSearch={handleInputSearch}
        modalCrate={modalCrate}
        handleModalCreateOpen={handleModalCreateOpen}
      />

      <TableContainer usuariosState={usuariosState} setUsuariosState={setUsuariosState} stateFetch={state} handleModalAlumnoOpen={handleModalAlumnoOpen} handleModalSeguroOpen={handleModalSeguroOpen} numerPage={numerPage}/>  

      { state.error && <Alert type={"danger"} /> }

      {/* { modalCrate && <ModalCreate datosUsuario={datosAlumno} setDatosUsuario={setDatosAlumno} handleFetch={handleNuevoAlumno} handleModalCreateOpen={handleModalCreateOpen} /> } */}
      { modalCrate && <Modal
        datosUsuario={datosAlumno} 
        setDatosUsuario={setDatosAlumno} 
        handleFunction={handleNuevoAlumno} 
        handleIsOpen={handleModalCreateOpen}
        title={`Nuevo Alumno`} 
        msg={responseMsg} 
        tipoUsuario={"alumno"}  
        tipoModal={"crear"} /> 
      }
      {/* { modalView && <ModalView datosUsuario={datosAlumno} setDatosUsuario={setDatosAlumno} handleModalAlumnoOpen={handleModalAlumnoOpen} handleUpdateAlumno={handleUpdateAlumno} /> } */}
      { modalView && <Modal 
        datosUsuario={datosAlumno} 
        setDatosUsuario={setDatosAlumno} 
        handleFunction={handleUpdateAlumno} 
        handleIsOpen={handleModalAlumnoOpen} 
        title={`${datosAlumno.nombre} ${datosAlumno.apellido}`} 
        msg={responseMsg} 
        tipoUsuario={"alumno"}  
        tipoModal={"editar"}/>
      }
      { modalSeguro && <Modal handleFunction={handleDeleteAlumno} handleIsOpen={handleModalSeguroOpen} title={`¿Deseas eliminar a ${datosAlumno.nombre} ${datosAlumno.apellido}?`} msg={responseMsg} tipoModal={"eliminar"} tipoUsuario={"alumno"} /> }

      <Pagination usuariosState={usuariosState} numerPage={numerPage} setNumerPage={setNumerPage}/>
    </div>
  );
}