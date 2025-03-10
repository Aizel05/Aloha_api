import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MarcacionService {

 constructor(private prisma: PrismaService) {}

  async obtenerMarcaciones() {
    return this.prisma.marcacion.findMany(); 
  }

  async obtenerMarcacionPorId(id: number) {
    return this.prisma.marcacion.findUnique({ select: {
      id: true,
	  id_persona: true,
	  fecha_marcacion: true,
	  estado_marcacion: true,
	  nombre_dispositivo: true,
	  estado: true,
	  id_turno: true,
	  Latitud: true,
	  Longitud: true,
	  Id_foto_remota: true
	},
	where: { id } });
  }
  
  async obtenerPorIdPersona(id_persona: number) {  
    return this.prisma.marcacion.findMany({
	select: {
      id: true,
	  id_persona: true,
	  fecha_marcacion: true,
	  estado_marcacion: true,
	  nombre_dispositivo: true,
	  estado: true,
	  id_turno: true,
	  Latitud: true,
	  Longitud: true,
	  Id_foto_remota: true
	},
      where: { id_persona }, 
    });
  }
  
async obtenerPorFecha(fecha_marcacion: string) {

  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha_marcacion)) {
    throw new Error('Formato de fecha inválido. Usa "YYYY-MM-DD".');
  }

  const inicioDia = new Date(`${fecha_marcacion}T00:00:00.000Z`);
  const finDia = new Date(`${fecha_marcacion}T23:59:59.999Z`);

  return this.prisma.marcacion.findMany({
  select: {
      id: true,
	  id_persona: true,
	  fecha_marcacion: true,
	  estado_marcacion: true,
	  nombre_dispositivo: true,
	  estado: true,
	  id_turno: true,
	  Latitud: true,
	  Longitud: true,
	  Id_foto_remota: true
	},
    where: {
      fecha_marcacion: {
        gte: inicioDia, // Mayor o igual al inicio del día
        lte: finDia,    // Menor o igual al fin del día
      },
    },
  });
}

async obtenerPorRangoFechas(fecha_inicio: string, fecha_fin: string) {
  
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha_inicio) || !/^\d{4}-\d{2}-\d{2}$/.test(fecha_fin)) {
    throw new Error('Formato de fecha inválido. Usa "YYYY-MM-DD".');
  }
 
  const inicio = new Date(`${fecha_inicio}T00:00:00.000Z`);
  const fin = new Date(`${fecha_fin}T23:59:59.999Z`);

  return this.prisma.marcacion.findMany({
  select: {
      id: true,
	  id_persona: true,
	  fecha_marcacion: true,
	  estado_marcacion: true,
	  nombre_dispositivo: true,
	  estado: true,
	  id_turno: true,
	  Latitud: true,
	  Longitud: true,
	  Id_foto_remota: true
	},
    where: {
      fecha_marcacion: {
        gte: inicio, // Desde fecha_inicio
        lte: fin,    // Hasta fecha_fin
      },
    },
  });
}

async actualizarMarcacionesGPS(
  id_persona: number,
  datosActualizados: { Latitud?: number; Longitud?: number; Id_foto_remota?: string | null }
) {
  const updateData: any = {}; 

  if (datosActualizados.Latitud !== undefined) {
    updateData.Latitud = { set: String(datosActualizados.Latitud) };
  }
  if (datosActualizados.Longitud !== undefined) {
    updateData.Longitud = { set: String(datosActualizados.Longitud) };
  }
  if (datosActualizados.Id_foto_remota !== undefined) {
    updateData.Id_foto_remota = { set: datosActualizados.Id_foto_remota };
  }

  // Si no hay datos para actualizar, evitamos consultar
  if (Object.keys(updateData).length === 0) {
    throw new Error('No se enviaron campos para actualizar.');
  }

  return this.prisma.marcacion.updateMany({
    where: { id_persona },
    data: updateData,
  });
}

}
