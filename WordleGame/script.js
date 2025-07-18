
let height = 6;
let width = 5;

let row = 0;
let col = 0;

let gameOver = false;

let wordList = ['allow','apply','allot','mango','first','money']
let gusseList = ['allow','apply','allot','mango','first','money','green','india']

gusseList = gusseList.concat(wordList)

let word = wordList[Math.floor(Math.random()*wordList.length)].toUpperCase()
console.log(word)

window.onload = function(){
    initialize();
}

function initialize(){
    for(r = 0; r<height; r++){
        for(c = 0; c<width; c++){
            let tile = document.createElement('span')
            tile.id = r.toString()+'-'+c.toString();
            tile.classList.add("tile")
            tile.innerText="";
            document.getElementById("container").appendChild(tile)
        }
    }
    // keyboard
    let keyboard = [
        ["Q","W","E","R","T","Y","U","I","O","P"],
        ["A","S","D","F","G","H","J","K","L"," "],
        ["Enter","Z","X","C","V","B","N","M","<="]
    ]
    for(let i=0; i<keyboard.length; i++){
        let currRow = keyboard[i]
        let keyboardRow = document.createElement("div")
        keyboardRow.classList.add('keyboard-row')

        for(let j=0; j<currRow.length; j++){
            let keyTile = document.createElement("div")
            let key = currRow[j]
            keyTile.innerText = key;
            if(key == "Enter"){
                keyTile.id = "Enter";
                keyTile.classList.add("enter-key-tile")
            }
            else if(key == "<="){
                keyTile.id = "Backspace";
                keyTile.classList.add("key-tile")
            }
            else if("A"<= key && key <= "Z"){
                keyTile.id = "key" + key;
                keyTile.classList.add("key-tile")
            }
            keyTile.addEventListener('click',processKey)
            keyboardRow.appendChild(keyTile)
        }
        document.body.appendChild(keyboardRow)
    }
    document.addEventListener('keyup',(e)=>{
        processInput(e)
    })
}

function processKey(e){
    /* The line `e = {"code" : this.id}` is creating a new object `e` with a property `code` and
    setting its value to the `id` of the element that triggered the event. */
    e = {"code" : this.id}
    // console.log(e.code)
    processInput(e);
}

function processInput(e){
    if(gameOver) return;

    if("keyA" <= e.code && e.code <= "keyZ"){
        if(col < width){
            let currTile = document.getElementById(row.toString()+"-"+col.toString())
            console.log(currTile)
            if(currTile.innerText == ""){
                /* `e.code[3]` is accessing the fourth character of the `code`. */
                currTile.innerText = e.code[3];
                col+=1;
            }
        }
    }
    else if(e.code == "Backspace"){
        if(0 < col && col < width){
            col-=1;
        }
            let currTile = document.getElementById(row.toString()+"-"+col.toString())
            currTile.innerText == "";
    }
    else if(e.code == "Enter"){
        update();
    }
    if(!gameOver && row==height){
        gameOver = true;
        document.getElementById("answer").innerText = word
    }
}

function update(){
    let guess = "";
    document.getElementById("answer").innerText = "";

    for(let col=0; col < width; col++){
        let currTile = document.getElementById(row.toString()+"-"+col.toString())
        console.log(currTile)
        let letter = currTile.innerText;
        guess += letter;
    }

    guess = guess.toLowerCase();
    console.log("guess : "+ guess)

    if(!gusseList.includes(guess)){
    document.getElementById("answer").innerText = "Not in word list";
    return;
    
    }

    let correct = 0;
    let letterCount = {}

    for( let i = 0; i < word.length; i ++){
        let letter = word[i]
        if(letterCount[letter]){
            letterCount[letter]+=1;
        }
        else{
            letterCount[letter] = 1;
        }
    }
    console.log(letterCount)

    for(let col=0;col<width;col++){
        let currTile = document.getElementById(row.toString()+"-"+col.toString())
        let letter = currTile.innerText;

        if(word[c] == letter){
            currTile.classList.add("correct");

            let keyTile = document.getElementById("key" + letter);
            keyTile.classList.remove("present")
            keyTile.classList.add("correct")
            correct += 1;
            letterCount[letter]-=1;
        }
        if(correct == width){
            gameOver = true;
        }
    }
    console.log(letterCount);

    for(let col=0;col<width;col++){
        let currTile = document.getElementById(row.toString()+"-"+col.toString())
        let letter = currTile.innerText;

        if(!currTile.classList.contains("correct")){
            if(word.includes(letter)&& letterCount[letter]>0){
                currTile.classList.add("present");

                let keyTile = document.getElementById("key"+ letter)
                if(keyTile.classList.contains("correct")){
                    keyTile.classList.add("present");
                }
                letterCount[letter] -= 1;
            }
            else{
                currTile.classList.add("absent")
                let keyTile = document.getElementById("key"+ letter)
                keyTile.classList.add("absent")
            }
        }
    }
    row += 1;
    col = 0;
}