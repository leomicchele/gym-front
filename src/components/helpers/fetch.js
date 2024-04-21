

import { config } from "./config.js";
import { getSessionStorage } from "./storage";

// export const CLIENT_ID = config.REACT_APP_CLIENT_ID;

const urlAmbientes = () => "https://gym-back-production.up.railway.app"
// const urlAmbientes = () => "http://localhost:3000"

// export const urlAmbientesOpenId = () => config.REACT_APP_OPENID_API_URL

// LOGIN
const postFetchLogin = async({userName, password}) => {
  const path = urlAmbientes();
  let raw = {
    dni: userName,
    password
  };

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
    // console.log(`El resultado del fetch es response ${response}`);
    // console.log(`El resultado del fetch es result ${result}`);
    if (response.ok === true) return { message: "Ok", login: true, user: result};
    if (response.status === 401) return { message: "Usuario y/o contraseña incorrecta", login: false};
    if (response.status === 400) return { message: "NO-Registrado", login: false};

  } catch (error) {
    console.log('ACA EL ERROR', error);
    
    return { message: "Error Server", login: false};;
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
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    dni: usuario.dni,
    password: usuario.password,
    experiencia: usuario.experiencia,
    lesion: usuario.lesion,
    patologia: usuario.patologia,
    objetivo: usuario.objetivo,
    diasSemanales: usuario.diasSemanales,
    deporte: usuario.deporte,
    profesor: idProfesor || null,
    gimnasio: idGimnasio || usuario.gimnasio,
    rutina: [],
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

    if (response.status === 401) return { message: "No autorizado", error: true};
    if (response.status === 500) return { message: "Error en el servidor", error: true};
    if (response.status === 404) return { message: "No encontrado", error: true};
    if (response.status === 400) return { message: "Error en los datos", error: true};
    if (response.ok === false) return { message: "Error en la peticion", error: true};

    if (response.ok === true) return { message: "Alumno Actualizado", error: false};
    
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
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    dni: usuario.dni,
    password: usuario.password,
    email: usuario.email,
    gimnasio: idGimnasio,
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
    if (response.status === 401) return { message: "No autorizado", error: true};
    if (response.status === 500) return { message: "Error en el servidor", error: true};
    if (response.status === 404) return { message: "No encontrado", error: true};
    if (response.status === 400) return { message: "Error en los datos", error: true};
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

  console.log(usuario._id)

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

export default postFetchLogin;