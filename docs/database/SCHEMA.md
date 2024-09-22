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
  id       Int    @default(autoincrement()) @id
  name     String
  email    String @unique
  password String
}
```
* **Descrição**: Este modelo define um usuário no sistema.
* **Campos**:
  * `id`: Identificador único do usuário, incrementado automaticamente.
  * `name`: Nome do usuário.
  * `email`: Endereço de e-mail do usuário, deve ser único.
  * `password`: Senha do usuário (armazenada como string).

**Modelo** `Product`
```prisma
model Product {
  id                Int          @default(autoincrement()) @id
  name              String       @unique
  productId         Int          @unique
  type              ProductType? @relation(fields: [typeId], references: [id])
  typeId            Int?
  cost              Int
  price             Int
  weight            Int
  imgUrl            String?
  batch             String?
  barCode           Int
  quantity          Int          @default(0)
}

```

* **Descrição**: Este modelo define um produto no sistema.
* **Campos**:
  * `id`: Identificador único do produto, incrementado automaticamente.
  * `name`: Nome do produto, deve ser único.
  * `productId`: Um identificador único adicional para o produto.
  * `type`: Tipo de produto, com uma relação opcional com o modelo ProductType.
  * `typeId`: Campo opcional que referencia o ProductType.
  * `cost`: Custo de produção ou aquisição do produto.
  * `price`: Preço de venda do produto.
  * `weight`: Peso do produto.
  * `imgUrl`: URL da imagem do produto (opcional).
  * `batch`: Lote de produção (opcional).
  * `barCode`: Código de barras do produto.
  * `quantity`: Quantidade de produtos disponíveis, com valor padrão de 0.

**Modelo** `ProductType`
```prisma
model ProductType {
  id       Int       @default(autoincrement()) @id
  name     String    @unique
  products Product[]
}
```
* **Descrição**: Define o tipo de um produto (por exemplo, eletrônico, vestuário).
* **Campos**:
  * `id`: Identificador único do tipo de produto, incrementado automaticamente.
  * `name`: Nome do tipo de produto, deve ser único.
  * `products`: Relação de um-para-muitos com o modelo Product, o que significa que um tipo de produto pode estar associado a vários produtos.
---
### Notas
* **Relações**:
  * O modelo Product possui uma relação opcional com o modelo ProductType através do campo `typeId`.
  * O modelo ProductType tem uma lista de produtos associados através do campo `products[]`.

* **Validação e Unicidade**:
  * O campo `email` no modelo User e o campo `name` no modelo ProductType devem ser únicos no banco de dados, garantindo que não haja duplicatas.
  * O campo `productId` no modelo Product também deve ser único, garantindo a singularidade de identificadores de produtos.
* Banco de Dados: O banco de dados utilizado é PostgreSQL, conforme especificado na fonte de dados.
