## Why this repo ?
i'm using tabnine or other IA to help me while coding.
i want to give it a try to IA to do  everything and not only help me.

## The story line

I am both a fan of arranged rum and a part-time professor at an engineering school.
During a class on backend development, I asked my students to create a MEAN server.
I'd like to see if this lab is fully feasible using AI from mid-2025.

As input I took a swagger.yaml file also generated with AI (gemini).


## Prompts List

1. Create a new nodejs project with expressjs

2. i have relocated everything in the main workspace dir. The code is now in ./src dir.
i have added a swagger.json file, wich contains openapi description of the API to be created.
Add Mongo and mongoose for all schemas.
Add routes for all the endpoint.

3. add a User, with a name, email and all needed elements to authenticate it.
add authentication endpoints. and made all rhum, indredient and recipe protected for identified user.

4. correct those 2 warnings : 
(node:39833) [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
(Use `node --trace-warnings ...` to show where the warning was created)
(node:39833) [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version

5. update swagger.json with authentication

6. add an angular front to login / register a User

7. make the front app expose by express.
add the missing dependencies.

8. i have relocated the front app in the ./client dir.
please add a index.html , and a main app component,where a user can login or create an account.

9. when building une client app i have an error. correct it .
./src/main.ts:2:0-45 - Error: Module not found: Error: Can't resolve './app/app.module' in '/Users/s043204/dev/lfdq/rhum/rhumIA/client/src'
Error: src/main.ts:2:27 - error TS2307: Cannot find module './app/app.module' or its corresponding type declarations.
2 import { AppModule } from './app/app.module';

10. when building une client app i have an error. correct it .
Error: The loader "/Users/s043204/dev/lfdq/rhum/rhumIA/client/src/app/components/home/home.component.scss" didn't return a string.

Error: The loader "/Users/s043204/dev/lfdq/rhum/rhumIA/client/src/app/components/login/login.component.scss" didn't return a string.

Error: The loader "/Users/s043204/dev/lfdq/rhum/rhumIA/client/src/app/components/register/register.component.scss" didn't return a string.

11. Change this line so the file will be find at the root of the project.
const swaggerDocument = YAML.load('./swagger.yaml');

12. Add  a section in the readme.md that explain how to build and start the app

13. the register component is not working. User with name, email and password must be able to register.

14. there is an error in the front register.component because you send a "username" field, but the back component is waiting for a "name" field. correct this.

15. you answer is not correct because the front User type has no name field but a username field.
correct it



## How to Build and Run the Application

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm (usually comes with Node.js)

### Environment Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rhumIA.git
   cd rhumIA
2. Create a .env file in the root directory with the following variables:
    ```
    NODE_ENV=development
    PORT=8080
    MONGO_URI=mongodb://localhost:27017/rhumia
    JWT_SECRET=your_jwt_secret_key
    JWT_EXPIRE=30d

### Installation
1. Install backend dependencies:
   ```bash
   npm install
2. Install frontend dependencies:
    ```bash
    cd client
    npm install
    cd ..

### Development Mode
To run both the backend and frontend in development mode:
  ```bash
  npm run dev:full
  ```

This will start:
Backend server on http://localhost:8080
Frontend development server on http://localhost:4200
You can also run them separately:
Backend only: _npm run dev_
Frontend only: _npm run client_

## Production Build
1. Build the frontend:
```bash
npm run client:build
```
2. Start the production server:
```bash
npm start
````

The application will be available at http://localhost:8080

## API Documentation
The API documentation is available at http://localhost:8080/api-docs when the server is running.

## Testing
To run tests:
  ```bash
  npm test
  ````
