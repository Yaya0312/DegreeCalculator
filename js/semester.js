import { getsNodes, zip, sum } from './tools.js';

function cleanSemestres() {
  document.querySelector('#semestres').innerHTML = '';
}

function getSemestre(number) {
  const semestres = getsNodes('table');
  const name = semestres[number].querySelector('caption').innerText;
  const names = Array.from(semestres[number].querySelectorAll('.name')).map((e) => e.innerText);
  const coefs = Array.from(semestres[number].querySelectorAll('.coef')).map((e) => e.value);
  const notes = Array.from(semestres[number].querySelectorAll('.note')).map((e) => e.value);
  const maters = [];
  for (let i = 0; i < names.length; i += 1) {
    maters.push({ name: names[i], coef: coefs[i], note: notes[i] });
  }
  return { name, maters };
}

function addSemestre(name) {
  const sem = `
    <table class="semestre">
    <caption>
      ${name}
    </caption>
    <thead>
      <th>Matière</th>
      <th>(Coef)</th>
      <th>Note</th>
    </thead>
    <tbody></tbody>
    <tfoot>
      <tr>
        <td colspan="3" ><input type="number" class="noteSemestre" ></td>
      </tr>
    </tfoot>
  </table>`;
  document.getElementById('semestres').insertAdjacentHTML('beforeend', sem);
}

function refreshSemestre(sem) {
  const notes = Array.from(sem.querySelectorAll('.note')).map((x) => x.value);
  const coefs = Array.from(sem.querySelectorAll('.coef')).map((x) => x.value);
  const resultSemestre = sum(zip(notes, coefs).map((x) => x[0] * x[1]));
  const sumCoef = sum(coefs.map((x) => Number(x)));
  sem.querySelector('.noteSemestre').value = resultSemestre / sumCoef;
}

export {
  cleanSemestres,
  addSemestre,
  getSemestre,
  refreshSemestre,
};
