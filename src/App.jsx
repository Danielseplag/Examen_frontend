import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {useProveedor} from './hooks/useProveedor.js';
import {useLicitaciones} from './hooks/useLicitaciones.js';
import {usePaginacion} from './hooks/usePaginacion.js';
import {useDetalleLicitacion} from './hooks/useDetalleLicitaciones.js';
import {formatearFecha, fechaParaAPI} from './utils/formatters.js';
import Home from './pages/Home';

const ESTADOS_LICITACION = [
  { value: 'activas', label: 'Activas' },
  { value: 'publicada', label: 'Publicadas' },
  { value: 'adjudicada', label: 'Adjudicadas' },
  { value: 'desierta', label: 'Desiertas' },
  { value: 'revocada', label: 'Revocadas' },
];

const BackButton = () => (
  <Link
    to="/"
    className="btn btn-outline-info mb-4 d-inline-flex align-items-center gap-2"
    style={{ borderRadius: '999px', padding: '0.4rem 1.1rem' }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
    </svg>
    Volver al inicio
  </Link>
);

const Licitaciones = () => {
  const hoy = new Date().toISOString().slice(0, 10);
  const [fecha, setFecha] = useState(hoy);
  const [estado, setEstado] = useState('activas');
  const { licitaciones, loading, error, buscar } = useLicitaciones();
  const { itemsPagina, paginaActual, totalPaginas, hayPaginacion, irPagina } = usePaginacion(licitaciones);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fechaDate = new Date(`${fecha}T00:00:00`);
    buscar(fechaParaAPI(fechaDate), estado);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#f1f5f9', paddingTop: '6rem' }}>
      <div className="container">
        <BackButton />
        <h1 className="gradient-text fw-bold mb-4">Licitaciones</h1>

        <form onSubmit={handleSubmit} className="row g-2 mb-4" aria-label="Buscar licitaciones">
          <div className="col-sm-5 col-md-4">
            <label htmlFor="fecha" className="form-label">Fecha de publicación</label>
            <input
              id="fecha"
              type="date"
              className="form-control"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>
          <div className="col-sm-5 col-md-4">
            <label htmlFor="estado" className="form-label">Estado</label>
            <select
              id="estado"
              className="form-select"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              {ESTADOS_LICITACION.map((opcion) => (
                <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
              ))}
            </select>
          </div>
          <div className="col-sm-2 col-md-4 d-flex align-items-end">
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </form>

        {loading && (
          <div className="ls-loader" aria-live="polite">
            <div className="ls-spinner" role="status"></div>
            <p>Cargando licitaciones...</p>
          </div>
        )}

        {error && (
          <div role="alert" className="alert alert-danger">{error}</div>
        )}

        {!loading && !error && licitaciones.length === 0 && (
          <p aria-live="polite">No hay licitaciones para mostrar. Ajusta la fecha o el estado y presiona "Buscar".</p>
        )}

        <div className="row g-4">
          {itemsPagina.map((lic) => (
            <div className="col-md-4" key={lic.CodigoExterno}>
              <div className="card bg-dark text-light border-info h-100">
                <div className="card-body d-flex flex-column">
                  <h5>{lic.Nombre}</h5>
                  <p className="text-muted mb-1">Código: {lic.CodigoExterno}</p>
                  <p>Cierre: {formatearFecha(lic.FechaCierre)}</p>
                  <Link to={`/detalle/${lic.CodigoExterno}`} className="btn btn-primary mt-auto">
                    Ver detalle
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hayPaginacion && (
          <nav aria-label="Paginación de licitaciones" className="ls-pagination mt-4">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => irPagina(paginaActual - 1)} aria-label="Página anterior">
                  Anterior
                </button>
              </li>
              <li className="page-item active">
                <span className="page-link">{paginaActual} / {totalPaginas}</span>
              </li>
              <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => irPagina(paginaActual + 1)} aria-label="Página siguiente">
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

const Detalle = () => {
  const { codigo } = useParams();
  const { licitacion, loading, error, buscar } = useDetalleLicitacion();

  useEffect(() => {
    buscar(codigo);
  }, [codigo, buscar]);

  console.log('Detalle licitación:', licitacion);

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#f1f5f9', paddingTop: '6rem' }}>
      <div className="container">
        <Link
          to="/licitaciones"
          className="btn btn-outline-info mb-4 d-inline-flex align-items-center gap-2"
          style={{ borderRadius: '999px', padding: '0.4rem 1.1rem' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          Volver a Licitaciones
        </Link>

        <h1 className="gradient-text fw-bold mb-4">Detalle de Licitación</h1>

        {loading && (
          <div className="ls-loader" aria-live="polite">
            <div className="ls-spinner" role="status"></div>
            <p>Cargando detalle...</p>
          </div>
        )}

        {error && (
          <div role="alert" className="alert alert-danger">{error}</div>
        )}

        {!loading && !error && licitacion && (
          <div className="card bg-dark text-light border-info">
            <div className="card-body">
              <h3>{licitacion.Nombre}</h3>
              <p className="text-muted">Código: {licitacion.CodigoExterno}</p>
              <hr />
              <p><strong>Estado:</strong> {licitacion.Estado}</p>
              <p><strong>Fecha de cierre:</strong> {formatearFecha(licitacion.FechaCierre)}</p>
              {licitacion.Organismo && (
                <p><strong>Organismo:</strong> {licitacion.Organismo.NombreOrganismo}</p>
              )}
              {licitacion.Items?.Listado?.[0]?.Descripcion && (
                <p><strong>Descripción:</strong> {licitacion.Items.Listado[0].Descripcion}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Proveedores = () => {
  const [rut, setRut] = useState('');
  const { proveedor, loading, error, buscar } = useProveedor();

  return (
  <div style={{ minHeight: '100vh', background: '#000', color: '#f1f5f9', paddingTop: '6rem' }}>
    <div className="container">
      <BackButton />

      <h1 className="gradient-text fw-bold mb-4">Buscar Proveedor
      </h1>
      
      
        <div className="d-flex gap-2 mb-4">
          <input
          className="form-control"
          placeholder="12.345.678-9"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          />
          <button className="btn btn-primary" onClick={() => buscar(rut)}>
            Buscar
          </button>
        </div>
    

        {loading && <p>Cargando proveedor...</p>}

        {error && <p>Error: {error}</p>}

        {proveedor && (
          <div className="card bg-dark text-light border-info">
            <div className="card-body">
              <h3>{proveedor.NombreEmpresa}</h3>
              <p>Código: {proveedor.CodigoEmpresa}</p>
            </div>
          </div>
        )}
    </div>
  </div>
)};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/licitaciones" element={<Licitaciones />} />
        <Route path="/detalle/:codigo" element={<Detalle />} />
        <Route path="/proveedores" element={<Proveedores />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
