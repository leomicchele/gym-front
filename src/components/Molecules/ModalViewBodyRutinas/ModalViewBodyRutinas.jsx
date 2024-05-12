import { useState } from "react";
import { ArrowDown } from "../../Atoms/icons/ArrowDown";
import { ArrowUpBar } from "../../Atoms/icons/ArrowUpBar";
import { motion, AnimatePresence } from "framer-motion"
import { Edit } from "../../Atoms/icons/Edit";
import { CheckOk } from "../../Atoms/icons/CheckOk";
import { CheckOkEdit } from "../../Atoms/icons/CheckOkEdit";
import { ChevronRight } from "../../Atoms/icons/ChevronRight";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}


export const ModalViewBodyRutinas = ({
  datosUsuario,
  handleSetDatosUsuario,
  handleRemoveEjercicio,
  // isEdit,
  dia,
  index
}) => {
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const styleDisplayNone = "d-none"
  const styleDisplayFlex = "list-group-item d-flex align-items-center gap-2"

  return (                  
    <motion.ul initial={"closed"} animate={"open"} exit={"closed"} variants={variants} className="list-group fs-6 text-start mb-2 border border-success" id="card-ejercicio">
      <li className={`list-group-item-action list-group-item-success d-flex ${!show ? styleDisplayFlex : styleDisplayNone} `} >
          <span className="fw-semibold col-11" onClick={() => setShow(true)}>{!datosUsuario.ejercicio ? <span className="text-secondary fst-italic"><ChevronRight/> Nuevo ejercicio</span> : <span className="text-success"><ChevronRight/> {datosUsuario.ejercicio}</span> }</span>
          {/* <button type="button" className="btn-close col" data-bs-dismiss="modal" aria-label="Close" onClick={(e) => handleRemoveEjercicioCSS(e)}></button> */}
          
          <button type="button" className="btn-close col" data-bs-dismiss="modal" aria-label="Close" onClick={() => handleRemoveEjercicio(dia, index)}></button>
        
      </li>
      
      <li  className={show ? `${styleDisplayFlex} ${isEdit ? "bg-white" : "bg-success-subtle"} borde-3 border-success border-top-0 border-end-0 border-start-0 ` : styleDisplayNone} >
        <div className="d-flex justify-content-between align-items-center gap-2 w-100 " >
          <div onClick={() => {if(!isEdit) setShow(false)}} className="d-flex  align-items-center gap-2 w-100 ">
            <span className="fw-semibold" >EJERCICIO: </span>
            { !isEdit ? 
              <span className="text-success" onClick={() => setShow(false)}>{datosUsuario.ejercicio}</span> 
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


      </li>
      <li className={show ? styleDisplayFlex : styleDisplayNone}>
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
        
      </li>
      <li className={show ? styleDisplayFlex : styleDisplayNone}>
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
      </li>
      <li className={show ? styleDisplayFlex : styleDisplayNone}>
        <span className="fw-semibold">DESCANSO: </span>
        {
          !isEdit ?
            <>
              <span>{datosUsuario.descanso}</span>
            </>
          :
          <input type="number" className="form-control p-1" id="" value={datosUsuario.descanso} onChange={(e) => handleSetDatosUsuario(dia, index, "descanso", e.target.value)}/>
        }
        <span>min</span>
      </li>
      <li className={show ? styleDisplayFlex : styleDisplayNone}>
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
      </li>
      <li className={show ? styleDisplayFlex : styleDisplayNone}>
        <span className="fw-semibold">R.I.R: </span>
        {
          !isEdit ?
          <>
            <span>{datosUsuario?.rir?.[0] || ""}</span>
            <span>- {datosUsuario?.rir?.[1] || ""}</span>
            <span>- {datosUsuario?.rir?.[2] || ""}</span>
            <span>- {datosUsuario?.rir?.[3] || ""}</span>
            <span>- {datosUsuario?.rir?.[4] || ""}</span>
          </>
          :
            <>
              <input type="text" className="form-control p-1" id="" value={datosUsuario.rir?.[0]} onChange={(e) => handleSetDatosUsuario(dia, index, "rir", e.target.value, 0 )}/>
              <input type="text" className="form-control p-1" id="" value={datosUsuario.rir?.[1]} onChange={(e) => handleSetDatosUsuario(dia, index, "rir", e.target.value, 1 )}/>
              <input type="text" className="form-control p-1" id="" value={datosUsuario.rir?.[2]} onChange={(e) => handleSetDatosUsuario(dia, index, "rir", e.target.value, 2 )}/>
              <input type="text" className="form-control p-1" id="" value={datosUsuario.rir?.[3]} onChange={(e) => handleSetDatosUsuario(dia, index, "rir", e.target.value, 3 )}/>
              <input type="text" className="form-control p-1" id="" value={datosUsuario.rir?.[4]} onChange={(e) => handleSetDatosUsuario(dia, index, "rir", e.target.value, 4 )}/>
            </>
        }
        <span></span>
      </li>
      <li className={show ? styleDisplayFlex : styleDisplayNone}>
        <span className="fw-semibold">METODO: </span>
        {
          !isEdit ?
            <>
              <span>{datosUsuario.metodo}</span>
            </>
          :
          <input type="text" className="form-control p-1" id="" value={datosUsuario.metodo} onChange={(e) => handleSetDatosUsuario(dia, index, "metodo", e.target.value)}/>
        }
      </li>
      <li className={show ? styleDisplayFlex : styleDisplayNone}>
        <span className="fw-semibold">OBS: </span>
        {
          !isEdit ?
            <>
              <span>{datosUsuario.observaciones}</span>
            </>
          :
          <input type="text" className="form-control p-1" id="" value={datosUsuario.observaciones} onChange={(e) => handleSetDatosUsuario(dia, index, "observaciones", e.target.value)}/>
        }
      </li>
    </motion.ul>
  );
};
