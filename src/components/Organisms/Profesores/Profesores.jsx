
import React, { useContext, useState } from "react"
import { getSessionStorage } from "../../helpers/storage";
import { LoginContext } from "../../../context/LoginContext";
import TopBar from "../../Molecules/TopBar/TopBar";
import "./Profesores.css"
import { SearchBar } from "../../Molecules/SearchBar";
import { profesorDeleteFetch, profesorUpdateFetch, getFetch, getFetchProfesores, profesorCreateFetch } from "../../helpers/fetch";
import { TableContainer } from "../../Molecules/TableContainer/TableContainer";
import { Alert } from "../../Atoms/Alert/Alert";
import { Modal } from "../../Molecules/Modal/Modal";
import { Pagination } from "../../Molecules/Pagination/Pagination";

export const Profesores = () => {

    
    const [responseMsg, setResponseMsg] = useState("");
    const [modalSeguro, setModalSeguro] = useState(false);
    const [modalCrate, setModalCrate] = useState(false);
    const [modalView, setModalView] = useState(false);
    const [inputSearch, setInputSearch] = useState("");
    const [usuariosAll, setUsuariosAll] = useState([]); // Guarda todos los usuarios
    const [usuariosState, setUsuariosState] = useState([]); // Usuarios filtrados por el input
    const [datosProfesor, setDatosProfesor] = useState({
      nombre: "",
      apellido: "",
      dni: "",
      password: "",
      email: ""
    });

    const [numerPage , setNumerPage ] = useState(1)

    const {state, dispatch} = useContext(LoginContext)

    const {id, rol, token} = getSessionStorage()


    // TRAE TODOS LOS ALUMNOS
    const handlerUpdate = async() => {
      dispatch({type: "LOADING"})
      try {
        const profesorResponse = await getFetchProfesores(id);  
        const usuariosResponse = profesorResponse.body.Usuarios        
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
        setDatosProfesor({...datosProfesor, nombre: "", apellido: "", dni: "", password: "", email: ""})
      } 

      // Cierra modal
      if (!isOpen){
        setModalCrate(false)
        dispatch({type: "SUCCESS"})
      } 
    }

    // CREA ALUMNO
    const handleNuevoProfesor = async() => {

      if (datosProfesor.nombre === "" || datosProfesor.apellido === "" || datosProfesor.dni === "" || datosProfesor.password === "" || datosProfesor.email === "") {
        dispatch({type: "FORM_ERROR"})
        return
      }

      dispatch({type: "LOADING"})
      try {
        const response = await profesorCreateFetch(datosProfesor, id); 
        if (response.error) {
          dispatch({type: "ERROR"})
          setResponseMsg(response.message)
        } else {         
          setResponseMsg(response.message)
          dispatch({type: "FORM_SUCCESS"})
          setDatosProfesor({...datosProfesor, nombre: "", apellido: "", dni: "", password: "", email: ""})
        }
        
      } catch (error) {
        dispatch({type: "ERROR"})
        console.info({error})
      }
    }

    // ABRE MODAL Profesor
    const handleModalProfesorOpen = (isOpen, id) => {
      const usuariosFilter = usuariosAll.filter(usuario => {
        return usuario._id === id     
      });
      setDatosProfesor(usuariosFilter[0])


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

    // ACTUALIZA Profesor
    const handleUpdateProfesor = async() => {

      if (datosProfesor.nombre === "" || datosProfesor.apellido === "" || datosProfesor.dni === "" || datosProfesor.password === "" || datosProfesor.email === "") {
        dispatch({type: "FORM_ERROR"})
        return
      }

      dispatch({type: "LOADING"})
      try {
        const response = await profesorUpdateFetch(datosProfesor); 
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
      setDatosProfesor(usuariosFilter[0])

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

    // ELIMINAR Profesor
    const handleDeleteProfesor = async() => {
      
      dispatch({type: "LOADING"})
      try {
        const response = await profesorDeleteFetch(datosProfesor._id); 
        if (response.error) {
          dispatch({type: "ERROR"})
          setResponseMsg(response.message)
        } else {         
          setResponseMsg(response.message)       

          usuariosAll.filter((usuario, index) => {
            if (usuario._id === datosProfesor._id) {
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
      <TopBar titulo={"Profesores"} />

      <SearchBar
        usuario={"Profesor"}
        stateInput={inputSearch}
        setStateInput={setInputSearch}
        handlerUpdate={handlerUpdate}
        handleInputSearch={handleInputSearch}
        modalCrate={modalCrate}
        handleModalCreateOpen={handleModalCreateOpen}
      />

      <TableContainer usuariosState={usuariosState} setUsuariosState={setUsuariosState} stateFetch={state} handleModalAlumnoOpen={handleModalProfesorOpen} handleModalSeguroOpen={handleModalSeguroOpen} numerPage={numerPage}/>  

      { state.error && <Alert type={"danger"} /> }

      {/* { modalCrate && <ModalCreate datosUsuario={datosAlumno} setDatosUsuario={setDatosAlumno} handleFetch={handleNuevoAlumno} handleModalCreateOpen={handleModalCreateOpen} /> } */}
      { modalCrate && <Modal
        datosUsuario={datosProfesor} 
        setDatosUsuario={setDatosProfesor} 
        handleFunction={handleNuevoProfesor} 
        handleIsOpen={handleModalCreateOpen}
        title={`Nuevo Profesor`} 
        msg={responseMsg} 
        tipoUsuario={"profesor"}  
        tipoModal={"crear"} /> 
      }
      {/* { modalView && <ModalView datosUsuario={datosAlumno} setDatosUsuario={setDatosAlumno} handleModalAlumnoOpen={handleModalAlumnoOpen} handleUpdateAlumno={handleUpdateAlumno} /> } */}
      { modalView && <Modal 
        datosUsuario={datosProfesor} 
        setDatosUsuario={setDatosProfesor} 
        handleFunction={handleUpdateProfesor} 
        handleIsOpen={handleModalProfesorOpen} 
        title={`${datosProfesor.nombre} ${datosProfesor.apellido}`} 
        msg={responseMsg} 
        tipoUsuario={"profesor"}  
        tipoModal={"editar"}/>
      }
      { modalSeguro && <Modal handleFunction={handleDeleteProfesor} handleIsOpen={handleModalSeguroOpen} title={`¿Deseas eliminar a ${datosProfesor.nombre} ${datosProfesor.apellido}?`} msg={responseMsg} tipoModal={"eliminar"} tipoUsuario={"alumno"} /> }

      <Pagination usuariosState={usuariosState} numerPage={numerPage} setNumerPage={setNumerPage} />
    </div>
  );
}