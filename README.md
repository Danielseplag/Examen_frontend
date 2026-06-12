=======
# LicitaSeguro - Plataforma de Consulta de Licitaciones Públicas

## Descripción del Proyecto

LicitaSeguro es una aplicación web desarrollada en React que permite consultar información de licitaciones públicas de Chile mediante el consumo de los servicios de Mercado Público.

La plataforma fue desarrollada como solución al caso propuesto en la evaluación de Desarrollo Frontend, permitiendo a los usuarios:

* Consultar licitaciones públicas disponibles.
* Filtrar licitaciones por fecha y estado.
* Visualizar el detalle de cada licitación.
* Buscar proveedores mediante RUT.
* Navegar mediante una interfaz moderna, responsiva y accesible.

---

## Objetivos del Proyecto

Implementar una aplicación frontend que cumpla con los siguientes requerimientos:

* Diseño responsivo para distintos dispositivos.
* Consumo de APIs externas.
* Validación de formularios.
* Implementación de accesibilidad web.
* Uso de componentes reutilizables.
* Navegación SPA utilizando React Router.
* Manejo de estados y renderizado dinámico.

---

# Tecnologías Utilizadas

| Tecnología          | Uso                           |
| ------------------- | ----------------------------- |
| React 19            | Desarrollo de componentes     |
| Vite                | Entorno de desarrollo y build |
| React Router DOM    | Navegación entre vistas       |
| Bootstrap 5         | Diseño responsivo             |
| JavaScript ES6+     | Lógica de aplicación          |
| HTML5               | Estructura                    |
| CSS3                | Estilos personalizados        |
| API Mercado Público | Obtención de licitaciones     |
| API ChileCompra     | Consulta de proveedores       |

---

# Arquitectura del Proyecto

```text
src/
│
├── components/
│   ├── Navbar.jsx
│   └── Footer.jsx
│
├── hooks/
│   ├── useLicitaciones.js
│   ├── useDetalleLicitaciones.js
│   ├── useProveedor.js
│   └── usePaginacion.js
│
├── pages/
│   └── Home.jsx
│
├── services/
│   ├── api.js
│   ├── licitaciones.js
│   └── proveedores.js
│
├── utils/
│   ├── formatters.js
│   └── rutValidator.js
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

# Funcionalidades Implementadas

## 1. Página de Inicio

La página principal presenta la información corporativa de LicitaSeguro y permite acceder rápidamente a:

* Módulo de Licitaciones.
* Módulo de Proveedores.

### Características

* Diseño moderno.
* Navegación intuitiva.
* Adaptación responsive.

---

## 2. Consulta de Licitaciones

Permite consultar licitaciones mediante filtros.

### Filtros disponibles

* Fecha de publicación.
* Estado de licitación:

  * Activas
  * Publicadas
  * Adjudicadas
  * Desiertas
  * Revocadas

### Funcionalidades

* Consumo de API Mercado Público.
* Renderizado dinámico.
* Loader durante consultas.
* Mensajes de error.
* Paginación automática cuando existen más de 10 registros.

---

## 3. Búsqueda de Proveedores

Permite buscar proveedores mediante RUT.

### Validaciones

* Campo obligatorio.
* Formato correcto.
* Validación de dígito verificador.
* Mensajes descriptivos de error.

### Resultado

Se muestra:

* Nombre de la empresa.
* Código de proveedor.

---

# Consumo de APIs

## Licitaciones

```http
https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json
```

Parámetros utilizados:

```text
fecha
estado
ticket
```

---

## Detalle de Licitación

```http
https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?codigo={codigo}
```

---

## Proveedores

```http
https://api.mercadopublico.cl/servicios/v1/publico/Empresas/BuscarProveedor
```

Parámetros:

```text
rutempresaproveedor
ticket
```

---

# Accesibilidad Implementada

Se aplicaron buenas prácticas de accesibilidad mediante:

## Etiquetas Label

Todos los formularios cuentan con etiquetas asociadas mediante:

```html
<label for="">
```

---

## Atributos ARIA

Implementados para:

* Formularios.
* Loader.
* Paginación.
* Botones de navegación.

Ejemplos:

```html
aria-label
aria-live
aria-expanded
aria-controls
```

---

## Navegación por Teclado

Se verificó la correcta navegación mediante:

* Tabulación.
* Inputs.
* Botones.
* Enlaces.

---

# Diseño UI/UX

## Principios Aplicados

### Jerarquía Visual

Uso de:

* Títulos destacados.
* Tarjetas informativas.
* Espaciados consistentes.

### Consistencia

* Componentes reutilizables.
* Paleta de colores uniforme.
* Misma estructura visual en todas las vistas.

### Retroalimentación

* Loader durante peticiones.
* Mensajes de éxito y error.
* Indicadores visuales de estado.

---

## Paleta de Colores

| Elemento             | Color     |
| -------------------- | --------- |
| Fondo principal      | Negro     |
| Texto principal      | Blanco    |
| Elementos destacados | Azul/Cian |
| Errores              | Rojo      |
| Éxito                | Verde     |

---

## Tipografía

Se utilizan fuentes sans-serif modernas para garantizar:

* Legibilidad.
* Accesibilidad.
* Compatibilidad multiplataforma.

---

# Responsive Design

La aplicación fue desarrollada bajo enfoque Mobile First.

Compatible con:

* Smartphones
* Tablets
* Notebooks
* Monitores de escritorio

---

# Instalación

## Clonar proyecto

```bash
git clone <repositorio>
```

## Ingresar al proyecto

```bash
cd Ex_Ramirez_Sepulveda_Torres
```

## Instalar dependencias

```bash
npm install
```

## Ejecutar entorno de desarrollo

```bash
npm run dev
```

---

# Compilación para Producción

```bash
npm run build
```

Vista previa:

```bash
npm run preview
```

---

# Validaciones Implementadas

## Licitaciones

* Fecha obligatoria.
* Estado obligatorio.
* Manejo de respuesta vacía.
* Manejo de errores de conexión.

## Proveedores

* RUT obligatorio.
* Validación de formato.
* Validación de dígito verificador.
* Manejo de proveedor inexistente.

---

# Integrantes

Equipo:

* Ender Torres
* Daniel Ramírez
* Daniel Sepúlveda

---

# Conclusión

La solución desarrollada cumple con los requerimientos solicitados por LicitaSeguro, incorporando consumo de APIs, diseño responsivo, validaciones, accesibilidad, experiencia de usuario y componentes reutilizables mediante React, entregando una plataforma moderna y funcional para la consulta de información pública de licitaciones y proveedores.
>>>>>>> 409bf84 (push3)
