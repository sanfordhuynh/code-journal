const photoURLInput = document.getElementById('photoURL');
const imagePreview = document.getElementById('imagePreview');

let nextEntryId = parseInt(localStorage.getItem('nextEntryId') || 1);

// create the placeholder imageURL so that it can reset back to this
const placeholderImageURL = '/images/placeholder-image-square.jpg';

photoURLInput.addEventListener('input', function () {
  const url = photoURLInput.value;

  imagePreview.src = url;
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');

  // initialize nextEntryId variable to keep track of the entryID starting at 1

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the form input values, then store it into an object value
    const titleNameInput = document.getElementById('titleName').value;
    const photoURLInputValue = document.getElementById('photoURL').value;
    const notesInput = document.getElementById('notes').value;

    const formData = {
      entryId: nextEntryId,
      title: titleNameInput,
      photoURL: photoURLInputValue,
      notes: notesInput,
    };

    // Add the new object to the beginning of the entries array
    data.entries.unshift(formData);

    const jsonData = JSON.stringify(data);
    localStorage.setItem('javascript-local-storage', jsonData);

    imagePreview.src = placeholderImageURL;

    form.reset();

    nextEntryId++;
  });
});
