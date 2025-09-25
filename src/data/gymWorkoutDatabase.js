// src/data/gymWorkoutDatabase.js

/**
 * Base de datos de ejercicios de GYM profesionales
 * 
 * Conceptos que aprenderás:
 * 1. Professional workout programming: Programación de entrenamientos profesionales
 * 2. Muscle group specialization: Especialización por grupos musculares
 * 3. Progressive overload: Principio de sobrecarga progresiva
 * 4. Periodization: Periodización de entrenamientos
 */

// URLs de fotos específicas para ejercicios de gym
const exerciseImages = {
  chest: [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", // Press banca
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c1?w=400&h=300&fit=crop", // Press inclinado
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", // Aperturas
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c1?w=400&h=300&fit=crop"  // Fondos
  ],
  back: [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", // Dominadas
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c1?w=400&h=300&fit=crop", // Remo
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", // Jalones
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c1?w=400&h=300&fit=crop"  // Hiperextensiones
  ],
  shoulders: [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", // Press militar
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c1?w=400&h=300&fit=crop", // Elevaciones
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", // Remo al cuello
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c1?w=400&h=300&fit=crop"  // Face pulls
  ],
  legs: [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", // Sentadillas
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c1?w=400&h=300&fit=crop", // Peso muerto
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", // Prensa
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c1?w=400&h=300&fit=crop"  // Zancadas
  ],
  arms: [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", // Curl bíceps
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c1?w=400&h=300&fit=crop", // Extensión tríceps
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", // Martillo
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c1?w=400&h=300&fit=crop"  // Fondos tríceps
  ]
};

// Mapeo específico de ejercicios a imágenes más precisas
const specificExerciseImages = {
  // PECHO
  'press de banca': "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
  'press inclinado': "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c1?w=400&h=300&fit=crop",
  'aperturas': "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
  'fondos': "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c1?w=400&h=300&fit=crop",
  
  // ESPALDA
  'dominadas': "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
  'remo': "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c1?w=400&h=300&fit=crop",
  'jalón': "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
  'peso muerto': "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c1?w=400&h=300&fit=crop",
  
  // HOMBROS
  'press militar': "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
  'elevaciones': "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c1?w=400&h=300&fit=crop",
  'remo al cuello': "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
  'face pulls': "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c1?w=400&h=300&fit=crop",
  
  // PIERNAS
  'sentadilla': "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
  'prensa': "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c1?w=400&h=300&fit=crop",
  'zancadas': "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
  'gemelos': "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c1?w=400&h=300&fit=crop",
  
  // BRAZOS
  'curl': "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
  'extensión': "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c1?w=400&h=300&fit=crop",
  'martillo': "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
  'fondos tríceps': "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c1?w=400&h=300&fit=crop"
};

// Función para asignar imagen específica a un ejercicio
const assignExerciseImage = (exercise, muscleGroup) => {
  if (!exercise) return exercise;
  
  const exerciseName = exercise.name.toLowerCase();
  
  // Buscar imagen específica primero
  for (const [keyword, imageUrl] of Object.entries(specificExerciseImages)) {
    if (exerciseName.includes(keyword)) {
      return {
        ...exercise,
        image: imageUrl
      };
    }
  }
  
  // Si no encuentra coincidencia específica, usar imagen aleatoria del grupo muscular
  const images = exerciseImages[muscleGroup];
  if (images && images.length > 0) {
    const randomIndex = Math.floor(Math.random() * images.length);
    return {
      ...exercise,
      image: images[randomIndex]
    };
  }
  
  return exercise;
};

