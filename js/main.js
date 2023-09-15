const photoURLInput = document.getElementById('photoURL');
const photoPreview = document.getElementById('photoPreview');

photoURLInput.addEventListener('input', function () {
  photoPreview.src = photoURLInput.value;
});
