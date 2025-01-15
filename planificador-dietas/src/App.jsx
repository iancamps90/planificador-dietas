import { useState } from 'react';
import './App.css';
import React from "react";
import UserForm from "./components/UserForm";



  
const App = () => {
    
  // Estado para guardar los datos del usuario y las calorías calculadas
  const [userData, setUserData] = useState(null);

  // Función para manejar el envío del formulario
  const handleUserData = (data) => {
    setUserData(data); // Guardamos los datos en el estado
  };

    return (
      <div>
        <h1>Planificador de Dietas</h1>
        <h4>Bienvenido a tu herramienta personalizada para planificar dietas.</h4>
        {/* Renderizamos el formulario y pasamos la función handleFormSubmit como prop */}
        <UserForm onSubmit={handleUserData} />

        {/* Mostrar los resultados si existen */}
        {userData && (
          <div className="results-container">
            <h2>Resultados:</h2>
            <p><strong>Peso:</strong> {userData.weight} kg</p>
            <p><strong>Altura:</strong> {userData.height} cm</p>
            <p><strong>Edad:</strong> {userData.age} años</p>
            <p><strong>Género:</strong> {userData.gender === "male" ? "Hombre" : "Mujer"}</p>
            <p><strong>Nivel de actividad:</strong> {userData.activityLevel}</p>
            <p><strong>Calorías necesarias por día:</strong> {userData.dailyCalories.toFixed(2)} kcal</p>
          </div>
        )}
      </div>
    );

  }


export default App;
