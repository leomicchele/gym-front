import { useReducer } from 'react'
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from './components/Organisms/Login/Login';
import Hero from './components/Hero';
import MenuPrincipal from './components/Organisms/Menu/Menu';
import { LoginContext } from './context/LoginContext';
import { loginReducer } from './context/loginReducer';
import HeroLogin from './components/HeroLogin';
// import { Ecopuntos } from './components/Organisms/Ecopuntos/Ecopuntos';
import { Alumnos } from './components/Organisms/Alumnos/Alumnos';
import { Profesores } from './components/Organisms/Profesores/Profesores';

function App() {

  const initialState = {
    loading: false,
    error: false,
    success: false,
    login: false,
    user: null
  };
  const [state, dispatch] = useReducer(loginReducer, initialState);

  return (
    <>
    <LoginContext.Provider value={{state, dispatch}}>
      <Routes>
        {/* <Route path='/' element={state.user ? <Navigate to='/menu'/> : <Navigate to='/login'/>}/>
        <Route path='/login' element={state.user ? <Navigate to='/menu'/> : <Login/>}/> */}
        {/* <Route path='/menu' element={state.user ? <MenuPrincipal/> : <Navigate to='/'/>}/> */}

        {/* <Route path='/login' element={
        <Hero>
          <Login/>
        </Hero> 
      }/> */}

      <Route  element={ <HeroLogin/>}>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
      </Route>

      <Route  element={ <Hero/>}>
        <Route path='/menu' element={<MenuPrincipal/>}/>
        {/* <Route path='/menu/ecopuntos' element={<Ecopuntos/>}/> */}
        <Route path='/menu/alumnos' element={<Alumnos/>}/>
        <Route path='/menu/profesores' element={<Profesores/>}/>
        {/* <Route path='/menu/gimnasios' element={<Alumnos/>}/>
        <Route path='/menu/rutinas' element={<Alumnos/>}/> */}
      </Route>

      </Routes>
    </LoginContext.Provider>
    </>
  )
}

export default App
