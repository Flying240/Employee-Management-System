import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    // Plugins used by Vite (React in this case)
    plugins: [react()],

    server: {
        port: 3000,
    },
});
