/* script.js */
const generalNewsContainer = document.getElementById('category-general');
const businessNewsContainer = document.getElementById('category-business');
const entertainmentNewsContainer = document.getElementById('category-entertainment');
const healthNewsContainer = document.getElementById('category-health');
const scienceNewsContainer = document.getElementById('category-science');
const sportsNewsContainer = document.getElementById('category-sports');
const technologyNewsContainer = document.getElementById('category-technology');

const allCountryCodes = ['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'];

const API_KEY2 = '00715f1f32b94859aac4e24f0825a205'
const API_KEY1 = 'e2795791a80d4d3b93e50de8a80b1e62';
const API_KEY = 'd091d89b51e242a5ab49f8721a8cad77';
const API_URL = 'https://newsapi.org/v2/top-headlines';

const countryInput = document.getElementById('countryInput');
const suggestions = document.getElementById('suggestions');
// Objeto para armazenar em cache os resultados da API
const displayedArticleTitles = {};

// Função para esperar um certo período de tempo antes de fazer a próxima solicitação
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchNews(country, category) {
    const response = await fetch(`${API_URL}?country=${country}&category=${category}&apiKey=${API_KEY2}`);
    const data = await response.json();
    await delay(1000);
    return data.articles;
}

async function displayNews(country, category, categoryContainer, qtdArtigos) {
    const news = await fetchNews(country, category, qtdArtigos);
    let artigosEncontrados = 0;
    categoryContainer.innerHTML = ''; // Limpa o conteúdo anterior

    news.forEach(article => {
        // Verifica se o artigo já foi exibido (compara pelo título)
        if (!displayedArticleTitles[article.title] && article.urlToImage && artigosEncontrados < qtdArtigos) {
            const newsItem = document.createElement('div');
            newsItem.classList.add('grid');
            newsItem.innerHTML = `
                <img src="${article.urlToImage}" alt="${article.title}">
                <h2>${article.title}</h2>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Leia Mais</a>
            `;
            categoryContainer.appendChild(newsItem);

            // Marca o título do artigo como exibido
            displayedArticleTitles[article.title] = true;
            artigosEncontrados++;
        }
    });
}

// Funções do sidebar
function openSidebar(e){
    document.getElementById("sidebar").style.width = "350px";
    document.getElementsByTagName('body')[0].style.overflow = "hidden";
}
function closeSidebar(e){
    document.getElementById("sidebar").style.width = "0px";
    document.getElementsByTagName('body')[0].style.overflow = "unset";

}
//fim das funções do sidebar

// Carrega as notícias ao carregar a página com um país padrão (por exemplo, "US" para os Estados Unidos)
const defaultCountry = 'US';
window.addEventListener('load', () => {
    displayNews(defaultCountry, 'general', generalNewsContainer, 4);
    displayNews(defaultCountry, 'business', businessNewsContainer, 4);
    displayNews(defaultCountry, 'entertainment', entertainmentNewsContainer, 4);
    displayNews(defaultCountry, 'health', healthNewsContainer, 4);
    displayNews(defaultCountry, 'science', scienceNewsContainer, 4);
    displayNews(defaultCountry, 'sports', sportsNewsContainer, 4);
    displayNews(defaultCountry, 'technology', technologyNewsContainer, 4);
});

