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

import { BookingEntity } from '@entities';
import { BookingService } from '@services';

/**
 * Controller for all actions.
 *
 * @export
 * @class BookingController
 */
@ApiTags('bookings')
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 404, description: 'Not Found.' })
@ApiResponse({ status: 500, description: 'Internal Error Server.' })
@ApiBearerAuth()
@Controller('bookings')
export class BookingController {
  /**
   * Creates an instance of BookingController.
   * @param {BookingService} bookingService
   * @memberof BookingController
   */
  public constructor(private readonly bookingService: BookingService) {}

  /**
   * Get all bookings.
   *
   * @param {number} bookingId
   * @returns {Promise<BookingEntity[]>}
   * @memberof BookingController
   */
  @Get()
  @ApiOperation({ description: 'Get all bookings' })
  @ApiResponse({
    status: 200,
    description: 'Return all bookings.',
    isArray: true,
    type: BookingEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async getAll(): Promise<BookingEntity[]> {
    return await this.bookingService.getAll().then((bookings) => {
      if (bookings.length > 0) {
        return bookings;
      }

      throw new NotFoundException();
    });
  }

  /**
   * Get booking by id.
   *
   * @param {number} id
   * @returns {Promise<BookingEntity>}
   * @memberof BookingController
   */
  @Get(':id')
  @ApiOperation({ description: 'Get booking by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a booking by id.',
    isArray: false,
    type: BookingEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async getById(@Param('id') id: number): Promise<BookingEntity> {
    return await this.bookingService.getById(id).then((booking) => {
      if (booking) {
        return booking;
      }

      throw new NotFoundException();
    });
  }

  /**
   * Get all bookings by booking id.
   *
   * @param {number} bookingId
   * @returns {Promise<BookingEntity[]>}
   * @memberof BookingController
   */
  @Get('/hotel/:hotelId')
  @ApiOperation({ description: 'Get all bookings' })
  @ApiResponse({
    status: 200,
    description: 'Return all bookings.',
    isArray: true,
    type: BookingEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async getByHotelId(
    @Param('hotelId') hotelId: number,
  ): Promise<BookingEntity[]> {
    return await this.bookingService.getByHotelId(hotelId).then((bookings) => {
      if (bookings.length > 0) {
        return bookings;
      }

      throw new NotFoundException();
    });
  }

  /**
   * Store booking.
   *
   * @param {BookingEntity} booking
   * @returns {Promise<BookingEntity>}
   * @memberof BookingController
   */
  @Post()
  @ApiOperation({ description: 'Store booking' })
  @ApiResponse({
    status: 201,
    description: 'Return the saved booking.',
    isArray: false,
    type: BookingEntity,
  })
  public async store(@Body() booking: BookingEntity): Promise<BookingEntity> {
    return await this.bookingService.store(booking);
  }

  /**
   * Update booking.
   *
   * @param {BookingEntity} booking
   * @returns {Promise<BookingEntity>}
   * @memberof BookingController
   */
  @Put()
  @ApiOperation({ description: 'Update booking' })
  @ApiResponse({
    status: 200,
    description: 'Return the updated booking.',
    isArray: false,
    type: BookingEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async update(@Body() booking: BookingEntity): Promise<BookingEntity> {
    return await this.bookingService.update(booking);
  }

  /**
   * Destroy booking.
   *
   * @param {BookingEntity} booking
   * @returns {Promise<BookingEntity>}
   * @memberof BookingController
   */
  @Delete()
  @ApiOperation({ description: 'Destroy booking' })
  @ApiResponse({
    status: 200,
    description: 'Return the removed booking.',
    isArray: false,
    type: BookingEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async destroy(@Body() booking: BookingEntity): Promise<BookingEntity> {
    return await this.bookingService.destroy(booking);
  }
}
