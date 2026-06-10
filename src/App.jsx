
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const PageShell = ({ title, description, icon, links, gradient }) => (
  <div style={{
    minHeight: '100vh',
    background: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
    overflow: 'hidden'
  }}>
    {/* Ambient blobs */}
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: 400, height: 400, background: gradient[0], borderRadius: '50%', filter: 'blur(100px)', opacity: 0.15 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 300, height: 300, background: gradient[1], borderRadius: '50%', filter: 'blur(100px)', opacity: 0.12 }} />
    </div>

    <div style={{ textAlign: 'center', maxWidth: 640, position: 'relative', zIndex: 1 }}>

      {/* Icon circle */}
      <div style={{
        width: 80, height: 80,
        background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '2rem', margin: '0 auto 1.5rem',
        boxShadow: `0 0 40px ${gradient[0]}55`
      }}>
        {icon}
      </div>

      {/* Title */}
      <h1 style={{
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontWeight: 900,
        background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '0.75rem',
        letterSpacing: '-1px'
      }}>
        {title}
      </h1>

      {/* Description */}
      <p style={{
        color: '#94a3b8', fontSize: '1rem',
        lineHeight: 1.75, marginBottom: '2.5rem',
        maxWidth: 480, margin: '0 auto 2.5rem'
      }}>
        {description}
      </p>

      {/* Badge */}
      <div style={{
        display: 'inline-block',
        background: 'rgba(6,182,212,0.1)',
        border: '1px solid rgba(6,182,212,0.3)',
        borderRadius: 999,
        padding: '0.3rem 1rem',
        fontSize: '0.75rem',
        color: '#06b6d4',
        fontWeight: 600,
        letterSpacing: '0.5px',
        marginBottom: '2rem'
      }}>
        🔗 ENDPOINTS DISPONIBLES
      </div>

      {/* Links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {links.map(({ label, url }, i) => (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              background: 'rgba(15,23,42,0.8)',
              border: `1px solid ${gradient[0]}44`,
              borderRadius: 12,
              padding: '1rem 1.25rem',
              textAlign: 'left',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.border = `1px solid ${gradient[0]}99`;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 30px ${gradient[0]}22`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.border = `1px solid ${gradient[0]}44`;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '0.9rem' }}>{label}</span>
                <span style={{ color: gradient[0], fontSize: '0.75rem', fontWeight: 600 }}>GET ↗</span>
              </div>
              <div style={{
                color: '#64748b', fontSize: '0.75rem',
                wordBreak: 'break-all', fontFamily: 'monospace',
                lineHeight: 1.5
              }}>
                {url}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Back link */}
      <a href="/" style={{
        display: 'inline-block', marginTop: '2.5rem',
        color: '#475569', fontSize: '0.85rem',
        textDecoration: 'none', transition: 'color 0.2s'
      }}
        onMouseEnter={e => e.target.style.color = '#06b6d4'}
        onMouseLeave={e => e.target.style.color = '#475569'}
      >
        ← Volver al inicio
      </a>
    </div>
  </div>
);

const Licitaciones = () => (
  <PageShell
    title="Licitaciones"
    icon="📋"
    gradient={['#06b6d4', '#0ea5e9']}
    description="Listado completo de licitaciones disponibles en Mercado Público, filtradas por fecha y estado en tiempo real."
    links={[
      { label: "API Mercado Público", url: "https://api.mercadopublico.cl/" },
      { label: "Listado de Licitaciones", url: "https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha=ddmmaaaa&estado=name&ticket=cod" },
    ]}
  />
);

const Detalle = () => (
  <PageShell
    title="Detalle de Licitación"
    icon="🔍"
    gradient={['#8b5cf6', '#6366f1']}
    description="Vista completa de cada licitación: montos, fechas, bases y condiciones. Navegación directa desde Mercado Público."
    links={[
      { label: "Búsqueda de Licitaciones", url: "https://www.mercadopublico.cl/Home/BusquedaLicitacion" },
      { label: "Listado de Licitaciones (API)", url: "https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha=ddmmaaaa&estado=name&ticket=cod" },
    ]}
  />
);

const Proveedores = () => (
  <PageShell
    title="Proveedores"
    icon="🏢"
    gradient={['#22c55e', '#10b981']}
    description="Búsqueda de proveedores por RUT con historial de participación en licitaciones públicas de ChileCompra."
    links={[
      { label: "Datos de Proveedores – ChileCompra", url: "https://datos-abiertos.chilecompra.cl/organismos-proveedores" },
    ]}
  />
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/licitaciones" element={<Licitaciones />} />
        <Route path="/detalle"      element={<Detalle />} />
        <Route path="/proveedores"  element={<Proveedores />} />
        <Route path="*"             element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
