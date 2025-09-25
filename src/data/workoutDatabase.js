// src/data/workoutDatabase.js

/**
 * Base de datos de ejercicios y rutinas
 * 
 * Conceptos que aprenderás:
 * 1. Hierarchical data structure: Estructura de datos jerárquica
 * 2. Exercise progression: Sistema de progresión de ejercicios
 * 3. Muscle group targeting: Segmentación por grupos musculares
 * 4. Difficulty scaling: Escalado de dificultad
 */

export const workoutDatabase = {
  // Ejercicios de Fuerza - Principiante
  strengthBeginner: [
    {
      id: 1,
      name: "Flexiones de Rodillas",
      muscleGroups: ["Pecho", "Tríceps", "Hombros"],
      difficulty: "Principiante",
      type: "Fuerza",
      equipment: "Solo cuerpo",
      duration: "30 segundos",
      reps: "8-12",
      sets: "3",
      rest: "60 segundos",
      instructions: "Apoya las rodillas en el suelo, mantén el cuerpo recto y baja el pecho hacia el suelo",
      tips: ["Mantén el core activado", "Respira al subir"],
      progression: "Flexiones tradicionales",
      calories: 8,
      tags: ["en-casa", "principiante", "fuerza"]
    },
    {
      id: 2,
      name: "Sentadillas",
      muscleGroups: ["Cuádriceps", "Glúteos", "Core"],
      difficulty: "Principiante",
      type: "Fuerza",
      equipment: "Solo cuerpo",
      duration: "45 segundos",
      reps: "12-15",
      sets: "3",
      rest: "45 segundos",
      instructions: "Pies separados al ancho de los hombros, baja como si te sentaras en una silla",
      tips: ["Mantén las rodillas alineadas con los pies", "Pecho erguido"],
      progression: "Sentadillas con salto",
      calories: 12,
      tags: ["en-casa", "principiante", "fuerza"]
    },
    {
      id: 3,
      name: "Plancha",
      muscleGroups: ["Core", "Hombros"],
      difficulty: "Principiante",
      type: "Fuerza",
      equipment: "Solo cuerpo",
      duration: "30 segundos",
      reps: "1",
      sets: "3",
      rest: "60 segundos",
      instructions: "Apoya antebrazos y dedos de los pies, mantén el cuerpo recto",
      tips: ["No arquees la espalda", "Mira al suelo"],
      progression: "Plancha lateral",
      calories: 6,
      tags: ["en-casa", "principiante", "core"]
    }
  ],

  // Ejercicios de Fuerza - Intermedio
  strengthIntermediate: [
    {
      id: 4,
      name: "Flexiones Tradicionales",
      muscleGroups: ["Pecho", "Tríceps", "Hombros"],
      difficulty: "Intermedio",
      type: "Fuerza",
      equipment: "Solo cuerpo",
      duration: "45 segundos",
      reps: "10-15",
      sets: "3",
      rest: "45 segundos",
      instructions: "Posición de plancha, baja el pecho hacia el suelo y empuja hacia arriba",
      tips: ["Mantén el cuerpo recto", "Core activado"],
      progression: "Flexiones con palmada",
      calories: 15,
      tags: ["en-casa", "intermedio", "fuerza"]
    },
    {
      id: 5,
      name: "Sentadillas con Salto",
      muscleGroups: ["Cuádriceps", "Glúteos", "Pantorrillas"],
      difficulty: "Intermedio",
      type: "Fuerza",
      equipment: "Solo cuerpo",
      duration: "30 segundos",
      reps: "8-10",
      sets: "3",
      rest: "60 segundos",
      instructions: "Sentadilla tradicional seguida de un salto explosivo",
      tips: ["Aterriza suavemente", "Mantén el equilibrio"],
      progression: "Sentadillas pistol",
      calories: 18,
      tags: ["en-casa", "intermedio", "explosivo"]
    },
    {
      id: 6,
      name: "Burpees",
      muscleGroups: ["Todo el cuerpo"],
      difficulty: "Intermedio",
      type: "Fuerza",
      equipment: "Solo cuerpo",
      duration: "60 segundos",
      reps: "5-8",
      sets: "3",
      rest: "90 segundos",
      instructions: "Flexión, salto hacia atrás, flexión, salto hacia adelante, salto vertical",
      tips: ["Mantén el ritmo constante", "Respira profundamente"],
      progression: "Burpees con salto de caja",
      calories: 25,
      tags: ["en-casa", "intermedio", "cardio-fuerza"]
    }
  ],

  // Ejercicios de Fuerza - Avanzado
  strengthAdvanced: [
    {
      id: 7,
      name: "Flexiones con Palmada",
      muscleGroups: ["Pecho", "Tríceps", "Hombros"],
      difficulty: "Avanzado",
      type: "Fuerza",
      equipment: "Solo cuerpo",
      duration: "30 segundos",
      reps: "5-8",
      sets: "3",
      rest: "90 segundos",
      instructions: "Flexión explosiva con palmada en el aire",
      tips: ["Requiere mucha fuerza", "Aterriza suavemente"],
      progression: "Flexiones con una mano",
      calories: 20,
      tags: ["en-casa", "avanzado", "explosivo"]
    },
    {
      id: 8,
      name: "Sentadillas Pistol",
      muscleGroups: ["Cuádriceps", "Glúteos", "Core"],
      difficulty: "Avanzado",
      type: "Fuerza",
      equipment: "Solo cuerpo",
      duration: "45 segundos",
      reps: "3-5 por pierna",
      sets: "3",
      rest: "90 segundos",
      instructions: "Sentadilla con una sola pierna extendida",
      tips: ["Requiere equilibrio y fuerza", "Empieza con apoyo"],
      progression: "Sentadillas pistol con salto",
      calories: 22,
      tags: ["en-casa", "avanzado", "equilibrio"]
    }
  ],

  // Ejercicios de Cardio
  cardio: [
    {
      id: 9,
      name: "Jumping Jacks",
      muscleGroups: ["Todo el cuerpo"],
      difficulty: "Principiante",
      type: "Cardio",
      equipment: "Solo cuerpo",
      duration: "60 segundos",
      reps: "Continuo",
      sets: "3",
      rest: "30 segundos",
      instructions: "Salta separando piernas y brazos simultáneamente",
      tips: ["Mantén el ritmo constante", "Respira profundamente"],
      progression: "Jumping Jacks con sentadilla",
      calories: 15,
      tags: ["en-casa", "cardio", "principiante"]
    },
    {
      id: 10,
      name: "Mountain Climbers",
      muscleGroups: ["Core", "Hombros", "Piernas"],
      difficulty: "Intermedio",
      type: "Cardio",
      equipment: "Solo cuerpo",
      duration: "45 segundos",
      reps: "Continuo",
      sets: "3",
      rest: "45 segundos",
      instructions: "Posición de plancha, alterna llevando rodillas al pecho",
      tips: ["Mantén el core activado", "Ritmo constante"],
      progression: "Mountain climbers con salto",
      calories: 20,
      tags: ["en-casa", "cardio", "intermedio"]
    },
    {
      id: 11,
      name: "High Knees",
      muscleGroups: ["Piernas", "Core"],
      difficulty: "Principiante",
      type: "Cardio",
      equipment: "Solo cuerpo",
      duration: "60 segundos",
      reps: "Continuo",
      sets: "3",
      rest: "30 segundos",
      instructions: "Corre en el lugar levantando rodillas al pecho",
      tips: ["Mantén el ritmo alto", "Brazos activos"],
      progression: "High knees con salto",
      calories: 18,
      tags: ["en-casa", "cardio", "principiante"]
    }
  ],

  // Ejercicios de Flexibilidad
  flexibility: [
    {
      id: 12,
      name: "Estiramiento de Cuádriceps",
      muscleGroups: ["Cuádriceps"],
      difficulty: "Principiante",
      type: "Flexibilidad",
      equipment: "Solo cuerpo",
      duration: "30 segundos",
      reps: "1 por pierna",
      sets: "2",
      rest: "0 segundos",
      instructions: "De pie, lleva el talón al glúteo sujetando con la mano",
      tips: ["Mantén el equilibrio", "No fuerces el estiramiento"],
      progression: "Estiramiento de cuádriceps en el suelo",
      calories: 2,
      tags: ["en-casa", "flexibilidad", "estiramiento"]
    },
    {
      id: 13,
      name: "Gato-Vaca",
      muscleGroups: ["Espalda", "Core"],
      difficulty: "Principiante",
      type: "Flexibilidad",
      equipment: "Solo cuerpo",
      duration: "60 segundos",
      reps: "10-15",
      sets: "2",
      rest: "30 segundos",
      instructions: "En cuatro patas, arquea y redondea la espalda alternadamente",
      tips: ["Movimiento lento y controlado", "Respira con el movimiento"],
      progression: "Gato-vaca con estiramiento lateral",
      calories: 3,
      tags: ["en-casa", "flexibilidad", "espalda"]
    }
  ]
};

