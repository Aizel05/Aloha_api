import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public() 
  @Post('cambiar-token')
  @ApiExcludeEndpoint() 
  @ApiOperation({ summary: 'Generar un nuevo token sin autenticación' })
  async cambiarToken() {
    const nuevoToken = await this.authService.revokeToken();
    return { nuevoToken };
  }

  @Get('token-actual')
  @UseGuards(AuthGuard)  
  @ApiBearerAuth()
  @ApiExcludeEndpoint() 
  @ApiOperation({ summary: 'Obtener el token actual (protegido)' })
  async obtenerTokenActual() {
    const token = await this.authService.generateAccessToken();
    return { token };
  }
}
