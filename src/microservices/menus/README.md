# companies-service
Este es un microservicio de Menus para DBGERH_Talent


# Estructura de las carpetas
Menus
│
├── src/
│   │
│   ├── application/
│   │   └── use-cases/
│   │       ├── GetOfficesById.js
│   │       └── GetOffices.js
│   │
│   ├── domain/
│   │   ├── entities/
│   │   │   └── Menus.js
│   │   │
│   │   └── repositories/
│   │       └── MenusRepository.js
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │       └── typeorm/
│   │           ├── entities/
│   │           │   └── MenusEntity.js
│   │           │
│   │           └── repositories/
│   │               └── MenusRepositoryImpl.js
│   │   
│   │   
│   │
│   ├── http/
│   │   └── controllers/
│   │       └── MenusController.js
│   │
│   │
│   └── router.js
│
├── README.md

