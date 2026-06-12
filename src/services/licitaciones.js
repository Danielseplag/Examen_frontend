import { BASE_URL, TICKET, apiFech } from './api.js';

export async function getLicitaciones(fecha, estado) {
    const url = `${BASE_URL}/publico/licitaciones.json?fecha=${fecha}&estado=${estado}&ticket=${TICKET}`;
    
    const data = await apiFech(url)

    return data.Listado ?? []
}

export async function getDetalleLicitacion(codigo) {
    const url = `${BASE_URL}/publico/licitaciones.json?codigo=${codigo}&ticket=${TICKET}`;
    
    const data = await apiFech(url)

    const Listado = data.Listado ?? []
    return Listado[0] ?? null

}

