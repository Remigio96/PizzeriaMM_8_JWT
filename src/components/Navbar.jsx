/* eslint-disable no-unused-vars */
import Container from "react-bootstrap/Container";
import RBNavbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import "../styles/navbar.css";
import {
  FaPizzaSlice,
  FaUserLock,
  FaUserPlus,
  FaUser,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";

const formatCLP = (n) => n.toLocaleString("es-CL");

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, logout } = useAuth();
  const { total } = useCart();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
      style={{ position: "sticky", top: 0, zIndex: 1020 }}
    >
      <RBNavbar
        expand="md"
        className="sticky-top border-0"
        style={{
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.85)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <Container>
          <RBNavbar.Brand
            as={NavLink}
            to="/"
            className="fw-semibold d-flex align-items-center gap-2"
          >
            <FaPizzaSlice className="text-danger" /> Pizzería Mamma Mia!
          </RBNavbar.Brand>
          <RBNavbar.Toggle aria-controls="main-nav" />
          <RBNavbar.Collapse id="main-nav">
            <div className="ms-auto d-flex gap-2 flex-wrap">
              <Button as={NavLink} to="/" size="sm" className="btn-soft text-white">
                <FaPizzaSlice className="me-1" /> Home
              </Button>

              {isAuth ? (
                <>
                  <Button
                    as={NavLink}
                    to="/profile"
                    size="sm"
                    className="btn-soft text-white"
                  >
                    <FaUser className="me-1" /> Perfil
                  </Button>
                  {location.pathname !== "/profile" && (
                    <Button
                      size="sm"
                      className="btn-soft text-white"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="me-1" /> Cerrar sesión
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button
                    as={NavLink}
                    to="/login"
                    size="sm"
                    className="btn-soft text-white"
                  >
                    <FaUserLock className="me-1" /> Iniciar sesión
                  </Button>
                  <Button
                    as={NavLink}
                    to="/register"
                    size="sm"
                    className="btn-soft text-white"
                  >
                    <FaUserPlus className="me-1" /> Registrarse
                  </Button>
                </>
              )}

              <Button
                as={NavLink}
                to="/cart"
                variant="primary"
                size="sm"
                className="fw-semibold"
              >
                <FaShoppingCart className="me-1" /> Total: ${formatCLP(total)}
              </Button>
            </div>
          </RBNavbar.Collapse>
        </Container>
      </RBNavbar>
    </motion.div>
  );
}