export const gymWorkoutDatabase = {
  // Ejercicios por grupos musculares
  exercises: {
    chest: [
      {
        id: 1,
        name: "Press de Banca con Barra",
        muscleGroups: ["Pecho", "Hombros", "Tríceps"],
        difficulty: "Intermedio",
        equipment: "Barra + Banco",
        sets: "4",
        reps: "8-12",
        rest: "2-3 min",
        instructions: "Acuéstate en el banco, baja la barra al pecho y empuja hacia arriba manteniendo el core activado",
        tips: ["Mantén los pies firmes en el suelo", "No rebotes la barra en el pecho", "Contrae el pecho al final del movimiento"],
        progression: "Aumentar peso gradualmente",
        calories: 15,
        tags: ["compuesto", "fuerza", "pecho-principal"]
      },
      {
        id: 2,
        name: "Press Inclinado con Mancuernas",
        muscleGroups: ["Pecho Superior", "Hombros"],
        difficulty: "Intermedio",
        equipment: "Mancuernas + Banco Inclinado",
        sets: "3",
        reps: "10-12",
        rest: "90 seg",
        instructions: "Banco a 30-45°, presiona las mancuernas hacia arriba y afuera",
        tips: ["Controla el descenso", "Siente la contracción en el pecho superior"],
        progression: "Aumentar peso o inclinación",
        calories: 12,
        tags: ["compuesto", "pecho-superior", "fuerza"]
      },
      {
        id: 3,
        name: "Aperturas con Mancuernas",
        muscleGroups: ["Pecho"],
        difficulty: "Principiante",
        equipment: "Mancuernas + Banco",
        sets: "3",
        reps: "12-15",
        rest: "60 seg",
        instructions: "Brazos ligeramente flexionados, abre y cierra las mancuernas en arco",
        tips: ["Mantén tensión constante", "No estires completamente los brazos"],
        progression: "Aumentar peso gradualmente",
        calories: 8,
        tags: ["aislado", "pecho", "definición"]
      }
    ],
    
    back: [
      {
        id: 4,
        name: "Dominadas",
        muscleGroups: ["Dorsales", "Bíceps", "Hombros"],
        difficulty: "Avanzado",
        equipment: "Barra de Dominadas",
        sets: "4",
        reps: "6-12",
        rest: "2-3 min",
        instructions: "Cuelga de la barra, tira hacia arriba hasta que el mentón pase la barra",
        tips: ["Engancha los dorsales primero", "Mantén el core activado", "Controla el descenso"],
        progression: "Aumentar repeticiones o añadir peso",
        calories: 18,
        tags: ["compuesto", "peso-corporal", "dorsales-principal"]
      },
      {
        id: 5,
        name: "Remo con Barra",
        muscleGroups: ["Dorsales", "Bíceps", "Trapecio"],
        difficulty: "Intermedio",
        equipment: "Barra + Discos",
        sets: "4",
        reps: "8-10",
        rest: "2 min",
        instructions: "Peso muerto, tira la barra hacia el abdomen manteniendo la espalda recta",
        tips: ["Mantén el pecho alto", "Tira con los codos hacia atrás", "Siente la contracción en los dorsales"],
        progression: "Aumentar peso progresivamente",
        calories: 16,
        tags: ["compuesto", "fuerza", "dorsales-principal"]
      },
      {
        id: 6,
        name: "Jalón al Pecho",
        muscleGroups: ["Dorsales", "Bíceps"],
        difficulty: "Principiante",
        equipment: "Máquina de Jalón",
        sets: "3",
        reps: "10-12",
        rest: "90 seg",
        instructions: "Tira de la barra hacia el pecho, contrayendo los dorsales",
        tips: ["No uses solo los brazos", "Mantén el torso estable", "Controla el retorno"],
        progression: "Aumentar peso o cambiar agarre",
        calories: 12,
        tags: ["máquina", "dorsales", "principiante"]
      }
    ],
    
    shoulders: [
      {
        id: 7,
        name: "Press Militar",
        muscleGroups: ["Hombros", "Tríceps", "Core"],
        difficulty: "Avanzado",
        equipment: "Barra",
        sets: "4",
        reps: "6-10",
        rest: "2-3 min",
        instructions: "Barra a la altura del pecho, presiona hacia arriba manteniendo el core activado",
        tips: ["Mantén el core tenso", "No arquees la espalda", "Controla el descenso"],
        progression: "Aumentar peso gradualmente",
        calories: 14,
        tags: ["compuesto", "fuerza", "hombros-principal"]
      },
      {
        id: 8,
        name: "Elevaciones Laterales",
        muscleGroups: ["Deltoides Lateral"],
        difficulty: "Principiante",
        equipment: "Mancuernas",
        sets: "3",
        reps: "12-15",
        rest: "60 seg",
        instructions: "Eleva las mancuernas hasta la altura de los hombros",
        tips: ["Mantén los brazos ligeramente flexionados", "No uses impulso", "Siente la contracción"],
        progression: "Aumentar peso o tiempo bajo tensión",
        calories: 6,
        tags: ["aislado", "hombros", "definición"]
      }
    ],
    
    legs: [
      {
        id: 9,
        name: "Sentadilla con Barra",
        muscleGroups: ["Cuádriceps", "Glúteos", "Core"],
        difficulty: "Avanzado",
        equipment: "Barra + Rack",
        sets: "4",
        reps: "6-10",
        rest: "3-4 min",
        instructions: "Barra en los hombros, baja hasta que los muslos estén paralelos al suelo",
        tips: ["Mantén el pecho alto", "Peso en los talones", "No dejes que las rodillas se vayan hacia adentro"],
        progression: "Aumentar peso progresivamente",
        calories: 25,
        tags: ["compuesto", "fuerza", "piernas-principal"]
      },
      {
        id: 10,
        name: "Peso Muerto",
        muscleGroups: ["Glúteos", "Isquiotibiales", "Dorsales", "Core"],
        difficulty: "Avanzado",
        equipment: "Barra + Discos",
        sets: "4",
        reps: "5-8",
        rest: "3-4 min",
        instructions: "Levanta la barra del suelo manteniendo la espalda recta",
        tips: ["Mantén la barra cerca del cuerpo", "Engancha los glúteos", "No redondees la espalda"],
        progression: "Aumentar peso gradualmente",
        calories: 28,
        tags: ["compuesto", "fuerza", "glúteos-principal"]
      },
      {
        id: 11,
        name: "Prensa de Piernas",
        muscleGroups: ["Cuádriceps", "Glúteos"],
        difficulty: "Principiante",
        equipment: "Máquina de Prensa",
        sets: "3",
        reps: "12-15",
        rest: "90 seg",
        instructions: "Empuja la plataforma con los pies separados al ancho de los hombros",
        tips: ["No bloquees las rodillas", "Mantén los pies en toda la plataforma"],
        progression: "Aumentar peso o profundidad",
        calories: 18,
        tags: ["máquina", "piernas", "principiante"]
      }
    ],
    
    arms: [
      {
        id: 12,
        name: "Curl de Bíceps con Barra",
        muscleGroups: ["Bíceps"],
        difficulty: "Principiante",
        equipment: "Barra EZ",
        sets: "3",
        reps: "10-12",
        rest: "60 seg",
        instructions: "Curl la barra hacia arriba contrayendo los bíceps",
        tips: ["No uses impulso", "Mantén los codos fijos", "Contrae al final del movimiento"],
        progression: "Aumentar peso o tiempo bajo tensión",
        calories: 8,
        tags: ["aislado", "bíceps", "definición"]
      },
      {
        id: 13,
        name: "Extensión de Tríceps",
        muscleGroups: ["Tríceps"],
        difficulty: "Principiante",
        equipment: "Mancuerna",
        sets: "3",
        reps: "10-12",
        rest: "60 seg",
        instructions: "Extiende la mancuerna hacia atrás contrayendo los tríceps",
        tips: ["Mantén el codo fijo", "Siente la contracción en el tríceps"],
        progression: "Aumentar peso o cambiar variación",
        calories: 8,
        tags: ["aislado", "tríceps", "definición"]
      }
    ]
  },

  // Rutinas profesionales fijas - NO EDITABLES
  routines: {
    weider: {
      name: "Plan 1: Rutina Weider (5 días)",
      description: "División clásica de culturismo. Un grupo muscular por día. RUTINA FIJA - NO SE PUEDE MODIFICAR",
      totalDays: 5,
      restDays: ["Sábado", "Domingo"],
      isFixed: true, // Indica que no se puede modificar
      days: {
        "Lunes": {
          name: "Pecho y Tríceps",
          exercises: [
            { exercise: "Press de Banca con Barra", sets: 4, reps: "8-12" },
            { exercise: "Press Inclinado con Mancuernas", sets: 3, reps: "10-12" },
            { exercise: "Aperturas con Mancuernas", sets: 3, reps: "12-15" },
            { exercise: "Extensión de Tríceps", sets: 3, reps: "10-12" },
            { exercise: "Fondos en Paralelas", sets: 3, reps: "8-12" }
          ],
          duration: "60-75 min",
          focus: "Desarrollo del pecho y tríceps"
        },
        "Martes": {
          name: "Espalda y Bíceps",
          exercises: [
            { exercise: "Dominadas", sets: 4, reps: "6-12" },
            { exercise: "Remo con Barra", sets: 4, reps: "8-10" },
            { exercise: "Jalón al Pecho", sets: 3, reps: "10-12" },
            { exercise: "Curl de Bíceps con Barra", sets: 3, reps: "10-12" },
            { exercise: "Curl Martillo", sets: 3, reps: "10-12" }
          ],
          duration: "60-75 min",
          focus: "Desarrollo de la espalda y bíceps"
        },
        "Miércoles": {
          name: "Piernas",
          exercises: [
            { exercise: "Sentadilla con Barra", sets: 4, reps: "6-10" },
            { exercise: "Peso Muerto", sets: 4, reps: "5-8" },
            { exercise: "Prensa de Piernas", sets: 3, reps: "12-15" },
            { exercise: "Zancadas", sets: 3, reps: "10-12 cada pierna" },
            { exercise: "Gemelos de Pie", sets: 4, reps: "15-20" }
          ],
          duration: "75-90 min",
          focus: "Desarrollo completo de las piernas"
        },
        "Jueves": {
          name: "Hombros y Trapecio",
          exercises: [
            { exercise: "Press Militar", sets: 4, reps: "6-10" },
            { exercise: "Elevaciones Laterales", sets: 3, reps: "12-15" },
            { exercise: "Elevaciones Frontales", sets: 3, reps: "12-15" },
            { exercise: "Remo al Cuello", sets: 3, reps: "10-12" },
            { exercise: "Encogimientos de Hombros", sets: 4, reps: "12-15" }
          ],
          duration: "60-75 min",
          focus: "Desarrollo de hombros y trapecio"
        },
        "Viernes": {
          name: "Brazos Completo",
          exercises: [
            { exercise: "Curl de Bíceps con Barra", sets: 4, reps: "8-12" },
            { exercise: "Curl Martillo", sets: 3, reps: "10-12" },
            { exercise: "Curl Concentrado", sets: 3, reps: "10-12" },
            { exercise: "Extensión de Tríceps", sets: 4, reps: "8-12" },
            { exercise: "Press Francés", sets: 3, reps: "10-12" },
            { exercise: "Fondos en Paralelas", sets: 3, reps: "8-12" }
          ],
          duration: "60-75 min",
          focus: "Desarrollo completo de brazos"
        }
      }
    },

    pushPullLegs: {
      name: "Plan 2: Push/Pull/Legs (3 días)",
      description: "División por patrones de movimiento. RUTINA FIJA - NO SE PUEDE MODIFICAR",
      totalDays: 3,
      restDays: ["Jueves", "Viernes", "Sábado", "Domingo"],
      isFixed: true,
      days: {
        "Lunes": {
          name: "Push (Empuje)",
          exercises: [
            { exercise: "Press de Banca con Barra", sets: 4, reps: "6-10" },
            { exercise: "Press Militar", sets: 3, reps: "8-10" },
            { exercise: "Press Inclinado con Mancuernas", sets: 3, reps: "10-12" },
            { exercise: "Elevaciones Laterales", sets: 3, reps: "12-15" },
            { exercise: "Extensión de Tríceps", sets: 3, reps: "10-12" },
            { exercise: "Fondos en Paralelas", sets: 3, reps: "8-12" }
          ],
          duration: "75-90 min",
          focus: "Pecho, hombros y tríceps"
        },
        "Martes": {
          name: "Pull (Tracción)",
          exercises: [
            { exercise: "Peso Muerto", sets: 4, reps: "5-8" },
            { exercise: "Dominadas", sets: 4, reps: "6-12" },
            { exercise: "Remo con Barra", sets: 4, reps: "8-10" },
            { exercise: "Jalón al Pecho", sets: 3, reps: "10-12" },
            { exercise: "Curl de Bíceps con Barra", sets: 3, reps: "10-12" },
            { exercise: "Curl Martillo", sets: 3, reps: "10-12" }
          ],
          duration: "75-90 min",
          focus: "Espalda y bíceps"
        },
        "Miércoles": {
          name: "Legs (Piernas)",
          exercises: [
            { exercise: "Sentadilla con Barra", sets: 4, reps: "6-10" },
            { exercise: "Prensa de Piernas", sets: 3, reps: "12-15" },
            { exercise: "Zancadas", sets: 3, reps: "10-12 cada pierna" },
            { exercise: "Curl de Isquiotibiales", sets: 3, reps: "10-12" },
            { exercise: "Gemelos de Pie", sets: 4, reps: "15-20" },
            { exercise: "Gemelos Sentado", sets: 3, reps: "15-20" }
          ],
          duration: "75-90 min",
          focus: "Desarrollo completo de piernas"
        }
      }
    },

    upperLower: {
      name: "Torso/Pierna",
      description: "División simple entre tren superior e inferior",
      days: {
        "Lunes": {
          name: "Torso Superior",
          exercises: [
            { exercise: "Press de Banca con Barra", sets: 4, reps: "6-10" },
            { exercise: "Dominadas", sets: 4, reps: "6-12" },
            { exercise: "Press Militar", sets: 3, reps: "8-10" },
            { exercise: "Remo con Barra", sets: 3, reps: "8-10" },
            { exercise: "Elevaciones Laterales", sets: 3, reps: "12-15" },
            { exercise: "Curl de Bíceps con Barra", sets: 3, reps: "10-12" },
            { exercise: "Extensión de Tríceps", sets: 3, reps: "10-12" }
          ],
          duration: "90-105 min",
          focus: "Todo el tren superior"
        },
        "Martes": {
          name: "Piernas",
          exercises: [
            { exercise: "Sentadilla con Barra", sets: 4, reps: "6-10" },
            { exercise: "Peso Muerto", sets: 4, reps: "5-8" },
            { exercise: "Prensa de Piernas", sets: 3, reps: "12-15" },
            { exercise: "Zancadas", sets: 3, reps: "10-12 cada pierna" },
            { exercise: "Curl de Isquiotibiales", sets: 3, reps: "10-12" },
            { exercise: "Gemelos de Pie", sets: 4, reps: "15-20" }
          ],
          duration: "75-90 min",
          focus: "Desarrollo completo de piernas"
        }
      }
    },

    upperLower: {
      name: "Plan 3: Torso/Pierna (4 días)",
      description: "División superior/inferior. RUTINA FIJA - NO SE PUEDE MODIFICAR",
      totalDays: 4,
      restDays: ["Viernes", "Sábado", "Domingo"],
      isFixed: true,
      days: {
        "Lunes": {
          name: "Torso Superior",
          exercises: [
            { exercise: "Press de Banca con Barra", sets: 4, reps: "6-10" },
            { exercise: "Remo con Barra", sets: 4, reps: "8-10" },
            { exercise: "Press Militar", sets: 3, reps: "8-10" },
            { exercise: "Dominadas", sets: 4, reps: "6-12" },
            { exercise: "Elevaciones Laterales", sets: 3, reps: "12-15" },
            { exercise: "Curl de Bíceps con Barra", sets: 3, reps: "10-12" },
            { exercise: "Extensión de Tríceps", sets: 3, reps: "10-12" }
          ],
          duration: "75-90 min",
          focus: "Desarrollo completo del torso superior"
        },
        "Martes": {
          name: "Piernas",
          exercises: [
            { exercise: "Sentadilla con Barra", sets: 4, reps: "6-10" },
            { exercise: "Peso Muerto", sets: 4, reps: "5-8" },
            { exercise: "Prensa de Piernas", sets: 3, reps: "12-15" },
            { exercise: "Zancadas", sets: 3, reps: "10-12 cada pierna" },
            { exercise: "Curl de Isquiotibiales", sets: 3, reps: "10-12" },
            { exercise: "Gemelos de Pie", sets: 4, reps: "15-20" },
            { exercise: "Elevaciones de Gemelos Sentado", sets: 3, reps: "15-20" }
          ],
          duration: "75-90 min",
          focus: "Desarrollo completo de piernas"
        },
        "Miércoles": {
          name: "Torso Superior",
          exercises: [
            { exercise: "Press Inclinado con Mancuernas", sets: 4, reps: "8-12" },
            { exercise: "Jalón al Pecho", sets: 4, reps: "10-12" },
            { exercise: "Aperturas con Mancuernas", sets: 3, reps: "12-15" },
            { exercise: "Remo con Mancuerna", sets: 4, reps: "10-12" },
            { exercise: "Elevaciones Frontales", sets: 3, reps: "12-15" },
            { exercise: "Curl Martillo", sets: 3, reps: "10-12" },
            { exercise: "Fondos en Paralelas", sets: 3, reps: "8-12" }
          ],
          duration: "75-90 min",
          focus: "Variación del torso superior"
        },
        "Jueves": {
          name: "Piernas",
          exercises: [
            { exercise: "Sentadilla Frontal", sets: 4, reps: "8-10" },
            { exercise: "Peso Muerto Rumano", sets: 4, reps: "8-10" },
            { exercise: "Prensa Inclinada", sets: 3, reps: "12-15" },
            { exercise: "Bulgarian Split Squats", sets: 3, reps: "10-12 cada pierna" },
            { exercise: "Extensiones de Cuádriceps", sets: 3, reps: "12-15" },
            { exercise: "Peso Muerto con Piernas Rígidas", sets: 3, reps: "10-12" },
            { exercise: "Gemelos en Máquina", sets: 4, reps: "15-20" }
          ],
          duration: "75-90 min",
          focus: "Variación de piernas"
        }
      }
    }
  }
};

