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


//inizia il gioco
inputBtn.addEventListener('click', play);

resetBtn.addEventListener('click', function(){
    //cancella tutta la griglia
    reset();
})



// funzioni


//gestione del gioco
function play(){
    container.innerHTML = '';

    //ciclo per generare i quadrati
    for(let i = 0; i < numCaselle.value; i++){
        squareGenerator(i);
    }
}

//crea quadrati
function squareGenerator(indexSquare){
    const square = document.createElement('div');
    square.classList.add('square');
    container.append(square);
    square.style.width = genCssClass();
    square.style.height = genCssClass();
    square.innerHTML = indexSquare + 1;
    square.addEventListener('click', clickSquare);
}

//imposta dimemensioni in base alla quantita
function genCssClass(){
    return `calc(100% / ${Math.sqrt(numCaselle.value)})`;
}

//cambia colore del quadrato al click
function clickSquare(){
    this.classList.add('square_click');
}

//resetto tutti i campi
function reset(){
    numCaselle.value = '';
    container.innerHTML = '';
    document.getElementById('final_result').innerHTML = '';
}