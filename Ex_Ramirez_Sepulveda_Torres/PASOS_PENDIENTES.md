# Pasos pendientes — LicitaSeguro

Guía de continuación para terminar la parte de integración de API. Sigue el orden — cada paso depende del anterior. Marca `[x]` cuando termines uno.

---

## ✅ Ya está listo (no tocar)

- `src/utils/rutValidator.js` → `validarRut(rut)` funcionando y probado.
- `src/hooks/useProveedor.js` → imports correctos (`useCallback`, `validarRut` desde `rutValidator.js`).
- `src/services/api.js` → exports nombrados + `apiFech(url)` hace `fetch(url)` directo. ✔️
- UI mergeada desde la rama de tus compañeros: `App.jsx` (con React Router), `Navbar.jsx`, `Footer.jsx`, `Home.jsx`, `index.css` (tema LicitaSeguro con clases `.ls-loader`, `.badge-active`, `.ls-pagination`, etc.), Bootstrap instalado.

---

## PASO 1 — Arreglar `src/services/proveedores.js`

**Por qué:** probé el endpoint real de Mercado Público y confirmé 2 bugs que hacen que `getProveedor` siempre falle o retorne `null`.

**Archivo actual (con bugs):**
```js
import { BASE_URL, TICKET, apiFech } from './api.js';

export async function getProveedor(rut) {
    const url = `${BASE_URL}/publico/Empresas/BuscarProveedor?
    rutempresaproveedor=${encodeURIComponent(rut)}&ticket=${TICKET}`

    const data = await apiFech(url)
    
    const lista = data.ListaEmpresa ?? []
    return lista[0] ?? null
}
```

**Bug 1:** el salto de línea + espacios dentro del template literal genera una URL inválida. La API responde `{"Codigo":400,"Mensaje":"Nombre de parametro no válido."}`.

**Bug 2:** la API responde `{ Cantidad, FechaCreacion, listaEmpresas: [...] }` (confirmado con curl). El código busca `data.ListaEmpresa` (no existe) → siempre `[]` → siempre `null`.

**Versión corregida:**
```js
import { BASE_URL, TICKET, apiFech } from './api.js';

export async function getProveedor(rut) {
    const url = `${BASE_URL}/publico/Empresas/BuscarProveedor?rutempresaproveedor=${encodeURIComponent(rut)}&ticket=${TICKET}`

    const data = await apiFech(url)

    const lista = data.listaEmpresas ?? []
    return lista[0] ?? null
}
```

**Dato para el siguiente paso:** cada proveedor solo trae estos campos:
```json
{ "CodigoEmpresa": "161781", "NombreEmpresa": "RAÚL ALBERTO JARAMILLO CUEVAS" }
```

**Cómo verificar:** RUT de prueba `10.187.606-3` → debería devolver "RAÚL ALBERTO JARAMILLO CUEVAS".

---

## PASO 2 — Terminar el componente `Proveedores` en `src/App.jsx`

Tienes 3 cosas pendientes ahí:

### 2.1 — Bug de estructura
Tienes:
```jsx
const Proveedores = () => (
  const [rut, setRut] = useState('');
  ...
  return ( ... )
);
```
`() => ( ... )` es para una sola expresión, no admite `const`/`return` adentro. Cambia a:
```jsx
const Proveedores = () => {
  const [rut, setRut] = useState('');
  const { proveedor, loading, error, buscar } = useProveedor();

  return (
    <div ...>
      ...
    </div>
  )
}
```
- Línea `const Proveedores = () => (` → `const Proveedores = () => {`
- Línea final `);` del componente → `)\n}`

### 2.2 — Borrar la tabla hardcodeada
Borra todo el bloque `<div className="table-responsive"> ... </div>` (la tabla con "TransLog Chile", "Tech Solutions SPA", etc.). Ya no aplica — ahora mostramos un solo resultado con `{proveedor && (...)}`.

### 2.3 — Corregir nombres de campos del resultado
Cambia:
```jsx
{proveedor && (
  <div className="card bg-dark text-light border-info">
    <div className="card-body">
      <h3>{proveedor.nombre}</h3>
      <p>{proveedor.rubro}</p>
      <p>{proveedor.region}</p>
      <p>{proveedor.experiencia}</p>
    </div>
  </div>
)}
```
por (recordando que la API solo trae `NombreEmpresa` y `CodigoEmpresa`):
```jsx
{proveedor && (
  <div className="card bg-dark text-light border-info">
    <div className="card-body">
      <h3>{proveedor.NombreEmpresa}</h3>
      <p>Código: {proveedor.CodigoEmpresa}</p>
    </div>
  </div>
)}
```

