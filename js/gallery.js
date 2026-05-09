let galleryImages = [];
let currentIndex = 0;

const galleryOverlay = document.getElementById('gallery-overlay');
const galleryImg = document.getElementById('gallery-image');
const galleryCounter = document.getElementById('gallery-counter');
const galleryClose = document.getElementById('gallery-close');
const galleryPrev = document.getElementById('gallery-prev');
const galleryNext = document.getElementById('gallery-next');

function updateGallery() {
    if (!galleryImg || !galleryCounter || galleryImages.length === 0) return;
    galleryImg.src = galleryImages[currentIndex];
    galleryCounter.textContent = `${currentIndex + 1}/${galleryImages.length}`;
}

function openGallery(images) {
    if (!galleryOverlay) return;
    galleryImages = images || [];
    if (galleryImages.length === 0) return;
    currentIndex = 0;
    galleryOverlay.style.display = 'flex';
    updateGallery();
}

function closeGallery() {
    if (!galleryOverlay) return;
    galleryOverlay.style.display = 'none';
}

if (galleryClose) galleryClose.addEventListener('click', closeGallery);
if (galleryPrev) galleryPrev.addEventListener('click', () => {
    if (galleryImages.length === 0) return;
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGallery();
});
if (galleryNext) galleryNext.addEventListener('click', () => {
    if (galleryImages.length === 0) return;
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateGallery();
});

window.CatalogGallery = { openGallery };