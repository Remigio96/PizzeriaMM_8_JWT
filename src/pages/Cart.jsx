/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { FaPlus, FaMinus, FaTrash, FaShoppingCart, FaCreditCard } from "react-icons/fa";

const clp = (n) => n.toLocaleString("es-CL");

export default function Cart() {
  const { cart, inc, dec, remove, total } = useCart();
  const { isAuth, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoadingCart(false), 700);
    return () => clearTimeout(t);
  }, []);

  const handleCheckout = async () => {
    if (!isAuth) {
      toast.warn("Debes iniciar sesión para comprar.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart }),
      });

      if (!res.ok) throw new Error();
      toast.success("✅ Compra realizada con éxito");
    } catch {
      toast.error("❌ Error al procesar la compra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <Container className="my-4">
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title className="mb-3 d-flex align-items-center gap-2">
              <FaShoppingCart /> Carrito de compras
            </Card.Title>

            {isLoadingCart ? (
              <>
                <Skeleton height={60} count={3} className="mb-3" />
                <Skeleton height={40} width="50%" />
              </>
            ) : cart.length === 0 ? (
              <p className="mb-0 text-muted">Tu carrito está vacío.</p>
            ) : (
              <>
                {cart.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    <Row className="align-items-center py-2 border-bottom">
                      <Col xs={3} md={2}>
                        <Image src={p.img} alt={p.name} thumbnail />
                      </Col>

                      <Col xs={9} md={4} className="fw-semibold">
                        {p.name}
                      </Col>

                      <Col xs={12} md={3} className="mt-2 mt-md-0">
                        Precio: ${clp(p.price)}
                      </Col>

                      <Col
                        xs={12}
                        md={3}
                        className="d-flex align-items-center gap-2 mt-2 mt-md-0"
                      >
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() => dec(p.id)}
                          title="Disminuir cantidad"
                        >
                          <FaMinus />
                        </Button>
                        <span>{p.count}</span>
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() => inc(p.id)}
                          title="Aumentar cantidad"
                        >
                          <FaPlus />
                        </Button>

                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => remove(p.id)}
                          title="Eliminar del carrito"
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </motion.div>
                ))}

                <motion.div
                  className="d-flex justify-content-between align-items-center pt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h5 className="mb-0">Total: ${clp(total)}</h5>
                  <Button
                    variant="success"
                    disabled={loading || !isAuth}
                    onClick={handleCheckout}
                    className="d-flex align-items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <FaCreditCard /> Pagar
                      </>
                    )}
                  </Button>
                </motion.div>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>

      <ToastContainer position="top-center" autoClose={2500} theme="colored" />
    </motion.main>
  );
}
