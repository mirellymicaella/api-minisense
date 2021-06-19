## Banco de dados 

O banco de dados utilizado é o [SQLite](https://www.sqlite.org/index.html) e não precisa ser configurado neste projeto, mas pode ser alterado para qualquer banco de dados suportado pelo [Typeorm](https://typeorm.io/#/).
Para usar outro banco de dados altere o documento ```ormfig.json``` na raíz do projeto para que fique no seguinte formato:

```json
{
    "host": HOST_ONDE_ESTA_O_BANCO_DE_DADOS,
    "port": PORTA_ONDE_ESTA_O_BANCO_DE_DADOS,
    "username": USUARIO_PARA_LOGIN_NO_BANCO_DE_DADOS,
    "password": SENHA_DO_BANCO_DE_DADOS,
    "type": TIPO_DO_BANCO_DE_DADOS_USADO,
    "database": NOME_DO_BANCO_DE_DADOS,
    "synchronize": true,
    "entities": [
        "./src/models/**.ts"
    ],
    "migrations": [
        "./src/database/migrations/**.ts"
    ],
    "cli": {
        "migrationsDir": "./src/database/migrations"
    }
}
```
Em seguida, construa todas as tabelas no banco de dados criado usando o comando:

```console
yarn typeorm migration:run
```
## Diagrama

<img src="https://i.postimg.cc/pXQ5gmmn/Diagrama-mini-Sense.png" width="1000">


