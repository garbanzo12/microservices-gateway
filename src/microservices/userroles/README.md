# companies-service
Este es un microservicio de Roles para DBGERH_Talent


# Estructura de las carpetas
Roles
│
├── src/
│   │
│   ├── application/
│   │   └── use-cases/
│   │       ├── GetRolesById.js
│   │       └── GetRoles.js
│   │
│   ├── domain/
│   │   ├── entities/
│   │   │   └── Roles.js
│   │   │
│   │   └── repositories/
│   │       └── RolesRepository.js
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │       └── typeorm/
│   │           ├── entities/
│   │           │   └── RolesEntity.js
│   │           │
│   │           └── repositories/
│   │               └── RolesRepositoryImpl.js
│   │   
│   │   
│   │
│   ├── http/
│   │   └── controllers/
│   │       └── RolesController.js
│   │
│   │
│   └── router.js
│
└── README.md

