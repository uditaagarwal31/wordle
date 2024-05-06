$(()=> {
    const wordslist = [
        "abode", "bloom", "chirp", "dwarf", "ethos", "flint", "gawky", "havoc", "ideal", "jolly", "kneel", "lumen", "dirth", "nymph", "prism", "quark", "rover", "swoon", "drove", "ulcer", "vivid", "waltz", "yacht", "zebra", "amity", "bluff", "crisp", "droll", "birds", "grasp", "humor", "inlay", "bunto", "kneel", "femma", "bossy", "novel", "ombre", "pique", "quire", "rebar", "spunk", "thyme", "usher", "valor", "wryly", "yodel", "zesty", "agape", "brisk", "cleft", "droit", "equip", "flume", "gloat", "hoard", "jazzy", "koala", "lofty", "modem", "plumb", "quirk", "rerun", "shard", "unfed", "piper", "whack", "yucky", "zippy", "argon", "budge", "clank", "dusky", "elope", "flock", "hitch", "input", "joint", "knack", "femur", "mango", "notch", "oxide", "plush", "query", "rival", "scope", "tunic", "uncut", "vouch", "woven", "yeast", "aloft", "banjo", "cynic", "duvet", "flair", "gorge", "hovel", "irate",
        "align", "taste", "chase", "decoy", "eerie", "fable", "glide", "harsh", "inbox", "knack", "latch", "moose", "nerve", "onset", "paste", "quilt", "ranch", "siren", "tease", "undue", "feast", "witty", "yield", "adept", "badge", "crane", "dicey", "elude", "craft", "hinge", "joker", "karma", "lucid", "mimic", "noble", "orbit", "pause", "quiet", "renew", "salty", "towel", "upper", "vivid", "wince", "youth", "acrid", "bribe", "tower", "candy", "facet", "giddy", "heist", "infer", "livid", "niche", "occur", "proxy", "quest", "roast", "smelt", "tumor", "vegan", "worry", "young", "amble", "cabin", "eject", "flint", "groom", "hyena", "issue", "jumpy", "koala", "leapt", "merge", "naive", "opium", "pride", "quash", "relic", "stint", "tulip", "unity", "vault", "whirl", "yarns", "zesty", "angst", "champ", "towel", "event", "flora", "hoist", "jewel"];
    
    const guessedWords = [[]];
    let letterGuessesCount = 1;
    let randomIndex = Math.floor(Math.random() * 190);
    let word = wordslist[randomIndex];
    let moves = [];
    
    console.log(randomIndex);
    console.log(word);
    let wordGuessesCount = 1;

    createSquares(); // generates squares that would hold letter guesses 
    clickableKeys();

    function createSquares(){
        const gameBoard = document.getElementById("board");
        for(let i = 0; i < 30; i++){
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", i+1);
            gameBoard.appendChild(square);
        }
    }

    function currentGuessedWord(){
        return guessedWords[guessedWords.length-1];
    }

    function clickableKeys(){
        const keysFirstRow = document.getElementById("firstrow").querySelectorAll("button");

        for(let i = 0; i < keysFirstRow.length; i++){
            keysFirstRow[i].addEventListener("click", function() {
                let letter = keysFirstRow[i].id;
                console.log(letter);
                updateWord(letter);
                moves.push(letter);
            });
        }

        const keysSecondRow = document.getElementById("secondrow").querySelectorAll("button");

        for(let i = 0; i < keysSecondRow.length; i++){
            keysSecondRow[i].addEventListener("click", function() {
                let letter = keysSecondRow[i].id;
                updateWord(letter);
                moves.push(letter);
            });
        }

        const keysThirdRow = document.getElementById("thirdrow").querySelectorAll("button");
        

        for(let i = 0; i < keysThirdRow.length; i++){
            keysThirdRow[i].addEventListener("click", function() {
                let currentWord = currentGuessedWord();
                console.log("currentword", currentWord, currentWord.length);
                let letter = keysThirdRow[i].id;
                let lastMove = moves[moves.length-1];
                if(letter !== "ENTER" && letter !== "ERASE"){
                    updateWord(letter);
                    moves.push(letter);
                } else if (letter == "ENTER"){
                    checkWord();
                    moves.push(letter); 
                } else if (letter == "ERASE" && (lastMove !== "ENTER" || currentWord.length % 5 != 0 )){ // letter == "ERASE" && lastMove !== "ENTER"
                    eraseContent();
                    moves.pop();
                    moves.push(letter);
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
            letterGuessesCount++;
        }
    }

    function displayLetter(letter){
        const sq = document.getElementById(String(letterGuessesCount));
        sq.textContent = letter;
    }

    function eraseContent(){
        console.log(currentGuessedWord());
        const currentWord = currentGuessedWord().pop();
        console.log(currentGuessedWord());
        const sq = document.getElementById(String(letterGuessesCount-1));
        sq.textContent = '';
        letterGuessesCount--;
    }

    function checkWord(){
        const currentWord = currentGuessedWord().join('').toLowerCase();
        if(currentWord.length !== 5){
            return;
        }

        if(currentWord.length !== 5){ 
            console.log("wrong length");
        }
        if(word === currentWord){
            console.log("same!");
            checkLetters(currentWord);
            setTimeout(()=>{
                alert("You won YAY! The correct word is " + word);
            }, 1000);
        } else {
            console.log("wrong");
            checkLetters(currentWord);
            if(wordGuessesCount < 6){
                guessedWords.push([]);
            } 
            if(wordGuessesCount == 6){
                console.log("lost");
                setTimeout(()=>{
                    alert("You lost :( The correct word is " + word);
                }, 1000);
            }
            wordGuessesCount++;
        }
    }

    function checkLetters(currentWord){
        let startIndex = letterGuessesCount - 5;
        let time = 150;
        let upperCaseCurrentWord = currentWord.toUpperCase();
        for(let i = 0; i < currentWord.length; i++){
            let currentButtonLetter = document.getElementById(upperCaseCurrentWord[i]);
            setTimeout(()=>{
                let currentSq = document.getElementById(String(startIndex));
                currentSq.classList.add("animate__flipInX");
                if(currentWord[i] === word[i]){
                    currentSq.style = `background-color: green`;
                } else if (currentWord[i] !== word[i] && word.includes(currentWord[i])){
                    currentSq.style = `background-color: rgb(236, 202, 32)`;
                } else {
                    currentSq.style = `background-color: grey`;
                }
                startIndex++;
            }, time*i);
            if(currentWord[i] === word[i]){
                currentButtonLetter.style.backgroundColor = "green";
            } else if (currentWord[i] !== word[i] && word.includes(currentWord[i])){
                currentButtonLetter.style.backgroundColor = "rgb(236, 202, 32)";
            } else {
                currentButtonLetter.style.backgroundColor = "rgb(40,40,40)";
            }
        }
    }

})