

const BASE_URL = 'https://api.mercadopublico.cl/servicios/v1';

const TICKET = import.meta.env.VITE_MP_TICKET || 'AC3A098B-4CD0-41AF-81A5-41284248419B'

async function apiFech(url) {
    const response =await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}

export { BASE_URL, TICKET, apiFech}
    
