
import { Loader } from "../Loader/Loader";
import { ArrowBack } from "../icons/ArrowBack";
import { Exit } from "../icons/Exit";
import { Update } from "../icons/Update";
import "./Buttons.css"
export const Button = ({msg, estilo = "btn btn-primary", loading = false, functionHandle = null}) => {

    const resolution = window.screen.width > 600
    const mensaje = (!resolution && estilo === "cerrar") ? "" : msg

    let icono;

    let colorButton = "btn btn-primary";
    if (estilo === "eliminar") colorButton = "btn btn-danger";
    if (estilo === "aprobar") colorButton = "btn btn-success aprobar";
    if (estilo === "actualizar") colorButton = "btn btn-outline-primary actualizar";
    if (estilo === "cerrar") colorButton = "btn btn-outline-danger actualizar";
    if (estilo === "editar") colorButton = "btn btn-outline-success";
    if (estilo === "volver") colorButton = "btn btn-outline-success d-flex align-items-center";


  return (
    <button type="button" className={colorButton} data-bs-dismiss="modal" disabled={loading} onClick={functionHandle}>
      {/* {estilo === "actualizar" && <Update />}
      {estilo === "cerrar" && <Exit />} */}

      {loading ? (
        <Loader />
      ) : (
        <>
          {estilo === "actualizar" && <Update />}
          {estilo === "cerrar" && <Exit />}
          {estilo === "volver" && <ArrowBack />}

          <span> {mensaje}</span>
        </>
      )}
    </button>
  );
};
