import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Cart from "./pages/Cart";
import Pizza from "./pages/Pizza";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const { isAuth } = useAuth();
  const location = useLocation();

  return (
    <>
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/pizza/:id" element={<Pizza />} />
          <Route path="/cart" element={<Cart />} />

          <Route
            path="/login"
            element={isAuth ? <Navigate to="/" replace /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={isAuth ? <Navigate to="/" replace /> : <RegisterPage />}
          />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      <Footer />

      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </>
  );
}
