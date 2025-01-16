// src/utils/calculations.js

export const calculateCalories = (weight, height, age, activityLevel, gender, goal) => {
    // Cálculo del BMR según el género
    const bmr = gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5 // Para hombres
        : 10 * weight + 6.25 * height - 5 * age - 161; // Para mujeres

    // Ajuste por nivel de actividad
    let totalCalories = bmr * activityMultiplier[activityLevel];

    // Ajuste según el objetivo
    if (goal === "lose") {
        totalCalories *= 0.85; // Reducir un 15% para perder peso
    } else if (goal === "gain") {
        totalCalories *= 1.15; // Aumentar un 15% para ganar masa
    }

    return totalCalories;
};

export const calculateMacronutrients = (calories) => {
    const proteinCalories = calories * 0.3; // 30% de las calorías para proteínas
    const carbsCalories = calories * 0.4;   // 40% de las calorías para carbohidratos
    const fatCalories = calories * 0.3;     // 30% de las calorías para grasas

    // Convertimos las calorías a gramos
    const proteinGrams = proteinCalories / 4; // 1g de proteína = 4 calorías
    const carbsGrams = carbsCalories / 4;     // 1g de carbohidrato = 4 calorías
    const fatGrams = fatCalories / 9;         // 1g de grasa = 9 calorías

    return { proteinGrams, carbsGrams, fatGrams };
};

export const activityMultiplier = {
    sedentario: 1.2,
    activo: 1.55,
    muyActivo: 1.725,
};