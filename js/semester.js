
function cleanSemestre(sem) {
  document.querySelector(`tbody#${sem}`).innerText = "";
}

function cleanSemestres() {
  let semestres = document.querySelectorAll(`tbody`);
  semestres.forEach( x => x.innerHTML = "");
}

function getSemestre(number) {
  const semestres = getsNodes("table");
  const name = semestres[number].querySelector("caption").innerText;
  const names = semestres[number].querySelectorAll(".name").forEach(e => { });;
  const coefs = semestres[number].querySelectorAll(".coef");
  const notes = semestres[number].querySelectorAll(".note");

  return {
    "name" : name,
    "maters" : maters
  }
}

function addSemestre(n) {
    const sem = `
    <table class="semestre">
    <caption>
      Semestre ${n}
    </caption>
    <thead>
      <th>Matière</th>
      <th>(Coef)</th>
      <th>Note</th>
    </thead>
    <tbody id="s${n}"></tbody>
    <tfoot>
      <tr>
        <td colspan="3" ><input type="number" class="noteSemestre" id="notes${n}" ></td>
      </tr>
    </tfoot>
  </table>`;
  document.getElementById("semestres").insertAdjacentHTML( 'beforeend', sem);
}

export { cleanSemestre, cleanSemestres, addSemestre };