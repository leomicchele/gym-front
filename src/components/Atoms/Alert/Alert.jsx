import { motion } from "framer-motion"

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}

export const Alert = ({type, msg = "Error en la peticion"}) => {

    let typeClass = `alert alert-${type}`

  return (
    <motion.div initial="closed" animate="open" variants={variants} className={typeClass} role="alert">
          {msg}
     </motion.div> 
  )
}