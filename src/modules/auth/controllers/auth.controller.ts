import {
  Controller,
  Post,
  Body,
  NotFoundException,
  UseGuards,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';

import { Login } from '@interfaces';
import { AuthEntity } from '@entities';
import { AuthService } from '@services';

/**
 * Controller for all actions.
 *
 * @export
 * @class AuthController
 */
@ApiTags('auth')
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiResponse({ status: 404, description: 'Not Found.' })
@ApiResponse({ status: 500, description: 'Internal Error Server.' })
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  /**
   * Creates an instance of AuthController.
   * @param {AuthService} authService
   * @memberof AuthController
   */
  public constructor(private readonly authService: AuthService) {}

  /**
   * Method to validate the email and password to return the session data.
   *
   * @param {AuthEntity} data
   * @param {Response} response
   * @returns {Promise<Login>}
   * @memberof UserController
   */
  @Post('login')
  @ApiOperation({ description: 'Register user' })
  @ApiResponse({
    status: 201,
    description: 'Return the auth data.',
    isArray: false,
    type: Promise<AuthEntity>,
  })
  public async login(@Body() data: AuthEntity, @Res() response: Response) {
    const auth = await this.authService.login(data);

    if (!auth) throw new NotFoundException();

    const { token, expiresInToken, refreshToken, expiresInRefreshToken } =
      this.authService.createToken(auth);

    auth.refreshToken = refreshToken;

    await this.authService.save(auth);

    response
      .cookie('__jwt-token', token, {
        maxAge: expiresInToken,
        httpOnly: true,
      })
      .cookie('__jwt-refresh', refreshToken, {
        maxAge: expiresInRefreshToken,
        httpOnly: true,
      })
      .status(HttpStatus.OK)
      .send(<Login>{
        isLogging: true,
        role: auth.role,
      });
  }

  /**
   * Method to refresh session.
   *
   * @param {Request} request
   * @param {Response} response
   * @returns {Promise<Login>}
   * @memberof UserController
   */
  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @ApiResponse({
    status: 201,
    description: '',
    isArray: false,
    type: Promise<Login>,
  })
  public async refresh(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const { user } = request;
    const data: AuthEntity = {
      email: user['data']['email'],
      refreshToken: user['refreshToken'],
    };
    const auth = await this.authService.refresh(data);

    if (!auth) throw new NotFoundException();

    const { token, expiresInToken, refreshToken, expiresInRefreshToken } =
      await this.authService.createToken(auth);

    auth.refreshToken = refreshToken;

    await this.authService.save(auth);

    response
      .cookie('__jwt-token', token, {
        maxAge: expiresInToken,
        httpOnly: true,
      })
      .cookie('__jwt-refresh', refreshToken, {
        maxAge: expiresInRefreshToken,
        httpOnly: true,
      })
      .status(HttpStatus.OK)
      .send(<Login>{
        isLogging: true,
        role: auth.role,
      });
  }

  /**
   * Method to close session.
   *
   * @param {Request} request
   * @param {Response} response
   * @returns {Promise<Login>}
   * @memberof UserController
   */
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 201,
    description: '',
    isArray: false,
    type: Promise<Login>,
  })
  public async logout(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const { user } = request;
    const data: AuthEntity = {
      email: user['data']['email'],
      refreshToken: user['refreshToken'],
    };

    await this.authService.logout(data);

    response
      .clearCookie('__jwt-token')
      .clearCookie('__jwt-refresh')
      .status(HttpStatus.OK)
      .send(<Login>{
        isLogging: false,
      });
  }
}
