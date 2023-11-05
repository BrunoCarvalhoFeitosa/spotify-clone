<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/BrunoCarvalhoFeitosa/spotify-clone">
    <img src="public\images\fav.png" alt="Logo" width="100" weight="100" />
  </a>

  <p align="center">
    Este projeto foi feito em Next.js, Typescript, Supabase, Stripe e TailwindCSS e basicamente consiste num clone da plataforma de streaming Spotify. Em resumo, a aplicação possui funcionalidades de login e cadastro, possui um sistema de pagamento, onde através do Stripe o usuário consegue processar pagamamentos utilizando cartão de crédito, no caso foi criado somente um produto que é uma assinatura mensal no valor de R$21,90. Após a assinatura ser processada com sucesso pelo usuário, ele poderá dar play nas músicas, curti-las e poderá fazer o upload de novas músicas que estarão disponíveis para ele e para os outros usuários da plataforma também.
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
      <ul>
        <li><a href="#feito-com">Feito com</a></li>
        <li><a href="#hospedagem">Hospedagem</a></li>
      </ul>
    </li>
    <li>
      <a href="#iniciando-o-projeto">Iniciando o projeto</a>
      <ul>
        <li><a href="#pré-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalação">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#license">Licenças</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## Sobre o projeto
Através do Supabase, foi possível modelar o banco de dados da aplicação, onde foi possível criar diversas model's sendo uma para Usuários (novos usuários cadastrados), Músicas (upload das músicas dos usuários que possuem cadastro), Produtos (tipo de serviço, no caso assinaturas que podem ser mensais, semestrais ou anuais, eu criei somente uma, que é a mensal), Preço (valor do produto, no caso o preço mensal da assinatura que é de R$21,90) e Músicas Curtidas (salvar as músicas favoritadas pelo usuário). Ao acessar a aplicação pela primeira vez, é possível visualizar todas as músicas que já foram salvas na plataforma, caso o usuário clique no play, será solicitada a ação de login/cadastro. Ao estar logado, caso ele não tenha assinado nenhum plano ainda e caso ele tente dar play em alguma música ou favorita-la, sempre aparecerá um popup para ele assinar o plano mensal. Através do Stripe, o usuário consegue assinar o plano utilizando um cartão de crédito e ter acesso às músicas, a partir deste momento, o usuário consegue ouvir as músicas que ele deseja, curti-las e consegue também fazer o upload de novas músicas.

### Projeto

https://github.com/BrunoCarvalhoFeitosa/spotify-clone/assets/46093815/aa01f86c-2536-4d08-b1ce-5e4b4c3a0cf4

### Feito com

* [Next.js](https://nextjs.org)
* [Typescript](https://www.typescriptlang.org)
* [Supabase](https://github.com/BrunoCarvalhoFeitosa/spotify-clone/assets/46093815/aa01f86c-2536-4d08-b1ce-5e4b4c3a0cf4)
* [Stripe](https://stripe.com/b)
* [TailwindCSS](https://tailwindcss.com)
* [Vercel](https://vercel.com)

### Hospedagem

A aplicação está em produção neste link: (https://bruno-carvalho-feitosa-spotify-clone.vercel.app).

<!-- GETTING STARTED -->
## Iniciando o projeto

Primeiramente será necessário clonar este projeto em (https://github.com/BrunoCarvalhoFeitosa/spotify-clone.git), após o download será necessário abrir este projeto no seu editor e no terminal digitar npm install ou yarn, posteriormente é só rodar em seu terminal o comando npm run dev ou yarn dev, após isso, a página será aberta em seu navegador.

### Pré-requisitos

* npm
  ```sh
  npm install npm@latest -g
  ```

### Instalação

1. Clone o repositório
   ```sh
   git clone https://github.com/BrunoCarvalhoFeitosa/spotify-clone.git
   ```
2. Instale os pacotes do NPM
   ```sh
   npm install ou yarn
   ```
   
3. Inicie o projeto
   ```sh
   npm run dev ou yarn dev
   ```   

<!-- LICENSE -->
## License

Distribuído sob a licença MIT.

<!-- CONTACT -->
## Contato

Bruno Carvalho Feitosa - [GitHub](https://github.com/BrunoCarvalhoFeitosa) - [LinkedIn](https://www.linkedin.com/in/bruno-carvalho-feitosa/)
