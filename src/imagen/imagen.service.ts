import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImagenService {
  constructor(private prisma: PrismaService) {}

  async obtenerTodas() {
    return this.prisma.imagen.findMany({
		select: {
		id: true,
		id_persona: true,
		tipo_imagen: true,
		imagen: true,
		estado: true
		}
	});
  }

  async obtenerPorId(id: number) {
    return this.prisma.imagen.findUnique({ select: {
    id: true,
    id_persona: true,
    tipo_imagen: true,
	imagen: true,
	estado: true
	},
	where: { id } });
  }

  async obtenerPorTipoImagen(id_persona: number, tipo_imagen: string) {
    return this.prisma.imagen.findMany({
		select: {
		id: true,
		id_persona: true,
		tipo_imagen: true,
		imagen: true,
		estado: true
		},
      where: {
	    id_persona, 
        tipo_imagen
      },
    });
  }

 async obtenerPorIdPersona(id_persona: number) {
    return this.prisma.imagen.findMany({ select: {
    id: true,
    id_persona: true,
    tipo_imagen: true,
	imagen: true,
	estado: true
	},
	where: { id_persona } });
  }


  async eliminarImagen(id: number) {
    return this.prisma.imagen.delete({ where: { id } });
  }
  
  async actualizarImagen(
  id_persona: number,
  datosActualizados: { imagen?: string; tipo_imagen?: string | "Foto" }
) {
  const updateData: any = {}; 

  if (datosActualizados.imagen !== undefined) {
    updateData.imagen = { set: String(datosActualizados.imagen) };
  }
  if (datosActualizados.tipo_imagen !== undefined) {
    updateData.tipo_imagen = { set: String(datosActualizados.tipo_imagen) };
  }
  

  // Si no hay datos para actualizar, evitamos consultar
  if (Object.keys(updateData).length === 0) {
    throw new Error('No se enviaron campos para actualizar.');
  }

  return this.prisma.imagen.updateMany({
    where: { id_persona },
    data: updateData,
  });
}

}


   
	 
