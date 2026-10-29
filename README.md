# Ariel · Portafolio personal

Portafolio académico y profesional estático, en español, construido con **HTML5, CSS3 y JavaScript puro**. Diseño responsive, modo claro y oscuro, navegación móvil, filtros de proyectos y animaciones suaves. Incluye dos pequeñas aplicaciones locales de ejemplo.

Los nombres, estudios, tecnologías, cursos y enlaces son **contenido de ejemplo**. Personalízalos antes de presentarlo como tu perfil. No se incluyen certificados ni un currículum ficticios: los botones muestran un aviso hasta que añadas tus documentos.

## Ejecutar

1. Descarga o conserva **toda** esta carpeta.
2. Abre `index.html` con un navegador actual (Chrome, Edge, Firefox o Safari).
3. Listo: no hay instalación, compilación, servidor, backend, base de datos ni claves privadas.

Todos los recursos visuales están guardados localmente. La tipografía utiliza fuentes del sistema. Los enlaces a redes y el correo abren servicios externos por decisión del visitante. La función de copiar correo depende de los permisos del navegador; si no está disponible, se muestra el correo para copiarlo manualmente.

## Estructura

```text
Portafolio web/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   ├── images/                 # Fotografía de ejemplo y favicon
│   ├── certificados/           # Vista previa y tus futuros PDF
│   ├── proyectos/              # Miniaturas SVG y demos estáticas
│   │   ├── tareas.html
│   │   ├── tareas.js
│   │   ├── biblioteca.html
│   │   ├── biblioteca.js
│   │   └── demo.css
│   └── cv/                     # Coloca aquí tu currículum
├── scripts/
│   └── verificar.mjs           # Comprobación opcional de archivos y rutas
├── .gitignore
└── README.md
```

## Cómo funciona

- **HTML:** estructura semántica con `header`, `nav`, `main`, `section`, `article` y `footer`. Las tarjetas están escritas en el HTML para que resulte fácil editarlas.
- **CSS:** variables de color en `:root`, composición con Grid y Flexbox, puntos de adaptación a tablets y móviles, efectos hover y estilos de foco para teclado. `prefers-reduced-motion` desactiva el movimiento cuando el usuario lo solicita.
- **JavaScript:** cambia el tema y trata de guardarlo en `localStorage`; controla el menú y sus atributos accesibles; filtra tarjetas; muestra avisos para documentos pendientes; copia el correo y observa las secciones con `IntersectionObserver`.
- **Focus:** crea, completa, elimina y filtra tareas. Almacena solo en el navegador, con manejo de almacenamiento bloqueado. No hay sincronización ni cuentas.
- **Biblioteca:** busca títulos y autores sin distinguir tildes o mayúsculas y combina la búsqueda con filtros de género. Los libros están en un arreglo local.

Si desactivas JavaScript, el contenido principal y la navegación siguen disponibles. Los filtros, avisos y demos necesitan JavaScript. En archivos `file://`, la persistencia puede variar según el navegador. No se usa `fetch`, módulos ni rutas absolutas del sistema.

## Personalizar tu información

### Nombre, fotografía y presentación

En `index.html`, reemplaza `Ariel`, `Ariel Apellido`, el título profesional, los textos de formación y los datos de ejemplo. Actualiza también `<title>`, la descripción y los textos alternativos.

Guarda tu foto en `assets/images/perfil.jpg` y cambia la etiqueta del inicio:

```html
<img src="assets/images/perfil.jpg"
     alt="Fotografía de Tu Nombre Completo" width="560" height="640">
```

### Colores

Edita las variables al principio de `css/styles.css`. La paleta oscura está en `:root[data-theme="dark"]`. El diseño usa fuentes instaladas en el equipo y no depende de Google Fonts.

### Habilidades

Edita las tarjetas dentro de `#habilidades`. Duplica un `article.skill-card` para incorporar otra categoría, o añade elementos `li` a sus etiquetas. Las habilidades no muestran porcentajes inventados.

### Añadir proyectos

1. Guarda una miniatura en `assets/proyectos/`.
2. Duplica un `article.project-card` dentro de `.projects-grid`.
3. Cambia imagen, `alt`, título, descripción, tecnologías y enlaces.
4. Establece `data-category="web"`, `data-category="javascript"` o ambos separados por un espacio.
5. Sustituye el enlace de repositorio por el real y **elimina `data-pending`** para que no aparezca el aviso.
6. Actualiza el contador visual `03` del botón «Todos» si cambia la cantidad de proyectos.

```html
<a href="https://github.com/TU_USUARIO/TU_REPOSITORIO"
   target="_blank" rel="noopener noreferrer">Repositorio ↗</a>
```

Para crear otra categoría, añade un botón con `data-filter="nombre"` y pon ese mismo nombre en `data-category` de las tarjetas correspondientes. El filtro combina categorías de una tarjeta mediante coincidencia exacta.

### Currículum PDF

Guarda tu PDF como `assets/cv/curriculum.pdf`. Reemplaza el enlace de CV por:

```html
<a class="button secondary"
   href="assets/cv/curriculum.pdf"
   data-document="assets/cv/curriculum.pdf"
   data-document-label="Currículum" download>
  Descargar CV <span aria-hidden="true">↓</span>
</a>
```

`href` hace que el enlace funcione incluso sin JavaScript; `download` solicita la descarga. Algunos navegadores pueden mostrar el PDF en su visor, desde donde también puede guardarse.

