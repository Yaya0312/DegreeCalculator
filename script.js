import { addMater } from './js/mater.js';
import { getsNodes, zip, sum } from './js/tools.js';
import { addSemestre, cleanSemestres } from './js/semester.js';
import { loadList } from './js/importExport.js';

'use strict'

//import

function imports() {
  const currentField = document.getElementById('domaine').value;
  fetch(`data/${currentField}`).then(function(response) {
    if(response.ok) {
      response.json().then(data => {
        cleanSemestres();
        data[0].maters.forEach(x => addMater(x,'s1'));
        data[1].maters.forEach(x => addMater(x,'s2'));
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

export function refreshSemestre(sem) {
  const notes = Array.from(sem.querySelectorAll(".note")).map(x => x.value);
  const coefs = Array.from(sem.querySelectorAll(".coef")).map(x => x.value);
  const resultSemestre = sum(zip(notes, coefs).map(x => x[0] * x[1]));
  const sumCoef = sum(coefs.map(x => Number(x)));
  sem.querySelector(".noteSemestre").value = resultSemestre / sumCoef;
}

export function refresh() {
    //semester
    const semestres = getsNodes(".semestre");
    semestres.forEach(x => refreshSemestre(x));
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
  document.getElementById("domaine").addEventListener("change", imports);
  main();
}