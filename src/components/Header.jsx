import Container from "react-bootstrap/Container";
import headerImg from "../assets/header.jpg";

export default function Header() {
  return (
    <header className="position-relative text-center text-white">
      <img
        src={headerImg}
        alt="Pizzería Mamma Mia"
        loading="lazy"
        className="w-100"
        style={{
          maxHeight: "400px",
          objectFit: "cover",
          filter: "brightness(0.8)",
        }}
      />

      <div
        className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 
                   d-flex flex-column justify-content-center align-items-center"
      >
        <Container>
          <h1 className="display-5 fw-bold mb-2">Pizzería Mamma Mia!</h1>
          <p className="lead mb-0">¡Las mejores pizzas de la ciudad!</p>
        </Container>
      </div>
    </header>
  );
}
