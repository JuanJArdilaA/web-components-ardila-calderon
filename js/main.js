/**
 * Actividad Evaluativa: Web Components, HTML Templates y Frameworks
 * Autores: Juan José Ardila Arévalo y Miguel Ricardo Calderón
 * Caso elegido: Ficha de mascota para una veterinaria (<ficha-mascota>)
 */

// R2. Componente: clase que extiende HTMLElement para definir nuestro Web Component nativo
class FichaMascota extends HTMLElement {
  constructor() {
    super();

    // R2. Componente: creamos el Shadow DOM en modo "open" para encapsular la estructura y el CSS
    this.attachShadow({ mode: 'open' });

    // R1. Template propio: seleccionamos el <template id="ficha-mascota-template"> definido en index.html
    const template = document.getElementById('ficha-mascota-template');

    if (template) {
      // R2. Componente: clonamos el contenido completo del template (incluyendo <style> y el <slot> del R4)
      // y lo inyectamos dentro del Shadow DOM de esta instancia
      const contenidoClonado = template.content.cloneNode(true);
      this.shadowRoot.appendChild(contenidoClonado);
    }
  }

  // R3. Atributos: declaramos los atributos observados (recibe 4 datos por atributos, superando el mínimo de 3)
  static get observedAttributes() {
    return ['nombre', 'especie', 'edad', 'proxima-vacuna'];
  }

  // Se ejecuta cuando el componente se inserta en el DOM de la página (R5: cada una de las instancias)
  connectedCallback() {
    this.renderizarDatos();
  }

  // R3. Atributos: si algún atributo cambia dinámicamente, actualizamos los marcadores del template
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.shadowRoot) {
      this.renderizarDatos();
    }
  }

  // R1 y R3: método que lee los atributos del componente y rellena los marcadores vacíos del template clonado
  renderizarDatos() {
    // R3. Atributos: obtenemos los datos pasados por atributos (con valores por defecto preventivos)
    const nombre = this.getAttribute('nombre') || 'Sin nombre';
    const especie = this.getAttribute('especie') || 'Especie no especificada';
    const edad = this.getAttribute('edad') || 'Edad no registrada';
    const proximaVacuna = this.getAttribute('proxima-vacuna') || 'Pendiente por agendar';

    // R1. Template propio: localizamos los marcadores vacíos dentro de nuestro Shadow DOM
    const elNombre = this.shadowRoot.querySelector('.mascota-nombre');
    const elEspecie = this.shadowRoot.querySelector('.mascota-especie');
    const elEdad = this.shadowRoot.querySelector('.mascota-edad');
    const elVacuna = this.shadowRoot.querySelector('.mascota-vacuna');

    // R1 y R3: rellenamos cada marcador vacío con el valor de su atributo correspondiente
    if (elNombre) elNombre.textContent = nombre;
    if (elEspecie) elEspecie.textContent = especie;
    if (elEdad) elEdad.textContent = edad;
    if (elVacuna) elVacuna.textContent = proximaVacuna;

    // R4. Slot: el elemento <slot> ya está incluido dentro del <template> clonado en el Shadow DOM,
    // por lo que el navegador proyecta automáticamente la nota médica escrita dentro de cada <ficha-mascota>.
  }
}

// R2. Componente: registramos el Custom Element con nombre con guion ('ficha-mascota')
// R5. Reutilización: esto permite que las múltiples instancias de <ficha-mascota> en index.html cobren vida
customElements.define('ficha-mascota', FichaMascota);
