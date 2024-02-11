import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../../assets/img/logo.svg';
import { NavLink } from 'react-router-dom';
import "./Navbar.css";

const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY >= 70) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
          <img src={logo} alt="Logo" className="logo-navbar" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink to="/" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</NavLink>
              <NavLink to="/explore" className={activeLink === 'explore' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('explore')}>Explore</NavLink>
              {/* <NavLink to="/signin" className={activeLink === 'signin' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('signin')}>Login</NavLink>
              <NavLink to="/register" className={activeLink === 'register' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('register')}>Register</NavLink> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}
export default NavBar;
