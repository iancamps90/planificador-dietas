// Importamos React y useState para manejar el estado del formulario
import React, { useState } from "react";
// Importamos el archivo CSS específico para estilizar el formulario
import "./UserForm.css";

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    // Crear una función para calcular calorías
    const calculateCalories = (weight, height, age, activityLevel, gender, goal) => {
        // Cálculo del BMR según el género
        const bmr =
            gender === "male"
                ? 10 * weight + 6.25 * height - 5 * age + 5  // Para hombres
                : 10 * weight + 6.25 * height - 5 * age - 161; // Para mujeres

        // Ajuste por nivel de actividad
        const activityMultiplier = {
            sedentario: 1.2,
            activo: 1.55,
            muyActivo: 1.725,
        };

        let totalCalories = bmr * activityMultiplier[activityLevel];

        // Ajuste según el objetivo
        if (goal === "lose") {
            totalCalories *= 0.85; // Reducir un 15% para perder peso
        } else if (goal === "gain") {
            totalCalories *= 1.15; // Aumentar un 15% para ganar masa
        }

        return totalCalories;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { weight, height, age, activityLevel, gender, goal } = formData;

        // Validación de los campos
        let formErrors = {};

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

        // Llamamos a la función onSubmit para enviar los datos al componente principal
        onSubmit({ ...formData, dailyCalories });
        setErrors({}); // Limpiamos los errores al enviar el formulario
    };

    


    // Renderizamos el formulario
    return (
        <form onSubmit={handleSubmit}>
            {/* Título del formulario */}
            <h2>Introduce tus datos</h2>

            {/* Campo para el peso */}
            <div>
                <label htmlFor="weight">Peso (kg):</label>
                <input
                    type="number"         // El campo acepta solo números
                    id="weight"           // Identificador único para el campo
                    name="weight"         // Nombre del campo, coincide con la propiedad en el estado
                    value={formData.weight} // Valor actual del estado correspondiente
                    onChange={handleChange} // Manejador para capturar cambios
                    required             // Campo obligatorio
                />
                {errors.weight && <p className="error">{errors.weight}</p>}
            </div>

            {/* Campo para la altura */}
            <div>
                <label htmlFor="height">Altura (cm):</label>
                <input
                    type="number"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    required
                />
                {errors.height && <p className="error">{errors.height}</p>}
            </div>

            {/* Campo para la edad */}
            <div>
                <label htmlFor="age">Edad:</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />
                {errors.age && <p className="error">{errors.age}</p>}
            </div>

            {/* Campo para seleccionar genero */}
            <div>
                <label htmlFor="gender">Género:</label>
                <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona tu género</option>
                        <option value="male">Hombre</option>
                        <option value="female">Mujer</option>
                    </select>
                {errors.gender && <p className="error">{errors.gender}</p>}
            </div>

            {/* Campo para seleccionar el nivel de actividad */}
            <div>
                <label htmlFor="activityLevel">Nivel de actividad:</label>
                <select
                    id="activityLevel"
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleChange}
                    required
                >
                    {/* Opciones del selector */}
                    <option value="">Selecciona tu nivel</option>
                    <option value="sedentario">Sedentario</option>
                    <option value="activo">Activo</option>
                    <option value="muyActivo">Muy activo</option>
                </select>
                {errors.activityLevel && <p className="error">{errors.activityLevel}</p>}
            </div>

            {/* Campo para seleccionar el objetivo de la dieta */}
            <div>
                <label htmlFor="goal">Objetivo:</label>
                <select
                    id="goal"
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                >
                    {/* Opciones del selector */}
                    <option value="">Selecciona tu objetivo</option>
                    <option value="maintain">Mantener peso</option>
                    <option value="lose">Perder peso</option>
                    <option value="gain">Ganar masa muscular</option>
                </select>
                {errors.goal && <p className="error">{errors.goal}</p>}
            </div>

            {/* Botón para enviar el formulario */}
            <button type="submit">Calcular dieta</button>
        </form>
    );
};

// Exportamos el componente para usarlo en otras partes de la aplicación
export default UserForm;
