

import { getSessionStorage } from "./storage";

const urlAmbientes = () => "https://gym-back-production.up.railway.app"
// const urlAmbientes = () => "http://localhost:3000"

// REGEX EMAIL
const validateEmail = (userName) => {
  const  re = /\S+@\S+\.\S+/;
  return re.test(userName);
};

// ---------------- LOGIN ----------------
const postFetchLogin = async({userName, password}) => {
  const path = urlAmbientes();
  const isEmail = validateEmail(userName);
  let raw = {
    password
  };
  if (isEmail) raw.email = userName;
  if (!isEmail) raw.dni = userName;

  raw = JSON.stringify(raw);

  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      // 'Cookie': 'BIGipServeres1WJ+wB3R4WLaaB2wky9A=rd5o00000000000000000000ffff0a090b38o80; c52247493d0c9071e1f49cc01c78fe68=0aeab0b30e77e504501d3a7eff6e7f40'
    },
    body: raw,
    redirect: 'follow'
  };

  try {
    const response = await fetch(`${path}/api/auth/login`, requestOptions);
    const result = await response.json()
    if (response.ok === true) return { message: "Ok", login: true, user: result, status: 200};
    if (response.status === 401) return { message: result.msg || "Usuario y/o contraseña incorrecta", login: false, status: 401};
    if (response.status === 400) return { message: result.msg || "No Registrado", login: false, status: 400};

  } catch (error) {
    console.log('ACA EL ERROR', error);
    
    return { message: "Error en el servidor", login: false, status: 500};;
  }
};

// ---------------- ALUMNOS ----------------

export const getFetch = async (idProfesor, idGimnasio) => {
  const path = urlAmbientes();

  const id = idProfesor || idGimnasio;
  const usuario = idProfesor ? "profesor" : "gimnasio";

  var requestOptions = {
    method: 'GET',
    // redirect: 'follow',
    headers: {
      'accept': 'application/json', 
      // "Authorization": `Bearer ${user.token}`,
      
    }
  };
  try {
    const response = await fetch(`${path}/api/alumnos?limite=10&desde=0&${usuario}=${id}`, requestOptions);
    if (response.status == 401) {
      return false
    }
    const result = await response.json()

    return {
      status: response.status,
      ok: response.ok,
      body: result,
    } 
    
  } catch (error) {
    throw new Error ( `Failed to connect to api` );
  }

}
export const alumnoCreateFetch = async (usuario, idProfesor, idGimnasio) => {
  const path = urlAmbientes();
  let raw = {
    nombre: usuario.nombre.trim(),
    apellido: usuario.apellido.trim(),
    edad: usuario.edad,
    dni: usuario.dni.trim(),
    password: usuario.password,
    experiencia: usuario.experiencia,
    lesion: usuario.lesion,
    patologia: usuario.patologia,
    objetivo: usuario.objetivo,
    diasSemanales: usuario.diasSemanales,
    deporte: usuario.deporte,
    profesor: idProfesor,
    gimnasio: idGimnasio,
    rutina: [],
    fechaCreacion: new Date()
  }

  let requestOptions = {
    method: 'POST',
    // redirect: 'follow',
    headers: { 
      'Content-Type': 'application/json', 
      // 'Cookie': 'BIGipServeres1WJ+wB3R4WLaaB2wky9A=rd5o00000000000000000000ffff0a090b38o80; c52247493d0c9071e1f49cc01c78fe68=0aeab0b30e77e504501d3a7eff6e7f40'
    },
    body: JSON.stringify(raw)
  };
  try {
    const response = await fetch(`${path}/api/alumnos`, requestOptions);
    const result = await response.json()
    if (response.status === 401) return { message: "No autorizado", error: true};
    if (response.status === 500) return { message: "Error en el servidor", error: true};
    if (response.status === 404) return { message: "No encontrado", error: true};
    if (response.status === 400) return { message: result.msg || "Error en los datos", error: true};
    if (response.ok === false) return { message: "Error en la peticion", error: true};
    
    if (response.ok === true) return { message: "Alumno Creado"};
    
  } catch (error) {
    console.log({error})
    throw new Error ( `Failed to connect to api` );
  }

}
export const alumnoUpdateFetch = async (usuario, idProfesor) => {
  const path = urlAmbientes();
  const idUsuario = usuario._id;
  let raw = usuario; 
  delete raw.password;

  let requestOptions = {
    method: 'PUT',
    // redirect: 'follow',
    headers: { 
      'Content-Type': 'application/json', 
      // 'Cookie': 'BIGipServeres1WJ+wB3R4WLaaB2wky9A=rd5o00000000000000000000ffff0a090b38o80; c52247493d0c9071e1f49cc01c78fe68=0aeab0b30e77e504501d3a7eff6e7f40'
    },
    body: JSON.stringify(raw)
  };
  try {
    const response = await fetch(`${path}/api/alumnos/${idUsuario}`, requestOptions);
    const result = await response.json()

    if (response.status === 401) return { message: "No autorizado", error: true};
    if (response.status === 500) return { message: "Error en el servidor", error: true};
    if (response.status === 404) return { message: "No encontrado", error: true};
    if (response.status === 400) return { message: "Error en los datos", error: true};
    if (response.ok === false) return { message: "Error en la peticion", error: true};

    if (response.ok === true) return { message: "Alumno Actualizado", error: false, data: result};
    
  } catch (error) {
    console.log({error})
    throw new Error ( `Failed to connect to api` );
  }

}

