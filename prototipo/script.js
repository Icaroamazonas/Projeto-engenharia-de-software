/* script.js */
const countryInput = document.getElementById('countryInput');
const suggestions = document.getElementById('suggestions');
const newsContainer = document.getElementById('newsContainer');
const AllCountryCodes = ['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'];
const API_KEY = 'e2795791a80d4d3b93e50de8a80b1e62';
const API_URL = 'https://newsapi.org/v2/top-headlines';

async function fetchRandomCountryCode(l) {
    const randomCountryCodes = [];
    while (randomCountryCodes.length < l) {
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
    try {
        const countryCodes = await fetchRandomCountryCodes(3);
        const noticiasContainer = document.getElementById('noticias-container');
        noticiasContainer.innerHTML = ''; // Limpa o conteúdo anterior

        for (const countryCode of countryCodes) {
            const response = await fetch(`${API_URL}?country=${countryCode}&category=general&apiKey=${API_KEY}`);
            const data = await response.json();
            const article = data.articles[0]; // Pega a primeira notícia

            // Exiba a notícia no elemento de conteúdo
            const noticiasItem = document.createElement('div');
            noticiasItem.classList.add('news-item');
            noticiasItem.innerHTML = `
                <img src="${article.urlToImage}" alt="${article.title}">
                <h2>${article.title}</h2>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Leia Mais</a>
            `;
            noticiasContainer.appendChild(noticiasItem);
        }
    } catch (error) {
        console.error('Erro ao buscar notícias:', error);
    }
}

// Evento de digitação para atualizar as sugestões enquanto digita
countryInput.addEventListener('input', async () => {
    const inputText = countryInput.value.toLowerCase();
    const response = await fetch('https://restcountries.com/v3.1/name/' + inputText);
    const countries = await response.json();
    
    // Limpa as sugestões atuais
    suggestions.innerHTML = '';

    // Adiciona as sugestões à lista
    countries.forEach(country => {
        const suggestionItem = document.createElement('div');
        suggestionItem.textContent = country.name.common;
        suggestionItem.addEventListener('click', async () => {
            countryInput.value = country.name.common;
            suggestions.innerHTML = ''; // Limpa as sugestões quando um país é selecionado
            displayNews(country.cca2); // Exibe notícias do país selecionado
        });
        suggestions.appendChild(suggestionItem);
    });
});

// Evento de carregamento da página para buscar as notícias gerais
window.addEventListener('load', () => {
    fetchNewsGeneral();
});




