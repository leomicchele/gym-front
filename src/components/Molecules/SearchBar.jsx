import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { Button } from "../Atoms/Button/Button";
import { Search } from "../Atoms/icons/Search";
import "./SearchBar.css";

export const SearchBar = ({ usuario, stateInput, setStateInput, handlerUpdate, handleInputSearch, handleModalCreateOpen}) => {

  const {state, dispatch} = useContext(LoginContext)

  const usuarioSingular = usuario === "Alumno" ? "Alumno" : "Profesor"


  return (
    <div className="searchbar d-flex flex-wrap justify-content-center justify-content-sm-between gap-2 mb-4">
      <div className="searchbar-container_button" onClick={() => handleModalCreateOpen(true)}>
        <Button msg={`Nuevo ${usuarioSingular}`} estilo={"aprobar"} />
      </div>      

      <div className="searchbar-container_input">
        
        <div className="input-group">

          <span className="input-group-text" id="basic-addon1">
          <Search />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={stateInput}
            onChange={handleInputSearch}
            autoComplete="off"
          />

        </div>

      </div>
      <div className="searchbar-container_button" onClick={state.loading ? null : handlerUpdate}>
        <Button msg={"Todos"} estilo={"actualizar"} loading={state.loading}/>
      </div>
    </div>
  );
};
