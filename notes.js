function saveNotes() {
    let notes = document.getElementById("notes").value;
    localStorage.setItem("userNotes", notes);
}

function loadNotes() {
    let savedNotes = localStorage.getItem("userNotes") || "";
    document.getElementById("notes").value = savedNotes;
}

function clearNotes() {
    if (confirm("¿Seguro que quieres borrar todas las notas?")) {
        localStorage.removeItem("userNotes");
        document.getElementById("notes").value = "";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadNotes();
    document.getElementById("notes").addEventListener("input", saveNotes);
});
