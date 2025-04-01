import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useContext } from "react"
import "./ModalViewBodyPagos.css"
import { LoginContext } from "../../../context/LoginContext"
import { Button } from "../../Atoms/Button/Button"
import { Edit } from "../../Atoms/icons/Edit"
import { CheckOkEdit } from "../../Atoms/icons/CheckOkEdit"

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}

const accordionVariants = {
  open: { 
    opacity: 1, 
    height: "auto",
    transition: { 
      height: { 
        duration: 0.4, 
        ease: "easeOut" 
      },
      opacity: { 
        duration: 0.3,
        ease: "easeIn" 
      }
    }
  },
  closed: { 
    opacity: 0, 
    height: 0,
    overflow: "hidden",
    transition: { 
      height: { 
        duration: 0.4, 
        ease: "easeInOut" 
      },
      opacity: { 
        duration: 0.2,
        ease: "easeOut" 
      }
    }
  }
}



export const ModalViewBodyPagos = ({datosUsuario, setDatosUsuario}) => {
  const [pagos, setPagos] = useState(datosUsuario.pagos || []);
  const [openItemId, setOpenItemId] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [confirmEliminar, setConfirmEliminar] = useState(null);
  const { state, dispatch } = useContext(LoginContext);

  useEffect(() => {
    setPagos(datosUsuario.pagos || []);
  }, [datosUsuario.pagos]);

  const handleToggleItem = (id) => {
    // Si el pago está en modo edición, no permitir cerrarlo
    if (editItemId === id && openItemId === id) {
      return;
    }
    
    // Si hay un pago en edición, no permitir cerrarlo al abrir otro
    if (editItemId !== null && openItemId === editItemId && id !== editItemId) {
      // Abrir el nuevo pago sin cerrar el que está en edición
      setOpenItemId(id);
    } else {
      // Comportamiento normal - alternar el acordeón
      setOpenItemId(openItemId === id ? null : id);
    }
  };

  const formatearFecha = (fechaStr) => {
    // Crear fecha en formato yyyy-mm-dd
    const [year, month, day] = fechaStr.split('-');
    // Crear la fecha asegurándonos de que los componentes sean numéricos
    const fecha = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatearMonto = (monto) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(monto);
  };

  const handleAgregarPago = () => {
    // Obtener fecha actual
    const fechaActual = new Date();
    
    // Formatear fecha para el nuevo pago
    const fechaFormateada = fechaActual.toISOString().split('T')[0];
    
    // Crear nuevo pago
    const nuevoPago = {
      id: pagos.length > 0 ? Math.max(...pagos.map(p => p.id)) + 1 : 1,
      fecha: fechaFormateada,
      monto: 0,
      metodoPago: "Efectivo",
      estado: "Pendiente",
      concepto: `${obtenerNombreMes(fechaActual.getMonth())}`,
      comprobante: "-",
      observaciones: "",
      fechaVencimiento: ""
    };
    
    // Agregar nuevo pago al principio de la lista solo en el estado local
    const nuevosPagos = [nuevoPago, ...pagos];
    setPagos(nuevosPagos);
    
    // Ya no actualizamos datosUsuario aquí
    // Esto se hará en handleAprobarEdicion
    
    // Abrir el nuevo pago automáticamente y activar modo edición
    setOpenItemId(nuevoPago.id);
    setEditItemId(nuevoPago.id);
  };
  
  const obtenerNombreMes = (numeroMes) => {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[numeroMes];
  };

  const handleEliminarPago = (id) => {
    if (confirmEliminar === id) {
      // Verificar si el pago existe en datosUsuario.pagos
      const pagoExisteEnDatosUsuario = datosUsuario.pagos.some(pago => pago.id === id);
      
      // Eliminar el pago del estado local
      const pagosFiltrados = pagos.filter(pago => pago.id !== id);
      setPagos(pagosFiltrados);
      
      // Actualizar datosUsuario.pagos solo si el pago ya existía allí
      if (pagoExisteEnDatosUsuario) {
        setDatosUsuario({
          ...datosUsuario,
          pagos: pagosFiltrados
        });
      }
      
      setConfirmEliminar(null);
      // Cerrar el acordeón si está abierto
      if (openItemId === id) {
        setOpenItemId(null);
      }
    } else {
      // Solicitar confirmación
      setConfirmEliminar(id);
    }
  };
  
  const handleCancelarEliminar = () => {
    setConfirmEliminar(null);
  };
  
  const handleEditarPago = (id) => {
    // No permitir editar ningún pago una vez creado
    return;
    
    // El siguiente código ya no se ejecutará
    // Asegurarse de que el acordeón esté abierto al editar
    if (openItemId !== id) {
      setOpenItemId(id);
    }
    
    if (editItemId === id) {
      // Terminar edición
      setEditItemId(null);
    } else {
      // Iniciar edición
      setEditItemId(id);
    }
  };
  
  const handleAprobarEdicion = (id) => {
    // Actualizar datosUsuario con los pagos actualizados
    setDatosUsuario({
      ...datosUsuario,
      pagos: pagos
    });
    
    // Finalizar la edición
    setEditItemId(null);
  };
  
  const handleCancelarEdicion = (id) => {
    // Si es un pago recién creado (pendiente), eliminarlo al cancelar
    if (pagos.find(p => p.id === id).estado === "Pendiente" && !pagos.find(p => p.id === id).monto) {
      const pagosFiltrados = pagos.filter(pago => pago.id !== id);
      setPagos(pagosFiltrados);
      
      // No actualizamos datosUsuario aquí ya que el pago nunca se agregó a datosUsuario.pagos
    }
    // Cancelar la edición
    setEditItemId(null);
  };
  
  const handleActualizarCampo = (id, campo, valor) => {
    const pagosActualizados = pagos.map(pago => {
      if (pago.id === id) {
        return { ...pago, [campo]: valor };
      }
      return pago;
    });
    
    // Solo actualizamos el estado local, no datosUsuario.pagos
    setPagos(pagosActualizados);
    
    // La actualización de datosUsuario.pagos se hará en handleAprobarEdicion
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <span className="custom-label mt-3">
          Historial de pagos
        </span>
      </div>
        <div className="container-button-add-pago mb-3">
          <Button msg={"Agregar Pago"} functionHandle={handleAgregarPago} />
        </div>
      
      {state.loading ? (
        <div className="skeleton-container">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton-item">
              <div className="skeleton-line-sm"></div>
              <div className="skeleton-line-xs"></div>
              <div className="skeleton-badge"></div>
              <div className="skeleton-line-md"></div>
            </div>
          ))}
        </div>
      ) : pagos.length === 0 ? (
        <div className="alert alert-info text-center my-4">
          No se registran pagos
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {pagos.map((pago) => (
            <motion.div 
              initial={"closed"} 
              animate={"open"} 
              exit={{
                opacity: 0,
                x: "-100%",
                height: 0,
                marginBottom: 0,
                transition: { duration: 0.3, ease: "easeInOut" }
              }} 
              variants={variants}  
              key={`pago${pago.id}`} 
              className="container-pago-item accordion mb-2"
            >
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button 
                    onClick={() => handleToggleItem(pago.id)} 
                    className={`bg-body-secondary position-relative p-3 accordion-button d-flex justify-content-between gap-3 ${editItemId === pago.id ? 'accordion-button-editing' : ''} ${openItemId === pago.id ? '' : 'collapsed'}`} 
                    type="button"
                    aria-expanded={openItemId === pago.id}
                  >
                    <div className="overflow-x-hidden overflow-y-hidden">
                      <motion.span initial={{opacity: 0}} animate={{opacity: 1}}>
                        {editItemId === pago.id ? (
                          <input 
                            type="text" 
                            className="form-control" 
                            value={pago.concepto}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => handleActualizarCampo(pago.id, "concepto", e.target.value)}
                          />
                        ) : (
                          <span className="fst-italic text-secondary">
                            {/* {formatearFecha(pago.fecha)}  */}
                            <span className="text-dark fw-bold"> {pago.concepto}</span>
                          </span>
                        )}
                      </motion.span>   
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span className={`pago-badge-estado ${pago.estado === "Pendiente" ? "pago-badge-estado-pendiente" : ""}`}>
                        {pago.estado}
                      </span>
                    </div>
                  </button>           
                </h2>
                <AnimatePresence>
                  {(openItemId === pago.id || editItemId === pago.id) && (
                    <motion.div 
                      key={`accordion-content-${pago.id}`}
                      initial="closed"
                      animate={editItemId === pago.id ? "open" : openItemId === pago.id ? "open" : "closed"}
                      exit="closed"
                      variants={accordionVariants}
                      className={`border border-secondary-subtle accordion-collapse ${editItemId === pago.id ? 'editing-active' : ''}`}
                    >
                      <div className="accordion-body py-1 px-1">    
                        <AnimatePresence mode="wait" initial={false}>
                          {(openItemId === pago.id || editItemId === pago.id) && (
                            <motion.div 
                              initial={{opacity: 0}}
                              animate={{opacity: 1}}
                              exit={{opacity: 0}}
                              className="collapse show"
                            >
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <th scope="row">Monto</th>
                                    <td>
                                      {editItemId === pago.id ? (
                                        <input 
                                          type="number" 
                                          className="form-control"
                                          value={pago.monto}
                                          onChange={(e) => handleActualizarCampo(pago.id, "monto", parseFloat(e.target.value))}
                                        />
                                      ) : (
                                        formatearMonto(pago.monto)
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Método de pago</th>
                                    <td>
                                      {editItemId === pago.id ? (
                                        <select 
                                          className="form-select"
                                          value={pago.metodoPago}
                                          onChange={(e) => handleActualizarCampo(pago.id, "metodoPago", e.target.value)}
                                        >
                                          <option value="Efectivo">Efectivo</option>
                                          <option value="Transferencia bancaria">Transferencia bancaria</option>
                                          <option value="Tarjeta de crédito">Tarjeta de crédito</option>
                                          <option value="Tarjeta de débito">Tarjeta de débito</option>
                                          <option value="Otro">Otro</option>
                                        </select>
                                      ) : (
                                        pago.metodoPago
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Comprobante</th>
                                    <td>
                                      {editItemId === pago.id ? (
                                        <input 
                                          type="text" 
                                          className="form-control"
                                          value={pago.comprobante}
                                          onChange={(e) => handleActualizarCampo(pago.id, "comprobante", e.target.value)}
                                        />
                                      ) : (
                                        pago.comprobante
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Fecha de pago</th>
                                    <td>
                                      {editItemId === pago.id ? (
                                        <input 
                                          type="date" 
                                          className="form-control"
                                          value={pago.fecha}
                                          onChange={(e) => handleActualizarCampo(pago.id, "fecha", e.target.value)}
                                        />
                                      ) : (
                                        formatearFecha(pago.fecha)
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Fecha de vencimiento</th>
                                    <td>
                                      {editItemId === pago.id ? (
                                        <input 
                                          type="date" 
                                          className="form-control"
                                          value={pago.fechaVencimiento || ""}
                                          onChange={(e) => handleActualizarCampo(pago.id, "fechaVencimiento", e.target.value)}
                                        />
                                      ) : (
                                        pago.fechaVencimiento ? formatearFecha(pago.fechaVencimiento) : "-"
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Estado</th>
                                    <td>
                                      {editItemId === pago.id ? (
                                        <div className="d-flex gap-2">
                                          <select 
                                            className="form-select"
                                            value={pago.estado}
                                            onChange={(e) => handleActualizarCampo(pago.id, "estado", e.target.value)}
                                          >
                                            <option value="Pendiente">Pendiente</option>
                                            <option value="Pagado">Pagado</option>
                                          </select>
                                          <span className={`pago-badge-estado align-self-center ${pago.estado === "Pendiente" ? "pago-badge-estado-pendiente" : ""}`}>
                                            {pago.estado}
                                          </span>
                                        </div>
                                      ) : (
                                        <span className={`pago-badge-estado ${pago.estado === "Pendiente" ? "pago-badge-estado-pendiente" : ""}`}>
                                          {pago.estado}
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div className="px-2 pb-2 text-start m-0">
                                <span className="fw-semibold">Observaciones: </span> 
                                {editItemId === pago.id ? (
                                  <textarea 
                                    className="form-control mt-1"
                                    value={pago.observaciones}
                                    onChange={(e) => handleActualizarCampo(pago.id, "observaciones", e.target.value)}
                                  />
                                ) : (
                                  <span>{pago.observaciones}</span>
                                )}
                              </div>
                              
                              {/* Botones para eliminar el pago */}
                              {editItemId === pago.id ? (
                                <motion.div 
                                  initial={{opacity: 0}} 
                                  animate={{opacity: 1}}
                                  className="d-flex gap-2 w-100 mb-2"
                                >
                                  <motion.button 
                                    type="button" 
                                    className="btn btn-success flex-grow-1" 
                                    onClick={() => handleAprobarEdicion(pago.id)}
                                  >
                                    Aprobar cambios
                                  </motion.button>
                                  <motion.button 
                                    type="button" 
                                    className="btn btn-secondary flex-grow-1" 
                                    onClick={() => handleCancelarEdicion(pago.id)}
                                  >
                                    Cancelar
                                  </motion.button>
                                </motion.div>
                              ) : (
                                <div className="d-flex gap-2 w-100 mb-2">
                                  {(!confirmEliminar || confirmEliminar !== pago.id) ? (
                                    <motion.button
                                      initial={{opacity: 0}}
                                      animate={{opacity: 1}}
                                      type="button"
                                      className="btn btn-warning flex-grow-1"
                                      onClick={() => handleEliminarPago(pago.id)}
                                    >
                                      Eliminar pago
                                    </motion.button>
                                  ) : (
                                    <motion.div
                                      initial={{opacity: 0}}
                                      animate={{opacity: 1}}
                                      className="d-flex justify-content-around align-items-center flex-grow-1"
                                    >
                                      <span className="fw-medium">¿Estás seguro?</span>
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={handleCancelarEliminar}
                                      >
                                        Cancelar
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleEliminarPago(pago.id)}
                                      >
                                        SI
                                      </button>
                                    </motion.div>
                                  )}
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>           
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </>
  );
} 