# Documentação - `productType.service.ts`
Este arquivo define o **ProductTypeService**, que é responsável por gerenciar as operações relacionadas ao tipo de produto na aplicação. Ele utiliza o **Prisma ORM** para interagir com o banco de dados, oferecendo métodos para criação, atualização, exclusão e consulta de tipos de produtos.

---

### Importações
O arquivo importa os seguintes módulos e bibliotecas:

* **@nestjs/common**:
  * **Injectable**: Decorador que marca a classe como um provedor injetável no NestJS.
* **@prisma/client**:
  * **Prisma, ProductType**: Tipos gerados automaticamente pelo Prisma para manipulação de dados e definições de modelo.
* **PrismaService**: Serviço personalizado que encapsula o cliente Prisma para realizar operações no banco de dados.

---

### Serviço `ProductTypeService`
#### Definição
```typescript
@Injectable()
export class ProductTypeService {
  constructor(private prisma: PrismaService) {}
}
```
Este serviço injeta o **PrismaService** para realizar operações de banco de dados relacionadas ao modelo **ProductType**.

### Métodos
#### 1. `productType`
* **Descrição**: Busca um único tipo de produto no banco de dados com base em um critério único.
* **Parâmetros**:
  * `productTypeWhereUniqueInput`: Um objeto que define a condição única para buscar o tipo de produto (por exemplo, ID ou nome único).
* **Retorno**: Retorna o tipo de produto encontrado ou `null` se não existir.
```typescript
async productType(
  productTypeWhereUniqueInput: Prisma.ProductWhereUniqueInput,
): Promise<ProductType | null> {
  return this.prisma.product.findUnique({
    where: productTypeWhereUniqueInput,
  });
}
```

#### 2. `productTypes`
* **Descrição**: Busca múltiplos tipos de produtos com suporte a paginação, filtros e ordenação.
* **Parâmetros**:
  * `params`: Um objeto que pode incluir os seguintes campos:
  * `skip`: Número de registros a serem pulados (para paginação).
  * `take`: Número de registros a serem retornados (limite).
  * `cursor`: Ponto de referência para paginação baseada em cursor.
  * `where`: Filtros para busca.
  * `orderBy`: Ordenação dos resultados.
* **Retorno**: Retorna uma lista de tipos de produtos que correspondem aos critérios.
```typescript
async productTypes(params: {
  skip?: number;
  take?: number;
  cursor?: Prisma.ProductTypeWhereUniqueInput;
  where?: Prisma.ProductTypeWhereInput;
  orderBy?: Prisma.ProductTypeOrderByWithRelationInput;
}): Promise<ProductType[]> {
  const { skip, take, cursor, where, orderBy } = params;
  return this.prisma.productType.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
  });
}
```

#### 3. `createProductType`
* **Descrição**: Cria um novo tipo de produto no banco de dados.
* **Parâmetros**:
  * `data`: Um objeto contendo os dados necessários para criar um novo tipo de produto.
* **Retorno**: Retorna o tipo de produto recém-criado.
```typescript
async createProductType(
  data: Prisma.ProductTypeCreateInput,
): Promise<ProductType> {
  return this.prisma.productType.create({
    data,
  });
}
```

#### 4. `updateProductType`
* **Descrição**: Atualiza um tipo de produto existente com base em um critério único.
* **Parâmetros**:
  * `params`: Um objeto que contém:
  * `where`: Critério para identificar o tipo de produto a ser atualizado.
  * `data`: Os novos dados a serem aplicados ao tipo de produto.
* **Retorno**: Retorna o tipo de produto atualizado.
```typescript
async updateProductType(params: {
  where: Prisma.ProductTypeWhereUniqueInput;
  data: Prisma.ProductTypeUpdateInput;
}): Promise<ProductType> {
  const { where, data } = params;
  return this.prisma.productType.update({
    data,
    where,
  });
}
```

#### 5. `deleteProductType`
* **Descrição**: Exclui um tipo de produto com base em um critério único.
* **Parâmetros**:
  * `where`: Critério para identificar o tipo de produto a ser excluído.
* **Retorno**: Retorna o tipo de produto que foi excluído.
```typescript
async deleteProductType(
  where: Prisma.ProductTypeWhereUniqueInput,
): Promise<ProductType> {
  return this.prisma.productType.delete({
    where,
  });
}
```

---

### Notas
* **PrismaService**: Este serviço utiliza o PrismaService para realizar consultas ao banco de dados. Ele oferece métodos prontos para as operações CRUD (Create, Read, Update, Delete).
* **Operações Complexas**: Métodos como `productTypes` permitem a implementação de buscas complexas com paginação, filtragem e ordenação, oferecendo flexibilidade na manipulação dos dados.
* **Segurança e Validação**: A responsabilidade de validar os dados (como garantir que o tipo de produto existe antes de atualizá-lo ou excluí-lo) deve ser tratada na camada de serviço ou controlador.
