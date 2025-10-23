/* eslint-disable no-unused-vars */
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v?.trim() || "");
const DEFAULT_NEXT = "/";

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const errors = useMemo(() => {
    const e = {};
    if (!form.email) e.email = "El email es obligatorio.";
    else if (!isEmail(form.email)) e.email = "Formato de email inválido.";
    if (!form.password) e.password = "La contraseña es obligatoria.";
    else if (form.password.length < 6)
      e.password = "Debe tener al menos 6 caracteres.";
    if (!form.confirmPassword)
      e.confirmPassword = "Debes confirmar la contraseña.";
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = "Las contraseñas no coinciden.";
    return e;
  }, [form]);

  const isValidForm = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true, confirmPassword: true });

    if (!isValidForm) {
      toast.error("Corrige los errores antes de continuar.");
      return;
    }

    try {
      setLoading(true);
      await register(form.email, form.password);
      setSuccess(true);
      toast.success("¡Registro exitoso! Bienvenido.");
      // mostrar pantalla de éxito luego redirigir
      setTimeout(() => setShowSuccessScreen(true), 500);
      setTimeout(() => navigate(DEFAULT_NEXT, { replace: true }), 4500);
    } catch (err) {
      toast.error(
        err.message === "Failed to fetch"
          ? "No se pudo conectar con el servidor."
          : "El usuario ya existe o hubo un error al registrarse."
      );
    } finally {
      setLoading(false);
    }
  };

  const passLen = form.password.length;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow-sm">
              <Card.Body>
                {!showSuccessScreen ? (
                  <>
                    <Card.Title className="mb-3 text-center">
                      Crear cuenta
                    </Card.Title>
                    <Form onSubmit={handleSubmit} noValidate>
                      <Form.Group className="mb-3" controlId="regEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="tu@correo.com"
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, email: e.target.value }))
                          }
                          onBlur={() =>
                            setTouched((t) => ({ ...t, email: true }))
                          }
                          isInvalid={touched.email && !!errors.email}
                          isValid={touched.email && !errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="regPass">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Mínimo 6 caracteres"
                          value={form.password}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, password: e.target.value }))
                          }
                          onBlur={() =>
                            setTouched((t) => ({ ...t, password: true }))
                          }
                          isInvalid={touched.password && !!errors.password}
                          isValid={touched.password && !errors.password}
                        />
                        <Form.Text>
                          {passLen === 0
                            ? "Escribe tu contraseña."
                            : `Largo actual: ${passLen} ${
                                passLen < 6 ? "(necesitas 6+)" : "OK"
                              }`}
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-4" controlId="regPass2">
                        <Form.Label>Confirmar contraseña</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          placeholder="Repite tu contraseña"
                          value={form.confirmPassword}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              confirmPassword: e.target.value,
                            }))
                          }
                          onBlur={() =>
                            setTouched((t) => ({
                              ...t,
                              confirmPassword: true,
                            }))
                          }
                          isInvalid={
                            touched.confirmPassword &&
                            !!errors.confirmPassword
                          }
                          isValid={
                            touched.confirmPassword &&
                            !errors.confirmPassword
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <div className="d-grid">
                        <motion.button
                          type="submit"
                          disabled={!isValidForm || loading}
                          className="btn btn-primary w-100"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {loading ? (
                            <>
                              <Spinner
                                animation="border"
                                size="sm"
                                className="me-2"
                              />
                              Creando cuenta...
                            </>
                          ) : (
                            "Crear cuenta"
                          )}
                        </motion.button>
                      </div>
                    </Form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center py-4"
                  >
                    <h4 className="text-success fw-bold mb-3">
                      ¡Registro completado!
                    </h4>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ fontSize: "3rem" }}
                    >
                      🍕
                    </motion.div>
                    <p className="mt-3 text-muted">Redirigiendo al inicio...</p>
                  </motion.div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </motion.main>
  );
}
