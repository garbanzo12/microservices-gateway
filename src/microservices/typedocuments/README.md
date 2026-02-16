# companies-service
Este es un microservicio de Employees para DBGERH_Talent


# Pasos para levantar el proyecto
npm i

npm run build

npm start

# Crea un archivo .env en la raíz del proyecto basándote en la siguiente plantilla:
PORT=3004
DB_SERVER=tu_server
DB_DATABASE=DBGERH_Talent
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_DOMAIN=tu_dominio


# En caso de algun error verificar las dependencias instaladas
npm install dotenv express msnodesqlv8 mssql reflect-metadata morgan

# El proyecto usa decorators, por tanto se usa babel decorators
npm install -D @babel/cli @babel/core @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators @babel/preset-env @babel/plugin-transform-private-methods nodemon 




# Estructura de las carpetas
EMPLOYEES-MICROSERVICE
│
├── dist/
├── node_modules/
│
├── src/
│   │
│   ├── application/
│   │   └── use-cases/
│   │       ├── GetEmployeeById.js
│   │       └── GetEmployees.js
│   │
│   ├── domain/
│   │   ├── entities/
│   │   │   └── Employee.js
│   │   │
│   │   └── repositories/
│   │       └── EmployeeRepository.js
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │   │   └── typeorm/
│   │   │       ├── entities/
│   │   │       │   └── EmployeeEntity.js
│   │   │       │
│   │   │       └── repositories/
│   │   │           └── EmployeeRepositoryImpl.js
│   │   │
│   │   └── mssql-pool.js
│   │
│   ├── http/
│   │   └── controllers/
│   │       └── EmployeeController.js
│   │
│   ├── shared/
│   │   └── config/
│   │       └── index.js
│   │
│   └── main.js
│
├── .env
├── .gitattributes
├── .gitignore
├── babel.config.js
├── package-lock.json
├── package.json
├── README.md
└── test-conection.js
