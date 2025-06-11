// 🔒 StrictMode helps highlight potential problems in your app during development.
import { StrictMode } from "react";

// 📦 createRoot is the modern way to render React apps (introduced in React 18+).
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ErrorProvider } from "./context/ErrorContext.jsx";

// 🚀 Get the <div id="root"> from index.html and render the App component inside it.
// React will control everything inside that <div> after this point.
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ErrorProvider>
            <App />
        </ErrorProvider>
    </StrictMode>
);
