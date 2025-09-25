// src/data/dietaryPreferences.js

/**
 * Sistema de Preferencias Alimentarias
 * 
 * Conceptos que aprenderás:
 * 1. Dietary restrictions: Manejar restricciones alimentarias
 * 2. Filtering algorithms: Algoritmos de filtrado avanzados
 * 3. User preferences: Sistema de preferencias personalizadas
 * 4. Meal customization: Personalización de comidas
 */

export const dietaryPreferences = {
  // Tipos de dieta populares
  dietTypes: [
    {
      id: 'balanced',
      name: 'Equilibrada',
      description: 'Dieta balanceada con todos los grupos alimentarios',
      restrictions: [],
      focus: ['variedad', 'equilibrio', 'moderación'],
      color: '#4CAF50'
    },
    {
      id: 'vegetarian',
      name: 'Vegetariana',
      description: 'Sin carne ni pescado, incluye lácteos y huevos',
      restrictions: ['carne', 'pescado', 'pollo', 'cerdo', 'ternera', 'pavo'],
      focus: ['vegetales', 'legumbres', 'lácteos', 'huevos'],
      color: '#8BC34A'
    },
    {
      id: 'vegan',
      name: 'Vegana',
      description: 'Solo alimentos de origen vegetal',
      restrictions: ['carne', 'pescado', 'pollo', 'cerdo', 'ternera', 'pavo', 'huevos', 'lácteos', 'miel'],
      focus: ['vegetales', 'legumbres', 'frutos-secos', 'semillas'],
      color: '#4CAF50'
    },
    {
      id: 'keto',
      name: 'Cetogénica (Keto)',
      description: 'Alta en grasas, muy baja en carbohidratos',
      restrictions: ['arroz', 'pasta', 'pan', 'cereales', 'azúcar', 'frutas-dulces'],
      focus: ['grasas-saludables', 'proteínas', 'verduras-verdes'],
      color: '#FF9800'
    },
    {
      id: 'paleo',
      name: 'Paleo',
      description: 'Basada en alimentos que comían nuestros ancestros',
      restrictions: ['lácteos', 'cereales', 'legumbres', 'azúcar-refinada', 'alimentos-procesados'],
      focus: ['carne', 'pescado', 'vegetales', 'frutos-secos', 'semillas'],
      color: '#795548'
    },
    {
      id: 'mediterranean',
      name: 'Mediterránea',
      description: 'Rica en aceite de oliva, pescado y vegetales',
      restrictions: ['carne-roja', 'alimentos-procesados'],
      focus: ['aceite-oliva', 'pescado', 'vegetales', 'frutas', 'legumbres'],
      color: '#2196F3'
    },
    {
      id: 'low-carb',
      name: 'Baja en Carbohidratos',
      description: 'Reducción de carbohidratos, enfoque en proteínas',
      restrictions: ['arroz', 'pasta', 'pan', 'cereales', 'azúcar'],
      focus: ['proteínas', 'verduras', 'grasas-saludables'],
      color: '#FF5722'
    },
    {
      id: 'high-protein',
      name: 'Alta en Proteínas',
      description: 'Enfoque en proteínas para ganancia muscular',
      restrictions: [],
      focus: ['proteínas', 'carne', 'pescado', 'huevos', 'lácteos'],
      color: '#E91E63'
    }
  ],

  // Alergias comunes
  allergies: [
    {
      id: 'gluten',
      name: 'Gluten',
      description: 'Intolerancia al gluten',
      restrictions: ['trigo', 'cebada', 'centeno', 'avena', 'pan', 'pasta', 'cereales'],
      alternatives: ['quinoa', 'arroz', 'maíz', 'amaranto']
    },
    {
      id: 'lactose',
      name: 'Lactosa',
      description: 'Intolerancia a la lactosa',
      restrictions: ['leche', 'queso', 'yogurt', 'mantequilla', 'crema'],
      alternatives: ['leche-almendras', 'leche-coco', 'queso-vegano']
    },
    {
      id: 'nuts',
      name: 'Frutos Secos',
      description: 'Alergia a frutos secos',
      restrictions: ['almendras', 'nueces', 'avellanas', 'pistachos', 'anacardos'],
      alternatives: ['semillas-girasol', 'semillas-calabaza']
    },
    {
      id: 'shellfish',
      name: 'Mariscos',
      description: 'Alergia a mariscos',
      restrictions: ['camarones', 'langosta', 'cangrejo', 'mejillones', 'ostras'],
      alternatives: ['pescado-blanco', 'salmón', 'atún']
    },
    {
      id: 'eggs',
      name: 'Huevos',
      description: 'Alergia a huevos',
      restrictions: ['huevos', 'mayonesa', 'tortillas', 'postres-con-huevo'],
      alternatives: ['tofu', 'legumbres', 'semillas-chía']
    }
  ],

  // Objetivos específicos
  goals: [
    {
      id: 'weight-loss',
      name: 'Pérdida de Peso',
      description: 'Enfoque en déficit calórico y alimentos saciantes',
      focus: ['alto-fibra', 'proteínas', 'verduras', 'bajo-calorías'],
      avoid: ['azúcar', 'alimentos-procesados', 'grasas-trans']
    },
    {
      id: 'muscle-gain',
      name: 'Ganancia Muscular',
      description: 'Alto contenido proteico para desarrollo muscular',
      focus: ['alto-proteína', 'carbohidratos-complejos', 'grasas-saludables'],
      avoid: ['alimentos-vacíos', 'azúcar-refinada']
    },
    {
      id: 'endurance',
      name: 'Resistencia',
      description: 'Carbohidratos para energía sostenida',
      focus: ['carbohidratos-complejos', 'proteínas', 'hidratación'],
      avoid: ['grasas-pesadas', 'comidas-grandes']
    },
    {
      id: 'health',
      name: 'Salud General',
      description: 'Alimentos nutritivos para bienestar general',
      focus: ['antioxidantes', 'fibra', 'vitaminas', 'minerales'],
      avoid: ['alimentos-procesados', 'azúcar-excesivo']
    }
  ]
};

