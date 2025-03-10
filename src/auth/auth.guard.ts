import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator'; 

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true; 
    }

    const request = context.switchToHttp().getRequest();
    
   // console.log('🔍 Revisando autenticación para:', request.url);

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      console.log('❌ No se proporcionó token');
      throw new UnauthorizedException('Token no proporcionado');
    }

    const token = authHeader.split(' ')[1];
   // console.log('🔑 Token recibido:', token);

    try {
      const isValid = await this.authService.validateAccessToken(token);
     // console.log('✅ Token válido:', isValid);
      return isValid;
    } catch (error) {
     // console.log('❌ Token inválido:', error.message);
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
