import Container from "react-bootstrap/Container";

export default function Footer() {
  return (
    <footer className="border-top mt-4">
      <Container className="text-center py-3">
        © {new Date().getFullYear()} - Pizzería Mamma Mia!
      </Container>
    </footer>
  );
}
