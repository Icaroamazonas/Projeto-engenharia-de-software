// script.js
const countrySelect = document.getElementById('countrySelect');
const newsContainer = document.getElementById('newsContainer');

const API_KEY = 'e2795791a80d4d3b93e50de8a80b1e62'; // Substitua pelo seu API Key
const API_URL = 'https://newsapi.org/v2/top-headlines';

async function fetchNews(countryCode) {
    const response = await fetch(`${API_URL}?country=${countryCode}&apiKey=${API_KEY}`);
    const data = await response.json();
    return data.articles;
}

async function displayNews(countryCode) {
    const news = await fetchNews(countryCode);

    newsContainer.innerHTML = ''; // Limpa o conteúdo anterior

    news.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        newsItem.innerHTML = `
            <img src="${article.urlToImage}" alt="${article.title}">
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        `;
        newsContainer.appendChild(newsItem);
    });
}

countrySelect.addEventListener('change', () => {
    const countryCode = countrySelect.value;
    displayNews(countryCode);
});

// Evento de digitação para atualizar as notícias enquanto digita o país
countrySelect.addEventListener('input', () => {
    const countryCode = countrySelect.value;
    displayNews(countryCode);
});

// Carrega as notícias ao carregar a página com um país padrão (por exemplo, "US" para os Estados Unidos)
const defaultCountry = 'US';
displayNews(defaultCountry);

