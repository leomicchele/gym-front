import { useEffect, useState } from "react";
import "./ModalError.css"

export const ModalError = ({titulo, mensaje, error, setError}) => {

  const [isEmail, setIsEmail] = useState({
    isEmail: false,
    email: "",
    msgSinEmail: "",
  })

    const handleClose = () => setError({...error, errorCredential: false, errorServer: false,})

    useEffect(() => {
      const regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
      const match = mensaje.match(regex);
            
        if (match) {
          const direccionEmail = match[0];
          setIsEmail({...isEmail, isEmail: true, email: direccionEmail, msgSinEmail: mensaje.replace(regex, '')})
        } else {
          setIsEmail({...isEmail, isEmail: false})
        }
    }, [])


  return (
    <div className="modal" tabIndex="-1">
  <div className="modal-dialog">
    <div className="modal-content modal__modal-error">
      <div className="modal-header">
        <h5 className="modal-title">{titulo}</h5>
      </div>
      <div className="modal-body">
        { isEmail.isEmail ?
          <p className="m-0">{isEmail.msgSinEmail} <strong>{isEmail.email}</strong></p>
          :
          <p className="m-0">{mensaje}</p>
        }
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-light button-error-cancel" data-bs-dismiss="modal" onClick={handleClose}>Cancelar</button>
        <button type="button" className="btn btn-primary button-error" onClick={handleClose}>Continuar</button>
      </div>
    </div>
  </div>
</div>
  )
}