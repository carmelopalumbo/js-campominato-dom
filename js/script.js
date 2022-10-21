// js

/* L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba. */

/* TO-DO
    GRIGLIA DI GIOCO
    AGGIUNGERE CELLE ID
    GENERARE BOMBE
    AL CLICK DELLA CELLA
        VERIFICARE SE HO CLICCATO UNA BOMBA
        CONTARE I TENTATIVI
        ACCENDERE LA CELLA
        VERIFICARE SE HO FINITO I TENTATIVI
    
    FINE GIOCO
        STAMPARE IL RISULTATO
        BLOCCARE LA GRIGLIA
        MOSTRARE TUTTE LE BOMBE

AL CLICK DI PLAY RESETTARE LA GRIGLIA E GENERARE NUOVE BOMBE */


//variabili
const container = document.querySelector('.container');
const numCaselle = document.getElementById('difficult');
const inputBtn = document.getElementById('gioca');
const resetBtn = document.getElementById('reset');
const numBombs = 16;
let gameBombs = [];
let count = 0;


//inizia il gioco
inputBtn.addEventListener('click', play);

resetBtn.addEventListener('click', function(){
    //cancella tutta la griglia
    reset();
})




// funzioni

//gestione del gioco
function play(){

    count = 0;
    document.getElementById('final_result').innerHTML = '';
    container.innerHTML = '';
    
    gameBombs = bombsGenerator();

    //ciclo per generare i quadrati
    for(let i = 0; i < numCaselle.value; i++){
        squareGenerator(i);
    }
}

//crea quadrati
function squareGenerator(indexSquare){
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = genCssClass();
    square.style.height = genCssClass();
    square.sqId = indexSquare + 1;
    square.innerHTML = square.sqId;
    container.append(square);
    
    //verifico il ckick
    square.addEventListener('click', clickSquare, {once: true});
}

//genera le bombe
function bombsGenerator(){
    let bombs = [];
    while(bombs.length < numBombs){
        const bomb = getRandomNumber(1, numCaselle.value);
        if(!bombs.includes(bomb)) bombs.push(bomb);
    }
    //decommenta per visualizzare le bombe
    //console.log(bombs);
    return bombs;
}

//imposta dimemensioni in base alla quantita
function genCssClass(){
    return `calc(100% / ${Math.sqrt(numCaselle.value)})`;
}

//verifico se ho cliccato una bomba o una casella ok
function clickSquare(){
    if(!gameBombs.includes(this.sqId)){
        this.classList.add('square_click');
        if(count === numCaselle.value - numBombs){
            endGame(true);
        }
    }else{
        this.classList.add('bomb_click');
        endGame(false);
    }

    count++;
    console.log(count);
}

//resetto tutti i campi
function reset(){
    count = 0;
    container.innerHTML = '';
    document.getElementById('final_result').innerHTML = '';
}

//restituisce un numero casuale tra max e min
function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min) ) + min;
}

//restituisce risultato finale
function endGame(winCondition){

    //vittoria
    if(winCondition){
        document.getElementById('final_result').classList.remove('lose');
        document.getElementById('final_result').classList.add('win');
        document.getElementById('final_result').innerHTML = 'COMPLIMENTI, HAI VINTO, SEI UN MITO!';
        addFinalLayer();
    }else{
        //sconfitta
        showAllBombs();
        document.getElementById('final_result').classList.remove('win');
        document.getElementById('final_result').classList.add('lose');
        document.getElementById('final_result').innerHTML = `BOOM! HAI TOTALIZZATO UN PUNTEGGIO DI ${count} SU ${numCaselle.value - numBombs}. <br> PUOI FARCELA, RIPROVA!`;
        addFinalLayer();
    }
}

//mostra tutte le bombe nascoste
function showAllBombs(){
    const square = document.getElementsByClassName('square');
    for(let i = 0; i < square.length; i++){
        const checkBomb = square[i];
        if(gameBombs.includes(parseInt(checkBomb.innerText))){
            square[i].classList.add('bomb_click');
        }
    }
}


//aggiunge un layer impedendo di continuare il gioco quando finisce
function addFinalLayer(){
    const layer = document.createElement('div');
    layer.classList.add('final_layer');
    container.append(layer);
}