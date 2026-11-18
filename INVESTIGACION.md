# Investigación: Web Components, HTML Templates y Frameworks

**Autores:** Juan José Ardila Arévalo y Miguel Ricardo Calderón  
**Fecha:** 17 de noviembre de 2026

---

## Parte 1. Investigación: Web Components

### 1. ¿Qué problema resuelven los Web Components y qué aporta cada tecnología: Custom Elements, Shadow DOM y HTML Templates?
Los Web Components resuelven el problema histórico de la falta de encapsulamiento en la web (donde el CSS global y el DOM compartido provocaban colisiones de estilos y variables al reutilizar código) y eliminan la obligación de atarse a un framework específico para dividir la interfaz en piezas reutilizables. **Custom Elements** aporta la capacidad de definir nuevas etiquetas HTML personalizadas con su propio comportamiento y ciclo de vida en JavaScript nativo. **Shadow DOM** proporciona un subárbol DOM oculto y aislado del documento principal, garantizando que los estilos CSS del componente no se filtren hacia afuera ni sean sobrescritos por hojas de estilo externas. Finalmente, **HTML Templates** (`<template>` y `<slot>`) permite declarar fragmentos de estructura HTML inerte que el navegador no renderiza al inicio, sino que conserva como molde en memoria para ser clonados de forma rápida y segura.

### 2. ¿En qué se diferencia un `<template>` de un `<div>` oculto con `display: none`?
Aunque visualmente ninguno de los dos aparece en pantalla al cargar la página, un `<div>` oculto con `display: none` sí forma parte activa del árbol DOM principal, mientras que el contenido de un `<template>` se guarda en un `DocumentFragment` separado e inerte. Debido a esto, dentro de un `<div>` oculto el navegador igual descarga las imágenes (`<img>`), carga iframes y ejecuta cualquier etiqueta `<script>` de inmediato, lo que consume red y procesamiento innecesariamente; en cambio, dentro de un `<template>` nada se descarga ni se ejecuta hasta que el fragmento se clona e inserta en el DOM real. Asimismo, si ejecutamos `document.querySelector()`, el navegador sí encontrará cualquier elemento hijo dentro del `<div>` oculto, pero ignorará por completo todo lo que esté dentro del `<template>` (para acceder a su interior es obligatorio consultar la propiedad `template.content`).

### 3. ¿Qué cambia entre el Shadow DOM en modo `"open"` y en modo `"closed"`?
La diferencia radica en si el código JavaScript externo al componente puede acceder o no a su árbol DOM interno a través de la propiedad `.shadowRoot` del elemento host. Cuando el Shadow DOM se crea con `attachShadow({ mode: "open" })`, cualquier script de la página puede ejecutar `miElemento.shadowRoot` y obtendrá el objeto `ShadowRoot`, permitiendo consultar o manipular sus nodos internos desde afuera. Por el contrario, cuando se configura con `attachShadow({ mode: "closed" })`, consultar `miElemento.shadowRoot` desde un script externo devuelve `null`, impidiendo la inspección o modificación directa desde afuera (aunque la propia clase del componente sí puede guardar una referencia interna al crear el Shadow DOM). En la práctica profesional casi siempre se prefiere `"open"` porque facilita las pruebas automatizadas, la depuración y la accesibilidad sin que `"closed"` represente una barrera de seguridad real.

### 4. ¿Qué es un `<slot>` y para qué sirve en un componente reutilizable?
Un `<slot>` es una etiqueta que funciona como un marcador de posición (o ranura) dentro del Shadow DOM de un componente para indicar exactamente dónde debe proyectarse el contenido HTML externo (*Light DOM*) que el desarrollador escribe entre las etiquetas de apertura y cierre del componente personalizado. En un componente reutilizable sirve para darle flexibilidad de composición: en lugar de pasar todo rígidamente mediante atributos de texto plano, permite inyectar párrafos enriquecidos, listas, íconos o botones personalizados manteniendo el diseño y el marco estructural del componente. Además, si no se le pasa contenido al usar el componente, el `<slot>` puede mostrar un texto o estructura por defecto, y también permite definir múltiples zonas de inserción mediante el atributo `name` (*named slots*).

### 5. ¿Qué navegadores soportan hoy los Web Components? Indica la fuente y la fecha de consulta.
En la actualidad, los tres estándares que integran los Web Components (Custom Elements v1, Shadow DOM v1 y HTML Templates) cuentan con soporte nativo completo en todos los navegadores modernos tanto de escritorio como móviles: **Google Chrome** (desde la versión 67), **Microsoft Edge** (desde la versión 79 basada en Chromium), **Mozilla Firefox** (desde la versión 63), **Safari en macOS e iOS** (desde la versión 10.1 para Templates/Shadow DOM y soporte completo unificado desde v13.4+) y **Opera** (desde la versión 64). Gracias a esta adopción universal, hoy se pueden utilizar directamente en producción sin necesidad de cargar *polyfills* adicionales.
- **Fuente:** MDN Web Docs (*Web Components Browser Compatibility*) y Can I Use (`https://caniuse.com/custom-elementsv1` y `https://caniuse.com/shadowdomv1`), consultado el **17 de noviembre de 2026**.

