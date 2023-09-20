/* script.js */
// Mapeamento de nomes de categoria em inglês para português
const categoryNames = {
    business: 'Negócios',
    entertainment: 'Entretenimento',
    health: 'Saúde',
    science: 'Ciência',
    sports: 'Esportes',
    technology: 'Tecnologia'
};

const categoryGeneralContainer = document.getElementById('category-general');
const categoryOtherContainer = document.getElementById('category-other');
const categoriaTitulo = document.getElementById('categoria-titulo');
const categoriaAnterior = document.getElementById('categoria-anterior');
const categoriaProxima = document.getElementById('categoria-proxima');

const allCountryCodes = ['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'];

const API_KEY3 = '4a84afc4eb144b3f8106d1e9dbc25f1c';
const API_KEY2 = '00715f1f32b94859aac4e24f0825a205';
const API_KEY1 = 'e2795791a80d4d3b93e50de8a80b1e62';
const API_KEY = 'd091d89b51e242a5ab49f8721a8cad77';
const API_URL = 'https://newsapi.org/v2/top-headlines';

// Objeto para armazenar em cache os resultados da API
const displayedArticleTitles = {};

// Objeto para armazenar as notícias filtradas por categoria
const filteredNews = {
    general: [],
    business: [],
    entertainment: [],
    health: [],
    science: [],
    sports: [],
    technology: [],
};

// Função para esperar um certo período de tempo antes de fazer a próxima solicitação
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Função para buscar notícias, com cache e filtragem
async function fetchNews(category, maxArticles) {

    const response = await fetch(`${API_URL}?country=us&category=${category}&apiKey=${API_KEY3}`);
    const data = await response.json();

    // Filtra as notícias para conter no máximo `maxArticles` e ter imagem
    const filteredArticles = data.articles.filter(article => {
        return article.urlToImage;
    }).slice(0, maxArticles);

    // Filtra novamente para excluir títulos já exibidos
    const uniqueArticles = filteredArticles.filter(article => {
        return !displayedArticleTitles[article.title];
    });

    await delay(200);

    // Atualiza o objeto de notícias filtradas
    filteredNews[category] = uniqueArticles;

    // Atualiza o objeto de títulos exibidos
    uniqueArticles.forEach(article => {
        displayedArticleTitles[article.title] = true;
    });

    return uniqueArticles;
}

// Função para exibir notícias de uma categoria
async function displayNews(category, categoryContainer) {
    const news = filteredNews[category]; // Obtenha as notícias filtradas para a categoria atual
    categoryContainer.innerHTML = ''; // Limpa o conteúdo anterior
    news.forEach((article, index) => {
        // Verifica se o artigo já foi exibido (compara pelo título)
        const newsItem = document.createElement('div');
        if (categoryContainer === categoryGeneralContainer) {
            if (index === 0) {
                newsItem.classList.add('big-news'); // Classe para estilizar a notícia grande
            } else {
                newsItem.classList.add('small-news'); // Classe para estilizar as notícias pequenas
            }
        } else {
            newsItem.classList.add('medium-news'); // Classe para estilizar a notícia grande em outras categorias
        }
        newsItem.innerHTML = `
            <a href="${article.url}" target="_blank">
                <div class="grid-image">
                    <img src="${article.urlToImage}" alt="${article.title}">
                </div>
                <h2 class="grid-title">${article.title}</h2>
            </a>
        `;
        categoryContainer.appendChild(newsItem);
    });
}

// Navegação entre categorias
const categorias = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];
let categoriaAtual = 'technology'; // Categoria inicial
categoriaTitulo.textContent = categoryNames[categoriaAtual]; // Define o nome em português

categoriaAnterior.addEventListener('click', () => {
    const indiceAtual = categorias.indexOf(categoriaAtual);
    const indiceAnterior = (indiceAtual - 1 + categorias.length) % categorias.length;

    categoriaAtual = categorias[indiceAnterior];
    categoriaTitulo.textContent = categoryNames[categoriaAtual]; // Atualiza o nome em português

    // Exibir notícias da categoria atual
    displayNews(categoriaAtual, categoryOtherContainer);
});

categoriaProxima.addEventListener('click', () => {
    const indiceAtual = categorias.indexOf(categoriaAtual);
    const indiceProxima = (indiceAtual + 1) % categorias.length;

    categoriaAtual = categorias[indiceProxima];
    categoriaTitulo.textContent = categoryNames[categoriaAtual]; // Atualiza o nome em português

    // Exibir notícias da categoria atual
    displayNews(categoriaAtual, categoryOtherContainer);
});

// Carrega as notícias ao carregar a página com a categoria inicial
window.addEventListener('load', async () => {
    // Carrega notícias de várias categorias
    await fetchNews('general', 3);
    await fetchNews('technology', 5);
    await fetchNews('business', 5);
    await fetchNews('science', 5);
    await fetchNews('entertainment', 5);
    await fetchNews('health', 5);
    await fetchNews('sports', 5);

    // Exibe as notícias da categoria "geral"
    displayNews('general', categoryGeneralContainer);
    displayNews(categoriaAtual, categoryOtherContainer);

});