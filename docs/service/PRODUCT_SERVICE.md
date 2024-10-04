# Documentação - `product.service.ts`
Este arquivo define o **ProductService**, responsável por gerenciar as operações relacionadas aos produtos na aplicação. Ele utiliza o **Prisma ORM** para interagir com o banco de dados e inclui métodos para criar, atualizar, excluir e consultar produtos.

---

### Importações
O arquivo importa os seguintes módulos e bibliotecas:

* **@nestjs/common**:
  * BadRequestException, Injectable, NotFoundException: Exceções e decorador para injeção de dependência.
* **@prisma/client**:
  * Prisma, Product, ProductType: Tipos gerados automaticamente pelo Prisma.
* **PrismaService**: Serviço personalizado que encapsula o cliente Prisma.
* **ProductTypeService**: Serviço responsável pelas operações relacionadas ao tipo de produto.
* **CreateProductDto**: DTO para criação de produtos.
* **UpdateProductDto**: DTO para atualização de produtos.

---

### Serviço `ProductService`
#### Definição
```typescript
@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private productTypeService: ProductTypeService,
  ) {}
}
```
O serviço injeta o **PrismaService** para interagir com o banco de dados e o **ProductTypeService** para gerenciar tipos de produtos.

---

### Métodos
#### 1. `product`
* **Descrição**: Busca um único produto no banco de dados com base em critérios e email do usuário.
* **Parâmetros**:
  * `productWhereInput`: Condições de busca para o produto.
  * `userEmail`: Email do usuário para escopo da busca.
* **Retorno**: Retorna o produto encontrado ou `null` se não existir.

#### 2. `products`
* **Descrição**: Busca múltiplos produtos com suporte a paginação, filtros e ordenação.
* **Parâmetros**:
  * `params`: Objeto com opções de busca, incluindo `skip`, `take`, `cursor`, `where`, `orderBy`, `userId`, e `userEmail`.
* **Retorno**: Retorna uma lista de produtos que correspondem aos critérios.

#### 3. `createProduct`
* **Descrição**: Cria um novo produto no banco de dados.
* **Parâmetros**:
  * `data`: Objeto do tipo CreateProductDto contendo os dados do novo produto.
  * `userEmail`: Email do usuário criando o produto.
* **Retorno**: Retorna o produto recém-criado.
* **Comportamento**:
  * Verifica e cria o tipo de produto se necessário.
  * Verifica a existência de produtos com o mesmo nome, ID ou código de barras.
  * Associa o produto ao usuário correto.

#### 4. `updateProduct`
* **Descrição**: Atualiza um produto existente no banco de dados.
* **Parâmetros**:
  * `params`: Objeto contendo `where` (critério de busca) e `data` (dados a serem atualizados).
* **Retorno**: Retorna o produto atualizado.

#### 5. `getProductByIdentifier`
* **Descrição**: Busca um produto por seu identificador (nome ou ID) e email do usuário.
* **Parâmetros**:
  * `productIdentifier`: Nome ou ID do produto.
  * `userEmail`: Email do usuário para escopo da busca.
* **Retorno**: Retorna o produto encontrado ou `null`.

#### 6. `updateProductQuantity`
* **Descrição**: Atualiza a quantidade de um produto no estoque.
* **Parâmetros**:
  * `productId`: ID do produto.
  * `quantity`: Quantidade a ser adicionada ou removida.
* **Retorno**: Retorna o produto atualizado.
* **Comportamento**: Verifica a existência do produto e se há quantidade suficiente para remoção.

#### 7. `deleteProduct`
* **Descrição**: Exclui um produto do banco de dados.
* **Parâmetros**:
  * `where`: Critério para identificar o produto a ser excluído.
* **Retorno**: Retorna o produto que foi excluído.

#### 8. `getAllProductNames`
* **Descrição**: Retorna os nomes de todos os produtos de um usuário.
* **Parâmetros**:
  * `userEmail`: Email do usuário.
* **Retorno**: Retorna um array com os nomes dos produtos.

#### 9. `getAllProductCost`
* **Descrição**: Retorna os custos de todos os produtos de um usuário.
* **Parâmetros**:
  * `userEmail`: Email do usuário.
* **Retorno**: Retorna um array com os custos dos produtos.

---

### Notas
* **Validação e Exceções**: O serviço implementa várias verificações e lança exceções apropriadas (BadRequestException, NotFoundException) para casos de erro.
* **Escopo do Usuário**: Todas as operações são realizadas no contexto do usuário autenticado, utilizando o email do usuário.
* **Integração com ProductType**: O serviço gerencia a criação e associação de tipos de produto quando necessário.
* **Operações de Estoque**: Inclui lógica para atualização de quantidade de produtos no estoque, com verificações de segurança.