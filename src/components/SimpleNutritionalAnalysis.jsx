// src/components/SimpleNutritionalAnalysis.jsx

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Chip
} from '@mui/material';
import {
  LocalFireDepartment as CaloriesIcon,
  Restaurant as ProteinIcon,
  Grain as CarbsIcon,
  Whatshot as FatIcon
} from '@mui/icons-material';

/**
 * SimpleNutritionalAnalysis Component - Análisis nutricional simplificado
 * 
 * Conceptos que aprenderás:
 * 1. Componente simplificado: Versión básica que funciona
 * 2. Debugging: Identificar problemas de datos
 * 3. Fallback data: Datos de respaldo
 */

const SimpleNutritionalAnalysis = ({ dailyPlan, targetCalories, macronutrients }) => {
  console.log('SimpleNutritionalAnalysis props:', { dailyPlan, targetCalories, macronutrients });

  // Datos de ejemplo si no hay datos reales
  const fallbackData = {
    calories: targetCalories || 2000,
    protein: macronutrients?.proteinGrams || 150,
    carbs: macronutrients?.carbsGrams || 250,
    fat: macronutrients?.fatGrams || 67
  };

  // Calcular macronutrientes del día si hay datos
  let dailyMacros = fallbackData;
  
  if (dailyPlan) {
    const meals = [dailyPlan.breakfast, dailyPlan.lunch, dailyPlan.dinner, dailyPlan.snack]
      .filter(meal => meal !== null);

    dailyMacros = meals.reduce((totals, meal) => ({
      protein: totals.protein + (meal.protein || 0),
      carbs: totals.carbs + (meal.carbs || 0),
      fat: totals.fat + (meal.fat || 0),
      calories: totals.calories + (meal.calories || 0)
    }), { protein: 0, carbs: 0, fat: 0, calories: 0 });

    // Si no hay datos de comidas, usar los del contexto
    if (dailyMacros.calories === 0) {
      dailyMacros = fallbackData;
    }
  }

  // Calcular porcentajes
  const proteinPercentage = dailyMacros.calories > 0 ? (dailyMacros.protein * 4 / dailyMacros.calories) * 100 : 0;
  const carbsPercentage = dailyMacros.calories > 0 ? (dailyMacros.carbs * 4 / dailyMacros.calories) * 100 : 0;
  const fatPercentage = dailyMacros.calories > 0 ? (dailyMacros.fat * 9 / dailyMacros.calories) * 100 : 0;

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        📊 Análisis Nutricional
      </Typography>

      {/* Resumen de calorías */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CaloriesIcon color="primary" />
            Resumen de Calorías
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
              {dailyMacros.calories.toFixed(0)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              calorías por día
            </Typography>
            {targetCalories && (
              <Chip 
                label={`Objetivo: ${targetCalories} cal`}
                color={dailyMacros.calories >= targetCalories * 0.9 ? 'success' : 'warning'}
                sx={{ mt: 1 }}
              />
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Macronutrientes */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light', color: 'white' }}>
            <ProteinIcon sx={{ fontSize: 32, mb: 1 }} />
            <Typography variant="h5">{dailyMacros.protein.toFixed(0)}g</Typography>
            <Typography variant="body2">Proteínas</Typography>
            <Typography variant="caption">({proteinPercentage.toFixed(1)}%)</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light', color: 'white' }}>
            <CarbsIcon sx={{ fontSize: 32, mb: 1 }} />
            <Typography variant="h5">{dailyMacros.carbs.toFixed(0)}g</Typography>
            <Typography variant="body2">Carbohidratos</Typography>
            <Typography variant="caption">({carbsPercentage.toFixed(1)}%)</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.light', color: 'white' }}>
            <FatIcon sx={{ fontSize: 32, mb: 1 }} />
            <Typography variant="h5">{dailyMacros.fat.toFixed(0)}g</Typography>
            <Typography variant="body2">Grasas</Typography>
            <Typography variant="caption">({fatPercentage.toFixed(1)}%)</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Información de debug */}
      <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Debug Info:</strong><br/>
          dailyPlan: {dailyPlan ? 'existe' : 'null'}<br/>
          targetCalories: {targetCalories || 'null'}<br/>
          macronutrients: {macronutrients ? 'existe' : 'null'}
        </Typography>
      </Box>
    </Box>
  );
};

export default SimpleNutritionalAnalysis;
