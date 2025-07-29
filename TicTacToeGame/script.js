console.log("js")
let music = new Audio("assets/music.mp3")
let audioTurn = new Audio("assets/ting.mp3")
let gameover = new Audio("assets/gameover.mp3")

let turn = "X";
let isgameover = false;
let btn = document.getElementById('reset')
let boxes = document.getElementsByClassName("box")
let info = document.getElementsByClassName('info')
let boxtext = document.getElementsByClassName('boxtext')

// Change turns
const changeTurn = () => {
    return (turn === "X" ? "0" : "X")
}

//  Check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext")
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    wins.forEach((e) => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== '')) {
            document.querySelector('.info').innerText = `${boxtext[e[0]].innerText} Won`
            gameover.play()
            music.play()
            document.getElementById('gif').style.width = '90px'
            isgameover = true
            Array.from(boxes).forEach((element) => {
                let boxtext = element.querySelector('.boxtext');
                element.addEventListener('click', (e) => {
                    if (boxtext.innerText === '') {
                        boxtext.innerText = '-';
                    }
                })
            })

        }
    })
}

//  Game logic
Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', (e) => {
        if (boxtext.innerText === '' && (isgameover != true)) {
            boxtext.innerText = turn;
            turn = changeTurn()
            audioTurn.play()
            checkWin()
            if (!isgameover) {
                info[0].innerText = `Turn for ${turn}`
            }
        }
    })
})

btn.addEventListener('click', () => {
    Array.from(boxtext).forEach((e) => {
        e.innerText = ""
    })
    turn = "X"
    isgameover = false
    info[0].innerText = `Turn for ${turn}`
    document.querySelector('.info').innerText = ``
    document.getElementById('gif').style.width = '0px'
    music.pause()
})

let toggleBtn = document.querySelector(".btn")
let light = true;
toggleBtn.addEventListener('click', () => {
    if (light) {
        document.body.classList.remove('light-mode')
        document.body.classList.add('dark-mode')
        Array.from(boxes).forEach((box) => {
            box.style.borderColor = 'white'; // Set border color for dark mode
        });
        toggleBtn.style.backgroundColor = 'white'; // Set background color for dark mode
        toggleBtn.style.color = 'black'; // Set background color for dark mode
        document.getElementById("mode").innerText = "Light";
        light = !light;
    }
    else {
        document.body.classList.remove('dark-mode')
        document.body.classList.add('light-mode')
        Array.from(boxes).forEach((box) => {
            box.style.borderColor = 'black'; // Set border color for dark mode
        });
        toggleBtn.style.backgroundColor = 'black'; // Set background color for dark mode
        toggleBtn.style.color = 'white'; // Set background color for dark mode
        document.getElementById("mode").innerText = "Dark";
        light = true;

    }
})


