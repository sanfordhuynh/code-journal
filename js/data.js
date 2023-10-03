/* exported data */

const getData = () => {
  const storedData = localStorage.getItem('javascript-local-storage');
  if (storedData) {
    return JSON.parse(storedData);
  } else {
    return { entries: [] };
  }
};

const saveData = (data) => {
  const jsonData = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', jsonData);
};

export { getData, saveData };
