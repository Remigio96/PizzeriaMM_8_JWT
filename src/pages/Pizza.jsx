/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useCart } from "../context/CartContext";
import { usePizzas } from "../context/PizzaContext";
import { FaArrowLeft, FaCartPlus } from "react-icons/fa";

const clp = (n) => n.toLocaleString("es-CL");

export default function Pizza() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState(null);
  const { add } = useCart();
  const { pizzas } = usePizzas();

  useEffect(() => {
    const fetchPizza = async () => {
      const localPizza = pizzas.find((p) => p.id === id);
      if (localPizza) {
        setPizza(localPizza);
        return;
      }

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL ?? "http://localhost:5000/api"}/pizzas/${id}`
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        setPizza(data);
      } catch {
        setPizza(null);
      }
    };

    fetchPizza();
  }, [id, pizzas]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <Container className="my-4">
        <Card className="shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
          {!pizza ? (
            <>
              <Skeleton height={320} />
              <Card.Body>
                <Skeleton height={28} width="70%" className="mb-2" />
                <Skeleton count={3} />
                <div className="d-flex justify-content-between mt-3">
                  <Skeleton height={38} width={120} />
                  <Skeleton height={38} width={120} />
                </div>
              </Card.Body>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card.Img
                variant="top"
                src={pizza.img}
                alt={pizza.name}
                loading="lazy"
                style={{ objectFit: "cover", height: "320px" }}
              />
              <Card.Body>
                <Card.Title className="text-capitalize">{pizza.name}</Card.Title>
                <h5>Precio: ${clp(pizza.price)}</h5>
                {pizza.desc && <p>{pizza.desc}</p>}
                <ul>
                  {pizza.ingredients.map((ing, idx) => (
                    <li key={`${ing}-${idx}`}>{ing}</li>
                  ))}
                </ul>

                <div className="d-flex justify-content-between mt-3">
                  <Button
                    variant="secondary"
                    onClick={() => navigate(-1)}
                    className="d-flex align-items-center gap-2"
                  >
                    <FaArrowLeft /> Volver
                  </Button>

                  <Button
                    variant="primary"
                    onClick={() => add(pizza)}
                    className="d-flex align-items-center gap-2"
                  >
                    <FaCartPlus /> Añadir
                  </Button>
                </div>
              </Card.Body>
            </motion.div>
          )}
        </Card>
      </Container>
    </motion.main>
  );
}
