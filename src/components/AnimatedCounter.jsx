// src/components/AnimatedCounter.jsx

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

/**
 * AnimatedCounter Component - Contador con animaciones suaves
 * 
 * Conceptos que aprenderás:
 * 1. Spring animations: Animaciones de resorte
 * 2. Number interpolation: Interpolación de números
 * 3. Smooth transitions: Transiciones suaves
 * 4. Performance optimization: Optimización de rendimiento
 */

const AnimatedCounter = ({ 
  value, 
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  color = 'inherit',
  fontSize = 'inherit',
  fontWeight = 'inherit'
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  // Configurar la animación de resorte
  const springValue = useSpring(0, { 
    stiffness: 100, 
    damping: 30 
  });
  
  // Transformar el valor para mostrar
  const animatedValue = useTransform(springValue, (value) => 
    Number(value.toFixed(decimals))
  );

  useEffect(() => {
    // Animar al nuevo valor
    springValue.set(value);
    
    // Actualizar el valor mostrado
    const unsubscribe = animatedValue.onChange((latest) => {
      setDisplayValue(latest);
    });

    return unsubscribe;
  }, [value, springValue, animatedValue]);

  return (
    <motion.span
      style={{
        color,
        fontSize,
        fontWeight,
        display: 'inline-block'
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {prefix}{displayValue.toLocaleString()}{suffix}
    </motion.span>
  );
};

export default AnimatedCounter;
