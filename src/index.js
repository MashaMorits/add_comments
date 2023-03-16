import './main.scss';
import './index.html';
import '@fontsource/roboto/cyrillic-500.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'




let allComments = [] // массив объектов всех комментариев

let options = { // опции для даты
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric'
}



// получвем комментарии с кинопоиска
fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/409424/reviews?page=1&order=DATE_DESC', {
        method: 'GET',
        headers: {
            'X-API-KEY': '1e69d574-cb0e-42ba-ae2b-a8644817561a',
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(result => loadComments(result.items, 3))
    .catch(err => console.log(err))


// функция пушит в allComments объекты в заданном количестве count, которые мы получили с кинопоиска, оставив только свойства author, date, description
function loadComments(comments, count) {
    comments.forEach((comment, index) => {
        if (index < count) {
            let newComment = {  // новый объект из
                author: comment.author,
                date: comment.date,
                description: comment.description
            }

            allComments.push(newComment)
        }
    })

    printComments(allComments)
}


// функция добавления комментария 
function printComments(comments) {

    comments.map((comment) => {

        let printedComment = document.createElement('div')
        let date = new Date(comment.date)
        let commentDate = date.toLocaleString("ru", options)
        printedComment.className = 'comment'
        printedComment.innerHTML = `<div class="comment__top">
                                            <p class="name">${comment.author}</p>
                                            <div class="date">${commentDate}</div>
                                    </div>
                                    <p class="text">${comment.description}</p>
                                    <div class="comment__bottom">
                                    
                                        <svg id="del" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="48px" height="48px"><path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"/></svg>
                                        
                                        <?xml version="1.0" encoding="iso-8859-1"?>
                                        <svg id="like" fill="#000000" height="40px" width="40px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                                            viewBox="0 0 471.701 471.701" xml:space="preserve">
                                        <g>
                                            <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
                                                c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
                                                l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
                                                C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
                                                s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
                                                c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
                                                C444.801,187.101,434.001,213.101,414.401,232.701z"/>
                                        </g>
                                        </svg>
                                    </div>`

        commentsList.append(printedComment)

        // лайк/удаление комментария
        printedComment.addEventListener('click', (event) => {
            if (event.target.id === 'like') {
                event.target.classList.toggle('active')
            } else if (event.target.id === 'del' || event.target.closest('#del')) {
                event.target.closest('.comment').remove()
            }
        })
    })
}


let form = document.getElementById('newComment')

form.onsubmit = (event) => formSubmit(event)
form.onkeydown = (event) => {
    if (event.key == 'Enter') {
        formSubmit(event)
    }
}

function formSubmit(event) {
    event.preventDefault();
    validation(form)
}


// валидация формы    
let reqFields = form.querySelectorAll('[data-required]')  // массив всех обязательных для заполнения полей

function validation(form) {
    
    let isValid = false

    reqFields.forEach(element => {

        element.oninput = () => {
            element.closest('.field').classList.remove('error')
        }

        if (element.value.trim().length < 3) { // если введено меньше 3 символов (не считая пробелов), выводим ошибку
            element.closest('.field').classList.add('error')
            isValid = false
        } else {
            isValid = true
        }

    });

    if (isValid) success(form)
   
}


// добавление комментария, если форма валидная
function success(form) {
    let data
    let now = today.toLocaleTimeString('en-GB')

    data = [{
        author: form.author.value,
        date: ( form.date.value != '' ) ? form.date.value + 'T' + now : dateInput.max + 'T' + now,
        description: form.commentText.value
    }]

    printComments(data)

    reqFields.forEach(field => {
        field.value = ''
    })
}


// ограничение ввода даты сегодняшним днем
let today = new Date();
let dateInput = document.getElementById('start')
dateInput.value = dateInput.max = today.toISOString().split('T')[0]



// автоувеличение высоты textarea при вводе
let textarea = document.querySelector('textarea')

textarea.addEventListener('keyup', function () {
    if (this.scrollTop > 0) {
        this.style.height = this.scrollHeight + "px"
    }
})