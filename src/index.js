import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
