import { Controller, Options } from '@nestjs/common';

@Controller('/auth')
export class AuthController {
  @Options('register')
  async optionsRegister() {
    return; 
  }
}
