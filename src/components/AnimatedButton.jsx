// src/components/AnimatedButton.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';

/**
 * AnimatedButton Component - Botón con animaciones premium
 * 
 * Conceptos que aprenderás:
 * 1. Button animations: Animaciones específicas para botones
 * 2. Ripple effects: Efectos de ondulación
 * 3. Loading animations: Animaciones de carga
 * 4. Success animations: Animaciones de éxito
 */

const AnimatedButton = ({ 
  children, 
  loading = false,
  success = false,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  onClick,
  disabled = false,
  ...props 
}) => {
  const buttonVariants = {
    initial: { scale: 1 },
    tap: { scale: 0.95 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  const successVariants = {
    initial: { scale: 1 },
    success: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.6,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.div
      variants={successVariants}
      initial="initial"
      animate={success ? "success" : "initial"}
    >
      <motion.div
        variants={buttonVariants}
        whileHover={!disabled && !loading ? "hover" : {}}
        whileTap={!disabled && !loading ? "tap" : {}}
      >
        <Button
          variant={variant}
          color={color}
          size={size}
          fullWidth={fullWidth}
          onClick={onClick}
          disabled={disabled || loading}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              transition: 'left 0.5s'
            },
            '&:hover::before': {
              left: '100%'
            }
          }}
          {...props}
        >
          {loading && (
            <motion.div
              variants={loadingVariants}
              animate="animate"
              style={{
                display: 'inline-block',
                marginRight: 8
              }}
            >
              ⏳
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                display: 'inline-block',
                marginRight: 8
              }}
            >
              ✅
            </motion.div>
          )}
          {children}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedButton;