---

## Parte 2. Investigación: frameworks, librerías y Node.js

### 1. Explica con un ejemplo la diferencia entre estándar del navegador, librería, framework y entorno de ejecución.
Imagina el proceso de construir y operar un restaurante: un **estándar del navegador** (como Web Components o Fetch API) equivale a los servicios básicos (agua, luz y gas) que ya vienen instalados por norma en el local y funcionan sin comprar equipamiento externo. Una **librería** (como React) es como comprar un robot de cocina especializado: tú eres el chef que mantiene el control del flujo de trabajo y decides exactamente en qué momento llamar a la librería para preparar un plato específico (la interfaz). Un **framework** (como Angular) es como adquirir una franquicia completa con manuales estrictos (inversión de control): la franquicia define toda la arquitectura del local (cómo se reciben pedidos, cómo se valida la caja y cómo se organiza la cocina) y es ella quien llama a tu código en los espacios previstos. Por último, un **entorno de ejecución** (como Node.js) no es ni un utensilio ni un manual de franquicia, sino la planta eléctrica industrial que permite que el motor de JavaScript funcione fuera del navegador (por ejemplo, en un servidor de backend o en la terminal de tu computador).

### 2. Tabla comparativa

| Criterio | Web Components nativos | React / Vue | Angular |
| :--- | :--- | :--- | :--- |
| **Tipo (estándar, librería o framework)** | Es un conjunto de **estándares nativos del navegador** especificados por la W3C y el WHATWG. No depende de terceros porque su motor ya viene integrado en los navegadores actuales. | **React** es una **librería** enfocada en construir interfaces de usuario mediante componentes declarativos. **Vue** es un **framework progresivo** que puede usarse como librería ligera de vista o escalarse con su ecosistema oficial. | Es un **framework** completo y opinado mantenido por Google para el desarrollo de aplicaciones web de gran escala. Provee una estructura integral de principio a fin bajo el lenguaje TypeScript. |
| **Cómo se crea un componente** | Se define una clase en JavaScript que extiende de `HTMLElement`, se vincula un `<template>` clonado en su `Shadow DOM` y se registra con `customElements.define('mi-tag', MiClase)`. | En **React** se crea mediante una función de JavaScript que retorna marcado JSX junto con *Hooks* (como `useState`) para manejar el estado. En **Vue** se suelen usar archivos de componente único (`.vue`) que dividen `<template>`, `<script>` y `<style>`. | Se crea mediante una clase en TypeScript decorada con `@Component({...})`, donde se enlazan su plantilla HTML, su hoja de estilos aislada y su lógica con inyección de dependencias. Normalmente se genera desde la terminal con `ng generate component`. |
| **Necesita instalar herramientas (npm)** | **No.** Funciona directamente en el navegador usando archivos `.html` y `.js` estándar sin necesidad de instalar Node.js, `npm` ni empaquetadores. | **Sí, en proyectos reales.** Aunque existen versiones por CDN para pruebas, en desarrollo profesional requieren `npm` y herramientas de compilación (como Vite) para transformar archivos JSX o `.vue` a JavaScript estándar. | **Sí, obligatoriamente.** Requiere Node.js, `npm` y el paquete `@angular/cli` para compilar TypeScript, procesar los decoradores y empaquetar toda la aplicación antes de que el navegador pueda ejecutarla. |
| **Ventajas principales** | No caduca con cambios de versión de terceros, pesa cero kilobytes en dependencias y funciona dentro de cualquier página o framework. Además, ofrece encapsulamiento real de estilos gracias al Shadow DOM nativo. | Actualizan la pantalla automáticamente cuando cambia el estado (reactividad y Virtual DOM) sin manipular nodos a mano con `querySelector`. Cuentan con un ecosistema gigante de paquetes listos para usar y una alta velocidad de desarrollo. | Incluye todo de fábrica (enrutador oficial, cliente HTTP, validación de formularios e inyección de dependencias), evitando decisiones dispares. Su tipado estricto con TypeScript estandariza el código cuando trabajan decenas de programadores juntos. |
| **Desventajas principales** | Obliga a escribir mucho código manual (*boilerplate*) para sincronizar atributos, propiedades y actualizar el DOM cuando cambian los datos. No incluye soluciones integradas para manejo de estado complejo o enrutamiento de páginas. | Generan dependencia de herramientas externas y actualizaciones constantes del ecosistema. En el caso de React, al ser solo una librería de vista, obliga a elegir e instalar paquetes de terceros para rutas, formularios o estado global. | Tiene una curva de aprendizaje alta debido al uso obligatorio de TypeScript, decoradores y programación reactiva con RxJS. Para widgets pequeños o páginas sencillas resulta excesivamente pesado y complejo de configurar. |

