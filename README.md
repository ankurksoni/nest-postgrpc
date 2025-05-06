# NestJS gRPC and REST API Service

A monorepo containing a gRPC microservice and a REST API gateway that communicates with the gRPC service. Built with NestJS and Nx.

## Project Structure

```
nest-postgrpc/
├── apps/
│   ├── grpc-service/              # gRPC microservice
│   │   └── src/
│   │       ├── app/
│   │       │   ├── app.controller.ts    # gRPC controllers
│   │       │   ├── app.module.ts        # gRPC module configuration
│   │       │   └── app.service.ts       # Business logic implementation
│   │       └── main.ts                  # gRPC service entry point
│   │
│   ├── rest-api-service/          # REST API gateway
│   │   └── src/
│   │       ├── app/
│   │       │   ├── app.controller.ts    # REST controllers
│   │       │   ├── app.module.ts        # REST module configuration
│   │       │   └── app.service.ts       # gRPC client wrapper
│   │       ├── grpc-client.provider.ts  # gRPC client configuration
│   │       └── main.ts                  # REST API entry point
│   │
│   ├── grpc-service-e2e/          # gRPC service E2E tests
│   └── rest-api-service-e2e/      # REST API E2E tests
│
└── libs/
    ├── common/                    # Shared code between services
    │   └── src/
    │       ├── lib/
    │       │   ├── interfaces/    # Shared TypeScript interfaces
    │       │   └── data/          # Shared data and constants
    │       └── index.ts           # Public API exports
    │
    └── proto/                     # Shared Protocol Buffers
        └── src/
            └── lib/
                ├── hello.proto    # Protocol Buffers definition
                └── hello.ts       # Generated TypeScript interfaces
```

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) - A progressive Node.js framework
- **Monorepo Tool**: [Nx](https://nx.dev/) - Smart, fast and extensible build system
- **Protocol**: [gRPC](https://grpc.io/) - High performance RPC framework
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Strongly typed JavaScript
- **API Gateway**: REST API with Express

### Key Dependencies

- **@nestjs/microservices**: NestJS microservices support
- **@grpc/grpc-js**: gRPC implementation for Node.js
- **ts-proto**: Protocol Buffers compiler for TypeScript

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Running the Services

```bash
# Generate Protocol Buffer TypeScript definitions
npm run proto:gen

# Start the gRPC service
npm run start:grpc

# In a separate terminal, start the REST API service
npm run start:rest-api
```

The REST API will be available at: `http://localhost:3000/api`
The gRPC service runs on: `localhost:50051`

## API Endpoints

### REST API

#### Get Hello Message

```
GET /api/hello?name=YourName
```

Example:

```bash
curl "http://localhost:3000/api/hello?name=John"
```

Response:
```json
"Hello, John!"
```

#### Get Items

```
GET /api/items?limit=5&filter=product
```

Parameters:
- `limit`: Maximum number of items to return (default: 10)
- `filter`: Filter items by name, description, or tags (optional)

Example:

```bash
curl "http://localhost:3000/api/items?limit=2&filter=electronics"
```

Response:
```json
{
  "items": [
    {
      "id": "1",
      "name": "Product One",
      "description": "This is the first product",
      "price": 19.99,
      "tags": ["electronics", "gadget"],
      "available": true,
      "metadata": { "color": "black", "size": "medium" }
    },
    {
      "id": "4",
      "name": "Product Four",
      "description": "This is the fourth product",
      "price": 49.99,
      "tags": ["electronics", "computer"],
      "available": true,
      "metadata": { "brand": "TechX", "warranty": "1 year" }
    }
  ],
  "total_count": 2
}
```

### gRPC Service

The gRPC service is not directly accessible via HTTP. It is consumed by the REST API service.

However, if you want to interact with it directly, you can use a gRPC client such as [grpcurl](https://github.com/fullstorydev/grpcurl):

```bash
# List all available services
grpcurl -plaintext localhost:50051 list

# Say hello
grpcurl -plaintext -d '{"name": "John"}' localhost:50051 hello.HelloService/SayHello

# Get items
grpcurl -plaintext -d '{"limit": 2, "filter": "electronics"}' localhost:50051 hello.HelloService/GetItems
```

## Development

### Adding New gRPC Methods

1. Update the Protocol Buffer definition in `libs/proto/src/lib/hello.proto`
2. Regenerate TypeScript interfaces:
   ```bash
   npm run proto:gen
   ```
3. Implement the service method in `apps/grpc-service/src/app/app.service.ts`
4. Add a corresponding method in the REST API: `apps/rest-api-service/src/app/app.service.ts`
5. Expose the method via a controller in `apps/rest-api-service/src/app/app.controller.ts`

### Nx Commands

```bash
# Build a project
npx nx build grpc-service

# Test a project
npx nx test grpc-service

# See available commands for a project
npx nx show project grpc-service
```

## License

MIT
