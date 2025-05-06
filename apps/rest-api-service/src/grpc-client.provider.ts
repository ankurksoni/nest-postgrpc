import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClient = ClientProxyFactory.create({
  transport: Transport.GRPC,
  options: {
    package: 'hello',
    protoPath: join(__dirname, '../../../libs/proto/src/lib/hello.proto'),
    url: 'localhost:50051',
  },
});