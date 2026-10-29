'use strict';
const storageKey = 'portfolio-focus-tasks';
let tasks = [];
let activeFilter = 'all';
const list = document.querySelector('#task-list');
const input = document.querySelector('#task-input');
try {
  const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (Array.isArray(stored)) tasks = stored.filter(task => task && typeof task.id === 'string' && typeof task.text === 'string' && typeof task.done === 'boolean');
} catch { /* La app también funciona en memoria. */ }
function save() {
  try { localStorage.setItem(storageKey, JSON.stringify(tasks)); }
  catch { document.querySelector('#storage-note').textContent = 'El almacenamiento está bloqueado: tus tareas durarán mientras mantengas esta página abierta.'; }
}
function render() {
  list.replaceChildren();
  const visible = tasks.filter(task => activeFilter === 'all' || (activeFilter === 'done' ? task.done : !task.done));
  visible.forEach(task => {
    const row = document.createElement('li');
    row.className = `task-row${task.done ? ' done' : ''}`;
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'; checkbox.checked = task.done;
    checkbox.addEventListener('change', () => { task.done = checkbox.checked; save(); render(); });
    const name = document.createElement('span'); name.textContent = task.text;
    label.append(checkbox, name);
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'task-delete'; remove.textContent = '×'; remove.setAttribute('aria-label', `Eliminar: ${task.text}`);
    remove.addEventListener('click', () => { tasks = tasks.filter(item => item.id !== task.id); save(); render(); input.focus(); });
    row.append(label, remove); list.append(row);
  });
  document.querySelector('#task-status').textContent = tasks.length ? `${tasks.filter(task => task.done).length} de ${tasks.length} tareas completadas. ${visible.length ? '' : 'No hay tareas en este filtro.'}` : 'Tu lista está lista para una nueva idea. Añade tu primera tarea.';
}
document.querySelector('#task-form').addEventListener('submit', event => {
  event.preventDefault(); const text = input.value.trim();
  if (!text) { input.value = ''; input.focus(); return; }
  tasks.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, text, done: false });
  input.value = ''; save(); render(); input.focus();
});
document.querySelectorAll('[data-task-filter]').forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.taskFilter;
  document.querySelectorAll('[data-task-filter]').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
  render();
}));
render();
