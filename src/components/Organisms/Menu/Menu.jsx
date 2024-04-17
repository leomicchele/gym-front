import { useNavigate } from "react-router-dom";
import TopBar from "../../Molecules/TopBar/TopBar";
import { CardMenu } from "../../Molecules/card-menu/Card-menu";
import "./Menu.css"
import { Button } from "../../Atoms/Button/Button";
import { useContext, useEffect } from "react";
import { getSessionStorage, removeSessionStorage } from "../../helpers/storage";
import { LoginContext } from "../../../context/LoginContext";
// import { CLIENT_ID, urlAmbientesOpenId } from "../../helpers/fetch";



const MenuPrincipal = () => {
  //  const path = urlAmbientesOpenId();
  //  const client_id = CLIENT_ID

   const {id, rol ,token} = JSON.parse(sessionStorage.getItem("Auth_token"))

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

  //  useEffect(() => {
  //   let data = JSON.parse(sessionStorage.getItem("Auth_token"))
  //   console.log({data})
  //  }, [])
   


   return (
     <div className="container-menu">
       {/* <TopBar titulo={"Menú principal"}/> */}

       {/* <form
         id="logoutForm"
         action={`${path}?client_id=${client_id}&redirect_uri=${window.location.origin}&=code&scope=openid&state=yAJJR6KC_CuvJZPnNyBNP`}method="post">
         <input type="hidden" name="authorize" value="0" />
         <input type="hidden" name="logout" value="1" />
       </form> */}

       <nav className="navbar bg-body-tertiary pt-3 m-0 mw-100">
         <div className="container-fluid justify-content-between">
           <nav aria-label="breadcrumb">
             {/* <ol className="breadcrumb mb-1">
               <li className="breadcrumb-item">
                 <a className="text-primary">Inicio</a>
               </li>
               <li className="breadcrumb-item">
                 <a className="text-primary">Tableros</a>
               </li>
             </ol> */}
             <h3 className="m-0">Bienvenido Matias</h3>
           </nav>
           <form className="d-flex gap-3 align-items-center m-0" role="search">
             <div onClick={handleCloseSession}>
               <Button msg={"Cerrar sesión"} estilo={"cerrar"} />
             </div>
           </form>
         </div>
       </nav>
       <div>
         <div className="d-flex flex-column justify-content-start mt-3 p-4 bg-white container_cards border border-1">
           <h4 className="text-start text-dark">Mis tableros</h4>
           <div className="d-flex justify-content-start mt-3 gap-3 flex-wrap container_cards">
            {
              rol === "ALUMNO_ROL" &&
              <div>
                <CardMenu
                  title={"Mis rutinas"}
                  description={"Entrá y consultá tus rutinas."}
                  handler={handlerClickCardMenu}
                />
              </div>
            }
            {
              rol === "GYM_ROL" &&
              <>
              <div>
                <CardMenu
                 title={"profesores"}
                 description={"Entrá y consultá tus profesores"}
                 handler={handlerClickCardMenu}
               />
              </div>
              <div>
                <CardMenu
                  title={"alumnos"}
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
         </div>
       </div>
     </div>
   );
}
 
export default MenuPrincipal;