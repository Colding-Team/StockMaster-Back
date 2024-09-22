# Documentação - `auth.controller.ts`
Este arquivo define o **AuthController**, responsável pelas operações de autenticação de usuários na aplicação. Ele utiliza o serviço **AuthService** para realizar operações como login, registro e obtenção de perfil de usuário.

---

### Importações
O arquivo importa os seguintes módulos e classes:

* **@nestjs/common**:
  * **Body, Controller, Get, HttpCode, HttpStatus, Post, Request**: Decoradores usados para definir rotas e capturar dados.
  * **AuthService**: Serviço responsável por implementar a lógica de autenticação.
  * **Public**: Um decorador que marca rotas como públicas, ou seja, sem necessidade de autenticação.
  * **SignUpDto**: Um DTO que define a estrutura dos dados enviados no processo de registro.

---

### Controlador AuthController
**Definição**
```typescript
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
}
```
Este controlador define a rota base `'auth'` e injeta o AuthService para ser usado nos métodos do controlador.

### Métodos
* **1.** `signIn`
* **Descrição**: Realiza o login de um usuário através de credenciais (e-mail e senha).
* **Rota**: `POST /auth/login`
* **Acesso**: Público (não requer autenticação).
* **Parâmetros**:
  * `@Body() signInDto`: Um objeto que contém as credenciais do usuário (e-mail e senha).
* **Retorno**: Retorna um token JWT ou dados que identificam a sessão do usuário.
```typescript
@Public()
@HttpCode(HttpStatus.OK)
@Post('login')
async signIn(@Body() signInDto: Record<string, string>) {
  return await this.authService.signIn(signInDto.email, signInDto.password);
}
```

* **2.** `signUp`
* **Descrição**: Registra um novo usuário no sistema.
* **Rota**: `POST /auth/register`
* **Acesso**: Público (não requer autenticação).
* **Parâmetros**:
  * `@Body() signUpDto`: Um objeto do tipo SignUpDto que contém os dados necessários para criar um novo usuário (nome, e-mail, senha, etc.).
* **Retorno**: Retorna os dados do usuário recém-criado ou um token de sessão.
```typescript
@Public()
@HttpCode(HttpStatus.OK)
@Post('register')
async signUp(@Body() signUpDto: SignUpDto) {
  return await this.authService.signUp(signUpDto);
}
```

* **3.** `getProfile`
* **Descrição**: Retorna o perfil do usuário autenticado.
* **Rota**: `GET /auth/profile`
* **Acesso**: Requer autenticação (somente para usuários autenticados).
* **Parâmetros**:
  * `@Request() req`: Captura o objeto da requisição que contém o usuário autenticado (presente após a autenticação).
* **Retorno**: Retorna os dados do usuário autenticado que está fazendo a requisição.
```typescript
@Get('profile')
async getProfile(@Request() req) {
  return await req.user;
}
```

---

### Notas
* **Autenticação**: As rotas de login e registro são públicas, marcadas pelo decorador `@Public()`. A rota `GET /auth/profile` é privada, disponível apenas para usuários autenticados.
* **Lógica de Negócio**: A lógica de autenticação e criação de usuários está encapsulada no AuthService, que é injetado no controlador.
* **DTOs (Data Transfer Objects)**:
  * **SignInDto**: Utilizado para login, é um objeto genérico (`Record<string, string>`) contendo e-mail e senha.
  * **SignUpDto**: Utilizado para registro, contém os dados necessários para a criação de um usuário.
