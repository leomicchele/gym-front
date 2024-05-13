
import { motion, AnimatePresence } from "framer-motion"
import "./ModalViewBodyHistorial.css"

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}

export const ModalViewBodyHistorial = ({historialDia, indexDia}) => {
  

  const handleShowDias = (e) => {

    // Si el target no es un boton, buscar el boton
    if (e.target.tagName !== "BUTTON") {
      const button = e.target.closest("button")
      const divShow = document.querySelector(`#collapse${button.id}`)
      divShow.classList.toggle("show")
      return
    }

    // Si target.id no es un numero, return
    if (isNaN(e.target.id) || !e.target.id) return
    const divShow = document.querySelector(`#collapse${e.target.id}`)
    divShow.classList.toggle("show")
  }
  
  return (
    
    <motion.div initial={"closed"} animate={"open"} exit={{opacity: 0}} variants={variants}  key={`diaHistorial${+indexDia}`} className="accordion mb-2" id={`acordionDia${indexDia}`}>
        <div  className="accordion-item">
          <h2 className="accordion-header">
            <button onClick={(e) => handleShowDias(e)} className="bg-body-secondary position-relative p-2 accordion-button d-flex justify-content-between gap-3" type="button" data-bs-toggle="collapse" id={`${indexDia+1}`} data-bs-target={`#collapse${indexDia+1}`} aria-expanded="true" aria-controls="collapseOne">
              <div className="overflow-x-hidden overflow-y-hidden">
                <motion.span  initial={{opacity: 0}} animate={{opacity: 1}}>{<span className="fst-italic text-secondary">{historialDia.fecha} {historialDia.nombreDia}</span>}</motion.span>   
                
              </div>
            </button>           
          </h2>
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}}  id={`collapse${indexDia+1}`}  className={` border border-secondary-subtle accordion-collapse collapse`} data-bs-parent="#accordionExample">
            <div className="accordion-body py-2 px-1">    


                <AnimatePresence>
              <div className="collapse show" id="collapseExample">
              <table class="table">
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
                          <td>{ejercicio.kilos.map((kilo, index) => {
                            return (
                              <span>{kilo} {index === ejercicio.kilos.length - 1 ? '' : '- '}</span>
                            )
                          })}</td>
                        </tr>
                      )
                    })
                  }
                  
                </tbody>
              </table>
              <p className="px-2 pb-2 text-start m-0">
                <span className="fw-semibold">Observaciones: </span> <span>{historialDia.observaciones}</span>
                
              </p>
              </div>  
                </AnimatePresence>           
            </div>
          </motion.div>
        </div>
        
    </motion.div>
  )                  

}