document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // Lógica do index.html (Aviso +18)
    // ==========================================
    const btnAcessar = document.getElementById('btn-acessar');
    const overlay = document.getElementById('overlay');
    const confirmar = document.getElementById('confirmar');
    const cancelar = document.getElementById('cancelar');

    if (btnAcessar && overlay) {
        btnAcessar.addEventListener('click', () => {
            overlay.classList.add("active");
        });

        if (confirmar) {
            confirmar.addEventListener('click', () => {
                window.location.href = 'categories.html';
            });
        }

        if (cancelar) {
            cancelar.addEventListener('click', () => {
                overlay.classList.remove("active");
            });
        }

        // Fechar ao clicar fora do popup
        window.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove("active");
            }
        });
    }

    // ==========================================
    // Lógica do categories.html (Navegação)
    // ==========================================
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

    // ==========================================
    // Lógica de "Saiba Mais" (Info Overlay)
    // ==========================================
    const infoButtons = document.querySelectorAll('.btn-saiba-mais');
    const infoOverlay = document.getElementById('info-overlay');
    const infoTitle = document.getElementById('info-title');
    const infoText = document.getElementById('info-text');
    const fecharInfo = document.getElementById('fechar-info');

    const infoContent = {
        f: { title: "Sobre o Catálogo F", text: "Conteúdo exclusivo do catálogo F..." },
        t: { title: "Sobre o Catálogo T", text: "Informações específicas do catálogo T..." },
        p: { title: "Sobre o Catálogo P", text: "Descrição personalizada do catálogo P..." },
        a: { title: "Sobre o Catálogo A", text: "Texto explicativo do catálogo A..." }
    };

    if (infoOverlay && fecharInfo) {
        infoButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const cat = btn.dataset.cat;
                if (infoContent[cat] && infoTitle && infoText) {
                    infoTitle.textContent = infoContent[cat].title;
                    infoText.textContent = infoContent[cat].text;
                } else if (infoTitle && infoText) {
                    infoTitle.textContent = "Informação";
                    infoText.textContent = "Nenhum conteúdo definido para este catálogo.";
                }
                infoOverlay.classList.add('active');
                document.body.style.overflow = "hidden";
            });
        });

        fecharInfo.addEventListener('click', () => {
            infoOverlay.classList.remove('active');
            document.body.style.overflow = "auto";
        });

        infoOverlay.addEventListener('click', (e) => {
            if (e.target === infoOverlay) {
                infoOverlay.classList.remove('active');
                document.body.style.overflow = "auto";
            }
        });
    }
});