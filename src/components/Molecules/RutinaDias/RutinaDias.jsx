import { Fecha } from "../Fecha/Fecha"
import TopBar from "../TopBar/TopBar"

export const RutinaDias = ({rutina, handleChangePage}) => {
  return (
    <>
      <TopBar titulo={"Mi Rutina"} />
      <Fecha/>

      <ul className="list-group ">
          {
            rutina.map((rutina, index) => {
              return (
                <li style={{cursor: "pointer"}} className="list-group-item list-group-item-action list-group-item-success mb-2 py-3 d-flex justify-content-between align-items-center border border-success-subtle rounded" key={index} onClick={() => handleChangePage(index)}>
                  <h3 className="mb-0">Dia {index+1}</h3>
                  <span class="badge text-bg-primary rounded-pill">{rutina.ejercicios.length}</span>
                </li>
              )
            })
          }
        </ul>
    </>
  )
}