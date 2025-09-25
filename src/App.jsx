// src/App.jsx

import { useState } from 'react';
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './App.css';

// Importar componentes
import Navbar from './components/Navbar';
import Calculator from './components/Calculator';
import DietPlan from './components/DietPlan';
import WorkoutPlan from './components/WorkoutPlan';
import Favorites from './components/Favorites';
import AdvancedStats from './components/AdvancedStats';
import Contact from './components/Contact';
import ReviewSystem from './components/ReviewSystem';
import { checkPendingReview, setupReviewReminders } from './utils/reviewNotifications';
import { useEffect } from 'react';

/**
 * App Component - Punto central de navegación de la aplicación
 * 
 * Conceptos que aprenderás:
 * 1. State management: useState para manejar la sección activa
 * 2. Conditional rendering: Mostrar diferentes componentes según el estado
 * 3. Theme customization: Crear tema personalizado con Material-UI
 * 4. Container pattern: Usar Container para layout responsive
 */

// Crear tema personalizado para la app fitness
const fitnessTheme = createTheme({
  palette: {
    primary: {
      main: '#667eea', // Azul fitness
      light: '#9bb5ff',
      dark: '#3f51b5'
    },
    secondary: {
      main: '#f44336', // Rojo para acentos
      light: '#ff7961',
      dark: '#d32f2f'
    },
    background: {
      default: '#f5f7fa', // Fondo suave
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#2c3e50'
    },
    h5: {
      fontWeight: 500,
      color: '#34495e'
    }
  },
  shape: {
    borderRadius: 12 // Bordes más redondeados
  }
});

const App = () => {
  // Estado para manejar qué sección está activa
  const [activeSection, setActiveSection] = useState('calculator');
  
  // Estado para notificaciones de revisión
  const [showReviewNotification, setShowReviewNotification] = useState(false);

  /**
   * Configurar notificaciones de revisión al cargar la app
   */
  useEffect(() => {
    const reviewStatus = checkPendingReview();
    setShowReviewNotification(reviewStatus.hasPending);
    
    // Configurar recordatorios automáticos
    setupReviewReminders();
  }, []);

  /**
   * Función para cambiar de sección
   * @param {string} section - ID de la sección a mostrar
   */
  const handleNavigate = (section) => {
    setActiveSection(section);
  };

  /**
   * Función para renderizar el componente activo
   * Este es un patrón común en React para conditional rendering
   */
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'calculator':
        return <Calculator onNavigate={handleNavigate} />;
      case 'diet':
        return <DietPlan />;
      case 'workout':
        return <WorkoutPlan />;
      case 'favorites':
        return <Favorites />;
      case 'stats':
        return <AdvancedStats />;
      case 'contact':
        return <Contact />;
      case 'reviews':
        return <ReviewSystem />;
      default:
        return <Calculator />;
    }
  };

  return (
    <ThemeProvider theme={fitnessTheme}>
      {/* CssBaseline resetea estilos por defecto del navegador */}
      <CssBaseline />
      
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        {/* Navbar siempre visible */}
        <Navbar 
          activeSection={activeSection} 
          onNavigate={handleNavigate} 
        />
        
        {/* Contenido principal */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {renderActiveSection()}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;


