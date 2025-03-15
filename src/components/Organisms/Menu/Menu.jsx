import { useNavigate } from "react-router-dom";
import TopBar from "../../Molecules/TopBar/TopBar";
import { CardMenu } from "../../Molecules/card-menu/Card-menu";
import "./Menu.css"
import { Button } from "../../Atoms/Button/Button";
import { useContext, useEffect, useReducer, useState } from "react";
import { getSessionStorage, removeSessionStorage } from "../../helpers/storage";
import { LoginContext } from "../../../context/LoginContext";

import { motion } from "framer-motion"
import { EjerciciosRealizados } from "../../../context/EjerciciosRealizados";

// const variants = {
//   open: { opacity: 1},
//   closed: { opacity: 0},
//   closedRight: { opacity: 0},
// }
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
  closedRight: { opacity: 0, x: "100%" },
}

const MenuPrincipal = () => {

   const {id, rol ,token, nombre} = JSON.parse(localStorage.getItem("Auth_token"))

   const { dispatch } = useContext(LoginContext);
   

   const navigate = useNavigate()

   const handlerClickCardMenu = (url) => {
      navigate(`/menu/${url}`)
   }

   const handleCloseSession = (e) => {
      dispatch({ type: "CLOSED_SESSION" });
      removeSessionStorage();
     navigate("/login");
   };
   


   return (
     <div  className="container-menu">

       <nav className="navbar bg-body-tertiary pt-3 m-0 mw-100">
         <div className="container-fluid justify-content-between">
           <nav aria-label="breadcrumb">
             <motion.h3 initial="closed" animate="open" transition={{ duration: 0.7 }} variants={variants} className="m-0">{`Hola ${nombre}`} <span>&#128075;</span></motion.h3>
           </nav>
           <form className="d-flex gap-3 align-items-center m-0" role="search">
             <div onClick={handleCloseSession}>
               <Button msg={"Cerrar sesión"} estilo={"cerrar"} />
             </div>
           </form>
         </div>
       </nav>
       <div>
         <motion.div initial="closedRight" animate="open" transition={{ duration: 0.7 }} variants={variants} className="d-flex flex-column justify-content-start mt-3 p-4 bg-white container_cards border border-1">
           <h4 className="text-start text-dark">Mis tableros</h4>
           <div className="d-flex justify-content-start gap-3 flex-wrap container_cards">
            {
              rol === "ALUMNO_ROL" &&
              <div className="d-flex justify-content-center mt-3 gap-2 flex-wrap flex-column">
                <CardMenu
                  title={"Rutina"}
                  description={"Entrá y consultá tu rutina."}
                  handler={handlerClickCardMenu}
                />
                <CardMenu
                    title={"Ficha"}
                    description={"Entrá y consultá tu ficha."}
                    handler={handlerClickCardMenu}
                  />
                <CardMenu
                  title={"Historial"}
                  description={"Entrá y consultá tus progresos."}
                  handler={handlerClickCardMenu}
                />
                <div className="filtro-bn">
                  <CardMenu
                    title={"Pagos"}
                    description={"Entrá y consultá tus pagos. (Proximamente)"}
                    handler={() => console.log("pagos")}
                  />

                </div>
              </div>
            }
            {
              rol === "GYM_ROL" &&
              <>
                <div>
                  <CardMenu
                  title={"Profesores"}
                  description={"Entrá y consultá tus profesores"}
                  handler={handlerClickCardMenu}
                />
                </div>
                <div>
                  <CardMenu
                    title={"Alumnos"}
                    description={"Entrá y consultá tus alumnos"}
                    handler={handlerClickCardMenu}
                  />
                </div>
              </>              
            }
            {
              rol === "ADMIN_ROL" &&
              <>
              <div>
                <CardMenu
                 title={"Profesores"}
                 description={"Entrá y consultá tus profesores"}
                 handler={handlerClickCardMenu}
               />
              </div>
              <div>
                <CardMenu
                  title={"Alumnos"}
                  description={"Entrá y consultá tus alumnos"}
                  handler={handlerClickCardMenu}
                />
              </div>  
              <div>
                <CardMenu
                  title={"Gimnasios"}
                  description={"Entrá y consultá los gimnasios"}
                  handler={handlerClickCardMenu}
                />
              </div>  
              </>              
            }
            {
              rol === "PROFESOR_ROL" &&
              <div>
                <CardMenu
                 title={"Alumnos"}
                 description={"Entrá y consultá tus alumnos"}
                 handler={handlerClickCardMenu}
               />
              </div>
            }             
           </div>
         </motion.div>
       </div>
     </div>
   );
}
 
export default MenuPrincipal;