import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.GRPC,
      options: {
        package: 'hello',
        protoPath: join(__dirname, '../../../libs/proto/src/lib/hello.proto'),
        url: 'localhost:50051',
      },
    });

    await app.listen();
    console.log('gRPC service is running...');
  } catch (error) {
    console.error('Error starting gRPC service:', error);
  }
}
bootstrap();
