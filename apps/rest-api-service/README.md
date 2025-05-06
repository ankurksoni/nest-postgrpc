# REST API Service

This service provides a REST API gateway to the gRPC service.

## Endpoints

### 1. Hello Endpoint

```
GET /api/hello?name=YourName
```

**Query Parameters:**
- `name` (string): Your name to receive a personalized greeting

**Response:**
```json
"Hello, YourName!"
```

### 2. Items Endpoint

```
GET /api/items?limit=5&filter=electronics
```

**Query Parameters:**
- `limit` (number, optional): Maximum number of items to return (default: 10)
- `filter` (string, optional): Filter items by name, description, or tags (default: '')

**Response:**
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

## Running the service

```bash
npx nx serve rest-api-service
```

Note: Make sure the gRPC service is running before starting the REST API service.

```bash
npx nx serve grpc-service
``` 