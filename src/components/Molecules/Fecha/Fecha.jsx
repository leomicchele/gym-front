import { calcularDiasRestantes } from "../../helpers/diasRestantes";
import { getDate } from "../../helpers/getDate";

export const Fecha = ({caducacionRutina}) => {

    const {nombreDiaSemana, dia, nombreMes} = getDate();
    const diasRestantes = caducacionRutina === "0" ? "0" : calcularDiasRestantes(caducacionRutina)

  return (
    <div className="card text-center mb-4">
      <div className="card-header">Hoy es: </div>
      <div className="card-body">
        <h5 className="card-title">{`${nombreDiaSemana}, ${dia} de ${nombreMes}`}</h5>
      </div>
      <div class="card-footer">La rutina expira en {diasRestantes} días</div>
    </div>
  );
};
