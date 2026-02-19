# companies-service
Este es un microservicio de UserUserRoles para DBGERH_Talent


# Estructura de las carpetas
UserUserRoles
│
├── src/
│   │
│   ├── application/
│   │   └── use-cases/
│   │       ├── GetUserRolesById.js
│   │       └── GetUserRoles.js
│   │
│   ├── domain/
│   │   ├── entities/
│   │   │   └── UserRoles.js
│   │   │
│   │   └── repositories/
│   │       └── UserRolesRepository.js
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │       └── typeorm/
│   │           ├── entities/
│   │           │   └── UserRolesEntity.js
│   │           │
│   │           └── repositories/
│   │               └── UserRolesRepositoryImpl.js
│   │   
│   │   
│   │
│   ├── http/
│   │   └── controllers/
│   │       └── UserRolesController.js
│   │
│   │
│   └── router.js
│
└── README.md

