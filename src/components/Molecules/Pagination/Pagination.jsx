export const Pagination = ({usuariosState, setNumerPage}) => {

    const items = usuariosState.length;

    // Funcion que devuelva numero enteero, cada pagina debe tener 10 items
    const handlePageItem = () => {
        let pages = Math.ceil(items / 10);
        let pageItems = [];
        for (let i = 1; i <= pages; i++) {
            pageItems.push(
                <li className="page-item"><a className="page-link" onClick={(e) => setNumerPage(Number(e.target.textContent))}>{i}</a></li>
            )
        }
        return pageItems;
    }

  return (
    <div className="py-3">
        <nav aria-label="Page navigation example p-3">
            <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                    <a className="page-link">Anterior</a>
                </li>
                {handlePageItem()}
                <li className="page-item">
                    <a className="page-link" href="#">Siguiente</a>
                </li>
            </ul>
        </nav>

    </div>
  )
}