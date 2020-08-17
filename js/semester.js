
function cleanSemestre(sem) {
  document.querySelector(`tbody#${sem}`).innerText = "";
}

function cleanAllSemestre() {
  document.querySelector(`tbody`).innerText = "";
}

function addSemestre(n) {
    const sem = `
    <table class="semestre">
    <caption>
      Semestre ${n}
      <img src="assets/delete.svg" alt="clean" />
    </caption>
    <thead>
      <th>Matière</th>
      <th>(Coef)</th>
      <th>Note</th>
    </thead>
    <tbody id="s${n}"></tbody>
    <tfoot>
      <tr>
        <td colspan="3" ><input type="number" class="noteSemestre" id="notes${n}" onchange="refresh('${n}')"></td>
      </tr>
    </tfoot>
  </table>`;
  document.getElementById("semestres").insertAdjacentHTML( 'beforeend', sem);
}

export { cleanSemestre, cleanAllSemestre, addSemestre };