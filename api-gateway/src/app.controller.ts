import { Controller, Get } from '@nestjs/common';
import { ApiGatewayService } from './app.service';

@Controller('gateway')
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get('users')
  async getUsers() {
    return this.apiGatewayService.getUsers();
  }

  @Get('products')
  async getProducts() {
    return this.apiGatewayService.getProducts();
  }

  @Get('orders')
  async getOrders() {
    return this.apiGatewayService.getOrders();
  }
}
