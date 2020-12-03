


//************** Подключение JSON файла */
var requestURL = 'questions.json';

//создаём новый экземпляр объекта запроса из конструктора XMLHttpRequest
var request = new XMLHttpRequest();

//открываем новый запрос, используя метод open()
request.open('GET', requestURL);

//здесь мы устанавливаем responseType в JSON, так что XHR знает, что сервер будет возвращать JSON 
request.responseType = 'json';
request.send();

//********* init - отрисовка экрана */
let header = document.querySelector('header');
let section = document.querySelector('section');
let question = document.querySelector('.question');
let picture = document.createElement('img');
    header.append(picture);
    picture.className = ('picture');

let resultScreen = document.querySelector('.resultScreen');
    

 //***************** работа с вопросами */    

 //ожидание ответа на возврат с сервера и работа с ним
request.onload = function() {
  let base = request.response;//сохраняем ответ на наш запрос
  baseQuestions = base.questions;
 
   let i = 0; //№ вопроса в Json
   let countRight = 0;  

    changeContent( i, baseQuestions[i].question, baseQuestions[i].answers, baseQuestions[i].picture );
      
       
        for (let j = 0; j < 3; j++) {

            answerEl = document.querySelector('.answer' + (j+1));

            answerEl.addEventListener('click', () => {
              
              countRight = check(baseQuestions[i].answers,baseQuestions[i].answerRight, j, i, baseQuestions, countRight);
              
              pause(i,baseQuestions, countRight); 
              i++ ;
              
            })

        } 
    } 




//*** Ф У Н К Ц И И ***/

function changeContent (i, question, answers, picture) {
  
  questionEl = document.querySelector('.question');
  questionEl.textContent = question;

  pictureEl = document.querySelector('.picture');
  pictureEl.src = picture;

  for (let j = 0; j < 3; j++) {
    answerEl = document.querySelector('.answer' + (j+1));
    answerEl.textContent = answers[j];
  }
  
return;
}

function check (answerEl, answerRight, j, i, baseQuestions, countRight ) { 
  console.log("чекаю countRight"+countRight);
  if (answerEl[j] === answerRight) {
    resultScreen.className = ('resultScreenRight');
    resultScreen.textContent = 'ПРАВИЛЬНО';
    countRight++;
    star(false);
  } else {
    resultScreen.className = ('resultScreenFalse');
    resultScreen.textContent = baseQuestions[i].PS;
    star(true);
  }
  
  return countRight;
}

function end(countRight) {
  
  section.remove();
  picture.remove();
 //$(".topic").remove();
  $(".question").remove();
  console.log('*** Опрос пройден ! ***');
  let endEl = document.createElement('div');
    header.append(endEl);
    endEl.className = ('end');
  let endTxt = document.createElement('p');
    endEl.append(endTxt);
    endTxt.className = ('endTxt');
    endTxt.textContent = "Правильных ответов - " + countRight + " из 8";
  let imgEnd = document.createElement('img');
   endEl.append(imgEnd);
    imgEnd.className = 'imgEnd';
  $(".imgEnd").attr("src", "img/end.png");

}

function pause(i,baseQuestions,countRight) {

  let pauseEl = document.createElement('div');
    header.append(pauseEl);
    pauseEl.className = ('pause');

    
    pauseEl.addEventListener('click', () => { 
      i++
      changeContent( i, baseQuestions[i].question, baseQuestions[i].answers,baseQuestions[i].picture);
        resultScreen.className = ('resultScreen'); 
        resultScreen.textContent = '';
        pauseEl.remove();
      
        if (i === 8) end(countRight);
      
      });
   
}

function star (result) {
 let starEl = document.createElement('img');
 starEl.className = "starEl";
 let topic = document.querySelector('.topic');
 topic.append(starEl);

  if (result) {
    starEl.src = "https://img.icons8.com/color/48/000000/star--v1.png";
  } else {
    starEl.src = "https://img.icons8.com/fluent/48/000000/star.png";
  }
}