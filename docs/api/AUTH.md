# API de Autenticação

* [Cadastrar novo usuário](#endpoint1)
* [Login de usuário](#endpoint2)
* [Retornar usuário autenticado](#endpoint3)

<h3 id="endpoint1">Cadastrar novo usuário</h3>

| element | value                                                         |
|:-------:|---------------------------------------------------------------|
| method  | POST                                                          |
| url     | /auth/register                                                |
| header  | Content-Type: application/json                                |
| body    | {   "name": string,   "email": string,   "password": string } |
```
curl -X POST http://localhost:3000/auth/register -d '{"name": "test", "email": test@test.com, "password": "test123"}' -H "Content-Type: application/json" 
```

<h3 id="endpoint2">Login de usuário</h3>

| element 	| value                                       	|
|:-------:	|---------------------------------------------	|
| method  	| POST                                        	|
| url     	| /auth/login                                 	|
| header  	| Content-Type: application/json              	|
| body    	| {   "email": string,   "password": string } 	|
```
curl -X POST http://localhost:3000/auth/login -d '{"email": "test@test.com", "password": "test123"}' -H "Content-Type: application/json"
```

<h3 id="endpoint3">Retornar usuário autenticado</h3>

| element 	| value                          	|
|:-------:	|--------------------------------	|
| method  	| GET                            	|
| url     	| /auth/profile                  	|
| header  	| Content-Type: application/json 	|
```
curl -X GET http://localhost:3000/auth/profile -H "Authorization: Bearer <JWT-token>"
```
