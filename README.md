# Personal Finance Backend
This is the backend for a personal finance management application built with Node.js and Express. The application supports functionalities such as user registration, login, adding expenses, and retrieving a list of expenses.
## Technologies Used
- **Node.js**: A runtime environment for executing JavaScript on the server.
- **Express**: A web framework for Node.js.
- **CORS**: Middleware that enables resource sharing between different origins.
- **Body-parser**: Middleware to parse incoming request bodies.
- **JWT (JSON Web Token)**: A mechanism for user authentication.
- **Bcrypt**: A library for hashing passwords.
- **Dotenv**: A library for managing environment variables.
## Installation
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/chvyl/personal-finance-backend.git
   cd personal-finance-backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the environment variable:
   ```bash
   SECRET_KEY=mySuperSecretKey123
   ```
## Usage
1. Start the server:
   ```bash
   node server.js
   ```
2. Access the API at `http://localhost:5000`.
## Main APIs
- **User Registration**
   - **URL**: `/api/register`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     {
       "username": "your_username",
       "password": "your_password"
     }
     ```
- **User Login**
   - **URL**: `/api/login`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     {
       "username": "your_username",
       "password": "your_password"
     }
     ```
- **Get Expenses List**
   - **URL**: `/api/expenses`
   - **Method**: `GET`
   - **Request Header**: `Authorization: Bearer <token>` (Token must be received from the login API)
- **Add Expense**
   - **URL**: `/api/expenses`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     {
       "description": "Expense detail",
       "amount": 100000,
       "category": "Category"
     }
     ```
## Note
- Use a real database to store users and expenses instead of storing them in memory as shown in the example code.
- Error messages will be returned in case of any issues.
## Author
- **Chau Tran Vy Linh** - [GitHub](https://github.com/chvyl)