**Cómo verificar:** `npm run dev`, ve a `/proveedores`, busca `10.187.606-3` → debe aparecer "RAÚL ALBERTO JARAMILLO CUEVAS". Prueba también un RUT inválido (ej: `11.111.111-1`) → debe mostrar el error de `validarRut`.

---

## PASO 3 — Bug de lógica en `src/hooks/useLicitaciones.js`

**Línea actual:**
```js
if (resultado || resultado.length === 0) {
    setError('No se encontraron licitaciones para los filtros seleccionados.')
    return
}
```

**Por qué es un bug:** `getLicitaciones` siempre retorna un array (`data.Listado ?? []`). Un array, **incluso vacío**, es siempre "truthy" en JS. Entonces `resultado || resultado.length === 0` es **siempre `true`** → el código SIEMPRE entra al error y hace `return`, y **`setLicitaciones(resultado)` nunca se ejecuta**, aunque la API traiga 100 resultados.

**Fix:** cambia el `||` por verificar que NO haya resultados:
```js
if (!resultado || resultado.length === 0) {
    setError('No se encontraron licitaciones para los filtros seleccionados.')
    return
}
```

También revisa el `catch`: tu mensaje de error genérico está bien, pero considera agregar el detalle del error como en `useProveedor` (`err.message`) para depurar más fácil.

---

## PASO 4 — 2 bugs en `src/hooks/usePaginacion.js`

**Archivo actual:**
```js
import {useState, useEffect} from 'react';

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
        if (pagina < 1 && pagina <= totalPaginas) {
            setPaginaActual(pagina)
        }
    }

    return { itemsPagina, paginaActual, totalPaginas, hayPaginacion, irPagina }
}
```

**Bug 1 — `useMemo` no está importado.** Importas `useEffect` (que no usas) pero llamas a `useMemo` (que no existe en el scope) → `ReferenceError: useMemo is not defined`.

Fix:
```js
import { useState, useMemo } from 'react'
```

**Bug 2 — la condición de `irPagina` nunca es verdadera.**
```js
if (pagina < 1 && pagina <= totalPaginas) {
```
Para `pagina = 1`: `1 < 1` es `false` → la función nunca cambia de página, ni para adelante ni para atrás. La condición debería ser "la página pedida está dentro del rango válido":
```js
const irPagina = (pagina) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
        setPaginaActual(pagina)
    }
}
```

**Nota de nombres:** el ejemplo de `GUIA_API.md` (sección 8) usa `itemsEnPagina` e `irAPagina`. Tu archivo usa `itemsPagina` e `irPagina`. Cualquiera de los dos nombres está bien — solo asegúrate de usar el **mismo nombre** al desestructurar el hook en la página de Licitaciones (paso 6).

---

## PASO 5 — Crear `src/hooks/useDetalleLicitaciones.js` (está vacío)

Este archivo existe pero está completamente vacío. Sigue el mismo patrón que `useProveedor.js` / `useLicitaciones.js`:

```js
import { useState, useCallback } from 'react'
import { getDetalleLicitacion } from '../services/licitaciones.js'

export function useDetalleLicitacion() {
    const [licitacion, setLicitacion] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const buscar = useCallback(async (codigo) => {
        setLoading(true)
        setError(null)
        setLicitacion(null)

        try {
            const resultado = await getDetalleLicitacion(codigo)

            if (!resultado) {
                setError('No se encontró la licitación solicitada.')
                return
            }

            setLicitacion(resultado)
        } catch (err) {
            setError(`Error al buscar el detalle: ${err.message}`)
        } finally {
            setLoading(false)
        }
    }, [])

    return { licitacion, loading, error, buscar }
}
```

