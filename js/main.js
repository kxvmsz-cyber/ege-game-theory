// Общее меню и интерактивные элементы всех страниц.
const navToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(opened));
    navToggle.setAttribute('aria-label', opened ? 'Закрыть меню' : 'Открыть меню');
  });
}
const current = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('[data-nav] a').forEach(a => {
  if (new URL(a.href).pathname.split('/').pop() === current) { a.classList.add('active'); a.setAttribute('aria-current', 'page'); }
});
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

// Кнопки копирования используются на странице с решениями.
document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy]');
  if (!button) return;
  const code = document.getElementById(button.dataset.copy)?.textContent;
  if (!code) return;
  try {
    await navigator.clipboard.writeText(code);
    button.textContent = '✓ Скопировано';
  } catch {
    // Резервный механизм для localhost в старых браузерах.
    const field = document.createElement('textarea');
    field.value = code; document.body.append(field); field.select();
    const copied = document.execCommand('copy'); field.remove();
    button.textContent = copied ? '✓ Скопировано' : 'Не удалось скопировать';
  }
  setTimeout(() => button.textContent = 'Копировать код', 1800);
});


// ПР4: переключение светлой и тёмной тем оформления.
// Выбранный режим сохраняется между посещениями страниц.
const themeButton = document.getElementById('themeBtn');
const THEME_KEY = 'ege-game-theme';
function applyTheme(dark) {
  document.body.classList.toggle('dark-theme', dark);
  if (themeButton) {
    themeButton.textContent = dark ? '☀ Светлая тема' : '🌙 Тёмная тема';
    themeButton.setAttribute('aria-pressed', String(dark));
  }
}
try {
  applyTheme(localStorage.getItem(THEME_KEY) === 'dark');
} catch (error) {
  applyTheme(false);
}
if (themeButton) {
  themeButton.addEventListener('click', () => {
    const dark = !document.body.classList.contains('dark-theme');
    applyTheme(dark);
    try { localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light'); } catch (error) {}
  });
}
