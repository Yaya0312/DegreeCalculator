const PATH = 'data/router.json';
const DEFAULT_TEXT = '-- Veuillez choisir un cursus --';

function loadCursusList() {
  fetch(PATH).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        const optionList = document.getElementById('domaine').options;
        const options = data;
        // Default Value
        optionList.add(
          new Option(DEFAULT_TEXT, '', true),
        );
        optionList[0].disabled = true;
        // List Value
        options.forEach((option) => optionList.add(
          new Option(option.name, option.url, option.selected),
        ));
      });
      console.log('Donnée chargées');
    } else {
      console.error('Mauvaise réponse du réseau');
    }
  }).catch((error) => {
    console.error(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
  });
}

export default loadCursusList;
