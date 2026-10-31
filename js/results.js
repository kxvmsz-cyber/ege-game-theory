// Локальное хранение без сервера.
const STORAGE_KEY='game-theory-ege-results-v1';
const tbody=document.querySelector('#results-body');
const status=document.querySelector('#results-status');
const button=document.querySelector('#refresh-results');
function loadResults(){
 tbody.replaceChildren();
 try {
  const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
  const data=(Array.isArray(parsed)?parsed:[]).slice().sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
  status.textContent=data.length?`Результатов в этом браузере: ${data.length}`:'Пока нет результатов в этом браузере. Пройдите тест!';
  data.forEach((item,index)=>{
   const tr=document.createElement('tr');const date=new Date(item.created_at);
   [index+1,item.name,`${item.score} / ${item.total}`,Number.isNaN(date.getTime())?'—':date.toLocaleString('ru-RU')].forEach(value=>{
    const td=document.createElement('td');td.textContent=String(value);tr.append(td);
   });tbody.append(tr);
  });
 }catch(error){status.textContent='Не удалось прочитать результаты из браузера.';}
}
button.addEventListener('click',loadResults);loadResults();
