import React, { useEffect, useState } from "react";
import { useDiet } from "../context/DietContext";
import { Box, Card, CardContent, Typography, Button, CardMedia, Grid } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ✅ REGISTRO CORRECTO de elementos en Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Results = ({ onRegenerate }) => {
    const { calories, macronutrients, dietPlan } = useDiet();
    const [localDietPlan, setLocalDietPlan] = useState(null);

    // ⏳ Sincronizar `dietPlan` con `localDietPlan` para forzar renderizado
    useEffect(() => {
        if (dietPlan && dietPlan.meals) {
            setLocalDietPlan(dietPlan);
        }
    }, [dietPlan]);

    // 🚨 Mensaje de carga hasta que `dietPlan` esté disponible
    if (!calories || !macronutrients || !localDietPlan || !Array.isArray(localDietPlan.meals)) {
        return <Typography variant="h6" align="center">🔄 Calculando resultados...</Typography>;
    }

    return (
        <Box sx={{ maxWidth: "800px", margin: "20px auto", textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
                🍽️ Tu Plan de Dieta
            </Typography>

            {/* Tarjeta de calorías */}
            <Card sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="h6">🔥 Calorías necesarias por día</Typography>
                    <Typography variant="h4" color="primary">{calories.toFixed(2)} kcal</Typography>
                </CardContent>
            </Card>

            {/* Gráfico de macronutrientes */}
            {macronutrients && (
                <Card sx={{ mb: 2, textAlign: "center" }}>
                    <CardContent>
                        <Typography variant="h6">📊 Distribución de Macronutrientes</Typography>
                        <Pie
                            key={JSON.stringify(macronutrients)}
                            data={{
                                labels: ["Proteínas", "Carbohidratos", "Grasas"],
                                datasets: [{
                                    data: [macronutrients.proteinGrams, macronutrients.carbsGrams, macronutrients.fatGrams],
                                    backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
                                }]
                            }}
                        />
                    </CardContent>
                </Card>
            )}

            {/* Botón para regenerar plan */}
            <Button variant="contained" color="secondary" onClick={onRegenerate} sx={{ mb: 2 }}>
                🔄 Regenerar Plan de Comidas
            </Button>

            {/* Tarjetas de recetas */}
            <Typography variant="h5" gutterBottom>
                🍽️ Recetas Recomendadas
            </Typography>

            {/*  Recetas */}
            <Grid container spacing={2}>
                {localDietPlan.meals.map((meal, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ textAlign: "left", height: "100%" }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`https://spoonacular.com/recipeImages/${meal.id}-312x231.${meal.imageType}`} // Imagen de la API
                                alt={meal.title}
                                onError={(e) => e.target.src = "/images/default-food.jpg"} // Imagen por defecto si hay error
                            />
                            <CardContent>
                                <Typography variant="h6">{meal.title}</Typography>
                                <Typography variant="body2">🍽️ Porciones: {meal.servings || "No disponible"}</Typography>
                                <Typography variant="body2">⏳ Tiempo: {meal.readyInMinutes} min</Typography>
                                <Typography variant="body2">🔥 Calorías: {meal.nutrients?.calories || "N/A"} kcal</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    href={meal.sourceUrl}
                                    target="_blank"
                                    sx={{ mt: 1 }}
                                >
                                    📖 Ver Receta
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Results;

