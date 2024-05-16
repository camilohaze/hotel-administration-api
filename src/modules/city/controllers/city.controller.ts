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

import { CityEntity } from '@entities';
import { CityService } from '@services';

/**
 * Controller for all actions.
 *
 * @export
 * @class CityController
 */
@ApiTags('cities')
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 404, description: 'Not Found.' })
@ApiResponse({ status: 500, description: 'Internal Error Server.' })
@ApiBearerAuth()
@Controller('cities')
export class CityController {
  /**
   * Creates an instance of CityController.
   * @param {CityService} hotelService
   * @memberof CityController
   */
  public constructor(private readonly hotelService: CityService) {}

  /**
   * Get all hotels.
   *
   * @returns {Promise<CityEntity[]>}
   * @memberof CityController
   */
  @Get()
  @ApiOperation({ description: 'Get all hotels' })
  @ApiResponse({
    status: 200,
    description: 'Return all hotels.',
    isArray: true,
    type: CityEntity,
  })
  public async getAll(): Promise<CityEntity[]> {
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
   * @returns {Promise<CityEntity>}
   * @memberof CityController
   */
  @Get(':id')
  @ApiOperation({ description: 'Get hotel by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a hotel by id.',
    isArray: false,
    type: CityEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async getById(@Param('id') id: number): Promise<CityEntity> {
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
   * @param {CityEntity} hotel
   * @returns {Promise<CityEntity>}
   * @memberof CityController
   */
  @Post()
  @ApiOperation({ description: 'Store hotel' })
  @ApiResponse({
    status: 201,
    description: 'Return the saved hotel.',
    isArray: false,
    type: CityEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async store(@Body() hotel: CityEntity): Promise<CityEntity> {
    return await this.hotelService.store(hotel);
  }

  /**
   * Update hotel.
   *
   * @param {CityEntity} hotel
   * @returns {Promise<CityEntity>}
   * @memberof CityController
   */
  @Put()
  @ApiOperation({ description: 'Update hotel' })
  @ApiResponse({
    status: 200,
    description: 'Return the updated hotel.',
    isArray: false,
    type: CityEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async update(@Body() hotel: CityEntity): Promise<CityEntity> {
    return await this.hotelService.update(hotel);
  }

  /**
   * Destroy hotel.
   *
   * @param {CityEntity} hotel
   * @returns {Promise<CityEntity>}
   * @memberof CityController
   */
  @Delete()
  @ApiOperation({ description: 'Destroy hotel' })
  @ApiResponse({
    status: 200,
    description: 'Return the removed hotel.',
    isArray: false,
    type: CityEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async destroy(@Body() hotel: CityEntity): Promise<CityEntity> {
    return await this.hotelService.destroy(hotel);
  }
}