⚠️ **Ojo con `getDetalleLicitacion` en `src/services/licitaciones.js`** — revísala, tiene esto:
```js
export async function getDetalleLicitacion(codigo) {
    const url = `${BASE_URL}/publico/licitaciones.json?codigo=${codigo}&ticket=${TICKET}`;
    const data = await apiFech(url)
    const Listado = data.Listado ?? []
    return data ?? null   // <- esto está mal
}
```
La última línea retorna `data` completo (`{ Cantidad, Version, Listado: [...] }`), no la licitación. Debería ser:
```js
export async function getDetalleLicitacion(codigo) {
    const url = `${BASE_URL}/publico/licitaciones.json?codigo=${codigo}&ticket=${TICKET}`;
    const data = await apiFech(url)
    const listado = data.Listado ?? []
    return listado[0] ?? null
}
```
Así `useDetalleLicitacion` recibe directamente el objeto de la licitación (con campos como `CodigoExterno`, `Nombre`, `Adjudicacion.RutProveedor`, etc.).

---

## PASO 6 — Conectar la página "Licitaciones" en `App.jsx`

Reemplaza el componente `Licitaciones` (las 3 cards hardcodeadas) por una versión conectada.

**Lo que necesitas:**
1. Un formulario con `<input type="date">` (fecha) y `<select>` (estado: activas/adjudicada/etc.) + botón "Buscar".
2. `useLicitaciones()` para los datos.
3. `usePaginacion(licitaciones)` para paginar (ya tienes las clases `.ls-pagination` en `index.css`, listas para usar con `<nav className="ls-pagination">...<ul className="pagination">...`).
4. Estados `loading`/`error` con `aria-live="polite"` y `role="alert"` (lo pide la rúbrica, sección 13 de `GUIA_API.md`).
5. Cada card debe enlazar a `/detalle/<codigo>` (ver Paso 7).

**Campos reales que trae la API en el listado** (los probé con curl):
```json
{ "CodigoExterno": "1000-11-LE26", "Nombre": "Sum. de barreras...", "CodigoEstado": 5, "FechaCierre": "2026-06-11T15:10:00" }
```
No trae "Organismo" ni "Monto" en el listado (eso viene en el detalle). Para las cards de la lista, usa `Nombre`, `CodigoExterno` y `FechaCierre` (con `formatearFecha` de `formatters.js`).

**Plantilla de referencia** (de `GUIA_API.md`, sección 8 — adáptala al estilo Bootstrap/cards que ya tienes):
```jsx
function Licitaciones() {
  const [fecha, setFecha] = useState('')
  const [estado, setEstado] = useState('activas')
  const { licitaciones, loading, error, buscar } = useLicitaciones()
  const { itemsEnPagina, paginaActual, totalPaginas, irAPagina, hayPaginacion } = usePaginacion(licitaciones)

  const handleSubmit = (e) => {
    e.preventDefault()
    buscar(fecha, estado)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#f1f5f9', paddingTop: '6rem' }}>
      <div className="container">
        <h1 className="gradient-text fw-bold mb-4">Licitaciones</h1>

        <form onSubmit={handleSubmit} className="d-flex gap-2 mb-4">
          <input type="date" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
          <select className="form-select" value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="activas">Activas</option>
            <option value="adjudicada">Adjudicadas</option>
            <option value="desierta">Desiertas</option>
          </select>
          <button className="btn btn-primary" disabled={loading}>{loading ? 'Buscando...' : 'Buscar'}</button>
        </form>

        {loading && <div aria-live="polite">Cargando...</div>}
        {error && <div role="alert" className="text-danger">{error}</div>}

        <div className="row g-4">
          {itemsEnPagina.map((lic) => (
            <div className="col-md-4" key={lic.CodigoExterno}>
              <div className="card bg-dark text-light border-info">
                <div className="card-body">
                  <h5>{lic.Nombre}</h5>
                  <p>Cierre: {formatearFecha(lic.FechaCierre)}</p>
                  <a href={`/detalle/${lic.CodigoExterno}`} className="btn btn-primary">Ver detalle</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hayPaginacion && (
          <nav aria-label="Paginación de licitaciones" className="ls-pagination mt-4">
            <ul className="pagination">
              <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => irAPagina(paginaActual - 1)}>Anterior</button>
              </li>
              <li className="page-item active"><span className="page-link">{paginaActual} / {totalPaginas}</span></li>
              <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => irAPagina(paginaActual + 1)}>Siguiente</button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  )
}
```
Recuerda importar arriba: `useState`, `useLicitaciones`, `usePaginacion`, `formatearFecha`.

