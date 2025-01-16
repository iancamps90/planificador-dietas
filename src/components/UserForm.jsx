// src/components/UserForm.jsx

import React, { useState } from "react"; // Importamos React y useState para manejar el estado del formulario
import "./UserForm.css"; // Importamos el archivo CSS específico para estilizar el formulario
import { Pie } from "react-chartjs-2"; // Importamos el componente Pie de Chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { calculateCalories, calculateMacronutrients, activityMultiplier } from "../utils/calculations";
import FormField from './FormField';

// Registramos los elementos necesarios para usar el gráfico circular
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Creamos el componente UserForm como una función que recibe una prop llamada "onSubmit"
const UserForm = ({ onSubmit }) => {
    // Definimos el estado inicial del formulario con useState
    const [formData, setFormData] = useState({
        weight: "", // Peso del usuario (en kilogramos)
        height: "", // Altura del usuario (en centímetros)
        age: "",    // Edad del usuario
        gender: "", // genero del usuario 
        activityLevel: "", // Nivel de actividad física del usuario
        goal: "", // Objetivo 
    });

    // Estado para los mensajes de error
    const [errors, setErrors] = useState({}); 
    // Estado para el gráfico
    const [caloriesData, setCaloriesData] = useState(null); 
    // variables  macros
    const [macronutrients, setMacronutrients] = useState({
        proteinGrams: 0,
        carbsGrams: 0,
        fatGrams: 0
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { weight, height, age, activityLevel, gender, goal } = formData;

        // Validación de los campos
        const formErrors = {};
        // Validación de peso, altura y edad
        if (!weight || isNaN(weight) || weight <= 0) formErrors.weight = "Por favor, ingresa un peso válido.";
        if (!height || isNaN(height) || height <= 0) formErrors.height = "Por favor, ingresa una altura válida.";
        if (!age || isNaN(age) || age <= 0) formErrors.age = "Por favor, ingresa una edad válida.";
        // Validación de selección de género y nivel de actividad
        if (!gender) formErrors.gender = "Por favor, selecciona tu género.";
        if (!activityLevel) formErrors.activityLevel = "Por favor, selecciona tu nivel de actividad.";
        if (!goal) formErrors.goal = "Por favor, selecciona un objetivo.";

        // Si hay errores, no continuamos con el cálculo
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // Si no hay errores, realizamos el cálculo
        const dailyCalories = calculateCalories(
            parseFloat(weight),
            parseFloat(height),
            parseFloat(age),
            activityLevel,
            gender,
            goal
        );

        // Calcular los macronutrientes
        const nutrients = calculateMacronutrients(dailyCalories);

        // Actualizar estado con los datos para el gráfico
        setMacronutrients(nutrients);
        setCaloriesData({
            labels: ["Proteínas", "Carbohidratos", "Grasas"],
            datasets: [
                {
                    data: [nutrients.proteinGrams, nutrients.carbsGrams, nutrients.fatGrams],
                    backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
                    hoverBackgroundColor: ["#ff4757", "#1e90ff", "#ffb142"],
                },
            ],
        });

        // Llamamos a la función onSubmit para enviar los datos al componente principal
        onSubmit({ ...formData, dailyCalories });
        setErrors({}); // Limpiamos los errores al enviar el formulario
    };

    


    // Renderizamos el formulario
    return (

        <div>
            <form onSubmit={handleSubmit}>
                <h2>Introduce tus datos</h2>
                <FormField label="Peso (kg)" type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} error={errors.weight} />
                <FormField label="Altura (cm)" type="number" id="height" name="height" value={formData.height} onChange={handleChange} error={errors.height} />
                <FormField label="Edad" type="number" id="age" name="age" value={formData.age} onChange={handleChange} error={errors.age} />
                <FormField label="Género" type="select" id="gender" name="gender" value={formData.gender} onChange={handleChange} error={errors.gender} options={["", "male", "female"]} />
                <FormField label="Nivel de actividad" type="select" id="activityLevel" name="activityLevel" value={formData.activityLevel} onChange={handleChange} error={errors.activityLevel} options={["", "sedentario", "activo", "muyActivo"]} />
                <FormField label="Objetivo" type="select" id="goal" name="goal" value={formData.goal} onChange={handleChange} error={errors.goal} options={["", "maintain", "lose", "gain"]} />
                <button type="submit">Calcular dieta</button>
            </form>

            <div className="chart-container">
                {caloriesData && (
                    <div>
                        <h3>Distribución de Calorías</h3>
                        <Pie data={caloriesData} />
                    </div>
                )}
            </div>
        </div>


    );
};

// Exportamos el componente para usarlo en otras partes de la aplicación
export default UserForm;
