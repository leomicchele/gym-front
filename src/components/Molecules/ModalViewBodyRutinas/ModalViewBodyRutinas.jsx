import { useState, useEffect } from "react";
import { ArrowDown } from "../../Atoms/icons/ArrowDown";
import { ArrowUpBar } from "../../Atoms/icons/ArrowUpBar";
import { motion, AnimatePresence } from "framer-motion"
import { Edit } from "../../Atoms/icons/Edit";
import { CheckOk } from "../../Atoms/icons/CheckOk";
import { CheckOkEdit } from "../../Atoms/icons/CheckOkEdit";
import { ChevronRight } from "../../Atoms/icons/ChevronRight";
import "./ModalViewBodyRutinas.css"
import { da } from "date-fns/locale";

const variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: "100%" },
}

// Variantes para la animación de los detalles del ejercicio
const detailsVariants = {
  open: { 
    opacity: 1, 
    height: "auto",
    transition: { 
      duration: 0.3,
      ease: "easeInOut",
      staggerChildren: 0.05
    }
  },
  closed: { 
    opacity: 0, 
    height: "0px",
    transition: { 
      duration: 0.3,
      ease: "easeInOut"
    }
  }
}

// Variantes para cada elemento de la lista
const itemVariants = {
  open: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.2
    }
  },
  closed: { 
    opacity: 0, 
    y: -10,
    transition: { 
      duration: 0.2
    }
  }
}

