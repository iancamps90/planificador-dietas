// src/components/SocialShare.jsx

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Share as ShareIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  WhatsApp as WhatsAppIcon,
  Email as EmailIcon,
  Link as LinkIcon,
  ContentCopy as CopyIcon,
  Check as CheckIcon,
  QrCode as QrCodeIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import AnimatedCard from './AnimatedCard';
import AnimatedButton from './AnimatedButton';

/**
 * SocialShare Component - Integración social y compartir planes
 * 
 * Conceptos que aprenderás:
 * 1. Social media integration: Integración con redes sociales
 * 2. Web Share API: API nativa para compartir
 * 3. QR Code generation: Generación de códigos QR
 * 4. URL shortening: Acortamiento de URLs
 */

const SocialShare = ({ type, data, title }) => {
  const [shareDialog, setShareDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  // Generar URL para compartir
  const generateShareUrl = () => {
    const baseUrl = window.location.origin;
    const shareData = {
      type,
      data,
      timestamp: new Date().toISOString()
    };
    
    // En una app real, esto se enviaría a un servidor
    const encodedData = btoa(JSON.stringify(shareData));
    return `${baseUrl}/share/${encodedData}`;
  };

  // Compartir en Facebook
  const shareToFacebook = () => {
    const url = generateShareUrl();
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  // Compartir en Twitter
  const shareToTwitter = () => {
    const url = generateShareUrl();
    const text = customMessage || `¡Mira mi ${type === 'diet' ? 'plan de dieta' : 'rutina de ejercicios'}! 🏃‍♂️💪`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  // Compartir en WhatsApp
  const shareToWhatsApp = () => {
    const url = generateShareUrl();
    const text = customMessage || `¡Mira mi ${type === 'diet' ? 'plan de dieta' : 'rutina de ejercicios'}! 🏃‍♂️💪 ${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Compartir por email
  const shareByEmail = () => {
    const url = generateShareUrl();
    const subject = `Mi ${type === 'diet' ? 'Plan de Dieta' : 'Rutina de Ejercicios'}`;
    const body = customMessage || `¡Hola! Quería compartir contigo mi ${type === 'diet' ? 'plan de dieta' : 'rutina de ejercicios'} personalizado. Puedes verlo aquí: ${url}`;
    
    const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = emailUrl;
  };

  // Copiar enlace al portapapeles
  const copyToClipboard = async () => {
    try {
      const url = generateShareUrl();
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copiando al portapapeles:', error);
    }
  };

  // Usar Web Share API nativa si está disponible
  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || `Mi ${type === 'diet' ? 'Plan de Dieta' : 'Rutina de Ejercicios'}`,
          text: customMessage || `¡Mira mi ${type === 'diet' ? 'plan de dieta' : 'rutina de ejercicios'} personalizado!`,
          url: generateShareUrl()
        });
      } catch (error) {
        console.log('Error compartiendo:', error);
      }
    } else {
      // Fallback: abrir dialog personalizado
      setShareDialog(true);
    }
  };

  // Generar resumen de datos para compartir
  const generateSummary = () => {
    if (type === 'diet' && data) {
      return {
        title: 'Plan de Dieta Semanal',
        description: `${Object.keys(data).length} días de comidas saludables`,
        details: Object.entries(data).slice(0, 3).map(([day, plan]) => 
          `${day}: ${plan.breakfast?.name || 'Desayuno'}, ${plan.lunch?.name || 'Almuerzo'}`
        )
      };
    } else if (type === 'workout' && data) {
      return {
        title: 'Rutina de Ejercicios',
        description: `${Object.keys(data).length} días de entrenamiento`,
        details: Object.entries(data).slice(0, 3).map(([day, workout]) => 
          `${day}: ${workout.exercises?.length || 0} ejercicios`
        )
      };
    }
    return {
      title: 'Mi Progreso Fitness',
      description: 'Compartiendo mi viaje fitness',
      details: ['¡Mira mi progreso!']
    };
  };

  const summary = generateSummary();

  return (
    <Box>
      {/* Botón principal de compartir */}
      <AnimatedButton
        variant="contained"
        onClick={shareNative}
        startIcon={<ShareIcon />}
        fullWidth
      >
        Compartir {type === 'diet' ? 'Plan de Dieta' : 'Rutina de Ejercicios'}
      </AnimatedButton>

      {/* Preview de lo que se va a compartir */}
      <AnimatedCard sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            📱 Vista previa de compartir
          </Typography>
          
          <Box sx={{ 
            border: '1px solid #e0e0e0', 
            borderRadius: 2, 
            p: 2, 
            bgcolor: 'grey.50' 
          }}>
            <Typography variant="h6" color="primary">
              {summary.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {summary.description}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {summary.details.map((detail, index) => (
                <Chip key={index} label={detail} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>

          <TextField
            fullWidth
            label="Mensaje personalizado (opcional)"
            multiline
            rows={2}
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            sx={{ mt: 2 }}
            placeholder="Añade un mensaje personalizado..."
          />
        </CardContent>
      </AnimatedCard>

      {/* Opciones de compartir */}
      <AnimatedCard sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            🌐 Compartir en redes sociales
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <AnimatedButton
                variant="outlined"
                onClick={shareToFacebook}
                startIcon={<FacebookIcon sx={{ color: '#1877F2' }} />}
                fullWidth
              >
                Facebook
              </AnimatedButton>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <AnimatedButton
                variant="outlined"
                onClick={shareToTwitter}
                startIcon={<TwitterIcon sx={{ color: '#1DA1F2' }} />}
                fullWidth
              >
                Twitter
              </AnimatedButton>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <AnimatedButton
                variant="outlined"
                onClick={shareToWhatsApp}
                startIcon={<WhatsAppIcon sx={{ color: '#25D366' }} />}
                fullWidth
              >
                WhatsApp
              </AnimatedButton>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <AnimatedButton
                variant="outlined"
                onClick={shareByEmail}
                startIcon={<EmailIcon />}
                fullWidth
              >
                Email
              </AnimatedButton>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <AnimatedButton
              variant="outlined"
              onClick={copyToClipboard}
              startIcon={copied ? <CheckIcon /> : <CopyIcon />}
              color={copied ? 'success' : 'primary'}
            >
              {copied ? 'Copiado!' : 'Copiar Enlace'}
            </AnimatedButton>
            
            <AnimatedButton
              variant="outlined"
              startIcon={<QrCodeIcon />}
              disabled
            >
              QR Code (Próximamente)
            </AnimatedButton>
          </Box>
        </CardContent>
      </AnimatedCard>

      {/* Estadísticas de compartir */}
      <AnimatedCard sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            📊 Estadísticas de compartir
          </Typography>
          
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <ShareIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Compartido hoy"
                secondary="3 veces"
              />
            </ListItem>
            
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  <FacebookIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Facebook"
                secondary="12 visualizaciones"
              />
            </ListItem>
            
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <WhatsAppIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="WhatsApp"
                secondary="8 compartidos"
              />
            </ListItem>
          </List>
        </CardContent>
      </AnimatedCard>

      {/* Snackbar para confirmaciones */}
      <Snackbar
        open={copied}
        autoHideDuration={2000}
        message="¡Enlace copiado al portapapeles!"
      />
    </Box>
  );
};

export default SocialShare;
