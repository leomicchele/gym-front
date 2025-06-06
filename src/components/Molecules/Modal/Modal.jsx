import { useContext, useEffect, useMemo, useState, useRef } from "react"
import { LoginContext } from "../../../context/LoginContext"
import { Alert } from "../../Atoms/Alert/Alert"
import { Loader } from "../../Atoms/Loader/Loader"
import { ModalViewBody } from "../ModalViewBody/ModalViewBody"
import { Button } from "../../Atoms/Button/Button"
import { ModalCreateBody } from "../ModalCreateBody/ModalCreateBody"
import { motion, AnimatePresence } from "framer-motion"
import { ModalVideo } from "../ModalVideo/ModalVideo"



export const Modal = (
  {
    handleFunction,
    handleIsOpen, 
    title, 
    msg, 
    tipoUsuario, 
    tipoModal, 
    datosUsuario,
    setDatosUsuario,
  }) => {

    //Guardar el titulo del modal con usememo
    const tituloFijo = useMemo(() => {
      return title
    }
    ,[])

    const {state, dispatch} = useContext(LoginContext)

    const [datosOrRutinas, setDatosOrRutinas] = useState("datos")
    const [isEdit, setIsEdit] = useState(false)
    const modalContentRef = useRef(null)

  const handleIsEdit = () => {
    setIsEdit(!isEdit)
  }

  const emptyInput = (inputValue) => {
    if (inputValue === "" && state.formInputError) {
       return  "form-control py-1 py-md-2 is-invalid"
    } else {
        return "form-control py-1 py-md-2"
    }
  }
     
  const handleBackdropClick = (e) => {
    if (e.target.className === "modal" && !state.loading && !(state.formInputSuccess && tipoModal === "terminar")) {
      handleIsOpen(false)
    }
  }

  return (
    <div className="modal" tabIndex="-1" onClick={handleBackdropClick}>
    <motion.div initial={{opacity: 0, y: -100}} animate={{opacity: 1, y: 0}} transition={{duration: 0.3, ease: "easeOut"}} className="modal-dialog">
      <div className="modal-content" ref={modalContentRef}>
        <div className="modal-header gap-2">
          <h5 className="modal-title">{tituloFijo}</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleIsOpen(false)}></button>
        </div>
        {  tipoModal === "editar" ? 
          <ModalViewBody datosUsuario={datosUsuario} setDatosUsuario={setDatosUsuario} isEdit={isEdit} datosOrRutinas={datosOrRutinas} setDatosOrRutinas={setDatosOrRutinas} emptyInput={emptyInput} tipoUsuario={tipoUsuario}/> 
          :
          <></>
        }
        {  tipoModal === "crear"  ? 
          <ModalCreateBody datosUsuario={datosUsuario} setDatosUsuario={setDatosUsuario} tipoUsuario={tipoUsuario}/> 
          :
          <></>
        }
        {  tipoModal === "eliminar" && <p className="fs-6 mx-2">{""}</p> }
        {  tipoModal === "terminar" && <div className="px-3 py-2">
          <p className="fs-6 mb-2">{msg}</p>
          <p className="fs-6 text-secondary fst-italic">Al aceptar, tu entrenador recibirá un registro detallado de tu día de entrenamiento.</p>
        </div> }
        {  tipoModal === "video" && <ModalVideo link={msg} />}

        <div className="modal-footer">
            { state.error &&  <Alert type={"danger"}/> }
            { state.formInputSuccess && tipoModal === "editar" && <Alert type={"success"} msg={"Actualizado"}/> }
            { state.formInputSuccess && tipoModal === "crear" && <Alert type={"success"} msg={msg}/> }
            { state.formInputSuccess && tipoModal === "eliminar" && <Alert type={"success"} msg={msg}/> }
            { state.formInputSuccess && tipoModal === "terminar" && <Alert type={"success"} msg={"Enviado a tu profesor"}/> }
            
            

            {
              (state.formInputSuccess) && (tipoModal === "terminar") ? 
              <button disabled={true} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              :
              <button disabled={state.loading} type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleIsOpen(false)}>Cerrar</button>

            }


            
          {/* ------------- EDITAR / ACTUALIZAR ------------- */}
            {/* {
                !isEdit & (tipoModal === "editar") & !state.formInputSuccess ?
                <Button msg={"Editar"} estilo={"editar"} loading={state.loading} functionHandle={handleIsEdit}/>
                :
                <></>
            } */}
            {
                (tipoModal === "editar")  ?
                <Button msg={"Actualizar"} loading={state.loading} functionHandle={handleFunction}/>
                :
                <></>
            }

            {/* ------------- CREAR ------------- */}
            {
              tipoModal === "crear"  ?
              <Button msg={"Guardar"} loading={state.loading} functionHandle={handleFunction}/>   
              :
              <></>             
            }
            {/* ------------- ELIMINAR ------------- */}
            {
              tipoModal === "eliminar" & !state.formInputSuccess ?
              <Button msg={"Si"} estilo={"eliminar"} loading={state.loading} functionHandle={handleFunction}/>
              :
              <></>

            }
            {/* ------------- TERMINAR ENTRENAMIENTO ------------- */}

            {
              tipoModal === "terminar" && !state.formInputSuccess ?
              <Button msg="Si" estilo={"eliminar"} loading={state.loading} functionHandle={handleFunction}/>
              :
              <></>

            }
        </div>
      </div>
    </motion.div>
  </div>
  )
}