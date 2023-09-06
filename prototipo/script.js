/* script.js */
const generalNewsContainer = document.getElementById('category-general');
const businessNewsContainer = document.getElementById('category-business');
const entertainmentNewsContainer = document.getElementById('category-entertainment');
const healthNewsContainer = document.getElementById('category-health');
const scienceNewsContainer = document.getElementById('category-science');
const sportsNewsContainer = document.getElementById('category-sports');
const technologyNewsContainer = document.getElementById('category-technology');
const allCountryCodes = ['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'];
const API_KEY = 'e2795791a80d4d3b93e50de8a80b1e62';
const API_URL = 'https://newsapi.org/v2/top-headlines';

async function fetchRandomCountryCodes(numberOfCodes) {
    const randomCountryCodes = [];
    while (randomCountryCodes.length < numberOfCodes) {
        const randomIndex = Math.floor(Math.random() * 54); // gera um numero aleatório que está dentro do tamanho da lista de países suportados pela NewsAPI (54)
        const randomCountryCode = allCountryCodes[randomIndex]; 
        /* adiciona o país a lista de países aleatórios caso não já esteja dentro dela */
        if (!randomCountryCodes.includes(randomCountryCode)) {
            randomCountryCodes.push(randomCountryCode);
        }
    }
    return randomCountryCodes;
}

async function fetchNews(category, numberOfCodes) {
    const countryCodes = await fetchRandomCountryCodes(numberOfCodes);
    const listOfArticles = [];

    for (const countryCode of countryCodes) {
        const response = await fetch(`${API_URL}?country=${countryCode}&category=${category}&apiKey=${API_KEY}`);
        const data = await response.json();
        listOfArticles.push(data.articles[0]); // Pega a primeira notícia
        }
    return listOfArticles;
}

async function displayNews(category, categoryContainer, numberOfCodes) {
    const news = await fetchNews(category, numberOfCodes);

    categoryContainer.innerHTML = ''; // Limpa o conteúdo anterior

    news.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('grid');
        newsItem.innerHTML = `
            <img src="${article.urlToImage}" alt="${article.title}">
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Leia Mais</a>
        `;
        categoryContainer.appendChild(newsItem);
    });
}


displayNews('general', generalNewsContainer, 3);
displayNews('business', businessNewsContainer, 2);
displayNews('entertainment', entertainmentNewsContainer, 2);
displayNews('health', healthNewsContainer, 2);
displayNews('science', scienceNewsContainer, 2);
displayNews('sports', sportsNewsContainer, 2);
displayNews('technology', technologyNewsContainer, 2);



