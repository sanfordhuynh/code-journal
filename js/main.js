let nextEntryId = parseInt(localStorage.getItem('nextEntryId') || 1);

// create the placeholder imageURL so that it can reset back to this
const placeholderImageURL = '/images/placeholder-image-square.jpg';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  const entriesList = document.querySelector('.entries ul');
  const photoURLInput = document.getElementById('photoURL');
  const imagePreview = document.getElementById('imagePreview');

  photoURLInput.addEventListener('input', function () {
    const url = photoURLInput.value;

    imagePreview.src = url;
  });

  data.entries.forEach(function (entry) {
    const entryElement = renderEntry(entry);

    entriesList.appendChild(entryElement);
  });

  const lastView = 'entry-form';

  viewSwap(lastView);

  // Conditionally use the toggleNoEntries function based on local storage data
  if (data.entries.length === 0) {
    toggleNoEntries(true);
  } else {
    toggleNoEntries(false);
  }

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

    // Render a DOM tree for the newly submitted entry object using the renderEntry function.
    const newEntry = renderEntry(formData);

    // Prepends the new DOM tree to the unordered list.
    entriesList.prepend(newEntry);

    // Use viewSwap to show the "entries" view
    viewSwap('entries');

    // conditionally uses the toggleNoEntries function as needed to remove the no entries text.
    if (data.entries.length > 0) {
      toggleNoEntries(false);
    } else {
      toggleNoEntries(true);
    }

    imagePreview.src = placeholderImageURL;
    form.reset();
    nextEntryId++;

    const jsonData = JSON.stringify(data);
    localStorage.setItem('javascript-local-storage', jsonData);
  });
});

function renderEntry(entry) {
  const listItem = document.createElement('li');
  listItem.classList.add('journal-entry');

  const entryContent = document.createElement('div');
  entryContent.classList.add('entry-content');

  const entryImageContainer = document.createElement('div');
  entryImageContainer.classList.add('entry-image-container');
  const entryImage = document.createElement('img');
  entryImage.classList.add('entry-image');
  entryImage.src = entry.photoURL;
  entryImageContainer.appendChild(entryImage);

  const entryTextContainer = document.createElement('div');
  entryTextContainer.classList.add('entry-text-container');

  const entryTitle = document.createElement('h3');
  entryTitle.classList.add('entry-title');
  entryTitle.textContent = entry.title;

  const entryNotes = document.createElement('p');
  entryNotes.classList.add('entry-notes');
  entryNotes.textContent = entry.notes;

  entryTextContainer.appendChild(entryTitle);
  entryTextContainer.appendChild(entryNotes);

  entryContent.appendChild(entryImage);
  entryContent.appendChild(entryTitle);
  entryContent.appendChild(entryNotes);

  listItem.appendChild(entryContent);

  return listItem;
}

function toggleNoEntries(show) {
  const noEntriesMessage = document.querySelector('.no-entries');

  if (show) {
    noEntriesMessage.style.display = 'block';
  } else {
    noEntriesMessage.style.display = 'none';
  }
}

// Create a new function named viewSwap with a single parameter representing the name
// of the view to show (the value will be either ”entries” or ”entry-form”).
// This function should show the view whose name was provided as an argument,
// as well as assign the string argument to the data.view property
// so that the currently shown view is tracked in the data model for the application.

function viewSwap(viewName) {
  const views = document.querySelectorAll('[data-view]');

  data.view = viewName;

  views.forEach((view) => {
    if (view.getAttribute('data-view') === viewName) {
      view.classList.remove('hidden');
    } else {
      view.classList.add('hidden');
    }
  });
}

const showEntriesLink = document.getElementById('show-entries-link');
const showEntryFormLink = document.getElementById('show-entry-form');

showEntriesLink.addEventListener('click', function (event) {
  event.preventDefault();
  viewSwap('entries');
});

showEntryFormLink.addEventListener('click', function (event) {
  event.preventDefault();
  viewSwap('entry-form');
});
