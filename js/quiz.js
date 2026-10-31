// Вопросы для мини-теста (авторские, по материалу разделов «Теория» и «Разбор»).

const questions = [
 {q:'Что означает «выигрышная стратегия»?', options:['Победа при любом поведении соперника','Победа только при ошибке соперника','Максимально короткая партия','Первый ход всегда приводит к победе'],a:0,why:'Стратегия гарантирует победу при любых допустимых ходах соперника.'},
 {q:'Что делает функция any(h) в рекурсивном решении?',options:['Проверяет, что выигрышен каждый ход','Проверяет, есть ли хотя бы один подходящий ход','Считает количество камней','Завершает игру'],a:1,why:'На своём ходу достаточно выбрать хотя бы один ведущий к победе вариант.'},
 {q:'Что означает all(h) в анализе ходов противника?',options:['Существует единственный ход','Все возможные продолжения удовлетворяют условию','Партия закончена','Число камней чётное'],a:1,why:'Условие должно сохраняться при любом ответе соперника.'},
 {q:'В какой момент заканчивается игра №25358?',options:['При количестве камней больше 100','При количестве камней не менее 125','Когда куча ровно 124','После четвёртого хода'],a:1,why:'По условию игры порог равен 125 камням.'},
 {q:'Какие ходы разрешены в задаче №22066?',options:['Только прибавить 2 в любую кучу','Прибавить 3 в любую кучу или удвоить любую кучу','Переложить 3 между кучами','Удвоить сумму двух куч'],a:1,why:'Разрешены +3 и ×2 для любой одной из двух куч.'},
 {q:'Что проверяет базовый случай if a + b >= 100 в игре №22066?',options:['Достижение конечной позиции','Количество рекурсивных вызовов','Чётность количества камней','Допустимость первого хода'],a:0,why:'Игра завершена, когда суммарно камней не меньше 100.'},
 {q:'Для задания 20 обычно ищут позицию, где Петя...',options:['Гарантированно побеждает первым ходом','Может победить вторым ходом, но не первым','Обязательно проигрывает первым ходом','Имеет ровно один допустимый ход'],a:1,why:'Нужна выигрышная стратегия на втором ходе без возможности выиграть первым.'},
 {q:'Какой результат для задания 19 у задачи №31483 указан в разборе?',options:['10','11','12','13'],a:3,why:'В предоставленном материале ответ к заданию 19 — 13.'}
];
const form=document.querySelector('#quiz-form');
const result=document.querySelector('#quiz-result');
const saveForm=document.querySelector('#save-form');
questions.forEach((item,i)=>{
 const fieldset=document.createElement('fieldset');fieldset.className='quiz-question';
 const legend=document.createElement('legend');legend.textContent=`${i+1}. ${item.q}`;fieldset.append(legend);
 item.options.forEach((option,j)=>{
   const label=document.createElement('label');label.className='option';
   const input=document.createElement('input');input.type='radio';input.name=`q${i}`;input.value=String(j);input.required=true;
   const span=document.createElement('span');span.textContent=option;label.append(input,span);fieldset.append(label);
 });form.insertBefore(fieldset, form.querySelector('button[type="submit"]'));
});
let latestScore=null;
form.addEventListener('submit',e=>{
 e.preventDefault(); let score=0;
 document.querySelectorAll('.quiz-question').forEach((fieldset,i)=>{
   const choice=fieldset.querySelector('input:checked');
   if(Number(choice.value)===questions[i].a) score++;
   fieldset.classList.toggle('correct', Number(choice.value)===questions[i].a);
   fieldset.classList.toggle('incorrect',Number(choice.value)!==questions[i].a);
   let feedback=fieldset.querySelector('.feedback');
   if(!feedback){feedback=document.createElement('p');feedback.className='feedback';fieldset.append(feedback);}
   feedback.textContent=`Ответ: ${questions[i].options[questions[i].a]}. ${questions[i].why}`;
   fieldset.querySelectorAll('input').forEach(input=>input.disabled=true);
 });
 latestScore=score; result.hidden=false;saveForm.hidden=false;
 result.textContent=`Ваш результат: ${score} из ${questions.length}. Посмотрите объяснения под вопросами и сохраните результат.`;
 form.querySelector('button[type="submit"]').hidden=true;result.scrollIntoView({behavior:'smooth',block:'center'});
});
const STORAGE_KEY = 'game-theory-ege-results-v1';
saveForm.addEventListener('submit',e=>{
 e.preventDefault();
 if(latestScore===null)return;
 const button=saveForm.querySelector('button');
 const status=document.querySelector('#save-status');
 const name=document.querySelector('#student-name').value.trim();
 if(!name || name.length>60){status.textContent='Введите имя до 60 символов.';return;}
 try {
   const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
   const records=Array.isArray(parsed)?parsed:[];
   records.push({id:Date.now(),name,score:latestScore,total:questions.length,created_at:new Date().toISOString()});
   localStorage.setItem(STORAGE_KEY,JSON.stringify(records));
   button.disabled=true;saveForm.querySelector('input').disabled=true;
   status.textContent='✓ Результат сохранён в этом браузере. Он появится на странице «Результаты».';
 } catch(error) {
   status.textContent='Не получилось сохранить результат. Возможно, хранение данных в браузере отключено.';
 }
});
