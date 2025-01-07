import { useState } from 'react';
import './App.css';
import React from "react";
import UserForm from "./components/UserForm";



  
const App = () => {
    
  // Función para manejar el envío del formulario
  const handleUserData = (data) => {
    console.log("Datos del usuario:", data);
    // Aquí calcularemos las calorías más adelante
  };

    return (
      <div>
        <h1>Planificador de Dietas</h1>
        <h4>Bienvenido a tu herramienta personalizada para planificar dietas.</h4>
        {/* Renderizamos el formulario y pasamos la función handleFormSubmit como prop */}
        <UserForm onSubmit={handleUserData} />
      </div>
    );

  }


export default App;
