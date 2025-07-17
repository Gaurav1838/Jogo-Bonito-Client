import { Link } from 'react-router-dom';
import './navbar.css';
import { useEffect } from 'react';

function Navbar() {
  useEffect(() => {
    const toggler = document.querySelector('.navbar-toggler');
    const menu = document.querySelector('#navbarNav');

    if (toggler && menu) {
      toggler.addEventListener('click', () => {
        const bsCollapse = new bootstrap.Collapse(menu, {
          toggle: false,
        });

        if (menu.classList.contains('show')) {
          bsCollapse.hide();
        } else {
          bsCollapse.show();
        }
      });
    }
  }, []);

  const handleNavLinkClick = () => {
    const navbarToggler = document.querySelector('.navbar-collapse');
    if (navbarToggler && navbarToggler.classList.contains('show')) {
      new bootstrap.Collapse(navbarToggler).hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top full-width-navbar">
      <div className="container-fluid px-4">
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={handleNavLinkClick}>
          <img src="/logo.png" alt="JOGO BONITO" height="40" className="me-2" />
          <span className="fw-bold">JOGO BONITO</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleNavLinkClick}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop" onClick={handleNavLinkClick}>Shop</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart" onClick={handleNavLinkClick}>Cart</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={handleNavLinkClick}>Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
