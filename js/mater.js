
function addMater({name, coef, note}, sem) {
    const mater = `
    <tr>
      <td contenteditable>
        ${name}
      </td>
      <td>
        <input type="number" class="coef" onchange="refresh('${sem}')" min="0" max="100" value="${coef}">
      </td>
      <td>
        <input type="number" class="note" onchange="refresh('${sem}')" min="0" max="20" value="${note}" >
      </td> 
    </tr>`;
    document.getElementById(sem).insertAdjacentHTML( 'beforeend', mater);
}

export { addMater };