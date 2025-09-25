// src/components/WorkoutPlan.jsx

import { useState, useEffect } from 'react';
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
  Paper,
  CircularProgress,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  TextField
} from '@mui/material';
import {
  FitnessCenter as FitnessIcon,
  ExpandMore as ExpandMoreIcon,
  Refresh as RefreshIcon,
  Timer as TimerIcon,
  LocalFireDepartment as CaloriesIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon
} from '@mui/icons-material';
// import { useDiet } from '../context/DietContext'; // No se usa por ahora
import { generateWeeklyWorkoutPlan } from '../data/workoutDatabase';
import { generateRoutineWithImages } from '../data/gymWorkoutDatabase';
import { generateWorkoutPlanPDF } from '../utils/pdfGenerator';
import AnimatedButton from './AnimatedButton';
import { motion } from 'framer-motion';

/**
 * WorkoutPlan Component - Plan de entrenamiento completo
 * 
 * Conceptos que aprenderás:
 * 1. Advanced state management: Manejar múltiples estados complejos
 * 2. Timer functionality: Implementar cronómetros para ejercicios
 * 3. Workout progression: Sistema de progresión de ejercicios
 * 4. Data visualization: Mostrar estadísticas de entrenamiento
 * 5. Interactive components: Componentes interactivos avanzados
 */

