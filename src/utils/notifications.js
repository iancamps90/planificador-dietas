// src/utils/notifications.js

/**
 * Sistema de Notificaciones Push Inteligentes
 * 
 * Conceptos que aprenderás:
 * 1. Web Notifications API: API nativa del navegador
 * 2. Service Workers: Trabajadores de servicio
 * 3. Push notifications: Notificaciones push
 * 4. Smart reminders: Recordatorios inteligentes
 */

class NotificationManager {
  constructor() {
    this.permission = null;
    this.isSupported = 'Notification' in window;
    this.init();
  }

  /**
   * Inicializar el sistema de notificaciones
   */
  async init() {
    if (!this.isSupported) {
      console.log('Las notificaciones no están soportadas en este navegador');
      return;
    }

    this.permission = Notification.permission;
    
    if (this.permission === 'default') {
      await this.requestPermission();
    }
  }

  /**
   * Solicitar permiso para notificaciones
   */
  async requestPermission() {
    if (!this.isSupported) return false;

    try {
      this.permission = await Notification.requestPermission();
      return this.permission === 'granted';
    } catch (error) {
      console.error('Error solicitando permiso para notificaciones:', error);
      return false;
    }
  }

  /**
   * Mostrar notificación inmediata
   * @param {Object} options - Opciones de la notificación
   */
  showNotification(options) {
    if (!this.isSupported || this.permission !== 'granted') {
      console.log('Notificaciones no disponibles');
      return;
    }

    const defaultOptions = {
      icon: '/vite.svg',
      badge: '/vite.svg',
      requireInteraction: false,
      silent: false
    };

    const notification = new Notification(options.title, {
      ...defaultOptions,
      ...options
    });

    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
      notification.close();
    }, 5000);

    return notification;
  }

  /**
   * Notificación de recordatorio de comida
   * @param {string} mealType - Tipo de comida
   * @param {string} mealName - Nombre de la comida
   */
  showMealReminder(mealType, mealName) {
    const mealNames = {
      breakfast: 'Desayuno',
      lunch: 'Almuerzo',
      dinner: 'Cena',
      snack: 'Snack'
    };

    return this.showNotification({
      title: `🍽️ ${mealNames[mealType] || mealType}`,
      body: `Es hora de comer: ${mealName}`,
      tag: `meal-${mealType}`,
      requireInteraction: true
    });
  }

  /**
   * Notificación de recordatorio de ejercicio
   * @param {string} exerciseName - Nombre del ejercicio
   * @param {number} duration - Duración en minutos
   */
  showWorkoutReminder(exerciseName, duration) {
    return this.showNotification({
      title: '💪 Hora de entrenar',
      body: `${exerciseName} - ${duration} minutos`,
      tag: 'workout',
      requireInteraction: true
    });
  }

  /**
   * Notificación de logro
   * @param {string} achievement - Logro alcanzado
   */
  showAchievement(achievement) {
    return this.showNotification({
      title: '🏆 ¡Logro desbloqueado!',
      body: achievement,
      tag: 'achievement',
      icon: '🏆'
    });
  }

  /**
   * Notificación de progreso
   * @param {string} message - Mensaje de progreso
   */
  showProgress(message) {
    return this.showNotification({
      title: '📈 Tu progreso',
      body: message,
      tag: 'progress'
    });
  }

  /**
   * Programar notificación para una hora específica
   * @param {Date} date - Fecha y hora para la notificación
   * @param {Object} options - Opciones de la notificación
   */
  scheduleNotification(date, options) {
    const now = new Date();
    const timeUntilNotification = date.getTime() - now.getTime();

    if (timeUntilNotification <= 0) {
      console.log('La fecha programada ya ha pasado');
      return;
    }

    setTimeout(() => {
      this.showNotification(options);
    }, timeUntilNotification);

    return timeUntilNotification;
  }

  /**
   * Programar recordatorios de comidas
   * @param {Object} mealSchedule - Horario de comidas
   */
  scheduleMealReminders(mealSchedule) {
    const reminders = [];

    Object.entries(mealSchedule).forEach(([mealType, mealData]) => {
      if (mealData.time && mealData.meal) {
        const reminderTime = new Date();
        const [hours, minutes] = mealData.time.split(':');
        reminderTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        const reminderId = this.scheduleNotification(reminderTime, {
          title: `🍽️ ${mealData.mealType}`,
          body: `Es hora de comer: ${mealData.meal.name}`,
          tag: `meal-${mealType}`
        });

        if (reminderId) {
          reminders.push({
            id: reminderId,
            mealType,
            time: mealData.time
          });
        }
      }
    });

    return reminders;
  }

  /**
   * Programar recordatorios de ejercicios
   * @param {Object} workoutSchedule - Horario de ejercicios
   */
  scheduleWorkoutReminders(workoutSchedule) {
    const reminders = [];

    Object.entries(workoutSchedule).forEach(([day, workout]) => {
      if (workout.time && workout.exercises) {
        const reminderTime = new Date();
        const [hours, minutes] = workout.time.split(':');
        reminderTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        const reminderId = this.scheduleNotification(reminderTime, {
          title: '💪 Hora de entrenar',
          body: `Ejercicios de ${day}: ${workout.exercises.length} ejercicios`,
          tag: `workout-${day}`
        });

        if (reminderId) {
          reminders.push({
            id: reminderId,
            day,
            time: workout.time
          });
        }
      }
    });

    return reminders;
  }

  /**
   * Notificación de hidratación
   */
  scheduleHydrationReminders() {
    const reminders = [];
    
    // Recordatorio cada 2 horas desde las 8 AM hasta las 10 PM
    for (let hour = 8; hour <= 22; hour += 2) {
      const reminderTime = new Date();
      reminderTime.setHours(hour, 0, 0, 0);

      const reminderId = this.scheduleNotification(reminderTime, {
        title: '💧 ¡Hidrátate!',
        body: 'Es hora de beber agua. Mantente hidratado.',
        tag: `hydration-${hour}`
      });

      if (reminderId) {
        reminders.push({
          id: reminderId,
          hour,
          message: 'Recordatorio de hidratación'
        });
      }
    }

    return reminders;
  }

  /**
   * Limpiar todas las notificaciones programadas
   */
  clearAllReminders() {
    // En una implementación real, necesitarías guardar los IDs de los timeouts
    // y cancelarlos aquí
    console.log('Limpiando todos los recordatorios');
  }
}

// Crear instancia global
const notificationManager = new NotificationManager();

export default notificationManager;
