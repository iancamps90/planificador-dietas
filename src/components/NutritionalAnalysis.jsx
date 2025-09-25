// src/components/NutritionalAnalysis.jsx

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  TrendingUp as TrendingIcon,
  LocalFireDepartment as CaloriesIcon,
  Restaurant as ProteinIcon,
  Grain as CarbsIcon,
  Whatshot as FatIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * NutritionalAnalysis Component - Análisis nutricional avanzado
 * 
 * Conceptos que aprenderás:
 * 1. Data visualization: Crear gráficos interactivos con Chart.js
 * 2. Nutritional calculations: Cálculos nutricionales complejos
 * 3. Progress indicators: Indicadores de progreso visual
 * 4. Health recommendations: Sistema de recomendaciones de salud
 */

const NutritionalAnalysis = ({ dailyPlan, targetCalories, macronutrients }) => {
  console.log('NutritionalAnalysis props:', { dailyPlan, targetCalories, macronutrients });
  
  if (!dailyPlan || !targetCalories) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Completa el plan de dieta para ver el análisis nutricional
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Debug: dailyPlan={dailyPlan ? 'existe' : 'null'}, targetCalories={targetCalories || 'null'}
        </Typography>
      </Box>
    );
  }

  // Calcular macronutrientes del día
  const calculateDailyMacros = () => {
    const meals = [dailyPlan.breakfast, dailyPlan.lunch, dailyPlan.dinner, dailyPlan.snack]
      .filter(meal => meal !== null);

    return meals.reduce((totals, meal) => ({
      protein: totals.protein + (meal.protein || 0),
      carbs: totals.carbs + (meal.carbs || 0),
      fat: totals.fat + (meal.fat || 0),
      calories: totals.calories + (meal.calories || 0)
    }), { protein: 0, carbs: 0, fat: 0, calories: 0 });
  };

  const dailyMacros = calculateDailyMacros();
  
  // Si no hay macronutrientes calculados, usar los del contexto
  const effectiveMacros = dailyMacros.calories > 0 ? dailyMacros : {
    protein: macronutrients?.proteinGrams || 0,
    carbs: macronutrients?.carbsGrams || 0,
    fat: macronutrients?.fatGrams || 0,
    calories: targetCalories || 0
  };

  // Calcular porcentajes de macronutrientes
  const proteinPercentage = effectiveMacros.calories > 0 ? (effectiveMacros.protein * 4 / effectiveMacros.calories) * 100 : 0;
  const carbsPercentage = effectiveMacros.calories > 0 ? (effectiveMacros.carbs * 4 / effectiveMacros.calories) * 100 : 0;
  const fatPercentage = effectiveMacros.calories > 0 ? (effectiveMacros.fat * 9 / effectiveMacros.calories) * 100 : 0;

  // Análisis de calorías
  const calorieAnalysis = {
    consumed: effectiveMacros.calories,
    target: targetCalories,
    difference: effectiveMacros.calories - targetCalories,
    percentage: targetCalories > 0 ? (effectiveMacros.calories / targetCalories) * 100 : 0
  };

  // Recomendaciones nutricionales
  const getNutritionalRecommendations = () => {
    const recommendations = [];

    // Análisis de calorías
    if (calorieAnalysis.percentage < 90) {
      recommendations.push({
        type: 'warning',
        icon: <WarningIcon />,
        title: 'Calorías insuficientes',
        message: `Estás consumiendo ${calorieAnalysis.difference.toFixed(0)} calorías menos de lo recomendado. Considera añadir un snack saludable.`
      });
    } else if (calorieAnalysis.percentage > 110) {
      recommendations.push({
        type: 'warning',
        icon: <WarningIcon />,
        title: 'Exceso de calorías',
        message: `Estás consumiendo ${calorieAnalysis.difference.toFixed(0)} calorías más de lo recomendado. Considera reducir las porciones.`
      });
    } else {
      recommendations.push({
        type: 'success',
        icon: <CheckIcon />,
        title: 'Calorías equilibradas',
        message: 'Tu consumo calórico está dentro del rango recomendado. ¡Excelente!'
      });
    }

    // Análisis de proteínas
    if (proteinPercentage < 15) {
      recommendations.push({
        type: 'warning',
        icon: <WarningIcon />,
        title: 'Proteínas insuficientes',
        message: 'Aumenta el consumo de proteínas. Considera añadir huevos, pollo o legumbres.'
      });
    } else if (proteinPercentage > 35) {
      recommendations.push({
        type: 'info',
        icon: <InfoIcon />,
        title: 'Alto consumo de proteínas',
        message: 'Tu consumo de proteínas es alto. Asegúrate de beber suficiente agua.'
      });
    } else {
      recommendations.push({
        type: 'success',
        icon: <CheckIcon />,
        title: 'Proteínas equilibradas',
        message: 'Tu consumo de proteínas está en el rango óptimo.'
      });
    }

    // Análisis de carbohidratos
    if (carbsPercentage < 40) {
      recommendations.push({
        type: 'info',
        icon: <InfoIcon />,
        title: 'Bajo consumo de carbohidratos',
        message: 'Considera añadir más carbohidratos complejos como arroz integral o quinoa.'
      });
    } else if (carbsPercentage > 65) {
      recommendations.push({
        type: 'warning',
        icon: <WarningIcon />,
        title: 'Alto consumo de carbohidratos',
        message: 'Reduce el consumo de carbohidratos y aumenta las proteínas y grasas saludables.'
      });
    }

    return recommendations;
  };

  const recommendations = getNutritionalRecommendations();

  // Datos para el gráfico de macronutrientes
  const macroChartData = {
    labels: ['Proteínas', 'Carbohidratos', 'Grasas'],
    datasets: [{
      data: [effectiveMacros.protein, effectiveMacros.carbs, effectiveMacros.fat],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  // Datos para el gráfico de calorías
  const calorieChartData = {
    labels: ['Consumido', 'Restante'],
    datasets: [{
      data: [calorieAnalysis.consumed, Math.max(0, calorieAnalysis.target - calorieAnalysis.consumed)],
      backgroundColor: ['#4CAF50', '#E0E0E0'],
      borderWidth: 0
    }]
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TrendingIcon color="primary" />
        Análisis Nutricional
      </Typography>

      <Grid container spacing={3}>
        {/* Resumen de calorías */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CaloriesIcon color="primary" />
                Balance Calórico
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Consumido</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {calorieAnalysis.consumed.toFixed(0)} kcal
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(100, calorieAnalysis.percentage)}
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Objetivo: {calorieAnalysis.target.toFixed(0)} kcal
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {calorieAnalysis.percentage.toFixed(1)}%
                  </Typography>
                </Box>
              </Box>

              <Chip
                label={`${calorieAnalysis.difference > 0 ? '+' : ''}${calorieAnalysis.difference.toFixed(0)} kcal`}
                color={Math.abs(calorieAnalysis.difference) < 100 ? 'success' : 'warning'}
                size="small"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Distribución de macronutrientes */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Macronutrientes
              </Typography>
              
              <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Pie data={macroChartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Detalles de macronutrientes */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light', color: 'white' }}>
            <ProteinIcon sx={{ fontSize: 32, mb: 1 }} />
            <Typography variant="h5">{effectiveMacros.protein.toFixed(0)}g</Typography>
            <Typography variant="body2">Proteínas</Typography>
            <Typography variant="caption">({proteinPercentage.toFixed(1)}%)</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light', color: 'white' }}>
            <CarbsIcon sx={{ fontSize: 32, mb: 1 }} />
            <Typography variant="h5">{effectiveMacros.carbs.toFixed(0)}g</Typography>
            <Typography variant="body2">Carbohidratos</Typography>
            <Typography variant="caption">({carbsPercentage.toFixed(1)}%)</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.light', color: 'white' }}>
            <FatIcon sx={{ fontSize: 32, mb: 1 }} />
            <Typography variant="h5">{effectiveMacros.fat.toFixed(0)}g</Typography>
            <Typography variant="body2">Grasas</Typography>
            <Typography variant="caption">({fatPercentage.toFixed(1)}%)</Typography>
          </Paper>
        </Grid>

        {/* Recomendaciones */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                💡 Recomendaciones Nutricionales
              </Typography>
              
              <List>
                {recommendations.map((rec, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        {rec.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={rec.title}
                        secondary={rec.message}
                      />
                    </ListItem>
                    {index < recommendations.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NutritionalAnalysis;
