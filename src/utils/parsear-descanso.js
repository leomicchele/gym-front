export function parseTiempo(tiempo) {
    if (typeof tiempo !== 'string') {
        return null; // Si tiempo no es una cadena, devuelve null
    }
    const regex = /^(\d*)(?:\.(\d*))?$/;
    const match = tiempo.match(regex);
    if (!match) {
        return null; // No se pudo hacer match con el formato esperado
    }

    const minutos = match[1] ? parseInt(match[1], 10) : 0; // Extraer minutos o asumir 0 si no hay minutos
    let segundos = match[2] ? parseInt(match[2], 10) : 0; // Extraer segundos o asumir 0 si no hay segundos
    
    if (segundos.toString().length < 2) {
        segundos = segundos * 10; // Si segundos tiene un solo dígito, multiplicar por 10
    }

    // Devolver objeto con minutos y segundos
    return {
        minutos,
        segundos
    };
}