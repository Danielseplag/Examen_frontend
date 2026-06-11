
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => (
  <>
    <Navbar />
    <main style={{ minHeight: '100vh', background: '#000', paddingTop: '5rem' }}>
      <div className="container text-center py-5">
        <h1 style={{ fontSize: 'clamp(2.4rem, 7vw, 5rem)', fontWeight: 900, letterSpacing: '-2px' }}>
          <span className="gradient-text">Licitaciones públicas</span><br />
          <span style={{ color: '#f1f5f9' }}>al alcance de todos</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: 500, margin: '1.5rem auto 2.5rem' }}>
          Consulta, filtra y explora licitaciones de Mercado Público en una interfaz clara y accesible.
        </p>
        <div className="d-flex gap-3 justify-content-center">
          <a href="/licitaciones" className="btn btn-primary">Ver Licitaciones</a>
          <a href="/proveedores" className="btn btn-outline">Buscar Proveedor</a>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default Home;
