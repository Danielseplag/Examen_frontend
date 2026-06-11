import { BASE_URL, TICKET, apiFech } from './api.js';

export async function getProveedor(rut) {
    const url = `${BASE_URL}/publico/Empresas/BuscarProveedor?rutempresaproveedor=${encodeURIComponent(rut)}&ticket=${TICKET}`

    const data = await apiFech(url)

    const lista = data.listaEmpresas ?? []
    return lista[0] ?? null
}

