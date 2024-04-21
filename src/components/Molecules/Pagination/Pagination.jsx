export const Pagination = ({usuariosState, numerPage, setNumerPage}) => {

    const items = usuariosState.length;

    const handleActiveButtonPage = (e) => {
        setNumerPage(Number(e.target.textContent))
        // e.target.parentElement.siblings.classList.remove("active")
        e.target.parentElement.parentElement.childNodes.forEach(e => {
            e.classList.remove("active")
        })
        e.target.parentElement.classList.add("active")
        

    }


    // Funcion que devuelva numero enteero, cada pagina debe tener 10 items
    const handlePageItem = () => {
        let pages = Math.ceil(items / 10);
        let pageItems = [];
        for (let i = 1; i <= pages; i++) {
            pageItems.push(
                <li className="page-item" style={{cursor: "pointer"}} onClick={(e) => handleActiveButtonPage(e)}><a className="page-link" >{i}</a></li>
            )
        }
        return pageItems;
    }

    const handlePagesPrevius = (e) => {
        // numerPage > 1 ? setNumerPage(numerPage - 1) : setNumerPage(1)
        e.target.parentElement.parentElement.childNodes.forEach(e => {
            e.classList.remove("active")
        })
        if (numerPage > 1) {
            setNumerPage(numerPage - 1)
            e.target.parentElement.parentElement.childNodes[numerPage - 1].classList.add("active")
        } else {
            setNumerPage(1)
            e.target.parentElement.parentElement.childNodes[1].classList.add("active")
        }
        
    }

    const handlePagesNext = (e) => {
        e.target.parentElement.parentElement.childNodes.forEach(e => {
            e.classList.remove("active")
        })
        if (numerPage < Math.ceil(items / 10)) {
            setNumerPage(numerPage + 1)
            e.target.parentElement.parentElement.childNodes[numerPage + 1].classList.add("active")
        } else {
            setNumerPage(Math.ceil(items / 10))
            e.target.parentElement.parentElement.childNodes[numerPage].classList.add("active")
        }
    }

  return (
    <div className="py-3">
        <nav aria-label="Page navigation example p-3">
            <ul className="pagination justify-content-center">
                <li className="page-item" style={{cursor: "pointer"}} onClick={(e) => handlePagesPrevius(e)}>
                    <a className="page-link" >Anterior</a>
                </li>
                {handlePageItem()}
                <li className="page-item" style={{cursor: "pointer"}} onClick={(e) => handlePagesNext(e)}>
                    <a className="page-link" >Siguiente</a>
                </li>
            </ul>
        </nav>

    </div>
  )
}