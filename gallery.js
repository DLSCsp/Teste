let galleryImages = [];
const galleryOverlay = document.getElementById('gallery-overlay');
const galleryContent = document.querySelector('.gallery-content'); // O container que faz scroll
const galleryCounter = document.getElementById('gallery-counter');
const galleryClose = document.getElementById('gallery-close');
const galleryPrev = document.getElementById('gallery-prev');
const galleryNext = document.getElementById('gallery-next');

// 1. Atualiza o contador baseado na posição do scroll
galleryContent.addEventListener('scroll', () => {
    const index = Math.round(galleryContent.scrollLeft / galleryContent.clientWidth);
    galleryCounter.textContent = `${index + 1}/${galleryImages.length}`;
});

// 2. Navegação por Teclado
document.addEventListener('keydown', (e) => {
    if (!galleryOverlay.classList.contains('active')) return;
    
    if (e.key === "ArrowRight") navigateGallery(1);
    if (e.key === "ArrowLeft") navigateGallery(-1);
    if (e.key === "Escape") closeGallery();
});

function navigateGallery(direction) {
    galleryContent.scrollBy({
        left: direction * galleryContent.clientWidth,
        behavior: 'smooth'
    });
}

function openGallery(images) {
    galleryImages = (images || []).filter(img => img.trim() !== "" && img.trim() !== "#");
    if (galleryImages.length === 0) return;

    // Limpa e insere todas as imagens para permitir o scroll entre elas
    galleryContent.innerHTML = '';
    galleryImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src.trim();
        img.draggable = false;
        galleryContent.appendChild(img);
    });

    galleryOverlay.classList.add("active");
    galleryContent.scrollLeft = 0; // Começa na primeira
    galleryCounter.textContent = `1/${galleryImages.length}`;
}

function closeGallery() {
    galleryOverlay.classList.remove("active");
}

// Eventos de clique nas setas e fechar
if (galleryClose) galleryClose.onclick = closeGallery;
if (galleryPrev) galleryPrev.onclick = () => navigateGallery(-1);
if (galleryNext) galleryNext.onclick = () => navigateGallery(1);

if (galleryOverlay) {
    galleryOverlay.onclick = (e) => {
        if (e.target === galleryOverlay) closeGallery();
    };
}

window.CatalogGallery = { openGallery };

let isDown = false;
let startX;
let scrollLeft;

galleryContent.addEventListener('mousedown', (e) => {
    isDown = true;
    galleryContent.classList.add('active');
    // Registra a posição inicial do mouse e do scroll
    startX = e.pageX - galleryContent.offsetLeft;
    scrollLeft = galleryContent.scrollLeft;
    
    // Desativa o scroll-snap temporariamente para o arrasto ser suave
    galleryContent.style.scrollSnapType = 'none';
});

galleryContent.addEventListener('mouseleave', () => {
    isDown = false;
    galleryContent.style.scrollSnapType = 'x mandatory';
});

galleryContent.addEventListener('mouseup', () => {
    isDown = false;
    // Reativa o scroll-snap para a imagem "grudar" na mais próxima
    galleryContent.style.scrollSnapType = 'x mandatory';
});

galleryContent.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - galleryContent.offsetLeft;
    const walk = (x - startX) * 2; // Multiplique por 2 para o arraste ser mais rápido
    galleryContent.scrollLeft = scrollLeft - walk;
});

// 1. Função de fechar unificada
function closeGallery() {
    if (galleryOverlay) {
        galleryOverlay.classList.remove("active");
        galleryContent.innerHTML = ''; // Limpa para evitar bugs de memória
    }
}

// 2. Configuração do Botão de Fechar (Mobile + Desktop)
if (galleryClose) {
    // Evento de toque (instantâneo no celular)
    galleryClose.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Impede o clique de "atravessar" para o que está atrás
        closeGallery();
    }, { passive: false });

    // Evento de clique (mouse no PC)
    galleryClose.onclick = closeGallery;
}

// 3. Fechar ao clicar fora (no fundo escuro)
if (galleryOverlay) {
    galleryOverlay.addEventListener('click', (e) => {
        // Só fecha se clicar no fundo (overlay), não nas imagens
        if (e.target === galleryOverlay) {
            closeGallery();
        }
    });
}