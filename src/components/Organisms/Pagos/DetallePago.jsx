import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import TopBar from "../../Molecules/TopBar/TopBar";
import { LoginContext } from "../../../context/LoginContext";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./Pagos.css";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

export const DetallePago = () => {
  const { state, dispatch } = useContext(LoginContext);
  const [pagoSeleccionado, setPagoSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Verificar si se recibió el pago a través del estado de navegación
    if (location.state && location.state.pago) {
      setPagoSeleccionado(location.state.pago);
      setCargando(false);
    } else {
      // Si no hay pago en el estado, redirigir a la lista de pagos
      navigate("/menu/pagos");
    }
  }, [location, navigate]);

  const handleVolverLista = () => {
    navigate("/menu/pagos");
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

  if (cargando) {
    return (
      <motion.div
        initial={"closed"}
        animate={"open"}
        exit={"closed"}
        transition={{ duration: 0.5 }}
        variants={variants}
        className="container pagos-container"
      >
        <TopBar titulo="Detalle de Pago" ruta="/menu/pagos" />
        <div className="skeleton-container">
          <div className="skeleton-item">
            <div className="skeleton-line-sm"></div>
            <div className="skeleton-line-xs"></div>
            <div className="skeleton-badge"></div>
            <div className="skeleton-line-md"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={"closed"}
      animate={"open"}
      exit={"closed"}
      transition={{ duration: 0.5 }}
      variants={variants}
      className="container pagos-container"
    >
      <TopBar titulo="Detalle de Pago" ruta="/menu/pagos" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="detalle-container"
      >
        <div className="detalle-card">
          <div className="detalle-header">
            <div className="detalle-comprobante">
              <div className="comprobante-icon">
                <i className="receipt-icon">🧾</i>
              </div>
              <div className="comprobante-info">
                <h6>Comprobante N°  {pagoSeleccionado.comprobante}</h6>
                {/* <span className="detalle-fecha">{formatearFecha(pagoSeleccionado.fecha)}</span> */}
              </div>
            </div>
          </div>
          
          <div className="detalle-body">
            <div className="detalle-monto">
              <span className="monto-label">{pagoSeleccionado.estado === "Pendiente" ? "Total pendiente" : "Total pagado"}</span>
              <span className="monto-value">{formatearMonto(pagoSeleccionado.monto)}</span>
            </div>
            
            <div className="detalle-info-grid">
              <div className="detalle-info-item">
                <span className="info-label">Concepto</span>
                <span className="info-value">{pagoSeleccionado.concepto}</span>
              </div>
              <div className="detalle-info-item">
                <span className="info-label">Método de pago</span>
                <span className="info-value">{pagoSeleccionado.metodoPago}</span>
              </div>
              <div className="detalle-info-item">
                <span className="info-label">Fecha de pago</span>
                <span className="info-value">{formatearFecha(pagoSeleccionado.fecha)}</span>
              </div>
              <div className="detalle-info-item">
                <span className="info-label">Fecha de vencimiento</span>
                <span className="info-value">{pagoSeleccionado.fechaVencimiento ? formatearFecha(pagoSeleccionado.fechaVencimiento) : "No tiene fecha de vencimiento"}</span>
              </div>
              <div className="detalle-info-item" style={{ gridColumn: "1 / -1" }}>
                <span className="info-label">Observaciones</span>
                <span className="info-value">{pagoSeleccionado.observaciones}</span>
              </div>
            </div>

            <div className="detalle-footer">
              <button onClick={handleVolverLista} className="btn-volver">
                Volver
              </button>
              {pagoSeleccionado.estado === "Pagado" && <button className="btn-descargar btn-secondary">
                Descargar comprobante
              </button>}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}; 