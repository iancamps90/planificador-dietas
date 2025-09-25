// src/utils/mealTiming.js

/**
 * Sistema de Horarios de Comidas Inteligente
 * 
 * Conceptos que aprenderás:
 * 1. Time management: Gestión inteligente de horarios
 * 2. Meal timing optimization: Optimización de horarios de comidas
 * 3. Lifestyle adaptation: Adaptación a diferentes estilos de vida
 * 4. Metabolic optimization: Optimización metabólica
 */

/**
 * Configuraciones de horarios según el estilo de vida
 */
export const mealTimingProfiles = {
  earlyBird: {
    name: 'Madrugador',
    description: 'Se levanta temprano y prefiere comidas tempranas',
    schedule: {
      breakfast: '07:00',
      snack: '10:00',
      lunch: '13:00',
      snack: '16:00',
      dinner: '19:00'
    },
    characteristics: ['energético', 'productivo', 'disciplinado']
  },
  
  nightOwl: {
    name: 'Nocturno',
    description: 'Se acuesta tarde y prefiere comidas más tardías',
    schedule: {
      breakfast: '09:00',
      snack: '12:00',
      lunch: '15:00',
      snack: '18:00',
      dinner: '21:00'
    },
    characteristics: ['creativo', 'flexible', 'social']
  },
  
  officeWorker: {
    name: 'Trabajador de Oficina',
    description: 'Horario fijo de trabajo con comidas estructuradas',
    schedule: {
      breakfast: '08:00',
      snack: '11:00',
      lunch: '14:00',
      snack: '17:00',
      dinner: '20:00'
    },
    characteristics: ['estructurado', 'puntual', 'eficiente']
  },
  
  student: {
    name: 'Estudiante',
    description: 'Horarios flexibles con comidas irregulares',
    schedule: {
      breakfast: '09:00',
      snack: '12:00',
      lunch: '15:00',
      snack: '18:00',
      dinner: '21:00'
    },
    characteristics: ['flexible', 'adaptable', 'energético']
  },
  
  athlete: {
    name: 'Deportista',
    description: 'Comidas optimizadas para entrenamientos',
    schedule: {
      breakfast: '07:00',
      snack: '10:00',
      lunch: '13:00',
      preWorkout: '17:00',
      postWorkout: '19:00',
      dinner: '20:30'
    },
    characteristics: ['disciplinado', 'enfocado', 'optimizado']
  }
};

/**
 * Función para calcular el timing óptimo de comidas
 * @param {string} profile - Perfil de usuario
 * @param {string} wakeUpTime - Hora de despertar (formato HH:MM)
 * @param {string} sleepTime - Hora de dormir (formato HH:MM)
 * @returns {Object} Horario optimizado
 */
export const calculateOptimalMealTiming = (profile, wakeUpTime, sleepTime) => {
  const baseProfile = mealTimingProfiles[profile];
  if (!baseProfile) return null;

  // Convertir horas a minutos para cálculos
  const wakeUpMinutes = timeToMinutes(wakeUpTime);
  const sleepMinutes = timeToMinutes(sleepTime);
  
  // Calcular duración del día activo
  const activeDayDuration = sleepMinutes - wakeUpMinutes;
  
  // Distribuir comidas a lo largo del día activo
  const mealTimings = {};
  
  Object.entries(baseProfile.schedule).forEach(([mealType, baseTime]) => {
    const baseMinutes = timeToMinutes(baseTime);
    
    // Ajustar según el horario personal
    const adjustedMinutes = wakeUpMinutes + 
      ((baseMinutes - timeToMinutes('07:00')) / (timeToMinutes('21:00') - timeToMinutes('07:00'))) * 
      activeDayDuration;
    
    mealTimings[mealType] = minutesToTime(adjustedMinutes);
  });

  return {
    profile: baseProfile.name,
    schedule: mealTimings,
    recommendations: generateMealTimingRecommendations(profile, mealTimings)
  };
};

/**
 * Función para generar recomendaciones de timing
 * @param {string} profile - Perfil del usuario
 * @param {Object} schedule - Horario de comidas
 * @returns {Array} Recomendaciones
 */
