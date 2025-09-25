// src/components/DietPlan.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Alert,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper,
  CircularProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  ExpandMore as ExpandMoreIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  ShoppingCart as ShoppingCartIcon,
  AccessTime as TimeIcon,
  LocalFireDepartment as CaloriesIcon,
  RestaurantMenu as MenuIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material';
import { useDiet } from '../context/DietContext';
import { generateDailyMealPlan, calculateDailyCalories } from '../data/mealDatabase';
import SimpleNutritionalAnalysis from './SimpleNutritionalAnalysis';
import { generateDietPlanPDF } from '../utils/pdfGenerator';
import AnimatedCard from './AnimatedCard';
import AnimatedButton from './AnimatedButton';
import { motion } from 'framer-motion';
import notificationManager from '../utils/notifications';

/**
 * DietPlan Component - Plan de dieta semanal completo
 * 
 * Conceptos que aprenderás:
 * 1. Complex state management: Manejar múltiples estados relacionados
 * 2. Data processing: Procesar y mostrar datos complejos
 * 3. LocalStorage integration: Guardar y cargar planes completos
 * 4. Export functionality: Preparar datos para exportación
 * 5. Responsive design: Adaptar layout a diferentes pantallas
 */

const DietPlan = () => {
  const { calories, macronutrients } = useDiet();
  const [weeklyPlan, setWeeklyPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shoppingList, setShoppingList] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Días de la semana
  const weekDays = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
  ];

  /**
   * Cargar plan guardado del localStorage al montar el componente
   */
  useEffect(() => {
    const savedPlan = localStorage.getItem('weeklyMealPlan');
    const savedFavorites = localStorage.getItem('favoriteMeals');
    
    if (savedPlan) {
      setWeeklyPlan(JSON.parse(savedPlan));
    }
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  /**
   * Generar plan semanal completo
   */
  const generateWeeklyPlan = async () => {
    if (!calories) {
      alert('Primero calcula tus calorías en la sección Calculadora');
      return;
    }

    setLoading(true);
    
    try {
      const plan = {};
      
      // Generar plan para cada día de la semana
      for (let i = 0; i < 7; i++) {
        const dailyPlan = generateDailyMealPlan(calories);
        plan[weekDays[i]] = dailyPlan;
      }

      setWeeklyPlan(plan);
      
      // Guardar en localStorage
      localStorage.setItem('weeklyMealPlan', JSON.stringify(plan));
      
      // Generar lista de compras
      generateShoppingList(plan);
      
      // Configurar notificaciones de comidas
      await setupMealNotifications(plan);
      
      // Mostrar notificación de éxito
      notificationManager.showNotification({
        title: '🎉 ¡Plan generado!',
        body: 'Tu plan de dieta semanal está listo',
        tag: 'plan-generated'
      });
      
    } catch (error) {
      console.error('Error generando plan:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Generar lista de compras basada en el plan semanal
   */
  const generateShoppingList = (plan) => {
    const ingredients = new Map();
    
    Object.values(plan).forEach(day => {
      Object.values(day).forEach(meal => {
        if (meal && meal.ingredients) {
          meal.ingredients.forEach(ingredient => {
            ingredients.set(ingredient, (ingredients.get(ingredient) || 0) + 1);
          });
        }
      });
    });

    const shoppingList = Array.from(ingredients.entries()).map(([ingredient, count]) => ({
      ingredient,
      count
    }));

    setShoppingList(shoppingList);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  };

  /**
   * Regenerar plan para un día específico
   */
  const regenerateDay = (dayName) => {
    if (!calories) return;

    const newDailyPlan = generateDailyMealPlan(calories);
    const updatedPlan = {
      ...weeklyPlan,
      [dayName]: newDailyPlan
    };

    setWeeklyPlan(updatedPlan);
    localStorage.setItem('weeklyMealPlan', JSON.stringify(updatedPlan));
    generateShoppingList(updatedPlan);
  };

  /**
   * Configurar notificaciones de comidas
   */
  const setupMealNotifications = async (plan) => {
    try {
      // Solicitar permiso para notificaciones
      const hasPermission = await notificationManager.requestPermission();
      
      if (hasPermission && plan.Lunes) {
        const mealSchedule = {
          breakfast: { time: '08:00', meal: plan.Lunes.breakfast, mealType: 'Desayuno' },
          lunch: { time: '13:00', meal: plan.Lunes.lunch, mealType: 'Almuerzo' },
          dinner: { time: '20:00', meal: plan.Lunes.dinner, mealType: 'Cena' },
          snack: { time: '16:00', meal: plan.Lunes.snack, mealType: 'Snack' }
        };
        
        // Programar recordatorios
        notificationManager.scheduleMealReminders(mealSchedule);
        
        // Programar recordatorios de hidratación
        notificationManager.scheduleHydrationReminders();
      }
    } catch (error) {
      console.error('Error configurando notificaciones:', error);
    }
  };

  /**
   * Añadir comida a favoritos
   */
  const addToFavorites = (meal) => {
    const newFavorites = [...favorites, meal];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteMeals', JSON.stringify(newFavorites));
    
    // Notificación de favorito añadido
    notificationManager.showNotification({
      title: '⭐ ¡Agregado a favoritos!',
      body: `${meal.name} se ha guardado en tus favoritos`,
      tag: 'favorite-added'
    });
  };

  /**
   * Exportar plan a CSV
   */
  const exportToCSV = () => {
    if (!weeklyPlan) return;

    let csvContent = "Día,Comida,Nombre,Calorías,Proteínas,Carbohidratos,Grasas\n";
    
    Object.entries(weeklyPlan).forEach(([day, dayPlan]) => {
      Object.entries(dayPlan).forEach(([mealType, meal]) => {
        if (meal && meal.name) {
          csvContent += `${day},${mealType},${meal.name},${meal.calories},${meal.protein},${meal.carbs},${meal.fat}\n`;
        }
      });
    });

    // Crear y descargar archivo
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'plan_dieta_semanal.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  /**
   * Exportar plan a PDF
   */
  const exportToPDF = async () => {
    if (!weeklyPlan || !calories || !macronutrients) return;
    
    try {
      const userData = JSON.parse(localStorage.getItem('fitnessCalculatorData') || '{}');
      await generateDietPlanPDF(weeklyPlan, userData, { calories, ...macronutrients });
    } catch (error) {
      console.error('Error generando PDF:', error);
      alert('Error al generar el PDF. Inténtalo de nuevo.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box>
        {/* Header de la sección */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <RestaurantIcon color="primary" />
              </motion.div>
              Plan de Dieta Semanal
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Genera tu plan de comidas personalizado basado en tus calorías
            </Typography>
          </Box>
        </motion.div>

      {/* Información de calorías */}
      {calories && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Calorías objetivo:</strong> {calories.toFixed(0)} kcal/día
            {macronutrients && (
              <span>
                {' | '}
                <strong>Proteínas:</strong> {macronutrients.proteinGrams.toFixed(0)}g
                {' | '}
                <strong>Carbohidratos:</strong> {macronutrients.carbsGrams.toFixed(0)}g
                {' | '}
                <strong>Grasas:</strong> {macronutrients.fatGrams.toFixed(0)}g
              </span>
            )}
          </Typography>
        </Alert>
      )}

      {/* Botones de acción */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <AnimatedButton
          variant="contained"
          onClick={generateWeeklyPlan}
          loading={loading}
          disabled={!calories}
          size="large"
        >
          {loading ? 'Generando...' : 'Generar Plan Semanal'}
        </AnimatedButton>
        
        {weeklyPlan && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <AnimatedButton
              variant="outlined"
              onClick={exportToCSV}
            >
              📄 Exportar CSV
            </AnimatedButton>
            <AnimatedButton
              variant="outlined"
              onClick={exportToPDF}
              color="secondary"
            >
              📄 Exportar PDF
            </AnimatedButton>
            <AnimatedButton
              variant="outlined"
              onClick={() => setShoppingList([])}
            >
              🛒 Lista de Compras
            </AnimatedButton>
            <AnimatedButton
              variant="outlined"
              onClick={() => setupMealNotifications(weeklyPlan)}
              color="success"
            >
              🔔 Activar Notificaciones
            </AnimatedButton>
          </motion.div>
        )}
      </Box>

      {/* Plan semanal */}
      {weeklyPlan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Grid container spacing={3}>
            {weekDays.map((day, index) => {
              const dayPlan = weeklyPlan[day];
              if (!dayPlan) return null;

              return (
                <Grid item xs={12} md={6} lg={4} key={day}>
                  <AnimatedCard
                    delay={index * 0.1}
                    direction="up"
                    distance={30}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" color="primary">
                        {day}
                      </Typography>
                      <Tooltip title="Regenerar día">
                        <IconButton onClick={() => regenerateDay(day)} size="small">
                          <RefreshIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    {/* Resumen del día */}
                    <Paper sx={{ p: 1, mb: 2, bgcolor: 'primary.light', color: 'white' }}>
                      <Typography variant="body2" align="center">
                        <CaloriesIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        {dayPlan.totalCalories} kcal totales
                      </Typography>
                    </Paper>

                    {/* Comidas del día */}
                    {Object.entries(dayPlan).map(([mealType, meal]) => {
                      if (!meal || mealType === 'totalCalories') return null;

                      return (
                        <Accordion key={mealType} sx={{ mb: 1 }}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                              <Typography variant="body2" sx={{ flexGrow: 1, textTransform: 'capitalize' }}>
                                {mealType === 'breakfast' ? 'Desayuno' :
                                 mealType === 'lunch' ? 'Almuerzo' :
                                 mealType === 'dinner' ? 'Cena' : 'Snack'}
                              </Typography>
                              <Chip
                                label={`${meal.calories} kcal`}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                            </Box>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                {meal.image && (
                                  <Box
                                    component="img"
                                    src={meal.image}
                                    alt={meal.name}
                                    sx={{
                                      width: 60,
                                      height: 60,
                                      borderRadius: 2,
                                      objectFit: 'cover'
                                    }}
                                  />
                                )}
                                <Typography variant="h6" color="primary">
                                  {meal.name}
                                </Typography>
                              </Box>
                              
                              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                                <Chip label={`${meal.protein}g proteína`} size="small" />
                                <Chip label={`${meal.carbs}g carbohidratos`} size="small" />
                                <Chip label={`${meal.fat}g grasas`} size="small" />
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <TimeIcon sx={{ fontSize: 16 }} />
                                <Typography variant="body2">
                                  {meal.prepTime} minutos
                                </Typography>
                                <Chip label={meal.difficulty} size="small" variant="outlined" />
                              </Box>

                              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {meal.instructions}
                              </Typography>

                              <Divider sx={{ my: 1 }} />

                              <Typography variant="subtitle2" gutterBottom>
                                Ingredientes:
                              </Typography>
                              {meal.ingredients && meal.ingredients.length > 0 ? (
                                <List dense>
                                  {meal.ingredients.map((ingredient, index) => (
                                    <ListItem key={index} sx={{ py: 0 }}>
                                      <ListItemIcon>
                                        <RestaurantIcon sx={{ fontSize: 16 }} />
                                      </ListItemIcon>
                                      <ListItemText primary={ingredient} />
                                    </ListItem>
                                  ))}
                                </List>
                              ) : (
                                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                  Ingredientes no disponibles
                                </Typography>
                              )}

                              <Button
                                size="small"
                                startIcon={<FavoriteIcon />}
                                onClick={() => addToFavorites(meal)}
                                sx={{ mt: 1 }}
                              >
                                Añadir a Favoritos
                              </Button>
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                  </AnimatedCard>
                </Grid>
              );
            })}
          </Grid>
        </motion.div>
      )}

      {/* Análisis nutricional */}
      {weeklyPlan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <SimpleNutritionalAnalysis 
                dailyPlan={weeklyPlan.Lunes} 
                targetCalories={calories}
                macronutrients={macronutrients}
              />
            </CardContent>
          </Card>
        </motion.div>
      )}


      {/* Lista de compras */}
      {shoppingList.length > 0 && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShoppingCartIcon color="primary" />
              Lista de Compras
            </Typography>
            <Grid container spacing={1}>
              {shoppingList.map((item, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <Chip
                    label={`${item.ingredient} (${item.count})`}
                    variant="outlined"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Mensaje si no hay datos */}
      {!calories && (
        <Alert severity="warning" sx={{ mt: 4 }}>
          <Typography variant="body2">
            Primero calcula tus calorías en la sección "Calculadora" para generar tu plan personalizado.
          </Typography>
        </Alert>
      )}
      </Box>
    </motion.div>
  );
};

export default DietPlan;
