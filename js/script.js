//Global variables
var score = 0;
var rows = 4;
var columns = 4;
var board=[];
var CELLSIZE=90;
var CELLGAP=5;
var GRIDSIZE=400;


//Constructor initialisation of constructor
function InitiationConstructor(){
    var boardObject=document.getElementById("board");
    boardObject.innerHTML="";
    boardObject.style.setProperty("--cell-size",`${CELLSIZE}px`);
    boardObject.style.setProperty("--grid-size",`${GRIDSIZE}px`);
    boardObject.style.setProperty("--cell-gap",`${CELLGAP}px`);    
}

// document.addEventListener('keydown', function(e) {
//     // To make sure it freezes the scroll when 
//     // the first two keypresses are "ArrowUp"
//     if (
//         keySequence[0] === 'ArrowUp' 
//         && keySequence[1] === 'ArrowUp' 
//         && e.key === 'ArrowDown'
//     ) {
//         e.preventDefault();
//     }
// });

//fectching and validating userInput
function getUserInput(){
   var val= document.getElementById("gridLength").value;
   if (val>=3 && val<=8){
    
    rows=val;
    columns=val;
    document.getElementById("DoNotShowGrid").innerText="";
    document.getElementById("board").style.setProperty("--size",`${val}`)
    generateGameBoard();
   }else{
    document.getElementById("DoNotShowGrid").innerText="Please Enter a Suitable Value Between 3 to 8";
    document.getElementById("board").innerHTML="";
    return;
   }
   
}

//generate Game Board by initialising constructor and board
function generateGameBoard() {

    generateDynamicBoard();
    InitiationConstructor();
    

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            MergeAndupdateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
   //generate random card on x-y plain metrix
    setRandomCard();
    setRandomCard();

}

//produce the matrix board of NXN
function generateDynamicBoard(){
    for(let i=0;i<rows;i++){
        var list=[];
        for(let j=0;j<columns;j++){
            list[j]=0;
        }
        board[i]=list;
    }
    console.log(board)
}

//used to update cards colors
function MergeAndupdateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("color"+num.toString());
            if (num==2048){
        if(!alert("Congrats! You Won")){window.location.reload();}
            }
        } else {
            tile.classList.add("color8192");
        }                
    }
}

document.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.code == "ArrowLeft") {
        shiftLeft();
        setRandomCard();
    }
    else if (e.code == "ArrowRight") {
        shiftRight();
        setRandomCard();
    }
    else if (e.code == "ArrowUp") {
        shiftUp();
        setRandomCard();

    }
    else if (e.code == "ArrowDown") {
        shiftDown();
        setRandomCard();
    }
    document.getElementById("score").innerText = score;
})

function filterZero(row){
    return row.filter(num => num != 0); 
}

function slide(row) {
    row = filterZero(row); 
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    } 
    row = filterZero(row); 
    while (row.length < columns) {
        row.push(0);
    }
    return row;
}

function shiftLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            MergeAndupdateTile(tile, num);
        }
    }
}

function shiftRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];        
        row.reverse();              
        row = slide(row)            
        board[r] = row.reverse();  
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            MergeAndupdateTile(tile, num);
        }
    }
}

function shiftUp() {
    for (let c = 0; c < columns; c++) {
        var row=[]
        for(let i=0;i<rows;i++){
            row[i]=board[i][c];
        }
        row = slide(row);
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            MergeAndupdateTile(tile, num);
        }
    }
}

function shiftDown() {
    for (let c = 0; c < columns; c++) {
        var row=[]
        for(let i=0;i<rows;i++){
            row[i]=board[i][c];
        }
        //console.log(row)
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            MergeAndupdateTile(tile, num);
        }
    }
}

function setRandomCard() {
    if (!hasEmptyTile()) {
        if(!alert("oops!you Lose , You cannot move further in the game")){window.location.reload();}
        return;
    }
    let available = false;
    while (!available) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            available = true;
            // MergeAndupdateTile(tile,board[r][c])
        }
    }
}

//function to check if we will have space left in grid
function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { 
                return true;
            }
        }
    }
    return false;
}