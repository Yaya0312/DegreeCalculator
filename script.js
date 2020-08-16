'use strict'

// tools functions
const getsNodes = (x) => document.querySelectorAll(x);
const zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]); // a[int], b[int] -> [[a[0],b[0]]...,[a[n],b[n]]]
const sum = (arr) => arr.reduce((a,c) => a + c); // a[int] -> (a[0] + ... + a[n])

// data
let matersS1;
let matersS2;
let currentField;

//import

fetch(`data/router.json`).then(function(response) {
  if(response.ok) {
    response.json().then(data => {
      let optionList = document.getElementById('domaine').options;
      let options = data;
      options.forEach(option =>
        optionList.add(
          new Option(option.name, option.url, option.selected)
        )
      );
    });
    console.log("ok");
  } else {
    console.log('Mauvaise réponse du réseau');
  }
})
.catch(function(error) {
  console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
});

function domanChange() {
  currentField = document.getElementById('domaine').value;
  imports();
}

function imports(n) {
  fetch(`data/${currentField}`).then(function(response) {
    if(response.ok) {
      response.json().then(data => {
        matersS1 = data.s1;
        matersS2 = data.s2;
        cleanSemestre("s1");
        cleanSemestre("s2");
        matersS1.forEach(x => addMater(x,'s1'));
        matersS2.forEach(x => addMater(x,'s2'));
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

function refresh(sem) {
    //semester
    const notes = Array.from(getsNodes(`#${sem} .note`)).map( x => x.value);
    const coefs = Array.from(getsNodes(`#${sem} .coef`)).map( x => x.value);
    const resultSemestre = sum(zip(notes, coefs).map(x => x[0] * x[1]));
    const sumCoef = sum(coefs.map(x => Number(x)));
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

//
function cleanSemestre(sem) {
  document.querySelector(`tbody#${sem}`).innerText = "";
}

// components

function addSemestre(n) {
    const sem = `
    <table class="semestre">
    <caption>
      Semestre ${n}
      <img onclick="cleanSemestre('s${n}')" src="assets/delete.svg" alt="clean" />
      <span onclick="imports('s${n}')"> I </span>
    </caption>
    <thead>
      <th>Matière</th>
      <th class="number" >(Coef)</th>
      <th class="number" >Note</th>
    </thead>
    <tbody id="s${n}" class="notValid"></tbody>
    <tfoot>
      <tr>
        <td colspan="3" ><input type="number" class="noteSemestre" id="notes${n}" onchange="refresh('${n}')"></td>
      </tr>
    </tfoot>
  </table>`;
  document.getElementById("semestres").insertAdjacentHTML( 'beforeend', sem);
}

function addMater(name, sem) {
    const mater = `
    <tr>
        <td contenteditable >${name}</td>
        <td><input type="number" class="coef number" onchange="refresh('${sem}')" min="0" max="100"></td>
        <td><input type="number" class="note number" onchange="refresh('${sem}')" min="0" max="20"></td> 
    </tr>`;
    document.getElementById(sem).insertAdjacentHTML( 'beforeend', mater);
}

// main

addSemestre(1);
addSemestre(2);
domanChange();