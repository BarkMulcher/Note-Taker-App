// notes form
const notesTitle = document.getElementsByClassName('note-title');
const notesBody = document.getElementsByClassName('notes-textarea');
const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/';
});