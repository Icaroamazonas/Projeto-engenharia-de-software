/* script.js */
const countrySelect = document.getElementById('countrySelect');
const newsContainer = document.getElementById('newsContainer');
const countryInput = document.getElementById('countryInput'); // Novo elemento de entrada para pesquisa de países
const suggestions = document.getElementById('suggestions'); // Elemento para exibir sugestões

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

// Evento de digitação para atualizar as sugestões enquanto digita
countryInput.addEventListener('input', () => {
    const inputText = countryInput.value.toLowerCase();
    const filteredCountries = countries.filter(country =>
        country.toLowerCase().includes(inputText)
    );

    // Limpa as sugestões atuais
    suggestions.innerHTML = '';

    // Adiciona as sugestões à lista
    filteredCountries.forEach(country => {
        const suggestionItem = document.createElement('div');
        suggestionItem.textContent = country;
        suggestionItem.addEventListener('click', () => {
            countryInput.value = country;
            suggestions.innerHTML = ''; // Limpa as sugestões quando um país é selecionado
            displayNews(country); // Exibe notícias do país selecionado
        });
        suggestions.appendChild(suggestionItem);
    });
});

// Evento de seleção de país para exibir as notícias
countrySelect.addEventListener('change', () => {
    const countryCode = countrySelect.value;
    displayNews(countryCode);
});

// Carrega as notícias ao carregar a página com um país padrão (por exemplo, "US" para os Estados Unidos)
const defaultCountry = 'US';
displayNews(defaultCountry);


