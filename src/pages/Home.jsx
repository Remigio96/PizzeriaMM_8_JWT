/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import CardPizza from "../components/CardPizza";
import { usePizzas } from "../context/PizzaContext";
import Skeleton from "react-loading-skeleton";

export default function Home() {
  const { pizzas } = usePizzas();
  const loading = pizzas.length === 0;

  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
    >
      <Container className="my-4">
        <Row className="g-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Col key={i} xs={12} md={6} lg={4}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="p-3 border rounded shadow-sm">
                      <Skeleton height={180} className="mb-3" />
                      <Skeleton width="60%" height={20} className="mb-2" />
                      <Skeleton count={3} />
                      <Skeleton width="50%" height={24} className="mt-3" />
                    </div>
                  </motion.div>
                </Col>
              ))
            : pizzas.map((pz, i) => (
                <Col key={pz.id} xs={12} md={6} lg={4}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <CardPizza {...pz} />
                  </motion.div>
                </Col>
              ))}
        </Row>
      </Container>
    </motion.main>
  );
}