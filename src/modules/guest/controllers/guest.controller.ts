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

import { GuestEntity } from '@entities';
import { GuestService } from '@services';

/**
 * Controller for all actions.
 *
 * @export
 * @class GuestController
 */
@ApiTags('guests')
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 404, description: 'Not Found.' })
@ApiResponse({ status: 500, description: 'Internal Error Server.' })
@ApiBearerAuth()
@Controller('guests')
export class GuestController {
  /**
   * Creates an instance of GuestController.
   * @param {GuestService} guestService
   * @memberof GuestController
   */
  public constructor(private readonly guestService: GuestService) {}

  /**
   * Get all guests.
   *
   * @returns {Promise<GuestEntity[]>}
   * @memberof GuestController
   */
  @Get()
  @ApiOperation({ description: 'Get all guests' })
  @ApiResponse({
    status: 200,
    description: 'Return all guests.',
    isArray: true,
    type: GuestEntity,
  })
  public async getAll(): Promise<GuestEntity[]> {
    return await this.guestService.getAll().then((guests) => {
      if (guests.length > 0) {
        return guests;
      }

      throw new NotFoundException();
    });
  }

  /**
   * Get guest by id.
   *
   * @param {number} id
   * @returns {Promise<GuestEntity>}
   * @memberof GuestController
   */
  @Get(':id')
  @ApiOperation({ description: 'Get guest by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a guest by id.',
    isArray: false,
    type: GuestEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async getById(@Param('id') id: number): Promise<GuestEntity> {
    return await this.guestService.getById(id).then((guest) => {
      if (guest) {
        return guest;
      }

      throw new NotFoundException();
    });
  }

  /**
   * Store guest.
   *
   * @param {GuestEntity} guest
   * @returns {Promise<GuestEntity>}
   * @memberof GuestController
   */
  @Post()
  @ApiOperation({ description: 'Store guest' })
  @ApiResponse({
    status: 201,
    description: 'Return the saved guest.',
    isArray: false,
    type: GuestEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async store(@Body() guest: GuestEntity): Promise<GuestEntity> {
    return await this.guestService.store(guest);
  }

  /**
   * Update guest.
   *
   * @param {GuestEntity} guest
   * @returns {Promise<GuestEntity>}
   * @memberof GuestController
   */
  @Put()
  @ApiOperation({ description: 'Update guest' })
  @ApiResponse({
    status: 200,
    description: 'Return the updated guest.',
    isArray: false,
    type: GuestEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async update(@Body() guest: GuestEntity): Promise<GuestEntity> {
    return await this.guestService.update(guest);
  }

  /**
   * Destroy guest.
   *
   * @param {GuestEntity} guest
   * @returns {Promise<GuestEntity>}
   * @memberof GuestController
   */
  @Delete()
  @ApiOperation({ description: 'Destroy guest' })
  @ApiResponse({
    status: 200,
    description: 'Return the removed guest.',
    isArray: false,
    type: GuestEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async destroy(@Body() guest: GuestEntity): Promise<GuestEntity> {
    return await this.guestService.destroy(guest);
  }
}
