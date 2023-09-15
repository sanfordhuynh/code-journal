const photoURLInput = document.getElementById('photoURL');
const photoPreview = document.getElementById('photoPreview');

// create the placeholder imageURL so that it can reset back to this
const placeholderImageURL = '/images/placeholder-image-square.jpg';

photoURLInput.addEventListener('input', function () {
  photoPreview.src = photoURLInput.value;
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  // Create an entry for our array
  const entries = [];

  // initialize nextEntryId variable to keep track of the entryID starting at 1
  let nextEntryId = 1;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the form input values, then store it into an object value
    const titleNameInput = document.getElementById('titleName').value;
    const photoURLInputValue = document.getElementById('photoURL').value;

    const formData = {
      entryId: nextEntryId,
      title: titleNameInput,
      photoURL: photoURLInputValue,
    };

    // Add the new object to the begging of the entries array
    entries.unshift(formData);

    photoPreview.src = placeholderImageURL;

    form.reset();

    nextEntryId++;
  });
});
