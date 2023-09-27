/* exported data */
let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeunload', (event) => {
  const jsonData = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', jsonData);
});

const localStorageData = localStorage.getItem('javascript-local-storage');

if (localStorageData !== null) {
  const parsedData = JSON.parse(localStorageData);

  if (parsedData) {
    data = parsedData;
  }
}
