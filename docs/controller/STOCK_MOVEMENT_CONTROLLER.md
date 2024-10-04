# Documentação - `stock-movement.controller.ts`

### Descrição
Este arquivo define o StockMovementController, responsável por gerenciar as operações relacionadas aos movimentos de estoque na aplicação.

### Importações
O arquivo importa os seguintes módulos e classes:

* `@nestjs/common`:
  * BadRequestException, Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, Post, Query, Request, UseGuards: Decoradores e classes para definir rotas, capturar dados e lidar com erros.
* `StockMovementService`: Serviço responsável pela lógica de negócios associada aos movimentos de estoque.
* `AuthGuard`: Guarda de autenticação personalizada.
* `@prisma/client`: Utiliza a classe StockMovement, que é gerada pelo Prisma para manipular os dados de movimento de estoque.
* `CreateStockMovementDto`: Um Data Transfer Object (DTO) usado para validar e tipar os dados ao criar um novo movimento de estoque.
* `ProductService`: Serviço responsável pela lógica de negócios associada ao produto.

## Controlador `StockMovementController`
```typescript
@UseGuards(AuthGuard)
@Controller('stock-movement')
export class StockMovementController {
  constructor(
    private readonly stockMovementService: StockMovementService,
    private readonly productService: ProductService
  ) {}
}
```
Este controlador define a rota base 'stock-movement', usa o AuthGuard para proteger todas as rotas, e injeta o StockMovementService e o ProductService.

### Métodos
**1.** `createStockMovement`
* **Descrição:** Cria um novo movimento de estoque para um produto específico.
* **Rota:** `POST /stock-movement/:productIdentifier`
* **Parâmetros:**
  * `@Body() stockMovementData`: Um objeto do tipo CreateStockMovementDto que contém os dados do novo movimento de estoque.
  * `@Param('productIdentifier') productIdentifier`: O identificador do produto (ID ou nome).
  * `@Query('type') identifierType`: O tipo de identificador usado ('productId' ou 'name').
  * `@Request() req`: O objeto de requisição para obter o email do usuário.
* **Retorno:** Um objeto do tipo StockMovement, que representa o movimento de estoque criado.
```typescript
@Post(':productIdentifier')
async createStockMovement(
  @Body() stockMovementData: CreateStockMovementDto,
  @Param('productIdentifier') productIdentifier: string,
  @Query('type') identifierType: 'productId' | 'name',
  @Request() req
): Promise<StockMovement> {
  // ... implementation ...
}
```

### Métodos Privados
**1.** `validateStockMovement`
* **Descrição:** Valida os dados do movimento de estoque antes de criar um novo registro.
* **Parâmetros:**
  * `stockMovementData`: Um objeto do tipo CreateStockMovementDto contendo os dados a serem validados.
* **Comportamento:**
  * Verifica se o tipo de movimento é válido ('IN' ou 'OUT').
  * Ajusta a quantidade para negativa se o tipo de movimento for 'OUT'.
  * Lança uma BadRequestException se a quantidade for inválida para o tipo de movimento.
```typescript
private validateStockMovement(stockMovementData: CreateStockMovementDto): void {
  // ... implementation ...
}
```

## Observações
* **Autenticação:** Todas as rotas são protegidas pelo AuthGuard.
* **Escopo do Usuário:** Todas as operações são realizadas no contexto do usuário autenticado.
* **Validação de Dados:** O DTO CreateStockMovementDto é usado para validar os dados de entrada.
* **Tratamento de Erros:** 
  * BadRequestException é lançada para dados de entrada inválidos.
  * NotFoundException é lançada quando o produto não é encontrado.
  * InternalServerErrorException é lançada para erros internos do servidor.
* **Flexibilidade:** O controlador permite criar movimentos de estoque tanto por ID quanto por nome do produto.
* **Integração com ProductService:** Utiliza o ProductService para buscar produtos antes de criar movimentos de estoque.
