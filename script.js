import { addMater } from './js/mater.js';
import { getsNodes, zip, sum } from './js/tools.js';
import { addSemestre, cleanSemestre } from './js/semester.js';
import { loadList } from './js/importExport.js';

'use strict'

// data
let matersS1;
let matersS2;
let currentField;

//import

export function domanChange() {
  currentField = document.getElementById('domaine').value;
  imports();
}

function imports(n) {
  fetch(`data/${currentField}`).then(function(response) {
    if(response.ok) {
      response.json().then(data => {
        matersS1 = data[0].maters;
        matersS2 = data[1].maters;
        cleanSemestre("s1");
        cleanSemestre("s2");
        matersS1.forEach(x => addMater(x,'s1'));
        matersS2.forEach(x => addMater(x,'s2'));
        document.querySelectorAll(".coef, .note").forEach(x => x.addEventListener('change', refresh))
      });
      console.log("ok");
    } else {
      console.log('Mauvaise réponse du réseau');
    }
  })
  .catch(function(error) {
    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
  });
}

export function refresh(sem) {
    sem = "s1";
    //semester
    const semestres = getsNodes("table");
    const notes = Array.from(getsNodes(`#${sem} .note`)).map( x => x.value);
    const coefs = Array.from(getsNodes(`#${sem} .coef`)).map( x => x.value);
    const resultSemestre = sum(zip(notes, coefs).map(x => x[0] * x[1]));
    const sumCoef = sum(coefs.map(x => Number(x)));
    document.getElementById("note" + sem).value = resultSemestre / sumCoef;
    //final
    const notesSemestre = Array.from(getsNodes(".noteSemestre")).map(x => x.value);
    const resulYear = sum(notesSemestre.map(x => Number(x))) / notesSemestre.length;
    document.getElementById("noteFinal").value = resulYear;
    if (resulYear >= 10) {
        document.getElementById("textResult").innerText = "Félicitations année validé : ";
    } else {
        document.getElementById("textResult").innerText = "Année non validé : ";
    }
}

// main
function main() {
  loadList();
  addSemestre(1);
  addSemestre(2);
}

window.onload = function() {
  document.getElementById("domaine").addEventListener("change", domanChange);
  main();
}