/**
 * Función para obtener ejercicios por nivel de dificultad
 * @param {string} level - Nivel de dificultad (Principiante, Intermedio, Avanzado)
 * @param {string} type - Tipo de ejercicio (Fuerza, Cardio, Flexibilidad)
 * @returns {Array} Array de ejercicios filtrados
 */
export const getExercisesByLevel = (level, type = null) => {
  const exercises = [];
  
  Object.values(workoutDatabase).forEach(category => {
    if (Array.isArray(category)) {
      category.forEach(exercise => {
        if (exercise.difficulty === level && (!type || exercise.type === type)) {
          exercises.push(exercise);
        }
      });
    }
  });
  
  return exercises;
};

/**
 * Función para obtener ejercicios por grupo muscular
 * @param {string} muscleGroup - Grupo muscular específico
 * @returns {Array} Array de ejercicios que trabajan ese grupo muscular
 */
export const getExercisesByMuscleGroup = (muscleGroup) => {
  const exercises = [];
  
  Object.values(workoutDatabase).forEach(category => {
    if (Array.isArray(category)) {
      category.forEach(exercise => {
        if (exercise.muscleGroups.includes(muscleGroup)) {
          exercises.push(exercise);
        }
      });
    }
  });
  
  return exercises;
};

/**
 * Función para obtener un ejercicio aleatorio de una categoría
 * @param {string} level - Nivel de dificultad
 * @param {string} type - Tipo de ejercicio
 * @returns {Object} Ejercicio aleatorio
 */
