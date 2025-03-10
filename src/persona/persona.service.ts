import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PersonaService {
  constructor(private prisma: PrismaService) {}

  async obtenerPersonas() {
    return this.prisma.persona.findMany({
	
	select: {
      id: true,
	  identificacion: true,
      nombres: true,
	  apellidos: true,
      email: true,
	  tipo_persona: true,
	  estado: true,
	  genera_tiempo_adicional: true,
    
	}
	
	}); 
  }

  async obtenerPersonaPorId(id: number) {
    return this.prisma.persona.findUnique({ 
	select: {
      id: true,
	  identificacion: true,
      nombres: true,
	  apellidos: true,
      email: true,
	  tipo_persona: true,
	  estado: true,
	  genera_tiempo_adicional: true,
	}, where: { id } });
  }
  
  async obtenerPorCedula(identificacion: string) {  
    return this.prisma.persona.findMany({select: {
      id: true,
	  identificacion: true,
      nombres: true,
	  apellidos: true,
      email: true,
	  tipo_persona: true,
	  estado: true,
	  genera_tiempo_adicional: true,
	},
      where: { identificacion }, 
    });
  }
  
  async actualizarEmail(id: number, nuevoEmail: string) {
  return this.prisma.persona.update({
    where: { id },
    data: { email: nuevoEmail },
  });
}

   async buscarPersonas(filtros: any) {
    return this.prisma.persona.findMany(
	{select: {
      id: true,
	  identificacion: true,
      nombres: true,
	  apellidos: true,
      email: true,
	  tipo_persona: true,
	  estado: true,
	  genera_tiempo_adicional: true,
	},
      where: filtros,
    });
  }

}
