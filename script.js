const area = document.getElementsByClassName('box-wrapper');
const boxItems = document.querySelectorAll('.box-item');
let currrentPlayer = document.getElementById('current-player');
const curPlayerContainer = document.querySelector('.currentPlayer');
const restartBtn = document.querySelector('.btn-restart');

let player = 'X';
const winCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let statistics = {
    'X': 0,
    '0': 0,
    'Draw': 0
}

for(let i = 0; i < boxItems.length; i++){
    boxItems[i].setAttribute('index', i);
} 

for(let i = 0; i < boxItems.length; i++){
    boxItems[i].addEventListener('click', boxItemsClick, false)
}   

function boxItemsClick () {
    let arr = [];
    curPlayerContainer.style.display = 'block';

    if(!this.innerHTML){
        this.innerHTML = player;
    }
    else{
        alert("Сhoose another one!)");
        return;
    }

    for(let i in boxItems){
        if(boxItems[i].innerHTML == player){
            arr.push(parseInt(boxItems[i].getAttribute('index')));
        }
    }

    if(checkWin(arr)) { 
        statistics[player] += 1;
        restart('Winner: ' + player);
    }
    if(!checkWin(arr)){
        let draw = true;
        let temp=0;
        for(let i in boxItems){
            if(boxItems[i].innerHTML == '') draw=false;
            if(i==8 && draw == true){
                statistics.Draw += 1;
            restart('Draw');
            }
        }

        if(draw) {
            statistics.Draw += 1;
            restart('Draw');
        }
    }

    if(player == 'X'){
        player ='0';
    }else player = 'X';
    currrentPlayer.innerHTML = player;
    
}


function checkWin(arr) {
    for(let i in winCombinations){
        let win = true;
        for(let j in winCombinations[i]){
            let id = winCombinations[i][j];
            let ind = arr.indexOf(id);

            if(ind == -1){
                win = false;
            }
        }
        if(win) return true;
    }
    return false;
}

function restart (message='Restart?') {
    alert(message);
    curPlayerContainer.style.display = 'none';
    for(let i in boxItems){
        boxItems[i].innerHTML = '';
    }
    updateSt();
}

function updateSt() {
    document.getElementById('countX').innerHTML = statistics.X;
    document.getElementById('countO').innerHTML = statistics[0];
    document.getElementById('countDraw').innerHTML = statistics.Draw;
}

restartBtn.addEventListener('click', restartBtnClick = () =>{
    curPlayerContainer.style.display = 'none';
    for(let i in boxItems){
        boxItems[i].innerHTML = '';
    }
    
    document.getElementById('countX').innerHTML = 0;
    document.getElementById('countO').innerHTML = 0;
    document.getElementById('countDraw').innerHTML = 0;
});