export const alumnoDeleteFetch = async (id) => {
  const path = urlAmbientes();
  const {token} = getSessionStorage()
  let requestOptions = {
    method: 'DELETE',
    // redirect: 'follow',
    headers: { 
      'Content-Type': 'application/json', 
      'x-token': token,
    },
  };
  try {
    const response = await fetch(`${path}/api/alumnos/${id}`, requestOptions);

    if (response.status === 401) return { message: "No autorizado para eliminar", error: true};
    if (response.status === 500) return { message: "Error en el servidor", error: true};
    if (response.status === 404) return { message: "No encontrado", error: true};
    if (response.status === 400) return { message: "Token Vencido", error: true};
    if (response.ok === false) return { message: "Error en la peticion", error: true};

    if (response.ok === true) return { message: "Alumno Eliminado", error: false};
    
  } catch (error) {
    console.log({error})
    throw new Error ( `Failed to connect to api` );
  }

}

// ---------------- PROFESORES ----------------

export const getFetchProfesores = async (id) => {
  const path = urlAmbientes();

  var requestOptions = {
    method: 'GET',
    // redirect: 'follow',
    headers: {
      'accept': 'application/json', 
      // "Authorization": `Bearer ${user.token}`,
      
    }
  };
  try {
    const response = await fetch(`${path}/api/profesores?limite=10&desde=0&gimnasio=${id}`, requestOptions);
    if (response.status == 401) {
      return false
    }
    const result = await response.json()

    return {
      status: response.status,
      ok: response.ok,
      body: result,
    } 
    
  } catch (error) {
    throw new Error ( `Failed to connect to api` );
  }

}

export const profesorCreateFetch = async (usuario, idGimnasio) => {
  const path = urlAmbientes();
  let raw = {
    nombre: usuario.nombre.trim(),
    apellido: usuario.apellido.trim(),
    dni: usuario.dni.trim(),
    password: usuario.password,
    email: usuario.email.trim(),
    gimnasio: idGimnasio,
    fechaCreacion: new Date()
  }

  let requestOptions = {
    method: 'POST',
    // redirect: 'follow',
    headers: { 
      'Content-Type': 'application/json', 
      // 'Cookie': 'BIGipServeres1WJ+wB3R4WLaaB2wky9A=rd5o00000000000000000000ffff0a090b38o80; c52247493d0c9071e1f49cc01c78fe68=0aeab0b30e77e504501d3a7eff6e7f40'
    },
    body: JSON.stringify(raw)
  };
  try {
    const response = await fetch(`${path}/api/profesores`, requestOptions);
    const result = await response.json()
    if (response.status === 401) return { message: "No autorizado", error: true};
    if (response.status === 500) return { message: "Error en el servidor", error: true};
    if (response.status === 404) return { message: "No encontrado", error: true};
    if (response.status === 400) return { message: result.msg || result.errors[0].msg || "Error en los datos", error: true};
    if (response.ok === false) return { message: "Error en la peticion", error: true};
    
    if (response.ok === true) return { message: "Profesor Creado"};
    
  } catch (error) {
    console.log({error})
    throw new Error ( `Failed to connect to api` );
  }

}

