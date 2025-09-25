// src/components/Calculator.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Alert,
  CircularProgress,
  Divider,
  Paper
} from '@mui/material';
import {
  Calculate as CalculateIcon,
  Person as PersonIcon,
  FitnessCenter as FitnessIcon,
  TrendingUp as TrendingIcon,
  Save as SaveIcon,
  NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import { useDiet } from '../context/DietContext';

/**
 * Calculator Component - Calculadora de calorías mejorada
 * 
 * Conceptos que aprenderás:
 * 1. Form validation: Validación de formularios con mensajes de error
 * 2. LocalStorage integration: Guardar y cargar datos del usuario
 * 3. Conditional rendering: Mostrar diferentes estados (loading, error, success)
 * 4. Form state management: Manejar estado complejo del formulario
 * 5. Custom hooks: Usar el contexto de dieta
 */

const activityLevels = [
  { value: "sedentario", label: "Sedentario", description: "Poco o ningún ejercicio" },
  { value: "activo", label: "Activo", description: "Ejercicio moderado 3-4 días/semana" },
  { value: "muyActivo", label: "Muy Activo", description: "Ejercicio intenso 6-7 días/semana" }
];

const goals = [
  { value: "maintain", label: "Mantener peso", description: "Mantener peso actual" },
  { value: "lose", label: "Perder peso", description: "Perder grasa corporal" },
  { value: "gain", label: "Ganar masa muscular", description: "Aumentar masa muscular" }
];

const Calculator = ({ onNavigate }) => {
  const { loading, calculateDiet, calories, macronutrients } = useDiet();
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
    activityLevel: '',
    goal: ''
  });

  // Estado para manejar errores de validación
  const [errors, setErrors] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showNavigationMessage, setShowNavigationMessage] = useState(false);

  /**
   * Cargar datos guardados del localStorage al montar el componente
   */
  useEffect(() => {
    const savedData = localStorage.getItem('fitnessCalculatorData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      console.log('📂 Datos cargados del localStorage:', parsedData);
    }
  }, []);

  /**
   * Función para validar el formulario
   * @returns {boolean} - true si el formulario es válido
   */
  const validateForm = () => {
    const newErrors = {};

    // Validar peso (entre 30 y 300 kg)
    if (!formData.weight || formData.weight < 30 || formData.weight > 300) {
      newErrors.weight = 'El peso debe estar entre 30 y 300 kg';
    }

    // Validar altura (entre 100 y 250 cm)
    if (!formData.height || formData.height < 100 || formData.height > 250) {
      newErrors.height = 'La altura debe estar entre 100 y 250 cm';
    }

    // Validar edad (entre 15 y 100 años)
    if (!formData.age || formData.age < 15 || formData.age > 100) {
      newErrors.age = 'La edad debe estar entre 15 y 100 años';
    }

    // Validar campos obligatorios
    if (!formData.gender) newErrors.gender = 'Selecciona tu género';
    if (!formData.activityLevel) newErrors.activityLevel = 'Selecciona tu nivel de actividad';
    if (!formData.goal) newErrors.goal = 'Selecciona tu objetivo';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Manejar cambios en los campos del formulario
   * @param {Event} e - Evento del input
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Manejar envío del formulario
   * @param {Event} e - Evento del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Guardar datos en localStorage
      localStorage.setItem('fitnessCalculatorData', JSON.stringify(formData));
      console.log('💾 Datos guardados en localStorage');

      // Calcular dieta
      await calculateDiet(formData);
      setShowResults(true);
      
      // Mostrar mensaje de navegación automática
      setShowNavigationMessage(true);
      
      // Navegar automáticamente al plan de dieta después de 3 segundos
      setTimeout(() => {
        if (onNavigate) {
          console.log('🚀 Navegando automáticamente al plan de dieta...');
          onNavigate('diet');
        }
      }, 3000);
    } catch (error) {
      console.error('❌ Error calculando dieta:', error);
    }
  };

  /**
   * Guardar datos manualmente
   */
  const handleSaveData = () => {
    localStorage.setItem('fitnessCalculatorData', JSON.stringify(formData));
    console.log('💾 Datos guardados manualmente');
  };

  return (
    <Box>
      {/* Header de la sección */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <CalculateIcon color="primary" />
          Calculadora de Calorías
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Calcula tus necesidades calóricas diarias y macronutrientes
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Formulario */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon color="primary" />
                Tus Datos
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {/* Peso */}
                  <Grid item xs={6}>
                    <TextField
                      label="Peso (kg)"
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      fullWidth
                      required
                      error={!!errors.weight}
                      helperText={errors.weight}
                      inputProps={{ min: 30, max: 300 }}
                    />
                  </Grid>

                  {/* Altura */}
                  <Grid item xs={6}>
                    <TextField
                      label="Altura (cm)"
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      fullWidth
                      required
                      error={!!errors.height}
                      helperText={errors.height}
                      inputProps={{ min: 100, max: 250 }}
                    />
                  </Grid>

                  {/* Edad */}
                  <Grid item xs={12}>
                    <TextField
                      label="Edad (años)"
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      fullWidth
                      required
                      error={!!errors.age}
                      helperText={errors.age}
                      inputProps={{ min: 15, max: 100 }}
                    />
                  </Grid>

                  {/* Género */}
                  <Grid item xs={12}>
                    <TextField
                      select
                      label="Género"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      fullWidth
                      required
                      error={!!errors.gender}
                      helperText={errors.gender}
                    >
                      <MenuItem value="male">Hombre</MenuItem>
                      <MenuItem value="female">Mujer</MenuItem>
                    </TextField>
                  </Grid>

                  {/* Nivel de actividad */}
                  <Grid item xs={12}>
                    <TextField
                      select
                      label="Nivel de Actividad"
                      name="activityLevel"
                      value={formData.activityLevel}
                      onChange={handleChange}
                      fullWidth
                      required
                      error={!!errors.activityLevel}
                      helperText={errors.activityLevel || 'Selecciona tu nivel de actividad física'}
                    >
                      {activityLevels.map((level) => (
                        <MenuItem key={level.value} value={level.value}>
                          {level.label} - {level.description}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Objetivo */}
                  <Grid item xs={12}>
                    <TextField
                      select
                      label="Objetivo"
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      fullWidth
                      required
                      error={!!errors.goal}
                      helperText={errors.goal || '¿Cuál es tu objetivo principal?'}
                    >
                      {goals.map((goal) => (
                        <MenuItem key={goal.value} value={goal.value}>
                          {goal.label} - {goal.description}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Botones */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        startIcon={loading ? <CircularProgress size={20} /> : <CalculateIcon />}
                        disabled={loading}
                      >
                        {loading ? 'Calculando...' : 'Calcular Calorías'}
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={handleSaveData}
                        startIcon={<SaveIcon />}
                      >
                        Guardar
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Resultados */}
        <Grid item xs={12} md={6}>
          {showResults && calories && macronutrients ? (
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingIcon color="primary" />
                  Tus Resultados
                </Typography>

                {/* Calorías totales */}
                <Paper sx={{ p: 2, mb: 2, bgcolor: 'primary.light', color: 'white' }}>
                  <Typography variant="h4" align="center">
                    {calories.toFixed(0)} kcal
                  </Typography>
                  <Typography variant="body2" align="center">
                    Calorías diarias necesarias
                  </Typography>
                </Paper>

                {/* Macronutrientes */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Macronutrientes diarios:
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Proteínas:</Typography>
                    <Typography fontWeight="bold">{macronutrients.proteinGrams.toFixed(0)}g</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Carbohidratos:</Typography>
                    <Typography fontWeight="bold">{macronutrients.carbsGrams.toFixed(0)}g</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Grasas:</Typography>
                    <Typography fontWeight="bold">{macronutrients.fatGrams.toFixed(0)}g</Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" color="text.secondary" align="center">
                  💡 Usa estos datos en la sección "Plan de Dieta" para crear tu plan semanal
                </Typography>

                {/* Mensaje de navegación automática */}
                {showNavigationMessage && (
                  <Alert 
                    severity="info" 
                    sx={{ mt: 2 }}
                    icon={<NavigateNextIcon />}
                  >
                    <Typography variant="body2">
                      🚀 Te llevamos automáticamente al Plan de Dieta en 3 segundos...
                    </Typography>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <FitnessIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Completa el formulario para ver tus resultados
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Calculator;
