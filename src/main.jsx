import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { registerSW } from 'virtual:pwa-register'
import { UpdateModal } from './components/Molecules/UpdateModal/UpdateModal.jsx'

// Componente wrapper para manejar la actualización del service worker
const ServiceWorkerManager = ({ children }) => {
  const [needRefresh, setNeedRefresh] = useState(false);
  
  // Registrar el service worker con manejo de actualización usando el modal
  const updateSW = registerSW({
    onNeedRefresh() {
      // Verificar si el usuario ya rechazó esta actualización
      const lastUpdate = localStorage.getItem('lastUpdateRejected');
      const currentTime = new Date().getTime();
      
      // Si no hay registro previo o han pasado más de 24 horas desde el rechazo
      if (!lastUpdate || (currentTime - parseInt(lastUpdate)) > 24 * 60 * 60 * 1000) {
        setNeedRefresh(true);
      }
    },
    onOfflineReady() {
      console.log('La aplicación está lista para uso sin conexión');
    }
  });

  const handleUpdate = () => {
    updateSW(true);
    setNeedRefresh(false);
  };

  const handleCancel = () => {
    // Guardar la marca de tiempo cuando el usuario rechaza la actualización
    localStorage.setItem('lastUpdateRejected', new Date().getTime().toString());
    setNeedRefresh(false);
  };

  return (
    <>
      {children}
      {needRefresh && <UpdateModal onUpdate={handleUpdate} onCancel={handleCancel} />}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ServiceWorkerManager>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ServiceWorkerManager>
  </React.StrictMode>,
)
