import { saveAs } from './lib/FileSaver.js';
import addMater from './mater.js';
import { addSemestre, cleanSemestres, getSemestres } from './semester.js';
import refresh from '../script.js';

function exports() {
  const currentField = document.getElementById('domaine').value;
  const p = JSON.stringify(getSemestres());
  const blob = new Blob([p], { type: 'application/json; charset=UTF-8' });
  saveAs(blob, currentField);
}

function imports(dataJson) {
  cleanSemestres();
  dataJson.forEach((x, i) => {
    addSemestre(x.name);
    x.maters.forEach(((y) => addMater(y, i)));
  });
  document.querySelectorAll('.coef, .note').forEach((x) => x.addEventListener('change', refresh));
}

function localImport() {
  const currentField = document.getElementById('domaine').value;
  fetch(`data/${currentField}`).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        imports(data);
      });
      console.log('Donnée chargées');
    } else {
      console.log('Mauvaise réponse du réseau');
    }
  }).catch((error) => {
    console.error(`Il y a eu un problème avec l'opération fetch: ' ${error.message}`);
  });
}

function externalImport(evt) {
  // TODO improve code

  const { files } = evt.target;
  if (files == null || files.length === 0) {
    return;
  }
  const file = files[0];
  const reader = new FileReader();
  reader.onload = (() => {
    return (e) => {
      const data = JSON.parse(e.target.result);
      imports(data);
    };
  })(file);

  // Read in the image file as a data URL.
  reader.readAsText(file);
}

export { exports, localImport, externalImport };
