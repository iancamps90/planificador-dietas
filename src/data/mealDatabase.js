// src/data/mealDatabase.js

/**
 * Base de datos de comidas y recetas
 * 
 * Conceptos que aprenderás:
 * 1. Data modeling: Cómo estructurar datos complejos
 * 2. Separation of concerns: Separar datos de la lógica
 * 3. JSON structure: Organizar información de manera eficiente
 */

export const mealDatabase = {
  // Desayunos - Comidas ligeras y energéticas
  breakfast: [
    {
      id: 1,
      name: "Avena con Frutas",
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 8,
      prepTime: 10,
      ingredients: ["Avena", "Plátano", "Fresas", "Leche", "Miel"],
      instructions: "Cocinar avena, añadir frutas y miel",
      difficulty: "Fácil",
      tags: ["vegetariano", "alto-fibra", "energético"],
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Tostadas con Aguacate",
      calories: 280,
      protein: 10,
      carbs: 35,
      fat: 12,
      prepTime: 5,
      ingredients: ["Pan integral", "Aguacate", "Tomate", "Aceite de oliva", "Sal"],
      instructions: "Tostar pan, aplastar aguacate, añadir tomate y condimentos",
      difficulty: "Fácil",
      tags: ["vegetariano", "grasas-saludables", "rápido"],
      image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Smoothie de Proteína",
      calories: 250,
      protein: 20,
      carbs: 25,
      fat: 6,
      prepTime: 5,
      ingredients: ["Plátano (150g)", "Proteína en polvo (30g)", "Leche (200ml)", "Espinacas (50g)", "Miel (15g)"],
      instructions: "Licuar todos los ingredientes hasta obtener consistencia suave",
      difficulty: "Muy Fácil",
      tags: ["proteína", "rápido", "verde"]
    },
    {
      id: 13,
      name: "Huevos Revueltos con Espinacas",
      calories: 350,
      protein: 22,
      carbs: 8,
      fat: 28,
      prepTime: 8,
      ingredients: ["Huevos (3 unidades)", "Espinacas (100g)", "Queso feta (50g)", "Aceite de oliva (10ml)", "Sal (al gusto)", "Pimienta (al gusto)"],
      instructions: "Batir huevos, saltear espinacas, mezclar y cocinar a fuego lento",
      difficulty: "Fácil",
      tags: ["alto-proteína", "bajo-carbohidratos", "rico-en-hierro"]
    },
    {
      id: 14,
      name: "Pancakes de Avena y Plátano",
      calories: 420,
      protein: 15,
      carbs: 65,
      fat: 12,
      prepTime: 15,
      ingredients: ["Avena (60g)", "Plátano (1 unidad)", "Huevo (1 unidad)", "Leche (100ml)", "Canela (5g)", "Miel (20g)"],
      instructions: "Triturar avena, mezclar con plátano y huevo, cocinar en sartén",
      difficulty: "Medio",
      tags: ["sin-gluten", "alto-fibra", "energético"]
    },
    {
      id: 15,
      name: "Bowl de Acai con Granola",
      calories: 380,
      protein: 8,
      carbs: 55,
      fat: 15,
      prepTime: 5,
      ingredients: ["Acai", "Granola", "Frutas del bosque", "Coco rallado", "Miel"],
      instructions: "Mezclar acai con frutas, añadir granola y coco por encima",
      difficulty: "Muy Fácil",
      tags: ["antioxidantes", "superfood", "sin-cocción"]
    },
    {
      id: 16,
      name: "Tortilla de Verduras",
      calories: 290,
      protein: 18,
      carbs: 12,
      fat: 20,
      prepTime: 12,
      ingredients: ["Huevos", "Pimiento", "Cebolla", "Champiñones", "Queso", "Aceite"],
      instructions: "Saltear verduras, batir huevos, mezclar y cocinar en sartén",
      difficulty: "Fácil",
      tags: ["vegetariano", "alto-proteína", "rico-en-vitaminas"]
    }
  ],

  // Almuerzos - Comidas balanceadas
  lunch: [
    {
      id: 4,
      name: "Ensalada de Quinoa",
      calories: 450,
      protein: 18,
      carbs: 55,
      fat: 15,
      prepTime: 20,
      ingredients: ["Quinoa", "Garbanzos", "Tomate", "Pepino", "Aceite de oliva"],
      instructions: "Cocinar quinoa, mezclar con verduras y aliño",
      difficulty: "Medio",
      tags: ["vegetariano", "proteína-vegetal", "completo"]
    },
    {
      id: 5,
      name: "Pollo a la Plancha con Arroz",
      calories: 520,
      protein: 35,
      carbs: 45,
      fat: 18,
      prepTime: 25,
      ingredients: ["Pechuga de pollo", "Arroz integral", "Brócoli", "Aceite", "Especias"],
      instructions: "Cocinar pollo a la plancha, hervir arroz, saltear brócoli",
      difficulty: "Medio",
      tags: ["proteína", "carbohidratos", "equilibrado"]
    },
    {
      id: 6,
      name: "Salmón con Verduras",
      calories: 480,
      protein: 32,
      carbs: 20,
      fat: 28,
      prepTime: 30,
      ingredients: ["Salmón", "Espárragos", "Zanahoria", "Aceite de oliva", "Limón"],
      instructions: "Hornear salmón, asar verduras con aceite y limón",
      difficulty: "Medio",
      tags: ["omega-3", "proteína", "antiinflamatorio"]
    },
    {
      id: 17,
      name: "Bowl de Poke con Atún",
      calories: 580,
      protein: 42,
      carbs: 35,
      fat: 28,
      prepTime: 15,
      ingredients: ["Atún fresco", "Arroz", "Aguacate", "Algas", "Sésamo", "Salsa de soja"],
      instructions: "Cortar atún en cubos, servir sobre arroz con verduras y aliño",
      difficulty: "Fácil",
      tags: ["alto-proteína", "omega-3", "bajo-carbohidratos"]
    },
    {
      id: 18,
      name: "Curry de Garbanzos",
      calories: 420,
      protein: 20,
      carbs: 65,
      fat: 12,
      prepTime: 25,
      ingredients: ["Garbanzos", "Leche de coco", "Curry", "Cebolla", "Tomate", "Arroz"],
      instructions: "Cocinar garbanzos en leche de coco con curry y verduras",
      difficulty: "Medio",
      tags: ["vegetariano", "alto-fibra", "antiinflamatorio"]
    },
    {
      id: 19,
      name: "Pasta Integral con Pollo",
      calories: 650,
      protein: 38,
      carbs: 75,
      fat: 18,
      prepTime: 20,
      ingredients: ["Pasta integral", "Pechuga de pollo", "Tomate", "Albahaca", "Queso parmesano"],
      instructions: "Cocinar pasta, saltear pollo, mezclar con salsa de tomate",
      difficulty: "Fácil",
      tags: ["carbohidratos", "proteína", "italiano"]
    },
    {
      id: 20,
      name: "Ensalada César con Pollo",
      calories: 480,
      protein: 35,
      carbs: 15,
      fat: 32,
      prepTime: 15,
      ingredients: ["Lechuga", "Pollo", "Parmesano", "Crutones", "Salsa césar"],
      instructions: "Mezclar lechuga con pollo, añadir parmesano y crutones",
      difficulty: "Fácil",
      tags: ["bajo-carbohidratos", "alto-proteína", "rápido"]
    }
  ],

  // Cenas - Comidas ligeras
  dinner: [
    {
      id: 7,
      name: "Sopa de Verduras",
      calories: 180,
      protein: 8,
      carbs: 25,
      fat: 5,
      prepTime: 15,
      ingredients: ["Calabacín", "Zanahoria", "Cebolla", "Caldo vegetal", "Hierbas"],
      instructions: "Cocer verduras en caldo, triturar y condimentar",
      difficulty: "Fácil",
      tags: ["bajo-calorías", "hidratante", "verduras"]
    },
    {
      id: 8,
      name: "Tortilla de Espinacas",
      calories: 220,
      protein: 16,
      carbs: 8,
      fat: 14,
      prepTime: 12,
      ingredients: ["Huevos", "Espinacas", "Queso feta", "Aceite", "Sal"],
      instructions: "Batir huevos, añadir espinacas y queso, cocinar en sartén",
      difficulty: "Fácil",
      tags: ["proteína", "hierro", "rápido"]
    },
    {
      id: 9,
      name: "Pescado Blanco al Vapor",
      calories: 200,
      protein: 28,
      carbs: 5,
      fat: 8,
      prepTime: 20,
      ingredients: ["Merluza", "Limón", "Eneldo", "Sal", "Pimienta"],
      instructions: "Cocer pescado al vapor con hierbas y limón",
      difficulty: "Medio",
      tags: ["bajo-calorías", "proteína", "digestivo"]
    }
  ],

  // Snacks - Aperitivos saludables
  snacks: [
    {
      id: 10,
      name: "Yogurt Griego con Nuez",
      calories: 150,
      protein: 12,
      carbs: 8,
      fat: 8,
      prepTime: 2,
      ingredients: ["Yogurt griego", "Nueces", "Miel"],
      instructions: "Mezclar yogurt con nueces picadas y miel",
      difficulty: "Muy Fácil",
      tags: ["proteína", "grasas-saludables", "rápido"]
    },
    {
      id: 11,
      name: "Manzana con Mantequilla de Almendras",
      calories: 180,
      protein: 6,
      carbs: 25,
      fat: 9,
      prepTime: 2,
      ingredients: ["Manzana", "Mantequilla de almendras"],
      instructions: "Cortar manzana en rodajas y untar con mantequilla de almendras",
      difficulty: "Muy Fácil",
      tags: ["fibra", "grasas-saludables", "portátil"]
    },
    {
      id: 12,
      name: "Hummus con Zanahoria",
      calories: 120,
      protein: 5,
      carbs: 15,
      fat: 5,
      prepTime: 3,
      ingredients: ["Hummus", "Zanahorias", "Pepino"],
      instructions: "Cortar verduras en bastones y servir con hummus",
      difficulty: "Muy Fácil",
      tags: ["vegetariano", "fibra", "vitaminas"]
    }
  ]
};

