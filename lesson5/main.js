/* All answer options*/
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');
      
/* All our options */
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'); //питання

const numberOfQuestion = document.getElementById('number-of-question'); //номер питання
numberOfAllQuestions = document.getElementById('number-of-all-questions'); //кількість питань
      
let indexOfQuestion, //індекс поточного питання
    indexOfPage = 0; //індекс сторінки

const answersTracker = document.getElementById('answers-tracker'); //обгортка для трекера
const btnNext = document.getElementById('btn-next'); //кнопка дальше

let score = 0; //Поточний езультат вікторини

const correctAnswer = document.getElementById('correct-answer'); //кількість правильних відповідей
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2') // кількість всіх запитань у модальному вікні
      btnTryAgain = document.getElementById('btn-try-again'); //кнопка почати вікторину заново

const questions = [
    {
        question: 'Яка столиця України?',
        options: [
            'Лондон',
            'Варшава',
            'Київ',
            'Стокгольм'
        ],
        rightAnswear: 3
    },
    {
        question: 'Яка столиця Фінляндії?',
        options: [
            'Осло',
            'Гельсінкі',
            'Берн',
            'Рим'
        ],
        rightAnswear: 2
    },
    {
        question: 'Яка столиця Швейцарії?',
        options: [
            'Берн',
            'Варшава',
            'Берлін',
            'Париж'
        ],
        rightAnswear: 1
    },
    {
        question: 'Яка столиця Польщі?',
        options: [
            'Вашингтон',
            'Брюсель',
            'Варшава',
            'Прага'
        ],
        rightAnswear: 3
    },
    {
        question: 'Яка столиця Канади?',
        options: [
            'Осло',
            'Оттава',
            'Прага',
            'Вільнюс'
        ],
        rightAnswear: 2
    }
];

numberOfAllQuestions.innerHTML = questions.length; //Виводимо кількість запитань

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; //саме ж запитання

    //завантажуємо відповіді

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; //встановлення номера поточної сторінки
    indexOfPage++; //збільшуємо індекс сторінки
}; 

let completedAnswears = []; //Масив для питань, які вже були поставлені

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; //якір для перевірки однакових запитань

        //Перевірка рандомних чисел чи не попадалося вже питання
    if (indexOfPage == questions.length) {
        quizOver();
    } else {
        if (completedAnswears.length > 0) {
            completedAnswears.forEach(item => {
                if (item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if (completedAnswears.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswears.push(indexOfQuestion);
};

//Перевіряємо яка відповідь вибрана
const checkAnswer = el => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswear) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

for (option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

 const disabledOptions = () => {
        optionElements.forEach(item => {
            item.classList.add('disabled');
            if (item.dataset.id == questions[indexOfQuestion].rightAnswear) {
                item.classList.add('correct');
            }
        })
    }

//Робимо кнопку next, зачищаємо класи та змінюємо питання

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

//Перевірка чи вибраний варіант
const validate = () => {
    if (!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа');
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', ()=> {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});