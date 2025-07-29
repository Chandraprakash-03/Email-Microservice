# Email Microservice

A simple Node.js microservice for sending emails using Gmail SMTP, built with Express and Nodemailer.

## Features

- Send HTML emails with attachments via a REST API
- CORS enabled for cross-origin requests
- Configurable via environment variables

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- A Gmail account (for SMTP)

### Installation

```sh
git clone https://github.com/yourusername/email-microservice.git
cd email-microservice
npm install
```

### Configuration

Create a `.env` file in the root directory to set environment variables (optional):

```sh
PORT = 3000
```

### Running the Service

```sh
npm start
```

The API will be available at `http://localhost:3000`

## API Usage

### Send Email

#### Endpoint

```sh
POST /api/send-email
```

#### Request Body

```json
{
	"auth": {
		"user": "your-gmail@gmail.com",
		"pass": "your-gmail-app-password"
	},
	"mail": {
		"to": "recipient@example.com",
		"subject": "Test Email",
		"html": "<h1>Hello World</h1>",
		"fromName": "Your Name", // optional
		"fromEmail": "your-gmail@gmail.com", // optional
		"attachments": [
			// optional
			{
				"filename": "file.txt",
				"content": "Hello, world!"
			}
		]
	}
}
```

#### Response:

- `200 OK` on Success.
- `400 Bad Request` if required fields are missing.
- `500 Internal Server Error` on failure.

## Example cURL Request

```sh
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "auth": {
      "user": "your-gmail@gmail.com",
      "pass": "your-gmail-app-password"
    },
    "mail": {
      "to": "recipient@example.com",
      "subject": "Hello",
      "html": "<b>This is a test email</b>"
    }
  }'
```

## LICENSE

This project is licensed under the MIT License.
