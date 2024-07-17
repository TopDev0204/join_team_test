# Node.js REST API

## Setup

1. Clone the repository:

    ```bash
    git clone <repository_url>
    cd node-rest-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file and add the following environment variables:

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/users
    ```

4. Start the server:

    ```bash
    npm start
    ```

## API Endpoints

### Get Users Within Radius

- **Endpoint:** `/api/users`
- **Method:** `GET`
- **Query Parameters:**
  - `latitude` (required)
  - `longitude` (required)
  - `page` (optional, default: 1)
  - `limit` (optional, default: 10)

- **Response:**

    ```json
    [
      {
        "user": {
          "_id": "60d5ec49f8d4c827dc0b5e8c",
          "name": "John Doe",
          "latitude": 40.7128,
          "longitude": -74.0060,
          "__v": 0
        },
        "distance": 8.7
      },
      ...
    ]
    ```

### Create User

- **Endpoint:** `/api/users`
- **Method:** `POST`
- **Body Parameters:**
  - `name` (required)
  - `latitude` (required)
  - `longitude` (required)

- **Response:**

    ```json
    {
      "_id": "60d5ec49f8d4c827dc0b5e8c",
      "name": "John Doe",
      "latitude": 40.7128,
      "longitude": -74.0060,
      "__v": 0
    }
    ```

## Error Handling

- **400 Bad Request:** Missing or invalid query parameters.
- **500 Internal Server Error:** Server errors.


