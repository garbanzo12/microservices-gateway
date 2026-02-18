# companies-service
Este es un microservicio de LookUpGroups para DBGERH_Talent




# Estructura de las carpetas
LookUpGroups
│
├── dist/
├── node_modules/
│
├── src/
│   │
│   ├── application/
│   │   └── use-cases/
│   │       ├── GetLookupGroupsById.js
│   │       └── GetLookupGroupss.js
│   │
│   ├── domain/
│   │   ├── entities/
│   │   │   └── LookupGroups.js
│   │   │
│   │   └── repositories/
│   │       └── LookupGroupsRepository.js
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │       └── typeorm/
│   │           ├── entities/
│   │           │   └── LookupGroupsEntity.js
│   │           │
│   │           └── repositories/
│   │               └── LookupGroupsRepositoryImpl.js
│   │   
│   │   
│   │
│   ├── http/
│   │   └── controllers/
│   │       └── LookupGroupsController.js
│   │
│   │
│   └── router.js
│
├── README.md
