import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import "./ModalViewBodyHistorial.css"

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}

const accordionVariants = {
  open: { 
    opacity: 1, 
    height: "auto",
    transition: { duration: 0.4, ease: "easeInOut" }
  },
  closed: { 
    opacity: 0, 
    height: 0,
    overflow: "hidden",
    transition: { duration: 0.4, ease: "easeInOut", opacity: { duration: 0.3 } }
  }
}

export const ModalViewBodyHistorial = ({historialDia, indexDia}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleShowDias = (e) => {
    // Toggle the accordion state with a slight delay to allow animations to complete
    setIsOpen(!isOpen)
    
    // We still need this for Bootstrap compatibility
    // Si el target no es un boton, buscar el boton
    if (e.target.tagName !== "BUTTON") {
      const button = e.target.closest("button")
      const divShow = document.querySelector(`#collapse${button.id}`)
      // Toggle the class after state change to ensure animations work properly
      divShow.classList.toggle("show")
      return
    }

    // Si target.id no es un numero, return
    if (isNaN(e.target.id) || !e.target.id) return
    const divShow = document.querySelector(`#collapse${e.target.id}`)
    divShow.classList.toggle("show")
  }
  
  return (
    
    <motion.div initial={"closed"} animate={"open"} exit={{opacity: 0}} variants={variants}  key={`diaHistorial${+indexDia}`} className="container-historial-item accordion mb-2" id={`acordionDia${indexDia}`}>
        <div  className="accordion-item">
          <h2 className="accordion-header">
            <button onClick={(e) => handleShowDias(e)} className="bg-body-secondary position-relative p-3 accordion-button d-flex justify-content-between gap-3" type="button" data-bs-toggle="collapse" id={`${indexDia+1}`} data-bs-target={`#collapse${indexDia+1}`} aria-expanded="true" aria-controls="collapseOne">
              <div className="overflow-x-hidden overflow-y-hidden">
                <motion.span initial={{opacity: 0}} animate={{opacity: 1}}>{<span className="fst-italic text-secondary">{historialDia.fecha} <span className="text-dark fw-bold">{historialDia.nombreDia}</span></span>}</motion.span>   
                
              </div>
            </button>           
          </h2>
          <motion.div 
            initial={{opacity: 0}} 
            animate={{opacity: 1}}  
            id={`collapse${indexDia+1}`}  
            className={`border border-secondary-subtle accordion-collapse collapse`} 
            data-bs-parent="#accordionExample">
            <div className="accordion-body py-1 px-1">    
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen && (
                    <motion.div 
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={accordionVariants}
                      className="collapse show" 
                      id="collapseExample">
              <table className="table">
                <thead>
                  <tr>
                    <th className="col-1" scope="col">#</th>
                    <th className="col-5" scope="col">Ejercicio</th>
                    <th className="col-6" scope="col">Kilos</th>
                    {/* <th scope="col">Handle</th> */}
                  </tr>
                </thead>
                <tbody>

                  {
                    historialDia.ejerciciosRealizados.map((ejercicio, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{ejercicio.ejercicio}</td>
                          <td>
                            {ejercicio.esBiserie ? (
                              <>
                                <div><span className="fw-semibold">Ejercicio 1: </span>
                                  {ejercicio.kilos1.map((kilo, index) => (
                                    <span key={`kilo1-${index}`}>{kilo} {index === ejercicio.kilos1.length - 1 ? '' : '- '}</span>
                                  ))}
                                </div>
                                <div><span className="fw-semibold">Ejercicio 2: </span>
                                  {ejercicio.kilos2.map((kilo, index) => (
                                    <span key={`kilo2-${index}`}>{kilo} {index === ejercicio.kilos2.length - 1 ? '' : '- '}</span>
                                  ))}
                                </div>
                              </>
                            ) : (
                              ejercicio.kilos.map((kilo, index) => (
                                <span key={index}>{kilo} {index === ejercicio.kilos.length - 1 ? '' : '- '}</span>
                              ))
                            )}
                          </td>
                        </tr>
                      )
                    })
                  }
                  
                </tbody>
              </table>
              <p className="px-2 pb-2 text-start m-0">
                <span className="fw-semibold">Observaciones: </span> <span>{historialDia.observaciones}</span>
                
              </p>
                    </motion.div>
                  )}
                </AnimatePresence>           
            </div>
          </motion.div>
        </div>
        
    </motion.div>
  )                  

}