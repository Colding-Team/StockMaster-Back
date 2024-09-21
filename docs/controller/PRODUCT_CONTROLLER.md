# Documentação - `product.controller.ts`
### Descrição
Este arquivo define o ProductController, responsável por gerenciar as operações relacionadas ao produto na aplicação. Ele utiliza o framework NestJS e o serviço ProductService para realizar operações de criação e busca de produtos.

### Importações
O arquivo importa os seguintes módulos e classes:

* `@nestjs/common`:
  * Body, Controller, Get, Param, Post: Decoradores usados para definir rotas e capturar dados.
* `@prisma/client`: Utiliza a classe Product, que é gerada pelo Prisma para manipular os dados do produto.
* `ProductService`: Serviço responsável pela lógica de negócios associada ao produto.
* `CreateProductDto`: Um Data Transfer Object (DTO) usado para validar e tipar os dados ao criar um novo produto.
  
## Controlador `ProductController`
```typescript
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
}
```
Este controlador define a rota base 'product' e injeta o ProductService para ser usado nos métodos do controlador.

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

**2.** `ById`
* **Descrição:** Busca um produto por seu ID.
* **Rota:** `GET /product/:id`
* **Parâmetros:**
  * `@Param('id') id`: O ID do produto como uma string, que será convertido para número.
* **Retorno:** Um objeto do tipo Product, representando o produto encontrado.
```typescript
@Get('product/:id')
async ById(@Param('id') id: string): Promise<Product> {
  return this.productService.product({ id: Number(id) });
}
```

## Observações
* **Injeção de Dependências:** O ProductService é injetado no controlador para centralizar a lógica de negócios em um serviço separado.
* **Validação de Dados:** O uso do DTO CreateProductDto garante que os dados enviados ao criar um produto sejam devidamente validados.
