$(()=> {
    createSquares();
    clickableKeys();
})


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
            console.log(keysFirstRow[i].id);
        });
    }

    const keysSecondRow = document.getElementById("secondrow").querySelectorAll("button");

    for(let i = 0; i < keysSecondRow.length; i++){
        console.log("hii");
        keysSecondRow[i].addEventListener("click", function() {
            console.log(keysSecondRow[i].id);
        });
    }

    const keysThirdRow = document.getElementById("thirdrow").querySelectorAll("button");

    for(let i = 0; i < keysThirdRow.length; i++){
        console.log("hii");
        keysThirdRow[i].addEventListener("click", function() {
            console.log(keysThirdRow[i].id);
        });
    }
}