export const getRandomExercise = (level, type) => {
  const exercises = getExercisesByLevel(level, type);
  if (exercises.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * exercises.length);
  return exercises[randomIndex];
};

/**
 * Función para generar una rutina diaria
 * @param {string} level - Nivel de dificultad
 * @param {number} duration - Duración en minutos
 * @returns {Object} Rutina diaria
 */
export const generateDailyWorkout = (level, duration = 30) => {
  const workout = {
    exercises: [],
    totalDuration: 0,
    totalCalories: 0,
    level: level
  };

  // Distribución de ejercicios según duración
  const strengthTime = Math.floor(duration * 0.6); // 60% fuerza
  const cardioTime = Math.floor(duration * 0.3);   // 30% cardio
  const flexibilityTime = Math.floor(duration * 0.1); // 10% flexibilidad

  // Añadir ejercicios de fuerza
  for (let i = 0; i < Math.floor(strengthTime / 5); i++) {
    const exercise = getRandomExercise(level, 'Fuerza');
    if (exercise) {
      workout.exercises.push(exercise);
      workout.totalCalories += exercise.calories;
    }
  }

  // Añadir ejercicios de cardio
  for (let i = 0; i < Math.floor(cardioTime / 3); i++) {
    const exercise = getRandomExercise(level, 'Cardio');
    if (exercise) {
      workout.exercises.push(exercise);
      workout.totalCalories += exercise.calories;
    }
  }

  // Añadir ejercicios de flexibilidad
  for (let i = 0; i < Math.floor(flexibilityTime / 2); i++) {
    const exercise = getRandomExercise(level, 'Flexibilidad');
    if (exercise) {
      workout.exercises.push(exercise);
      workout.totalCalories += exercise.calories;
    }
  }

  workout.totalDuration = duration;
  return workout;
};

/**
 * Función para generar plan semanal de entrenamiento
 * @param {string} level - Nivel de dificultad
 * @param {number} daysPerWeek - Días de entrenamiento por semana
 * @returns {Object} Plan semanal
 */
export const generateWeeklyWorkoutPlan = (level, daysPerWeek = 3) => {
  const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const plan = {};

  // Distribuir días de entrenamiento
  const workoutDays = [];
  for (let i = 0; i < daysPerWeek; i++) {
    const dayIndex = Math.floor((i * 7) / daysPerWeek);
    workoutDays.push(weekDays[dayIndex]);
  }

  // Generar rutina para cada día de entrenamiento
  workoutDays.forEach(day => {
    plan[day] = generateDailyWorkout(level, 45); // 45 minutos por sesión
  });

  // Añadir días de descanso
  weekDays.forEach(day => {
    if (!plan[day]) {
      plan[day] = {
        type: 'Descanso',
        description: 'Día de recuperación activa o descanso completo',
        exercises: [],
        totalDuration: 0,
        totalCalories: 0
      };
    }
  });

  return plan;
};
