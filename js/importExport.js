import { domanChange } from '../script.js';

function loadList() {
  fetch(`data/router.json`).then(function(response) {
    if(response.ok) {
      response.json().then(data => {
        const optionList = document.getElementById('domaine').options;
        const options = data;
        options.forEach(option =>
          optionList.add(
            new Option(option.name, option.url, option.selected)
          )
        );
        domanChange();
      });
      console.log("Donnée chargées");
    } else {
      console.log('Mauvaise réponse du réseau');
    }
  })
  .catch(function(error) {
    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
  });
}

export { loadList };