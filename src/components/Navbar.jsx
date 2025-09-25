// src/components/Navbar.jsx

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Calculate as CalculateIcon,
  Restaurant as RestaurantIcon,
  FitnessCenter as WorkoutIcon,
  Favorite as FavoriteIcon,
  TrendingUp as StatsIcon,
  ContactSupport as ContactIcon,
  Assessment as ReviewsIcon
} from '@mui/icons-material';

/**
 * Navbar Component - Barra de navegación principal
 * 
 * Conceptos que aprenderás:
 * 1. Material-UI AppBar: Componente para barras superiores
 * 2. Responsive design: useMediaQuery para adaptar a móviles
 * 3. Props drilling: Recibir función de navegación desde el padre
 * 4. Iconos de Material-UI: Uso de iconos para mejor UX
 */
const Navbar = ({ activeSection, onNavigate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Array de navegación - cada item tiene icono, texto y función
  const navItems = [
    { 
      id: 'calculator', 
      label: 'Calculadora', 
      icon: <CalculateIcon />,
      description: 'Calcular calorías'
    },
    { 
      id: 'diet', 
      label: 'Plan de Dieta', 
      icon: <RestaurantIcon />,
      description: 'Plan semanal'
    },
    { 
      id: 'workout', 
      label: 'Entrenos', 
      icon: <WorkoutIcon />,
      description: 'Rutinas de ejercicio'
    },
    { 
      id: 'favorites', 
      label: 'Favoritos', 
      icon: <FavoriteIcon />,
      description: 'Comidas guardadas'
    },
    { 
      id: 'stats', 
      label: 'Estadísticas', 
      icon: <StatsIcon />,
      description: 'Progreso y logros'
    },
    { 
      id: 'contact', 
      label: 'Contacto', 
      icon: <ContactIcon />,
      description: 'Soporte y consultas'
    },
    { 
      id: 'reviews', 
      label: 'Revisiones', 
      icon: <ReviewsIcon />,
      description: 'Seguimiento cada 15 días'
    }
  ];

  return (
    <AppBar position="static" sx={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      <Toolbar>
        {/* Logo/Título de la app */}
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 'bold',
            fontSize: isMobile ? '1.1rem' : '1.5rem'
          }}
        >
          💪 Fitness Planner
        </Typography>

        {/* Botones de navegación */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.id}
              color="inherit"
              onClick={() => onNavigate(item.id)}
              startIcon={!isMobile ? item.icon : null} // Solo mostrar iconos en desktop
              sx={{
                // Estilo del botón activo vs inactivo
                backgroundColor: activeSection === item.id 
                  ? 'rgba(255,255,255,0.2)' 
                  : 'transparent',
                borderRadius: 2,
                px: 2,
                py: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)'
                },
                // En móvil, mostrar solo el icono
                ...(isMobile && {
                  minWidth: 'auto',
                  px: 1
                })
              }}
              title={isMobile ? item.description : null} // Tooltip en móvil
            >
              {isMobile ? item.icon : item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
