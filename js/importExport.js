import { saveAs } from './lib/FileSaver.js';
import addMater from './mater.js';
import { addSemestre, cleanSemestres, getSemestre } from './semester.js';
import refresh from '../script.js';

function exports() {
  const currentField = document.getElementById('domaine').value;
  const p = JSON.stringify(getSemestre(0));
  const blob = new Blob([p], { type: 'application/json; charset=UTF-8' });
  saveAs(blob, currentField);
}

function imports() {
  const currentField = document.getElementById('domaine').value;
  fetch(`data/${currentField}`).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        cleanSemestres();
        data.forEach((x, i) => {
          addSemestre(x.name);
          x.maters.forEach(((y) => addMater(y, i)));
        });
        document.querySelectorAll('.coef, .note').forEach((x) => x.addEventListener('change', refresh));
      });
      console.log('Donnée chargées');
    } else {
      console.log('Mauvaise réponse du réseau');
    }
  }).catch((error) => {
    console.error(`Il y a eu un problème avec l'opération fetch: ' ${error.message}`);
  });
}

export { exports, imports };
