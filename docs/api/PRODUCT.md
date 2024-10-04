# API de Produtos

* [Criar novo produto](#endpoint1)
* [Obter produto por ID](#endpoint2)
* [Obter produto por nome](#endpoint3)
* [Atualizar produto por ID](#endpoint4)
* [Atualizar produto por nome](#endpoint5)
* [Excluir produto por ID](#endpoint6)
* [Excluir produto por nome](#endpoint7)
* [Listar todos os produtos](#endpoint8)
* [Listar todos os nomes de produtos](#endpoint9)
* [Obter custo total dos produtos](#endpoint10)
* [Buscar produtos](#endpoint11)

<h3 id="endpoint1">Criar novo produto</h3>

| element | value                                                         |
|:-------:|---------------------------------------------------------------|
| method  | POST                                                          |
| url     | /product                                                      |
| header  | Content-Type: application/json                                |
| body    | { "name": string, "productId": string, "type": string, "cost": number, "price": number, "weight": number, "barCode": number, "imgUrl": string(optional), "batch": string(optional), "quantity": number(optional) } |

```
curl -X POST http://localhost:3000/product -d '{"name": "test", "productId": "test", "type": "test", "cost": 10, "price": 20, "weight": 10, "barCode": 10}' -H "Content-Type: application/json" -H "Authorization: Bearer <JWT-token>"
```

<h3 id="endpoint2">Obter produto por ID</h3>

| element | value                                                         |
|:-------:|---------------------------------------------------------------|
| method  | GET                                                           |
| url     | /product/id/:productId                                        |
| header  | Content-Type: application/json                                |

```
curl -X GET http://localhost:3000/product/id/test -H "Content-Type: application/json" -H "Authorization: Bearer <JWT-token>"
```

<h3 id="endpoint3">Obter produto por nome</h3>

| element | value                                                         |
|:-------:|---------------------------------------------------------------|
| method  | GET                                                           |
| url     | /product/name/:productName                                    |
| header  | Content-Type: application/json                                |

```
curl -X GET http://localhost:3000/product/name/test -H "Content-Type: application/json" -H "Authorization: Bearer <JWT-token>"
```

<h3 id="endpoint4">Atualizar produto por ID</h3>

| element | value                                                         |
|:-------:|---------------------------------------------------------------|
| method  | PUT                                                           |
| url     | /product/id/:productId                                        |
| header  | Content-Type: application/json                                |
| body    | { "name": string, "productId": string, "type": string, "cost": number, "price": number, "weight": number, "barCode": number, "imgUrl": string(optional), "batch": string(optional), "quantity": number(optional) } |

```
curl -X PUT http://localhost:3000/product/id/test -d '{"name": "test", "productId": "test", "type": "test", "cost": 15, "price": 20, "weight": 10, "barCode": 10}' -H "Content-Type: application/json" -H "Authorization: Bearer <JWT-token>"
```

<h3 id="endpoint5">Atualizar produto por nome</h3>

| element | value                                                         |
|:-------:|---------------------------------------------------------------|
| method  | PUT                                                           |
| url     | /product/name/:productName                                    |
| header  | Content-Type: application/json                                |
| body    | { "name": string, "productId": string, "type": string, "cost": number, "price": number, "weight": number, "barCode": number, "imgUrl": string(optional), "batch": string(optional), "quantity": number(optional) } |

```
curl -X PUT http://localhost:3000/product/name/test -d '{"name": "test", "productId": "test", "type": "test", "cost": 15, "price": 20, "weight": 10, "barCode": 10}' -H "Content-Type: application/json" -H "Authorization: Bearer <JWT-token>"
```

<h3 id="endpoint6">Excluir produto por ID</h3>

| element | value                                                         |
|:-------:|---------------------------------------------------------------|
| method  | DELETE                                                        |
| url     | /product/id/:productId                                        |
| header  | Content-Type: application/json                                |

```
curl -X DELETE http://localhost:3000/product/id/test -H "Content-Type: application/json" -H "Authorization: Bearer <JWT-token>"
```

<h3 id="endpoint7">Excluir produto por nome</h3>

| element | value                                                         |
|:-------:|---------------------------------------------------------------|
| method  | DELETE                                                        |
| url     | /product/name/:productName                                    |
| header  | Content-Type: application/json                                |

```
curl -X DELETE http://localhost:3000/product/name/test -H "Content-Type: application/json" -H "Authorization: Bearer <JWT-token>"
```

<h3 id="endpoint8">Listar todos os produtos</h3>

| element | value                                                         |
|:-------:|---------------------------------------------------------------|
| method  | GET                                                           |
| url     | /product/all                                                  |
| header  | Content-Type: application/json                                |

```
curl -X GET http://localhost:3000/product/all -H "Content-Type: application/json" -H "Authorization: Bearer <JWT-token>"
```

<h3 id="endpoint9">Listar todos os nomes de produtos</h3>

| element | value                                                         |
|:-------:|---------------------------------------------------------------|
| method  | GET                                                           |
| url     | /product/all/names                                            |
| header  | Content-Type: application/json                                |

```
curl -X GET http://localhost:3000/product/all/names -H "Content-Type: application/json" -H "Authorization: Bearer <JWT-token>"
```

<h3 id="endpoint10">Obter custo total dos produtos</h3>

| element | value                                                         |
|:-------:|---------------------------------------------------------------|
| method  | GET                                                           |
| url     | /product/all/cost                                             |
| header  | Content-Type: application/json                                |

```
curl -X GET http://localhost:3000/product/all/cost -H "Content-Type: application/json" -H "Authorization: Bearer <JWT-token>"
```

<h3 id="endpoint11">Buscar produtos</h3>

| element | value                                                         |
|:-------:|---------------------------------------------------------------|
| method  | GET                                                           |
| url     | /product/search?term=string                                   |
| header  | Content-Type: application/json                                |

```
curl -X GET http://localhost:3000/product/search?term=test -H "Content-Type: application/json" -H "Authorization: Bearer <JWT-token>"
```