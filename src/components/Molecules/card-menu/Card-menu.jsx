import { Image } from "../../Atoms/Image";
import { ChevronRight } from "../../Atoms/icons/ChevronRight";
import { Alumnos } from "../../Organisms/Alumnos/Alumnos";
import "./Card-menu.css";

export const CardMenu = ({ title, description, handler }) => {
    // const rutaImg = `/imagenes/${title}.png`

  return (
    <div className="card" onClick={() => handler(title)} style={{cursor:"pointer"}}>
  <div className="d-flex align-items-center g-3">
    <div className="py-3 px-1">
      <img src={`/imagenes/${title}.png`} alt="" style={{width: "75px"}}/>
    </div>
    <div className="col-7">
      <div className="card-body py-3 px-1">
        <h5 className="card-title text-start">{title === "Historial" ? "Progreso" : title}</h5>
        <p className="card-text text-start">{description}</p>
      </div>
    </div>
      <div className="col-2 align-self-start p-3" >
        <ChevronRight/>
      </div>
  </div>
</div>
  );
};
