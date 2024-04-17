export const Pagination = ({items = 0}) => {

  return (
    <div className="py-3">
        <nav aria-label="Page navigation example p-3">
            <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                    <a className="page-link">Anterior</a>
                </li>
                <li className="page-item"><a className="page-link" >1</a></li>
                <li className="page-item"><a className="page-link" >2</a></li>
                <li className="page-item"><a className="page-link" >3</a></li>
                <li className="page-item">
                    <a className="page-link" href="#">Siguiente</a>
                </li>
            </ul>
        </nav>

    </div>
  )
}