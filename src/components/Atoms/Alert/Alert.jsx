export const Alert = ({type, msg = "Error en la peticion"}) => {

    let typeClass = `alert alert-${type}`

  return (
    <div className={typeClass} role="alert">
          {msg}
     </div> 
  )
}