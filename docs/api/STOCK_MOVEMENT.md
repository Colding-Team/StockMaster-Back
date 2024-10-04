# API de Movimentação de Estoque

* [Criar novo movimento de estoque](#endpoint1)

<h3 id="endpoint1">Criar novo movimento de estoque</h3>

| element | value                                                         |
|:-------:|---------------------------------------------------------------|
| method  | POST                                                          |
| url     | /stock-movement/:productIdentifier?type=productId|name        |
| header  | Content-Type: application/json                                |
| body    | { "productId": string, "type": "IN" | "OUT", "quantity": number, "description": string(optional) } |

curl -X POST "http://localhost:3000/stock-movement" -d '{"type": "IN", "quantity": 10, "productId": "test", "description": "Restock"}' -H "Content-Type: application/json" -H "Authorization: Bearer <JWT-token>"