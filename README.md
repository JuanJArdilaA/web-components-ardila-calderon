# Web Components, HTML Templates y Frameworks — Veterinaria Patitas Felices

Repositorio de la actividad evaluativa sobre **Web Components nativos, HTML Templates y el ecosistema de Frameworks/Librerías de JavaScript**.

---

## Integrantes de la pareja
- **Juan José Ardila Arévalo**
- **Miguel Ricardo Calderón**

---

## Caso práctico elegido
Se eligió el primer caso propuesto en la guía:
> **Ficha de mascota para una veterinaria (`<ficha-mascota>`)** que recibe y renderiza: **nombre**, **especie**, **edad** y **próxima vacuna**, además de incluir un `<slot>` para observaciones médicas o notas libres del veterinario.

---

## Estructura del repositorio

```text
web-components-ardila-calderon/
├── README.md            # Documentación general, integrantes, instrucciones y declaración de IA
├── INVESTIGACION.md     # Respuestas de las Partes 1 y 2, cuadro comparativo y fuentes oficiales
├── index.html           # Estructura principal, definición de <template> y 4 instancias del componente
└── js/
    └── main.js          # Clase FichaMascota (Web Component), Shadow DOM y lógica comentada (R1-R5)
```

---

## Cómo probar el componente

Como el proyecto está construido al 100% con **estándares nativos del navegador** (sin librerías externas ni dependencias de `npm`), puedes probarlo de dos maneras:

1. **Apertura directa en el navegador:**
   - Clona este repositorio o descarga los archivos:
     ```bash
     git clone https://github.com/JuanJArdilaA/web-components-ardila-calderon.git
     ```
   - Abre el archivo `index.html` haciendo doble clic sobre él en cualquier navegador moderno (Chrome, Edge, Firefox o Safari).

2. **Con servidor local (ej. extensión Live Server en VS Code):**
   - Abre la carpeta del proyecto en Visual Studio Code.
   - Haz clic derecho sobre `index.html` y selecciona **"Open with Live Server"**.
   - Abre las **Herramientas de Desarrollador (`F12`)**:
     - En la pestaña **Elements / Inspector**, despliega cualquier etiqueta `<ficha-mascota>` para inspeccionar su `#shadow-root (open)`, el `<template>` clonado y el contenido proyectado en el `<slot>`.
     - En la pestaña **Console**, verifica que no existe ningún error de ejecución.

---

## Declaración de uso de Inteligencia Artificial

De acuerdo con los lineamientos de la actividad evaluativa, declaramos de manera transparente que utilizamos **Inteligencia Artificial (Gemini)** como herramienta de apoyo durante el desarrollo de este trabajo para:
1. Contrastar y estructurar la síntesis conceptual en `INVESTIGACION.md` a partir de la documentación técnica oficial (MDN Web Docs, web.dev, Node.js, React, Vue y Angular).
2. Revisar la maquetación CSS encapsulada dentro del `<template>` y verificar el cumplimiento estricto de los requisitos `R1` a `R5` en el componente `<ficha-mascota>`.

**Explicación con nuestras propias palabras de lo que entregamos:**
En este trabajo comprendimos y pusimos en práctica cómo el navegador permite crear componentes propios sin depender de librerías como React o frameworks como Angular. En la práctica diseñamos un molde inerte en HTML usando `<template id="ficha-mascota-template">` (**R1**), que no se dibuja ni ejecuta nada hasta que nuestra clase `FichaMascota` (que hereda de `HTMLElement` y se registra con `customElements.define`) lo clona dentro de un `Shadow DOM` en modo `open` (**R2**). Gracias al Shadow DOM, el CSS interno de cada tarjeta queda aislado del resto de la página. Además, el componente lee los atributos personalizados (`nombre`, `especie`, `edad` y `proxima-vacuna`) mediante `getAttribute()` para rellenar los marcadores vacíos del template (**R3**), proyecta notas médicas personalizadas escritas dentro de la etiqueta usando `<slot>` (**R4**) y se reutiliza en múltiples tarjetas independientes dentro del `index.html` (**R5**).
