# Doasan API

![GitHub repo size](https://img.shields.io/github/repo-size/TheRealsz/doasan_api?style=for-the-badge)

> API para um projeto de doação de sangue, sendo realizado para apresentar no Projeto Integrador da UNISO, no primeiro semestre de 2024

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão LTS de `Node`
- Você tem uma máquina `<Windows / Linux / Mac>`.

## 🚀 Instalando e utilizando Doasan API

Para utilizar o Doasan API, siga estas etapas:

Windows:

1. Após clonar o projeto pelo git clone, será necessario criar um cluster no MongoDB, o qual irá ser necessario adicionar na env do projeto.
Para isso, basta seguir este <a href="https://www.mongodb.com/pt-br/docs/atlas/getting-started/">link</a>

2. Após criar seu cluster e ter a url em mãos, basta criar o arquivo `.env` e adicionar a URL na variavel abaixo
```
MONGO_URL=""
```

3. Tendo a env configurada, basta rodar um `npm i` dentro do terminal e na raiz do projeto para poder fazer a instalação das dependencias
4. Com as dependencias devidamente instaladas, basta no terminal rodar o comando `npm start` e utilizar a API.
![image](https://github.com/user-attachments/assets/28f08427-f5cc-4bc8-869d-5110b8f940bf)


## 📫 Contribuindo para Doasan API

Para contribuir com Doasan API, siga estas etapas:

1. Bifurque este repositório.
2. Crie um branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para o branch original: `git push origin <nome_do_projeto> / <local>`
5. Crie a solicitação de pull.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).
