# Documentação - `schema.prisma`
Este arquivo define o esquema do banco de dados utilizando o Prisma ORM. Ele inclui as definições de geradores, fontes de dados e modelos para a aplicação, com o suporte para PostgreSQL.

---

### Definições Gerais
**Gerador**
```prisma
generator client {
  provider = "prisma-client-js"
}
```
* **Descrição**: O gerador Prisma Client gera automaticamente o cliente Prisma em JavaScript para interagir com o banco de dados. Este cliente é usado para executar operações de leitura e escrita no banco de dados.

### Fonte de Dados
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
* **provider**: Especifica o PostgreSQL como o banco de dados utilizado.
* **url**: Obtém a URL de conexão ao banco de dados a partir da variável de ambiente DATABASE_URL.

---

### Modelos
**Modelo** `User`
```prisma
model User {
  id             Int             @id @default(autoincrement())
  name           String
  email          String          @unique
  password       String
  products       Product[]
  stockMovements StockMovement[]
}
```
* **Descrição**: Este modelo define um usuário no sistema.
* **Campos**:
  * `id`: Identificador único do usuário, incrementado automaticamente.
  * `name`: Nome do usuário.
  * `email`: Endereço de e-mail do usuário, deve ser único.
  * `password`: Senha do usuário (armazenada como string).
  * `products`: Relação com os produtos do usuário.
  * `stockMovements`: Relação com os movimentos de estoque do usuário.

**Modelo** `Product`
```prisma
model Product {
  id             Int             @id @default(autoincrement())
  name           String
  productId      String
  type           ProductType?    @relation(fields: [typeId], references: [id])
  typeId         Int?
  cost           Int
  price          Int
  weight         Int
  imgUrl         String?
  batch          String?
  barCode        Int             @unique
  quantity       Int             @default(0)
  userId         Int
  user           User            @relation(fields: [userId], references: [id])
  stockMovements StockMovement[]

  @@unique([productId, userId])
  @@index([name, productId, userId])
}
```
* **Descrição**: Este modelo define um produto no sistema.
* **Campos**:
  * `id`: Identificador único do produto, incrementado automaticamente.
  * `name`: Nome do produto.
  * `productId`: Identificador do produto definido pelo usuário.
  * `type`: Tipo de produto, com uma relação opcional com o modelo ProductType.
  * `typeId`: Campo opcional que referencia o ProductType.
  * `cost`: Custo do produto.
  * `price`: Preço de venda do produto.
  * `weight`: Peso do produto.
  * `imgUrl`: URL da imagem do produto (opcional).
  * `batch`: Lote de produção (opcional).
  * `barCode`: Código de barras do produto, deve ser único.
  * `quantity`: Quantidade de produtos disponíveis, com valor padrão de 0.
  * `userId`: ID do usuário proprietário do produto.
  * `user`: Relação com o usuário proprietário.
  * `stockMovements`: Relação com os movimentos de estoque do produto.
* **Índices e Restrições**:
  * Combinação única de `productId` e `userId`.
  * Índice composto em `name`, `productId` e `userId` para otimização de consultas.

**Modelo** `ProductType`
```prisma
model ProductType {
  id       Int       @id @default(autoincrement())
  name     String
  products Product[]
}
```
* **Descrição**: Define o tipo de um produto.
* **Campos**:
  * `id`: Identificador único do tipo de produto, incrementado automaticamente.
  * `name`: Nome do tipo de produto.
  * `products`: Relação de um-para-muitos com o modelo Product.

**Modelo** `StockMovement`
```prisma
model StockMovement {
  id          Int               @id @default(autoincrement())
  type        StockMovementType
  productId   Int
  product     Product           @relation(fields: [productId], references: [id])
  quantity    Int
  date        DateTime
  description String?
  userId      Int
  user        User              @relation(fields: [userId], references: [id])
}
```
* **Descrição**: Registra os movimentos de estoque dos produtos.
* **Campos**:
  * `id`: Identificador único do movimento de estoque, incrementado automaticamente.
  * `type`: Tipo de movimento (entrada ou saída), definido pelo enum StockMovementType.
  * `productId`: ID do produto associado ao movimento.
  * `product`: Relação com o produto associado.
  * `quantity`: Quantidade movimentada.
  * `date`: Data e hora do movimento.
  * `description`: Descrição opcional do movimento.
  * `userId`: ID do usuário que realizou o movimento.
  * `user`: Relação com o usuário que realizou o movimento.

**Enum** `StockMovementType`
```prisma
enum StockMovementType {
  IN
  OUT
}
```
* **Descrição**: Define os tipos possíveis de movimento de estoque.
* **Valores**:
  * `IN`: Entrada de estoque.
  * `OUT`: Saída de estoque.

---
### Notas
* **Relações**:
  * O modelo User tem relações um-para-muitos com Product e StockMovement.
  * O modelo Product tem relações um-para-muitos com StockMovement e muitos-para-um com User e ProductType.
  * O modelo StockMovement tem relações muitos-para-um com Product e User.

* **Validação e Unicidade**:
  * O campo `email` no modelo User deve ser único.
  * O campo `barCode` no modelo Product deve ser único.
  * A combinação de `productId` e `userId` no modelo Product deve ser única.

* **Índices**:
  * Um índice composto foi adicionado no modelo Product para otimizar consultas por nome, productId e userId.

* **Banco de Dados**: O banco de dados utilizado é PostgreSQL, conforme especificado na fonte de dados.