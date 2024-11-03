import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { OrderService } from './app.service';
import { Order } from './entity/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Obtener todas las órdenes activas
  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  // Obtener una orden específica por ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Order> {
    const order = await this.orderService.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
    return order;
  }

  // Crear una nueva orden
  @Post()
  async create(@Body() orderData: CreateOrderDto): Promise<void> {
    return this.orderService.create(orderData);
  }

  // Actualizar una orden existente por ID
  @Put(':id')
  async update(@Param('id') id: number, @Body() orderData: UpdateOrderDto): Promise<void> {
    // Pasamos los parámetros necesarios, incluyendo el ID, como un nuevo DTO
    await this.orderService.update(id, orderData);
  }

  // Eliminar lógicamente una orden por ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.orderService.remove(id);
  }
}
