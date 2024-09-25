# Documentação - `user.service.ts`
Este arquivo define o **UserService**, responsável por gerenciar as operações relacionadas aos usuários na aplicação. Ele utiliza o **Prisma ORM** para interagir com o banco de dados, oferecendo métodos para criação, atualização, exclusão e consulta de usuários.

---

### Importações
O arquivo importa os seguintes módulos e bibliotecas:

* **@nestjs/common**:
  * **BadRequestException**: Exceção lançada quando ocorre uma solicitação inválida, como a ausência de um e-mail ao buscar um usuário.
  * **Injectable**: Decorador que marca a classe como um provedor injetável no NestJS.
* **@prisma/client**:
  * **Prisma, User**: Tipos gerados automaticamente pelo Prisma para manipulação de dados e definições de modelo.
  * **PrismaService**: Serviço personalizado que encapsula o cliente Prisma para realizar operações no banco de dados.

---

### Serviço `UserService`
#### Definição
```typescript
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
}
```
O serviço injeta o **PrismaService** para realizar operações de banco de dados relacionadas ao modelo **User**.

---

### Métodos
#### 1. `user`
* **Descrição**: Busca um único usuário no banco de dados com base no e-mail.
* **Parâmetros**:
  * `email`: O e-mail do usuário a ser buscado.
* **Retorno**: Retorna o usuário encontrado ou null se não existir.
#### Fluxo do Método:
1. Verifica se o e-mail foi fornecido. Se não, lança uma exceção `BadRequestException`.
2. Busca o usuário no banco de dados com base no e-mail.
```typescript
async user(email: string): Promise<User | null> {
  if (!email) {
    throw new BadRequestException('Email must be provided');
  }
  return this.prisma.user.findUnique({
    where: { email: email },
  });
}
```

#### 2. `users`
* **Descrição**: Busca múltiplos usuários com suporte a paginação, filtros e ordenação.
* **Parâmetros**:
  * `params`: Um objeto que pode incluir os seguintes campos:
  * `skip`: Número de registros a serem pulados (para paginação).
  * `take`: Número de registros a serem retornados (limite).
  * `cursor`: Ponto de referência para paginação baseada em cursor.
  * `where`: Filtros para busca.
  * `orderBy`: Ordenação dos resultados.
* **Retorno**: Retorna uma lista de usuários que correspondem aos critérios.
```typescript
async users(params: {
  skip?: number;
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}): Promise<User[]> {
  const { skip, take, cursor, where, orderBy } = params;
  return this.prisma.user.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
  });
}
```

#### 3. `createUser`
* **Descrição**: Cria um novo usuário no banco de dados.
* **Parâmetros**:
  * `data`: Um objeto contendo os dados necessários para criar um novo usuário.
* **Retorno**: Retorna o usuário recém-criado.
```typescript
async createUser(data: Prisma.UserCreateInput): Promise<User> {
  return this.prisma.user.create({
    data,
  });
}
```

#### 4. `updateUser`
* **Descrição**: Atualiza um usuário existente no banco de dados com base em um critério único.
* **Parâmetros**:
  * `params`: Um objeto que contém:
  * `where`: Critério para identificar o usuário a ser atualizado.
  * `data`: Os novos dados a serem aplicados ao usuário.
* **Retorno**: Retorna o usuário atualizado.
```typescript
async updateUser(params: {
  where: Prisma.UserWhereUniqueInput;
  data: Prisma.UserUpdateInput;
}): Promise<User> {
  const { where, data } = params;
  return this.prisma.user.update({
    data,
    where,
  });
}
```

#### 5. `deleteUser`
* **Descrição**: Exclui um usuário com base em um critério único.
* **Parâmetros**:
  * `where`: Critério para identificar o usuário a ser excluído.
* **Retorno**: Retorna o usuário que foi excluído.
```typescript
async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
  return this.prisma.user.delete({
    where,
  });
}
```

---

### Notas
* **Validação de Entrada**: O método `user` valida se o e-mail foi fornecido antes de realizar a busca, garantindo que operações inválidas não sejam realizadas.
* **Operações CRUD**: O serviço oferece métodos completos para as operações CRUD (Create, Read, Update, Delete) sobre usuários, utilizando as capacidades do Prisma para filtros e ordenações complexas.
* **Uso do Prisma**: O serviço depende do PrismaService para realizar operações eficientes e seguras no banco de dados.