/**
 * Función para obtener rutina por nombre
 * @param {string} routineName - Nombre de la rutina
 * @returns {Object} Rutina completa
 */
export const getRoutineByName = (routineName) => {
  return gymWorkoutDatabase.routines[routineName];
};

/**
 * Función para obtener ejercicios por grupo muscular
 * @param {string} muscleGroup - Grupo muscular
 * @returns {Array} Ejercicios del grupo muscular
 */
export const getExercisesByMuscleGroup = (muscleGroup) => {
  return gymWorkoutDatabase.exercises[muscleGroup] || [];
};

/**
 * Función para generar rutina con imágenes
 * @param {string} routineName - Nombre de la rutina
 * @returns {Object} Rutina con ejercicios e imágenes
 */
export const generateRoutineWithImages = (routineName) => {
  const routine = getRoutineByName(routineName);
  if (!routine) return null;

  const routineWithImages = { ...routine };
  
  // Mapear grupos musculares para asignar imágenes
  const muscleGroupMap = {
    'Press de Banca': 'chest',
    'Press Inclinado': 'chest',
    'Aperturas': 'chest',
    'Fondos': 'chest',
    'Dominadas': 'back',
    'Remo': 'back',
    'Jalón': 'back',
    'Press Militar': 'shoulders',
    'Elevaciones': 'shoulders',
    'Sentadilla': 'legs',
    'Peso Muerto': 'legs',
    'Prensa': 'legs',
    'Zancadas': 'legs',
    'Curl': 'arms',
    'Extensión': 'arms'
  };

  // Procesar cada día de la rutina
  Object.keys(routineWithImages.days).forEach(day => {
    const dayPlan = routineWithImages.days[day];
    
    dayPlan.exercises = dayPlan.exercises.map(exerciseData => {
      // Buscar el ejercicio completo en la base de datos
      const exerciseName = exerciseData.exercise;
      let fullExercise = null;
      
      // Buscar en todos los grupos musculares
      Object.values(gymWorkoutDatabase.exercises).forEach(exercises => {
        const found = exercises.find(ex => ex.name === exerciseName);
        if (found) fullExercise = found;
      });

      if (fullExercise) {
        // Determinar el grupo muscular basado en el nombre del ejercicio
        let muscleGroup = 'chest'; // default
        for (const [key, value] of Object.entries(muscleGroupMap)) {
          if (exerciseName.includes(key)) {
            muscleGroup = value;
            break;
          }
        }
        
        // Asignar imagen al ejercicio
        const exerciseWithImage = assignExerciseImage(fullExercise, muscleGroup);
        
        return {
          ...exerciseData,
          ...exerciseWithImage,
          name: exerciseName
        };
      }
      
      return {
        ...exerciseData,
        name: exerciseName,
        calories: 15,
        difficulty: 'Intermedio'
      };
    });
  });

  return routineWithImages;
};

/**
 * Función para generar rutina personalizada
 * @param {string} routineType - Tipo de rutina
 * @param {number} daysPerWeek - Días por semana
 * @returns {Object} Rutina personalizada
 */
export const generateCustomRoutine = (routineType, daysPerWeek) => {
  const baseRoutine = getRoutineByName(routineType);
  if (!baseRoutine) return null;

  // Si es una rutina fija, devolver tal como está
  if (baseRoutine.isFixed) {
    return {
      ...baseRoutine,
      selectedDays: Object.keys(baseRoutine.days),
      totalDays: baseRoutine.totalDays,
      restDays: baseRoutine.restDays,
      canEdit: false // Indica que no se puede editar
    };
  }

  // Adaptar la rutina según los días disponibles (solo para rutinas no fijas)
  const availableDays = Object.keys(baseRoutine.days);
  const selectedDays = availableDays.slice(0, daysPerWeek);

  const customRoutine = {
    name: baseRoutine.name,
    description: baseRoutine.description,
    days: {}
  };

  selectedDays.forEach(day => {
    customRoutine.days[day] = baseRoutine.days[day];
  });

  return customRoutine;
};
