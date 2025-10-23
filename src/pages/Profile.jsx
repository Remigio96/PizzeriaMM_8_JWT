/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

export default function Profile() {
  const { user, logout, getProfile, isAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await getProfile();
      setTimeout(() => setLoading(false), 800);
    })();
  }, [getProfile]);

  if (!isAuth) return <Navigate to="/login" replace />;

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
    >
      <Container className="my-4">
        <Card className="shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
          <Card.Body>
            <Card.Title className="text-center mb-3">Mi perfil</Card.Title>

            {loading ? (
              <>
                <Skeleton height={20} width="70%" className="mb-3" />
                <Skeleton height={38} width="40%" />
              </>
            ) : (
              <>
                <p className="mb-3 text-center">
                  Email: <strong>{user?.email || "Desconocido"}</strong>
                </p>
                <div className="d-flex justify-content-center">
                  <Button variant="danger" onClick={handleLogout}>
                    Cerrar sesión
                  </Button>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </motion.main>
  );
}
