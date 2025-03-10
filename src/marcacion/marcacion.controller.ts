import { Controller, Get, Patch, Body, Query, UseGuards, Param, ParseIntPipe , BadRequestException } from '@nestjs/common';
import { MarcacionService } from './marcacion.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags, ApiBody, ApiQuery, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('marcacion')
@ApiTags('Marcaciones')
@ApiBearerAuth() 
@UseGuards(AuthGuard) 
export class MarcacionController {
  constructor(private readonly marcacionService: MarcacionService) {}

  // 🔍 Obtener marcaciones por fecha
  @Get('/por-fecha')
  @ApiQuery({ 
    name: 'fecha_marcacion', 
    required: true, 
    type: String, 
    format: 'date', 
    description: 'Fecha en formato YYYY-MM-DD',
    example: '2025-03-06'
  }) 
  @ApiOperation({ summary: 'Obtener marcaciones por fecha' })
  @ApiResponse({ status: 200, description: 'Lista de marcaciones encontradas', schema: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      id_persona: { type: 'integer', example: 1 },
      fecha_marcacion: { type: 'string', example: '2025-03-06' },
	  estado_marcacion: { type: 'string', example: 'Entrada' },
	  nombre_dispositivo: { type: 'string', example: 'Porteria' },
	  estado: { type: 'boolean', example: true },
	  id_turno: { type: 'integer', example: 1 },
      Latitud: { type: 'number', example: -12.04318 },
      Longitud: { type: 'number', example: -77.02824 },
	  Id_foto_remota: { type: 'integer', example: 5 },
    }
  } })
  @ApiResponse({ status: 400, description: 'Error en el formato de la fecha' })
  async obtenerPorFecha(@Query('fecha_marcacion') fecha_marcacion: string) {  
    console.log('Fecha recibida:', fecha_marcacion);  
    return this.marcacionService.obtenerPorFecha(fecha_marcacion);  
  }

  // 🔍 Obtener marcaciones por rango de fechas
  @Get('/por-rango-fechas')
  @ApiQuery({ 
    name: 'fecha_inicio', 
    required: true, 
    type: String, 
    format: 'date', 
    description: 'Fecha de inicio en formato YYYY-MM-DD',
    example: '2025-03-01'
  }) 
  @ApiQuery({ 
    name: 'fecha_fin', 
    required: true, 
    type: String, 
    format: 'date', 
    description: 'Fecha de fin en formato YYYY-MM-DD',
    example: '2025-03-06'
  }) 
  @ApiOperation({ summary: 'Obtener marcaciones por rango de fechas' }) 
  @ApiResponse({ status: 200, description: 'Lista de marcaciones encontradas' , schema: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      id_persona: { type: 'integer', example: 1 },
      fecha_marcacion: { type: 'string', example: '2025-03-06' },
	  estado_marcacion: { type: 'string', example: 'Entrada' },
	  nombre_dispositivo: { type: 'string', example: 'Porteria' },
	  estado: { type: 'boolean', example: true },
	  id_turno: { type: 'integer', example: 1 },
      Latitud: { type: 'number', example: -12.04318 },
      Longitud: { type: 'number', example: -77.02824 },
	  Id_foto_remota: { type: 'integer', example: 5 },
    }
  }})
  @ApiResponse({ status: 400, description: 'Error: Formato de fecha inválido' })
  async obtenerPorRangoFechas(
    @Query('fecha_inicio') fecha_inicio: string,
    @Query('fecha_fin') fecha_fin: string
  ) {  
    console.log('Fechas recibidas:', fecha_inicio, fecha_fin);
    return this.marcacionService.obtenerPorRangoFechas(fecha_inicio, fecha_fin);  
  }

  // ✏️ Actualizar latitud y longitud por persona
  @Patch('/actualizar_lat_log')
  @ApiOperation({ summary: 'Actualizar latitud y longitud por persona' })
  @ApiQuery({ name: 'id_persona', required: true, type: Number, description: 'ID de la persona', example: 1 })
  @ApiBody({
    description: 'Datos a actualizar en las marcaciones',
    schema: {
      type: 'object',
      properties: {
        Latitud: { type: 'number', example: -12.04318 },
        Longitud: { type: 'number', example: -77.02824 },
        Id_foto_remota: { type: 'string', nullable: true, example: '1' }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Marcaciones actualizadas correctamente' })
  @ApiResponse({ status: 400, description: 'Error en la solicitud' })
  async actualizarMarcaciones(
    @Query('id_persona', ParseIntPipe) id_persona: number,
    @Body() datosActualizados: { Latitud?: number; Longitud?: number; Id_foto_remota?: string | null }
  ) {
    return this.marcacionService.actualizarMarcacionesGPS(id_persona, datosActualizados);
  }

  // 🔍 Obtener marcación por ID
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una marcación por su ID' })
  @ApiResponse({ status: 200, description: 'Marcación encontrada', schema: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      id_persona: { type: 'integer', example: 1 },
      fecha_marcacion: { type: 'string', example: '2025-03-06' },
	  estado_marcacion: { type: 'string', example: 'Entrada' },
	  nombre_dispositivo: { type: 'string', example: 'Porteria' },
	  estado: { type: 'boolean', example: true },
	  id_turno: { type: 'integer', example: 1 },
      Latitud: { type: 'number', example: -12.04318 },
      Longitud: { type: 'number', example: -77.02824 },
	  Id_foto_remota: { type: 'integer', example: 5 },
    }
  }})
  @ApiResponse({ status: 404, description: 'Marcación no encontrada' })
  async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.marcacionService.obtenerMarcacionPorId(id);
  }

  // 🔍 Obtener marcaciones por persona
  @Get('/por-persona/:id_persona') 
  @ApiOperation({ summary: 'Obtener marcaciones por ID de la persona'})
  @ApiResponse({ status: 200, description: 'Lista de marcaciones encontradas', schema: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      id_persona: { type: 'integer', example: 1 },
      fecha_marcacion: { type: 'string', example: '2025-03-06' },
	  estado_marcacion: { type: 'string', example: 'Entrada' },
	  nombre_dispositivo: { type: 'string', example: 'Porteria' },
	  estado: { type: 'boolean', example: true },
	  id_turno: { type: 'integer', example: 1 },
      Latitud: { type: 'number', example: -12.04318 },
      Longitud: { type: 'number', example: -77.02824 },
	  Id_foto_remota: { type: 'integer', example: 5 },
    }
  } })
  @ApiResponse({ status: 404, description: 'No se encontraron marcaciones para la persona' })
  async obtenerPorIdPersona(@Param('id_persona', ParseIntPipe) id_persona: number) {
    return this.marcacionService.obtenerPorIdPersona(id_persona);
  }

  /*
  // 🔍 Obtener todas las marcaciones
  @Get()
  async obtenerTodas() {
    return this.marcacionService.obtenerMarcaciones();
  }
  */
}


 