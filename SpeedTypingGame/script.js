/* This JavaScript code snippet sets up a typing test game. Here's a breakdown of what the code does: */

let type_content = document.querySelector('.type-content p')
let input = document.querySelector('.type-content input')
let resetBtn = document.querySelector('.btn')
let toggleBtn = document.querySelector('#soundToggle')
let letterIndex = (mistakes = isTyping = 0)
let btnSound = new Audio('./assets/ting.mp3')
let gameOverSound = new Audio('./assets/gameover.mp3')
let backSound = new Audio('./assets/music.mp3')

let time;
let maxTime = 60; // 1 minute
let timeleft = maxTime;
let toggleBtnValue = true;

let t_left = document.querySelector('.t-left')
let error = document.querySelector('.error')
let wpm = document.querySelector('.wpm')
let cpm = document.querySelector('.cpm')

const loadPara = () => {
    let randomArticle = Math.floor(Math.random() * article.length)
    type_content.innerText = "";
    // console.log(article[randomArticle].split(''))
    article[randomArticle].split('').forEach((element) => {
        let realData = `<span>${element}</span>`
        type_content.innerHTML += realData
    })

    document.addEventListener('click', () => {
        input.focus();
    })
    document.addEventListener('keypress', () => {
        input.focus();
    })

}

input.addEventListener('input', (e) => {
    if (toggleBtnValue) {
        backSound.play()
    }
    let char = document.querySelectorAll('span')
    let inputValue = e.target.value.split('')[letterIndex]
    // console.log(inputValue)
    letterIndex++;
    if (!isTyping) {
        time = setInterval(timeSetup, 1000)
        isTyping = true;
    }

    if (letterIndex < char.length) {
        if (inputValue == null) {
            if (letterIndex > 0) {
                char[letterIndex].classList.remove('active')
                letterIndex--;
                char[letterIndex].classList.add('active')
                if (char[letterIndex].classList.contains('incorrect')) {
                    mistakes--;
                }
                char[letterIndex].classList.remove('correct', 'incorrect')
                // char[letterIndex-1].classList.add('active')
            }
        } else {
            // console.log(char[letterIndex].innerText)
            if (char[letterIndex].innerText == inputValue) {
                // console.log('Matched')
                char[letterIndex].classList.add('correct')
            } else {
                // console.log('notMatched')
                char[letterIndex].classList.add('incorrect')
                mistakes++;
                error.innerText = `Mistakes : ${mistakes}`
            }
        }
            char.forEach((e) => {
                //   console.log(e)  
                e.classList.remove('active')
            })
            char[letterIndex].classList.add('active')
    } else {
        clearInterval(time)
        input.value = "";
        if (toggleBtnValue) {
            gameOverSound.play()
        }
    }
});


/* `loadPara();` is a function in the JavaScript code snippet provided that is responsible for loading a random paragraph from the `article` array and displaying it on the webpage for the typing test game. */

loadPara();

/* The function `timeSetup` decreases the time left, updates the displayed time left, calculates words per minute (WPM), and updates the displayed WPM and characters per minute (CPM) based on certain conditions.*/

const timeSetup = () => {
    if (timeleft > 0) {
        timeleft--;
        t_left.innerText = `Time Left : ${timeleft}s`
        let wpmval = Math.floor(letterIndex - mistakes / 5 / (maxTime - timeleft) * 60)
        wpm.innerText = `WPM : ${wpmval}`
        cpm.innerText = `CPM : ${letterIndex - mistakes}`

    } else {
        clearInterval(time)
        input.value = "";
        if (toggleBtnValue) {
            gameOverSound.play()
        }
    }
}

resetBtn.addEventListener('click', () => {
    loadPara();
    clearInterval(time)
    letterIndex = mistakes = isTyping = 0;
    wpm.innerText = `WPM : 0`
    error.innerText = `Mistakes : 0`
    cpm.innerText = `CPM : 0`
    timeleft = maxTime;
    t_left.innerText = `Time Left : ${maxTime}`
    console.log(input.value)
    input.value = "";
    if (toggleBtnValue) {
        btnSound.play()
        backSound.pause()
    }
})

toggleBtn.addEventListener('click', () => {
    toggleBtnValue = !toggleBtnValue
    if (!toggleBtnValue) {
        btnSound.pause()
        backSound.pause()
    }
})