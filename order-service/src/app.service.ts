import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  // Método para obtener todas las órdenes activas
  async findAll(): Promise<Order[]> {
    return this.orderRepository.query('SELECT * FROM show_all_orders()');
  }

  // Método para obtener una orden activa por ID
  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id, isActive: true },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
    return order;
  }

  // Método para crear una nueva orden usando nombres de usuario y producto
  async create(createOrderDto: CreateOrderDto): Promise<void> {
    await this.orderRepository.query(
      'CALL create_order($1, $2, $3)',
      [
        createOrderDto.userName,
        createOrderDto.productName,
        createOrderDto.quantity,
      ],
    );
  }

  // Método para actualizar una orden existente usando nombres de usuario y producto
  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<void> {
    // Aquí pasamos el userName, productName y quantity
    await this.orderRepository.query(
      'CALL update_order($1, $2, $3, $4)',
      [
        updateOrderDto.userName,
        updateOrderDto.productName,
        updateOrderDto.quantity,
        updateOrderDto.status,  // Agregamos el nuevo campo de estado
      ],
    );
  }

  // Método para eliminar lógicamente una orden marcándola como inactiva
  async remove(id: number): Promise<{ message: string }> {
    const order = await this.findOne(id); // Verifica si la orden existe
    order.isActive = false; // Marca como inactiva
    await this.orderRepository.save(order); // Guarda los cambios
    return { message: `Order with ID ${id} deleted successfully.` };
  }
}