export const generateMealTimingRecommendations = (profile, schedule) => {
  const recommendations = [];

  switch (profile) {
    case 'earlyBird':
      recommendations.push(
        'Desayuna dentro de la primera hora después de despertarte',
        'Evita comer después de las 20:00 para mejorar el sueño',
        'Haz tu comida más copiosa al mediodía'
      );
      break;
      
    case 'nightOwl':
      recommendations.push(
        'No saltes el desayuno, aunque sea ligero',
        'Haz comidas más pequeñas y frecuentes',
        'Termina de cenar al menos 2 horas antes de dormir'
      );
      break;
      
    case 'officeWorker':
      recommendations.push(
        'Planifica tus comidas según tu horario de trabajo',
        'Haz un snack saludable a media mañana',
        'Evita comidas pesadas durante la hora de trabajo'
      );
      break;
      
    case 'student':
      recommendations.push(
        'Mantén horarios regulares aunque sean flexibles',
        'No saltes comidas por estudiar',
        'Haz snacks saludables entre clases'
      );
      break;
      
    case 'athlete':
      recommendations.push(
        'Come 2-3 horas antes del entrenamiento',
        'Haz una comida post-entrenamiento dentro de 30 minutos',
        'Distribuye las proteínas a lo largo del día'
      );
      break;
  }

  return recommendations;
};

/**
 * Función para optimizar el timing según objetivos
 * @param {string} goal - Objetivo del usuario
 * @param {Object} schedule - Horario actual
 * @returns {Object} Horario optimizado
 */
export const optimizeTimingForGoal = (goal, schedule) => {
  const optimizations = {
    'weight-loss': {
      breakfast: 'Temprano (antes de las 9:00)',
      dinner: 'Temprano (antes de las 19:00)',
      fasting: 'Considera ayuno intermitente 16:8'
    },
    'muscle-gain': {
      preWorkout: '2-3 horas antes del entrenamiento',
      postWorkout: 'Dentro de 30 minutos después',
      protein: 'Distribuye proteínas en todas las comidas'
    },
    'endurance': {
      carbs: 'Consume carbohidratos antes del ejercicio',
      hydration: 'Mantén hidratación constante',
      timing: 'Comidas ligeras antes de entrenar'
    }
  };

  return optimizations[goal] || {};
};

/**
 * Función auxiliar para convertir tiempo a minutos
 * @param {string} time - Tiempo en formato HH:MM
 * @returns {number} Minutos desde medianoche
 */
export const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * Función auxiliar para convertir minutos a tiempo
 * @param {number} minutes - Minutos desde medianoche
 * @returns {string} Tiempo en formato HH:MM
 */
export const minutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

/**
 * Función para generar recordatorios de comidas
 * @param {Object} schedule - Horario de comidas
 * @returns {Array} Recordatorios con mensajes motivacionales
 */
export const generateMealReminders = (schedule) => {
  const reminders = [];
  
  Object.entries(schedule).forEach(([mealType, time]) => {
    const mealNames = {
      breakfast: 'Desayuno',
      snack: 'Snack',
      lunch: 'Almuerzo',
      dinner: 'Cena',
      preWorkout: 'Pre-entrenamiento',
      postWorkout: 'Post-entrenamiento'
    };

    const motivationalMessages = {
      breakfast: [
        '¡Buenos días! Es hora de desayunar y cargar energías 💪',
        'Tu cuerpo necesita combustible para empezar el día 🚀',
        'Un buen desayuno es la base de un día productivo ☀️'
      ],
      lunch: [
        '¡Hora del almuerzo! Recarga energías para continuar 🍽️',
        'Es momento de nutrir tu cuerpo con comida saludable 🌟',
        'Tu comida del mediodía te dará energía para el resto del día ⚡'
      ],
      dinner: [
        '¡Hora de cenar! Una comida nutritiva para cerrar el día 🌙',
        'Es momento de relajarse y disfrutar de una cena saludable 😌',
        'Una buena cena te ayudará a descansar mejor 🌙'
      ],
      snack: [
        '¡Snack time! Mantén tu energía estable 🥜',
        'Un snack saludable te ayudará a llegar a la próxima comida 🍎',
        'Es hora de recargar energías con algo nutritivo ⚡'
      ]
    };

    const messages = motivationalMessages[mealType] || ['¡Es hora de comer! 🍽️'];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    reminders.push({
      time,
      meal: mealNames[mealType] || mealType,
      message: randomMessage,
      type: mealType
    });
  });

  return reminders.sort((a, b) => a.time.localeCompare(b.time));
};
