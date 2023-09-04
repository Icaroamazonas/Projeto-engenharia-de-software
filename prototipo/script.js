/* script.js */
const countryInput = document.getElementById('countryInput');
const suggestions = document.getElementById('suggestions');
const newsContainer = document.getElementById('newsContainer');
const allCountryCodes = ['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'];
const API_KEY = 'e2795791a80d4d3b93e50de8a80b1e62';
const API_URL = 'https://newsapi.org/v2/top-headlines';

async function fetchRandomCountryCode(numberOfCodes) {
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

async function fetchNewsGeneral() {
    const countryCodes = await fetchRandomCountryCodes(3);
    const listOfArticles = [];

    for (const countryCode of countryCodes) {
        const response = await fetch(`${API_URL}?country=${countryCode}&category=general&apiKey=${API_KEY}`);
        const data = await response.json();
        listOfArticles.push(data.articles[0]); // Pega a primeira notícia
        }
    return listOfArticles;
}

async function displayNewsGeneral() {
    const news = await fetchNewsGeneral();

    newsContainer.innerHTML = ''; // Limpa o conteúdo anterior

    news.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('general-news-item');
        newsItem.innerHTML = `
            <img src="${article.urlToImage}" alt="${article.title}">
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        `;
        newsContainer.appendChild(newsItem);
    });
}

displayNewsGeneral();





