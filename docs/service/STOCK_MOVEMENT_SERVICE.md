# Documentação - `stock-movement.service.ts`

### Descrição
Este arquivo define o **StockMovementService**, responsável por gerenciar as operações relacionadas aos movimentos de estoque na aplicação. Ele utiliza o **Prisma ORM** para interagir com o banco de dados e inclui métodos para criar e consultar movimentos de estoque.

### Importações
O arquivo importa os seguintes módulos e classes:

* **@nestjs/common**:
  * Injectable, InternalServerErrorException, NotFoundException: Decoradores e exceções para tratamento de erros.
* **@prisma/client**:
  * Prisma, Product, StockMovement, StockMovementType: Tipos gerados pelo Prisma para manipulação de dados.
* **PrismaService**: Serviço personalizado que encapsula o cliente Prisma.
* **CreateStockMovementDto**: DTO para criação de movimentos de estoque.
* **ProductService**: Serviço responsável pelas operações relacionadas aos produtos.

## Serviço `StockMovementService`
```typescript
@Injectable()
export class StockMovementService {
  constructor(
    private prisma: PrismaService,
    private productService: ProductService
  ) {}
}
````

Este serviço injeta o **PrismaService** para realizar operações no banco de dados e o **ProductService** para operações relacionadas a produtos.

### Métodos

#### 1. `createStockMovement`
* **Descrição**: Cria um novo movimento de estoque e atualiza a quantidade do produto.
* **Parâmetros**:
  * `data`: Objeto do tipo CreateStockMovementDto contendo os dados do movimento.
  * `productIdentifier`: Identificador do produto (ID ou nome).
  * `userEmail`: Email do usuário realizando a operação.
* **Retorno**: Promise<StockMovement> - O movimento de estoque criado.
* **Comportamento**:
  * Busca o produto pelo identificador.
  * Atualiza a quantidade do produto.
  * Cria um novo registro de movimento de estoque.
```typescript
async createStockMovement(
  data: CreateStockMovementDto,
  productIdentifier: string,
  userEmail: string
): Promise<StockMovement> {
  // ... implementation ...
}
````

#### 2. `getStockMovement`
* **Descrição**: Busca um único movimento de estoque com base em critérios específicos.
* **Parâmetros**:
  * `stockMovementWhereInput`: Condições de busca para o movimento de estoque.
  * `userEmail`: Email do usuário para escopo da busca.
* **Retorno**: Promise<StockMovement | null> - O movimento de estoque encontrado ou null.
```typescript
async getStockMovement(
  stockMovementWhereInput: Prisma.StockMovementWhereInput, 
  userEmail: string
): Promise<StockMovement | null> {
  // ... implementation ...
}
````

#### 3. `getStockMovements`
* **Descrição**: Busca múltiplos movimentos de estoque com base em critérios específicos.
* **Parâmetros**:
  * `id`: ID do produto (não utilizado na implementação atual).
  * `p0`: Data inicial (não utilizada na implementação atual).
  * `p1`: Data final (não utilizada na implementação atual).
  * `stockMovementWhereInput`: Condições de busca para os movimentos de estoque.
  * `userEmail`: Email do usuário para escopo da busca.
* **Retorno**: Promise<StockMovement[]> - Lista de movimentos de estoque encontrados.
```typescript
async getStockMovements(
  id: number, 
  p0: Date, 
  p1: Date, 
  stockMovementWhereInput: Prisma.StockMovementWhereInput, 
  userEmail: string
): Promise<StockMovement[]> {
  // ... implementation ...
}
````

### Observações
* **Integração com ProductService**: O serviço utiliza o ProductService para buscar produtos e atualizar suas quantidades.
* **Escopo do Usuário**: Todas as operações são realizadas no contexto do usuário autenticado, utilizando o email do usuário.
* **Tratamento de Erros**: O serviço lança NotFoundException quando um produto não é encontrado.
* **Prisma Queries**: As consultas ao banco de dados são realizadas utilizando o PrismaService, permitindo operações eficientes e tipadas.
* **Datas não Utilizadas**: Os parâmetros de data no método `getStockMovements` não estão sendo utilizados na implementação atual, podendo ser uma área para futuras melhorias ou filtragem por data.

