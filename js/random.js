// ПР5: контент карточки создаётся JavaScript из данных js/tasks.js.
// В случайную подборку входят только 5 заданий, указанных преподавателем.
const randomIds = ['31483', '31482', '31157', '25358', '23759'];
const randomPool = randomIds.map(id => tasks.find(task => task.id === id)).filter(Boolean);
const target = document.getElementById('random-content');
const nextButton = document.getElementById('random-next');
let previousId = null;

function makeNode(tag, className = '', text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function showRandomTask() {
    if (!target || !randomPool.length) return;

    // Исключаем повтор одного и того же задания подряд.
    const available = randomPool.filter(task => task.id !== previousId);
    const chosen = available[Math.floor(Math.random() * available.length)] || randomPool[0];
    previousId = chosen.id;

    const article = makeNode('article', 'task-card random-result');
    article.append(makeNode('span', 'eyebrow', 'Задания 19, 20, 21'));
    article.append(makeNode('h2', '', `Задача №${chosen.id}`));
    article.append(makeNode('p', 'subtle', chosen.heading));
    article.append(makeNode('div', 'condition', chosen.condition));

    const questions = makeNode('div', 'questions');
    [chosen.question19, chosen.question20, chosen.question21].forEach((question, index) => {
        const paragraph = makeNode('p');
        paragraph.append(makeNode('strong', '', `Задание ${index + 19}. `));
        paragraph.append(document.createTextNode(question));
        questions.append(paragraph);
    });
    article.append(questions);

    const details = makeNode('details', 'solution');
    details.append(makeNode('summary', '', 'Показать ответы и Python-код'));
    const answerBox = makeNode('div', 'answers');
    chosen.answers.forEach((answer, index) => {
        answerBox.append(makeNode('span', 'answer', `№${index + 19}: ${answer}`));
    });
    details.append(answerBox);

    const codeHeader = makeNode('div', 'code-head');
    codeHeader.append(makeNode('span', '', chosen.codeOrigin || 'Python · решение из материалов'));
    const copyButton = makeNode('button', 'copy-btn', 'Копировать код');
    copyButton.type = 'button';
    copyButton.dataset.copy = 'random-code';
    codeHeader.append(copyButton);
    details.append(codeHeader);

    const pre = makeNode('pre', 'code');
    const code = makeNode('code', 'language-python', chosen.code);
    code.id = 'random-code';
    pre.append(code);
    details.append(pre);
    article.append(details);

    // Ссылка на банк КЕГЭ: само задание всегда доступно прямо на сайте.
    const source = makeNode('a', 'btn btn-secondary', 'Открыть в банке КЕГЭ ↗');
    source.href = 'https://kompege.ru/task';
    source.target = '_blank';
    source.rel = 'noopener noreferrer';
    article.append(source);
    const copyNumber = makeNode('button', 'copy-btn', 'Копировать № задачи');
    copyNumber.type = 'button';
    copyNumber.style.marginLeft = '10px';
    copyNumber.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(chosen.id);
            copyNumber.textContent = 'Номер скопирован ✓';
        } catch {
            copyNumber.textContent = `№ ${chosen.id}`;
        }
    });
    article.append(copyNumber);

    target.replaceChildren(article);
    if (window.hljs) window.hljs.highlightElement(code);
}

nextButton?.addEventListener('click', showRandomTask);
showRandomTask();
