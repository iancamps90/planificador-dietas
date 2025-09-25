// src/components/Contact.jsx

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  Snackbar,
  Chip
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Send as SendIcon,
  CheckCircle as CheckIcon,
  FitnessCenter as FitnessIcon,
  Support as SupportIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import AnimatedCard from './AnimatedCard';
import AnimatedButton from './AnimatedButton';

/**
 * Contact Component - Sección de contacto y soporte
 * 
 * Conceptos que aprenderás:
 * 1. Contact forms: Formularios de contacto
 * 2. Business information: Información de negocio
 * 3. User support: Sistema de soporte al usuario
 * 4. Professional presentation: Presentación profesional
 */

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simular envío de formulario
    console.log('Formulario enviado:', formData);
    
    setSnackbar({
      open: true,
      message: '¡Mensaje enviado correctamente! Te responderemos pronto.'
    });
    
    // Limpiar formulario
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const contactInfo = [
    {
      icon: <EmailIcon />,
      title: "Email",
      content: "info@fitnessplan.com",
      description: "Respuesta en 24 horas"
    },
    {
      icon: <PhoneIcon />,
      title: "Teléfono",
      content: "+34 900 123 456",
      description: "Lunes a Viernes 9:00-18:00"
    },
    {
      icon: <LocationIcon />,
      title: "Oficina",
      content: "Madrid, España",
      description: "Cita previa disponible"
    },
    {
      icon: <ScheduleIcon />,
      title: "Horario",
      content: "9:00 - 18:00",
      description: "Lunes a Viernes"
    }
  ];

  const services = [
    {
      title: "Plan Mensual",
      description: "Seguimiento completo durante 1 mes. Incluye: Plan de dieta personalizado, rutina de entrenamiento, seguimiento cada 15 días",
      price: "20€/mes",
      features: ["Plan de dieta personalizado", "Rutina de entrenamiento", "Seguimiento cada 15 días", "Consultas ilimitadas"],
      duration: "1 mes"
    },
    {
      title: "Plan Trimestral",
      description: "Seguimiento completo durante 3 meses. Incluye: Plan de dieta personalizado, rutina de entrenamiento, seguimiento cada 15 días",
      price: "50€/trimestre",
      features: ["Plan de dieta personalizado", "Rutina de entrenamiento", "Seguimiento cada 15 días", "Consultas ilimitadas", "Descuento del 17%"],
      duration: "3 meses"
    },
    {
      title: "Plan Anual",
      description: "Seguimiento completo durante 12 meses. Incluye: Plan de dieta personalizado, rutina de entrenamiento, seguimiento cada 15 días",
      price: "230€/año",
      features: ["Plan de dieta personalizado", "Rutina de entrenamiento", "Seguimiento cada 15 días", "Consultas ilimitadas", "Descuento del 4%", "Sesión gratuita"],
      duration: "12 meses"
    },
    {
      title: "Sesión Personal",
      description: "Sesión individual con nutricionista certificado. Análisis personalizado y recomendaciones",
      price: "20€/sesión",
      features: ["Análisis corporal", "Recomendaciones nutricionales", "Plan personalizado"],
      duration: "1 sesión"
    }
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
                <SupportIcon color="primary" />
              </motion.div>
              Contacto y Soporte
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Estamos aquí para ayudarte en tu transformación fitness
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {/* Información de contacto */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FitnessIcon color="primary" />
                    Información de Contacto
                  </Typography>
                  
                  <List>
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={info.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      >
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon>
                            <Box sx={{ 
                              bgcolor: 'primary.light', 
                              color: 'white', 
                              borderRadius: 2, 
                              p: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              {info.icon}
                            </Box>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="h6" color="primary">
                                {info.title}
                              </Typography>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                  {info.content}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {info.description}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                        {index < contactInfo.length - 1 && <Divider sx={{ my: 1 }} />}
                      </motion.div>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Formulario de contacto */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 3 }}>
                    Envíanos un Mensaje
                  </Typography>
                  
                  <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Nombre"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Asunto"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Mensaje"
                          name="message"
                          multiline
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          variant="outlined"
                          placeholder="Cuéntanos cómo podemos ayudarte..."
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <AnimatedButton
                          type="submit"
                          variant="contained"
                          size="large"
                          fullWidth
                          startIcon={<SendIcon />}
                        >
                          Enviar Mensaje
                        </AnimatedButton>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Servicios */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
                    Nuestros Servicios
                  </Typography>
                  
                  <Grid container spacing={3}>
                    {services.map((service, index) => (
                      <Grid item xs={12} md={6} key={service.title}>
                        <AnimatedCard delay={index * 0.1}>
                          <Box sx={{ p: 3 }}>
                            <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                              {service.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              {service.description}
                            </Typography>
                            
                            {/* Características del plan */}
                            {service.features && (
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                                  Incluye:
                                </Typography>
                                {service.features.map((feature, idx) => (
                                  <Chip
                                    key={idx}
                                    label={feature}
                                    size="small"
                                    variant="outlined"
                                    sx={{ mr: 0.5, mb: 0.5 }}
                                  />
                                ))}
                              </Box>
                            )}
                            
                            {/* Duración y precio */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                              <Typography variant="body2" color="text.secondary">
                                <ScheduleIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                {service.duration}
                              </Typography>
                              <Typography variant="h5" color="secondary" sx={{ fontWeight: 'bold' }}>
                                {service.price}
                              </Typography>
                            </Box>
                            
                            <AnimatedButton
                              variant="contained"
                              size="small"
                              fullWidth
                            >
                              Contratar Plan
                            </AnimatedButton>
                          </Box>
                        </AnimatedCard>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* FAQ */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
                    Preguntas Frecuentes
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, mb: 2 }}>
                        <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                          ¿Cómo funciona el seguimiento?
                        </Typography>
                        <Typography variant="body2">
                          Cada 15 días envías fotos de progreso, peso y feedback sobre cómo te sientes.
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, mb: 2 }}>
                        <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                          ¿Puedo cambiar mi plan?
                        </Typography>
                        <Typography variant="body2">
                          Los planes son fijos para mantener consistencia, pero puedes solicitar ajustes.
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, mb: 2 }}>
                        <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                          ¿Qué incluye el plan premium?
                        </Typography>
                        <Typography variant="body2">
                          Seguimiento personalizado, ajustes de dieta y entrenamiento según tu progreso.
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, mb: 2 }}>
                        <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                          ¿Hay garantía de resultados?
                        </Typography>
                        <Typography variant="body2">
                          Con constancia y seguimiento, garantizamos resultados en 3 meses.
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Snackbar para confirmaciones */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity="success" 
            sx={{ width: '100%' }}
            icon={<CheckIcon />}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
};

export default Contact;