export const profesorUpdateFetch = async (usuario, idProfesor) => {
  const path = urlAmbientes();
  const idUsuario = usuario._id;
  let raw = usuario; 
  delete raw.password;

  let requestOptions = {
    method: 'PUT',
    // redirect: 'follow',
    headers: { 
      'Content-Type': 'application/json', 
      // 'Cookie': 'BIGipServeres1WJ+wB3R4WLaaB2wky9A=rd5o00000000000000000000ffff0a090b38o80; c52247493d0c9071e1f49cc01c78fe68=0aeab0b30e77e504501d3a7eff6e7f40'
    },
    body: JSON.stringify(raw)
  };
  try {
    const response = await fetch(`${path}/api/profesores/${idUsuario}`, requestOptions);

    if (response.status === 401) return { message: "No autorizado", error: true};
    if (response.status === 500) return { message: "Error en el servidor", error: true};
    if (response.status === 404) return { message: "No encontrado", error: true};
    if (response.status === 400) return { message: "Error en los datos", error: true};
    if (response.ok === false) return { message: "Error en la peticion", error: true};

    if (response.ok === true) return { message: "Profesor Actualizado", error: false};
    
  } catch (error) {
    console.log({error})
    throw new Error ( `Failed to connect to api` );
  }

}

export const profesorDeleteFetch = async (id) => {
  const path = urlAmbientes();
  const {token} = getSessionStorage()
  let requestOptions = {
    method: 'DELETE',
    // redirect: 'follow',
    headers: { 
      'Content-Type': 'application/json', 
      'x-token': token,
    },
  };
  try {
    const response = await fetch(`${path}/api/profesores/${id}`, requestOptions);

    if (response.status === 401) return { message: "No autorizado para eliminar", error: true};
    if (response.status === 500) return { message: "Error en el servidor", error: true};
    if (response.status === 404) return { message: "No encontrado", error: true};
    if (response.status === 400) return { message: "Token Vencido", error: true};
    if (response.ok === false) return { message: "Error en la peticion", error: true};

    if (response.ok === true) return { message: "Alumno Eliminado", error: false};
    
  } catch (error) {
    console.log({error})
    throw new Error ( `Failed to connect to api` );
  }

}

// ---------------- RUTINAS ----------------
export const getRutina = async (usuario) => {
  const path = urlAmbientes();
  const idRutina = usuario.rutinaId;

  var requestOptions = {
    method: 'GET',
    // redirect: 'follow',
    headers: {
      'accept': 'application/json', 
      // "Authorization": `Bearer ${user.token}`,
      
    }
  };
  try {
    const response = await fetch(`${path}/api/rutina/${idRutina}`, requestOptions);
    if (response.status == 401) {
      return false
    }
    const result = await response.json()

    return result
    
  } catch (error) {
    throw new Error ( `Failed to connect to api` );
  }

}

// ---------------- HISTORIAL ----------------
export const getHistorial = async (usuario) => {
  console.log("object");
  const path = urlAmbientes();
  const idAlumno = usuario._id;

  var requestOptions = {
    method: 'GET',
    // redirect: 'follow',
    headers: {
      'accept': 'application/json', 
      // "Authorization": `Bearer ${user.token}`,
      
    }
  };
  try {
    const response = await fetch(`${path}/api/historial/${idAlumno}`, requestOptions);
    if (response.status == 401) {
      return false
    }
    const result = await response.json()

    return result
    
  } catch (error) {
    throw new Error ( `Failed to connect to api` );
  }

}

export const historialUpdateFetch = async (id, historial) => {
  const path = urlAmbientes();
  const idUsuario = id;
  let raw = historial; 
  console.log(raw)

  let requestOptions = {
    method: 'PUT',
    // redirect: 'follow',
    headers: { 
      'Content-Type': 'application/json', 
      // 'Cookie': 'BIGipServeres1WJ+wB3R4WLaaB2wky9A=rd5o00000000000000000000ffff0a090b38o80; c52247493d0c9071e1f49cc01c78fe68=0aeab0b30e77e504501d3a7eff6e7f40'
    },
    body: JSON.stringify(raw)
  };
  try {
    const response = await fetch(`${path}/api/historial/${idUsuario}`, requestOptions);

    if (response.status === 401) return { message: "No autorizado", error: true};
    if (response.status === 500) return { message: "Error en el servidor", error: true};
    if (response.status === 404) return { message: "No encontrado", error: true};
    if (response.status === 400) return { message: "Error en los datos", error: true};
    if (response.ok === false) return { message: "Error en la peticion", error: true};

    if (response.ok === true) return { message: "Rutina Enviada 3..2..1", error: false};
    
  } catch (error) {
    console.log({error})
    throw new Error ( `Failed to connect to api` );
  }

}

export default postFetchLogin;