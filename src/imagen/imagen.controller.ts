import { Controller, Get, Param, Query, Put, Body, Delete, UseGuards, ParseIntPipe, Post } from '@nestjs/common';
import { ImagenService } from './imagen.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags, ApiBody, ApiQuery , ApiOperation, ApiResponse} from '@nestjs/swagger';

export enum TipoImg {  
  Foto = 'Foto',  
  Huella = 'Huella',  
  Firma = 'Firma',  
}  


@ApiTags('Imagenes') 
@Controller('imagen')
@ApiBearerAuth() 
@UseGuards(AuthGuard) 
export class ImagenController {
  constructor(private readonly imagenService: ImagenService) {}

  // 🔍 Obtener imágenes por ID de persona
  @Get('persona/:id_persona')
  @ApiOperation({ summary: 'Obtener imágenes de una persona', description: 'Este método obtiene las imágenes en Base64 asociadas a una persona específica identificada por su ID.' })
  @ApiResponse({ status: 200, description: 'Lista de imágenes encontradas', schema: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        id_persona: { type: 'integer', example: 1 },
        tipo_imagen: { type: 'string', example: 'Foto' },
        imagen: { type: 'string', example: 'Base64 imagen' },
		estado: { type: 'string', example: 'S' },
      }
    }
  }})
  @ApiResponse({ status: 404, description: 'No se encontraron imágenes para la persona' })
  async obtenerPorIdPersona(@Param('id_persona', ParseIntPipe) id_persona: number) {
    return this.imagenService.obtenerPorIdPersona(id_persona);
  }

  // 🔍 Obtener imágenes por tipo y persona 
  @Get('tipo/:id_persona')  
  @ApiQuery({   
    name: 'tipo_imagen',  
    required: true,  
    enum: TipoImg,   
    description: 'Seleccione el tipo de imagen (Foto, Huella o Firma)',
    example: 'Foto'
  })  
  @ApiOperation({ summary: 'Obtener imágenes por tipo y persona', description: 'Este método obtiene las imágenes en Base64 asociadas a una persona específica identificada por su ID y Tipo' })  
  @ApiResponse({ status: 200, description: 'Lista de imágenes filtradas por tipo', schema: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 2 },
        id_persona: { type: 'integer', example: 1 },
        tipo_imagen: { type: 'string', example: 'Firma' },
        imagen: { type: 'string', example: 'Base64 imagen' },
		estado: { type: 'string', example: 'S' },
      }
    }
  }})
  @ApiResponse({ status: 404, description: 'No se encontraron imágenes de este tipo' })
  async obtenerPorTipo(  
    @Param('id_persona', ParseIntPipe) id_persona: number,  
    @Query('tipo_imagen') tipo_imagen: TipoImg = TipoImg.Foto   
  ) {  
    return this.imagenService.obtenerPorTipoImagen(id_persona, tipo_imagen);  
  }  

  // ❌ Eliminar una imagen por ID
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar imagen por ID' })
  @ApiResponse({ status: 200, description: 'Imagen eliminada correctamente' })
  @ApiResponse({ status: 404, description: 'Imagen no encontrada' })
  async eliminarImagen(@Param('id', ParseIntPipe) id: number) {
    return this.imagenService.eliminarImagen(id);
  }
  
    // ✏️ Actualizar Imagen de persona
  @Post('/actualizar_imagen')
  @ApiOperation({ summary: 'Actualizar foto de la persona' })
  @ApiQuery({ name: 'id_persona', required: true, type: Number, description: 'ID de la persona', example: 1 })
  @ApiBody({
    description: 'Imagen a actualizar en formato Base64',
    schema: {
      type: 'object',
      properties: {
        imagen: { type: 'string', example: "data:image/jpeg;base64,..." },
        tipo_imagen: { type: 'string', example: 'Foto' },
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Imagen actualizada correctamente' })
  @ApiResponse({ status: 400, description: 'Error en la solicitud' })
  async actualizarImagen(
    @Query('id_persona', ParseIntPipe) id_persona: number,
    @Body() datosActualizados: { imagen?: string; tipo_imagen?: string | "Foto" }
  ) {
    return this.imagenService.actualizarImagen(id_persona, datosActualizados);
  }
}
