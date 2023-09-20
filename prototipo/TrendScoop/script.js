// Recupere a escolha do usuário do localStorage ou use um valor padrão
const userCountry = localStorage.getItem('userCountry') || 'US';
const countrySelect = document.getElementById('countrySelect');
const saveSettingsButton = document.getElementById('saveSettingsButton');

// Configure o valor selecionado no elemento <select>
countrySelect.value = userCountry;

// Adicione um ouvinte de evento para o botão "Salvar Configurações"
saveSettingsButton.addEventListener('click', () => {
  // Obtenha o país selecionado pelo usuário
  const selectedCountry = countrySelect.value;
  
  // Armazene a escolha do usuário no localStorage
  localStorage.setItem('userCountry', selectedCountry);
  
  // Recarregue a página para aplicar as novas configurações
  window.location.reload();
});

// Função para esperar um certo período de tempo antes de fazer a próxima solicitação
function delay(ms) {
}

// Função para buscar notícias, com cache
async function fetchNews(country, category) {
}

async function displayNews(country, category, categoryContainer, qtdArtigos) {
}

// Funções do sidebar
function openSidebar(e){
    // ... (código anterior)
}
function closeSidebar(e){
}

// Carrega as notícias ao carregar a página com o país selecionado pelo usuário
window.addEventListener('load', () => {
    // Obtenha o país selecionado pelo usuário do localStorage
    const userCountry = localStorage.getItem('userCountry') || 'US';
    
    displayNews(userCountry, 'general', generalNewsContainer, 4);
    displayNews(userCountry, 'business', businessNewsContainer, 4);
    displayNews(userCountry, 'entertainment', entertainmentNewsContainer, 4);
    displayNews(userCountry, 'health', healthNewsContainer, 4);
    displayNews(userCountry, 'science', scienceNewsContainer, 4);
    displayNews(userCountry, 'sports', sportsNewsContainer, 4);
    displayNews(userCountry, 'technology', technologyNewsContainer, 4);
});
