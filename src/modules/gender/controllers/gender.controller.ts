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

import { GenderEntity } from '@entities';
import { GenderService } from '@services';

/**
 * Controller for all actions.
 *
 * @export
 * @class GenderController
 */
@ApiTags('genders')
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 404, description: 'Not Found.' })
@ApiResponse({ status: 500, description: 'Internal Error Server.' })
@ApiBearerAuth()
@Controller('genders')
export class GenderController {
  /**
   * Creates an instance of GenderController.
   * @param {GenderService} genderService
   * @memberof GenderController
   */
  public constructor(private readonly genderService: GenderService) {}

  /**
   * Get all genders.
   *
   * @returns {Promise<GenderEntity[]>}
   * @memberof GenderController
   */
  @Get()
  @ApiOperation({ description: 'Get all genders' })
  @ApiResponse({
    status: 200,
    description: 'Return all genders.',
    isArray: true,
    type: GenderEntity,
  })
  public async getAll(): Promise<GenderEntity[]> {
    return await this.genderService.getAll().then((genders) => {
      if (genders.length > 0) {
        return genders;
      }

      throw new NotFoundException();
    });
  }

  /**
   * Get gender by id.
   *
   * @param {number} id
   * @returns {Promise<GenderEntity>}
   * @memberof GenderController
   */
  @Get(':id')
  @ApiOperation({ description: 'Get gender by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a gender by id.',
    isArray: false,
    type: GenderEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async getById(@Param('id') id: number): Promise<GenderEntity> {
    return await this.genderService.getById(id).then((gender) => {
      if (gender) {
        return gender;
      }

      throw new NotFoundException();
    });
  }

  /**
   * Store gender.
   *
   * @param {GenderEntity} gender
   * @returns {Promise<GenderEntity>}
   * @memberof GenderController
   */
  @Post()
  @ApiOperation({ description: 'Store gender' })
  @ApiResponse({
    status: 201,
    description: 'Return the saved gender.',
    isArray: false,
    type: GenderEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async store(@Body() gender: GenderEntity): Promise<GenderEntity> {
    return await this.genderService.store(gender);
  }

  /**
   * Update gender.
   *
   * @param {GenderEntity} gender
   * @returns {Promise<GenderEntity>}
   * @memberof GenderController
   */
  @Put()
  @ApiOperation({ description: 'Update gender' })
  @ApiResponse({
    status: 200,
    description: 'Return the updated gender.',
    isArray: false,
    type: GenderEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async update(@Body() gender: GenderEntity): Promise<GenderEntity> {
    return await this.genderService.update(gender);
  }

  /**
   * Destroy gender.
   *
   * @param {GenderEntity} gender
   * @returns {Promise<GenderEntity>}
   * @memberof GenderController
   */
  @Delete()
  @ApiOperation({ description: 'Destroy gender' })
  @ApiResponse({
    status: 200,
    description: 'Return the removed gender.',
    isArray: false,
    type: GenderEntity,
  })
  @UseGuards(AuthGuard('jwt'))
  public async destroy(@Body() gender: GenderEntity): Promise<GenderEntity> {
    return await this.genderService.destroy(gender);
  }
}
