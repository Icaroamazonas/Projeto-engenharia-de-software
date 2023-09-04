/* script.js */
const countryInput = document.getElementById('countryInput');
const suggestions = document.getElementById('suggestions');
const newsContainer = document.getElementById('newsContainer');

const API_KEY = 'e2795791a80d4d3b93e50de8a80b1e62';
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

// Carrega as notícias ao carregar a página com um país padrão (por exemplo, "US" para os Estados Unidos)
const defaultCountry = 'US';
displayNews(defaultCountry);

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