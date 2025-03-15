import { useEffect, useState } from "react";
import { CheckOkEdit } from "../icons/CheckOkEdit";
import { Edit } from "../icons/Edit";
import "./FechaCaducacion.css";
import { motion } from "framer-motion";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}

export const FechaCaducacion = ({datosUsuario, setDatosUsuario}) => {


  const [isEdit, setIsEdit] = useState(false);
  const [fecha, setFecha] = useState(datosUsuario.caducacionRutina || "--/--/----");

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    let day = fecha.split('/')[0] || "";
    let month = fecha.split('/')[1] || "";
    let year = fecha.split('/')[2] || "";

    switch (field) {
      case "day":
        day = value;
        break;
      case "month":
        month = value;
        break;
      case "year":
        year = value;
        break;
      default:
        break;
    }

    setFecha(`${day}/${month}/${year}`);
    setDatosUsuario({...datosUsuario, caducacionRutina: `${day}/${month}/${year}`})
  };

  return (
    <div className="input-group mb-2 d-flex flex-column text-start">
      <label htmlFor="basic-url" className="fecha-label">
        Fecha de actualización
      </label>
      <motion.div initial={"closed"} animate={"open"} exit={"closed"} variants={variants} className="input-group-text gap-2 d-flex justify-content-between container-caducacion">

        {
            isEdit ?
            
            <div className="d-flex gap-1 align-items-center justify-content-between">
                <input  type="number" value={fecha.split('/')[0]} onChange={(e) => handleInputChange(e, "day")} className="form-control px-2" placeholder="Dia" aria-label="Dia" aria-describedby="basic-addon1"/>
                /
                <input  type="number"  value={fecha.split('/')[1]} onChange={(e) => handleInputChange(e, "month")} className="form-control px-2" placeholder="Mes" aria-label="Mes" aria-describedby="basic-addon1"/>
                /
                <input  type="number" value={fecha.split('/')[2]} onChange={(e) => handleInputChange(e, "year")} className="form-control px-2" placeholder="Año" aria-label="Año" aria-describedby="basic-addon1"/>
                <div style={{cursor: "pointer"}} className="d-flex align-items-center justify-content-center text-success"  onClick={() => setIsEdit(!isEdit)}>
                    <CheckOkEdit/>
                </div>
            </div>
            :
            <>
                <span className="input-group-text px-2 w-100 bg-body-secondary" id="basic-addon1">{fecha.split('/')[0]}</span>
                /
                <span className="input-group-text px-2 w-100 bg-body-secondary" id="basic-addon1">{fecha.split('/')[1]}</span>
                /
                <span className="input-group-text px-2 w-100 bg-body-secondary" id="basic-addon1">{fecha.split('/')[2]}</span>
                <div style={{cursor: "pointer"}} className="d-flex align-item-center text-primary"  onClick={() => setIsEdit(!isEdit)}>
                    <Edit/>
                </div>
            </>
        }
        
      </motion.div>
    </div>
  );
};