/**
 * Función para obtener comidas por categoría y criterios
 * @param {string} category - Categoría de comida (breakfast, lunch, dinner, snacks)
 * @param {number} maxCalories - Máximo de calorías por comida
 * @param {Array} excludeTags - Tags a excluir
 * @returns {Array} Array de comidas filtradas
 */
export const getMealsByCategory = (category, maxCalories = 1000, excludeTags = []) => {
  const meals = mealDatabase[category] || [];
  
  return meals.filter(meal => {
    // Filtrar por calorías máximas
    if (meal.calories > maxCalories) return false;
    
    // Excluir comidas con tags específicos
    if (excludeTags.some(tag => meal.tags.includes(tag))) return false;
    
    return true;
  });
};

/**
 * Función para obtener una comida aleatoria de una categoría
 * @param {string} category - Categoría de comida
 * @param {number} maxCalories - Máximo de calorías
 * @returns {Object} Comida aleatoria
 */
export const getRandomMeal = (category, maxCalories = 1000) => {
  const meals = getMealsByCategory(category, maxCalories);
  if (meals.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * meals.length);
  return meals[randomIndex];
};

/**
 * Función para calcular calorías totales de un día
 * @param {Array} meals - Array de comidas del día
 * @returns {number} Calorías totales
 */
export const calculateDailyCalories = (meals) => {
  if (!meals || meals.length === 0) return 0;
  
  const total = meals.reduce((sum, meal) => {
    return sum + (meal.calories || 0);
  }, 0);
  
  console.log(`🧮 Calculando total: ${meals.map(m => m.calories).join(' + ')} = ${total} kcal`);
  return total;
};

