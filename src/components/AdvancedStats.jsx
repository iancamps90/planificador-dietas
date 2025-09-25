// src/components/AdvancedStats.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Button,
  Tabs,
  Tab,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert
} from '@mui/material';
import {
  TrendingUp as TrendingIcon,
  LocalFireDepartment as CaloriesIcon,
  Timer as TimerIcon,
  FitnessCenter as WorkoutIcon,
  Restaurant as MealIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Star as StarIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import AnimatedCard from './AnimatedCard';
import AnimatedButton from './AnimatedButton';
import AnimatedCounter from './AnimatedCounter';
import AnimatedProgress from './AnimatedProgress';

/**
 * AdvancedStats Component - Estadísticas avanzadas de progreso
 * 
 * Conceptos que aprenderás:
 * 1. Data visualization: Visualización avanzada de datos
 * 2. Progress tracking: Seguimiento de progreso
 * 3. Achievement system: Sistema de logros
 * 4. Goal setting: Establecimiento de objetivos
 */

const AdvancedStats = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalMeals: 0,
    totalCalories: 0,
    totalMinutes: 0,
    streak: 0,
    achievements: [],
    goals: []
  });
  const [newGoalDialog, setNewGoalDialog] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', target: '', type: 'workouts' });

  // Cargar estadísticas del localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('fitnessStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Guardar estadísticas
  const saveStats = (newStats) => {
    setStats(newStats);
    localStorage.setItem('fitnessStats', JSON.stringify(newStats));
  };

  // Agregar logro
  const addAchievement = (achievement) => {
    const newAchievements = [...stats.achievements, {
      ...achievement,
      id: Date.now(),
      date: new Date().toISOString()
    }];
    saveStats({ ...stats, achievements: newAchievements });
  };

  // Agregar objetivo
  const addGoal = () => {
    if (!newGoal.title || !newGoal.target) return;

    const goal = {
      ...newGoal,
      id: Date.now(),
      current: 0,
      createdAt: new Date().toISOString(),
      completed: false
    };

    const newGoals = [...stats.goals, goal];
    saveStats({ ...stats, goals: newGoals });
    setNewGoalDialog(false);
    setNewGoal({ title: '', target: '', type: 'workouts' });
  };

  // Marcar objetivo como completado
  const completeGoal = (goalId) => {
    const updatedGoals = stats.goals.map(goal => 
      goal.id === goalId ? { ...goal, completed: true } : goal
    );
    saveStats({ ...stats, goals: updatedGoals });

    // Agregar logro
    const completedGoal = stats.goals.find(g => g.id === goalId);
    addAchievement({
      title: '🎯 Objetivo Completado',
      description: `Completaste: ${completedGoal.title}`,
      type: 'goal'
    });
  };

  // Eliminar objetivo
  const deleteGoal = (goalId) => {
    const updatedGoals = stats.goals.filter(goal => goal.id !== goalId);
    saveStats({ ...stats, goals: updatedGoals });
  };

  // Calcular progreso del objetivo
  const calculateGoalProgress = (goal) => {
    return goal.target > 0 ? (goal.current / goal.target) * 100 : 0;
  };

  // Exportar estadísticas
  const exportStats = () => {
    const dataStr = JSON.stringify(stats, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fitness-stats.json';
    link.click();
  };

  // Compartir estadísticas
  const shareStats = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mis Estadísticas de Fitness',
          text: `He completado ${stats.totalWorkouts} entrenamientos y ${stats.totalMeals} comidas saludables!`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error compartiendo:', error);
      }
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(`Mis estadísticas: ${stats.totalWorkouts} entrenamientos, ${stats.totalMeals} comidas`);
      alert('Estadísticas copiadas al portapapeles');
    }
  };

  const tabs = [
    { label: '📊 Resumen', value: 0 },
    { label: '🏆 Logros', value: 1 },
    { label: '🎯 Objetivos', value: 2 },
    { label: '📈 Progreso', value: 3 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box>
        {/* Header */}
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
                <TrendingIcon color="primary" />
              </motion.div>
              Estadísticas Avanzadas
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Tu progreso fitness en tiempo real
            </Typography>
          </Box>
        </motion.div>

        {/* Tabs */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Tabs 
              value={activeTab} 
              onChange={(e, newValue) => setActiveTab(newValue)}
              variant="fullWidth"
              sx={{ mb: 2 }}
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} />
              ))}
            </Tabs>

            {/* Contenido de las tabs */}
            {activeTab === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Resumen de estadísticas */}
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={3}>
                    <AnimatedCard delay={0.1}>
                      <Box sx={{ textAlign: 'center' }}>
                        <WorkoutIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                        <Typography variant="h4" color="primary">
                          <AnimatedCounter value={stats.totalWorkouts} />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Entrenamientos
                        </Typography>
                      </Box>
                    </AnimatedCard>
                  </Grid>

                  <Grid item xs={12} md={6} lg={3}>
                    <AnimatedCard delay={0.2}>
                      <Box sx={{ textAlign: 'center' }}>
                        <MealIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />
                        <Typography variant="h4" color="secondary">
                          <AnimatedCounter value={stats.totalMeals} />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Comidas Saludables
                        </Typography>
                      </Box>
                    </AnimatedCard>
                  </Grid>

                  <Grid item xs={12} md={6} lg={3}>
                    <AnimatedCard delay={0.3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <CaloriesIcon sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />
                        <Typography variant="h4" color="warning">
                          <AnimatedCounter value={stats.totalCalories} suffix=" cal" />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Calorías Quemadas
                        </Typography>
                      </Box>
                    </AnimatedCard>
                  </Grid>

                  <Grid item xs={12} md={6} lg={3}>
                    <AnimatedCard delay={0.4}>
                      <Box sx={{ textAlign: 'center' }}>
                        <TimerIcon sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
                        <Typography variant="h4" color="success">
                          <AnimatedCounter value={stats.totalMinutes} suffix=" min" />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Minutos de Ejercicio
                        </Typography>
                      </Box>
                    </AnimatedCard>
                  </Grid>
                </Grid>

                {/* Racha actual */}
                <Card sx={{ mt: 3 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      🔥 Racha Actual
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="h3" color="error">
                        <AnimatedCounter value={stats.streak} />
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        días consecutivos
                      </Typography>
                    </Box>
                    <AnimatedProgress 
                      value={stats.streak} 
                      max={30}
                      color="error"
                      showLabel={true}
                      label="Progreso hacia el objetivo de 30 días"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Logros */}
                <Typography variant="h6" sx={{ mb: 2 }}>
                  🏆 Tus Logros ({stats.achievements.length})
                </Typography>
                
                {stats.achievements.length === 0 ? (
                  <Alert severity="info">
                    Aún no tienes logros. ¡Completa entrenamientos y comidas para desbloquearlos!
                  </Alert>
                ) : (
                  <Grid container spacing={2}>
                    {stats.achievements.map((achievement, index) => (
                      <Grid item xs={12} md={6} key={achievement.id}>
                        <AnimatedCard delay={index * 0.1}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              <StarIcon />
                            </Avatar>
                            <Box>
                              <Typography variant="h6">{achievement.title}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {achievement.description}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {new Date(achievement.date).toLocaleDateString()}
                              </Typography>
                            </Box>
                          </Box>
                        </AnimatedCard>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </motion.div>
            )}

            {activeTab === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Objetivos */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    🎯 Tus Objetivos ({stats.goals.filter(g => !g.completed).length} activos)
                  </Typography>
                  <AnimatedButton
                    variant="contained"
                    size="small"
                    onClick={() => setNewGoalDialog(true)}
                  >
                    <AddIcon /> Nuevo Objetivo
                  </AnimatedButton>
                </Box>

                {stats.goals.length === 0 ? (
                  <Alert severity="info">
                    No tienes objetivos establecidos. ¡Crea tu primer objetivo para mantenerte motivado!
                  </Alert>
                ) : (
                  <Grid container spacing={2}>
                    {stats.goals.map((goal, index) => (
                      <Grid item xs={12} md={6} key={goal.id}>
                        <AnimatedCard delay={index * 0.1}>
                          <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Typography variant="h6">{goal.title}</Typography>
                              {goal.completed && <CheckIcon color="success" />}
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              {goal.current} / {goal.target} {goal.type === 'workouts' ? 'entrenamientos' : 'comidas'}
                            </Typography>
                            <AnimatedProgress 
                              value={calculateGoalProgress(goal)} 
                              max={100}
                              color={goal.completed ? 'success' : 'primary'}
                              showLabel={true}
                            />
                            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                              {!goal.completed && (
                                <AnimatedButton
                                  size="small"
                                  onClick={() => completeGoal(goal.id)}
                                >
                                  Completar
                                </AnimatedButton>
                              )}
                              <IconButton size="small" onClick={() => deleteGoal(goal.id)}>
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </Box>
                        </AnimatedCard>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </motion.div>
            )}

            {activeTab === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progreso semanal */}
                <Typography variant="h6" sx={{ mb: 2 }}>
                  📈 Progreso de la Semana
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                          Entrenamientos esta semana
                        </Typography>
                        <AnimatedProgress 
                          value={stats.totalWorkouts % 7} 
                          max={7}
                          color="primary"
                          showLabel={true}
                          label="Objetivo: 7 entrenamientos"
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                          Comidas saludables esta semana
                        </Typography>
                        <AnimatedProgress 
                          value={stats.totalMeals % 21} 
                          max={21}
                          color="secondary"
                          showLabel={true}
                          label="Objetivo: 21 comidas saludables"
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </motion.div>
            )}

            {/* Botones de acción */}
            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
              <AnimatedButton
                variant="outlined"
                onClick={exportStats}
              >
                <DownloadIcon /> Exportar
              </AnimatedButton>
              <AnimatedButton
                variant="outlined"
                onClick={shareStats}
              >
                <ShareIcon /> Compartir
              </AnimatedButton>
            </Box>
          </CardContent>
        </Card>

        {/* Dialog para nuevo objetivo */}
        <Dialog open={newGoalDialog} onClose={() => setNewGoalDialog(false)}>
          <DialogTitle>Nuevo Objetivo</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Título del objetivo"
              fullWidth
              variant="outlined"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Objetivo (número)"
              type="number"
              fullWidth
              variant="outlined"
              value={newGoal.target}
              onChange={(e) => setNewGoal({ ...newGoal, target: parseInt(e.target.value) || 0 })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNewGoalDialog(false)}>Cancelar</Button>
            <Button onClick={addGoal} variant="contained">Crear</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </motion.div>
  );
};

export default AdvancedStats;
