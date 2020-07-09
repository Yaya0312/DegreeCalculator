'use strict'

const maters = ['MPOO2','ALGO3','SE','TL','ANG','POP3'];

function res1() {
    const getsClass = (x) => document.getElementsByClassName(x);
    let names = Array.from(getsClass('name')).map( x => x.innerHTML);
    let notes = Array.from(getsClass('note')).map( x => x.value);
    let coefs = Array.from(getsClass('coef')).map( x => x.value);
    let zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]); 
    let res = zip(notes, coefs).map( x => x[0] * x[1]);
    res = res.reduce((a,c) => a + c);
    document.getElementById("resultSemestre1").value = res;
    if (res < 10) {
        document.getElementById("semestre1").classList.replace("valid","notValid");
    }
    if (res > 10) {
        document.getElementById("semestre1").classList.replace("notValid","valid");
    }
}

function addMater(name) {
    const mater = `
    <li>
        <h5 class="name" contenteditable>${name}</h5> :
        <input type="text" class="note" onchange="res1()">
        (<input type="text" class="coef" onchange="res1()">)
    </li>`;
    document.getElementById("materS1").insertAdjacentHTML( 'beforeend', mater);
}

maters.forEach(x => addMater(x));

