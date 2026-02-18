# companies-service
Este es un microservicio de Users para DBGERH_Talent



# Estructura de las carpetas
Users
│
│
├── src/
│   │
│   ├── application/
│   │   └── use-cases/
│   │       ├── GetUsersById.js
│   │       └── GetUserss.js
│   │
│   ├── domain/
│   │   ├── entities/
│   │   │   └── Users.js
│   │   │
│   │   └── repositories/
│   │       └── UsersRepository.js
│   │
│   ├── infrastructure/
│   │   └──  database/
│   │        └── typeorm/
│   │           ├── entities/
│   │           │   └── UsersEntity.js
│   │           │
│   │           └── repositories/
│   │               └── UsersRepositoryImpl.js
│   │   
│   │   
│   │
│   ├── http/
│   │   └── controllers/
│   │       └── UsersController.js
│   │
│   └── main.js
│
└── README.md
