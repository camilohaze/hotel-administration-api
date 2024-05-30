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

import { RoomsFilter } from '@interfaces';
import { RoomEntity } from '@entities';
import { RoomService } from '@services';

/**
 * Controller for all actions.
 *
 * @export
 * @class RoomController
 */
@ApiTags('rooms')
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 404, description: 'Not Found.' })
@ApiResponse({ status: 500, description: 'Internal Error Server.' })
@ApiBearerAuth()
@Controller('rooms')
export class RoomController {
  /**
   * Creates an instance of RoomController.
   * @param {RoomService} roomService
   * @memberof RoomController
   */
  public constructor(private readonly roomService: RoomService) {}

  /**
   * Get room by id.
   *
   * @param {number} id
   * @returns {Promise<RoomEntity>}
   * @memberof RoomController
   */
  @Get(':id')
  @ApiOperation({ description: 'Get room by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a room by id.',
    isArray: false,
    type: RoomEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async getById(@Param('id') id: number): Promise<RoomEntity> {
    return await this.roomService.getById(id).then((room) => {
      if (room) {
        return room;
      }

      throw new NotFoundException();
    });
  }

  /**
   * Get all rooms by room id.
   *
   * @param {number} roomId
   * @returns {Promise<RoomEntity[]>}
   * @memberof RoomController
   */
  @Get('/hotel/:hotelId')
  @ApiOperation({ description: 'Get all rooms' })
  @ApiResponse({
    status: 200,
    description: 'Return all rooms.',
    isArray: true,
    type: RoomEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async getByHotelId(
    @Param('roomId') roomId: number,
  ): Promise<RoomEntity[]> {
    return await this.roomService.getByHotelId(roomId).then((rooms) => {
      if (rooms.length > 0) {
        return rooms;
      }

      throw new NotFoundException();
    });
  }

  /**
   * Get all rooms by filter options.
   *
   * @param {RoomsFilter} options
   * @returns {Promise<RoomEntity[]>}
   * @memberof RoomController
   */
  @Post('filter')
  @ApiOperation({ description: 'Get all rooms by filter options' })
  @ApiResponse({
    status: 200,
    description: 'Return all rooms by filter options.',
    isArray: true,
    type: RoomEntity,
  })
  public async filter(@Body() options: RoomsFilter): Promise<RoomEntity[]> {
    return await this.roomService.filter(options).then((rooms) => {
      if (rooms.length > 0) {
        return rooms;
      }

      throw new NotFoundException();
    });
  }

  /**
   * Store rooms.
   *
   * @param {RoomEntity[]} rooms
   * @returns {Promise<RoomEntity[]>}
   * @memberof RoomController
   */
  @Post()
  @ApiOperation({ description: 'Store room' })
  @ApiResponse({
    status: 201,
    description: 'Return the saved room.',
    isArray: true,
    type: RoomEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async store(@Body() rooms: RoomEntity[]): Promise<RoomEntity[]> {
    return await this.roomService.store(rooms);
  }

  /**
   * Update rooms.
   *
   * @param {RoomEntity[]} rooms
   * @returns {Promise<RoomEntity[]>}
   * @memberof RoomController
   */
  @Put()
  @ApiOperation({ description: 'Update rooms' })
  @ApiResponse({
    status: 200,
    description: 'Return the updated rooms.',
    isArray: true,
    type: RoomEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async update(@Body() rooms: RoomEntity[]): Promise<RoomEntity[]> {
    return await this.roomService.update(rooms);
  }

  /**
   * Destroy rooms.
   *
   * @param {RoomEntity[]} rooms
   * @returns {Promise<RoomEntity>}
   * @memberof RoomController
   */
  @Delete()
  @ApiOperation({ description: 'Destroy room' })
  @ApiResponse({
    status: 200,
    description: 'Return the removed room.',
    isArray: false,
    type: RoomEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async destroy(@Body() rooms: RoomEntity[]): Promise<RoomEntity[]> {
    return await this.roomService.destroy(rooms);
  }
}
