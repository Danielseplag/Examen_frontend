import React from 'react';

const Footer = () => (
  <footer style={{ background: '#000', borderTop: '1px solid rgba(51,65,85,0.5)', padding: '2rem 0', textAlign: 'center' }}>
    <div className="container">
      <p style={{ color: '#475569', fontSize: '0.85rem', margin: 0 }}>
        © {new Date().getFullYear()} LicitaSeguro · Datos provistos por ChileCompra
      </p>
    </div>
  </footer>
);

export default Footer;
