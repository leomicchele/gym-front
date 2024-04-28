import { useContext, useState } from "react"
import { LoginContext } from "../../../context/LoginContext"
import { Alert } from "../../Atoms/Alert/Alert"
import { Loader } from "../../Atoms/Loader/Loader"
import { ModalViewBody } from "../ModalViewBody/ModalViewBody"
import { Button } from "../../Atoms/Button/Button"
import { ModalCreateBody } from "../ModalCreateBody/ModalCreateBody"
import { motion, AnimatePresence } from "framer-motion"



export const Modal = (
  {
    handleFunction,
    handleIsOpen, 
    title, 
    msg, 
    tipoUsuario, 
    tipoModal, 
    datosUsuario,
    setDatosUsuario}) => {


    const {state, dispatch} = useContext(LoginContext)

    const [datosOrRutinas, setDatosOrRutinas] = useState("datos")
    const [isEdit, setIsEdit] = useState(false)

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
     

  return (
    <div className="modal " tabIndex="-1">
    <motion.div initial={{opacity: 0, y: -100}} animate={{opacity: 1, y: 0}} transition={{duration: 0.3, ease: "easeOut"}} className="modal-dialog ">
      <div className="modal-content">
        <div className="modal-header gap-2">
          <h5 className="modal-title">{title}</h5>
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

        <div className="modal-footer">
            { state.error &&  <Alert type={"danger"} msg={msg}/> }
            { state.formInputSuccess && <Alert type={"success"} msg={tipoModal === "editar" ? "Actualizado" : msg}/> }
            
          <button disabled={state.loading} type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => handleIsOpen(false)}>Cerrar</button>


            
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
              tipoModal === "crear" & !state.formInputSuccess ?
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
        </div>
      </div>
    </motion.div>
  </div>
  )
}