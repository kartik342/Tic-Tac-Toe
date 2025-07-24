let boxes = document.querySelectorAll(".box");
let restartBtn = document.querySelector("#restart-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

let winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

let count = 0

// adding click event listener to all boxes on clicking
boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{

        if(turnO){ // player O trun
            box.textContent = "O";
            turnO = false;
        }
        else{    // player X turn
            box.textContent = "X";
            turnO = true;
        }
        box.disabled = true;

        let isWinner = checkWinner();

        if(!isWinner){
            count += 1;
            if(count === 9){
                drawGame();
            }
        }
    })
})

function drawGame(){
    disableBoxes();
    msg.innerText = `It is a Draw`;
    msgContainer.classList.remove("hide");
}
function restartGame(){
    count = 0;
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}
function enableBoxes(){
    for(let box of boxes){
        box.disabled = false;
        box.innerHTML = "";
    }
}
function disableBoxes(){
    for(let box of boxes){
        box.disabled = true;
    }
}

function showWinner(winner){
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");

    disableBoxes();
}

function checkWinner(){
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].textContent;
        let pos2Val = boxes[pattern[1]].textContent;
        let pos3Val = boxes[pattern[2]].textContent;

        if((pos1Val != "") && (pos2Val != "") && (pos3Val != "")){
            if((pos1Val === pos2Val) && (pos2Val === pos3Val)){
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
}

newGameBtn.addEventListener("click", restartGame);
restartBtn.addEventListener("click", restartGame);