export const ModalViewBodyRutinas = ({
  datosUsuario,
  handleSetDatosUsuario,
  handleRemoveEjercicio,
  // isEdit,
  dia,
  index,
  isRemoving = false // Nueva prop para controlar si el ejercicio se está eliminando
}) => {
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [tipoMedicion, setTipoMedicion] = useState(datosUsuario?.tipoMedicion || "R.I.R");
  const styleDisplayNone = "d-none"
  const styleDisplayFlex = "list-group-item d-flex align-items-center gap-2"

  // Función para obtener el nombre de la propiedad según el tipo de medición
  const getNombrePropiedad = () => {
    // Convertimos el tipo de medición a minúsculas y sin puntos para usarlo como nombre de propiedad
    return tipoMedicion.toLowerCase().replace(/\./g, '');
  }

  // Obtener los valores actuales según el tipo de medición seleccionado
  const getValores = () => {
    const propiedad = getNombrePropiedad();
    // Si no existe la propiedad en los datos, usamos rir como fallback o un array vacío
    return datosUsuario?.[propiedad] || datosUsuario?.rir || ["", "", "", "", ""];
  }

  const colorPrecalentamiento = () => {
    let color = {}
    if (datosUsuario.precalentamiento) {
      color.listColor = "list-group-item-warning"
      color.borderColor = "border-warning"
      color.textColor = "text-orange"
      color.backGroundColor = "bg-warning-subtle"
    } else {
      color.listColor = "list-group-item-success"
      color.borderColor = "border-success"
      color.textColor = "text-success"
      color.backGroundColor = "bg-success-subtle"
    }
    return color
  }

  const handleChangeTipoMedicion = (e) => {
    const nuevoTipo = e.target.value;
    const anteriorPropiedad = getNombrePropiedad();
    const valoresAnteriores = datosUsuario?.[anteriorPropiedad] || ["", "", "", "", ""];
    
    setTipoMedicion(nuevoTipo);
    
    // Actualizamos el tipo de medición en los datos del usuario
    handleSetDatosUsuario(dia, index, "tipoMedicion", nuevoTipo);
    
  //   // Creamos la nueva propiedad con los valores anteriores y eliminamos la anterior si es necesario
  //   const nuevaPropiedad = nuevoTipo.toLowerCase().replace(/\./g, '');
  //   if (nuevaPropiedad !== anteriorPropiedad) {
  //     // Transferimos los valores a la nueva propiedad
  //     handleSetDatosUsuario(dia, index, nuevaPropiedad, valoresAnteriores);
  //   }
  };

  return (                  
    <motion.ul 
      initial={"closed"} 
      animate={isRemoving ? "closed" : "open"} 
      exit={"closed"} 
      variants={variants} 
      className={`list-group fs-6 text-start mb-2 border ${colorPrecalentamiento().borderColor}`} 
      id="card-ejercicio"
    >
      <li className={`list-group-item-action ${colorPrecalentamiento().listColor} d-flex align-items-center ${!show ? styleDisplayFlex : styleDisplayNone} `} >
          <span className="fw-semibold col-11" onClick={() => setShow(!show)}>{!datosUsuario.ejercicio ? <span className="text-secondary fst-italic"><ChevronRight/> {datosUsuario.precalentamiento ? "Nuevo calentamiento" : "Nuevo ejercicio"}</span> : <span className={colorPrecalentamiento().textColor}><ChevronRight/> {datosUsuario.ejercicio}</span> }</span>
          {/* <button type="button" className="btn-close col" data-bs-dismiss="modal" aria-label="Close" onClick={(e) => handleRemoveEjercicioCSS(e)}></button> */}
          
          <button 
            type="button" 
            className="btn-close col" 
            data-bs-dismiss="modal" 
            aria-label="Close" 
            onClick={() => handleRemoveEjercicio(dia, index)}
            disabled={isRemoving} // Deshabilitamos el botón si el ejercicio se está eliminando
          ></button>
        
      </li>
      
      <AnimatePresence>
        {show && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={detailsVariants}
            className="ejercicio-details"
          >
            <motion.li variants={itemVariants} className={`${styleDisplayFlex} ${isEdit ? "bg-white" : `${colorPrecalentamiento().backGroundColor}`} borde-3 ${colorPrecalentamiento().borderColor} border-top-0 border-end-0 border-start-0 `} >
              <div className="d-flex justify-content-between align-items-center gap-2 w-100 " >
                <div onClick={() => {if(!isEdit) setShow(false)}} className="d-flex  align-items-center gap-2 w-100 ">
                  <span className="fw-semibold" >EJERCICIO: </span>
                  { !isEdit ? 
                    <span className={`${colorPrecalentamiento().textColor} fw-semibold`} onClick={() => setShow(false)}>{datosUsuario.ejercicio}</span> 
                    : 
                    <input type="text" className="form-control p-1" value={datosUsuario.ejercicio} onChange={(e) => handleSetDatosUsuario(dia, index, "ejercicio", e.target.value)}/>}

                </div>

                {/* <button type="button" className="btn btn-link px-1" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShow(false)}>
                  <ArrowUpBar />
                </button> */}
                <button type="button" className="btn btn-link px-1 d-flex aling-item-center"  onClick={() => setIsEdit(!isEdit)}>
                  {
                    isEdit ? <CheckOkEdit /> : <Edit />
                  }
                  
                </button>
              </div>
            </motion.li>

            <motion.li variants={itemVariants} className={styleDisplayFlex}>
              <span className="fw-semibold">SERIES: </span>
              {
                !isEdit ?
                  <>
                    <span>{datosUsuario.series[0]}</span>
                    <span>- {datosUsuario.series[1]}</span>
                    <span>- {datosUsuario.series[2]}</span>
                    <span>- {datosUsuario.series[3]}</span>
                    <span>- {datosUsuario.series[4]}</span>
                  </>
                :
                  <>
                    <input type="number" className="form-control p-1" id="" value={datosUsuario.series[0]} onChange={(e) => handleSetDatosUsuario(dia, index, "series", e.target.value, 0 )}/>
                    <input type="number" className="form-control p-1" id="" value={datosUsuario.series[1]} onChange={(e) => handleSetDatosUsuario(dia, index, "series", e.target.value, 1 )}/>
                    <input type="number" className="form-control p-1" id="" value={datosUsuario.series[2]} onChange={(e) => handleSetDatosUsuario(dia, index, "series", e.target.value, 2 )}/>
                    <input type="number" className="form-control p-1" id="" value={datosUsuario.series[3]} onChange={(e) => handleSetDatosUsuario(dia, index, "series", e.target.value, 3 )}/>
                    <input type="number" className="form-control p-1" id="" value={datosUsuario.series[4]} onChange={(e) => handleSetDatosUsuario(dia, index, "series", e.target.value, 4 )}/>
                  </>
              }
              
            </motion.li>

            <motion.li variants={itemVariants} className={styleDisplayFlex}>
              <span className="fw-semibold">REPS: </span>
              {
                !isEdit ?
                  <>
                    <span>{datosUsuario.reps[0]}</span>
                    <span>- {datosUsuario.reps[1]}</span>
                    <span>- {datosUsuario.reps[2]}</span>
                    <span>- {datosUsuario.reps[3]}</span>
                    <span>- {datosUsuario.reps[4]}</span>
                  </>
                :
                  <>
                    <input type="text" className="form-control p-1" id="" value={datosUsuario.reps[0]} onChange={(e) => handleSetDatosUsuario(dia, index, "reps", e.target.value, 0 )}/>
                    <input type="text" className="form-control p-1" id="" value={datosUsuario.reps[1]} onChange={(e) => handleSetDatosUsuario(dia, index, "reps", e.target.value, 1 )}/>
                    <input type="text" className="form-control p-1" id="" value={datosUsuario.reps[2]} onChange={(e) => handleSetDatosUsuario(dia, index, "reps", e.target.value, 2 )}/>
                    <input type="text" className="form-control p-1" id="" value={datosUsuario.reps[3]} onChange={(e) => handleSetDatosUsuario(dia, index, "reps", e.target.value, 3 )}/>
                    <input type="text" className="form-control p-1" id="" value={datosUsuario.reps[4]} onChange={(e) => handleSetDatosUsuario(dia, index, "reps", e.target.value, 4 )}/>
                  </>
              }
            </motion.li>

            <motion.li variants={itemVariants} className={styleDisplayFlex}>
              <span className="fw-semibold">{datosUsuario.precalentamiento ? "TIEMPO:" : "DESCANSO:"} </span>
              {
                !isEdit ?
                  <>
                    <span>{datosUsuario.descanso}</span>
                  </>
                :
                <input type="number" className="form-control p-1" id="" value={datosUsuario.descanso} onChange={(e) => handleSetDatosUsuario(dia, index, "descanso", e.target.value)}/>
              }
              <span>min</span>
            </motion.li>

            <motion.li variants={itemVariants} className={styleDisplayFlex}>
              <span className="fw-semibold">KILOS: </span>
              {
                !isEdit ?
                  <>
                    <span>{datosUsuario.kilos[0]}</span>
                    <span>- {datosUsuario.kilos[1]}</span>
                    <span>- {datosUsuario.kilos[2]}</span>
                    <span>- {datosUsuario.kilos[3]}</span>
                    <span>- {datosUsuario.kilos[4]}</span>
                  </>
                :
                  <>
                    <input type="number" className="form-control p-1" id="" value={datosUsuario.kilos[0]} onChange={(e) => handleSetDatosUsuario(dia, index, "kilos", e.target.value, 0 )}/>
                    <input type="number" className="form-control p-1" id="" value={datosUsuario.kilos[1]} onChange={(e) => handleSetDatosUsuario(dia, index, "kilos", e.target.value, 1 )}/>
                    <input type="number" className="form-control p-1" id="" value={datosUsuario.kilos[2]} onChange={(e) => handleSetDatosUsuario(dia, index, "kilos", e.target.value, 2 )}/>
                    <input type="number" className="form-control p-1" id="" value={datosUsuario.kilos[3]} onChange={(e) => handleSetDatosUsuario(dia, index, "kilos", e.target.value, 3 )}/>
                    <input type="number" className="form-control p-1" id="" value={datosUsuario.kilos[4]} onChange={(e) => handleSetDatosUsuario(dia, index, "kilos", e.target.value, 4 )}/>
                  </>
              }
              <span>Kg</span>
            </motion.li>

            {
              !datosUsuario.precalentamiento &&
                  <motion.li variants={itemVariants} className={styleDisplayFlex}>
                    {!isEdit ? (
                      <span className="fw-semibold">{datosUsuario?.tipoMedicion || "R.I.R"}: </span>
                    ) : (
                      <select 
                        className="form-select form-select-sm fw-semibold" 
                        style={{ width: 'auto', minWidth: '75px' }}
                        value={tipoMedicion}
                        onChange={handleChangeTipoMedicion}
                      >
                        <option value="R.I.R">R.I.R</option>
                        <option value="RPE">RPE</option>
                        <option value="1RM">1RM</option>
                        <option value="RM">RM</option>
                      </select>
                    )}
                    {
                      !isEdit ?
                      <>
                        <span>{tipoMedicion === "1RM" ? "% " : ""}{getValores()[0] || ""}</span>
                        <span>- {tipoMedicion === "1RM" ? "% " : ""}{getValores()[1] || ""}</span>
                        <span>- {tipoMedicion === "1RM" ? "% " : ""}{getValores()[2] || ""}</span>
                        <span>- {tipoMedicion === "1RM" ? "% " : ""}{getValores()[3] || ""}</span>
                        <span>- {tipoMedicion === "1RM" ? "% " : ""}{getValores()[4] || ""}</span>
                      </>
                      :
                        <>
                          <div className="input-group p-1">
                            {/* {tipoMedicion === "1RM" && <span className="input-group-text p-1">%</span>} */}
                            <input type="text" className="form-control p-1" id="" value={getValores()[0] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, 'rir', e.target.value, 0 )}/>
                          </div>
                          <div className="input-group p-1">
                            {/* {tipoMedicion === "1RM" && <span className="input-group-text p-1">%</span>} */}
                            <input type="text" className="form-control p-1" id="" value={getValores()[1] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, 'rir', e.target.value, 1 )}/>
                          </div>
                          <div className="input-group p-1">
                            {/* {tipoMedicion === "1RM" && <span className="input-group-text p-1">%</span>} */}
                            <input type="text" className="form-control p-1" id="" value={getValores()[2] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, 'rir', e.target.value, 2 )}/>
                          </div>
                          <div className="input-group p-1">
                            {/* {tipoMedicion === "1RM" && <span className="input-group-text p-1">%</span>} */}
                            <input type="text" className="form-control p-1" id="" value={getValores()[3] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, 'rir', e.target.value, 3 )}/>
                          </div>
                          <div className="input-group p-1">
                            {/* {tipoMedicion === "1RM" && <span className="input-group-text p-1">%</span>} */}
                            <input type="text" className="form-control p-1" id="" value={getValores()[4] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, 'rir', e.target.value, 4 )}/>
                          </div>
                        </>
                    }
                    <span></span>
                  </motion.li>
            }

            <motion.li variants={itemVariants} className={styleDisplayFlex}>
              <span className="fw-semibold">METODO: </span>
              {
                !isEdit ?
                  <>
                    <span>{datosUsuario.metodo}</span>
                  </>
                :
                <input type="text" className="form-control p-1" id="" value={datosUsuario.metodo} onChange={(e) => handleSetDatosUsuario(dia, index, "metodo", e.target.value)}/>
              }
            </motion.li>

            <motion.li variants={itemVariants} className={styleDisplayFlex}>
              <span className="fw-semibold">OBS: </span>
              {
                !isEdit ?
                  <>
                    <span>{datosUsuario.observaciones}</span>
                  </>
                :
                <input type="text" className="form-control p-1" id="" value={datosUsuario.observaciones} onChange={(e) => handleSetDatosUsuario(dia, index, "observaciones", e.target.value)}/>
              }
            </motion.li>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.ul>
  );
};
