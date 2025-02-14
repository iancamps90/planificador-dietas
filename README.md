# Planificador de Dietas 🥗

Un proyecto web interactivo que permite a los usuarios crear planes de dieta personalizados según sus necesidades y objetivos. Utiliza React, Vite y la API de OpenFoodFacts para proporcionar información nutricional en tiempo real.

## 🛠️ Tecnologías Utilizadas

- **Vite**: Configuración rápida y ligera para proyectos de React.
- **React**: Para construir la interfaz de usuario.
- **JavaScript**: Lógica y funciones interactivas.
- **CSS**: Estilización del proyecto.
- **OpenFoodFacts API**: Para obtener información nutricional de los alimentos.

## 📚 Características

1. **Formulario de usuario**:
   - Permite ingresar datos personales como peso, altura, edad y nivel de actividad.
   - Calcula las necesidades calóricas diarias según los datos ingresados.

2. **Búsqueda de alimentos**:
   - Integra la API de OpenFoodFacts para buscar alimentos y ver información nutricional.

3. **Generación de planes de dieta**:
   - Sugiere una dieta personalizada basada en las necesidades del usuario.

4. **Estilización moderna**:
   - Diseño responsivo y atractivo para una mejor experiencia de usuario.

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/planificador-dietas.git

2. Navega al directorio del proyecto:

cd planificador-dietas

3. Instala las dependencias:

npm install

4. Inicia el servidor de desarrollo:

npm run dev

🌐 Uso

    Abre el navegador en http://localhost:5173.
    Completa el formulario inicial para calcular tus necesidades calóricas.
    Busca alimentos para incluir en tu dieta personalizada.
    Genera y guarda un plan de dieta adaptado a tus objetivos.

🛠️ Funcionalidades Planeadas

    Guardar planes de dieta localmente en el navegador.
    Exportar dietas como archivo PDF.
    Configuración para usuarios avanzados: macros, preferencia por alimentos, etc.
    Integración con bases de datos para guardar múltiples perfiles de usuario.

📖 Recursos

    Documentación de OpenFoodFacts API
    Guía oficial de Vite
    React Documentation

📌 Contribuciones

¡Este proyecto está abierto a mejoras! Si tienes ideas o encuentras algún problema, no dudes en abrir un issue o enviar un pull request.
📜 Licencia

Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.


pasos 


...

1. Crear el formulario de usuario, Crea un nuevo componente llamado UserForm.

    Dentro de la carpeta src, crea una carpeta components 
    Dentro de components, crea un archivo llamado UserForm.jsx.

2. Integrar el formulario en App.jsx

    Edita el archivo src/App.jsx para importar y usar el formulario.

3. Estilizar el formulario

    Añade estilos básicos para el formulario creamos el archivo UserForm.css en la carpeta componets

4. comentamos los codigos creados hasta ahora tanto del formulario UserForm y del app.jsx.

5. Pruebamos el formulario

    Completa los campos con datos de prueba (peso, altura, edad, nivel de actividad).
    Haz clic en el botón "Calcular dieta".
    En la consola del navegador (presiona F12 para abrir las herramientas de desarrollo), verifica que los datos introducidos se impriman correctamente.

6. vamos a usar la Fórmula de Mifflin-St Jeor
Metabolismo Basal (BMR):

    Hombres:
    BMR=10×peso(kg)+6.25×altura(cm)−5×edad(an~os)+5BMR=10×peso(kg)+6.25×altura(cm)−5×edad(an~os)+5

    Mujeres:
    BMR=10×peso(kg)+6.25×altura(cm)−5×edad(an~os)−161BMR=10×peso(kg)+6.25×altura(cm)−5×edad(an~os)−161

Ajuste según actividad física:

    Sedentario: BMR ×1.2×1.2
    Actividad ligera: BMR ×1.375×1.375
    Moderada: BMR ×1.55×1.55
    Alta: BMR ×1.725×1.725
    Muy alta: BMR ×1.9×1.9

7. Implementación en el Proyecto

Añadiremos la lógica al componente UserForm.
Paso 1: Crear una función para calcular calorías
Paso 2: Incluir el cálculo en el envío del formulario
Paso 3: Añadir el selector de género.


paso siguientes una vez hecho el formulario y nos envia por consola los datos pasamos a guardarlos y los envie a la pagian .
1. Usamos useState para almacenar los datos enviados desde el formulario (userData).
2. La función handleUserData recibe los datos calculados y los guarda en el estado.
3. Renderizar resultados:

    Condicionalmente mostramos un bloque con los resultados si userData tiene información.
    El formato de los datos es amigable para el usuario.

4. añadimos estilos al app.css dandole estilo a los resultados proporcionados
5. hacemos comit a git y creamos una nueva rama para nuevos desarollos de la pagina y no interferiri en lo creado
6. añadimos al calculo de calorias segun el objetivo del usuario si quiere perder peso mantener o ganar
7. Vamos a realizar validaciones de los datos introducidos en el formulario :
   - Validación en los campos:
        Se asegura que el peso, la altura, y la edad sean números positivos y no vacíos.
        Se validan los campos de género, actividad y objetivo para asegurarse de que el usuario los haya seleccionado.

    - Manejo de errores:
        Los mensajes de error se guardan en el estado errors y se muestran debajo de los campos correspondientes si los datos son incorrectos.

    -Prevención de envío:
        Si hay errores en el formulario, el cálculo no se realiza y se muestra el mensaje de error. Si no hay errores, se hace el cálculo y se envía el resultado al componente principal.

    -Estilos de error:
        Agregamos una clase de estilo llamada .error para resaltar los mensajes de error. Aquí puedes agregar un estilo para que los mensajes de error se vean más visibles.
8. instalamos charts Para representar un gráfico circular con la distribución de las calorías entre los macronutrientes (proteínas, carbohidratos y grasas)
9. Importamos charts y añadimos ls graficos neecsarios 
10. Crear el gráfico:

A continuación, modificamos tu código para incluir un gráfico circular que muestre la distribución de las calorías entre proteínas, carbohidratos y grasas. Para calcular la distribución de las calorías, podemos usar los valores estándar de macronutrientes:

    1 g de proteína = 4 calorías
    1 g de carbohidrato = 4 calorías
    1 g de grasa = 9 calorías

Vamos a agregar el gráfico dentro de tu formulario o donde quieras mostrarlo.
10. se añaden estilos al grsfico 
11. Compilar y construir el proyecto:

Para desplegarlo en GitHub Pages, debes asegurarte de compilar el proyecto usando Vite y luego desplegar los archivos resultantes npm run build, se crea la carpeta dist.
12. se hace responsive el formulario y la pagina
13. se va a organiza y optimizar el archivo userform
14. vamos a crear formfiled para sacar la logica del return del formulario 
15. se crea carpeta utils dond dentro pondremos archivo calculations para todos los calculos del formulario.
16. 
