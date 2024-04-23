export const Alert = ({type, msg = "Error en la peticion"}) => {

    let typeClass = `alert alert-${type} animate__animated animate__slideInLeft `

  return (
    <div className={typeClass} role="alert">
          {msg}
     </div> 
  )
}