**Formato de fecha:** el input `type="date"` da `"2026-06-10"`, pero `getLicitaciones(fecha, estado)` espera `"DDMMAAAA"`. Usa `fechaParaAPI` de `formatters.js` o conviértelo antes de llamar a `buscar`.

---

## PASO 7 — Ruta dinámica para Detalle (`/detalle/:codigo`)

En `App.jsx`, dentro de `<Routes>`:
```jsx
<Route path="/detalle/:codigo" element={<Detalle />} />
```
(reemplaza la ruta `/detalle` actual). Los links de las cards de Licitaciones (Paso 6) ya apuntan a `/detalle/${lic.CodigoExterno}`.

---

## PASO 8 — Conectar la página "Detalle"

```jsx
import { useParams } from 'react-router-dom'

function Detalle() {
  const { codigo } = useParams()
  const { licitacion, loading, error, buscar } = useDetalleLicitacion()

  useEffect(() => {
    buscar(codigo)
  }, [codigo, buscar])

  if (loading) return <div aria-live="polite">Cargando...</div>
  if (error) return <div role="alert">{error}</div>
  if (!licitacion) return null

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#f1f5f9', paddingTop: '6rem' }}>
      <div className="container">
        <h1 className="gradient-text fw-bold mb-4">{licitacion.Nombre}</h1>
        <div className="card bg-dark text-light border-info">
          <div className="card-body">
            <p><strong>Código:</strong> {licitacion.CodigoExterno}</p>
            <p><strong>Fecha de cierre:</strong> {formatearFecha(licitacion.FechaCierre)}</p>
            {/* explora con console.log(licitacion) qué más trae el detalle */}
          </div>
        </div>
      </div>
    </div>
  )
}
```
Importa `useState, useEffect` y `useParams` arriba del archivo. Haz `console.log(licitacion)` primero para ver todos los campos disponibles (organismo, montos, adjudicación, etc.) y decidir qué mostrar.

---

## PASO 9 — Variables de entorno (proteger el ticket)

1. Crea un archivo `.env` en la raíz del proyecto (mismo nivel que `package.json`):
```env
VITE_MP_TICKET=AC3A098B-4CD0-41AF-81A5-41284248419B
```
2. Agrega a `.gitignore` (revisé y **no está**, hay que agregarlo):
```
.env
.env.local
```
`api.js` ya lee `import.meta.env.VITE_MP_TICKET` con fallback, así que no hay que tocar ese archivo — solo crear `.env` y actualizar `.gitignore`.

---

## PASO 10 — CORS (solo si aparece este error)

Si al hacer `fetch` desde el navegador ves en consola:
```
Access to fetch at 'https://api.mercadopublico.cl/...' has been blocked by CORS policy
```
Configura un proxy en `vite.config.js` (sección 12 de `GUIA_API.md` tiene el código exacto) y cambia `BASE_URL` en `api.js` para usar `/api/...` en desarrollo.

---

## PASO 11 — Checklist final (de `GUIA_API.md`, sección 13)

Repásalo cuando termines los pasos anteriores:
- [ ] `getLicitaciones(fecha, estado)` funcionando con filtros
- [ ] `getDetalleLicitacion(codigo)` funcionando
- [ ] `getProveedor(rut)` funcionando
- [ ] Validación de fecha, estado y RUT con mensajes específicos
- [ ] Loader visible durante la carga (los 3 hooks)
- [ ] Paginación activa cuando hay más de 10 resultados
- [ ] Navegación entre listado y detalle
- [ ] `aria-live="polite"` en mensajes de carga/error
- [ ] `role="alert"` en errores importantes
- [ ] `aria-label` en la navegación de paginación
- [ ] `aria-invalid` + `aria-describedby` en el input de RUT
- [ ] Manejo de: sin resultados, error de servidor, sin conexión a internet

---

## Orden recomendado de trabajo

1. Paso 1 (proveedores.js) → Paso 2 (UI Proveedores) → **probar `/proveedores` completo**
2. Paso 3 + 4 (bugs en hooks de licitaciones/paginación)
3. Paso 5 (crear useDetalleLicitacion + fix getDetalleLicitacion)
4. Paso 6 + 7 + 8 (página Licitaciones + ruta dinámica + página Detalle) → **probar flujo completo**
5. Paso 9 (.env) — rápido, hazlo en cualquier momento
6. Paso 10 solo si te aparece el error de CORS
7. Paso 11 — checklist final antes de entregar
