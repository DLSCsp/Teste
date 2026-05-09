// index: overlay de confirmação
const btnAcessar = document.getElementById('btn-acessar');
const overlay = document.getElementById('overlay');
const confirmar = document.getElementById('confirmar');
const cancelar = document.getElementById('cancelar');

if (btnAcessar && overlay) {
    btnAcessar.addEventListener('click', () => {
        overlay.style.display = 'flex';
    });

    confirmar.addEventListener('click', () => {
        window.location.href = 'categories.html';
    });

    cancelar.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.style.display = 'none';
    });
}

// categories: navegação
const voltarIndex = document.getElementById('voltar-index');
if (voltarIndex) {
    voltarIndex.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

document.querySelectorAll('.category-button').forEach(btn => {
    btn.addEventListener('click', () => {
        const cat = btn.dataset.cat || 'f';
        window.location.href = `catalog.html?cat=${encodeURIComponent(cat)}`;
    });
});