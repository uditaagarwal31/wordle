

$(()=> {
    const wordslist = [
        "abode", "bloom", "chirp", "dwarf", "ethos", "flint", "gawky", "havoc", "ideal", "jolly", "kneel", "lumen", "mirth", "nymph", "opine", "prism", "quark", "rover", "swoon", "trove", "ulcer", "vivid", "waltz", "xenon", "yacht", "zebra", "amity", "bluff", "crisp", "droll", "exult", "fjord", "grasp", "humor", "inlay", "junto", "knoll", "lemma", "mossy", "novel", "ombre", "pique", "quire", "rebar", "spunk", "thyme", "usher", "valor", "wryly", "yodel", "zesty", "agape", "brisk", "cleft", "droit", "equip", "flume", "gloat", "hoard", "islet", "jazzy", "koala", "lofty", "modem", "nadir", "olden", "plumb", "quirk", "rerun", "shard", "tryst", "unfed", "viper", "whack", "xylem", "yucky", "zippy", "argon", "budge", "clank", "dusky", "elope", "fleck", "glyph", "hitch", "input", "joint", "knack", "lemur", "mango", "notch", "oxide", "plush", "query", "rival", "scamp", "tunic", "uncut", "vouch", "woven", "yeast", "zonal", "aloft", "banjo", "cynic", "duvet", "ennui", "flair", "gorge", "hovel", "irate", "junto",
        "align", "baste", "chase", "decoy", "eerie", "fable", "glide", "harsh", "inbox", "juror", "knack", "latch", "moose", "nerve", "onset", "paste", "quilt", "ranch", "siren", "tease", "undue", "vista", "witty", "yield", "zonal", "adept", "badge", "crane", "dicey", "elude", "feign", "graft", "hinge", "idyll", "joker", "karma", "lucid", "mimic", "noble", "orbit", "pause", "quiet", "renew", "salty", "towel", "upper", "vivid", "wince", "xeric", "youth", "zealot", "acrid", "bribe", "cower", "dandy", "easel", "facet", "giddy", "heist", "infer", "junto", "knoll", "livid", "maxim", "niche", "occur", "proxy", "quest", "roast", "smelt", "tumor", "udder", "vegan", "worry", "xenon", "young", "zilch", "amble", "bison", "cabin", "diode", "eject", "flint", "groom", "hyena", "issue", "jumpy", "koala", "leapt", "merge", "naive", "opium", "pride", "quash", "relic", "stint", "tulip", "unity", "vault", "whirl", "xenon", "yarns", "zesty", "angst", "blitz", "champ", "dowel", "event", "flora", "gauze", "hoist", "impel", "jewel"];
    const guessedWords = [[]];
    let letterGuessesCount = 1;
    let randomIndex = Math.floor(Math.random() * 200);
    let word = wordslist[randomIndex];
    let moves = [];
    
    console.log(randomIndex);
    console.log(word);
    let wordGuessesCount = 1;

    createSquares();
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
            console.log("hii");
            keysFirstRow[i].addEventListener("click", function() {
                let letter = keysFirstRow[i].id;
                console.log(letter);
                updateWord(letter);
                moves.push(letter);
            });
        }

        const keysSecondRow = document.getElementById("secondrow").querySelectorAll("button");

        for(let i = 0; i < keysSecondRow.length; i++){
            console.log("hii");
            keysSecondRow[i].addEventListener("click", function() {
                let letter = keysSecondRow[i].id;
                console.log(letter);
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
                console.log("lastmove", lastMove, moves.length);
                if(letter !== "ENTER" && letter !== "ERASE"){
                    console.log(letter);
                    updateWord(letter);
                    moves.push(letter);
                } else if (letter == "ENTER"){
                    console.log("ente!r");
                    console.log(letterGuessesCount);
                    checkWord();
                    console.log(letterGuessesCount);
                    moves.push(letter); // if last move is enter but length not 5, last move letter == "ERASE" && (lastMove === "ENTER" && currentWord.length % 5 != 0 )
                } else if (letter == "ERASE" && (lastMove !== "ENTER" || currentWord.length % 5 != 0 )){ // letter == "ERASE" && lastMove !== "ENTER"
                    console.log("erase!r");
                    console.log(currentWord.length);
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
        console.log(currentGuessedWord());
        const currentWord = currentGuessedWord().pop();
        console.log(currentGuessedWord());
        const sq = document.getElementById(String(letterGuessesCount-1));
        sq.textContent = '';
        console.log(sq.textContent);
        letterGuessesCount--;
        console.log(letterGuessesCount);
    }

    function checkWord(){
        const currentWord = currentGuessedWord().join('').toLowerCase();
        if(currentWord.length !== 5){
            return;
        }
        console.log(word);
        console.log(currentWord);
        if(currentWord.length !== 5){ // change this 
            console.log("wrong length");
        }
        if(word === currentWord){
            console.log("same!");
            checkLetters(currentWord);
            // alert("You won YAY! The correct word is " + word);
        } else {
            console.log("wrong");
            checkLetters(currentWord);
            if(wordGuessesCount < 6){
                guessedWords.push([]);
                
                console.log("word guess coynt", wordGuessesCount);
            } 
            if(wordGuessesCount == 6){
                console.log("lost");
                alert("You lost :( The correct word is " + word);
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
                    console.log("match", currentWord[i]);
                    currentSq.style = `background-color: green`;
                  //  currentButtonLetter.style.backgroundColor = "green";
                } else if (currentWord[i] !== word[i] && word.includes(currentWord[i])){
                    currentSq.style = `background-color: rgb(236, 202, 32)`;
                  //  currentButtonLetter.style.backgroundColor = "grey";
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
                currentButtonLetter.style.backgroundColor = "grey";
            }


            // let currentSq = document.getElementById(String(startIndex));
            // currentSq.classList.add("animate__flipInX");
            
            // if(currentWord[i] === word[i]){
            //     console.log("match", currentWord[i]);
            //     currentSq.style = `background-color: green`;
            // } else {
            //     currentSq.style = `background-color: grey`;
            // }
            // startIndex++;
        }
    }

})