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
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejador para gestionar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        const { weight, height, age, activityLevel, gender } = formData;

    // Crear una función para calcular calorías
    const calculateCalories = (weight, height, age, activityLevel, gender) => {
        // Cálculo del BMR según el género
        const bmr =
            gender === "male"
                ? 10 * weight + 6.25 * height - 5 * age + 5
                : 10 * weight + 6.25 * height - 5 * age - 161;

        // Ajuste por nivel de actividad
        const activityMultiplier = {
            sedentary: 1.2,
            medium: 1.55,
            high: 1.725,
        };

        return bmr * activityMultiplier[activityLevel];
    };


        // Calculamos las calorías diarias
        const dailyCalories = calculateCalories(
            parseFloat(weight),
            parseFloat(height),
            parseFloat(age),
            activityLevel,
            gender
        );

        console.log("Datos del usuario:", formData);
        console.log(`Calorías necesarias por día: ${dailyCalories.toFixed(2)}`);

        onSubmit({ ...formData, dailyCalories }); // Llama a la función onSubmit (pasada como prop) Envía los datos calculados al componente principal
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
                    <option value="sedentary">Sedentario</option>
                    <option value="medium">Activo</option>
                    <option value="high">Muy activo</option>
                </select>
            </div>

            {/* Botón para enviar el formulario */}
            <button type="submit">Calcular dieta</button>
        </form>
    );
};

// Exportamos el componente para usarlo en otras partes de la aplicación
export default UserForm;
