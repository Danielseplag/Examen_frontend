export function decodificarHTML(texto) {
    if (!texto || typeof texto !== 'string') return texto
    
    const textarea = document.createElement('textarea')
    textarea.innerHTML = texto
    return textarea.value
}

export function formatearMonto(monto) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0,
    }).format(monto)
}

export function formatearFecha(fechaISO) {
    if (!fechaISO) return 'Sin fecha'

    return new Intl.DateTimeFormat('es-CL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(fechaISO))
}

export function fechaParaAPI(date = new Date()) {
    const dd = String(date.getDate()).padStart(2, '0')
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const aaaa = date.getFullYear()

    return `${dd}${mm}${aaaa}`
}