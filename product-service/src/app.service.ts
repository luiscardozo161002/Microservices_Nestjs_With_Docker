import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Método para obtener todos los productos activos
  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      where: { isActive: true }
    });
  }

  // Método para obtener un producto activo por ID, lanzando un error si no se encuentra
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id, isActive: true },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return product;
  }

  // Método para crear un nuevo producto
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  // Método para actualizar un producto existente, lanzando un error si no se encuentra
  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id); // Verifica si el producto existe
    const updatedProduct = this.productRepository.merge(product, updateProductDto); // Combina los cambios
    return this.productRepository.save(updatedProduct); // Guarda y devuelve el producto actualizado
  }

  // Método para eliminar lógicamente un producto marcándolo como inactivo
  async remove(id: number): Promise<{ message: string }> {
    const product = await this.findOne(id); // Verifica si el producto existe
    product.isActive = false; // Marca como inactivo
    await this.productRepository.save(product); // Guarda los cambios
    return { message: `Product with ID ${id} deleted successfully.` };
  }
}
