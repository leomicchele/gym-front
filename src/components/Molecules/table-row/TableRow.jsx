import './TableRow.css'
import { DeleteIcon } from "../../Atoms/icons/DeleteIcon";
import { CheckOk } from "../../Atoms/icons/CheckOk";
import { CheckWarning } from "../../Atoms/icons/CheckWarning";

export const TableRow = ({
  nombre,
  apellido,
  estado,
  id,
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

  return (
    <tr style={{cursor: "pointer"}} onClick={(e) => handleCLick(e)}>
    {/* <tr style={{cursor: "pointer"}} onClick={() => handleModalAlumnoOpen(true, id)}> */}
      <td style={{padding: "0.6rem 0.5rem"}}>{apellido}</td>
      <td style={{padding: "0.6rem 0.5rem"}}>{nombre}</td>
      <td style={{padding: "0.6rem 0.5rem"}} className={estado ? "text-success" : "text-warning"}>{estado ? <CheckOk/> : <CheckWarning/>}</td>
      
      <td style={{padding: "0.6rem 0.5rem"}} className="text-danger"><DeleteIcon/></td>
      {/* <td>{isActiv}</td> */}
    </tr>
  );
};