/**
 * Función para generar un día completo de comidas con distribución inteligente
 * @param {number} targetCalories - Calorías objetivo del día
 * @returns {Object} Plan de comidas para un día
 */
// URLs de fotos para las comidas
const mealImages = {
  breakfast: [
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop", // Avena
    "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop", // Aguacate
    "https://images.unsplash.com/photo-1553530979-4c0c4c5e8b5b?w=400&h=300&fit=crop", // Smoothie
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop", // Pancakes
    "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop"  // Yogur
  ],
  lunch: [
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop", // Pollo
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop", // Curry
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop", // Ensalada
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", // Pasta
    "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop"  // Pizza
  ],
  dinner: [
    "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop", // Sopa
    "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop", // Tortilla
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop", // Pescado
    "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop", // Salmón
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop"  // Vegetales
  ],
  snacks: [
    "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop", // Frutos secos
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", // Yogur griego
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop", // Hummus
    "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop", // Barrita
    "https://images.unsplash.com/photo-1546554137-f86b9593a222?w=400&h=300&fit=crop"  // Fruta
  ]
};

// Función para asignar imagen específica según el nombre de la comida
const assignMealImage = (meal, mealType) => {
  if (!meal || !mealType) return meal;
  
  const mealName = meal.name.toLowerCase();
  
  // Mapeo específico de comidas a imágenes
  const specificImages = {
    // Desayunos
    'smoothie': "https://images.unsplash.com/photo-1553530979-4c0c4c5e8b5b?w=400&h=300&fit=crop",
    'avena': "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    'pancakes': "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
    'huevos': "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
    'yogur': "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
    'tostadas': "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop",
    
    // Almuerzos
    'pollo': "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
    'curry': "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    'ensalada': "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
    'pasta': "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    'arroz': "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
    'quinoa': "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
    
    // Cenas
    'sopa': "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop",
    'tortilla': "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
    'pescado': "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    'salmón': "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop",
    'vegetales': "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    'atún': "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
    
    // Snacks
    'frutos': "https://images.unsplash.com/photo-1553530979-4c0c4c5e8b5b?w=400&h=300&fit=crop",
    'yogur griego': "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
    'barritas': "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop"
  };
  
  // Buscar imagen específica
  for (const [keyword, imageUrl] of Object.entries(specificImages)) {
    if (mealName.includes(keyword)) {
      return {
        ...meal,
        image: imageUrl
      };
    }
  }
  
  // Si no encuentra coincidencia, usar imagen aleatoria del tipo
  const images = mealImages[mealType];
  if (images && images.length > 0) {
    const randomIndex = Math.floor(Math.random() * images.length);
    return {
      ...meal,
      image: images[randomIndex]
    };
  }
  
  return meal;
};

