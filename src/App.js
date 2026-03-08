import React, { Suspense } from "react";

// importación dinámicamente de los componentes de los microfrontends
const ProductList = React.lazy(() => import("productos/ProductList"));
//const CartInfo = React.lazy(() => import("carrito/CartInfo"));
const CartInfo = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(import("carrito/CartInfo"));
    }, 3000);
  });
});

const App = () => (
  <div style={{ fontFamily: "sans-serif" }}>
    <header
      style={{
        backgroundColor: "#333",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1>Aplicación Principal (Contenedor)</h1>
    </header>

    <main
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "20px",
        gap: "20px",
      }}
    >
      {/* Suspense muestra un mensaje mientras se descargan los microfrontends */}
      <Suspense fallback={<div>Cargando MFE de Productos...</div>}>
        <ProductList />
      </Suspense>

      <Suspense fallback={<div>Cargando MFE de Carrito...</div>}>
        <CartInfo />
      </Suspense>
    </main>
  </div>
);

export default App;
