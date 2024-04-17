import "./Check.css"

export const Check = ({text}) => {
    let checkClass = ``

    if(text === "Chequeado") checkClass = "btn boton-check"
    if(text === "No chequeado") checkClass = "btn boton-no-check"
    if(text === "Rechazado") checkClass = "btn boton-rechazado"

  return (
    <div className={checkClass}>{text}</div>
  )
}