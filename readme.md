** liste des prompts

1) Create a new nodejs project with expressjs

2) i have relocated everything in the main workspace dir. The code is now in ./src dir.
i have added a swagger.json file, wich contains openapi description of the API to be created.
Add Mongo and mongoose for all schemas.
Add routes for all the endpoint.

3) add a User, with a name, email and all needed elements to authenticate it.
add authentication endpoints. and made all rhum, indredient and recipe protected for identified user.

4) correct those 2 warnings : 
(node:39833) [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
(Use `node --trace-warnings ...` to show where the warning was created)
(node:39833) [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version

5) update swagger.json with authentication

6) add an angular front to login / register a User

7)make the front app expose by express.
add the missing dependencies.

8)i have relocated the front app in the ./client dir.
please add a index.html , and a main app component,where a user can login or create an account.

9) when building une client app i have an error. correct it .
./src/main.ts:2:0-45 - Error: Module not found: Error: Can't resolve './app/app.module' in '/Users/s043204/dev/lfdq/rhum/rhumIA/client/src'

Error: src/main.ts:2:27 - error TS2307: Cannot find module './app/app.module' or its corresponding type declarations.

2 import { AppModule } from './app/app.module';

10) when building une client app i have an error. correct it .
Error: The loader "/Users/s043204/dev/lfdq/rhum/rhumIA/client/src/app/components/home/home.component.scss" didn't return a string.

Error: The loader "/Users/s043204/dev/lfdq/rhum/rhumIA/client/src/app/components/login/login.component.scss" didn't return a string.

Error: The loader "/Users/s043204/dev/lfdq/rhum/rhumIA/client/src/app/components/register/register.component.scss" didn't return a string.

11) Change this line so the file will be find at the root of the project.
const swaggerDocument = YAML.load('./swagger.yaml');

12)

