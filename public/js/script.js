$(()=> {
    const guessedWords = [[]];
    let letterGuessesCount = 1;
    createSquares();
    clickableKeys();



    function createSquares(){
        const gameBoard = document.getElementById("board");
        for(let i = 0; i < 30; i++){
            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("id", i+1);
            gameBoard.appendChild(square);
        }
    }

    function clickableKeys(){
        const keysFirstRow = document.getElementById("firstrow").querySelectorAll("button");

        for(let i = 0; i < keysFirstRow.length; i++){
            console.log("hii");
            keysFirstRow[i].addEventListener("click", function() {
                let letter = keysFirstRow[i].id;
                console.log(letter);
                updateWord(letter);
            });
        }

        const keysSecondRow = document.getElementById("secondrow").querySelectorAll("button");

        for(let i = 0; i < keysSecondRow.length; i++){
            console.log("hii");
            keysSecondRow[i].addEventListener("click", function() {
                let letter = keysSecondRow[i].id;
                console.log(letter);
                updateWord(letter);
            });
        }

        const keysThirdRow = document.getElementById("thirdrow").querySelectorAll("button");

        for(let i = 0; i < keysThirdRow.length; i++){
            console.log("hii");
            keysThirdRow[i].addEventListener("click", function() {
                let letter = keysThirdRow[i].id;
                if(letter !== "ENTER" && letter !== "ERASE"){
                    console.log(letter);
                    updateWord(letter);
                } else if (letter == "ENTER"){
                    console.log("ente!r");
                } else if (letter == "ERASE"){
                    console.log("erase!r");
                    eraseContent();
                }

            
            });
        }
    }

    function currentGuessedWord(){
        return guessedWords[guessedWords.length-1];
    }

    function updateWord(letter){
        const currentWord = currentGuessedWord();
        const row = guessedWords.length;

        if(currentWord && currentWord.length < 5){
            currentWord.push(letter);
            displayLetter(letter);
            console.log(currentWord);
            console.log(letterGuessesCount);
            letterGuessesCount++;
        }
    }

    function displayLetter(letter){
        const sq = document.getElementById(String(letterGuessesCount));
        sq.textContent = letter;
        console.log(sq.textContent);
    }

    function eraseContent(){
        const sq = document.getElementById(String(letterGuessesCount));
        sq.textContent = " ";
        console.log(sq.textContent);
    }

})