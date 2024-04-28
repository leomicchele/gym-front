export const Fecha = () => {
    let fechaActual = new Date();

    // Obtener la diferencia horaria en minutos para GMT -3
    let diferenciaHorariaMinutos = -3 * 60; // -3 horas * 60 minutos/hora

    // Aplicar la diferencia horaria
    fechaActual.setMinutes(fechaActual.getMinutes() + diferenciaHorariaMinutos);

    console.log(fechaActual)

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
    const nombreDiaSemana = nombresDiasSemana[diaSemana];

    // Mostramos la información en la consola
    // console.log(`Hoy es ${nombreDiaSemana}, ${dia} de ${nombreMes}`);
  return (
    <div class="card text-center mb-4">
      <div class="card-header">Hoy es: </div>
      <div class="card-body">
        <h5 class="card-title">{`${nombreDiaSemana}, ${dia} de ${nombreMes}`}</h5>
      </div>
    </div>
  );
};
