
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const Licitaciones = () => (
  <div style={{ minHeight: '100vh', background: '#000', color: '#f1f5f9', paddingTop: '6rem' }}>
    <div className="container">
      <h1 className="gradient-text fw-bold mb-4">Licitaciones Activas</h1>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card bg-dark text-light border-info">
            <div className="card-body">
              <h5>Servicio de Transporte Regional</h5>
              <p>Ministerio de Salud</p>
              <p>Monto estimado: $120.000.000 CLP</p>
              <a href="/detalle" className="btn btn-primary">
                Ver detalle
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-dark text-light border-info">
            <div className="card-body">
              <h5>Equipamiento Informático</h5>
              <p>Municipalidad de Santiago</p>
              <p>Monto estimado: $85.000.000 CLP</p>
              <a href="/detalle" className="btn btn-primary">
                Ver detalle
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-dark text-light border-info">
            <div className="card-body">
              <h5>Servicio de Seguridad</h5>
              <p>Gobierno Regional</p>
              <p>Monto estimado: $210.000.000 CLP</p>
              <a href="/detalle" className="btn btn-primary">
                Ver detalle
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Detalle = () => (
  <div style={{ minHeight: '100vh', background: '#000', color: '#f1f5f9', paddingTop: '6rem' }}>
    <div className="container">
      <h1 className="gradient-text fw-bold mb-4">
        Detalle de Licitación
      </h1>

      <div className="card bg-dark text-light border-info">
        <div className="card-body">
          <h3>Servicio de Transporte Regional</h3>

          <p>
            Contratación de servicios de transporte para distribución de
            insumos médicos en distintas regiones del país.
          </p>

          <hr />

          <p>
            <strong>Organismo:</strong> Ministerio de Salud
          </p>

          <p>
            <strong>Estado:</strong> Abierta
          </p>

          <p>
            <strong>Fecha de cierre:</strong> 30 de junio de 2026
          </p>

          <p>
            <strong>Presupuesto:</strong> $120.000.000 CLP
          </p>

          <p>
            <strong>Requisitos:</strong>
          </p>

          <ul>
            <li>Experiencia mínima de 3 años.</li>
            <li>Documentación tributaria vigente.</li>
            <li>Capacidad operativa nacional.</li>
          </ul>

          <button className="btn btn-primary">
            Postular a esta licitación
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Proveedores = () => (
  <div style={{ minHeight: '100vh', background: '#000', color: '#f1f5f9', paddingTop: '6rem' }}>
    <div className="container">
      <h1 className="gradient-text fw-bold mb-4">
        Directorio de Proveedores
      </h1>

      <div className="table-responsive">
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>Proveedor</th>
              <th>Rubro</th>
              <th>Región</th>
              <th>Experiencia</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>TransLog Chile</td>
              <td>Transporte y Logística</td>
              <td>Metropolitana</td>
              <td>10 años</td>
            </tr>

            <tr>
              <td>Tech Solutions SPA</td>
              <td>Tecnología</td>
              <td>Valparaíso</td>
              <td>7 años</td>
            </tr>

            <tr>
              <td>Seguridad Integral Ltda.</td>
              <td>Seguridad Privada</td>
              <td>Biobío</td>
              <td>12 años</td>
            </tr>

            <tr>
              <td>Construcciones Andinas</td>
              <td>Obras Civiles</td>
              <td>O'Higgins</td>
              <td>15 años</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/licitaciones" element={<Licitaciones />} />
        <Route path="/detalle" element={<Detalle />} />
        <Route path="/proveedores" element={<Proveedores />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
