# TrendScoop - Seu agregador de Notícias Populares Globais


## Sobre o Projeto

TrendScoop é uma plataforma de notícias que oferece informações globais de última hora. Nosso objetivo é fornecer uma visão abrangente das notícias mais populares das últimas 24 horas de todo o mundo. Este projeto foi desenvolvido como parte de um trabalho acadêmico.

## Equipe

* [Gabriel Albertin Vieira (gav)](https://github.com/gavgabriel)
* [Ícaro Amazonas Samico (ias6)](https://github.com/Icaroamazonas)
* [Lidiane Pereira da Silva Felix (lpsf)](https://github.com/lidianepsfelix)
* [Luiz Roberto Bezerra Ferreira (lrbf)](https://github.com/roboberto1403)

## Arquitetura

  O TrendScoop segue uma arquitetura cliente-servidor bem definida. A parte do cliente é desenvolvida usando tecnologias web padrão, como HTML, CSS e JavaScript. Essa parte do código lida com a interface do usuário e a experiência do usuário final.

  Do lado do servidor, o TrendScoop utiliza JavaScript no lado do cliente para interagir com a [API REST NewsAPI](https://newsapi.org/). A integração com a NewsAPI é uma parte fundamental da arquitetura, na medida que fornece acesso a uma ampla variedade de fontes de notícias e artigos. A comunicação entre o cliente e o servidor é feita por meio de requisições HTTP, seguindo o modelo RESTful. O servidor processa as solicitações do cliente, faz chamadas à API externa quando necessário e retorna os resultados ao cliente.
  A arquitetura do TrendScoop é projetada para separar claramente as preocupações entre o cliente e o servidor, permitindo uma manutenção mais eficiente e escalabilidade à medida que o projeto cresce.
  
### Principais Recursos

* Notícias organizadas por categoria
* Visualização de notícias em destaque

## Como Contribuir

Se você deseja contribuir para o desenvolvimento do TrendScoop, fique à vontade para fazer um fork do repositório e criar solicitações de pull com suas melhorias. Aqui estão funcionalidades suportadas pela NewsAPI que não foram incluídas neste projeto mas que seriam mais do que bem vindas:

* Busca de notícias por palavras-chave
* Busca de notícias baseadas em sites provedores de notícia específicos

Sua criatividade é o limite, fique à vontade para iterar em cima do que iniciamos!

## Instruções de como rodar o programa:

Certifique-se de que você tem o Node.js instalado no seu sistema. Se você não tiver, você pode baixá-lo e instalá-lo a partir do site oficial do Node.js: https://nodejs.org/.

1. Clone o Repositório:

   ```bash
   git clone (https://github.com/Icaroamazonas/Projeto-engenharia-de-software)

2. Navegue até o Diretório do Projeto:
   ```bash
   cd caminho-local-do-repositorio
   ```
   Não esqueça de substituir "caminho-local-do-repositorio" pelo caminho em que o repositório foi salvo em seu computador.
   
3. Instale o "http-server" Globalmente:
   ```bash
   npm install -g http-server
   ```
4. Inicie o Servidor Local:
Use o seguinte comando para iniciar o servidor local na porta 5500 (ou em uma porta de sua escolha):
   ```bash
   http-server -p 5500
   ```
Isso iniciará o servidor na porta especificada e fornecerá um URL local, geralmente algo como "http://localhost:5500".

5. Acesse o Programa:

Abra seu navegador da web e acesse o URL local fornecido (por exemplo, "http://localhost:5500") para visualizar e interagir com o programa.

---

**TrendScoop** - Seu agregador de Notícias Populares Globais
