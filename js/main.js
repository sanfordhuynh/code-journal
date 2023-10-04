const placeholderImageURL = '/images/placeholder-image-square.jpg';
let nextEntryId = data.nextEntryId;
const form = document.getElementById('form');
const entriesList = document.querySelector('.entries ul');
const photoURLInput = document.getElementById('photoURL');
const imagePreview = document.getElementById('imagePreview');

photoURLInput.addEventListener('input', function () {
  const url = photoURLInput.value;
  imagePreview.src = url;
});

if (data.entries.length > 0) {
  data.entries.forEach(function (entry) {
    const entryElement = renderEntry(entry);
    entriesList.appendChild(entryElement);
  });
}

const lastView = 'entry-form';
viewSwap(lastView);

if (data.entries.length === 0) {
  toggleNoEntries(true);
} else {
  toggleNoEntries(false);
}

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

  data.entries.unshift(formData);
  const newEntry = renderEntry(formData);
  entriesList.prepend(newEntry);
  viewSwap('entries');

  if (data.entries.length > 0) {
    toggleNoEntries(false);
  } else {
    toggleNoEntries(true);
  }

  imagePreview.src = placeholderImageURL;
  form.reset();
  nextEntryId++;
});

// Add event listen to the UL entries view
entriesList.addEventListener('click', function (event) {
  if (event.target.classList.contains('fa-pencil')) {
    viewSwap('entry-form');

    let clickedEntry;

    const entryId = event.target.closest('li').getAttribute('data-entry-id');
    for (const entry of data.entries) {
      if (entry.entryId === parseInt(entryId)) {
        clickedEntry = entry;
        break;
      }
    }

    if (clickedEntry) {
      data.editing = clickedEntry;

      document.getElementById('titleName').value = data.editing.title;
      document.getElementById('photoURL').value = data.editing.photoURL;
      document.getElementById('notes').value = data.editing.notes;

      document.querySelector('.entry-form').textContent = 'Edit Entry';
    } else {
      // eslint-disable-next-line no-console
      console.log('Entry not found');
    }
  }
});

function renderEntry(entry) {
  const listItem = document.createElement('li');
  listItem.classList.add('journal-entry');

  listItem.setAttribute('data-entry-id', entry.entryID);

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

  const pencilFontAwesome = document.createElement('i');
  pencilFontAwesome.classList.add('fas', 'fa-pencil');
  entryTitle.appendChild(pencilFontAwesome);

  const entryNotes = document.createElement('p');
  entryNotes.classList.add('entry-notes');
  entryNotes.textContent = entry.notes;

  entryTextContainer.appendChild(entryTitle);
  entryTextContainer.appendChild(entryNotes);

  entryContent.appendChild(entryImageContainer);
  entryContent.appendChild(entryTextContainer);

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
