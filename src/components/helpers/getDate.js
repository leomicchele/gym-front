export const getDate = () => {
    let fechaActual = new Date();

// Obtener la diferencia horaria en minutos para GMT -3
let diferenciaHorariaMinutos = -3 * 60; // -3 horas * 60 minutos/hora

// Aplicar la diferencia horaria
fechaActual.setMinutes(fechaActual.getMinutes() + diferenciaHorariaMinutos);


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

const anio = fechaActual.getFullYear();

const mes = fechaActual.getMonth() + 1

// Array con los nombres de los días de la semana
const nombresDiasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

// Obtenemos el nombre del día de la semana
const nombreDiaSemana = nombresDiasSemana[diaSemana];

return {
    dia,
    nombreMes,
    nombreDiaSemana,
    anio,
    mes}
}

export function diasParaVencimiento(fechaVencimiento) {

    if(fechaVencimiento === "" || fechaVencimiento === null || fechaVencimiento === undefined){ 
        return 0;
    }
    // Convertir el string a un objeto Date
    const partes = fechaVencimiento.split('/');
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1; // Los meses empiezan desde 0 en JavaScript
    const anio = parseInt(partes[2], 10);
    const fechaVenc = new Date(anio, mes, dia);

    // Obtener la fecha actual
    const hoy = new Date();

    // Calcular la diferencia en milisegundos
    const diferenciaMilisegundos = fechaVenc - hoy;

    // Convertir la diferencia a días
    const diferenciaDias = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

    return diferenciaDias;
}