const WorkoutPlan = () => {
  // const { } = useDiet(); // No se usa userData por ahora
  const [workoutType, setWorkoutType] = useState('gym'); // 'gym' o 'home'
  const [workoutRoutine, setWorkoutRoutine] = useState('pushPullLegs'); // Rutina de gym
  const [workoutLevel, setWorkoutLevel] = useState('Principiante');
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [sessionDuration, setSessionDuration] = useState(45);
  const [weeklyPlan, setWeeklyPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [restTimer, setRestTimer] = useState(0);
  const [isRestTimerRunning, setIsRestTimerRunning] = useState(false);
  const [manualRestTime, setManualRestTime] = useState(60);
  const [workoutStats, setWorkoutStats] = useState({
    totalSessions: 0,
    totalCalories: 0,
    totalTime: 0
  });

  // Días de la semana
  const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  // Tipos de entrenamiento
  const workoutTypes = [
    { value: 'gym', label: 'Gym', description: 'Rutinas de gimnasio con pesas' },
    { value: 'home', label: 'En Casa', description: 'Ejercicios sin equipamiento' }
  ];

  // Rutinas de gym
  const gymRoutines = [
    { value: 'weider', label: 'Plan 1', description: 'Weider - Un grupo muscular por día (clásico)' },
    { value: 'pushPullLegs', label: 'Plan 2', description: 'Push/Pull/Legs - Por patrones de movimiento' },
    { value: 'upperLower', label: 'Plan 3', description: 'Torso/Pierna - División simple superior/inferior' }
  ];

  // Niveles de dificultad
  const difficultyLevels = [
    { value: 'Principiante', label: 'Principiante', description: 'Ejercicios básicos, perfecto para empezar' },
    { value: 'Intermedio', label: 'Intermedio', description: 'Ejercicios moderados, para personas activas' },
    { value: 'Avanzado', label: 'Avanzado', description: 'Ejercicios intensos, para deportistas experimentados' }
  ];

  /**
   * Cargar datos guardados del localStorage
   */
  useEffect(() => {
    const savedPlan = localStorage.getItem('weeklyWorkoutPlan');
    const savedStats = localStorage.getItem('workoutStats');
    
    if (savedPlan) {
      setWeeklyPlan(JSON.parse(savedPlan));
    }
    
    if (savedStats) {
      setWorkoutStats(JSON.parse(savedStats));
    }
  }, []);

  /**
   * Timer para ejercicios
   */
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isTimerRunning && timerSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  /**
   * Timer de descanso
   */
  useEffect(() => {
    let interval = null;
    if (isRestTimerRunning && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(seconds => seconds - 1);
      }, 1000);
    } else if (restTimer === 0 && isRestTimerRunning) {
      setIsRestTimerRunning(false);
      // Notificación cuando termine el descanso
      if (Notification.permission === 'granted') {
        new Notification('¡Descanso terminado!', {
          body: 'Es hora de continuar con el siguiente ejercicio',
          icon: '/vite.svg'
        });
      }
    }
    return () => clearInterval(interval);
  }, [isRestTimerRunning, restTimer]);

  /**
   * Generar plan semanal de entrenamiento
   */
  const generateWeeklyPlan = async () => {
    setLoading(true);
    
    try {
      let plan;
      
      if (workoutType === 'gym') {
        // Generar rutina de gym con imágenes
        plan = generateRoutineWithImages(workoutRoutine);
        if (plan) {
          // Convertir a formato compatible
          const convertedPlan = {};
          Object.entries(plan.days).forEach(([day, dayData]) => {
            convertedPlan[day] = {
              type: 'Entrenamiento',
              name: dayData.name,
              description: dayData.focus,
              exercises: dayData.exercises.map(ex => ({
                name: ex.exercise,
                sets: ex.sets,
                reps: ex.reps,
                type: 'Fuerza',
                difficulty: 'Intermedio',
                equipment: 'Gym',
                duration: `${ex.sets * 3} min`,
                calories: Math.floor(Math.random() * 20) + 15,
                instructions: `Realiza ${ex.sets} series de ${ex.reps} repeticiones`,
                tips: ['Mantén la forma correcta', 'Controla el movimiento', 'Respira correctamente']
              })),
              totalDuration: dayData.duration,
              totalCalories: dayData.exercises.length * 20
            };
          });
          plan = convertedPlan;
        }
      } else {
        // Generar rutina en casa
        plan = generateWeeklyWorkoutPlan(workoutLevel, daysPerWeek);
      }
      
      setWeeklyPlan(plan);
      
      // Guardar en localStorage
      localStorage.setItem('weeklyWorkoutPlan', JSON.stringify(plan));
      
      // Actualizar estadísticas
      const totalCalories = Object.values(plan).reduce((total, day) => {
        return total + (day.totalCalories || 0);
      }, 0);
      
      setWorkoutStats(prev => ({
        ...prev,
        totalCalories: prev.totalCalories + totalCalories,
        totalSessions: prev.totalSessions + daysPerWeek,
        totalTime: prev.totalTime + (daysPerWeek * sessionDuration)
      }));
      
      localStorage.setItem('workoutStats', JSON.stringify(workoutStats));
      
    } catch (error) {
      console.error('Error generando plan:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Regenerar rutina para un día específico
   */
  const regenerateDay = (dayName) => {
    if (!weeklyPlan) return;

    const newDailyWorkout = generateWeeklyWorkoutPlan(workoutLevel, 1)[dayName];
    const updatedPlan = {
      ...weeklyPlan,
      [dayName]: newDailyWorkout
    };

    setWeeklyPlan(updatedPlan);
    localStorage.setItem('weeklyWorkoutPlan', JSON.stringify(updatedPlan));
  };

  /**
   * Iniciar ejercicio con timer
   */
  const startExercise = (exercise) => {
    setCurrentExercise(exercise);
    setTimerSeconds(0);
    setIsTimerRunning(true);
  };

  /**
   * Pausar/Reanudar timer
   */
  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  /**
   * Iniciar timer de descanso manual
   */
  const startRestTimer = () => {
    setRestTimer(manualRestTime);
    setIsRestTimerRunning(true);
  };

  /**
   * Pausar/Reanudar timer de descanso
   */
  const toggleRestTimer = () => {
    setIsRestTimerRunning(!isRestTimerRunning);
  };

  /**
   * Detener timer de descanso
   */
  const stopRestTimer = () => {
    setRestTimer(0);
    setIsRestTimerRunning(false);
  };

  /**
   * Formatear tiempo en MM:SS
   */
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  /**
   * Detener ejercicio
   */
  const stopExercise = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
    setCurrentExercise(null);
  };

  /**
   * Exportar plan a CSV
   */
  const exportToCSV = () => {
    if (!weeklyPlan) return;

    let csvContent = "Día,Tipo,Ejercicio,Duración,Repeticiones,Series,Descanso,Calorías\n";
    
    Object.entries(weeklyPlan).forEach(([day, dayPlan]) => {
      if (dayPlan.exercises && dayPlan.exercises.length > 0) {
        dayPlan.exercises.forEach(exercise => {
          csvContent += `${day},${exercise.type},${exercise.name},${exercise.duration},${exercise.reps},${exercise.sets},${exercise.rest},${exercise.calories}\n`;
        });
      } else {
        csvContent += `${day},${dayPlan.type},${dayPlan.description},0,0,0,0,0\n`;
      }
    });

    // Crear y descargar archivo
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'plan_entrenamiento_semanal.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  /**
   * Exportar plan a PDF
   */
  const exportToPDF = async () => {
    if (!weeklyPlan) return;
    
    try {
      await generateWorkoutPlanPDF(weeklyPlan, workoutStats);
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
                <FitnessIcon color="primary" />
              </motion.div>
              Plan de Entrenamiento
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Crea tu rutina de ejercicios personalizada
            </Typography>
          </Box>
        </motion.div>

      {/* Configuración del plan */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            ⚙️ Configuración del Plan
          </Typography>
          
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Entrenamiento</InputLabel>
                <Select
                  value={workoutType}
                  onChange={(e) => setWorkoutType(e.target.value)}
                  label="Tipo de Entrenamiento"
                >
                  {workoutTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>


            {workoutType === 'home' && (
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Nivel de Dificultad</InputLabel>
                  <Select
                    value={workoutLevel}
                    onChange={(e) => setWorkoutLevel(e.target.value)}
                    label="Nivel de Dificultad"
                  >
                    {difficultyLevels.map((level) => (
                      <MenuItem key={level.value} value={level.value}>
                        {level.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Días por Semana</InputLabel>
                <Select
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(e.target.value)}
                  label="Días por Semana"
                >
                  <MenuItem value={3}>3 días</MenuItem>
                  <MenuItem value={4}>4 días</MenuItem>
                  <MenuItem value={5}>5 días</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" gutterBottom>
                Duración por Sesión: {sessionDuration} minutos
              </Typography>
              <Slider
                value={sessionDuration}
                onChange={(e, value) => setSessionDuration(value)}
                min={15}
                max={90}
                step={5}
                marks={[
                  { value: 15, label: '15m' },
                  { value: 30, label: '30m' },
                  { value: 45, label: '45m' },
                  { value: 60, label: '60m' },
                  { value: 90, label: '90m' }
                ]}
              />
            </Grid>

            {/* Plan de entrenamiento (solo para gym) */}
            {workoutType === 'gym' && (
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Plan de Entrenamiento</InputLabel>
                  <Select
                    value={workoutRoutine}
                    onChange={(e) => setWorkoutRoutine(e.target.value)}
                    label="Plan de Entrenamiento"
                  >
                    {gymRoutines.map((routine) => (
                      <MenuItem key={routine.value} value={routine.value}>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {routine.label}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {routine.description}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}

            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                onClick={generateWeeklyPlan}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <FitnessIcon />}
                fullWidth
                size="large"
              >
                {loading ? 'Generando...' : 'Generar Plan'}
              </Button>
            </Grid>
          </Grid>

          {/* Información de la configuración seleccionada */}
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>{workoutType === 'gym' ? 'Gym' : 'En Casa'}:</strong> {
                workoutType === 'gym' 
                  ? gymRoutines.find(r => r.value === workoutRoutine)?.description
                  : difficultyLevels.find(l => l.value === workoutLevel)?.description
              }
            </Typography>
          </Alert>
        </CardContent>
      </Card>

      {/* Estadísticas de entrenamiento */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light', color: 'white' }}>
            <Typography variant="h4">{workoutStats.totalSessions}</Typography>
            <Typography variant="body2">Sesiones Completadas</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light', color: 'white' }}>
            <Typography variant="h4">{workoutStats.totalCalories}</Typography>
            <Typography variant="body2">Calorías Quemadas</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light', color: 'white' }}>
            <Typography variant="h4">{Math.floor(workoutStats.totalTime / 60)}h</Typography>
            <Typography variant="body2">Tiempo Total</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Timer de ejercicio activo */}
      {currentExercise && (
        <Card sx={{ mb: 4, bgcolor: 'primary.main', color: 'white' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              🏃‍♂️ Ejercicio Activo: {currentExercise.name}
            </Typography>
            <Typography variant="h2" sx={{ mb: 2 }}>
              {formatTime(timerSeconds)}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={toggleTimer}
                startIcon={isTimerRunning ? <PauseIcon /> : <PlayIcon />}
              >
                {isTimerRunning ? 'Pausar' : 'Reanudar'}
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={stopExercise}
                startIcon={<StopIcon />}
              >
                Finalizar
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Timer de descanso */}
      <Card sx={{ mb: 4, bgcolor: 'secondary.main', color: 'white' }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            ⏰ Timer de Descanso
          </Typography>
          
          {restTimer > 0 ? (
            <>
              <Typography variant="h2" sx={{ mb: 2 }}>
                {formatTime(restTimer)}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={toggleRestTimer}
                  startIcon={isRestTimerRunning ? <PauseIcon /> : <PlayIcon />}
                >
                  {isRestTimerRunning ? 'Pausar' : 'Reanudar'}
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={stopRestTimer}
                  startIcon={<StopIcon />}
                >
                  Detener
                </Button>
              </Box>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
              <TextField
                label="Tiempo de descanso (seg)"
                type="number"
                value={manualRestTime}
                onChange={(e) => setManualRestTime(parseInt(e.target.value) || 60)}
                size="small"
                sx={{ width: 150, mr: 2 }}
                inputProps={{ min: 10, max: 600 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={startRestTimer}
                startIcon={<PlayIcon />}
              >
                Iniciar Descanso
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Plan semanal */}
      {weeklyPlan && (
        <Grid container spacing={3}>
          {weekDays.map((day) => {
            const dayPlan = weeklyPlan[day];
            if (!dayPlan) return null;

            return (
              <Grid item xs={12} md={6} lg={4} key={day}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
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

                    {dayPlan.type === 'Descanso' ? (
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.100' }}>
                        <Typography variant="h6" color="text.secondary">
                          😴 Día de Descanso
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {dayPlan.description}
                        </Typography>
                      </Paper>
                    ) : (
                      <>
                        {/* Resumen del día */}
                        <Paper sx={{ p: 1, mb: 2, bgcolor: 'primary.light', color: 'white' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                              <Typography variant="body2">
                                <TimerIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                {dayPlan.totalDuration} min
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="body2">
                                <CaloriesIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                {dayPlan.totalCalories} kcal
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>

                        {/* Ejercicios del día */}
                        {dayPlan.exercises.map((exercise, index) => (
                          <Accordion key={index} sx={{ mb: 1 }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                {exercise.image && (
                                  <Box
                                    component="img"
                                    src={exercise.image}
                                    alt={exercise.name}
                                    sx={{
                                      width: 40,
                                      height: 40,
                                      borderRadius: 1,
                                      objectFit: 'cover',
                                      mr: 2
                                    }}
                                  />
                                )}
                                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                                  {exercise.name}
                                </Typography>
                                <Chip
                                  label={`${exercise.calories} kcal`}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                />
                              </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Box>
                                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                                  <Chip label={exercise.type} size="small" />
                                  <Chip label={exercise.difficulty} size="small" color="secondary" />
                                  <Chip label={exercise.equipment} size="small" variant="outlined" />
                                </Box>

                                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                                  <Chip label={`${exercise.sets} series`} size="small" />
                                  <Chip label={`${exercise.reps} repeticiones`} size="small" />
                                  <Chip label={`${exercise.rest} descanso`} size="small" />
                                </Box>

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                  {exercise.instructions}
                                </Typography>

                                <Box sx={{ mb: 2 }}>
                                  <Typography variant="subtitle2" gutterBottom>
                                    💡 Consejos:
                                  </Typography>
                                  {exercise.tips.map((tip, tipIndex) => (
                                    <Typography key={tipIndex} variant="body2" sx={{ mb: 0.5 }}>
                                      • {tip}
                                    </Typography>
                                  ))}
                                </Box>

                                <Button
                                  variant="contained"
                                  startIcon={<PlayIcon />}
                                  onClick={() => startExercise(exercise)}
                                  fullWidth
                                >
                                  Iniciar Ejercicio
                                </Button>
                              </Box>
                            </AccordionDetails>
                          </Accordion>
                        ))}
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}


      {/* Botones de acción */}
      {weeklyPlan && (
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
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
            onClick={() => setWorkoutStats({ totalSessions: 0, totalCalories: 0, totalTime: 0 })}
          >
            🔄 Reiniciar Estadísticas
          </AnimatedButton>
        </Box>
      )}

      {/* Mensaje si no hay plan */}
      {!weeklyPlan && (
        <Alert severity="info" sx={{ mt: 4 }}>
          <Typography variant="body2">
            Configura tu plan de entrenamiento y haz clic en &quot;Generar Plan&quot; para comenzar.
          </Typography>
        </Alert>
      )}
      </Box>
    </motion.div>
  );
};

export default WorkoutPlan;
