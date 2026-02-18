# companies-service
Este es un microservicio de CecoName para DBGERH_Talent

# Estructura de las carpetas
CECONAME-SERVICE
│
├── dist/
├── node_modules/
│
├── src/
│   │
│   ├── application/
│   │   └── use-cases/
│   │       ├── GetCecoNameById.js
│   │       └── GetCecoNames.js
│   │
│   ├── domain/
│   │   ├── entities/
│   │   │   └── CecoName.js
│   │   │
│   │   └── repositories/
│   │       └── CecoNameRepository.js
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │       └── typeorm/
│   │           ├── entities/
│   │           │   └── CecoNameEntity.js
│   │           │
│   │           └── repositories/
│   │               └── CecoNameRepositoryImpl.js5     
│   │
│   ├── http/
│   │   └── controllers/
│   │       └── CecoNameController.js
│   │
│   │
│   └── router.js
│
├── README.md

