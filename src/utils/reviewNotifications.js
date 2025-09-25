// src/utils/reviewNotifications.js

/**
 * Sistema de Notificaciones para Revisiones
 * 
 * Conceptos que aprenderás:
 * 1. Date calculations: Cálculos de fechas y recordatorios
 * 2. Local storage management: Gestión de datos locales
 * 3. Browser notifications: Notificaciones del navegador
 * 4. Conditional logic: Lógica condicional para recordatorios
 */

/**
 * Verificar si hay una revisión pendiente
 * @returns {Object} Estado de la revisión pendiente
 */
export const checkPendingReview = () => {
  const reviews = JSON.parse(localStorage.getItem('fitnessReviews') || '[]');
  
  if (reviews.length === 0) {
    return {
      hasPending: false,
      message: 'Primera revisión disponible',
      daysSinceLastReview: null,
      nextReviewDate: new Date()
    };
  }

  const lastReview = reviews[reviews.length - 1];
  const lastReviewDate = new Date(lastReview.date);
  const today = new Date();
  const daysDiff = Math.floor((today - lastReviewDate) / (1000 * 60 * 60 * 24));
  const nextReviewDate = new Date(lastReviewDate.getTime() + (15 * 24 * 60 * 60 * 1000));

  return {
    hasPending: daysDiff >= 15,
    message: daysDiff >= 15 ? 
      `Revisión pendiente desde hace ${daysDiff} días` : 
      `Próxima revisión en ${15 - daysDiff} días`,
    daysSinceLastReview: daysDiff,
    nextReviewDate: nextReviewDate
  };
};

/**
 * Mostrar notificación de revisión pendiente
 */
export const showReviewNotification = () => {
  const reviewStatus = checkPendingReview();
  
  if (reviewStatus.hasPending) {
    // Verificar si las notificaciones están permitidas
    if (Notification.permission === 'granted') {
      new Notification('📊 Revisión de Progreso Pendiente', {
        body: `Han pasado ${reviewStatus.daysSinceLastReview} días desde tu última revisión. ¡Es hora de registrar tu progreso!`,
        icon: '/vite.svg',
        badge: '/vite.svg',
        tag: 'fitness-review',
        requireInteraction: true
      });
    } else if (Notification.permission !== 'denied') {
      // Solicitar permiso para notificaciones
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          showReviewNotification();
        }
      });
    }
  }
};

/**
 * Configurar recordatorios automáticos
 */
export const setupReviewReminders = () => {
  // Verificar cada 24 horas si hay una revisión pendiente
  setInterval(() => {
    showReviewNotification();
  }, 24 * 60 * 60 * 1000); // 24 horas

  // También verificar al cargar la página
  setTimeout(() => {
    showReviewNotification();
  }, 2000);
};

/**
 * Obtener estadísticas de revisiones
 * @returns {Object} Estadísticas de revisiones
 */
export const getReviewStats = () => {
  const reviews = JSON.parse(localStorage.getItem('fitnessReviews') || '[]');
  
  if (reviews.length === 0) {
    return {
      totalReviews: 0,
      averageDaysBetween: 0,
      lastReviewDate: null,
      nextReviewDate: new Date(),
      consistency: 'N/A'
    };
  }

  // Calcular días promedio entre revisiones
  let totalDays = 0;
  for (let i = 1; i < reviews.length; i++) {
    const prevDate = new Date(reviews[i - 1].date);
    const currDate = new Date(reviews[i].date);
    totalDays += Math.floor((currDate - prevDate) / (1000 * 60 * 60 * 24));
  }
  
  const averageDaysBetween = reviews.length > 1 ? totalDays / (reviews.length - 1) : 15;
  
  // Calcular consistencia
  let consistency = 'Excelente';
  if (averageDaysBetween > 20) consistency = 'Buena';
  if (averageDaysBetween > 30) consistency = 'Regular';
  if (averageDaysBetween > 45) consistency = 'Mala';

  const lastReview = reviews[reviews.length - 1];
  const lastReviewDate = new Date(lastReview.date);
  const nextReviewDate = new Date(lastReviewDate.getTime() + (15 * 24 * 60 * 60 * 1000));

  return {
    totalReviews: reviews.length,
    averageDaysBetween: Math.round(averageDaysBetween),
    lastReviewDate: lastReviewDate,
    nextReviewDate: nextReviewDate,
    consistency: consistency
  };
};

/**
 * Generar recordatorio personalizado
 * @returns {string} Mensaje de recordatorio
 */
export const generateReminderMessage = () => {
  const reviewStatus = checkPendingReview();
  const stats = getReviewStats();
  
  if (reviewStatus.hasPending) {
    const daysOverdue = reviewStatus.daysSinceLastReview - 15;
    return `⏰ ¡Revisión pendiente! Han pasado ${reviewStatus.daysSinceLastReview} días desde tu última revisión (${daysOverdue} días de retraso). ¡Es hora de registrar tu progreso y mantener tu motivación alta!`;
  } else {
    const daysUntilNext = 15 - reviewStatus.daysSinceLastReview;
    return `📅 Tu próxima revisión está programada para dentro de ${daysUntilNext} días. ¡Mantén el ritmo y sigue registrando tu progreso!`;
  }
};

/**
 * Verificar si es el momento de una revisión
 * @returns {boolean} True si es momento de revisar
 */
export const isTimeForReview = () => {
  const reviewStatus = checkPendingReview();
  return reviewStatus.hasPending;
};

/**
 * Marcar revisión como completada
 * @param {string} reviewId - ID de la revisión completada
 */
export const markReviewCompleted = (reviewId) => {
  const reviews = JSON.parse(localStorage.getItem('fitnessReviews') || '[]');
  const updatedReviews = reviews.map(review => 
    review.id === reviewId ? { ...review, status: 'completed' } : review
  );
  localStorage.setItem('fitnessReviews', JSON.stringify(updatedReviews));
};

/**
 * Obtener progreso desde la última revisión
 * @returns {Object} Progreso calculado
 */
export const getProgressSinceLastReview = () => {
  const reviews = JSON.parse(localStorage.getItem('fitnessReviews') || '[]');
  
  if (reviews.length < 2) {
    return null;
  }

  const current = reviews[reviews.length - 1];
  const previous = reviews[reviews.length - 2];

  return {
    weightChange: parseFloat(current.weight) - parseFloat(previous.weight),
    bodyFatChange: parseFloat(current.bodyFat) - parseFloat(previous.bodyFat),
    muscleMassChange: parseFloat(current.muscleMass) - parseFloat(previous.muscleMass),
    measurementsChange: {
      chest: parseFloat(current.measurements.chest) - parseFloat(previous.measurements.chest),
      waist: parseFloat(current.measurements.waist) - parseFloat(previous.measurements.waist),
      hips: parseFloat(current.measurements.hips) - parseFloat(previous.measurements.hips),
      arms: parseFloat(current.measurements.arms) - parseFloat(previous.measurements.arms),
      thighs: parseFloat(current.measurements.thighs) - parseFloat(previous.measurements.thighs)
    },
    daysBetween: Math.floor((new Date(current.date) - new Date(previous.date)) / (1000 * 60 * 60 * 24))
  };
};
