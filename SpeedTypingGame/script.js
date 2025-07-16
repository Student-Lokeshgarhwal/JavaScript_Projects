
let type_content = document.querySelector('.type-content p')
let input = document.querySelector('.type-content input')
let btn  = document.querySelector('.btn')
let letterIndex = (mistakes = isTyping = 0)
let sound = new Audio('./assets/ting.mp3')
let sound1 = new Audio('./assets/gameover.mp3')
let sound2 = new Audio('./assets/music.mp3')

let time;
let maxTime = 60; // 1 minute
let timeleft = maxTime;

let t_left = document.querySelector('.t-left')
let error = document.querySelector('.error')
let wpm = document.querySelector('.wpm')    
let cpm = document.querySelector('.cpm')

const loadPara = ()=>{
    let randomArticle = Math.floor(Math.random()*article.length)
    type_content.innerText = "";
    // console.log(article[randomArticle].split(''))
    article[randomArticle].split('').forEach((element)=>{
        let realData = `<span>${element}</span>`
        type_content.innerHTML += realData
    })  

    document.addEventListener('click',()=>{
        input.focus();
    })
    document.addEventListener('keypress',()=>{
        input.focus();
    })

}

input.addEventListener('input',(e)=>{
    sound2.play()
    let char = document.querySelectorAll('span')
    let inputValue = e.target.value.split('')[letterIndex]
    // console.log(inputValue)
    letterIndex++;
    if(!isTyping){
        time = setInterval(timeSetup, 1000)
        isTyping = true;
    }

    if(letterIndex < char.length-1){
        if(inputValue == null){
            console.log('oops')
        }else{
            // console.log(char[letterIndex].innerText)
            if(char[letterIndex].innerText == inputValue){
                // console.log('Matched')
                char[letterIndex].style = 'color:green'
            }else{
                // console.log('notMatched')
                char[letterIndex].style = 'color:red'
                mistakes++;
                error.innerText = `Mistakes : ${mistakes}`
            }
        }
        char.forEach((e)=>{
        //   console.log(e)  
        e.classList.remove('active')
        })
        char[letterIndex].classList.add('active')
    }else{
        console.log('out')
    }
});


loadPara();

const timeSetup = ()=>{
    if(timeleft > 0){
        timeleft--;
        t_left.innerText = `Time Left : ${timeleft}s`
        let wpmval = Math.floor(letterIndex - mistakes / 5 / (maxTime - timeleft)*60)
        wpm.innerText = `WPM : ${wpmval}`
        cpm.innerText = `CPM : ${letterIndex - mistakes}`

    }
}

btn.addEventListener('click',()=>{
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
    sound.play()
})