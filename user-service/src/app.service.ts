import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Método para obtener todos los usuarios activos
  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: { isActive: true }
    });
  }

  // Método para obtener un usuario activo por ID, lanzando un error si no se encuentra
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, isActive: true },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  // Método para crear un nuevo usuario
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  // Método para actualizar un usuario existente, lanzando un error si no se encuentra
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id); // Verifica si el usuario existe
    const updatedUser = this.userRepository.merge(user, updateUserDto); // Combina los cambios
    return this.userRepository.save(updatedUser); // Guarda y devuelve el usuario actualizado
  }

  // Método para eliminar lógicamente un usuario marcándolo como inactivo
  async remove(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id); // Verifica si el usuario existe
    user.isActive = false; // Marca el usuario como inactivo
    await this.userRepository.save(user); // Guarda los cambios
    return { message: `User with ID ${id} deleted successfully.` };
  }
}
