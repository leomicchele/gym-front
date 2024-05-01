export function calcularDiasRestantes(fechaObjetivo) {

    let day = fechaObjetivo.split('/')[0] || "";
    let month = fechaObjetivo.split('/')[1] || "";
    let year = fechaObjetivo.split('/')[2] || "";

    let fechaObjetivoFormateada = `${month}/${day}/${year}`;

    // Obtener la fecha actual en milisegundos
    const fechaActual = new Date();
    const fechaActualMilisegundos = fechaActual.getTime();
  
    // Convertir la fecha objetivo a milisegundos
    const fechaObjetivoMilisegundos = new Date(fechaObjetivoFormateada).getTime();
  
    // Calcular la diferencia en milisegundos
    const diferenciaMilisegundos = fechaObjetivoMilisegundos - fechaActualMilisegundos;
  
    // Convertir la diferencia a días
    const dias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);
  
    // Redondear a número entero
    const diasRedondeados = Math.round(dias);
  
    return diasRedondeados;
  }