import { useContext } from "react";
import {  Navigate, Outlet, redirect } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { getSessionStorage } from "./helpers/storage";
import { Login } from "./Organisms/Login/Login";

const HeroLogin = () => {

  const userStorage = getSessionStorage();

  return userStorage ? <Navigate to="/menu" /> : <Outlet />;

};
 
export default HeroLogin;