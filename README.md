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

## How Nx Manages Shared Libraries

Nx provides a powerful monorepo architecture that makes it easy to share code between multiple applications. Here's how it works in this project:

### Key Configuration Files

Several important files manage dependencies and glue the monorepo structure together:

1. **nx.json**: The root configuration file for Nx that defines workspace-wide settings, including:
   - Project naming conventions
   - Task execution options
   - Caching settings
   - Default project configurations

2. **package.json**: Contains all npm dependencies for the entire monorepo, including:
   - Shared dependencies for all applications
   - Development tools like TypeScript and ESLint
   - Scripts for common operations (`proto:gen`, `start:grpc`, etc.)

3. **project.json**: Each project (app or lib) has its own project.json file defining:
   - Build configurations
   - Serve configurations
   - Test settings
   - Project-specific dependencies

4. **tsconfig.base.json**: The root TypeScript configuration that:
   - Sets up path mappings (discussed below)
   - Configures compiler options shared across all projects
   - Establishes a consistent TypeScript environment

### Module Resolution with Path Mapping

The key file that manages module sharing is `tsconfig.base.json`, which contains path mappings that tell TypeScript how to resolve imports:

```json
{
  "compilerOptions": {
    "paths": {
      "@./common": ["libs/common/src/index.ts"],
      "@./proto": ["libs/proto/src/index.ts"]
    }
  }
}
```

These path mappings allow any application in the monorepo to import shared code with a consistent import path:

```typescript
// Importing shared interfaces and data in any service
import { Item, ItemsResponse, allItems } from '@./common';
```

### Library Structure

Nx organizes shared code into libraries, each with a clear API exposed through its `index.ts` file:

```typescript
// libs/common/src/index.ts
export * from './lib/interfaces/item.interface';
export * from './lib/data/items.data';
```

This pattern:
- Prevents applications from directly accessing internal library code
- Encourages well-defined library boundaries
- Makes refactoring and maintenance easier

### Dependencies Graph

Nx tracks dependencies between applications and libraries using a dependency graph. You can visualize these dependencies with:

```bash
npx nx graph
```

This dependency graph is used for:
- Determining which projects need to be rebuilt when code changes
- Enabling parallel task execution
- Enabling intelligent caching

### Build and Deploy Efficiency

When you build a project, Nx only builds the parts of the monorepo that are affected by changes:

```bash
npx nx build grpc-service
```

This significantly speeds up the build process in larger projects with many applications and libraries.

### Application-Library Connections

In this project, the applications and libraries are connected in several ways:

1. **Dependency Connections**:
   - The REST API service depends on the common library for interfaces and the proto library for gRPC client generation
   - The gRPC service depends on the common library for interfaces and data, and the proto library for service definitions

2. **Import References**:
   Each application references shared libraries using configured path aliases:
   ```typescript
   // In grpc-service
   import { Item, ItemsResponse, allItems } from '@./common';
   
   // In rest-api-service
   import { Item, ItemsResponse } from '@./common';
   ```

3. **Service Communication**:
   The REST API service communicates with the gRPC service using the client generated from proto files:
   ```typescript
   // apps/rest-api-service/src/grpc-client.provider.ts
   export const grpcClient = ClientProxyFactory.create({
     transport: Transport.GRPC,
     options: {
       package: 'hello',
       protoPath: join(__dirname, '../../../libs/proto/src/lib/hello.proto'),
       url: 'localhost:50051',
     },
   });
   ```

This architecture ensures that:
- Code is reused efficiently across services
- Type definitions are consistent
- Service contracts are well-defined through Protocol Buffers
- Changes to shared code automatically propagate to all consumers

### Build Output and Distribution Structure

When you build the applications and libraries, Nx generates a structured output in the `dist/` directory that mirrors the source structure:

```
dist/
├── apps/                           # Built applications
│   ├── grpc-service/               # gRPC service build output
│   │   ├── main.js                 # Entry point for gRPC service
│   │   └── ...                     # Other compiled files
│   │
│   └── rest-api-service/           # REST API service build output
│       ├── main.js                 # Entry point for REST API service
│       └── ...                     # Other compiled files
│
├── libs/                           # Built libraries
│   ├── common/                     # Common library build output
│   │   ├── src/
│   │   │   ├── index.js            # Main library exports
│   │   │   └── lib/                # Library implementation
│   │   │       ├── data/           # Items seed data
│   │   │       └── interfaces/     # TypeScript interfaces
│   │   └── ...
│   │
│   └── proto/                      # Proto library build output
│       ├── src/
│       │   └── lib/
│       │       ├── hello.proto     # Protocol Buffers definition file
│       │       └── ...             # Generated TypeScript code
│       └── ...
└── ...
```

#### Package Organization

Each built package serves a specific purpose in the architecture:

1. **grpc-service**: 
   - **Purpose**: Implements the gRPC server using NestJS
   - **Entry Point**: `dist/apps/grpc-service/main.js`
   - **Dependencies**: Common library (data and interfaces), Proto library (service definitions)
   - **Runtime**: Node.js microservice on port 50051

2. **rest-api-service**:
   - **Purpose**: Exposes REST endpoints and forwards requests to gRPC service
   - **Entry Point**: `dist/apps/rest-api-service/main.js`
   - **Dependencies**: Proto library (client generation), Common library (interfaces)
   - **Runtime**: Express web server on port 3000

3. **common library**:
   - **Purpose**: Shared code, interfaces, and data models
   - **Entry Point**: `dist/libs/common/src/index.js`
   - **Consumers**: Both gRPC and REST API services
   - **Content**: TypeScript interfaces and seed data

4. **proto library**:
   - **Purpose**: Protocol Buffers definitions and generated code
   - **Key Files**: `dist/libs/proto/src/lib/hello.proto` (definition)
   - **Consumers**: Both gRPC and REST API services
   - **Content**: Service contract definitions and TypeScript interfaces

During the build process, Nx ensures that each package references its dependencies correctly, and that the compiled output maintains the same import structure defined in the source code.

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

# Build individual services with their dependencies
npm run build:grpc        # Build gRPC service with dependencies
npm run build:rest-api    # Build REST API service with dependencies
npm run build:all         # Build all services and libraries

# Run services (without rebuilding)
npm run run:grpc          # Run gRPC service only
npm run run:rest-api      # Run REST API service only

# Build and run services in a single command
npm run start:grpc        # Build and run gRPC service
npm run start:rest-api    # Build and run REST API service

# Start all services together
npm run start:all         # Build all and run both services concurrently
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
  "totalCount": 2
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
