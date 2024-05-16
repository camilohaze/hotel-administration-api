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

import { RoomTypeEntity } from '@entities';
import { RoomTypeService } from '@services';

/**
 * Controller for all actions.
 *
 * @export
 * @class RoomTypeController
 */
@ApiTags('room-types')
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 404, description: 'Not Found.' })
@ApiResponse({ status: 500, description: 'Internal Error Server.' })
@ApiBearerAuth()
@Controller('room-types')
export class RoomTypeController {
  /**
   * Creates an instance of RoomTypeController.
   * @param {RoomTypeService} roomTypeService
   * @memberof RoomTypeController
   */
  public constructor(private readonly roomTypeService: RoomTypeService) {}

  /**
   * Get all room types.
   *
   * @returns {Promise<RoomTypeEntity[]>}
   * @memberof RoomTypeController
   */
  @Get()
  @ApiOperation({ description: 'Get all room types' })
  @ApiResponse({
    status: 200,
    description: 'Return all room types.',
    isArray: true,
    type: RoomTypeEntity,
  })
  public async getAll(): Promise<RoomTypeEntity[]> {
    return await this.roomTypeService.getAll().then((roomTypes) => {
      if (roomTypes.length > 0) {
        return roomTypes;
      }

      throw new NotFoundException();
    });
  }

  /**
   * Get room type by id.
   *
   * @param {number} id
   * @returns {Promise<RoomTypeEntity>}
   * @memberof RoomTypeController
   */
  @Get(':id')
  @ApiOperation({ description: 'Get room type by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a room type by id.',
    isArray: false,
    type: RoomTypeEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async getById(@Param('id') id: number): Promise<RoomTypeEntity> {
    return await this.roomTypeService.getById(id).then((roomType) => {
      if (roomType) {
        return roomType;
      }

      throw new NotFoundException();
    });
  }

  /**
   * Store room type.
   *
   * @param {RoomTypeEntity} roomType
   * @returns {Promise<RoomTypeEntity>}
   * @memberof RoomTypeController
   */
  @Post()
  @ApiOperation({ description: 'Store room type' })
  @ApiResponse({
    status: 201,
    description: 'Return the saved room type.',
    isArray: false,
    type: RoomTypeEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async store(
    @Body() roomType: RoomTypeEntity,
  ): Promise<RoomTypeEntity> {
    return await this.roomTypeService.store(roomType);
  }

  /**
   * Update room type.
   *
   * @param {RoomTypeEntity} roomType
   * @returns {Promise<RoomTypeEntity>}
   * @memberof RoomTypeController
   */
  @Put()
  @ApiOperation({ description: 'Update room type' })
  @ApiResponse({
    status: 200,
    description: 'Return the updated room type.',
    isArray: false,
    type: RoomTypeEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async update(
    @Body() roomType: RoomTypeEntity,
  ): Promise<RoomTypeEntity> {
    return await this.roomTypeService.update(roomType);
  }

  /**
   * Destroy room type.
   *
   * @param {RoomTypeEntity} roomType
   * @returns {Promise<RoomTypeEntity>}
   * @memberof RoomTypeController
   */
  @Delete()
  @ApiOperation({ description: 'Destroy room type' })
  @ApiResponse({
    status: 200,
    description: 'Return the removed room type.',
    isArray: false,
    type: RoomTypeEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async destroy(
    @Body() roomType: RoomTypeEntity,
  ): Promise<RoomTypeEntity> {
    return await this.roomTypeService.destroy(roomType);
  }
}
