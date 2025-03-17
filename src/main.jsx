import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { registerSW } from 'virtual:pwa-register'

// Registrar el service worker con un manejador básico de actualización
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('¡Hay una nueva versión disponible! ¿Quieres actualizar ahora?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('La aplicación está lista para uso sin conexión');
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
