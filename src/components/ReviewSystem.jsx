// src/components/ReviewSystem.jsx

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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  LinearProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  PhotoCamera as PhotoIcon,
  Scale as ScaleIcon,
  TrendingUp as TrendingIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Add as AddIcon,
  FitnessCenter as FitnessIcon,
  Restaurant as FoodIcon,
  Mood as MoodIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import AnimatedCard from './AnimatedCard';
import AnimatedButton from './AnimatedButton';
import { 
  checkPendingReview, 
  setupReviewReminders, 
  getReviewStats, 
  generateReminderMessage 
} from '../utils/reviewNotifications';

/**
 * ReviewSystem Component - Sistema de revisiones cada 15 días
 * 
 * Conceptos que aprenderás:
 * 1. File upload handling: Manejo de subida de archivos
 * 2. Date calculations: Cálculos de fechas y recordatorios
 * 3. Progress tracking: Seguimiento de progreso con gráficos
 * 4. Data visualization: Visualización de datos de progreso
 * 5. Form validation: Validación de formularios complejos
 */

const ReviewSystem = () => {
  // Estados principales
  const [activeStep, setActiveStep] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState(null);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estado del formulario de revisión
  const [reviewForm, setReviewForm] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    bodyFat: '',
    muscleMass: '',
    measurements: {
      chest: '',
      waist: '',
      hips: '',
      arms: '',
      thighs: ''
    },
    photos: [],
    mood: '',
    energy: '',
    sleep: '',
    adherence: '',
    challenges: '',
    achievements: '',
    nextGoals: '',
    feedback: ''
  });

  // Estados para manejo de archivos
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [photoPreview, setPhotoPreview] = useState([]);
  
  // Estados para notificaciones
  const [reviewStatus, setReviewStatus] = useState(null);
  const [reviewStats, setReviewStats] = useState(null);

  // Pasos del proceso de revisión
  const steps = [
    {
      label: 'Mediciones Corporales',
      description: 'Registra tu peso y medidas',
      icon: <ScaleIcon />
    },
    {
      label: 'Fotos de Progreso',
      description: 'Sube fotos frontales, laterales y traseras',
      icon: <PhotoIcon />
    },
    {
      label: 'Evaluación Personal',
      description: 'Cómo te sientes y tu progreso',
      icon: <MoodIcon />
    },
    {
      label: 'Objetivos y Feedback',
      description: 'Define tus próximos objetivos',
      icon: <TrendingIcon />
    }
  ];

  /**
   * Cargar revisiones guardadas del localStorage
   */
  useEffect(() => {
    const savedReviews = localStorage.getItem('fitnessReviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
    
    // Verificar si hay una revisión pendiente
    const status = checkPendingReview();
    setReviewStatus(status);
    
    // Obtener estadísticas
    const stats = getReviewStats();
    setReviewStats(stats);
    
    // Configurar recordatorios
    setupReviewReminders();
  }, []);

  /**
   * Verificar si hay una revisión pendiente (cada 15 días)
   */
  const checkPendingReview = () => {
    if (reviews.length === 0) {
      return; // Primera revisión
    }

    const lastReview = reviews[reviews.length - 1];
    const lastReviewDate = new Date(lastReview.date);
    const today = new Date();
    const daysDiff = Math.floor((today - lastReviewDate) / (1000 * 60 * 60 * 24));

    if (daysDiff >= 15) {
      // Mostrar notificación de revisión pendiente
      console.log(`📅 Revisión pendiente desde hace ${daysDiff} días`);
    }
  };

  /**
   * Manejar cambios en el formulario
   */
  const handleFormChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setReviewForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setReviewForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  /**
   * Manejar subida de fotos
   */
  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadingPhotos(true);

    // Simular subida de archivos
    setTimeout(() => {
      const newPhotos = files.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type,
        size: file.size,
        uploadDate: new Date().toISOString()
      }));

      setPhotoPreview(prev => [...prev, ...newPhotos]);
      setReviewForm(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos]
      }));
      
      setUploadingPhotos(false);
    }, 1000);
  };

  /**
   * Eliminar foto
   */
  const removePhoto = (photoId) => {
    setPhotoPreview(prev => prev.filter(photo => photo.id !== photoId));
    setReviewForm(prev => ({
      ...prev,
      photos: prev.photos.filter(photo => photo.id !== photoId)
    }));
  };

  /**
   * Siguiente paso
   */
  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  /**
   * Paso anterior
   */
  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  /**
   * Guardar revisión
   */
  const handleSaveReview = async () => {
    setLoading(true);

    try {
      const newReview = {
        id: Date.now(),
        ...reviewForm,
        createdAt: new Date().toISOString(),
        status: 'completed'
      };

      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      localStorage.setItem('fitnessReviews', JSON.stringify(updatedReviews));

      // Resetear formulario
      setReviewForm({
        date: new Date().toISOString().split('T')[0],
        weight: '',
        bodyFat: '',
        muscleMass: '',
        measurements: {
          chest: '',
          waist: '',
          hips: '',
          arms: '',
          thighs: ''
        },
        photos: [],
        mood: '',
        energy: '',
        sleep: '',
        adherence: '',
        challenges: '',
        achievements: '',
        nextGoals: '',
        feedback: ''
      });

      setPhotoPreview([]);
      setActiveStep(0);
      setShowReviewDialog(false);

      // Actualizar estadísticas
      const newStatus = checkPendingReview();
      setReviewStatus(newStatus);
      
      const newStats = getReviewStats();
      setReviewStats(newStats);

      console.log('✅ Revisión guardada exitosamente');
    } catch (error) {
      console.error('❌ Error guardando revisión:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Abrir revisión existente
   */
  const openReview = (review) => {
    setCurrentReview(review);
    setShowReviewDialog(true);
  };

  /**
   * Calcular progreso desde la última revisión
   */
  const calculateProgress = () => {
    if (reviews.length < 2) return null;

    const current = reviews[reviews.length - 1];
    const previous = reviews[reviews.length - 2];

    return {
      weightChange: current.weight - previous.weight,
      bodyFatChange: current.bodyFat - previous.bodyFat,
      muscleMassChange: current.muscleMass - previous.muscleMass,
      measurementsChange: {
        chest: current.measurements.chest - previous.measurements.chest,
        waist: current.measurements.waist - previous.measurements.waist,
        hips: current.measurements.hips - previous.measurements.hips,
        arms: current.measurements.arms - previous.measurements.arms,
        thighs: current.measurements.thighs - previous.measurements.thighs
      }
    };
  };

  const progress = calculateProgress();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center', p: 3, bgcolor: 'primary.light', borderRadius: 2 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
            📊 Sistema de Revisiones
          </Typography>
          <Typography variant="h6" sx={{ color: 'white', opacity: 0.9 }}>
            Seguimiento cada 15 días - Tu progreso importa
          </Typography>
        </Box>

        {/* Alerta de revisión pendiente */}
        {reviewStatus && reviewStatus.hasPending && (
          <Alert 
            severity="warning" 
            sx={{ mb: 3 }}
            action={
              <AnimatedButton
                color="inherit"
                size="small"
                onClick={() => setShowReviewDialog(true)}
              >
                Completar Ahora
              </AnimatedButton>
            }
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              ⏰ {reviewStatus.message}
            </Typography>
            <Typography variant="body2">
              {generateReminderMessage()}
            </Typography>
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Panel Principal */}
          <Grid item xs={12} lg={8}>
            {/* Estadísticas Rápidas */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <AnimatedCard delay={0.1}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ 
                      width: 60, 
                      height: 60, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.light', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2
                    }}>
                      <AssessmentIcon sx={{ fontSize: 30, color: 'white' }} />
                    </Box>
                    <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {reviewStats ? reviewStats.totalReviews : reviews.length}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                      Revisiones Completadas
                    </Typography>
                  </CardContent>
                </AnimatedCard>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <AnimatedCard delay={0.2}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ 
                      width: 60, 
                      height: 60, 
                      borderRadius: '50%', 
                      bgcolor: 'secondary.light', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2
                    }}>
                      <CalendarIcon sx={{ fontSize: 30, color: 'white' }} />
                    </Box>
                    <Typography variant="h4" color="secondary" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {reviewStatus ? reviewStatus.daysSinceLastReview || 0 : 0}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                      Días desde última revisión
                    </Typography>
                  </CardContent>
                </AnimatedCard>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AnimatedCard delay={0.3}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ 
                      width: 60, 
                      height: 60, 
                      borderRadius: '50%', 
                      bgcolor: 'success.light', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2
                    }}>
                      <TrendingIcon sx={{ fontSize: 30, color: 'white' }} />
                    </Box>
                    <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {progress ? `${progress.weightChange > 0 ? '+' : ''}${progress.weightChange.toFixed(1)}kg` : 'N/A'}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                      Cambio de peso
                    </Typography>
                  </CardContent>
                </AnimatedCard>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AnimatedCard delay={0.4}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ 
                      width: 60, 
                      height: 60, 
                      borderRadius: '50%', 
                      bgcolor: 'warning.light', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2
                    }}>
                      <MoodIcon sx={{ fontSize: 30, color: 'white' }} />
                    </Box>
                    <Typography variant="h4" color="warning.main" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {reviews.length > 0 ? reviews[reviews.length - 1].mood : 'N/A'}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                      Estado de ánimo
                    </Typography>
                  </CardContent>
                </AnimatedCard>
              </Grid>
            </Grid>

            {/* Botón Nueva Revisión */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <AnimatedButton
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => setShowReviewDialog(true)}
                sx={{ 
                  px: 6, 
                  py: 2, 
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                    boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                🚀 Nueva Revisión de Progreso
              </AnimatedButton>
            </Box>

            {/* Historial de Revisiones */}
            <AnimatedCard delay={0.5}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ 
                    width: 50, 
                    height: 50, 
                    borderRadius: '50%', 
                    bgcolor: 'primary.light', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mr: 2
                  }}>
                    <TrendingIcon sx={{ fontSize: 24, color: 'white' }} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    📈 Historial de Revisiones
                  </Typography>
                </Box>
                
                {reviews.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 6, px: 3 }}>
                    <Box sx={{ 
                      width: 100, 
                      height: 100, 
                      borderRadius: '50%', 
                      bgcolor: 'grey.100', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3
                    }}>
                      <AssessmentIcon sx={{ fontSize: 50, color: 'text.secondary' }} />
                    </Box>
                    <Typography variant="h5" color="text.secondary" sx={{ mb: 2, fontWeight: 'medium' }}>
                      No hay revisiones registradas
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      Completa tu primera revisión para comenzar el seguimiento de tu progreso
                    </Typography>
                    <AnimatedButton
                      variant="outlined"
                      onClick={() => setShowReviewDialog(true)}
                      sx={{ px: 4, py: 1.5 }}
                    >
                      Comenzar Primera Revisión
                    </AnimatedButton>
                  </Box>
                ) : (
                  <List>
                    {reviews.map((review, index) => (
                      <React.Fragment key={review.id}>
                        <ListItem
                          sx={{ 
                            cursor: 'pointer',
                            '&:hover': { bgcolor: 'action.hover' }
                          }}
                          onClick={() => openReview(review)}
                        >
                          <ListItemIcon>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              {index + 1}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={`Revisión ${index + 1} - ${new Date(review.date).toLocaleDateString()}`}
                            secondary={
                              <Box>
                                <Typography variant="body2">
                                  Peso: {review.weight}kg | Grasa corporal: {review.bodyFat}%
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Estado: {review.mood} | Energía: {review.energy}
                                </Typography>
                              </Box>
                            }
                          />
                          <IconButton>
                            <ViewIcon />
                          </IconButton>
                        </ListItem>
                        {index < reviews.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </CardContent>
            </AnimatedCard>
          </Grid>

          {/* Panel Lateral */}
          <Grid item xs={12} lg={4}>
            {/* Progreso Visual */}
            <AnimatedCard delay={0.6}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📊 Progreso Visual
                </Typography>
                
                {reviews.length >= 1 ? (
                  <Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        Cambio de Peso
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={60}
                        color="primary"
                        sx={{ mb: 1, height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Último peso: {reviews[reviews.length - 1]?.weight || 'N/A'}kg
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        Cambio de Grasa Corporal
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={75}
                        color="success"
                        sx={{ mb: 1, height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Progreso: {reviews.length} revisión{reviews.length !== 1 ? 'es' : ''} completada{reviews.length !== 1 ? 's' : ''}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        Cambio de Masa Muscular
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={85}
                        color="info"
                        sx={{ mb: 1, height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Mantén el ritmo cada 15 días
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary" align="center">
                    Completa al menos 2 revisiones para ver el progreso
                  </Typography>
                )}
              </CardContent>
            </AnimatedCard>

            {/* Recordatorios */}
            <AnimatedCard delay={0.7}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ⏰ Recordatorios
                </Typography>
                
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    📅 Próxima revisión recomendada: {reviews.length > 0 ? 
                      new Date(new Date(reviews[reviews.length - 1].date).getTime() + (15 * 24 * 60 * 60 * 1000)).toLocaleDateString() : 
                      new Date().toLocaleDateString()
                    }
                  </Typography>
                </Alert>

                <Alert severity="success" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    💡 Tip: Toma las fotos siempre a la misma hora y con la misma iluminación
                  </Typography>
                </Alert>

                <Alert severity="warning">
                  <Typography variant="body2">
                    ⚖️ Usa la misma báscula para mantener la consistencia en las mediciones
                  </Typography>
                </Alert>
              </CardContent>
            </AnimatedCard>
          </Grid>
        </Grid>

        {/* Dialog para Nueva Revisión */}
        <Dialog 
          open={showReviewDialog} 
          onClose={() => setShowReviewDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AssessmentIcon color="primary" />
              <Typography variant="h6">
                Nueva Revisión de Progreso
              </Typography>
            </Box>
          </DialogTitle>
          
          <DialogContent>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === steps.length - 1 ? (
                        <Typography variant="caption">Último paso</Typography>
                      ) : null
                    }
                    icon={step.icon}
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {step.description}
                    </Typography>

                    {/* Paso 1: Mediciones Corporales */}
                    {index === 0 && (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                          label="Peso (kg)"
                          type="number"
                          value={reviewForm.weight}
                          onChange={(e) => handleFormChange('weight', e.target.value)}
                          fullWidth
                          InputProps={{ endAdornment: 'kg' }}
                        />
                        
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <TextField
                              label="Grasa Corporal (%)"
                              type="number"
                              value={reviewForm.bodyFat}
                              onChange={(e) => handleFormChange('bodyFat', e.target.value)}
                              fullWidth
                              InputProps={{ endAdornment: '%' }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              label="Masa Muscular (kg)"
                              type="number"
                              value={reviewForm.muscleMass}
                              onChange={(e) => handleFormChange('muscleMass', e.target.value)}
                              fullWidth
                              InputProps={{ endAdornment: 'kg' }}
                            />
                          </Grid>
                        </Grid>

                        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                          Medidas Corporales (cm)
                        </Typography>
                        
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <TextField
                              label="Pecho"
                              type="number"
                              value={reviewForm.measurements.chest}
                              onChange={(e) => handleFormChange('measurements.chest', e.target.value)}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              label="Cintura"
                              type="number"
                              value={reviewForm.measurements.waist}
                              onChange={(e) => handleFormChange('measurements.waist', e.target.value)}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              label="Cadera"
                              type="number"
                              value={reviewForm.measurements.hips}
                              onChange={(e) => handleFormChange('measurements.hips', e.target.value)}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              label="Brazos"
                              type="number"
                              value={reviewForm.measurements.arms}
                              onChange={(e) => handleFormChange('measurements.arms', e.target.value)}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              label="Muslos"
                              type="number"
                              value={reviewForm.measurements.thighs}
                              onChange={(e) => handleFormChange('measurements.thighs', e.target.value)}
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    )}

                    {/* Paso 2: Fotos de Progreso */}
                    {index === 1 && (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Alert severity="info">
                          <Typography variant="body2">
                            📸 Sube fotos frontales, laterales y traseras para un seguimiento completo
                          </Typography>
                        </Alert>

                        <Box sx={{ textAlign: 'center', py: 2 }}>
                          <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="photo-upload"
                            multiple
                            type="file"
                            onChange={handlePhotoUpload}
                          />
                          <label htmlFor="photo-upload">
                            <Button
                              variant="outlined"
                              component="span"
                              startIcon={<UploadIcon />}
                              disabled={uploadingPhotos}
                            >
                              {uploadingPhotos ? 'Subiendo...' : 'Subir Fotos'}
                            </Button>
                          </label>
                        </Box>

                        {/* Preview de fotos */}
                        {photoPreview.length > 0 && (
                          <Grid container spacing={2}>
                            {photoPreview.map((photo) => (
                              <Grid item xs={6} md={4} key={photo.id}>
                                <Paper sx={{ p: 1, position: 'relative' }}>
                                  <img
                                    src={photo.url}
                                    alt={photo.name}
                                    style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                                  />
                                  <IconButton
                                    size="small"
                                    sx={{ 
                                      position: 'absolute', 
                                      top: 4, 
                                      right: 4,
                                      bgcolor: 'background.paper'
                                    }}
                                    onClick={() => removePhoto(photo.id)}
                                  >
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Paper>
                              </Grid>
                            ))}
                          </Grid>
                        )}
                      </Box>
                    )}

                    {/* Paso 3: Evaluación Personal */}
                    {index === 2 && (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl fullWidth>
                          <InputLabel>Estado de Ánimo</InputLabel>
                          <Select
                            value={reviewForm.mood}
                            onChange={(e) => handleFormChange('mood', e.target.value)}
                            label="Estado de Ánimo"
                          >
                            <MenuItem value="Excelente">😄 Excelente</MenuItem>
                            <MenuItem value="Bueno">😊 Bueno</MenuItem>
                            <MenuItem value="Regular">😐 Regular</MenuItem>
                            <MenuItem value="Malo">😔 Malo</MenuItem>
                            <MenuItem value="Muy malo">😢 Muy malo</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth>
                          <InputLabel>Nivel de Energía</InputLabel>
                          <Select
                            value={reviewForm.energy}
                            onChange={(e) => handleFormChange('energy', e.target.value)}
                            label="Nivel de Energía"
                          >
                            <MenuItem value="Muy alto">⚡ Muy alto</MenuItem>
                            <MenuItem value="Alto">🔋 Alto</MenuItem>
                            <MenuItem value="Medio">🔌 Medio</MenuItem>
                            <MenuItem value="Bajo">🔋 Bajo</MenuItem>
                            <MenuItem value="Muy bajo">⚡ Muy bajo</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth>
                          <InputLabel>Calidad del Sueño</InputLabel>
                          <Select
                            value={reviewForm.sleep}
                            onChange={(e) => handleFormChange('sleep', e.target.value)}
                            label="Calidad del Sueño"
                          >
                            <MenuItem value="Excelente">😴 Excelente</MenuItem>
                            <MenuItem value="Buena">😊 Buena</MenuItem>
                            <MenuItem value="Regular">😐 Regular</MenuItem>
                            <MenuItem value="Mala">😔 Mala</MenuItem>
                            <MenuItem value="Muy mala">😢 Muy mala</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth>
                          <InputLabel>Adherencia al Plan</InputLabel>
                          <Select
                            value={reviewForm.adherence}
                            onChange={(e) => handleFormChange('adherence', e.target.value)}
                            label="Adherencia al Plan"
                          >
                            <MenuItem value="100%">💯 100%</MenuItem>
                            <MenuItem value="90%">🎯 90%</MenuItem>
                            <MenuItem value="80%">👍 80%</MenuItem>
                            <MenuItem value="70%">👌 70%</MenuItem>
                            <MenuItem value="60%">🤔 60%</MenuItem>
                            <MenuItem value="Menos de 60%">😞 Menos de 60%</MenuItem>
                          </Select>
                        </FormControl>

                        <TextField
                          label="Desafíos enfrentados"
                          multiline
                          rows={3}
                          value={reviewForm.challenges}
                          onChange={(e) => handleFormChange('challenges', e.target.value)}
                          fullWidth
                          placeholder="Describe los principales desafíos que enfrentaste..."
                        />

                        <TextField
                          label="Logros alcanzados"
                          multiline
                          rows={3}
                          value={reviewForm.achievements}
                          onChange={(e) => handleFormChange('achievements', e.target.value)}
                          fullWidth
                          placeholder="Comparte tus logros y victorias..."
                        />
                      </Box>
                    )}

                    {/* Paso 4: Objetivos y Feedback */}
                    {index === 3 && (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                          label="Próximos objetivos"
                          multiline
                          rows={3}
                          value={reviewForm.nextGoals}
                          onChange={(e) => handleFormChange('nextGoals', e.target.value)}
                          fullWidth
                          placeholder="Define tus objetivos para los próximos 15 días..."
                        />

                        <TextField
                          label="Feedback adicional"
                          multiline
                          rows={4}
                          value={reviewForm.feedback}
                          onChange={(e) => handleFormChange('feedback', e.target.value)}
                          fullWidth
                          placeholder="Cualquier comentario adicional, sugerencias o preguntas..."
                        />

                        <Alert severity="success">
                          <Typography variant="body2">
                            🎉 ¡Excelente! Has completado tu revisión de progreso. 
                            Esta información nos ayudará a ajustar tu plan y celebrar tus logros.
                          </Typography>
                        </Alert>
                      </Box>
                    )}

                    <Box sx={{ mb: 2, mt: 2 }}>
                      <div>
                        <AnimatedButton
                          variant="contained"
                          onClick={index === steps.length - 1 ? handleSaveReview : handleNext}
                          sx={{ mt: 1, mr: 1 }}
                          disabled={loading}
                        >
                          {index === steps.length - 1 ? 'Guardar Revisión' : 'Continuar'}
                        </AnimatedButton>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Atrás
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </DialogContent>
        </Dialog>
      </Box>
    </motion.div>
  );
};

export default ReviewSystem;
