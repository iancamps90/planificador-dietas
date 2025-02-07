// src/app.jsx
import React, { useState, useEffect } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import Results from "./components/Results";
import { useDiet } from "./context/DietContext";
import { Box, Typography } from "@mui/material";

const App = () => {
  const { dietPlan, calculateDiet } = useDiet();
  const [showResults, setShowResults] = useState(false);

  const handleUserData = (data) => {
    calculateDiet(data);
    setShowResults(true);  // ✅ Activamos `showResults` al enviar datos
  };

  // 🔥 🔄 ACTUALIZAMOS `showResults` AUTOMÁTICAMENTE CUANDO `dietPlan` CAMBIA
  useEffect(() => {
    if (dietPlan) {
      setShowResults(true);
    }
  }, [dietPlan]);

  const handleRegenerate = () => {
    if (dietPlan?.userData) {
      calculateDiet(dietPlan.userData);  // ✅ Volver a calcular con los mismos datos
    }
  };

  return (
    <Box sx={{ maxWidth: "800px", margin: "20px auto", textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Planificador de Dietas
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Bienvenido a tu herramienta personalizada para planificar dietas.
      </Typography>

      {/* 🔥 Renderizamos el formulario */}
      <UserForm onSubmit={handleUserData} />

      {/* 🔥 Mostrar `Results.jsx` automáticamente cuando `dietPlan` esté listo */}
      {showResults && dietPlan && <Results onRegenerate={handleRegenerate} />}
    </Box>
  );
};

export default App;


