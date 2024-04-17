import { useContext } from "react";
import {  Navigate, Outlet, redirect } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { getSessionStorage } from "./helpers/storage";
import { Login } from "./Organisms/Login/Login";

const Hero = () => {

  const userStorage = getSessionStorage();

  return userStorage ? <Outlet /> : <Navigate to="/login" />;


};
 
export default Hero;