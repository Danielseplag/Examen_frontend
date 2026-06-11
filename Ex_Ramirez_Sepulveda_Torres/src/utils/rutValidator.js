export function validarRut(rut) {
    if (!rut || typeof rut !== 'string') {
        return { valido: false, error: 'Debe ingresar rut válido.' }
    }

    const limpio = rut.replace(/[^0-9kK]/g, '').toLowerCase()
    if (limpio.length < 2) {
        return { valido: false, error: 'El rut debe tener al menos 2 caracteres.' }
    }

    const cuerpo = limpio.slice(0, -1);
    const dvIngresado = limpio.slice(-1)

    const dvEsperado = dgv(Number(cuerpo)).toString()
    if (dvIngresado !== dvEsperado) {
        return { valido: false, error: 'El dígito verificador del RUT es incorrecto.' }
    }

    return { valido: true, error: null };
}

// Función para calcular el dígito verificador
function dgv(T) {
    var M = 0;
    var S = 1;
    while (T) {
        var digit = T % 10;
        T = Math.floor(T / 10);
        S = (S + digit * (9 - M % 6)) % 11;
        M++;
    }
    return S ? S - 1 : 'k';
}