/**
 * Función para filtrar comidas según preferencias dietéticas
 * @param {Array} meals - Array de comidas
 * @param {Object} preferences - Preferencias del usuario
 * @returns {Array} Comidas filtradas
 */
export const filterMealsByPreferences = (meals, preferences) => {
  if (!meals || !preferences) return meals;

  return meals.filter(meal => {
    // Verificar restricciones de tipo de dieta
    if (preferences.dietType) {
      const dietType = dietaryPreferences.dietTypes.find(dt => dt.id === preferences.dietType);
      if (dietType && dietType.restrictions.length > 0) {
        const hasRestrictedIngredient = meal.ingredients.some(ingredient =>
          dietType.restrictions.some(restriction =>
            ingredient.toLowerCase().includes(restriction.toLowerCase())
          )
        );
        if (hasRestrictedIngredient) return false;
      }
    }

    // Verificar alergias
    if (preferences.allergies && preferences.allergies.length > 0) {
      for (const allergyId of preferences.allergies) {
        const allergy = dietaryPreferences.allergies.find(a => a.id === allergyId);
        if (allergy) {
          const hasAllergen = meal.ingredients.some(ingredient =>
            allergy.restrictions.some(restriction =>
              ingredient.toLowerCase().includes(restriction.toLowerCase())
            )
          );
          if (hasAllergen) return false;
        }
      }
    }

    // Verificar objetivos
    if (preferences.goals && preferences.goals.length > 0) {
      for (const goalId of preferences.goals) {
        const goal = dietaryPreferences.goals.find(g => g.id === goalId);
        if (goal) {
          // Verificar si la comida contiene ingredientes a evitar
          const hasAvoidedIngredient = meal.ingredients.some(ingredient =>
            goal.avoid.some(avoidItem =>
              ingredient.toLowerCase().includes(avoidItem.toLowerCase())
            )
          );
          if (hasAvoidedIngredient) return false;
        }
      }
    }

    return true;
  });
};

/**
 * Función para obtener comidas recomendadas según preferencias
 * @param {Array} meals - Array de comidas
 * @param {Object} preferences - Preferencias del usuario
 * @returns {Array} Comidas recomendadas ordenadas por relevancia
 */
export const getRecommendedMeals = (meals, preferences) => {
  const filteredMeals = filterMealsByPreferences(meals, preferences);
  
  // Ordenar por relevancia según preferencias
  return filteredMeals.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    // Puntuar según objetivos
    if (preferences.goals && preferences.goals.length > 0) {
      for (const goalId of preferences.goals) {
        const goal = dietaryPreferences.goals.find(g => g.id === goalId);
        if (goal) {
          // Puntuar ingredientes enfocados
          goal.focus.forEach(focusItem => {
            if (a.ingredients.some(ingredient => 
              ingredient.toLowerCase().includes(focusItem.toLowerCase())
            )) scoreA += 2;
            if (b.ingredients.some(ingredient => 
              ingredient.toLowerCase().includes(focusItem.toLowerCase())
            )) scoreB += 2;
          });

          // Puntuar tags relevantes
          goal.focus.forEach(focusItem => {
            if (a.tags.includes(focusItem)) scoreA += 1;
            if (b.tags.includes(focusItem)) scoreB += 1;
          });
        }
      }
    }

    return scoreB - scoreA; // Ordenar de mayor a menor puntuación
  });
};

/**
 * Función para generar plan de comidas personalizado
 * @param {number} targetCalories - Calorías objetivo
 * @param {Object} preferences - Preferencias del usuario
 * @returns {Object} Plan de comidas personalizado
 */
export const generatePersonalizedMealPlan = (targetCalories, preferences) => {
  // Esta función se integrará con generateDailyMealPlan
  // pero aplicando filtros de preferencias
  return {
    targetCalories,
    preferences,
    personalized: true,
    message: "Plan personalizado según tus preferencias"
  };
};
