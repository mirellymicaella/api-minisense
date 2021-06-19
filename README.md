<h1 align="center">API MiniSense</h1>

Implementação de uma APi RESTful para gerenciar usuários e seus dispositivos sensores com dados coletados.

## Tecnologias

Essa API foi desenvolvida com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [SQLite](https://www.sqlite.org/index.html)
- [Typeorm](https://typeorm.io/#/)


## Métodos
Requisições para a API devem seguir os padrões:
| Método | Descrição |
|---|---|
| `GET` | Retorna informações de um ou mais registros. |
| `POST` | Utilizado para criar um novo registro. |
| `PUT` | Atualiza dados de um registro ou altera sua situação. |
| `DELETE` | Remove um registro do sistema. |

## Respostas
Atualmente s respostas podem ter os seguintes status codes, mas cada uma terá sua mensagem específica.
| Código | Descrição |
|---|---|
| `201` | Registro criado com sucesso (Created).|
| `200` | Requisição executada com sucesso (Ok).|
| `400` | Erros de validação ou os campos informados não existem no sistema.(Bad request)|
| `404` | Registro pesquisado não encontrado (Not found).|
| `500` | Erro interno inesperado, contacte o desenvolvedor (Internal server error).|

Veja a documentação dos endpoints mais detalhada no [Swagger Hub](https://app.swaggerhub.com/search) importando o arquivo que se encontra em ```./src/docs/openapi.yaml``` ou no [Postman](link) ( visualização e rotas para testar ).

Detallhes sobre a modelagem de dados em ```./scr/database/README.md```.

## :information_source: Como utilizar

```bash

# Clone este repositório
$ git clone https://gitlab.com/petengcomp/mobile/qrcode-2.0.git

# Entre no diretório criado
$ cd api-minisense

# Instale as dependências
$ yarn install 

# Rode a aplicação
$ yarn dev
```
A aplicação pode ser acessada em [`localhost:3333`](http://localhost:3333).
