// JavaScript para o carrossel de imagens
        let currentIndex = 0; // Inicializa o índice da imagem atual do carrossel
        const carousel = document.querySelector('.carousel'); // Seleciona o elemento do carrossel
        const images = document.querySelectorAll('.carousel-image'); // Seleciona todas as imagens do carrossel
        const totalImages = images.length; // Obtém o número total de imagens

        function updateCarousel() { // Função para atualizar a posição do carrossel
            // Garante que o índice esteja dentro dos limites (0 a totalImages - 1)
            if (currentIndex >= totalImages) { // Se o índice for maior ou igual ao total de imagens, volta para a primeira
                currentIndex = 0;
            } else if (currentIndex < 0) { // Se o índice for menor que 0, vai para a última imagem
                currentIndex = totalImages - 1;
            }
            if (carousel) {
                carousel.style.transform = `translateX(-${currentIndex * 100}%)`; // Move o carrossel horizontalmente
            }
        }

        function nextSlide() { // Função para avançar para a próxima imagem
            currentIndex++; // Incrementa o índice
            updateCarousel(); // Atualiza o carrossel
        }

        function prevSlide() { // Função para voltar para a imagem anterior
            currentIndex--; // Decrementa o índice
            updateCarousel(); // Atualiza o carrossel
        }

        // --- Generic Lightbox Logic ---
        function initializeLightbox(gallerySelector, modalId) {
            const galleryItems = document.querySelectorAll(gallerySelector);
            const lightbox = document.getElementById(modalId);
            const lightboxImg = lightbox.querySelector('img');
            const lightboxCaption = lightbox.querySelector('.lightbox-caption');
            const lightboxPrompt = lightbox.querySelector('.lightbox-prompt');
            const closeBtn = lightbox.querySelector('.lightbox-close');
            const prevBtn = lightbox.querySelector('.lightbox-prev');
            const nextBtn = lightbox.querySelector('.lightbox-next');

            let currentGalleryIndex = 0;

            function openLightbox(index) {
                currentGalleryIndex = index;
                const item = galleryItems[currentGalleryIndex];
                const imgSrc = item.querySelector('img').src;
                const caption = item.getAttribute('data-caption');
                const prompt = item.getAttribute('data-prompt');

                lightboxImg.src = imgSrc;
                if (lightboxCaption) lightboxCaption.textContent = caption;
                if (lightboxPrompt) lightboxPrompt.textContent = prompt;
                lightbox.classList.add('show');
            }

            function closeLightbox() {
                lightbox.classList.remove('show');
            }

            function showPrevImage() {
                currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
                openLightbox(currentGalleryIndex);
            }

            function showNextImage() {
                currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
                openLightbox(currentGalleryIndex);
            }

            galleryItems.forEach((item, index) => {
                item.addEventListener('click', () => openLightbox(index));
            });

            if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
            if(prevBtn) prevBtn.addEventListener('click', showPrevImage);
            if(nextBtn) nextBtn.addEventListener('click', showNextImage);

            // Close with the Esc key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightbox.classList.contains('show')) {
                    closeLightbox();
                }
            });

            // Close by clicking outside the image
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
        }

        // Initialize lightboxes
        initializeLightbox('.gallery-item', 'lightbox');
        initializeLightbox('.creative-lab-item', 'creative-lab-modal');

        // JavaScript para o efeito Matrix no mouse
        const body = document.body; // Seleciona o elemento body do documento
        body.addEventListener('mousemove', (e) => { // Adiciona um listener para o evento de movimento do mouse no body
            // Ativa o efeito Matrix apenas no Tema Matrix
            if (!body.classList.contains('matrix-theme')) { // Verifica se o body NÃO contém a classe 'matrix-theme'
                return; // Se não tiver, sai da função (não executa o efeito)
            }

            const matrixEffect = document.createElement('div'); // Cria um novo elemento div
            matrixEffect.className = 'matrix-effect'; // Adiciona a classe CSS 'matrix-effect'
            matrixEffect.style.left = `${e.pageX}px`; // Define a posição horizontal do caractere (onde o mouse está)
            matrixEffect.style.top = `${e.pageY}px`; // Define a posição vertical do caractere (onde o mouse está)
            matrixEffect.textContent = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Gera uma letra aleatória (A-Z)
            body.appendChild(matrixEffect); // Adiciona o caractere ao body

            setTimeout(() => { // Define um temporizador para remover o caractere após um tempo
                matrixEffect.remove(); // Remove o elemento do DOM
            }, 1500); // Duração da animação em milissegundos (1.5 segundos)
        });

        // JavaScript para o botão de Voltar ao Topo
        const scrollToTopBtn = document.getElementById('scroll-to-top'); // Seleciona o botão de voltar ao topo

        window.addEventListener('scroll', () => { // Adiciona um listener para o evento de rolagem da janela
            if (window.scrollY > 300) { // Se a rolagem vertical for maior que 300px
                scrollToTopBtn.classList.add('show'); // Adiciona a classe 'show' para tornar o botão visível
            } else {
                scrollToTopBtn.classList.remove('show'); // Remove a classe 'show' para esconder o botão
            }
        });

        scrollToTopBtn.addEventListener('click', () => { // Adiciona um listener para o evento de clique no botão
            window.scrollTo({ // Rola a janela para a posição especificada
                top: 0, // Rola para o topo da página
                behavior: 'smooth' // Rolagem suave
            });
        });

        // JavaScript para o botão de Mudar Tema
        const themeToggle = document.getElementById('theme-toggle'); // Seleciona o botão de alternar tema
        const themeIcon = themeToggle.querySelector('.theme-icon'); // Seleciona o ícone dentro do botão
        const themeText = themeToggle.querySelector('.theme-text'); // Seleciona o texto dentro do botão

        function updateThemeButton() { // Função para atualizar o ícone e texto do botão de tema
            if (body.classList.contains('matrix-theme')) { // Se o body tiver a classe 'matrix-theme' (tema Matrix ativado)
                themeIcon.innerHTML = '<i class="fas fa-sun"></i>'; // Mostra o ícone do sol
                themeText.textContent = 'Tema Claro'; // Altera o texto para 'Tema Claro'
            } else { // Se o body NÃO tiver a classe 'matrix-theme' (tema Claro ativado)
                themeIcon.innerHTML = '<i class="fas fa-moon"></i>'; // Mostra o ícone da lua
                themeText.textContent = 'Tema Matrix'; // Altera o texto para 'Tema Matrix'
            }
        }

        themeToggle.addEventListener('click', () => { // Adiciona um listener para o evento de clique no botão de tema
            body.classList.toggle('matrix-theme'); // Alterna a classe 'matrix-theme' no body
            // Armazena a preferência do tema no localStorage do navegador
            if (body.classList.contains('matrix-theme')) { // Se o tema Matrix estiver ativo
                localStorage.setItem('theme', 'matrix'); // Salva 'matrix' como preferência
            } else { // Se o tema Claro estiver ativo
                localStorage.setItem('theme', 'light'); // Salva 'light' como preferência
            }
            updateThemeButton(); // Atualiza o ícone e texto do botão
        });

        // Carrega a preferência do tema ao carregar a página
        document.addEventListener('DOMContentLoaded', () => { // Executa o código quando o DOM estiver completamente carregado
            const savedTheme = localStorage.getItem('theme'); // Tenta recuperar a preferência de tema do localStorage
            if (savedTheme === 'matrix') { // Se o tema salvo for 'matrix'
                body.classList.add('matrix-theme'); // Adiciona a classe 'matrix-theme' ao body
            }
            // Inicializa o tema e as partículas
            updateThemeButton(); // Atualiza o ícone e texto do botão de tema na carga inicial

            // Adiciona partículas de fundo
            const particlesContainer = document.querySelector('.background-particles'); // Seleciona o contêiner das partículas
            // Remove partículas existentes antes de adicionar novas para evitar duplicação em re-renderizações
            particlesContainer.innerHTML = ''; // Limpa o conteúdo do contêiner de partículas
            for (let i = 0; i < 50; i++) { // Loop para criar 50 partículas
                const particle = document.createElement('div'); // Cria um novo elemento div para a partícula
                particle.className = 'particle'; // Adiciona a classe CSS 'particle'
                particle.style.width = `${Math.random() * 3 + 1}px`; // Define um tamanho aleatório para a largura da partícula (1 a 4px)
                particle.style.height = particle.style.width; // Define a altura igual à largura (para ser circular)
                particle.style.left = `${Math.random() * 100}%`; // Define uma posição horizontal aleatória
                particle.style.top = `${Math.random() * 100}%`; // Define uma posição vertical aleatória
                particle.style.animationDelay = `${Math.random() * 10}s`; // Define um atraso de animação aleatório para cada partícula
                particlesContainer.appendChild(particle); // Adiciona a partícula ao contêiner
            }
        });