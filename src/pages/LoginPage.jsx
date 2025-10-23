/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth } from "../context/AuthContext";

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v?.trim() || "");
const DEFAULT_NEXT = "/";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [isRendering, setIsRendering] = useState(true);
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  const { login, isAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || DEFAULT_NEXT;

  useEffect(() => {
    const t = setTimeout(() => setIsRendering(false), 600);
    return () => clearTimeout(t);
  }, []);

  const errors = useMemo(() => {
    const e = {};
    if (!form.email) e.email = "El email es obligatorio.";
    else if (!isEmail(form.email)) e.email = "Formato de email inválido.";
    if (!form.password) e.password = "La contraseña es obligatoria.";
    else if (form.password.length < 6)
      e.password = "Debe tener al menos 6 caracteres.";
    return e;
  }, [form]);

  const isValidForm = Object.keys(errors).length === 0;

  useEffect(() => {
    if (isAuth && justLoggedIn) {
      toast.success("¡Login exitoso! Redirigiendo...");
      const t = setTimeout(() => {
        const state = from === "/" ? { welcome: true } : undefined;
        navigate(from, { replace: true, state });
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [isAuth, justLoggedIn, navigate, from]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!isValidForm) {
      toast.error("Completa correctamente los campos.");
      return;
    }

    try {
      setLoading(true);
      await login(form.email, form.password);
      setJustLoggedIn(true);
    } catch (err) {
      if (err.message === "Failed to fetch") {
        toast.error("No se pudo conectar con el servidor.");
      } else {
        toast.error("Credenciales inválidas.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
    >
      <ToastContainer position="top-center" autoClose={2000} />
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            {isRendering ? (
              <Card className="shadow-sm p-4">
                <Skeleton height={30} width="60%" className="mb-3 mx-auto" />
                <Skeleton height={40} className="mb-3" />
                <Skeleton height={40} className="mb-3" />
                <Skeleton height={45} width="50%" className="mx-auto" />
              </Card>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title className="mb-3 text-center">
                      Iniciar sesión
                    </Card.Title>

                    <Form onSubmit={handleSubmit} noValidate>
                      <Form.Group className="mb-3" controlId="loginEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="tu@correo.com"
                          autoComplete="email"
                          value={form.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.email && !!errors.email}
                          isValid={touched.email && !errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-4" controlId="loginPass">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Mínimo 6 caracteres"
                          autoComplete="current-password"
                          value={form.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.password && !!errors.password}
                          isValid={touched.password && !errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <div className="d-grid">
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={!isValidForm || loading}
                        >
                          {loading ? (
                            <>
                              <Spinner
                                animation="border"
                                size="sm"
                                className="me-2"
                              />
                              Conectando...
                            </>
                          ) : (
                            "Entrar"
                          )}
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </motion.div>
            )}
          </Col>
        </Row>
      </Container>
    </motion.main>
  );
}