### 3. ¿Qué es Node.js, para qué se usa y qué relación tiene npm con React, Vue y Angular? Si una tienda en línea usa React y Node.js, ¿qué hace cada uno?
**Node.js** es un **entorno de ejecución (runtime environment)** multiplataforma y de código abierto construido sobre el motor V8 de Google Chrome que permite ejecutar código JavaScript fuera del navegador web (no es un lenguaje de programación ni un framework). Se utiliza principalmente para dos cosas: desarrollar servidores backend (APIs REST, microservicios, conexiones a bases de datos) y ejecutar en nuestra computadora las herramientas de construcción del frontend moderno. Su relación con **npm** (*Node Package Manager*) es directa, ya que `npm` es el gestor de paquetes que viene incluido con Node.js y actúa como el repositorio desde el cual se descargan e instalan React, Vue y Angular, así como los compiladores (Vite, Webpack, Babel, Angular CLI) que traducen su código a archivos `.js` que el navegador pueda leer.

En el caso de una **tienda en línea que usa React y Node.js**:
- **React (Frontend / Cliente):** Se ejecuta dentro del navegador del comprador y se encarga de toda la experiencia visual e interactiva, como mostrar el catálogo de productos, filtrar por tallas o precios en tiempo real y actualizar el icono del carrito de compras sin recargar la página.
- **Node.js (Backend / Servidor):** Se ejecuta en el servidor remoto de la empresa y se encarga de la lógica de negocio y seguridad que el usuario no ve: verificar el stock real en la base de datos, autenticar usuarios con contraseñas encriptadas, calcular impuestos de envío y comunicarse de forma segura con la pasarela de pagos bancarios.

### 4. Selección de herramientas por caso práctico

#### a. Un botón de chat que varias empresas pegan en sus propias páginas
Para este caso elegiríamos **Web Components nativos**. La razón principal es la interoperabilidad universal: cada empresa cliente puede tener su sitio web construido con tecnologías completamente distintas (WordPress, React, Angular, Vue o HTML estático), y un Web Component nativo funciona en todas ellas simplemente incluyendo un `<script>` y la etiqueta `<boton-chat-soporte></boton-chat-soporte>`. Además, gracias al **Shadow DOM**, los estilos CSS del botón de chat quedan totalmente blindados, evitando que las reglas de diseño de la página de la empresa rompan la apariencia del chat o que el chat altere los estilos de la empresa. Finalmente, al no arrastrar el peso de un framework ni requerir `npm` del lado del cliente, el widget carga de forma instantánea sin afectar el rendimiento del sitio huésped.

#### b. Una aplicación web grande para un banco, con muchos equipos de desarrollo
Para una plataforma bancaria de gran tamaño con múltiples equipos elegiríamos **Angular**. Al tratarse de un framework completo y fuertemente estructurado, impone desde el primer día una arquitectura uniforme (módulos, servicios con inyección de dependencias y separación estricta de responsabilidades), logrando que el código escrito por el equipo de "Transferencias" sea idéntico en estructura al del equipo de "Créditos". Además, el uso obligatorio de **TypeScript** permite detectar errores de tipos de datos en tiempo de compilación antes de llegar a producción, algo crítico cuando se manejan saldos y transacciones financieras. Por último, Angular incluye herramientas oficiales mantenidas por el mismo proveedor para seguridad de rutas (*Route Guards*), interceptores de tokens HTTP y pruebas unitarias, reduciendo el riesgo de depender de librerías de terceros abandonadas.

---

## Fuentes de consulta

1. **MDN Web Docs (Mozilla)** — *Web Components (Guía técnica de Custom Elements, Shadow DOM y Templates)*.  
   Enlace: https://developer.mozilla.org/es/docs/Web/API/Web_components  
   Fecha de consulta: 17 de noviembre de 2026.

2. **MDN Web Docs (Mozilla)** — *El elemento de plantilla de contenido (`<template>`) y el elemento `<slot>`*.  
   Enlace: https://developer.mozilla.org/es/docs/Web/HTML/Element/template  
   Fecha de consulta: 17 de noviembre de 2026.

3. **web.dev (Google Chrome Developers)** — *Custom Elements v1 y Shadow DOM v1: Componentes web reutilizables*.  
   Enlace: https://web.dev/articles/custom-elements-v1 y https://web.dev/articles/shadowdom-v1  
   Fecha de consulta: 17 de noviembre de 2026.

4. **Documentación Oficial de Node.js** — *Introduction to Node.js y An introduction to the npm package manager*.  
   Enlace: https://nodejs.org/en/learn/getting-started/introduction-to-nodejs  
   Fecha de consulta: 17 de noviembre de 2026.

5. **Documentación Oficial de React y Angular** — *React: Describing the UI (https://react.dev/learn/describing-the-ui) y Angular: Introduction to Angular concepts (https://angular.dev/overview)*.  
   Fecha de consulta: 17 de noviembre de 2026.
