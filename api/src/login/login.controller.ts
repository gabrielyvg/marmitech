import { Body, Controller, Post } from "@nestjs/common";
import { LoginService } from "./login.service";
import { ResultadoDto } from "src/dto/resultado.dto";

@Controller('login')
export class loginController {

  constructor(private readonly loginService: LoginService) { }

  @Post('login')
    async salvarUsuario(@Body() login: any): Promise<ResultadoDto> {
        return this.loginService.login(login);
    }
}