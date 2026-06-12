import {useState, useMemo} from 'react';

const ITEMS_POR_PAGINA = 10;

export function usePaginacion(items) {
    const [paginaActual, setPaginaActual] = useState(1)

    const totalPaginas = Math.ceil(items.length / ITEMS_POR_PAGINA)
    const hayPaginacion = items.length > ITEMS_POR_PAGINA

    const itemsPagina = useMemo(() => {
        const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA
        const fin = inicio + ITEMS_POR_PAGINA
        return items.slice(inicio, fin)
    }, [items, paginaActual])

    const irPagina = (pagina) => {
        if (pagina >= 1 && pagina <= totalPaginas) {
            setPaginaActual(pagina)
        }
    }

    return { 
        itemsPagina, 
        paginaActual, 
        totalPaginas, 
        hayPaginacion, 
        irPagina,
    }
}