// src/utils/calculations.js

export const calculateCalories = (weight, height, age, activityLevel, gender, goal) => {
    const bmr = gender === "male" ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
    let totalCalories = bmr * activityMultiplier[activityLevel];

    if (goal === "lose") {
        totalCalories *= 0.85;
    } else if (goal === "gain") {
        totalCalories *= 1.15;
    }

    return totalCalories;
};

export const calculateMacronutrients = (calories) => {
    const proteinCalories = calories * 0.3;
    const carbsCalories = calories * 0.4;
    const fatCalories = calories * 0.3;

    return {
        proteinGrams: proteinCalories / 4,
        carbsGrams: carbsCalories / 4,
        fatGrams: fatCalories / 9,
    };
};

export const activityMultiplier = {
    sedentario: 1.2,
    activo: 1.55,
    muyActivo: 1.725,
};