// src/components/UserForm.jsx

import { useState } from "react";
import { useDiet } from "../context/DietContext";
import "./UserForm.css";
import { TextField, Button, MenuItem, Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";

const activityLevels = [
    { value: "sedentario", label: "Sedentario (Poco ejercicio)" },
    { value: "activo", label: "Activo (Ejercicio moderado)" },
    { value: "muyActivo", label: "Muy Activo (Ejercicio diario)" }
];

const goals = [
    { value: "maintain", label: "Mantener peso" },
    { value: "lose", label: "Perder peso" },
    { value: "gain", label: "Ganar masa muscular" }
];

const UserForm = () => {
    const { loading, calculateDiet } = useDiet();
    const [formData, setFormData] = useState({
        weight: "",
        height: "",
        age: "",
        gender: "",
        activityLevel: "",
        goal: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateDiet(formData);
    };

    return (
        <Box className="form-container">
            <Card className="form-card">
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Introduce tus datos
                    </Typography>
                    <form onSubmit={handleSubmit} className="diet-form">
                        <TextField label="Peso (kg)" type="number" name="weight" value={formData.weight} onChange={handleChange} fullWidth margin="normal" required />
                        <TextField label="Altura (cm)" type="number" name="height" value={formData.height} onChange={handleChange} fullWidth margin="normal" required />
                        <TextField label="Edad" type="number" name="age" value={formData.age} onChange={handleChange} fullWidth margin="normal" required />
                        <TextField select label="Género" name="gender" value={formData.gender} onChange={handleChange} fullWidth margin="normal" required>
                            <MenuItem value="male">Hombre</MenuItem>
                            <MenuItem value="female">Mujer</MenuItem>
                        </TextField>
                        <TextField select label="Nivel de actividad" name="activityLevel" value={formData.activityLevel} onChange={handleChange} fullWidth margin="normal" required>
                            {activityLevels.map((level) => (
                                <MenuItem key={level.value} value={level.value}>{level.label}</MenuItem>
                            ))}
                        </TextField>
                        <TextField select label="Objetivo" name="goal" value={formData.goal} onChange={handleChange} fullWidth margin="normal" required>
                            {goals.map((goal) => (
                                <MenuItem key={goal.value} value={goal.value}>{goal.label}</MenuItem>
                            ))}
                        </TextField>
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            {loading ? <CircularProgress size={24} /> : "Calcular Dieta"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserForm;

