# MERN Stack CRUD Application

## Project Description

This project is a simple CRUD (Create, Read, Update, Delete) application built using the MERN stack:
- **M**ongoDB: A NoSQL database.
- **E**xpress: A web application framework for Node.js.
- **R**eact: A JavaScript library for building user interfaces.
- **N**ode.js: A JavaScript runtime environment.

The application allows users to create, view, update, and delete items from a MongoDB database through a web interface.

## Features

- Create a new item
- View all items
- Update an existing item
- Delete an item

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- MongoDB

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/pasanUdr/MERN-stack-CRUD.git
    cd MERN-stack-CRUD
    ```

2. **Install server dependencies:**

    ```bash
    cd server
    npm install
    ```

3. **Install client dependencies:**

    ```bash
    cd ../client
    npm install
    ```

## Configuration

1. **Set up MongoDB:**

    Ensure MongoDB is running on your local machine. You can start MongoDB using the following command:

    ```bash
    mongod
    ```

2. **Create a `.env` file in the `server` directory:**

    ```bash
    touch .env
    ```

    Add the following content to the `.env` file:

    ```
    MONGO_URI=mongodb://localhost:27017/testCRUD
    PORT=4000
    ```

## Usage

1. **Start the server:**

    ```bash
    cd server
    npm run dev
    ```

    The server will start on `http://localhost:4000`.

2. **Start the client:**

    ```bash
    cd ../client
    npm start
    ```

    The client will start on `http://localhost:3000`.

3. **Open your browser:**

    Visit `http://localhost:3000` to use the application.

## API Endpoints

The server exposes the following API endpoints:

- `GET /api/items` - Get all items
- `POST /api/items` - Create a new item
- `GET /api/items/:id` - Get a specific item by ID
- `PUT /api/items/:id` - Update a specific item by ID
- `DELETE /api/items/:id` - Delete a specific item by ID

## Contributing

Contributions are welcome! Please create a pull request or open an issue to discuss any changes or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to the creators of the MERN stack for their amazing work.
- Special thanks to all the contributors of this project.

