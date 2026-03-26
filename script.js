document.addEventListener("DOMContentLoaded", () => {
    const portfolioGrid = document.getElementById("portfolio-grid");

    // Projeleri getirme fonksiyonu
    async function loadProjects() {
        try {
            // data.json dosyasını okuyoruz
            const response = await fetch('js/data.json');
            const projects = await response.json();

            // İlk projeyi "Ana Görsel" (büyük) yapıyoruz
            const featuredProject = projects[0];
            // Kalan projeleri sağ tarafa küçük görseller olarak ayırıyoruz
            const sideProjects = projects.slice(1, 3);

            renderProjects(featuredProject, sideProjects);
        } catch (error) {
            console.error("Projeler yüklenirken hata oluştu:", error);
            portfolioGrid.innerHTML = "<p>Projeler şu an yüklenemiyor.</p>";
        }
    }

    // Projeleri HTML'e çevirip ekrana basma
    function renderProjects(featured, sides) {
        // Soldaki Büyük Görsel HTML'i
        let htmlContent = `
            <article class="project-card featured">
                <img src="assets/img/projeler/${featured.gorsel}" alt="${featured.baslik}">
                <span class="project-category">${featured.kategori.replace('-', ' ')}</span>
                <h2 class="project-title">${featured.baslik}</h2>
                <p style="margin-top: 10px; color: #666;">${featured.aciklama}</p>
            </article>
            <div class="side-projects">
        `;

        // Sağdaki Küçük Görsellerin HTML'i
        sides.forEach(project => {
            htmlContent += `
                <article class="project-card standard">
                    <img src="assets/img/projeler/${project.gorsel}" alt="${project.baslik}">
                    <span class="project-category">${project.kategori.replace('-', ' ')}</span>
                    <h2 class="project-title" style="font-size: 1.2rem;">${project.baslik}</h2>
                </article>
            `;
        });

        htmlContent += `</div>`; // side-projects div'ini kapat

        // Hazırlanan HTML'i sayfaya ekle
        portfolioGrid.innerHTML = htmlContent;
    }

    // Fonksiyonu çalıştır
    loadProjects();
});