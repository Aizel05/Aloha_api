import { Controller, Get, Patch, Body, Query, UseGuards, Param, ParseIntPipe , BadRequestException } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags, ApiBody, ApiQuery, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Personas')
@ApiBearerAuth() // 🔥 Indica que este endpoint requiere token
@Controller('persona')
@UseGuards(AuthGuard) // 🔐 Protege el controlador con el token global
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

// 🔍 Buscar personas con filtros dinámicos
  @Get('buscar')
  @ApiQuery({ 
    name: 'filtros', 
    required: false, 
    description: 'Filtros en formato JSON. Ejemplo: {"nombres": "Julio"}', 
    example: '{"nombres": "Julio"}' 
  })
  @ApiOperation({ summary: 'Buscar personas con cualquier parámetro de la tabla' })
  @ApiResponse({
    status: 200,
    description: 'Lista de personas que coinciden con los filtros.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          identificacion: { type: 'string', example: '1234567890' },
		  nombres: { type: 'string', example: 'Julio' },
		  apellidos: { type: 'string', example: 'Perez' },
          email: { type: 'string', example: 'wilson@email.com' },
		  tipo_persona: { type: 'string', example: 'empleado' },
		  estado: { type: 'string', example: 'Si' },
		  genera_tiempo_adicional: { type: 'string', example: 'Si' },
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Formato de filtro inválido' })
  async buscar(@Query('filtros') filtros: string) {
    let parsedFilters = {};

    try {
      parsedFilters = filtros ? JSON.parse(filtros) : {}; 
    } catch (error) {
      throw new BadRequestException('El formato de los filtros debe ser un JSON válido');
    }

    Object.keys(parsedFilters).forEach(key => {
      if (!isNaN(parsedFilters[key])) {
        parsedFilters[key] = Number(parsedFilters[key]); // Convertir a número si es posible
      }
    });

    return this.personaService.buscarPersonas(parsedFilters);
  }

  // 🔍 Obtener persona por ID
  @Get(':id')
  @ApiOperation({ summary: 'Obtener persona por ID' })
  @ApiResponse({ status: 200, description: 'Persona encontrada', schema: { type: 'object',  properties: {
          id: { type: 'integer', example: 1 },
          identificacion: { type: 'string', example: '1234567890' },
		  nombres: { type: 'string', example: 'Julio' },
		  apellidos: { type: 'string', example: 'Perez' },
          email: { type: 'string', example: 'wilson@email.com' },
		  tipo_persona: { type: 'string', example: 'empleado' },
		  estado: { type: 'string', example: 'Si' },
		  genera_tiempo_adicional: { type: 'string', example: 'Si' },
        }}})
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.personaService.obtenerPersonaPorId(id);
  }

  // 🔍 Obtener persona por cédula
  @Get('cedula/:identificacion')
  @ApiOperation({ summary: 'Consultar persona por su cédula' })
  @ApiResponse({ status: 200, description: 'Persona encontrada', schema: { type: 'object',  properties: {
          id: { type: 'integer', example: 1 },
          identificacion: { type: 'string', example: '1234567890' },
		  nombres: { type: 'string', example: 'Julio' },
		  apellidos: { type: 'string', example: 'Perez' },
          email: { type: 'string', example: 'wilson@email.com' },
		  tipo_persona: { type: 'string', example: 'empleado' },
		  estado: { type: 'string', example: 'Si' },
		  genera_tiempo_adicional: { type: 'string', example: 'Si' },
        }}})
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  async obtenerPorCedula(@Param('identificacion') identificacion: string) {
    return this.personaService.obtenerPorCedula(identificacion);
  }

  // ✏️ Actualizar email
  @Patch(':id/email')
  @ApiOperation({ summary: 'Actualizar el correo electrónico de la persona' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'nuevo@email.com' }
      },
      required: ['email']
    }
  })
  @ApiResponse({ status: 200, description: 'Email actualizado correctamente' })
  @ApiResponse({ status: 400, description: 'Formato de email inválido' })
  async actualizarEmail(
    @Param('id', ParseIntPipe) id: number,
    @Body('email') nuevoEmail: string
  ) {
    return this.personaService.actualizarEmail(id, nuevoEmail);
  }

  // 🔍 Obtener todas las personas
  @Get()
  @ApiOperation({ summary: 'Obtener todas las personas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las personas registradas',
     schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          identificacion: { type: 'string', example: '1234567890' },
		  nombres: { type: 'string', example: 'Julio' },
		  apellidos: { type: 'string', example: 'Perez' },
          email: { type: 'string', example: 'wilson@email.com' },
		  tipo_persona: { type: 'string', example: 'empleado' },
		  estado: { type: 'string', example: 'Si' },
		  genera_tiempo_adicional: { type: 'string', example: 'Si' },
        }
      }
    }
	})
  async obtenerTodas() {
    return this.personaService.obtenerPersonas();
  }
}
