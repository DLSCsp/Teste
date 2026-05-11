const overlayEl = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlayDescription = document.getElementById('overlay-description');
const overlayNote = document.getElementById('overlay-note');
const closeOverlayBtn = document.getElementById('close-overlay');

function openOverlay(data) {
    if (overlayTitle) overlayTitle.textContent = data.title || '';
    if (overlayDescription) overlayDescription.textContent = data.description || '';
    if (overlayNote) overlayNote.textContent = data.note || '';
    
    if (overlayEl) {
        overlayEl.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeOverlay() {
    if (overlayEl) {
        overlayEl.classList.remove("active");
        document.body.style.overflow = "auto";
    }
}

// Verifica se os elementos existem antes de adicionar o evento de clique
if (closeOverlayBtn) {
    closeOverlayBtn.addEventListener('click', closeOverlay);
}

if (overlayEl) {
    overlayEl.addEventListener('click', (e) => {
        if (e.target === overlayEl) closeOverlay();
    });
}

window.CatalogOverlay = { openOverlay };