/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function NotFound() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
    >
      <Container className="text-center my-5">
        {loading ? (
          <>
            <Skeleton height={50} width="60%" className="mx-auto mb-3" />
            <Skeleton height={25} width="40%" className="mx-auto mb-4" />
            <Skeleton height={45} width="30%" className="mx-auto" />
          </>
        ) : (
          <>
            <h1 className="display-4 mb-3">404 - Página no encontrada</h1>
            <p className="mb-4">La ruta que buscaste no existe.</p>
            <Link to="/" className="btn btn-primary btn-lg px-4">
              Volver al inicio
            </Link>
          </>
        )}
      </Container>
    </motion.main>
  );
}
