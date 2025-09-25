// src/utils/pdfGenerator.js

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generador de PDFs profesionales
 * 
 * Conceptos que aprenderás:
 * 1. PDF generation: Generación de documentos PDF
 * 2. Canvas rendering: Renderizado de elementos HTML a canvas
 * 3. Document formatting: Formateo profesional de documentos
 * 4. Image integration: Integración de imágenes en PDFs
 */

/**
 * Generar PDF del plan de dieta
 * @param {Object} weeklyPlan - Plan semanal de dieta
 * @param {Object} userData - Datos del usuario
 * @param {Object} macronutrients - Macronutrientes calculados
 */
export const generateDietPlanPDF = async (weeklyPlan, userData, macronutrients) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Configurar fuente y colores
  doc.setFont('helvetica');
  
  // Título principal
  doc.setFontSize(24);
  doc.setTextColor(102, 126, 234); // Color primario
  doc.text('Plan de Dieta Personalizado', pageWidth / 2, 30, { align: 'center' });
  
  // Información del usuario
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 20, 50);
  doc.text(`Para: ${userData.gender === 'male' ? 'Hombre' : 'Mujer'}, ${userData.age} años`, 20, 60);
  doc.text(`Peso: ${userData.weight}kg, Altura: ${userData.height}cm`, 20, 70);
  
  // Objetivos y macronutrientes
  doc.setFontSize(14);
  doc.setTextColor(102, 126, 234);
  doc.text('Objetivos Nutricionales', 20, 90);
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`Calorías diarias: ${macronutrients.calories.toFixed(0)} kcal`, 20, 105);
  doc.text(`Proteínas: ${macronutrients.proteinGrams.toFixed(0)}g`, 20, 115);
  doc.text(`Carbohidratos: ${macronutrients.carbsGrams.toFixed(0)}g`, 20, 125);
  doc.text(`Grasas: ${macronutrients.fatGrams.toFixed(0)}g`, 20, 135);
  
  // Plan semanal
  let yPosition = 160;
  const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
  weekDays.forEach((day, index) => {
    const dayPlan = weeklyPlan[day];
    if (!dayPlan) return;
    
    // Verificar si necesitamos una nueva página
    if (yPosition > pageHeight - 100) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Día de la semana
    doc.setFontSize(16);
    doc.setTextColor(102, 126, 234);
    doc.text(day, 20, yPosition);
    
    yPosition += 15;
    
    // Comidas del día
    const meals = [dayPlan.breakfast, dayPlan.lunch, dayPlan.dinner, dayPlan.snack].filter(meal => meal);
    
    meals.forEach(meal => {
      if (yPosition > pageHeight - 50) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`• ${meal.name}`, 30, yPosition);
      
      yPosition += 8;
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`  ${meal.calories} kcal | ${meal.protein}g proteína | ${meal.carbs}g carbohidratos | ${meal.fat}g grasas`, 30, yPosition);
      
      yPosition += 15;
    });
    
    yPosition += 10;
  });
  
  // Pie de página
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Generado por Fitness Planner - Tu compañero de fitness personal', pageWidth / 2, pageHeight - 10, { align: 'center' });
  
  // Guardar PDF
  doc.save('plan_dieta_personalizado.pdf');
};

/**
 * Generar PDF del plan de entrenamiento
 * @param {Object} weeklyPlan - Plan semanal de entrenamiento
 * @param {Object} workoutStats - Estadísticas de entrenamiento
 */
