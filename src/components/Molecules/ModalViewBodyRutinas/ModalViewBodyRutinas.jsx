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
  const [tipoMedicion, setTipoMedicion] = useState(datosUsuario?.tipoMedicion || "RIR");
  const [tipoMedicion2, setTipoMedicion2] = useState(datosUsuario?.tipoMedicion2 || "RIR");
  const styleDisplayNone = "d-none"
  const styleDisplayFlex = "list-group-item d-flex align-items-center gap-2"

  // Función para obtener el nombre de la propiedad según el tipo de medición
  const getNombrePropiedad = (tipo) => {
    // Convertimos el tipo de medición a minúsculas y sin puntos para usarlo como nombre de propiedad
    return tipo.toLowerCase().replace(/\./g, '');
  }

  const renderValueWithSymbol = (value, tipoMedicion) => {
    if (!value && value !== 0) return "";
    return tipoMedicion === "1RM" ? `${value}%` : value;
  };

  // Obtener los valores actuales según el tipo de medición seleccionado
  // const getValores = () => {
  //   const propiedad = getNombrePropiedad();
  //   // Si no existe la propiedad en los datos, usamos rir como fallback o un array vacío
  //   return datosUsuario?.[propiedad] || datosUsuario?.rir || ["", "", "", "", ""];
  // }

  const colorPrecalentamiento = () => {
    let color = {}
    if (datosUsuario.precalentamiento) {
      color.listColor = "list-group-item-warning"
      color.borderColor = "border-warning"
      color.textColor = "text-orange"
      color.backGroundColor = "bg-warning-subtle"
    } else if (datosUsuario.biserie) {
      color.listColor = "list-group-item-info"
      color.borderColor = "border-info"
      color.textColor = "text-info"
      color.backGroundColor = "bg-info-subtle"
      color.customTextColor = "rgb(12 174 207)" // Color personalizado para el texto de biserie
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
    setTipoMedicion(nuevoTipo);
    
    // Actualizamos el tipo de medición en los datos del usuario
    handleSetDatosUsuario(dia, index, "tipoMedicion", nuevoTipo);
  };

  const handleChangeTipoMedicion2 = (e) => {
    const nuevoTipo = e.target.value;
    setTipoMedicion2(nuevoTipo);
    
    // Actualizamos el tipo de medición en los datos del usuario
    handleSetDatosUsuario(dia, index, "tipoMedicion2", nuevoTipo);
  };

  // Función para manejar la visualización de series, reps, kilos para ejercicios normales o biserias
  const renderEjercicioData = (propertyName, label, inputType = "number") => {
    if (datosUsuario.biserie) {
      // Para biserias, mostrar dos filas con propiedades separadas
      return null; // Retornamos null ya que manejaremos las biserias en una función separada
    } else {
      // Para ejercicios normales, mostrar una sola fila
      return (
        <motion.li variants={itemVariants} className={styleDisplayFlex}>
          <span className="fw-semibold">{label}: </span>
          {
            !isEdit ?
              <>
                <span>{datosUsuario[propertyName]?.[0] || ""}</span>
                <span>- {datosUsuario[propertyName]?.[1] || ""}</span>
                <span>- {datosUsuario[propertyName]?.[2] || ""}</span>
                <span>- {datosUsuario[propertyName]?.[3] || ""}</span>
                <span>- {datosUsuario[propertyName]?.[4] || ""}</span>
              </>
            :
              <>
                <input type={inputType} className="form-control p-1" value={datosUsuario[propertyName]?.[0] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, propertyName, e.target.value, 0 )}/>
                <input type={inputType} className="form-control p-1" value={datosUsuario[propertyName]?.[1] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, propertyName, e.target.value, 1 )}/>
                <input type={inputType} className="form-control p-1" value={datosUsuario[propertyName]?.[2] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, propertyName, e.target.value, 2 )}/>
                <input type={inputType} className="form-control p-1" value={datosUsuario[propertyName]?.[3] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, propertyName, e.target.value, 3 )}/>
                <input type={inputType} className="form-control p-1" value={datosUsuario[propertyName]?.[4] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, propertyName, e.target.value, 4 )}/>
              </>
          }
          {propertyName === "kilos" && <span>Kg</span>}
        </motion.li>
      );
    }
  };

  // Función para renderizar los datos agrupados de biserie
  const renderBiserieDataGroups = () => {
    if (!datosUsuario.biserie) return null;

    return (
      <>
        {/* Grupo 1: Datos del primer ejercicio */}
        <motion.li variants={itemVariants} className={`${styleDisplayFlex} mt-3 fw-bold`} style={{ color: colorPrecalentamiento().customTextColor }}>
          EJERCICIO 1: {datosUsuario.ejercicio1 || ""}
        </motion.li>

        <motion.li variants={itemVariants} className={styleDisplayFlex}>
          <span className="fw-semibold">SERIES: </span>
          {
            !isEdit ?
              <>
                <span>{datosUsuario.series1?.[0] || ""}</span>
                <span>- {datosUsuario.series1?.[1] || ""}</span>
                <span>- {datosUsuario.series1?.[2] || ""}</span>
                <span>- {datosUsuario.series1?.[3] || ""}</span>
                <span>- {datosUsuario.series1?.[4] || ""}</span>
              </>
            :
              <>
                <input type="number" className="form-control p-1" value={datosUsuario.series1?.[0] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "series1", e.target.value, 0 )}/>
                <input type="number" className="form-control p-1" value={datosUsuario.series1?.[1] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "series1", e.target.value, 1 )}/>
                <input type="number" className="form-control p-1" value={datosUsuario.series1?.[2] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "series1", e.target.value, 2 )}/>
                <input type="number" className="form-control p-1" value={datosUsuario.series1?.[3] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "series1", e.target.value, 3 )}/>
                <input type="number" className="form-control p-1" value={datosUsuario.series1?.[4] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "series1", e.target.value, 4 )}/>
              </>
          }
        </motion.li>

        <motion.li variants={itemVariants} className={styleDisplayFlex}>
          <span className="fw-semibold">REPS: </span>
          {
            !isEdit ?
              <>
                <span>{datosUsuario.reps1?.[0] || ""}</span>
                <span>- {datosUsuario.reps1?.[1] || ""}</span>
                <span>- {datosUsuario.reps1?.[2] || ""}</span>
                <span>- {datosUsuario.reps1?.[3] || ""}</span>
                <span>- {datosUsuario.reps1?.[4] || ""}</span>
              </>
            :
              <>
                <input type="text" className="form-control p-1" value={datosUsuario.reps1?.[0] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "reps1", e.target.value, 0 )}/>
                <input type="text" className="form-control p-1" value={datosUsuario.reps1?.[1] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "reps1", e.target.value, 1 )}/>
                <input type="text" className="form-control p-1" value={datosUsuario.reps1?.[2] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "reps1", e.target.value, 2 )}/>
                <input type="text" className="form-control p-1" value={datosUsuario.reps1?.[3] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "reps1", e.target.value, 3 )}/>
                <input type="text" className="form-control p-1" value={datosUsuario.reps1?.[4] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "reps1", e.target.value, 4 )}/>
              </>
          }
        </motion.li>

        <motion.li variants={itemVariants} className={styleDisplayFlex}>
          <span className="fw-semibold">KILOS: </span>
          {
            !isEdit ?
              <>
                <span>{datosUsuario.kilos1?.[0] || ""}</span>
                <span>- {datosUsuario.kilos1?.[1] || ""}</span>
                <span>- {datosUsuario.kilos1?.[2] || ""}</span>
                <span>- {datosUsuario.kilos1?.[3] || ""}</span>
                <span>- {datosUsuario.kilos1?.[4] || ""}</span>
              </>
            :
              <>
                <input type="number" className="form-control p-1" value={datosUsuario.kilos1?.[0] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "kilos1", e.target.value, 0 )}/>
                <input type="number" className="form-control p-1" value={datosUsuario.kilos1?.[1] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "kilos1", e.target.value, 1 )}/>
                <input type="number" className="form-control p-1" value={datosUsuario.kilos1?.[2] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "kilos1", e.target.value, 2 )}/>
                <input type="number" className="form-control p-1" value={datosUsuario.kilos1?.[3] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "kilos1", e.target.value, 3 )}/>
                <input type="number" className="form-control p-1" value={datosUsuario.kilos1?.[4] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "kilos1", e.target.value, 4 )}/>
              </>
          }
          <span>Kg</span>
        </motion.li>

        {
          !datosUsuario.precalentamiento && (
            <motion.li variants={itemVariants} className={styleDisplayFlex}>
              <span className="fw-semibold">
                {isEdit ? (
                  <select 
                    className="form-select form-select-sm fw-semibold" 
                    style={{width: "75px"}}
                    onChange={handleChangeTipoMedicion} 
                    value={tipoMedicion}
                  >
                    <option value="RIR">RIR</option>
                    <option value="RPE">RPE</option>
                    <option value="1RM">1RM</option>
                    <option value="RM">RM</option>
                  </select>
                ) : (
                  `${datosUsuario?.tipoMedicion || "RIR"}: `
                )}
              </span>
              {
                !isEdit ?
                  <>
                    <span>{renderValueWithSymbol(datosUsuario.rir1?.[0], tipoMedicion)}</span>
                    <span>- {renderValueWithSymbol(datosUsuario.rir1?.[1], tipoMedicion)}</span>
                    <span>- {renderValueWithSymbol(datosUsuario.rir1?.[2], tipoMedicion)}</span>
                    <span>- {renderValueWithSymbol(datosUsuario.rir1?.[3], tipoMedicion)}</span>
                    <span>- {renderValueWithSymbol(datosUsuario.rir1?.[4], tipoMedicion)}</span>
                  </>
                :
                  <>
                    <input type="text" className="form-control p-1" value={datosUsuario.rir1?.[0] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "rir1", e.target.value, 0 )}/>
                    <input type="text" className="form-control p-1" value={datosUsuario.rir1?.[1] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "rir1", e.target.value, 1 )}/>
                    <input type="text" className="form-control p-1" value={datosUsuario.rir1?.[2] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "rir1", e.target.value, 2 )}/>
                    <input type="text" className="form-control p-1" value={datosUsuario.rir1?.[3] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "rir1", e.target.value, 3 )}/>
                    <input type="text" className="form-control p-1" value={datosUsuario.rir1?.[4] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "rir1", e.target.value, 4 )}/>
                  </>
              }
            </motion.li>
          )
        }

        {/* Grupo 2: Datos del segundo ejercicio */}
        <motion.li variants={itemVariants} className={`${styleDisplayFlex} mt-3 fw-bold`} style={{ color: colorPrecalentamiento().customTextColor }}>
          EJERCICIO 2: {datosUsuario.ejercicio2 || ""}
        </motion.li>

        <motion.li variants={itemVariants} className={styleDisplayFlex}>
          <span className="fw-semibold">SERIES: </span>
          {
            !isEdit ?
              <>
                <span>{datosUsuario.series2?.[0] || ""}</span>
                <span>- {datosUsuario.series2?.[1] || ""}</span>
                <span>- {datosUsuario.series2?.[2] || ""}</span>
                <span>- {datosUsuario.series2?.[3] || ""}</span>
                <span>- {datosUsuario.series2?.[4] || ""}</span>
              </>
            :
              <>
                <input type="number" className="form-control p-1" value={datosUsuario.series2?.[0] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "series2", e.target.value, 0 )}/>
                <input type="number" className="form-control p-1" value={datosUsuario.series2?.[1] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "series2", e.target.value, 1 )}/>
                <input type="number" className="form-control p-1" value={datosUsuario.series2?.[2] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "series2", e.target.value, 2 )}/>
                <input type="number" className="form-control p-1" value={datosUsuario.series2?.[3] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "series2", e.target.value, 3 )}/>
                <input type="number" className="form-control p-1" value={datosUsuario.series2?.[4] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "series2", e.target.value, 4 )}/>
              </>
          }
        </motion.li>

        <motion.li variants={itemVariants} className={styleDisplayFlex}>
          <span className="fw-semibold">REPS: </span>
          {
            !isEdit ?
              <>
                <span>{datosUsuario.reps2?.[0] || ""}</span>
                <span>- {datosUsuario.reps2?.[1] || ""}</span>
                <span>- {datosUsuario.reps2?.[2] || ""}</span>
                <span>- {datosUsuario.reps2?.[3] || ""}</span>
                <span>- {datosUsuario.reps2?.[4] || ""}</span>
              </>
            :
              <>
                <input type="text" className="form-control p-1" value={datosUsuario.reps2?.[0] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "reps2", e.target.value, 0 )}/>
                <input type="text" className="form-control p-1" value={datosUsuario.reps2?.[1] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "reps2", e.target.value, 1 )}/>
                <input type="text" className="form-control p-1" value={datosUsuario.reps2?.[2] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "reps2", e.target.value, 2 )}/>
                <input type="text" className="form-control p-1" value={datosUsuario.reps2?.[3] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "reps2", e.target.value, 3 )}/>
                <input type="text" className="form-control p-1" value={datosUsuario.reps2?.[4] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "reps2", e.target.value, 4 )}/>
              </>
          }
        </motion.li>

        <motion.li variants={itemVariants} className={styleDisplayFlex}>
          <span className="fw-semibold">KILOS: </span>
          {
            !isEdit ?
              <>
                <span>{datosUsuario.kilos2?.[0] || ""}</span>
                <span>- {datosUsuario.kilos2?.[1] || ""}</span>
                <span>- {datosUsuario.kilos2?.[2] || ""}</span>
                <span>- {datosUsuario.kilos2?.[3] || ""}</span>
                <span>- {datosUsuario.kilos2?.[4] || ""}</span>
              </>
            :
              <>
                <input type="number" className="form-control p-1" value={datosUsuario.kilos2?.[0] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "kilos2", e.target.value, 0 )}/>
                <input type="number" className="form-control p-1" value={datosUsuario.kilos2?.[1] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "kilos2", e.target.value, 1 )}/>
                <input type="number" className="form-control p-1" value={datosUsuario.kilos2?.[2] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "kilos2", e.target.value, 2 )}/>
                <input type="number" className="form-control p-1" value={datosUsuario.kilos2?.[3] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "kilos2", e.target.value, 3 )}/>
                <input type="number" className="form-control p-1" value={datosUsuario.kilos2?.[4] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "kilos2", e.target.value, 4 )}/>
              </>
          }
          <span>Kg</span>
        </motion.li>

        {
          !datosUsuario.precalentamiento && (
            <motion.li variants={itemVariants} className={styleDisplayFlex}>
              <span className="fw-semibold">
                {isEdit ? (
                  <select 
                    className="form-select form-select-sm fw-semibold" 
                    style={{width: "75px"}} 
                    onChange={handleChangeTipoMedicion2} 
                    value={tipoMedicion2}
                  >
                    <option value="RIR">RIR</option>
                    <option value="RPE">RPE</option>
                    <option value="1RM">1RM</option>
                    <option value="RM">RM</option>
                  </select>
                ) : (
                  `${datosUsuario?.tipoMedicion2 || "RIR"}: `
                )}
              </span>
              {
                !isEdit ?
                  <>
                    <span>{renderValueWithSymbol(datosUsuario.rir2?.[0], tipoMedicion2)}</span>
                    <span>- {renderValueWithSymbol(datosUsuario.rir2?.[1], tipoMedicion2)}</span>
                    <span>- {renderValueWithSymbol(datosUsuario.rir2?.[2], tipoMedicion2)}</span>
                    <span>- {renderValueWithSymbol(datosUsuario.rir2?.[3], tipoMedicion2)}</span>
                    <span>- {renderValueWithSymbol(datosUsuario.rir2?.[4], tipoMedicion2)}</span>
                  </>
                :
                  <>
                    <input type="text" className="form-control p-1" value={datosUsuario.rir2?.[0] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "rir2", e.target.value, 0 )}/>
                    <input type="text" className="form-control p-1" value={datosUsuario.rir2?.[1] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "rir2", e.target.value, 1 )}/>
                    <input type="text" className="form-control p-1" value={datosUsuario.rir2?.[2] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "rir2", e.target.value, 2 )}/>
                    <input type="text" className="form-control p-1" value={datosUsuario.rir2?.[3] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "rir2", e.target.value, 3 )}/>
                    <input type="text" className="form-control p-1" value={datosUsuario.rir2?.[4] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "rir2", e.target.value, 4 )}/>
                  </>
              }
            </motion.li>
          )
        }
      </>
    );
  };

  // Función para renderizar el nombre del ejercicio
  const renderEjercicioNombre = () => {
    if (datosUsuario.biserie) {
      return (
        <motion.li variants={itemVariants} className={`${styleDisplayFlex} ${isEdit ? "bg-white" : `${colorPrecalentamiento().backGroundColor}`} borde-3 ${colorPrecalentamiento().borderColor} border-top-0 border-end-0 border-start-0 `} >
          <div className="d-flex justify-content-between align-items-center gap-2 w-100">
            <div onClick={() => {if(!isEdit) setShow(false)}} className="d-flex align-items-center gap-2 w-100">
              <span className="fw-semibold">BISERIE: </span>
              { !isEdit ? 
                <span className="fw-semibold" style={{ color: colorPrecalentamiento().customTextColor }} onClick={() => setShow(false)}>
                  {datosUsuario.ejercicio1 || ""} + {datosUsuario.ejercicio2 || ""}
                </span> 
                : 
                <>
                  <input type="text" className="form-control p-1 me-1" placeholder="Ejercicio 1" value={datosUsuario.ejercicio1 || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "ejercicio1", e.target.value)}/>
                  <span>+</span>
                  <input type="text" className="form-control p-1 ms-1" placeholder="Ejercicio 2" value={datosUsuario.ejercicio2 || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "ejercicio2", e.target.value)}/>
                </>
              }
            </div>
            <button type="button" className="btn btn-link px-1 d-flex aling-item-center" onClick={() => setIsEdit(!isEdit)}>
              {
                isEdit ? <CheckOkEdit /> : <Edit />
              }
            </button>
          </div>
        </motion.li>
      );
    } else {
      return (
        <motion.li variants={itemVariants} className={`${styleDisplayFlex} ${isEdit ? "bg-white" : `${colorPrecalentamiento().backGroundColor}`} borde-3 ${colorPrecalentamiento().borderColor} border-top-0 border-end-0 border-start-0 `} >
          <div className="d-flex justify-content-between align-items-center gap-2 w-100" >
            <div onClick={() => {if(!isEdit) setShow(false)}} className="d-flex align-items-center gap-2 w-100">
              <span className="fw-semibold">EJERCICIO: </span>
              { !isEdit ? 
                <span className={`${colorPrecalentamiento().textColor} fw-semibold`} onClick={() => setShow(false)}>{datosUsuario.ejercicio || ""}</span> 
                : 
                <input type="text" className="form-control p-1" value={datosUsuario.ejercicio || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "ejercicio", e.target.value)}/>}
            </div>
            <button type="button" className="btn btn-link px-1 d-flex aling-item-center" onClick={() => setIsEdit(!isEdit)}>
              {
                isEdit ? <CheckOkEdit /> : <Edit />
              }
            </button>
          </div>
        </motion.li>
      );
    }
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
          <span className="fw-semibold col-11" onClick={() => setShow(!show)}>
            {!datosUsuario.ejercicio && !datosUsuario.ejercicio1 ? 
              <span className="text-secondary fst-italic"><ChevronRight/> {
                datosUsuario.precalentamiento ? "Nuevo calentamiento" 
                : datosUsuario.biserie ? "Nuevo biserie" 
                : "Nuevo ejercicio"
              }</span> 
              : 
              <span className={datosUsuario.biserie ? "" : colorPrecalentamiento().textColor} style={datosUsuario.biserie ? {color: colorPrecalentamiento().customTextColor} : {}}><ChevronRight/> {
                datosUsuario.biserie ? 
                (datosUsuario.ejercicio1 || "Ejercicio 1") + " + " + (datosUsuario.ejercicio2 || "Ejercicio 2") 
                : datosUsuario.ejercicio
              }</span>
            }
          </span>
          
          <button 
            type="button" 
            className="btn-close col" 
            data-bs-dismiss="modal" 
            aria-label="Close" 
            onClick={() => handleRemoveEjercicio(dia, index)}
            disabled={isRemoving}
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
            {renderEjercicioNombre()}

            {/* Si es biserie, renderizar los datos agrupados por ejercicio */}
            {datosUsuario.biserie ? 
              renderBiserieDataGroups() : 
              <>
                {renderEjercicioData("series", "SERIES")}
                {renderEjercicioData("reps", "REPS", "text")}
              </>
            }

            <motion.li variants={itemVariants} className={styleDisplayFlex}>
              <span className="fw-semibold">{datosUsuario.precalentamiento ? "TIEMPO:" : "DESCANSO:"} </span>
              {
                !isEdit ?
                  <>
                    <span>{datosUsuario.descanso}</span>
                  </>
                :
                <input type="number" className="form-control p-1" id="" value={datosUsuario.descanso || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "descanso", e.target.value)}/>
              }
              <span>min</span>
            </motion.li>

            {/* Si NO es biserie, renderizar Kilos y RIR normales */}
            {!datosUsuario.biserie && (
              <>
                {renderEjercicioData("kilos", "KILOS")}
                {!datosUsuario.precalentamiento && (
                  <motion.li variants={itemVariants} className={styleDisplayFlex}>
                    <span className="fw-semibold">
                      {isEdit ? (
                        <select 
                          className="form-select form-select-sm fw-semibold" 
                          style={{width: "75px"}}
                          onChange={handleChangeTipoMedicion} 
                          value={tipoMedicion}
                        >
                          <option value="RIR">RIR</option>
                          <option value="RPE">RPE</option>
                          <option value="1RM">1RM</option>
                          <option value="RM">RM</option>
                        </select>
                      ) : (
                        `${datosUsuario?.tipoMedicion || "RIR"}: `
                      )}
                    </span>
                    {
                      !isEdit ?
                        <>
                          <span>{renderValueWithSymbol(datosUsuario.rir?.[0], tipoMedicion)}</span>
                          <span>- {renderValueWithSymbol(datosUsuario.rir?.[1], tipoMedicion)}</span>
                          <span>- {renderValueWithSymbol(datosUsuario.rir?.[2], tipoMedicion)}</span>
                          <span>- {renderValueWithSymbol(datosUsuario.rir?.[3], tipoMedicion)}</span>
                          <span>- {renderValueWithSymbol(datosUsuario.rir?.[4], tipoMedicion)}</span>
                        </>
                      :
                        <>
                          <input type="text" className="form-control p-1" value={datosUsuario.rir?.[0] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "rir", e.target.value, 0 )}/>
                          <input type="text" className="form-control p-1" value={datosUsuario.rir?.[1] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "rir", e.target.value, 1 )}/>
                          <input type="text" className="form-control p-1" value={datosUsuario.rir?.[2] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "rir", e.target.value, 2 )}/>
                          <input type="text" className="form-control p-1" value={datosUsuario.rir?.[3] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "rir", e.target.value, 3 )}/>
                          <input type="text" className="form-control p-1" value={datosUsuario.rir?.[4] || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "rir", e.target.value, 4 )}/>
                        </>
                    }
                  </motion.li>
                )}
              </>
            )}

            <motion.li variants={itemVariants} className={styleDisplayFlex}>
              <span className="fw-semibold">METODO: </span>
              {
                !isEdit ?
                  <>
                    <span>{datosUsuario.metodo || ""}</span>
                  </>
                :
                <input type="text" className="form-control p-1" id="" value={datosUsuario.metodo || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "metodo", e.target.value)}/>
              }
            </motion.li>

            <motion.li variants={itemVariants} className={styleDisplayFlex}>
              <span className="fw-semibold">OBS: </span>
              {
                !isEdit ?
                  <>
                    <span>{datosUsuario.observaciones || ""}</span>
                  </>
                :
                <input type="text" className="form-control p-1" id="" value={datosUsuario.observaciones || ""} onChange={(e) => handleSetDatosUsuario(dia, index, "observaciones", e.target.value)}/>
              }
            </motion.li>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.ul>
  );
};
