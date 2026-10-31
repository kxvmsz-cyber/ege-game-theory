// ПР5: массив объектов — простая локальная база публикаций.
// ПР4: у каждой статьи есть собственный лайк и кнопка разворачивания текста.
const initialArticles = [
  {
    id: 1,
    title: 'Что такое выигрышная стратегия?',
    date: 'Учебная публикация',
    text: 'Выигрышная стратегия позволяет добиться победы независимо от действий соперника. В задачах ЕГЭ важно различать ход, на котором можно выиграть, и условие «при любом ходе противника». Если существует хотя бы один выгодный ход, достаточно выбрать его. Если рассматриваются все ответы соперника, необходимо проверить каждый возможный ответ.',
    tags: ['стратегия', 'победа', 'ЕГЭ']
  },
  {
    id: 2,
    title: 'Как устроена игра с кучами камней?',
    date: 'Учебная публикация',
    text: 'В задачах с кучами камней позиция задаётся одним числом S или парой (a, b). После каждого разрешённого действия получается новая позиция. Игра заканчивается при выполнении условия из задачи: например, когда сумма или произведение камней достигает порога. Все допустимые ходы нужно выписать из условия.',
    tags: ['кучи', 'ходы', 'правила']
  },
  {
    id: 3,
    title: 'Рекурсия на Python: any() и all()',
    date: 'Учебная публикация',
    text: 'Рекурсивная функция перебирает возможные игровые позиции. any() возвращает True, когда хотя бы один вариант подходит. all() возвращает True, только когда подходят все варианты. В решении игр с оптимальной стратегией выбор между этими функциями зависит от того, кто делает ход и какое условие требуется доказать.',
    tags: ['Python', 'рекурсия', 'any', 'all']
  }
];

const postsContainer = document.getElementById('postsContainer');
const searchInput = document.getElementById('searchInput');
const articleLikes = {};
const expandedArticles = new Set();

// ПР5: динамически создаём разметку, вместо трёх статичных article в HTML.
function renderArticles(articlesArray) {
  postsContainer.replaceChildren();
  if (articlesArray.length === 0) {
    const message = document.createElement('p');
    message.className = 'no-results';
    message.textContent = 'Ничего не найдено. Попробуйте другое слово.';
    postsContainer.append(message);
    return;
  }

  articlesArray.forEach(article => {
    const card = document.createElement('article');
    card.className = 'publication-card';
    const heading = document.createElement('h3');
    heading.textContent = article.title;
    const meta = document.createElement('p');
    meta.className = 'publication-meta';
    meta.textContent = article.date;
    const body = document.createElement('p');
    body.className = 'publication-text';
    body.textContent = article.text;
    if (!expandedArticles.has(article.id)) body.classList.add('short');

    const readMore = document.createElement('button');
    readMore.type = 'button';
    readMore.className = 'read-more-btn';
    readMore.textContent = expandedArticles.has(article.id) ? 'Свернуть' : 'Читать далее';
    readMore.addEventListener('click', () => {
      if (expandedArticles.has(article.id)) expandedArticles.delete(article.id);
      else expandedArticles.add(article.id);
      body.classList.toggle('short');
      readMore.textContent = expandedArticles.has(article.id) ? 'Свернуть' : 'Читать далее';
    });

    const footer = document.createElement('div');
    footer.className = 'publication-footer';
    const tags = document.createElement('span');
    tags.className = 'publication-tags';
    tags.textContent = article.tags.map(tag => '#' + tag).join(' ');
    const like = document.createElement('button');
    like.type = 'button';
    like.className = 'like-btn';
    like.setAttribute('aria-label', 'Поставить лайк публикации ' + article.title);
    like.textContent = '♥ Лайк (' + (articleLikes[article.id] || 0) + ')';
    like.addEventListener('click', () => {
      articleLikes[article.id] = (articleLikes[article.id] || 0) + 1;
      like.textContent = '♥ Лайк (' + articleLikes[article.id] + ')';
      like.classList.add('liked');
    });
    footer.append(tags, like);
    card.append(heading, meta, body, readMore, footer);
    postsContainer.append(card);
  });
}

// ПР5: живой поиск по заголовку, тексту и тегам (без учёта регистра).
searchInput.addEventListener('input', event => {
  const query = event.target.value.toLowerCase().trim();
  const filtered = initialArticles.filter(article =>
    [article.title, article.text, ...article.tags]
      .some(value => value.toLowerCase().includes(query))
  );
  renderArticles(filtered);
});

renderArticles(initialArticles);
