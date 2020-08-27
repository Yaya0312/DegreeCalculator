import { getsNodes, sum } from './js/tools.js';
import { refreshSemestre } from './js/semester.js';
import { exports, localImport, externalImport } from './js/importExport.js';
import loadCursusList from './js/cursusList.js';

export default function refresh() {
  // semester
  const semestres = getsNodes('.semestre');
  semestres.forEach((x) => refreshSemestre(x));
  // final
  const notesSemestre = Array.from(getsNodes('.noteSemestre')).map((x) => x.value);
  const resulYear = sum(notesSemestre.map((x) => Number(x))) / notesSemestre.length;
  document.getElementById('noteFinal').value = resulYear;
  if (resulYear >= 10) {
    document.getElementById('textResult').innerText = 'Félicitations année validé : ';
  } else {
    document.getElementById('textResult').innerText = 'Année non validé : ';
  }
}

// main
window.onload = () => {
  document.getElementById('domaine').addEventListener('change', localImport);
  document.getElementById('download').addEventListener('click', exports);
  document.getElementById('dataUpload').addEventListener('change', externalImport);
  loadCursusList();
};
