import { createContext, useContext, useEffect , useState } from "react";
import { calculateCalories, calculateMacronutrients } from "../utils/calculations";
import axios from "axios";



// Crear el contexto
const DietContext = createContext();

// Hook personalizado para acceder al contexto
export const useDiet = () => useContext(DietContext);

// Proveedor del contexto
export const DietProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [calories, setCalories] = useState(null);
    const [macronutrients, setMacronutrients] = useState(null);
    const [dietPlan, setDietPlan] = useState(null);
    const [loading, setLoading] = useState(false);

    // Función para calcular la dieta
    const calculateDiet = async (formData) => {
        setLoading(true);
        console.log("🚀 Enviando datos al contexto...", formData);

        const { weight, height, age, activityLevel, gender, goal } = formData;
        const calculatedCalories = calculateCalories(weight, height, age, activityLevel, gender, goal);
        const calculatedMacros = calculateMacronutrients(calculatedCalories);

        setCalories(calculatedCalories);
        setMacronutrients(calculatedMacros);
        setUserData(formData);
        console.log("🔥 Calorías y macros calculados:", { calculatedCalories, calculatedMacros });

        try {
            const response = await axios.get(`https://api.spoonacular.com/mealplanner/generate`, {
                params: {
                    apiKey: "86d08314673f46188d2212c310104fcd",
                    targetCalories: calculatedCalories,
                    timeFrame: "day"
                }
            });

            console.log("📥 Respuesta de la API:", response.data); // Ver qué devuelve la API

            if (response.data && response.data.meals) {
                setDietPlan(response.data);
                console.log("✅ DietPlan actualizado:", response.data);
            } else {
                console.error("⚠️ La API no devolvió comidas válidas.");
            }
        } catch (error) {
            console.error("❌ Error obteniendo la dieta:", error);
        }

        setLoading(false);
    };



    // 🟢 Ahora `useEffect` está dentro del `DietProvider`
    useEffect(() => {
        console.log("🔄 Estado actualizado:", { userData, calories, macronutrients, dietPlan });
    }, [userData, calories, macronutrients, dietPlan]);



    return (
        <DietContext.Provider value={{ userData, calories, macronutrients, dietPlan, loading, calculateDiet }}>
            {children}
        </DietContext.Provider>
    );
};

export default DietProvider;