// Función para calcular calorías totales de un día (ya exportada arriba)

// Función para ajustar calorías de una comida según el objetivo
const adjustMealCalories = (meal, targetMealCalories, mealType) => {
  if (!meal) return meal;
  
  console.log(`🔧 Ajustando ${mealType}: ${meal.calories} → ${targetMealCalories} kcal`);
  
  // Si las calorías objetivo son muy bajas, usar las originales
  if (targetMealCalories < 50) {
    return meal;
  }
  
  // Calcular multiplicador para ajustar las calorías
  const multiplier = targetMealCalories / meal.calories;
  
  // Ajustar proporcionalmente
  const adjustedMeal = {
    ...meal,
    calories: Math.round(targetMealCalories),
    protein: Math.round(meal.protein * multiplier),
    carbs: Math.round(meal.carbs * multiplier),
    fat: Math.round(meal.fat * multiplier)
  };
  
  console.log(`✅ ${mealType} ajustado: ${adjustedMeal.calories} kcal`);
  return adjustedMeal;
};

export const generateDailyMealPlan = (targetCalories) => {
  // Distribución inteligente basada en calorías objetivo
  let breakfastCalories, lunchCalories, dinnerCalories, snackCalories;
  
  if (targetCalories <= 1500) {
    // Plan bajo en calorías - más comidas pequeñas
    breakfastCalories = targetCalories * 0.25; // 25%
    lunchCalories = targetCalories * 0.35;     // 35%
    dinnerCalories = targetCalories * 0.30;    // 30%
    snackCalories = targetCalories * 0.10;     // 10%
  } else if (targetCalories <= 2500) {
    // Plan moderado - distribución equilibrada
    breakfastCalories = targetCalories * 0.30; // 30%
    lunchCalories = targetCalories * 0.40;     // 40%
    dinnerCalories = targetCalories * 0.25;    // 25%
    snackCalories = targetCalories * 0.05;     // 5%
  } else {
    // Plan alto en calorías - comidas más grandes
    breakfastCalories = targetCalories * 0.25; // 25%
    lunchCalories = targetCalories * 0.45;     // 45%
    dinnerCalories = targetCalories * 0.25;    // 25%
    snackCalories = targetCalories * 0.05;     // 5%
  }

  console.log(`🎯 Generando plan para ${targetCalories} calorías`);
  console.log(`📊 Distribución: Desayuno ${breakfastCalories.toFixed(0)}kcal, Almuerzo ${lunchCalories.toFixed(0)}kcal, Cena ${dinnerCalories.toFixed(0)}kcal, Snack ${snackCalories.toFixed(0)}kcal`);

  // Obtener comidas base y ajustar directamente a las calorías objetivo
  const breakfast = assignMealImage(adjustMealCalories(getRandomMeal('breakfast', breakfastCalories), breakfastCalories, 'breakfast'), 'breakfast');
  const lunch = assignMealImage(adjustMealCalories(getRandomMeal('lunch', lunchCalories), lunchCalories, 'lunch'), 'lunch');
  const dinner = assignMealImage(adjustMealCalories(getRandomMeal('dinner', dinnerCalories), dinnerCalories, 'dinner'), 'dinner');
  
  // Snack opcional solo si hay calorías suficientes
  let snack = null;
  if (snackCalories >= 100) {
    snack = assignMealImage(adjustMealCalories(getRandomMeal('snacks', snackCalories), snackCalories, 'snacks'), 'snacks');
  }

  // Calcular calorías reales
  const meals = [breakfast, lunch, dinner, snack].filter(meal => meal !== null);
  const totalCalories = calculateDailyCalories(meals);

  console.log(`✅ Total calculado: ${totalCalories} kcal (Objetivo: ${targetCalories} kcal)`);
  console.log(`📈 Diferencia: ${totalCalories - targetCalories} kcal`);

  return {
    breakfast,
    lunch,
    dinner,
    snack,
    totalCalories,
    targetCalories,
    calorieDifference: totalCalories - targetCalories
  };
};
