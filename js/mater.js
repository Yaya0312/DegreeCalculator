
function addMater({name, coef, note}, sem) {
    const mater = `
    <tr>
      <td contenteditable class="name">
        ${name}
      </td>
      <td>
        <input type="number" class="coef" min="0" max="100" value="${coef}">
      </td>
      <td>
        <input type="number" class="note"  min="0" max="20" value="${note}" >
      </td> 
    </tr>`;
    document.getElementById(sem).insertAdjacentHTML( 'beforeend', mater);
}

export { addMater };