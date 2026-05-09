// Define título com base no parâmetro ?cat=
const params = new URLSearchParams(window.location.search);
const cat = params.get('cat') || 'f';
const catalogTitle = document.getElementById('catalog-title');

const titles = {
    f: 'Catálogo F',
    t: 'Catálogo T',
    p: 'Catálogo P',
    a: 'Catálogo A'
};

if (catalogTitle) {
    catalogTitle.textContent = titles[cat] || 'Catálogo';
}

// Botão voltar
const btnVoltarCategorias = document.getElementById('btn-voltar-categorias');
if (btnVoltarCategorias) {
    btnVoltarCategorias.addEventListener('click', () => {
        window.location.href = 'categories.html';
    });
}

// Clique nos itens
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', () => {
        const title = item.dataset.title || item.querySelector('.item-header span')?.textContent || 'Item';
        const description = item.dataset.description || 'Descrição não disponível.';
        const note = item.dataset.note || '';

        window.CatalogOverlay?.openOverlay({ title, description, note });

        const images = (item.dataset.images || '')
            .split(',')
            .map(s => s.trim())
            .filter(Boolean);

        const btnGallery = document.getElementById('open-gallery');
        if (btnGallery) {
            if (images.length === 0) {
                btnGallery.style.display = 'none';
            } else {
                btnGallery.style.display = 'inline-block';
                btnGallery.onclick = () => window.CatalogGallery?.openGallery(images);
            }
        }
    });
});