### Certificados y cursos

1. Guarda el PDF real en `assets/certificados/`, por ejemplo `curso-web.pdf`.
2. Guarda una imagen de vista previa en esa carpeta, por ejemplo `curso-web.jpg`.
3. Cambia la imagen, el nombre del curso, la institución y la fecha de la tarjeta.
4. Retira o cambia la etiqueta «EJEMPLO» cuando los datos sean reales.
5. Configura el enlace así:

```html
<a href="assets/certificados/curso-web.pdf"
   data-document="assets/certificados/curso-web.pdf"
   data-document-label="Certificado de desarrollo web"
   target="_blank" rel="noopener noreferrer">
  Ver certificado ↗
</a>
```

El documento se abre en otra pestaña usando el visor PDF del navegador. Si no existe un visor, el navegador puede descargarlo. Para añadir certificados, duplica un `article.certificate`.

### Contacto y redes

Busca `tu.correo@example.com` y reemplázalo en **tres lugares**: texto del enlace, `href="mailto:..."` y `data-email` del botón de copiar. Sustituye los enlaces genéricos de GitHub y LinkedIn por tus perfiles y elimina la nota de ejemplo. No hay formulario ni envío a un servidor.

## Pruebas

### Comprobación opcional de código

Si tienes Node instalado, puedes ejecutar las siguientes comprobaciones de desarrollo. **Node no se utiliza como servidor y no es necesario para abrir o publicar el sitio.**

```text
node scripts/verificar.mjs
node --check js/script.js
node --check assets/proyectos/tareas.js
node --check assets/proyectos/biblioteca.js
```

El verificador revisa archivos locales referenciados, identificadores duplicados y destinos de anclas, incluyendo las páginas de demo. Los enlaces marcados explícitamente como pendientes no se consideran archivos ausentes. No sustituye una prueba visual ni valida destinos de redes externos.

### Prueba manual en el navegador

- Abre `index.html` directamente, sin conexión: deben aparecer estilos e imágenes.
- Recorre las seis secciones usando el menú; revisa que los títulos no queden ocultos por la barra.
- Activa y desactiva el tema; recarga y comprueba que se conserva cuando el navegador permite almacenamiento.
- Reduce el ancho a 360 px, luego prueba 768 px y 1440 px: revisa el menú, las tarjetas y que no exista desplazamiento horizontal.
- En móvil, abre el menú, selecciona una sección y comprueba que se cierra. Prueba también Escape y un clic fuera.
- Filtra proyectos: Todos debe mostrar tres; Desarrollo web, dos; JavaScript, uno.
- Pulsa CV, certificados y repositorios pendientes: debe aparecer un aviso que puedas cerrar con botón o Escape.
- Tras añadir tus PDF, abre cada certificado y descarga el currículum; comprueba los archivos reales.
- Abre Focus, añade dos tareas, marca una, filtra, elimina y recarga. Si el navegador permite almacenamiento, la tarea restante debe conservarse.
- En la biblioteca, busca `becquer`: debe encontrar «Rimas». Combina con el género Teatro para comprobar el estado sin resultados.
- Prueba el correo, copiar y los enlaces a tus perfiles.
- Navega con Tab y Enter: el foco debe verse y los controles deben funcionar.
- Activa «reducir movimiento» en tu sistema: el contenido debe seguir visible.
- Abre la consola de desarrollador para detectar errores; repite la revisión después de publicar.

## Subir a GitHub y publicar

### Desde la web, sin terminal

1. Crea un repositorio público en tu cuenta de GitHub, por ejemplo `mi-portafolio`.
2. Usa **Add file → Upload files** y arrastra los archivos y carpetas del proyecto. `index.html` debe quedar en la raíz del repositorio; evita subir una carpeta envolvente adicional.
3. Guarda con **Commit changes**.
4. Abre **Settings → Pages** del repositorio.
5. En **Build and deployment → Source**, elige **Deploy from a branch**.
6. Selecciona la rama `main`, carpeta **/(root)** y pulsa **Save**.
7. Espera a que finalice el despliegue. Pages mostrará la dirección del sitio, normalmente `https://TU_USUARIO.github.io/mi-portafolio/`.

Consulta el procedimiento en la [documentación oficial de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

### Con Git, opcional

Si el repositorio remoto está vacío y esta carpeta todavía no tiene Git, ejecuta desde la carpeta del proyecto, sustituyendo `TU_USUARIO`:

```bash
git init
git add .
git commit -m "Crear portafolio personal"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/mi-portafolio.git
git push -u origin main
```

Luego activa Pages como se explica arriba. Para actualizar, edita los archivos, crea otro commit y haz push. GitHub volverá a publicar los cambios.

### Si una imagen o PDF no abre

Comprueba que esté subido, que la ruta sea relativa y que coincidan las mayúsculas y minúsculas del nombre. Por ejemplo, `Foto.jpg` y `foto.jpg` pueden funcionar de manera diferente en GitHub Pages. Usa `/` en las rutas HTML y evita rutas como `C:\Users\...` o rutas que empiecen por `/assets/`.

## Alcance de la entrega

El proyecto queda listo para personalizar y subir. No se ha creado un repositorio remoto ni se ha publicado. La comprobación automática revisa estructura, rutas y sintaxis; la verificación visual en el navegador de la herramienta quedó bloqueada porque no admite URLs `file://`. La lista anterior permite comprobar la presentación y las interacciones en tu navegador.
