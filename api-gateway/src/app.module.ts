import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApiGatewayController } from './app.controller';
import { ApiGatewayService } from './app.service';

@Module({
  imports: [HttpModule], // Permite el uso de HttpService
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService]
})
export class AppModule {}
