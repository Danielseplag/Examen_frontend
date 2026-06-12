import { useState, useCallback } from 'react';
import { getLicitaciones } from '../services/licitaciones.js'

export function useLicitaciones() {
    const [licitaciones, setLicitaciones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const buscar = useCallback(async (fecha, estado) => {
        setLoading(true);
        setError(null);
        setLicitaciones([])

        try {
            const resultado = await getLicitaciones(fecha, estado)

            if (resultado.length === 0) {
                setError('No se encontraron licitaciones para los filtros seleccionados.')
                return
            }

            setLicitaciones(resultado)
        } catch (err) {

            if (!navigator.onLine) {
                setError('No hay conexión a internet. Por favor, verifica tu conexión e inténtalo de nuevo.')
            } else {
                setError('Ocurrió un error al buscar las licitaciones. Por favor, inténtalo de nuevo.')
            }
        } finally {
            setLoading(false);
        }
    }, [])

    return { licitaciones, loading, error, buscar };
}  