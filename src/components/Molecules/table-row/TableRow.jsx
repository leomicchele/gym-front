import './TableRow.css'
import { DeleteIcon } from "../../Atoms/icons/DeleteIcon";
import { CheckOk } from "../../Atoms/icons/CheckOk";
import { CheckWarning } from "../../Atoms/icons/CheckWarning";

export const TableRow = ({
  nombre,
  apellido,
  estado,
  id,
  diasRestantes,
  handleModalAlumnoOpen,
  handleModalSeguroOpen  
}) => {

  const handleCLick = (e) => {

    if (e.target.parentNode?.id === "deleteIcon" || e.target.children[0]?.id  === "deleteIcon" || e.target.id === "deleteIcon") {
      handleModalSeguroOpen(true, id)      
    } else {
      handleModalAlumnoOpen(true, id)
    }
  }

  const colorDiasRestantes = (dias) => {
    if (dias <= 0) {
      return "text-danger fw-semibold"
    } else if (dias <= 7) {
      return "text-warning fw-semibold"
    } else {
      return "text-success fw-semibold"
    }
  }

  return (
    <tr style={{cursor: "pointer"}} onClick={(e) => handleCLick(e)}>
    {/* <tr style={{cursor: "pointer"}} onClick={() => handleModalAlumnoOpen(true, id)}> */}
      <td style={{padding: "0.6rem 0.5rem"}}>{apellido}</td>
      {/* {es solo el primer nombre} */}
      <td style={{padding: "0.6rem 0.5rem"}}>{nombre.split(' ')[0]}</td> 
      <td style={{padding: "0.6rem 0.5rem"}} className={colorDiasRestantes(diasRestantes)}>{diasRestantes}</td> 
      <td style={{padding: "0.6rem 0.5rem"}} className={estado ? "text-success" : "text-warning"}>{estado ? <CheckOk/> : <CheckWarning/>}</td>
      
      <td style={{padding: "0.6rem 0.5rem"}} className="text-danger"><DeleteIcon/></td>
      {/* <td>{isActiv}</td> */}
    </tr>
  );
};
