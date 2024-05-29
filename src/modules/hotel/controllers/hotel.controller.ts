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

import { HotelEntity } from '@entities';
import { HotelService } from '@services';

/**
 * Controller for all actions.
 *
 * @export
 * @class HotelController
 */
@ApiTags('hotels')
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 404, description: 'Not Found.' })
@ApiResponse({ status: 500, description: 'Internal Error Server.' })
@ApiBearerAuth()
@Controller('hotels')
export class HotelController {
  /**
   * Creates an instance of HotelController.
   * @param {HotelService} hotelService
   * @memberof HotelController
   */
  public constructor(private readonly hotelService: HotelService) {}

  /**
   * Get all hotels.
   *
   * @returns {Promise<HotelEntity[]>}
   * @memberof HotelController
   */
  @Get()
  @ApiOperation({ description: 'Get all hotels' })
  @ApiResponse({
    status: 200,
    description: 'Return all hotels.',
    isArray: true,
    type: HotelEntity,
  })
  public async getAll(): Promise<HotelEntity[]> {
    return await this.hotelService.getAll().then((hotels) => {
      if (hotels.length > 0) {
        return hotels;
      }

      throw new NotFoundException();
    });
  }

  /**
   * Get hotel by id.
   *
   * @param {number} id
   * @returns {Promise<HotelEntity>}
   * @memberof HotelController
   */
  @Get(':id')
  @ApiOperation({ description: 'Get hotel by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a hotel by id.',
    isArray: false,
    type: HotelEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async getById(@Param('id') id: number): Promise<HotelEntity> {
    return await this.hotelService.getById(id).then((hotel) => {
      if (hotel) {
        return hotel;
      }

      throw new NotFoundException();
    });
  }

  /**
   * Store hotel.
   *
   * @param {HotelEntity} hotel
   * @returns {Promise<HotelEntity>}
   * @memberof HotelController
   */
  @Post()
  @ApiOperation({ description: 'Store hotel' })
  @ApiResponse({
    status: 201,
    description: 'Return the saved hotel.',
    isArray: false,
    type: HotelEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async store(@Body() hotel: HotelEntity): Promise<HotelEntity> {
    return await this.hotelService.store(hotel);
  }

  /**
   * Update hotel.
   *
   * @param {HotelEntity} hotel
   * @returns {Promise<HotelEntity>}
   * @memberof HotelController
   */
  @Put()
  @ApiOperation({ description: 'Update hotel' })
  @ApiResponse({
    status: 200,
    description: 'Return the updated hotel.',
    isArray: false,
    type: HotelEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async update(@Body() hotel: HotelEntity): Promise<HotelEntity> {
    return await this.hotelService.update(hotel);
  }

  /**
   * Toggle hotel status.
   *
   * @param {HotelEntity} hotel
   * @returns {Promise<HotelEntity>}
   * @memberof HotelController
   */
  @Put('toggleStatus')
  @ApiOperation({ description: 'Toggle hotel status' })
  @ApiResponse({
    status: 200,
    description: 'Return the updated hotel.',
    isArray: false,
    type: HotelEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async toggleStatus(@Body() hotel: HotelEntity): Promise<HotelEntity> {
    return await this.hotelService.toggleStatus(hotel);
  }

  /**
   * Destroy hotel.
   *
   * @param {HotelEntity} hotel
   * @returns {Promise<HotelEntity>}
   * @memberof HotelController
   */
  @Delete()
  @ApiOperation({ description: 'Destroy hotel' })
  @ApiResponse({
    status: 200,
    description: 'Return the removed hotel.',
    isArray: false,
    type: HotelEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async destroy(@Body() hotel: HotelEntity): Promise<HotelEntity> {
    return await this.hotelService.destroy(hotel);
  }
}
