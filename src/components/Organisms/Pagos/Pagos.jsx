import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import TopBar from "../../Molecules/TopBar/TopBar";
import { LoginContext } from "../../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import "./Pagos.css";
import { getPagos } from "../../helpers/fetch";
import { getSessionStorage } from "../../helpers/storage";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};


export const Pagos = () => {
  const { state, dispatch } = useContext(LoginContext);
  const {id} = getSessionStorage()
  const [pagos, setPagos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleTraerPagos = async() => {
    dispatch({ type: "LOADING" });
    try {
      const response = await getPagos({_id: id})
      setPagos(response.pagos)
      setError(null);
      dispatch({ type: "SUCCESS" });
    } catch (error) {
      console.log({error})
      setError("No se pudieron cargar los pagos. Por favor, intenta nuevamente más tarde.");
      dispatch({ type: "ERROR" });
    }
    }
    handleTraerPagos()
  }, [])

  const handleVerDetalle = (pago) => {
    // Navegar a la pantalla de detalles, pasando el pago seleccionado como estado
    navigate("/menu/pagos/detalles", { state: { pago } });
  };

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return "No disponible";
    
    // Dividir la fecha en partes (formato esperado: YYYY-MM-DD)
    const [year, month, day] = fechaStr.split('-');
    
    // Crear y formatear la fecha manualmente para evitar problemas de zona horaria
    return `${day}/${month}/${year}`;
  };

  const formatearMonto = (monto) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(monto);
  };

  // Obtener fecha actual para el resumen de pagos
  const obtenerMesActual = () => {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const fecha = new Date();
    return meses[fecha.getMonth()];
  };

  // Calcular montos totales del año
  const calcularTotalAnual = () => {
    return pagos.reduce((total, pago) => total + pago.monto, 0);
  };

  return (
    <motion.div
      initial={"closed"}
      animate={"open"}
      exit={"closed"}
      transition={{ duration: 0.5 }}
      variants={variants}
      className="container pagos-container"
    >
      <TopBar titulo="Mis Pagos" />
      
      <h6 className="text-uppercase text-dark fw-semibold text-start mb-1" style={{maxWidth: "800px", margin: "0 auto"}}>
        Historial de pagos
      </h6>
      <span className="text-start fst-italic d-flex w-100 mb-3" style={{maxWidth: "800px", margin: "0 auto"}}>
        Aquí podrás ver el historial de tus pagos y los detalles de cada uno.
      </span>

      {state.loading ? (
        <div className="skeleton-container" style={{maxWidth: "800px", margin: "0 auto"}}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton-item">
              <div className="skeleton-line-sm"></div>
              <div className="skeleton-line-xs"></div>
              <div className="skeleton-badge"></div>
              <div className="skeleton-line-md"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="alert alert-danger" style={{maxWidth: "800px", margin: "0 auto"}}>
          <p className="m-0">{error}</p>
        </div>
      ) :
        !pagos ? (
        <div className="alert alert-secondary" style={{maxWidth: "800px", margin: "0 auto"}}>
          <p className="m-0">No tienes pagos registrados.</p>
        </div>
      ) : 
      pagos && pagos.length === 0  ? (
        <div className="alert alert-secondary" style={{maxWidth: "800px", margin: "0 auto"}}>
          <p className="m-0">No tienes pagos registrados.</p>
        </div>
      ) : (
        <div className="pagos-list" style={{maxWidth: "800px", margin: "0 auto"}}>
          {pagos && pagos.map((pago) => (
            <div
              key={pago.id}
              className="pago-item"
              onClick={() => handleVerDetalle(pago)}
            >
              <div className="pago-info">
                {/* <div className="pago-concepto">{pago.concepto}</div> */}
                <h5 className="mb-0 text-start text-secondary fst-italic">{<span className="text-secondary fst-italic">{pago.concepto}</span>}</h5>
                {/* <div className="pago-fecha">{formatearFecha(pago.fecha)}</div> */}
              </div>
              <div className="pago-monto-container">
                <div className="pago-estado">
                  <span className={`pago-badge ${pago.estado === "Pendiente" ? "pago-badge-pendiente" : "pago-badge-pagado"}`}>{pago.estado}</span>
                </div>
                <div className="pago-monto">{formatearMonto(pago.monto)}</div>
              </div>
              <div className="pago-arrow">
                <i className="arrow-icon">›</i>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}; 