export const generateWorkoutPlanPDF = async (weeklyPlan, workoutStats) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Título principal
  doc.setFontSize(24);
  doc.setTextColor(102, 126, 234);
  doc.text('Plan de Entrenamiento', pageWidth / 2, 30, { align: 'center' });
  
  // Estadísticas
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 20, 50);
  doc.text(`Sesiones completadas: ${workoutStats.totalSessions}`, 20, 60);
  doc.text(`Calorías quemadas: ${workoutStats.totalCalories}`, 20, 70);
  doc.text(`Tiempo total: ${Math.floor(workoutStats.totalTime / 60)} horas`, 20, 80);
  
  // Plan semanal
  let yPosition = 110;
  const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
  weekDays.forEach((day) => {
    const dayPlan = weeklyPlan[day];
    if (!dayPlan) return;
    
    if (yPosition > pageHeight - 100) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Día de la semana
    doc.setFontSize(16);
    doc.setTextColor(102, 126, 234);
    doc.text(day, 20, yPosition);
    
    yPosition += 15;
    
    if (dayPlan.type === 'Descanso') {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('• Día de Descanso', 30, yPosition);
      yPosition += 20;
    } else {
      // Ejercicios del día
      dayPlan.exercises.forEach(exercise => {
        if (yPosition > pageHeight - 50) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`• ${exercise.name}`, 30, yPosition);
        
        yPosition += 8;
        
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`  ${exercise.sets} series x ${exercise.reps} repeticiones | ${exercise.calories} kcal`, 30, yPosition);
        
        yPosition += 15;
      });
    }
    
    yPosition += 10;
  });
  
  // Pie de página
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Generado por Fitness Planner - Tu compañero de fitness personal', pageWidth / 2, pageHeight - 10, { align: 'center' });
  
  // Guardar PDF
  doc.save('plan_entrenamiento_personalizado.pdf');
};

/**
 * Generar PDF de favoritos
 * @param {Object} favorites - Objeto con favoritos
 */
export const generateFavoritesPDF = async (favorites) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Título principal
  doc.setFontSize(24);
  doc.setTextColor(102, 126, 234);
  doc.text('Mis Favoritos Fitness', pageWidth / 2, 30, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 20, 50);
  
  let yPosition = 70;
  
  // Comidas favoritas
  if (favorites.meals.length > 0) {
    doc.setFontSize(16);
    doc.setTextColor(102, 126, 234);
    doc.text('🍽️ Comidas Favoritas', 20, yPosition);
    yPosition += 20;
    
    favorites.meals.forEach(meal => {
      if (yPosition > pageHeight - 50) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`• ${meal.name}`, 30, yPosition);
      
      yPosition += 8;
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`  ${meal.calories} kcal | Rating: ${meal.rating}/5`, 30, yPosition);
      
      if (meal.notes) {
        yPosition += 8;
        doc.text(`  Notas: ${meal.notes}`, 30, yPosition);
      }
      
      yPosition += 15;
    });
    
    yPosition += 10;
  }
  
  // Ejercicios favoritos
  if (favorites.exercises.length > 0) {
    doc.setFontSize(16);
    doc.setTextColor(102, 126, 234);
    doc.text('💪 Ejercicios Favoritos', 20, yPosition);
    yPosition += 20;
    
    favorites.exercises.forEach(exercise => {
      if (yPosition > pageHeight - 50) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`• ${exercise.name}`, 30, yPosition);
      
      yPosition += 8;
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`  ${exercise.equipment} | Rating: ${exercise.rating}/5`, 30, yPosition);
      
      if (exercise.notes) {
        yPosition += 8;
        doc.text(`  Notas: ${exercise.notes}`, 30, yPosition);
      }
      
      yPosition += 15;
    });
  }
  
  // Pie de página
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Generado por Fitness Planner - Tu compañero de fitness personal', pageWidth / 2, pageHeight - 10, { align: 'center' });
  
  // Guardar PDF
  doc.save('mis_favoritos_fitness.pdf');
};

/**
 * Generar PDF completo de la aplicación
 * @param {Object} data - Todos los datos de la aplicación
 */
export const generateCompletePDF = async (data) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Portada
  doc.setFontSize(28);
  doc.setTextColor(102, 126, 234);
  doc.text('Fitness Planner', pageWidth / 2, 100, { align: 'center' });
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('Tu Plan Personalizado Completo', pageWidth / 2, 120, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generado el: ${new Date().toLocaleDateString()}`, pageWidth / 2, 140, { align: 'center' });
  
  // Añadir página para el plan de dieta
  if (data.dietPlan) {
    doc.addPage();
    await generateDietPlanPDF(data.dietPlan, data.userData, data.macronutrients);
  }
  
  // Añadir página para el plan de entrenamiento
  if (data.workoutPlan) {
    doc.addPage();
    await generateWorkoutPlanPDF(data.workoutPlan, data.workoutStats);
  }
  
  // Guardar PDF completo
  doc.save('plan_fitness_completo.pdf');
};
