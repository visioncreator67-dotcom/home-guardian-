import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { VoiceProvider } from "./context/VoiceContext";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <VoiceProvider>
      <App />
    </VoiceProvider>
  </React.StrictMode>
);