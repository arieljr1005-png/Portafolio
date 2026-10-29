'use strict';
// Añade nuevas obras en este arreglo. No se conecta a ningún servicio externo.
const books = [
  { title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes', genre: 'Novela', symbol: 'Q', description: 'Aventuras, ideales y una mirada ingeniosa al mundo.' },
  { title: 'Rimas', author: 'Gustavo Adolfo Bécquer', genre: 'Poesía', symbol: 'R', description: 'Una colección de poemas sobre el amor y la creación.' },
  { title: 'La vida es sueño', author: 'Pedro Calderón de la Barca', genre: 'Teatro', symbol: 'V', description: 'Libertad, destino y realidad se encuentran en escena.' },
  { title: 'Marianela', author: 'Benito Pérez Galdós', genre: 'Novela', symbol: 'M', description: 'Una historia sobre la belleza, los afectos y los prejuicios.' }
];
let genre = 'todos';
const search = document.querySelector('#book-search');
const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
function renderBooks() {
  const query = normalize(search.value.trim());
  const results = books.filter(book => (genre === 'todos' || book.genre === genre) && normalize(`${book.title} ${book.author}`).includes(query));
  const grid = document.querySelector('#book-grid'); grid.replaceChildren();
  results.forEach(book => {
    const article = document.createElement('article'); article.className = 'book';
    const cover = document.createElement('div'); cover.className = 'book-cover'; cover.textContent = book.symbol; cover.setAttribute('aria-hidden', 'true');
    const title = document.createElement('h2'); title.textContent = book.title;
    const author = document.createElement('p'); author.textContent = `${book.author} · ${book.genre}`;
    const description = document.createElement('p'); description.textContent = book.description;
    article.append(cover, title, author, description); grid.append(article);
  });
  document.querySelector('#book-status').textContent = results.length ? `${results.length} obras encontradas.` : 'No hay resultados. Prueba otro título, autor o género.';
}
search.addEventListener('input', renderBooks);
document.querySelectorAll('[data-genre]').forEach(button => button.addEventListener('click', () => {
  genre = button.dataset.genre;
  document.querySelectorAll('[data-genre]').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
  renderBooks();
}));
renderBooks();
