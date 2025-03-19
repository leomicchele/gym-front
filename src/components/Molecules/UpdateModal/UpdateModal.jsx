import React from 'react';
import './UpdateModal.css';

export const UpdateModal = ({ onUpdate, onCancel }) => {
  return (
    <div className="update-modal-overlay">
      <div className="update-modal">
        <h2>Actualización Disponible</h2>
        <p>¡Hay una nueva versión de <span className="text-primary fw-bold">KAIROSS</span>!</p>
        {/* emoticon de musculo*/}

        <div className="update-modal-buttons">
          <button onClick={onCancel} className="cancel-button color-primary">
            <span>Más tarde</span>
            <span>🕒</span>
          </button>
          <button onClick={onUpdate} className="update-button color-success">
            <span>Actualizar</span>
            <span>💪</span>
          </button>
        </div>
      </div>
    </div>
  );
}; 