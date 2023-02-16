import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req: ExpressRequest) {
    console.log('req.user', req.user)
    return req.user;
  }

  @Get('logout')
  async logout(@Request() req: ExpressRequest) {
    req.logout(() => {});
    return { message: 'Logged out successfully' };
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() req: ExpressRequest) {
    return req.user;
  }
}
