'use strict'

// tools functions
const getsNodes = (x) => document.querySelectorAll(x);
const zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]); // a[int], b[int] -> [[a[0],b[0]]...,[a[n],b[n]]]
const sum = (arr) => arr.reduce((a,c) => a + c); // a[int] -> (a[0] + ... + a[n])
const toInt = (arr) => arr.map(x => +x)
const lock = () => 

// functions

function add(sem) {
  addMater(" ",sem);
}

// data
const matersS1 = ['MPOO2','ALGO3','SE','TL','ANG','POP3'];
const matersS2 = ['IHM','Réseau','Compilation','Calcul Symbolique','ANG6','APP INFO','Stage'];

function refresh(sem) {
    //semester
    const notes = Array.from(getsNodes(`#${sem} .note`)).map( x => x.value);
    const coefs = Array.from(getsNodes(`#${sem} .coef`)).map( x => x.value);
    const resultSemestre = sum(zip(notes, coefs).map(x => x[0] * x[1]));
    const sumCoef = sum(coefs.map(x=>Number(x)));
    document.getElementById("note" + sem).value = resultSemestre / sumCoef;
    //final
    const notesSemestre = Array.from(getsNodes(".noteSemestre")).map(x => x.value);
    const resulYear = sum(notesSemestre.map(x=>Number(x))) / notesSemestre.length;
    document.getElementById("noteFinal").value = resulYear;
    if (resulYear >= 10) {
        document.getElementById("textResult").innerText = "Félicitations année validé : ";
    } else {
        document.getElementById("textResult").innerText = "Année non validé : ";
    }
}

// components

function addSemestre(n) {
    const sem = `
    <table class="semestre">
    <caption>Semestre ${n}</caption>
    <thead>
      <th>Matière</th>
      <th>(Coef)</th>
      <th>Note</th>
    </thead>
    <tbody id="s${n}" class="notValid"></tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="add" onclick="add('s${n}')";>Ajouter une matière</td>
      </tr>
      <tr>
        <td colspan="2" class="textNote">Note du semestre : </td>
        <td><input type="number" class="noteSemestre" id="notes${n}" onchange="refresh('${n}')"></td>
      </tr>
    </tfoot>
  </table>`;
  document.getElementById("semestres").insertAdjacentHTML( 'beforeend', sem);
}

function addMater(name,sem) {
    const mater = `
    <tr>
        <td contenteditable >${name}</td>
        <td><input type="number" class="coef" onchange="refresh('${sem}')"></td>
        <td><input type="number" class="note" onchange="refresh('${sem}')"></td>
    </tr>`;
    document.getElementById(sem).insertAdjacentHTML( 'beforeend', mater);
}

// main

addSemestre(1);
addSemestre(2);
matersS1.forEach(x => addMater(x,'s1'));
matersS2.forEach(x => addMater(x,'s2'));