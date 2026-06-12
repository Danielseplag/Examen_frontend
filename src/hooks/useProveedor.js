import { useState, useCallback } from 'react';
import { getProveedor } from '../services/proveedores.js'
import { validarRut } from '../utils/rutValidator.js';

export function useProveedor(rut) {
    const [proveedor, setProveedor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const buscar = useCallback(async (rut) => {

        const {valido, error: errorRut } = validarRut(rut)
        if (!valido) {
            setError(errorRut)
            return
        }

        setLoading(true)
        setError(null)
        setProveedor(null)

        try {
            const resultado = await getProveedor(rut)

            if (!resultado) {
                setError('No se encontró un proveedor con el RUT ingresado.')
                return
            }

            setProveedor(resultado)
        } catch (err) {
            setError(`Ocurrió un error al buscar el proveedor. Por favor, inténtalo de nuevo: ${err.message}`)
        } finally {
            setLoading(false)
        }
    }, [])
    
    return { proveedor, loading, error, buscar };
}    