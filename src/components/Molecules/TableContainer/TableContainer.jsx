import { Loader } from "../../Atoms/Loader/Loader";
import { PlaceHolderTable } from "../PlaceHolderTable/PlaceHolderTable";
import { TableRow } from "../table-row/TableRow";
import "./TableContainer.css"

export const TableContainer = ({usuariosState, stateFetch, handleModalAlumnoOpen, handleModalSeguroOpen}) => {
  return (
    <div className="container-usuario__table">
      <table className="table table-striped  table-hover">
        <thead>
          <tr>
            <th scope="col">Apellido</th>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope="col"></th>
            {/* <th scope="col"></th> */}
          </tr>
        </thead>
        <tbody>
          { stateFetch.loading ? <PlaceHolderTable/> :
              usuariosState.map((e) => {
                return (
                  <TableRow
                    nombre={e.nombre}
                    apellido={e.apellido}
                    estado={e.estado}
                    key={e._id}
                    id={e._id}
                    handleModalAlumnoOpen={handleModalAlumnoOpen}
                    handleModalSeguroOpen={handleModalSeguroOpen}
                  />
                );
              })            
          }
        </tbody>
      </table>
    </div>
  );
}