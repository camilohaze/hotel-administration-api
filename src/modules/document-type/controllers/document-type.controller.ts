import {
  Controller,
  UseGuards,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { DocumentTypeEntity } from '@entities';
import { DocumentTypeService } from '@services';

/**
 * Controller for all actions.
 *
 * @export
 * @class DocumentTypeController
 */
@ApiTags('document-types')
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 404, description: 'Not Found.' })
@ApiResponse({ status: 500, description: 'Internal Error Server.' })
@ApiBearerAuth()
@Controller('document-types')
export class DocumentTypeController {
  /**
   * Creates an instance of DocumentTypeController.
   * @param {DocumentTypeService} documentTypeService
   * @memberof DocumentTypeController
   */
  public constructor(
    private readonly documentTypeService: DocumentTypeService,
  ) {}

  /**
   * Get all document types.
   *
   * @returns {Promise<DocumentTypeEntity[]>}
   * @memberof DocumentTypeController
   */
  @Get()
  @ApiOperation({ description: 'Get all document types' })
  @ApiResponse({
    status: 200,
    description: 'Return all document types.',
    isArray: true,
    type: DocumentTypeEntity,
  })
  public async getAll(): Promise<DocumentTypeEntity[]> {
    return await this.documentTypeService.getAll().then((documentTypes) => {
      if (documentTypes.length > 0) {
        return documentTypes;
      }

      throw new NotFoundException();
    });
  }

  /**
   * Get document type by id.
   *
   * @param {number} id
   * @returns {Promise<DocumentTypeEntity>}
   * @memberof DocumentTypeController
   */
  @Get(':id')
  @ApiOperation({ description: 'Get document type by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a document type by id.',
    isArray: false,
    type: DocumentTypeEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async getById(@Param('id') id: number): Promise<DocumentTypeEntity> {
    return await this.documentTypeService.getById(id).then((documentType) => {
      if (documentType) {
        return documentType;
      }

      throw new NotFoundException();
    });
  }

  /**
   * Store document type.
   *
   * @param {DocumentTypeEntity} documentType
   * @returns {Promise<DocumentTypeEntity>}
   * @memberof DocumentTypeController
   */
  @Post()
  @ApiOperation({ description: 'Store document type' })
  @ApiResponse({
    status: 201,
    description: 'Return the saved document type.',
    isArray: false,
    type: DocumentTypeEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async store(
    @Body() documentType: DocumentTypeEntity,
  ): Promise<DocumentTypeEntity> {
    return await this.documentTypeService.store(documentType);
  }

  /**
   * Update document type.
   *
   * @param {DocumentTypeEntity} documentType
   * @returns {Promise<DocumentTypeEntity>}
   * @memberof DocumentTypeController
   */
  @Put()
  @ApiOperation({ description: 'Update document type' })
  @ApiResponse({
    status: 200,
    description: 'Return the updated document type.',
    isArray: false,
    type: DocumentTypeEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async update(
    @Body() documentType: DocumentTypeEntity,
  ): Promise<DocumentTypeEntity> {
    return await this.documentTypeService.update(documentType);
  }

  /**
   * Destroy document type.
   *
   * @param {DocumentTypeEntity} documentType
   * @returns {Promise<DocumentTypeEntity>}
   * @memberof DocumentTypeController
   */
  @Delete()
  @ApiOperation({ description: 'Destroy document type' })
  @ApiResponse({
    status: 200,
    description: 'Return the removed document type.',
    isArray: false,
    type: DocumentTypeEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async destroy(
    @Body() documentType: DocumentTypeEntity,
  ): Promise<DocumentTypeEntity> {
    return await this.documentTypeService.destroy(documentType);
  }
}
