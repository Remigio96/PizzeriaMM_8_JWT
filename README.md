# 🍕 Pizzería Mamma Mia - Hito 8: Autenticación JWT

<img width="912" height="582" alt="image" src="https://github.com/user-attachments/assets/ab28a661-0255-4b64-a67d-5d64c755f45d" />

## 🍕 Descripción General

En este hito se implementa una autenticación real basada en JWT (JSON Web Token)conectada a un backend REST. El proyecto evoluciona de la versión anterior (Hito 7) incorporando inicio de sesión, registro y perfil de usuario autenticado mediante peticiones `fetch` al backend, así como validación de compras protegidas con token.

El flujo completo incluye:

* Inicio y registro de usuarios contra API real.
* Persistencia del token JWT y datos del usuario.
* Visualización del perfil autenticado.
* Envío del carrito al backend (checkout simulado).
* Rutas protegidas y control de acceso.

---

## 🍕 Tecnologías utilizadas

* **Vite + React 19**
* **React Context API** (`AuthContext`, `CartContext`, `PizzaContext`)
* **React Router v7** (rutas protegidas, dinámicas y redirecciones)
* **React-Bootstrap + Bootstrap 5.3**
* **Framer Motion** (animaciones)
* **React Toastify + Skeleton Loader** (feedback visual y loaders)
* **GitHub Actions + Pages** (CI/CD)

---

## 🍕 Estructura del proyecto

```
src/
├── components/        # Navbar, Header, Footer, CardPizza
├── context/           # AuthContext, CartContext, PizzaContext
├── data/              # pizzas.js (datos locales fallback)
├── pages/             # Home, Pizza, Cart, Login, Register, Profile, NotFound
├── routes/            # ProtectedRoute.jsx
├── styles/            # Estilos personalizados (navbar.css)
├── App.jsx            # Rutas y layout principal
└── main.jsx           # Punto de entrada con Providers
```

---

## 🍕 Backend y Endpoints

Según los requerimientos, se consumen las siguientes rutas del backend:

### **Autenticación (Auth)**

* `POST /api/auth/login` — Login de usuario.
* `POST /api/auth/register` — Registro de usuario.

**Body:**

```json
{
  "email": "test@example.com",
  "password": "123123"
}
```

**Respuesta esperada:**

```json
{
  "email": "test@example.com",
  "token": "jwt_token_generado"
}
```

### **Perfil (Profile)**

* `GET /api/auth/me` — Devuelve el email del usuario autenticado. Requiere header:

```
Authorization: Bearer <token>
```

### **Checkout (Compra simulada)**

* `POST /api/checkouts` — Envía el carrito al servidor (solo validación).

**Body:**

```json
{
  "cart": [...]
}
```

---

## 🍕 Contextos Globales

| Contexto         | Propósito                                  | Funciones principales                       | Persistencia   |
| ---------------- | ------------------------------------------ | ------------------------------------------- | -------------- |
| **AuthContext**  | Manejo de sesión y JWT                     | `login`, `register`, `getProfile`, `logout` | `localStorage` |
| **CartContext**  | Carrito de compras global                  | `add`, `inc`, `dec`, `remove`               | `localStorage` |
| **PizzaContext** | Carga de pizzas desde API o fallback local | `fetchPizzas()`                             | Memoria        |

---

## 🍕 Requerimientos implementados

| # | Descripción                                                        | Estado |
| - | ------------------------------------------------------------------ | ------ |
| 1 | Login y registro consumen `/api/auth/login` y `/api/auth/register` | ✅      |
| 2 | Logout elimina token y usuario del estado                          | ✅      |
| 3 | `getProfile()` obtiene `/api/auth/me` y muestra el email           | ✅      |
| 4 | LoginPage y RegisterPage usan los métodos del `AuthContext`        | ✅      |
| 5 | Profile muestra email y botón de cerrar sesión                     | ✅      |
| 6 | Navbar incluye botón de logout funcional                           | ✅      |
| 7 | Cart envía carrito al backend (`/api/checkouts`)                   | ✅      |
| 8 | Mensaje de éxito al completar compra                               | ✅      |

---

## 🍕 Flujo de navegación

| Ruta         | Descripción                                   | Acceso                           |
| ------------ | --------------------------------------------- | -------------------------------- |
| `/`          | Listado de pizzas (`Home`)                    | Pública                          |
| `/pizza/:id` | Detalle dinámico de pizza                     | Pública                          |
| `/cart`      | Carrito de compras con simulación de checkout | Pública                          |
| `/login`     | Iniciar sesión                                | Pública (redirige si ya logeado) |
| `/register`  | Crear cuenta                                  | Pública (redirige si ya logeado) |
| `/profile`   | Perfil con email y logout                     | Protegida                        |
| `*`          | Página 404 personalizada                      | Pública                          |

---

## 🍕 Características visuales adicionales

* **Animaciones suaves con Framer Motion** en vistas y componentes.
* **Skeletons** en carga inicial para mejor UX.
* **Toasts** informativos para login, registro, logout y checkout.
* **Navbar translúcido sticky con blur y botones dinámicos.**
* **Background SVG global** aplicado desde `index.html`.

---

## 🍕 Live Preview
<img width="1918" height="578" alt="image" src="https://github.com/user-attachments/assets/c2df79a6-3161-470e-8cff-10b0f49f29cb" />

https://remigio96.github.io/PizzeriaMM_8_JWT
