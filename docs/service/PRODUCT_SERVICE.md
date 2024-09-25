# Documentação - `product.service.ts`
Este arquivo define o **ProductService**, responsável por gerenciar as operações relacionadas aos produtos na aplicação. Ele utiliza o **Prisma ORM** para interagir com o banco de dados e inclui métodos para criar, atualizar, excluir e consultar produtos.

---

### Importações
O arquivo importa os seguintes módulos e bibliotecas:

* **@nestjs/common**:
  * **BadRequestException**: Exceção lançada quando ocorre uma solicitação inválida, como a tentativa de criar um produto com um nome ou ID já existente.
  * **Injectable**: Decorador que marca a classe como um provedor injetável no NestJS.
* **@prisma/client**:
  * **Prisma, Product, ProductType**: Tipos gerados automaticamente pelo Prisma para manipulação de dados e definições de modelo.
* **PrismaService**: Serviço personalizado que encapsula o cliente Prisma para realizar operações no banco de dados.
* **ProductTypeService**: Serviço responsável pelas operações relacionadas ao tipo de produto.
* **CreateProductDto**: DTO usado para garantir que os dados fornecidos na criação de um produto sejam válidos e tipados corretamente.

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
* **Descrição**: Busca um único produto no banco de dados com base em um critério único.
* **Parâmetros**:
  * `productWhereUniqueInput`: Um objeto que define a condição única para buscar o produto (por exemplo, ID ou nome único).
* **Retorno**: Retorna o produto encontrado ou `null` se não existir.
```typescript
async product(
  productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
): Promise<Product | null> {
  return this.prisma.product.findUnique({
    where: productWhereUniqueInput,
  });
}
```

#### 2. `products`
* **Descrição**: Busca múltiplos produtos com suporte a paginação, filtros e ordenação.
* **Parâmetros**:
  * `params`: Um objeto que pode incluir os seguintes campos:
  * `skip`: Número de registros a serem pulados (para paginação).
  * `take`: Número de registros a serem retornados (limite).
  * `cursor`: Ponto de referência para paginação baseada em cursor.
  * `where`: Filtros para busca.
  * `orderBy`: Ordenação dos resultados.
* **Retorno**: Retorna uma lista de produtos que correspondem aos critérios.
```typescript
async products(params: {
  skip?: number;
  take?: number;
  cursor?: Prisma.ProductWhereUniqueInput;
  where?: Prisma.ProductWhereInput;
  orderBy?: Prisma.ProductOrderByWithRelationInput;
}): Promise<Product[]> {
  const { skip, take, cursor, where, orderBy } = params;
  return this.prisma.product.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
  });
}
```

#### 3. `createProduct`
* **Descrição**: Cria um novo produto no banco de dados. Verifica se o tipo de produto existe; caso contrário, cria um novo tipo. Também verifica se o nome ou ID do produto já está em uso antes de criar o produto.
* **Parâmetros**:
  * `data`: Um objeto do tipo CreateProductDto contendo os dados necessários para criar um novo produto.
* **Retorno**: Retorna o produto recém-criado.
#### Fluxo do Método:
1. Verifica se o tipo de produto existe com base no `typeId`. Se não existir, cria um novo tipo usando o ProductTypeService.
2. Verifica se já existe um produto com o mesmo `productId` ou `name`.
3. Se existir, lança uma exceção `BadRequestException`.
4. Cria e retorna o novo produto.
```typescript
async createProduct(data: CreateProductDto): Promise<Product> {
  let productType: ProductType | null =
    await this.prisma.productType.findUnique({
      where: { id: data.typeId },
    });

  if (!productType) {
    productType = await this.productTypeService.createProductType({
      name: data.type,
    });
  }

  const existingProduct = await this.prisma.product.findFirst({
    where: { OR: [{ productId: data.productId }, { name: data.name }] },
  });

  if (existingProduct) {
    throw new BadRequestException('Já existe um produto com este nome!');
  }

  return this.prisma.product.create({
    data: {
      name: data.name,
      productId: data.productId,
      typeId: productType.id,
      cost: data.cost,
      price: data.price,
      weight: data.weight,
      imgUrl: data.imgUrl,
      batch: data.batch,
      barCode: data.barCode,
      quantity: data.quantity,
    },
  });
}
```

#### 4. `updateProduct`
* **Descrição**: Atualiza um produto existente no banco de dados com base em um critério único.
* **Parâmetros**:
  * `params`: Um objeto que contém:
  * `where`: Critério para identificar o produto a ser atualizado.
  * `data`: Os novos dados a serem aplicados ao produto.
* **Retorno**: Retorna o produto atualizado.
```typescript
async updateProduct(params: {
  where: Prisma.ProductWhereUniqueInput;
  data: Prisma.ProductUpdateInput;
}): Promise<Product> {
  const { where, data } = params;
  return this.prisma.product.update({
    data,
    where,
  });
}
```

#### 5. `deleteProduct`
* **Descrição**: Exclui um produto com base em um critério único.
* **Parâmetros**:
  * `where`: Critério para identificar o produto a ser excluído.
* **Retorno**: Retorna o produto que foi excluído.
```typescript
async deleteProduct(
  where: Prisma.ProductWhereUniqueInput,
): Promise<Product> {
  return this.prisma.product.delete({
    where,
  });
}
```

---

### Notas
* **Validação e Exceções**: O serviço verifica se já existe um produto com o mesmo nome ou ID antes de criar um novo produto, lançando uma exceção se for o caso.
* **Relações com `ProductType`**: O método `createProduct` integra a criação e verificação de tipos de produto, garantindo que cada produto esteja associado a um tipo válido.
* **Operações CRUD**: O serviço oferece métodos completos para as operações CRUD (Create, Read, Update, Delete) sobre produtos, utilizando as capacidades do Prisma para filtros e ordenações complexas.
