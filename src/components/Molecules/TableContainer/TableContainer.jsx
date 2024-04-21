import { useState } from "react";
import { Loader } from "../../Atoms/Loader/Loader";
import { ArrowOrder } from "../../Atoms/icons/ArrowOrder";
import { OrderListApellido, OrderListEstado, OrderListNombre } from "../../helpers/orderList";
import { PlaceHolderTable } from "../PlaceHolderTable/PlaceHolderTable";
import { TableRow } from "../table-row/TableRow";
import "./TableContainer.css"


export const TableContainer = ({usuariosState, setUsuariosState, stateFetch, handleModalAlumnoOpen, handleModalSeguroOpen, numerPage}) => {

  const [orden, setOrden] = useState({
    apellido: true,
    nombre: true,
    estado: true  
  })

  const handleApellido = () => {
    setOrden({...orden, apellido: !orden.apellido})
    const usuariosOrdenados = usuariosState.sort((a, b) => OrderListApellido(a, b, orden.apellido))
    setUsuariosState([...usuariosOrdenados])
  }
  const handleNombre = () => {
    setOrden({...orden, nombre: !orden.nombre})
    const usuariosOrdenados = usuariosState.sort((a, b) => OrderListNombre(a, b, orden.nombre))
    setUsuariosState([...usuariosOrdenados])
  }
  const handleEstado = () => {
    setOrden({...orden, estado: !orden.estado})
    const usuariosOrdenados = usuariosState.sort((a, b) => OrderListEstado(a, b, orden.estado))
    setUsuariosState([...usuariosOrdenados])
  }

  const handleNumberItems = () => {
    let pageItems = [];
    usuariosState.map((e, index) => {
      if (index < 10*numerPage && index >= 10*(numerPage-1)) {
        pageItems.push(
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
      }
    })
    return pageItems;
  }

  return (
    <div className="container-usuario__table">
      <table className="table table-striped  table-hover">
        <thead>
          <tr>
            <th scope="col" ><span onClick={handleApellido} style={{cursor: "pointer"}}><ArrowOrder/>  Apellido</span></th>
            <th scope="col"><span onClick={handleNombre} style={{cursor: "pointer"}}><ArrowOrder/>  Nombre</span></th>
            <th scope="col"><span onClick={handleEstado} style={{cursor: "pointer"}}><ArrowOrder/>  Estado</span></th>
            <th scope="col"></th>
            {/* <th scope="col"></th> */}
          </tr>
        </thead>
        <tbody>
          { stateFetch.loading ? <PlaceHolderTable/> :
              handleNumberItems()           
          }
        </tbody>
      </table>
    </div>
  );
}