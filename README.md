![Fetch Worker](https://github.com/user-attachments/assets/7e25d3d9-55f1-400d-b2bd-383b2367fa8b)

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https%3A%2F%2Fgithub.com%2FThereallo1026%2Ffetch-worker)

## Features

- Execute fetch requests using JSON configuration
- Automatic handling of JSON request/response bodies
- CORS support built-in
- Detailed response information including headers and status
- Handles both JSON and non-JSON responses
- User-friendly error messages
- Interactive documentation when accessed via browser

## Usage

Send a POST request to your worker's URL with a JSON payload containing your fetch configuration:

```javascript
const response = await fetch('https://fetch-worker.your-subdomain.workers.dev/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://api.example.com/data',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer YOUR_TOKEN'
    }
  })
});

const result = await response.json();
```

### Response Format

The worker returns a standardized JSON response:

```json
{
  "success": true,
  "status": 200,
  "statusText": "OK",
  "headers": {
    "content-type": "application/json",
    // ... other headers
  },
  "data": {
    // Response data from the target API
  }
}
```

### Error Handling

If there's an error, you'll receive a response like:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

## Development

This project uses [Bun](https://bun.sh/) as the JavaScript runtime.

### Prerequisites

- [Bun](https://bun.sh/) installed on your system
- [Cloudflare account](https://dash.cloudflare.com/sign-up) with Workers access
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

### Available Commands

- `bun run dev` - Start a local development server
- `bun run deploy` - Deploy to Cloudflare
- `bun run test` - Run tests

## Configuration

The worker can be configured through `wrangler.jsonc`. See [Cloudflare's documentation](https://developers.cloudflare.com/workers/wrangler/configuration/) for more details.

## License

MIT 
