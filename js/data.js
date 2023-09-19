/* exported data */

window.addEventListener('beforeunload', (event) => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
});

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
