# Juego del Laberinto IT

## 🎮 Enlaces para Jugar

* **[JUEGA DIRECTAMENTE AQUÍ (Versión Principal)](https://robertofernandez12.github.io/Proyecto_Integrador_1-Evaluacion_DWEC_2025_2026/)**
* **[Jugar a la Versión 2.0 (Bonus con IA)](https://robertofernandez12.github.io/Proyecto_Integrador_1-Evaluacion_DWEC_2025_2026/VersionMejorada/)**

Este proyecto es una aplicación web interactiva desarrollada con HTML5, CSS3 y JavaScript. El objetivo es guiar al héroe a través de un tablero de 10x10 hasta alcanzar el globo, utilizando un dado virtual 
y compitiendo por el menor número de tiradas.

## Funcionalidades Principales

1.  **Registro de Usuario:** Validación de nombre (mínimo 4 letras, sin números).
2.  **Generación de Tablero:** Creación dinámica del DOM para el grid de 10x10.
3.  **Sistema de Movimiento:**
    * Lógica de dado aleatorio (1-6).
    * Validación de límites: No se permite mover si el destino sale del tablero.
    * Visualización de caminos posibles (Pathfinding visual).
4.  **Sistema de Puntuación:**
    * Contador de tiradas en tiempo real.
    * Persistencia de **Récord** utilizando `localStorage`.
5.  **Interfaz Responsiva:** Diseño centrado con estilos modernos y feedback visual.

## Instrucciones de Ejecución

Para ejecutar el juego, no es necesario instalar dependencias ni servidores externos.

1.  Descarga el archivo comprimido `.zip`.
2.  Descomprímelo en una carpeta de tu ordenador.
3.  Localiza el archivo **`index.html`**.
4.  Haz doble clic sobre él para abrirlo en tu navegador web predeterminado (Chrome, Firefox, Edge).

## Tecnologías Utilizadas

* **HTML5:** Estructura semántica.
* **CSS3:** Flexbox para maquetación y estilos visuales.
* **JavaScript (ES6):** Lógica del juego, manipulación del DOM y manejo de eventos.

## Estructura del Proyecto

* `index.html`: Punto de entrada de la aplicación.
* `estilos.css`: Hoja de estilos.
* `script.js`: Lógica completa del juego.
* `img/`: Carpeta que contiene los recursos gráficos (it.jpg, globo.avif, baldosa1.PNG, caras del dado).

---
**Autor:** Roberto Fernández Cordero

**Curso:** 2º Desarrollo de Aplicaciones Web



