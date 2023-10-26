const area = document.getElementsByClassName('box-wrapper');
const boxItems = document.querySelectorAll('.box-item');


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

for(let i = 0; i < boxItems.length; i++){
    boxItems[i].setAttribute('index', i);
} 

for(let i = 0; i < boxItems.length; i++){
    boxItems[i].addEventListener('click', boxItemsClick, false)
}   

function boxItemsClick () {
    let arr = [];

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
        restart('Winner: ' + player);
    }
    else{
        let draw = true;
        for(let i in boxItems){
            if(boxItems[i].innerHTML == '') draw=false;
        }
        if(draw) {
            restart('Draw');
        }
    }
    
    if(player == 'X'){
        player ='0';
    }else player = 'X';
    console.log(arr);
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

function restart (message) {
    alert(message);
    for(let i in boxItems){
        boxItems[i].innerHTML = '';
    }
}