// src/components/AnimatedCard.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@mui/material';

/**
 * AnimatedCard Component - Tarjeta con animaciones premium
 * 
 * Conceptos que aprenderás:
 * 1. Framer Motion: Biblioteca de animaciones para React
 * 2. Animation variants: Variantes de animación
 * 3. Gesture animations: Animaciones de gestos
 * 4. Stagger animations: Animaciones escalonadas
 */

const AnimatedCard = ({ 
  children, 
  delay = 0, 
  direction = 'up', 
  distance = 50,
  duration = 0.5,
  hover = true,
  ...props 
}) => {
  // Variantes de animación
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94] // Curva de animación suave
      }
    },
    hover: hover ? {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    } : {}
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      style={{ width: '100%', height: '100%' }}
    >
      <Card 
        sx={{ 
          height: '100%',
          transition: 'all 0.3s ease',
          '&:hover': hover ? {
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
          } : {}
        }}
        {...props}
      >
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnimatedCard;
