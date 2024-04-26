export const Fecha = () => {
    // Obtenemos la fecha actual
    const fechaActual = new Date();

    // Obtenemos el día del mes
    const dia = fechaActual.getDate();

    // Obtenemos el índice del mes (0 a 11)
    const indiceMes = fechaActual.getMonth();

    // Array con los nombres de los meses
    const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    // Obtenemos el nombre del mes
    const nombreMes = nombresMeses[indiceMes];

    // Obtenemos el día de la semana (0 es domingo, 1 es lunes, etc.)
    const diaSemana = fechaActual.getDay();

    // Array con los nombres de los días de la semana
    const nombresDiasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    // Obtenemos el nombre del día de la semana
    const nombreDiaSemana = nombresDiasSemana[diaSemana - 1];

    // Mostramos la información en la consola
    // console.log(`Hoy es ${nombreDiaSemana}, ${dia} de ${nombreMes}`);
  return (
    <div class="card text-center mb-4">
      <div class="card-header">Hoy es: </div>
      <div class="card-body">
        {/* <h5 class="card-title">{`${nombreDiaSemana.slice(0, 3) + "."}`}</h5>
        <h5 class="card-title">{`${dia}`}</h5> */}
        <h5 class="card-title">{`${nombreDiaSemana}, ${dia} de ${nombreMes}`}</h5>
      </div>
    </div>
  );
};
