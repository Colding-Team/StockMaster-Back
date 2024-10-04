# Documentação - `product.controller.ts`
### Descrição
Este arquivo define o ProductController, responsável por gerenciar as operações relacionadas ao produto na aplicação.

### Importações
O arquivo importa os seguintes módulos e classes:

* `@nestjs/common`:
  * Body, Controller, Get, Param, Post: Decoradores usados para definir rotas e capturar dados.
  * `UpdateProductDto`: DTO usado para validar e tipar os dados ao atualizar um produto existente.
  * `AuthGuard`: Guarda de autenticação personalizada.
* `@prisma/client`: Utiliza a classe Product, que é gerada pelo Prisma para manipular os dados do produto.
* `ProductService`: Serviço responsável pela lógica de negócios associada ao produto.
* `CreateProductDto`: Um Data Transfer Object (DTO) usado para validar e tipar os dados ao criar um novo produto.

## Controlador `ProductController`
```typescript
@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}
}
```
Este controlador define a rota base 'product', usa o AuthGuard para proteger todas as rotas, e injeta o ProductService.

### Métodos
**1.** `createProduct`
* **Descrição:** Cria um novo produto usando os dados fornecidos no corpo da requisição.
* **Rota:** `POST /product`
* **Parâmetros:**
  * `@Body() productData`: Um objeto do tipo CreateProductDto que contém os dados do novo produto.
**Retorno:** Um objeto do tipo Product, que representa o produto criado.
```typescript
@Post()
async createProduct(@Body() productData: CreateProductDto): Promise<Product> {
  return this.productService.createProduct(productData);
}
```

**2.** `byProductId`
* **Descrição:** Busca um produto por seu ID.
* **Rota:** `GET /product/id/:productId`
* **Parâmetros:**
  * `@Param('productId') productId`: O ID do produto como uma string.
  * `@Request() req`: O objeto de requisição para obter o email do usuário.
* **Retorno:** Um objeto do tipo Product, representando o produto encontrado.
```typescript
@Get('id/:productId')
async byProductId(@Param('productId') productId: string, @Request() req): Promise<Product> {
  // ... implementation ...
}
```

**3.** `byName`
* **Descrição:** Busca um produto por seu nome.
* **Rota:** `GET /product/name/:productName`
* **Parâmetros:**
  * `@Param('productName') productName`: O nome do produto.
  * `@Request() req`: O objeto de requisição para obter o email do usuário.
* **Retorno:** Um objeto do tipo Product, representando o produto encontrado.
```typescript
@Get('name/:productName')
async byName(@Param('productName') productName: string, @Request() req): Promise<Product> {
  // ... implementation ...
}
```

**8.** `getAllProducts`
* **Descrição:** Retorna todos os produtos do usuário.
* **Rota:** `GET /product/all`
* **Parâmetros:**
  * `@Request() req`: O objeto de requisição para obter o email do usuário.
* **Retorno:** Uma lista de objetos do tipo Product.
```typescript
@Get('all')
async getAllProducts(@Request() req) {
  // ... implementation ...
}
```

**9.** `getAllProductNames`
* **Descrição:** Retorna os nomes de todos os produtos do usuário.
* **Rota:** `GET /product/all/names`
* **Parâmetros:**
  * `@Request() req`: O objeto de requisição para obter o email do usuário.
* **Retorno:** Uma lista de nomes de produtos.
```typescript
@Get('all/names')
async getAllProductNames(@Request() req) {
  // ... implementation ...
}
```

**10.** `getAllProductCost`
* **Descrição:** Retorna o custo total de todos os produtos do usuário.
* **Rota:** `GET /product/all/cost`
* **Parâmetros:**
  * `@Request() req`: O objeto de requisição para obter o email do usuário.
* **Retorno:** O custo total dos produtos.
```typescript
@Get('all/cost')
async getAllProductCost(@Request() req) {
  // ... implementation ...
}
```

## Observações
* **Autenticação:** Todas as rotas são protegidas pelo AuthGuard.
* **Escopo do Usuário:** Todas as operações são realizadas no contexto do usuário autenticado.
* **Tratamento de Erros:** NotFoundException é lançada quando um produto não é encontrado.
* **Validação de Dados:** Os DTOs CreateProductDto e UpdateProductDto são usados para validar os dados de entrada.
