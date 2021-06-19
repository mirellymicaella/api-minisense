<h1 align="center">API MiniSense</h1>

Implementação de uma APi RESTful para gerenciar usuários e seus dispositivos sensores com dados coletados.

## 🔧 Tecnologias

Essa API foi desenvolvida com as seguintes tecnologias principais:

- [Typescript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [SQLite](https://www.sqlite.org/index.html)
- [Typeorm](https://typeorm.io/#/)


## 📤 Métodos
Requisições para a API devem seguir os padrões:
| Método | Descrição |
|---|---|
| `GET` | Retorna informações de um ou mais registros. |
| `POST` | Utilizado para criar um novo registro. |
| `PUT` | Atualiza dados de um registro ou altera sua situação. |
| `DELETE` | Remove um registro do sistema. |

## 📥 Respostas
Atualmente s respostas podem ter os seguintes status codes, mas cada uma terá sua mensagem específica.
| Código | Descrição |
|---|---|
| `201` | Registro criado com sucesso (Created).|
| `200` | Requisição executada com sucesso (Ok).|
| `400` | Erros de validação ou os campos informados não existem no sistema.(Bad request)|
| `404` | Registro pesquisado não encontrado (Not found).|
| `500` | Erro interno inesperado, contacte a pessoa desenvolvedora da api (Internal server error).|

## 📑 Documentação
Veja a documentação dos endpoints mais detalhada no [Swagger Hub](https://app.swaggerhub.com/search)( apenas para visualização ) importando o arquivo que se encontra em ```./src/docs/openapi.yaml``` ou no [Postman](https://documenter.getpostman.com/view/12220263/TzeXn8Xa) ( para visualização e teste  de rotas ).

Detallhes sobre a modelagem de dados em ```./scr/database/README.md```.

## ℹ️ Como utilizar

```bash

# Clone ou faça download deste repositório

# Entre no diretório criado
$ cd api-minisense

# Instale as dependências
$ yarn install 

# Rode a aplicação
$ yarn dev
```
A aplicação pode ser acessada em [`localhost:3333`](http://localhost:3333).
