export function OrderListApellido(a, b, orden) {
    const apellidoA = a.apellido.toUpperCase();
    const apellidoB = b.apellido.toUpperCase();

    if (orden) { // Ordena Ascendente
        if (apellidoA < apellidoB) {
            return -1;
        }
        if (apellidoA > apellidoB) {
            return 1;
        }
        return 0;
    } else {  // Ordena Descendente
        if (apellidoA > apellidoB) {
            return -1;
        }
        if (apellidoA < apellidoB) {
            return 1;
        }
        return 0;
    }
}
export function OrderListNombre(a, b, orden) {
    const nombreA = a.nombre.toUpperCase();
    const nombreB = b.nombre.toUpperCase();

    if (orden) { // Ordena Ascendente
        if (nombreA < nombreB) {
            return -1;
        }
        if (nombreA > nombreB) {
            return 1;
        }
        return 0;
    } else {  // Ordena Descendente
        if (nombreA > nombreB) {
            return -1;
        }
        if (nombreA < nombreB) {
            return 1;
        }
        return 0;
    }
}
export function OrderListEstado(a, b, orden) {

    if (orden) {
        if (a.estado && !b.estado) {
            return -1;
        }
        // Si 'a.estado' es false y 'b.estado' es true, colocamos 'b' antes que 'a'
        else if (!a.estado && b.estado) {
            return 1;
        }
        // En cualquier otro caso, mantenemos el orden actual
        else {
            return 0;
        }       
    } else {
        if (a.estado && !b.estado) {
            return 1;
        }
        // Si 'a.estado' es false y 'b.estado' es true, colocamos 'b' antes que 'a'
        else if (!a.estado && b.estado) {
            return -1;
        }
        // En cualquier otro caso, mantenemos el orden actual
        else {
            return 0;
        }       
    }

}