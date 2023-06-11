##  📰 Blog-Completo 

### Backend de um blog completo, o sistema foi feito utilizando principalmente Nodejs para controle do backend, MySQL como banco de dados, jsonwebtoken para autorização e autenticação e outras diversas bibliotecas.
## O blog permite que você se registre no mesmo e assim consiga fazer uma postagem, após feita a postagem você pode editar ou apagar a mesma, cada usuário tem sua postagem e só consegue modificar ela, o blog tem uma aba profile onde cada usuário consegue ver todas suas postagens e informações. É possível realizar comentários nas publicações que são encontradas clicando em outros usuários e vendo suas publicações ou simplesmente filtrando por nicho de postagem




## 💻 Tecnologias Usadas
<div style="display: inline_block"><br/>
<img align="center" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
<img align="center" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
<img align="center" src="https://shields.io/badge/MySQL-lightgrey?logo=mysql&style=plastic&logoColor=white&labelColor=blue">

## 💻 O Porque Das Minhas Escolhas Técnicas

#### Dividi a aplicação em 6 pastas onde agora apenas 5 estão visiveis.
Na controllers é onde deixamos toda funcionalidade do sistema separado em funções 
exemplo: Função A - Registra usuário
 Função B - Faz autentificação do usuário

No routes nos escrevemos quando devemos chamar essas funções apartir da rota e requisição ou seja se alguém fizer uma requisição post na rota "/registro" nós executamos a função A que vem dos controllers.

No db nós fazemos uma simples conexão com o banco de dados

UserPictureControl e PostPictureControl apenas controlamos para onde vão os arquivos carregados pelos usuários em seus posts e fotos de perfil

Sobre as bibliotecas jsonwebtoken e bcrypt acredito que foram boas escolhas, tendo em mente que controlo a autenticação de A a Z do usuário com o jsonwebtoken e com a bcrypt consigo criptografar e fazer o salt da senha com duas linhas de código, economizando tempo, dados e organização. O multer permite realizar o upload de arquivos também com simples linhas de código facilitando muito o processo de desenvolvimento

## Instalação 

#### Clone o Projeto Com: </br>

git clone https://github.com/joaobarbanti/blog-completo
#### Entre na pasta e instale as dependências com: 
 Yarn
#### Com tudo correto você pode iniciar o servidor com:
yarn start
#### Se você estiver no ambiente de desenvolvimento, poderá usar o servidor de desenvolvimento:
yarn dev</br>
yarn queue
## Importante 💛

### a aplicação foi totalmente feita por mim joão ricardo mas você pode usar ela do jeito que preferir! seja para estudo,apoio nos estudos ou até para ganhar dinheiro quem sabe rsrs. entre em contato em joaobarbanti7@gmail.com.
</div>
