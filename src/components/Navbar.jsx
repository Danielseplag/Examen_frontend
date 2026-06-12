const Navbar = () => (
  <nav className="navbar navbar-expand-lg fixed-top" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(6,182,212,0.15)' }}>
    <div className="container">
      <a className="navbar-brand gradient-text fw-bold" href="/">LicitaSeguro</a>
      <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Abrir menú">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav ms-auto gap-2">
          <li className="nav-item"><a className="nav-link" href="/" style={{ color: '#94a3b8' }}>Inicio</a></li>
          <li className="nav-item"><a className="nav-link" href="/licitaciones" style={{ color: '#94a3b8' }}>Licitaciones</a></li>
          <li className="nav-item"><a className="nav-link" href="/proveedores" style={{ color: '#94a3b8' }}>Proveedores</a></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;