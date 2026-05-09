const overlayEl = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlayDescription = document.getElementById('overlay-description');
const overlayNote = document.getElementById('overlay-note');
const closeOverlayBtn = document.getElementById('close-overlay');

function openOverlay(data) {
    if (!overlayEl) return;
    overlayTitle.textContent = data.title || '';
    overlayDescription.textContent = data.description || '';
    overlayNote.textContent = data.note || '';
    overlayEl.style.display = 'flex';
}

function closeOverlay() {
    if (!overlayEl) return;
    overlayEl.style.display = 'none';
}

if (closeOverlayBtn) {
    closeOverlayBtn.addEventListener('click', closeOverlay);
    window.addEventListener('click', (e) => {
        if (e.target === overlayEl) closeOverlay();
    });
}

window.CatalogOverlay = { openOverlay };