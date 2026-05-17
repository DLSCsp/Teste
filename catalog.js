document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const currentCat = params.get("cat");
    const catalogTitle = document.getElementById("catalog-title");

    // Dicionário de nomes personalizados para os catálogos
    const nomesCatalogos = {
        'f': 'Lista de Fetiches',
        't': 'Sugestões de Temas',
        'p': 'Galeria de Personagens',
        'a': 'Adicionais'
    };

    // 1. Filtragem de Itens e Título
    if (currentCat && catalogTitle) {
        // Verifica se a categoria existe no nosso dicionário, 
        // senão usa o padrão antigo (Catálogo F, etc)
        const nomePersonalizado = nomesCatalogos[currentCat] || `Catálogo ${currentCat.toUpperCase()}`;
        
        catalogTitle.textContent = nomePersonalizado;

        document.querySelectorAll(".item").forEach(item => {
            item.style.display = item.getAttribute("data-cat") === currentCat ? "flex" : "none";
        });

        // Mostra apenas o botão "Saiba mais" da categoria ativa
        document.querySelectorAll(".btn-saiba-mais").forEach(btn => {
            btn.style.display = btn.getAttribute("data-cat") === currentCat ? "inline-block" : "none";
        });

        // Controle de visibilidade do botão "Suas personagens"
const btnSuasPersonagens = document.getElementById("btn-suas-personagens");

if (btnSuasPersonagens) {
    if (currentCat === "p") {
        btnSuasPersonagens.style.display = "inline-block";
    } else {
        btnSuasPersonagens.style.display = "none";
    }
}

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
        f: { title: "Fetiches - Saiba mais", text: "Meus fetiches são exagerados, pesados, sujos e estranhos. Essa lista conterá meus preferidos, mas, com certeza, não todos os que gosto ou faço, já que são muitos. Pode dar uma olhada nos meus outros links, para uma lista maior. Meus únicos limites conhecidos são: pegging; scat; e vore. Dito isso, pode ser uma porquinha comigo e falar com bastante ousadia." },
        t: { title: "Temas - Saiba mais", text: "Costumo utilizar cenários impossíveis, proporções e atitudes exageradas, entre outras características que podem tornar o rp similar a um hentai. Estou aberto a sugestões e gostaria que viesse a mim com uma ideia. Pode usar os temas aqui como inspiração e para entender o tipo de coisa que gosto." },
        p: { title: "Personagens - Saiba mais", text: "Produzi essa lista de personagens prontos, além de um botão com sugestões de tipos de personagens para você, com características que gosto." },
        a: { title: "Efeitos - Saiba mais", text: "Efeitos adicionais para aplicarmos durante o rp, podendo contribuir para o tema." }
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

const suasPersonagensContent = {
    title: "Suas personagens",
    description: "Incluí imagens de personagens que gosto, para que possa ter uma referência, ou usá-las nas nossas encenações.",
    images: "https://cdn.discordapp.com/attachments/1040125396693291038/1505502656037126194/f08116d43149f636e3e2fbfd180b3394.png?ex=6a0adc1c&is=6a098a9c&hm=d2c2095ddfbd737daf4a9ae95069e26ed1165e01c81cd438cc5d36c3cd03b168&,https://wimg.rule34.xxx//images/6850/c7d63ebdf3bb4bc32dc201146fde3782.jpeg,https://cdn.discordapp.com/attachments/1040125396693291038/1505648696581161090/b22d3b915160c0fe6647c9dcd8ab4402.jpeg?ex=6a0b641e&is=6a0a129e&hm=ae465b6816e19447bd8e422f49a096347e19d20269bb3cd4039b5c1127c62f2f&"
};

const btnSuasPersonagens = document.getElementById("btn-suas-personagens");

if (btnSuasPersonagens) {
    btnSuasPersonagens.addEventListener("click", () => {

        window.CatalogOverlay.openOverlay({
            title: suasPersonagensContent.title,
            description: suasPersonagensContent.description,
            note: ""
        });

        const galleryBtn = document.getElementById("open-gallery");
        if (galleryBtn) {
            galleryBtn.style.display = "block";
            galleryBtn.onclick = () => {
                if (window.CatalogGallery) {
                    window.CatalogGallery.openGallery(
                        suasPersonagensContent.images.split(",")
                    );
                }
            };
        }
    });
}