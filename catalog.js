document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const currentCat = params.get("cat");
    const catalogTitle = document.getElementById("catalog-title");

    // 1. Filtragem de Itens e Título
    if (currentCat && catalogTitle) {
        catalogTitle.textContent = `Catálogo ${currentCat.toUpperCase()}`;
        document.querySelectorAll(".item").forEach(item => {
            item.style.display = item.getAttribute("data-cat") === currentCat ? "flex" : "none";
        });

        // Mostra apenas o botão "Saiba mais" da categoria ativa
        document.querySelectorAll(".btn-saiba-mais").forEach(btn => {
            btn.style.display = btn.getAttribute("data-cat") === currentCat ? "inline-block" : "none";
        });
    }

    // 2. Imagens de Capa
    document.querySelectorAll('.item').forEach(item => {
        const cover = item.getAttribute('data-cover');
        if (cover && cover.trim() !== "") {
            item.style.backgroundImage = `url('${cover}')`;
        }
    });

    // 3. Botão Voltar (Navegação)
    const btnVoltar = document.getElementById("btn-voltar-categorias");
    if (btnVoltar) {
        btnVoltar.addEventListener("click", () => {
            window.location.href = 'categories.html';
        });
    }

    // 4. Lógica do Botão "Saiba mais" (Usando o conteúdo do seu core.js)
    const infoContent = {
        f: { title: "Fetiches - Saiba mais", text: "Meus fetiches são exagerados, pesados, sujos e estranhos. Essa lista conterá meus preferidos, mas, com certeza, não todos os que gosto ou faço. Meus únicos limites conhecidos são: pegging; scat; e vore. Dito isso, pode ser uma porquinha comigo e falar com bastante ousadia." },
        t: { title: "Sobre o Catálogo T", text: "Informações específicas do catálogo T..." },
        p: { title: "Sobre o Catálogo P", text: "Descrição personalizada do catálogo P..." },
        a: { title: "Sobre o Catálogo A", text: "Texto explicativo do catálogo A..." }
    };

    document.querySelectorAll(".btn-saiba-mais").forEach(btn => {
       btn.addEventListener("click", function() {
        const cat = this.getAttribute("data-cat");
        
        if (typeof infoContent !== 'undefined' && infoContent[cat] && window.CatalogOverlay) {
            // 1. Primeiro, garantimos que o botão de galeria suma antes de abrir
            const galleryBtn = document.getElementById("open-gallery");
            if (galleryBtn) {
                galleryBtn.style.display = "none";
                galleryBtn.onclick = null; // Remove qualquer função de clique anterior
            }
                window.CatalogOverlay.openOverlay({
                    title: infoContent[cat].title,
                    description: infoContent[cat].text,
                    note: ""
                });
            }
        });
    });

    // 5. Clique nos Itens do Catálogo
    document.querySelectorAll(".item").forEach(item => {
        item.addEventListener("click", function() {
            const data = {
                title: this.getAttribute("data-title"),
                description: this.getAttribute("data-description"),
                note: this.getAttribute("data-note")
            };

            if (window.CatalogOverlay) {
                window.CatalogOverlay.openOverlay(data);
                
                // Configura o botão da galeria dentro do overlay
                const imgs = this.getAttribute("data-images");
                const galleryBtn = document.getElementById("open-gallery");
                if (galleryBtn) {
                    if (imgs && imgs.trim() !== "" && imgs !== "#,#") {
                        galleryBtn.style.display = "block";
                        galleryBtn.onclick = () => {
                            if (window.CatalogGallery) window.CatalogGallery.openGallery(imgs.split(","));
                        };
                    } else {
                        galleryBtn.style.display = "none";
                    }
                }
            }
        });
    });
});