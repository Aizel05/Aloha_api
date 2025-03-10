import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from '../tokens/refresh-token.entity';
import { AccessToken } from '../tokens/access-token.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    @InjectRepository(AccessToken)
    private accessTokenRepository: Repository<AccessToken>,
    private configService: ConfigService,
  ) {}

  async generateAccessToken() {
  const token = this.jwtService.sign({ key: 'staticAccessKey' });
  await this.accessTokenRepository.clear(); 
  await this.accessTokenRepository.save({ token });
  return token;
}


  async validateAccessToken(token: string) {
    const storedToken = await this.accessTokenRepository.findOne({ where: { token } });
    if (!storedToken) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  async revokeToken() {
    return this.generateAccessToken();
  }
}
