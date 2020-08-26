function addMater({ name, coef, note }, semId) {
  const mater = `
    <tr>
      <td contenteditable class="name" tabindex="-1">
        ${name}
      </td>
      <td>
        <input type="number" class="coef" min="0" max="100" value="${coef}" tabindex="-1">
      </td>
      <td>
        <input type="number" class="note"  min="0" max="20" value="${note}" >
      </td>
    </tr>`;
  document.querySelectorAll('.semestre>tbody')[semId].insertAdjacentHTML('beforeend', mater);
}

export default addMater;
