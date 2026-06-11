import { useState, useCallback } from 'react';
import { getDetalleLicitacion } from '../services/licitaciones.js'

export function useDetalleLicitacion() {
    const [licitacion, setLicitacion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const buscar = useCallback(async (codigo) => {
        setLoading(true)
        setError(null)
        setLicitacion(null)
        try {
            const resultado = await getDetalleLicitacion(codigo)
            if (!resultado) {
                setError('No se encontró una licitación con el código ingresado.')
                return
            }
            setLicitacion(resultado)
        } catch (err) {
            setError(`Ocurrió un error al buscar el detalle de la licitación. Por favor, inténtalo de nuevo: ${err.message}`)
        } finally {
            setLoading(false)
        }
    }, [])

    return { licitacion, loading, error, buscar };
}
