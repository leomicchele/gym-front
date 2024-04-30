import { getDate } from "../../helpers/getDate";

export const Fecha = () => {

    const {nombreDiaSemana, dia, nombreMes} = getDate();

  return (
    <div className="card text-center mb-4">
      <div className="card-header">Hoy es: </div>
      <div className="card-body">
        <h5 className="card-title">{`${nombreDiaSemana}, ${dia} de ${nombreMes}`}</h5>
      </div>
    </div>
  );
};
