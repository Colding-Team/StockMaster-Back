# Documentação - `auth.service.ts`
Este arquivo define o AuthService, que é responsável pela lógica de autenticação na aplicação. Ele inclui métodos para registrar novos usuários (signUp) e autenticar usuários existentes (signIn), além de gerar tokens JWT para sessões seguras.

---

### Importações
O arquivo importa os seguintes módulos e bibliotecas:

* @nestjs/common:
  * BadRequestException: Exceção lançada quando ocorre uma solicitação inválida, como o uso de um e-mail já existente.
  * UnauthorizedException: Exceção lançada quando a autenticação falha (credenciais incorretas).
  * Injectable: Decorador para marcar a classe como um provedor injetável no NestJS.
* @nestjs/jwt: Serviço que lida com a criação e assinatura de tokens JWT.
* UserService: Serviço responsável por interagir com os dados do usuário.
* bcrypt: Biblioteca usada para realizar o hash e comparação de senhas.
* SignUpDto: DTO usado para garantir que os dados fornecidos no registro sejam válidos e tipados corretamente.

---

### Serviço `AuthService`
#### Definição
```typescript
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
}
```
O serviço injeta o **UserService** para manipular dados dos usuários e o **JwtService** para gerar tokens JWT.

### Métodos
#### 1. `signUp`
* **Descrição**: Registra um novo usuário no sistema. Verifica se o e-mail já está em uso, faz o hash da senha e cria um novo usuário. Após o registro, um token JWT é gerado para autenticação.
* **Parâmetros**:
  * `signUpDto`: Um objeto do tipo **SignUpDto** contendo os dados de registro (nome, e-mail e senha).
* Retorno: Retorna um objeto com o token JWT de acesso (`access_token`).
**Fluxo do Método**:
1. Verifica se o e-mail já está cadastrado chamando o método user do UserService.
2. Se o e-mail estiver em uso, lança uma exceção BadRequestException.
3. Faz o hash da senha usando o bcrypt.
4. Cria um novo usuário chamando o método createUser do UserService.
5. Gera um token JWT com o nome e e-mail do usuário.
6. Retorna o token JWT.
```typescript
async signUp(signUpDto: SignUpDto): Promise<{ access_token: string }> {
  const { name, email, password } = signUpDto;

  const existingUser = await this.userService.user(email);
  if (existingUser) {
    throw new BadRequestException('Este email já está em uso!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await this.userService.createUser({
    name,
    email,
    password: hashedPassword,
  });

  const payload = { name: name, email: email };
  return {
    access_token: await this.jwtService.signAsync(payload),
  };
}
```
#### 2. `signIn`
* **Descrição**: Autentica um usuário existente, verificando se o e-mail e a senha estão corretos. Gera um token JWT se a autenticação for bem-sucedida.
* **Parâmetros**:
  * `email`: O e-mail do usuário.
  * `pass`: A senha do usuário.
* Retorno: Retorna um objeto com o token JWT de acesso (`access_token`).
* Fluxo do Método:
1. Verifica se o usuário existe chamando o método user do UserService.
2. Se o usuário não existir, lança uma exceção UnauthorizedException.
3. Verifica se a senha fornecida corresponde à senha armazenada usando bcrypt.
4. Se a senha for inválida, lança uma exceção UnauthorizedException.
5. Gera um token JWT com o nome e e-mail do usuário.
6. Retorna o token JWT.
```typescript
async signIn(email: string, pass: string): Promise<{ access_token: string }> {
  const user = await this.userService.user(email);
  if (!user) {
    throw new UnauthorizedException('Email ou senha inválidos!');
  }

  const isPasswordValid = await bcrypt.compare(pass, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException('Email ou senha inválidos!');
  }

  const paylod = { name: user.name, email: user.email };
  return {
    access_token: await this.jwtService.signAsync(paylod),
  };
}
```

---

### Notas
* **Criptografia de Senhas**: O serviço utiliza bcrypt para fazer o hash da senha no registro e para verificar a senha na autenticação. Isso garante que as senhas sejam armazenadas de forma segura.
* **Exceções**: As exceções são lançadas para erros comuns como e-mail já existente (`BadRequestException`) ou credenciais inválidas (`UnauthorizedException`).
* **JWT**: O **JwtService** é usado para gerar tokens JWT que serão usados para autenticação de sessão. O token é assinado de forma assíncrona para melhor performance.
