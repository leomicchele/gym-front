import React, { useContext } from "react"
import { Button } from "../../Atoms/Button/Button";
import { LoginContext } from "../../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { removeSessionStorage, removeSessionStorageEjerciciosRealizados } from "../../helpers/storage";
import "./TopBar.css"
import { ArrowBack } from "../../Atoms/icons/ArrowBack";


const TopBar = ({titulo, ruta = "/", callback = null}) => {

   const { dispatch } = useContext(LoginContext);

   const navigate = useNavigate()

    const handleCloseSession = (e) => {
        dispatch({ type: "CLOSED_SESSION" });
        removeSessionStorage();
        removeSessionStorageEjerciciosRealizados()
       navigate("/login");
     };

     const handleGoHome = () => {
      if (callback) {
         callback();
      }
      navigate(ruta, { replace: true });
    }
   
   return ( 
      <nav className="navbar bg-body-tertiary pt-3 m-0 mb-3 mw-100 topbar">
         <div className="container-fluid justify-content-between">
           <nav aria-label="breadcrumb">
             {/* <ol className="breadcrumb mb-1">
               <li className="breadcrumb-item">
                  <a className="text-primary" onClick={handleGoHome}>Inicio</a>
                  
               </li>
               <li className="breadcrumb-item">
                
                 <a className="text-primary">{titulo}</a>
               </li>
             </ol> */}
             <div className="d-flex gap-3 align-items-center " >
              <div className="d-flex align-items-center " style={{cursor: "pointer"}} onClick={handleGoHome}>
                  <ArrowBack />
              </div>
                  {/* <Button msg={""} estilo={"volver"} /> */}
                  <h3 className="text-dark m-0">{titulo}</h3>
              </div>
           </nav>
           <form className="d-flex gap-3 align-items-center m-0" role="search">
             <div onClick={handleCloseSession}>
               <Button msg={"Cerrar sesión"} estilo={"cerrar"} />
             </div>
           </form>
         </div>
       </nav>
    );
}
 
export default TopBar;