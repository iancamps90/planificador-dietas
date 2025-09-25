// src/components/AnimatedProgress.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { LinearProgress, Box, Typography } from '@mui/material';

/**
 * AnimatedProgress Component - Barra de progreso con animaciones
 * 
 * Conceptos que aprenderás:
 * 1. Progress animations: Animaciones de progreso
 * 2. Color transitions: Transiciones de color
 * 3. Text animations: Animaciones de texto
 * 4. Staggered animations: Animaciones escalonadas
 */

const AnimatedProgress = ({ 
  value, 
  max = 100,
  color = 'primary',
  showLabel = true,
  label = '',
  height = 8,
  borderRadius = 4,
  animated = true,
  delay = 0
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  // Variantes de animación
  const progressVariants = {
    hidden: { 
      width: 0,
      transition: { duration: 0 }
    },
    visible: { 
      width: `${percentage}%`,
      transition: { 
        duration: animated ? 1.5 : 0,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: delay + 0.5
      }
    }
  };

  // Determinar color según el porcentaje
  const getProgressColor = () => {
    if (percentage >= 90) return 'success';
    if (percentage >= 70) return 'primary';
    if (percentage >= 50) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ width: '100%' }}>
      {showLabel && (
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 1
          }}>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {value.toFixed(0)} / {max}
            </Typography>
          </Box>
        </motion.div>
      )}
      
      <Box
        sx={{
          width: '100%',
          height: height,
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderRadius: borderRadius,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <motion.div
          variants={progressVariants}
          initial="hidden"
          animate="visible"
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${
              color === 'primary' ? '#667eea' :
              color === 'success' ? '#4caf50' :
              color === 'warning' ? '#ff9800' :
              color === 'error' ? '#f44336' :
              color
            } 0%, ${
              color === 'primary' ? '#764ba2' :
              color === 'success' ? '#8bc34a' :
              color === 'warning' ? '#ffc107' :
              color === 'error' ? '#e57373' :
              color
            } 100%)`,
            borderRadius: borderRadius,
            position: 'relative'
          }}
        >
          {/* Efecto de brillo */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeInOut'
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              borderRadius: borderRadius
            }}
          />
        </motion.div>
      </Box>
    </Box>
  );
};

export default AnimatedProgress;
